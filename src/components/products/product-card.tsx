import Link from "next/link";
import {
  changeLabels,
  changeSymbols,
  formatPercent,
  formatPrice,
  unitDescriptions,
} from "@/lib/product-format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article>
      <Link
        className="product-card"
        href={`/product/${encodeURIComponent(product.slug)}`}
        prefetch={false}
      >
        <div className="product-card-summary">
          <span className="product-emoji" aria-hidden="true">{product.image}</span>
          <div>
            <h3>{product.nameBn}</h3>
            <p className="product-unit">{unitDescriptions[product.unit]}</p>
          </div>
        </div>
        <div className="product-price-row">
          <p className="product-price">
            <span className="product-price-label">আজকের দাম</span>
            <strong>{formatPrice(product.today)} টাকা</strong>
          </p>
          <span className={`price-change price-change--${product.change.dir}`}>
            <span className="sr-only">
              {changeLabels[product.change.dir]} {formatPercent(product.change.pct)} শতাংশ
            </span>
            <span aria-hidden="true">
              {changeSymbols[product.change.dir]} {formatPercent(product.change.pct)}%
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
