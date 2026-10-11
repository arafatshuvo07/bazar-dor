export default function ProductLoading() {
  return (
    <div className="site-container product-detail-page" aria-busy="true">
      <p className="sr-only" role="status">পণ্যের বিস্তারিত লোড হচ্ছে…</p>
      <div className="product-summary card-skeleton" aria-hidden="true">
        <span className="skeleton-emoji" /><span className="skeleton-copy" /><span className="skeleton-price" />
      </div>
      <div className="product-market-prices card-skeleton" aria-hidden="true">
        <div className="market-summary-grid">
          {Array.from({ length: 3 }, (_, index) => <div key={index} className="market-summary-stat"><span className="skeleton-copy" /><span className="skeleton-price" /></div>)}
        </div>
        <div className="market-table-skeleton">
          {Array.from({ length: 5 }, (_, index) => <span key={index} className="market-row-skeleton" />)}
        </div>
      </div>
    </div>
  );
}
