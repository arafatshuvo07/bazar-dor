"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function ProfileError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="mx-auto grid w-full max-w-3xl content-start gap-6 px-4 pt-8 pb-12 min-[480px]:pt-10">
      <section className="card card-border min-w-0 border-base-300 bg-base-100 p-5" aria-labelledby="profile-error-title">
        <h1 id="profile-error-title" className="mb-2 text-2xl font-bold">প্রোফাইল লোড করা যাচ্ছে না</h1>
        <p className="text-sm text-muted">সাময়িক সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="btn btn-primary" disabled={pending} onClick={() => startTransition(() => retry())}>{pending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}</button>
          <Link className="btn btn-ghost" href="/">হোম পেজে ফিরে যান</Link>
        </div>
      </section>
    </div>
  );
}
