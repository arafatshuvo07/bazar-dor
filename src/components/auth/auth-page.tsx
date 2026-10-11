import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, enabledSocialProviders } from "@/lib/auth";
import { AuthForm } from "./auth-form";

export async function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");
  const signup = mode === "signup";

  return (
    <div className="auth-page">
      <header className="auth-heading">
        <h1>{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1>
        <p>{signup ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।" : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}</p>
      </header>
      <section className="auth-card" aria-label={signup ? "সাইন আপ ফর্ম" : "সাইন ইন ফর্ম"}>
        <AuthForm mode={mode} socialProviders={enabledSocialProviders} />
      </section>
      <Link href="/" className="auth-home-link">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}

export function AuthSkeleton({ signup = false }: { signup?: boolean }) {
  return (
    <div className="auth-page" aria-busy="true">
      <p role="status" className="sr-only">অ্যাকাউন্টের ফর্ম লোড হচ্ছে…</p>
      <div className="auth-heading" aria-hidden="true"><span className="skeleton-copy" /></div>
      <div className="auth-card auth-form card-skeleton" aria-hidden="true">
        {Array.from({ length: signup ? 4 : 2 }, (_, index) => <span key={index} className="auth-field-skeleton" />)}
        <span className="auth-field-skeleton" />
      </div>
    </div>
  );
}
