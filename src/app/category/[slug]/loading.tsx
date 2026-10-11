import { SkeletonCards } from "@/components/products/catalog-skeleton";

export default function CategoryLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12" aria-busy="true">
      <p className="sr-only" role="status">ক্যাটাগরির পণ্যের দাম লোড হচ্ছে…</p>
      <div className="flex min-h-[94px] items-center gap-3 rounded-box border border-base-300 bg-base-100 p-5" aria-hidden="true">
        <span className="skeleton size-12 shrink-0 rounded-xl" />
        <span className="skeleton h-8 w-1/2" />
      </div>
      <div className="mt-6">
        <div className="mb-4 flex min-h-[66px] items-center justify-end rounded-box border border-base-300 bg-base-100 p-4" aria-hidden="true"><span className="skeleton h-8 w-[170px]" /></div>
        <SkeletonCards count={6} />
      </div>
    </div>
  );
}
