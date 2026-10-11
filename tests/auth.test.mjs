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
  await t.test("cross-origin mutation is rejected", async () => {
    assert.equal((await request("sign-out", {}, { Cookie: cookie, Origin: "https://untrusted.example" })).status, 403);
  });
  await t.test("signout revokes the stored session", async () => {
    assert.equal((await request("sign-out", {}, { Cookie: cookie })).status, 200);
    assert.equal(await (await request("get-session", undefined, { Cookie: cookie })).json(), null);
  });
});
