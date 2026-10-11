"use client";

import Link from "next/link";
import { useTransition } from "react";
import "./globals.css";

export default function GlobalError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <html lang="bn-BD">
      <body className="m-0 grid min-h-dvh content-center bg-base-200 font-sans text-base-content">
        <title>সাময়িক সমস্যা | বাজার দর</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-10 min-[480px]:pt-10 min-[480px]:pb-12">
          <section
            className="mx-auto max-w-[640px] rounded-box border border-base-300 bg-base-100 px-5 py-6 [overflow-wrap:anywhere] min-[480px]:p-8"
            aria-labelledby="global-error-heading"
            aria-busy={pending}
          >
            <h1 id="global-error-heading" className="mb-3 text-2xl font-bold">বাজার দর খুলতে সমস্যা হচ্ছে</h1>
            <p role="alert" className="text-muted">
              সাময়িক কারণে পেজটি দেখানো যাচ্ছে না। আবার চেষ্টা করুন অথবা
              হোম পেজে ফিরে যান।
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
              <Link
                href="/"
                className="btn btn-ghost h-11 w-full whitespace-normal min-[480px]:w-auto"
                onNavigate={(event) => {
                  event.preventDefault();
                  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- A new document resets the failed root layout.
                  window.location.assign("/");
                }}
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
