"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function Error({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="site-container route-fallback-page">
      <section
        className="route-fallback-card"
        aria-labelledby="page-error-heading"
        aria-busy={pending}
      >
        <h1 id="page-error-heading">পেজটি লোড করা যাচ্ছে না</h1>
        <p role="alert">
          সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
        </p>
        <div className="route-fallback-actions">
          <button
            type="button"
            className="button button-primary"
            disabled={pending}
            onClick={() => startTransition(() => retry())}
          >
            {pending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}
          </button>
          <Link href="/" className="button button-ghost">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </div>
  );
}
