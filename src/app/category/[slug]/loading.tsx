import { SkeletonCards } from "@/components/products/catalog-skeleton";

export default function CategoryLoading() {
  return (
    <div className="site-container category-page" aria-busy="true">
      <p className="sr-only" role="status">ক্যাটাগরির পণ্যের দাম লোড হচ্ছে…</p>
      <div className="category-heading card-skeleton" aria-hidden="true">
        <span className="skeleton-emoji" />
        <span className="skeleton-copy" />
      </div>
      <div className="category-catalog">
        <div className="product-sort card-skeleton" aria-hidden="true"><span className="skeleton-copy" /></div>
        <SkeletonCards count={6} />
      </div>
    </div>
  );
}
