import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="site-container product-detail-page">
      <section className="catalog-message category-message" aria-labelledby="product-not-found-title">
        <p className="category-status">৪০৪</p>
        <h1 id="product-not-found-title">পণ্যটি পাওয়া যায়নি</h1>
        <p>এই ঠিকানায় কোনো পণ্য নেই। হোম পেজ থেকে অন্য পণ্যের দাম দেখুন।</p>
        <Link className="button button-primary" href="/">হোম পেজে ফিরে যান</Link>
      </section>
    </div>
  );
}
