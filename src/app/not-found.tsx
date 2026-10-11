import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "পেজটি পাওয়া যায়নি",
  description: "লিংকটি যাচাই করুন অথবা হোম পেজ থেকে পণ্যের দাম দেখুন।",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-10 min-[480px]:pt-10 min-[480px]:pb-12">
      <section
        className="mx-auto max-w-[640px] rounded-box border border-base-300 bg-base-100 px-5 py-6 [overflow-wrap:anywhere] min-[480px]:p-8"
        aria-labelledby="not-found-heading"
      >
        <p className="mb-2 text-[40px] leading-12 font-bold text-primary">৪০৪</p>
        <h1 id="not-found-heading" className="mb-3 text-2xl font-bold">পেজটি পাওয়া যায়নি</h1>
        <p className="text-muted">
          লিংকটি ভুল হতে পারে অথবা পেজটি সরিয়ে নেওয়া হয়েছে। হোম পেজ থেকে
          নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন।
        </p>
        <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
          <Link href="/" className="btn btn-primary h-11 w-full whitespace-normal min-[480px]:w-auto">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </div>
  );
}
