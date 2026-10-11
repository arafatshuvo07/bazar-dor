import { productGridClass } from "./product-section";

export function SkeletonCards({ count }: { count: number }) {
  return (
    <div className={productGridClass} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="card card-border min-h-[138px] justify-between gap-3 border-base-300 bg-base-100 p-4" key={index}>
          <div className="flex items-center gap-3">
            <span className="skeleton size-12 shrink-0 rounded-xl" />
            <span className="skeleton h-8 w-1/2" />
          </div>
          <span className="skeleton h-8 w-2/5" />
        </div>
      ))}
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="mt-8 grid gap-8 md:mt-10 md:gap-10" aria-busy="true">
      <p className="sr-only" role="status">পণ্যের দাম লোড হচ্ছে…</p>
      {[
        { id: "দাম-বেড়েছে", title: "আজ দাম বেড়েছে ▲", count: 6 },
        { id: "দাম-কমেছে", title: "আজ দাম কমেছে ▼", count: 6 },
        { id: "সব-পণ্য", title: "সব পণ্য", count: 9 },
      ].map(({ id, title, count }) => (
        <section className="min-w-0 scroll-mt-6" id={id} key={id} aria-label={title}>
          <div className="mb-4"><h2 className="text-xl leading-7 font-bold">{title}</h2></div>
          <SkeletonCards count={count} />
        </section>
      ))}
    </div>
  );
}
