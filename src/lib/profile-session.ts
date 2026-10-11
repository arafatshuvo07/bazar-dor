import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireProfileSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=profile-login-required");
  return session;
}
