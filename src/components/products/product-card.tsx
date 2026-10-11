import Link from "next/link";
import {
  changeLabels,
  changeSymbols,
  formatPercent,
  formatPrice,
  unitDescriptions,
} from "@/lib/product-format";
import type { Product } from "@/types/product";

export const changeBadgeColors = {
  up: "bg-up-soft text-up",
  down: "bg-down-soft text-down",
  flat: "bg-flat-soft text-muted",
} as const;

export function PriceChangeBadge({ product }: { product: Product }) {
  return (
    <span className={`badge h-auto shrink-0 border-0 px-2 py-1 text-xs leading-[18px] font-semibold ${changeBadgeColors[product.change.dir]}`}>
      <span className="sr-only">
        {changeLabels[product.change.dir]} {formatPercent(product.change.pct)} শতাংশ
      </span>
      <span aria-hidden="true">
        {changeSymbols[product.change.dir]} {formatPercent(product.change.pct)}%
      </span>
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article>
      <Link
        className="card card-border h-full min-h-[138px] justify-between gap-3 border-base-300 bg-base-100 p-4 transition-colors hover:border-[#9dbfa6] motion-reduce:transition-none"
        href={`/product/${encodeURIComponent(product.slug)}`}
        prefetch={false}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-soft text-[28px] leading-none" aria-hidden="true">
            {product.image}
          </span>
          <div>
            <h3 className="font-semibold">{product.nameBn}</h3>
            <p className="text-xs text-muted">{unitDescriptions[product.unit]}</p>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <p>
            <span className="block text-xs text-muted">আজকের দাম</span>
            <strong className="text-xl leading-7 font-bold">{formatPrice(product.today)} টাকা</strong>
          </p>
          <PriceChangeBadge product={product} />
        </div>
      </Link>
    </article>
  );
}
