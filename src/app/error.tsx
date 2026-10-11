"use client";

import Link from "next/link";
import { useTransition } from "react";

export default function Error({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-10 min-[480px]:pt-10 min-[480px]:pb-12">
      <section
        className="mx-auto max-w-[640px] rounded-box border border-base-300 bg-base-100 px-5 py-6 [overflow-wrap:anywhere] min-[480px]:p-8"
        aria-labelledby="page-error-heading"
        aria-busy={pending}
      >
        <h1 id="page-error-heading" className="mb-3 text-2xl font-bold">পেজটি লোড করা যাচ্ছে না</h1>
        <p role="alert" className="text-muted">
          সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা হোম পেজে ফিরে যান।
        </p>
        <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <button
            type="button"
            className="btn btn-primary h-11 w-full whitespace-normal min-[480px]:w-auto"
            disabled={pending}
            onClick={() => startTransition(() => retry())}
          >
            {pending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}
          </button>
          <Link href="/" className="btn btn-ghost h-11 w-full whitespace-normal min-[480px]:w-auto">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </div>
  );
}
