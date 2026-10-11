import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
      <section className="rounded-box border border-base-300 bg-base-100 p-6 text-muted" aria-labelledby="category-not-found-title">
        <p className="text-4xl font-bold text-primary">৪০৪</p>
        <h1 id="category-not-found-title" className="mb-2 text-2xl font-bold text-base-content">এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি</h1>
        <p className="mb-4">ক্যাটাগরিটি নেই অথবা এখন কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না। হোম পেজ থেকে অন্য পণ্যের দাম দেখুন।</p>
        <Link className="btn btn-primary" href="/">হোম পেজে ফিরে যান</Link>
      </section>
    </div>
  );
}
