import { PauseIcon } from "@phosphor-icons/react/ssr";

import {
  changeLabels,
  changeSymbols,
  formatPercent,
  formatPrice,
  unitLabels,
} from "@/lib/product-format";
import type { Product } from "@/types/product";

type PriceTickerProps = {
  products: Product[];
};

function TickerItem({ product }: { product: Product }) {
  return (
    <li className="ticker-item">
      <span aria-hidden="true">{product.image}</span>
      <span className="ticker-product-name">{product.nameBn}</span>
      <span className="ticker-price">
        {formatPrice(product.today)} টাকা/{unitLabels[product.unit]}
      </span>
      <span
        className={`ticker-change price-change--${product.change.dir}`}
      >
        <span aria-hidden="true">{changeSymbols[product.change.dir]}</span>
        <span className="sr-only">{changeLabels[product.change.dir]}, </span>
        <span>{formatPercent(product.change.pct)}%</span>
      </span>
    </li>
  );
}

export function PriceTicker({ products }: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="price-ticker" aria-label="আজকের বাজার দর">
      <input
        id="price-ticker-pause"
        className="ticker-pause-toggle"
        type="checkbox"
        aria-label="দামের তালিকার চলাচল বন্ধ করুন"
        aria-controls="price-ticker-track"
      />
      <label
        htmlFor="price-ticker-pause"
        className="ticker-pause-control"
      >
        <PauseIcon size={14} aria-hidden="true" />
        <span>বন্ধ করুন</span>
      </label>

      <div
        className="ticker-viewport"
        role="group"
        aria-label="পণ্যের দামের তালিকা"
        tabIndex={0}
      >
        <div id="price-ticker-track" className="ticker-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="ticker-list"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {products.map((product) => (
                <TickerItem key={product.id} product={product} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
