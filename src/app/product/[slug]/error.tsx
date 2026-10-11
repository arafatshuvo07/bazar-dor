"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function ProductError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
      <section className="rounded-box border border-base-300 bg-base-100 p-6 text-muted" aria-labelledby="product-error-title">
        <h1 id="product-error-title" className="mb-2 text-2xl font-bold text-base-content">পণ্যের তথ্য লোড করা যাচ্ছে না</h1>
        <p className="mb-4">সাময়িক সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary" disabled={pending} onClick={() => startTransition(() => retry())}>{pending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}</button>
          <Link className="btn btn-ghost" href="/">হোম পেজে ফিরে যান</Link>
        </div>
      </section>
    </div>
  );
}
