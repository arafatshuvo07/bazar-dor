export default function ProductLoading() {
  return (
    <div className="site-container product-detail-page" aria-busy="true">
      <p className="sr-only" role="status">পণ্যের বিস্তারিত লোড হচ্ছে…</p>
      <div className="product-summary card-skeleton" aria-hidden="true">
        <span className="skeleton-emoji" /><span className="skeleton-copy" /><span className="skeleton-price" />
      </div>
    </div>
  );
}
