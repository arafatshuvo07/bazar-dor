"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function ProductError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();
  return (
    <div className="site-container product-detail-page">
      <section className="catalog-message category-message" aria-labelledby="product-error-title">
        <h1 id="product-error-title">পণ্যের তথ্য লোড করা যাচ্ছে না</h1>
        <p>সাময়িক সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
        <div className="product-error-actions">
          <button className="button button-primary" disabled={pending} onClick={() => startTransition(() => retry())}>{pending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}</button>
          <Link className="button button-ghost" href="/">হোম পেজে ফিরে যান</Link>
        </div>
      </section>
    </div>
  );
}
