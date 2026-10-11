function SkeletonCards({ count }: { count: number }) {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="product-card card-skeleton" key={index}>
          <div className="product-card-summary">
            <span className="skeleton-emoji" />
            <span className="skeleton-copy" />
          </div>
          <span className="skeleton-price" />
        </div>
      ))}
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="home-catalog" aria-busy="true">
      <p className="sr-only" role="status">পণ্যের দাম লোড হচ্ছে…</p>
      {[
        { id: "দাম-বেড়েছে", title: "আজ দাম বেড়েছে ▲", count: 6 },
        { id: "দাম-কমেছে", title: "আজ দাম কমেছে ▼", count: 6 },
        { id: "সব-পণ্য", title: "সব পণ্য", count: 9 },
      ].map(({ id, title, count }) => (
        <section className="product-section" id={id} key={id} aria-label={title}>
          <div className="section-heading"><h2>{title}</h2></div>
          <SkeletonCards count={count} />
        </section>
      ))}
    </div>
  );
}
