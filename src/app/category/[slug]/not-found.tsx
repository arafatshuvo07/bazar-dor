import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="site-container category-page">
      <section className="catalog-message category-message" aria-labelledby="category-not-found-title">
        <p className="category-status">৪০৪</p>
        <h1 id="category-not-found-title">এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি</h1>
        <p>ক্যাটাগরিটি নেই অথবা এখন কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না। হোম পেজ থেকে অন্য পণ্যের দাম দেখুন।</p>
        <Link className="button button-primary" href="/">হোম পেজে ফিরে যান</Link>
      </section>
    </div>
  );
}
