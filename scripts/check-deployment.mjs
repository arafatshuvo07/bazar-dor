const required = [
  "BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "DATABASE_URL",
  "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET",
];
const problems = required.filter((key) => !process.env[key]?.trim()).map((key) => `${key} is missing.`);
if (process.env.BETTER_AUTH_SECRET && process.env.BETTER_AUTH_SECRET.length < 32) {
  problems.push("BETTER_AUTH_SECRET must contain at least 32 characters.");
}
if (process.env.BETTER_AUTH_URL) {
  try {
    const url = new URL(process.env.BETTER_AUTH_URL);
    if (url.protocol !== "https:" || ["localhost", "127.0.0.1"].includes(url.hostname) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
      problems.push("BETTER_AUTH_URL must be the public HTTPS origin without a path or credentials.");
    }
  } catch { problems.push("BETTER_AUTH_URL is not a valid URL."); }
}
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    if (!["postgres:", "postgresql:"].includes(url.protocol)) problems.push("DATABASE_URL must use PostgreSQL.");
  } catch { problems.push("DATABASE_URL is not a valid connection URL."); }
}
if (problems.length) {
  console.error("Deployment configuration needs attention:\n" + problems.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Production configuration is present. Run the database migration, then verify both OAuth providers on the deployed site.");
}
