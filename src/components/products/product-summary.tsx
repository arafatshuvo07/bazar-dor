import Link from "next/link";
import { changeLabels, changeSymbols, formatPercent, formatPrice, unitDescriptions, unitLabels } from "@/lib/product-format";
import type { Product } from "@/types/product";

export function ProductSummary({ product }: { product: Product }) {
  return (
    <header className="product-summary">
      <div className="product-summary-heading">
        <span className="product-summary-emoji" aria-hidden="true">{product.image}</span>
        <div>
          <h1>{product.nameBn}</h1>
          <p>{unitDescriptions[product.unit]} · {product.categoryNameBn}</p>
          <p className="product-summary-change">গতকালের তুলনায় আজ {changeLabels[product.change.dir]}{product.change.dir !== "flat" && ` · ${formatPrice(Math.abs(product.today - product.yesterday))} টাকা`}</p>
          <div className="product-summary-tags">
            <Link href={`/category/${encodeURIComponent(product.category)}`}><span aria-hidden="true">{product.categoryIcon}</span> {product.categoryNameBn}</Link>
          </div>
        </div>
      </div>
      <div className="product-summary-price">
        <p className="product-price"><span className="product-price-label">আজকের দাম</span><strong>{formatPrice(product.today)}</strong><span className="product-price-unit">টাকা / {unitLabels[product.unit]}</span></p>
        <span className={`price-change price-change--${product.change.dir}`}>
          <span className="sr-only">{changeLabels[product.change.dir]} {formatPercent(product.change.pct)} শতাংশ</span>
          <span aria-hidden="true">{changeSymbols[product.change.dir]} {formatPercent(product.change.pct)}%</span>
        </span>
      </div>
    </header>
  );
}
