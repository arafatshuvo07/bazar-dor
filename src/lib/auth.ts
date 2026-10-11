import "server-only";

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL;
if (!secret || secret.length < 32 || !baseURL) {
  throw new Error("Set BETTER_AUTH_SECRET (32+ characters) and BETTER_AUTH_URL before starting the app.");
}

const databasePath = resolve(/* turbopackIgnore: true */ process.env.DATABASE_PATH || "./.data/auth.sqlite");
mkdirSync(dirname(databasePath), { recursive: true });
export const authDatabase = new DatabaseSync(databasePath);
authDatabase.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");

export const enabledSocialProviders = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
};

export const auth = betterAuth({
  appName: "বাজার দর",
  secret,
  baseURL,
  database: authDatabase,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: {
    ...(enabledSocialProviders.google ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    } : {}),
    ...(enabledSocialProviders.github ? {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        scope: ["read:user", "user:email"],
      },
    } : {}),
  },
});
