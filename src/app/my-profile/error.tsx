"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function ProfileError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="profile-page">
      <section className="profile-information profile-heading" aria-labelledby="profile-error-title">
        <h1 id="profile-error-title">প্রোফাইল লোড করা যাচ্ছে না</h1>
        <p>সাময়িক সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
        <div className="profile-actions">
          <button className="button button-primary" disabled={pending} onClick={() => startTransition(() => retry())}>{pending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}</button>
          <Link className="button button-ghost" href="/">হোম পেজে ফিরে যান</Link>
        </div>
      </section>
    </div>
  );
}
