import { getMigrations } from "better-auth/db/migration";
import { auth, closeAuthDatabase } from "../src/lib/auth.ts";

try {
  const migration = await getMigrations(auth.options);
  await migration.runMigrations();
  console.log("Authentication database is ready.");
} finally {
  await closeAuthDatabase();
}
