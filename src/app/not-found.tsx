import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "পেজটি পাওয়া যায়নি",
  description: "লিংকটি যাচাই করুন অথবা হোম পেজ থেকে পণ্যের দাম দেখুন।",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="site-container route-fallback-page">
      <section
        className="route-fallback-card"
        aria-labelledby="not-found-heading"
      >
        <p className="route-fallback-code">৪০৪</p>
        <h1 id="not-found-heading">পেজটি পাওয়া যায়নি</h1>
        <p>
          লিংকটি ভুল হতে পারে অথবা পেজটি সরিয়ে নেওয়া হয়েছে। হোম পেজ থেকে
          নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন।
        </p>
        <div className="route-fallback-actions">
          <Link href="/" className="button button-primary">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </div>
  );
}
