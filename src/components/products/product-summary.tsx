import Link from "next/link";
import { changeLabels, formatPrice, unitDescriptions, unitLabels } from "@/lib/product-format";
import type { Product } from "@/types/product";
import { PriceChangeBadge } from "./product-card";

export function ProductSummary({ product }: { product: Product }) {
  return (
    <header className="flex min-h-[174px] min-w-0 flex-col items-start justify-between gap-6 rounded-box border border-base-300 bg-base-100 p-5 md:flex-row md:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center text-4xl md:size-12" aria-hidden="true">{product.image}</span>
        <div>
          <h1 className="mb-1 text-2xl font-bold md:text-3xl">{product.nameBn}</h1>
          <p className="text-sm text-muted">{unitDescriptions[product.unit]} · {product.categoryNameBn}</p>
          <p className="mt-2 text-sm text-muted">গতকালের তুলনায় আজ {changeLabels[product.change.dir]}{product.change.dir !== "flat" && ` · ${formatPrice(Math.abs(product.today - product.yesterday))} টাকা`}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              className="badge badge-outline h-auto border-base-300 px-2.5 py-1 text-xs hover:border-primary"
              href={`/category/${encodeURIComponent(product.category)}`}
            >
              <span aria-hidden="true">{product.categoryIcon}</span> {product.categoryNameBn}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full shrink-0 items-end justify-between gap-4 md:w-auto md:justify-start">
        <p>
          <span className="block text-xs text-muted">আজকের দাম</span>
          <strong className="text-3xl font-bold">{formatPrice(product.today)}</strong>
          <span className="block text-xs text-muted">টাকা / {unitLabels[product.unit]}</span>
        </p>
        <PriceChangeBadge product={product} />
      </div>
    </header>
  );
}
