import "server-only";

import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { Pool } from "pg";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL;
if (!secret || secret.length < 32 || !baseURL) {
  throw new Error("Set BETTER_AUTH_SECRET (32+ characters) and BETTER_AUTH_URL before starting the app.");
}

function createAuthDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (connectionString) {
    return new Pool({
      connectionString,
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
      allowExitOnIdle: true,
    });
  }
  if (process.env.VERCEL) {
    throw new Error("Set DATABASE_URL to a persistent PostgreSQL database before deploying to Vercel.");
  }
  const databasePath = resolve(/* turbopackIgnore: true */ process.env.DATABASE_PATH || "./.data/auth.sqlite");
  mkdirSync(dirname(databasePath), { recursive: true });
  const database = new DatabaseSync(databasePath);
  database.exec("PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  return database;
}

export const authDatabase = createAuthDatabase();

export async function closeAuthDatabase() {
  if (authDatabase instanceof Pool) await authDatabase.end();
  else authDatabase.close();
}

export const enabledSocialProviders = {
  google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  github: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
};

export const auth = betterAuth({
  appName: "বাজার দর",
  secret,
  baseURL,
  database: authDatabase,
  databaseHooks: {
    user: {
      update: {
        before: async (user) => {
          if (user.name === undefined) return;
          if (typeof user.name !== "string") {
            throw new APIError("BAD_REQUEST", { message: "Name must be a string." });
          }
          const name = user.name.trim();
          if (!name || name.length > 100) {
            throw new APIError("BAD_REQUEST", { message: "Name must contain 1 to 100 characters." });
          }
          return { data: { ...user, name } };
        },
      },
    },
  },
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
