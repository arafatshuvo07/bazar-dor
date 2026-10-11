import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { getMigrations } from "better-auth/db/migration";

test("email authentication persists users and revokes sessions", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "bazar-auth-"));
  process.env.DATABASE_PATH = join(directory, "test.sqlite");
  process.env.BETTER_AUTH_SECRET = randomBytes(48).toString("base64url");
  process.env.BETTER_AUTH_URL = "http://localhost:3001";
  process.env.GOOGLE_CLIENT_ID = "test-google-client";
  process.env.GOOGLE_CLIENT_SECRET = "test-google-secret";
  process.env.GITHUB_CLIENT_ID = "test-github-client";
  process.env.GITHUB_CLIENT_SECRET = "test-github-secret";
  const { auth, authDatabase } = await import("../src/lib/auth.ts");
  t.after(async () => { authDatabase.close(); await rm(directory, { recursive: true }); });
  await (await getMigrations(auth.options)).runMigrations();

  const account = { name: "পরীক্ষা ব্যবহারকারী", email: "auth-test@example.test", password: randomBytes(18).toString("base64url") };
  let cookie;
  const request = (path, body, headers = {}) => auth.handler(new Request(`http://localhost:3001/api/auth/${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:3001", ...headers },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }));

  await t.test("signup does not sign the user in and stores a password hash", async () => {
    const response = await request("sign-up/email", account);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("set-cookie"), null);
    const row = authDatabase.prepare('SELECT password FROM account WHERE "providerId" = ?').get("credential");
    assert(row.password && row.password !== account.password);
    assert.equal(await (await request("get-session")).json(), null);
  });
  await t.test("invalid password fails without creating a session", async () => {
    assert.equal((await request("sign-in/email", { ...account, password: "incorrect-password" })).status, 401);
  });
  await t.test("signin creates an HttpOnly session that survives a new request", async () => {
    const response = await request("sign-in/email", account);
    assert.equal(response.status, 200);
    const setCookie = response.headers.get("set-cookie");
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /SameSite=Lax/i);
    cookie = setCookie.split(";")[0];
    const session = await (await request("get-session", undefined, { Cookie: cookie })).json();
    assert.equal(session.user.email, account.email);
  });
  await t.test("profile changes require a live session", async () => {
    assert.equal((await request("update-user", { name: "অন্য নাম" })).status, 401);
    assert.equal((await request("update-user", { name: "অন্য নাম" }, { Cookie: "better-auth.session_token=forged" })).status, 401);
  });
  await t.test("name updates are trimmed, persisted and visible in the next session", async () => {
    const response = await request("update-user", { name: "  নতুন নাম  " }, { Cookie: cookie });
    assert.equal(response.status, 200);
    const row = authDatabase.prepare('SELECT name, email FROM user WHERE email = ?').get(account.email);
    assert.equal(row.name, "নতুন নাম");
    assert.equal(row.email, account.email);
    const session = await (await request("get-session", undefined, { Cookie: cookie })).json();
    assert.equal(session.user.name, "নতুন নাম");
  });
  await t.test("invalid names and email changes leave the profile unchanged", async () => {
    for (const name of ["", "   ", "ক".repeat(101), 123, null, {}, []]) {
      assert.equal((await request("update-user", { name }, { Cookie: cookie })).status, 400);
    }
    assert.equal((await request("update-user", { email: "different@example.test" }, { Cookie: cookie })).status, 400);
    const row = authDatabase.prepare('SELECT name, email FROM user WHERE email = ?').get(account.email);
    assert.equal(row.name, "নতুন নাম");
    assert.equal(row.email, account.email);
  });
  await t.test("a supplied user ID cannot redirect an update to another account", async () => {
    const other = { ...account, name: "দ্বিতীয় ব্যবহারকারী", email: "other-auth-test@example.test" };
    assert.equal((await request("sign-up/email", other)).status, 200);
    const otherUser = authDatabase.prepare('SELECT id FROM user WHERE email = ?').get(other.email);
    const response = await request("update-user", { name: "নিজের নাম", id: otherUser.id, userId: otherUser.id }, { Cookie: cookie });
    assert.equal(response.status, 200);
    assert.equal(authDatabase.prepare('SELECT name FROM user WHERE email = ?').get(other.email).name, other.name);
    assert.equal(authDatabase.prepare('SELECT name FROM user WHERE email = ?').get(account.email).name, "নিজের নাম");
  });
  await t.test("cross-origin mutation is rejected", async () => {
    assert.equal((await request("sign-out", {}, { Cookie: cookie, Origin: "https://untrusted.example" })).status, 403);
  });
  await t.test("signout revokes the stored session", async () => {
    assert.equal((await request("sign-out", {}, { Cookie: cookie })).status, 200);
    assert.equal(await (await request("get-session", undefined, { Cookie: cookie })).json(), null);
    assert.equal((await request("update-user", { name: "অন্য নাম" }, { Cookie: cookie })).status, 401);
  });
  await t.test("the updated name survives signing in again", async () => {
    const response = await request("sign-in/email", account);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).user.name, "নিজের নাম");
  });
  await t.test("both social providers build the configured callback URL", async () => {
    for (const provider of ["google", "github"]) {
      const response = await request("sign-in/social", { provider, callbackURL: "/", errorCallbackURL: "/signin?error=oauth", disableRedirect: true });
      assert.equal(response.status, 200);
      const destination = new URL((await response.json()).url);
      assert.equal(destination.hostname, provider === "google" ? "accounts.google.com" : "github.com");
      assert.equal(destination.searchParams.get("redirect_uri"), `http://localhost:3001/api/auth/callback/${provider}`);
      assert(destination.searchParams.get("state"));
    }
  });
});
