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
    <div className="mx-auto w-full max-w-md px-4 pt-8 pb-12 min-[480px]:pt-10">
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-bold">{signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1>
        <p className="text-sm text-muted">{signup ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।" : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}</p>
      </header>
      <section className="card card-border border-base-300 bg-base-100 p-5 min-[480px]:p-6" aria-label={signup ? "সাইন আপ ফর্ম" : "সাইন ইন ফর্ম"}>
        <AuthForm mode={mode} socialProviders={enabledSocialProviders} />
      </section>
      <Link href="/" className="link link-primary mx-auto mt-5 block w-fit text-sm underline-offset-[3px]">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}

export function AuthSkeleton({ signup = false }: { signup?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 pt-8 pb-12 min-[480px]:pt-10" aria-busy="true">
      <p role="status" className="sr-only">অ্যাকাউন্টের ফর্ম লোড হচ্ছে…</p>
      <div className="mb-6" aria-hidden="true"><span className="skeleton block h-8 w-1/2" /></div>
      <div className="card card-border grid gap-4 border-base-300 bg-base-100 p-5 min-[480px]:p-6" aria-hidden="true">
        {Array.from({ length: signup ? 4 : 2 }, (_, index) => <span key={index} className="skeleton block h-11" />)}
        <span className="skeleton block h-11" />
      </div>
    </div>
  );
}
