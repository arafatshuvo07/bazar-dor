"use client";

import Link from "next/link";
import { useTransition } from "react";
import "./globals.css";

export default function GlobalError({ retry }: { retry: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <html lang="bn-BD">
      <body className="global-error-body">
        <title>সাময়িক সমস্যা | বাজার দর</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <main className="site-container route-fallback-page">
          <section
            className="route-fallback-card"
            aria-labelledby="global-error-heading"
            aria-busy={pending}
          >
            <h1 id="global-error-heading">বাজার দর খুলতে সমস্যা হচ্ছে</h1>
            <p role="alert">
              সাময়িক কারণে পেজটি দেখানো যাচ্ছে না। আবার চেষ্টা করুন অথবা
              হোম পেজে ফিরে যান।
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
              <Link
                href="/"
                className="button button-ghost"
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
