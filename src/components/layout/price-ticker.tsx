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

const changeTextColors = {
  up: "text-up",
  down: "text-down",
  flat: "text-muted",
} as const;

function TickerItem({ product }: { product: Product }) {
  return (
    <li className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
      <span aria-hidden="true">{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span>
        {formatPrice(product.today)} টাকা/{unitLabels[product.unit]}
      </span>
      <span className={`font-semibold ${changeTextColors[product.change.dir]}`}>
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
    <section
      className="group relative min-h-[37px] min-w-0 border-b border-base-300 bg-base-100 text-sm text-base-content"
      aria-label="আজকের বাজার দর"
    >
      <input
        id="price-ticker-pause"
        className="peer sr-only motion-reduce:hidden"
        type="checkbox"
        aria-label="দামের তালিকার চলাচল বন্ধ করুন"
        aria-controls="price-ticker-track"
      />
      <label
        htmlFor="price-ticker-pause"
        className="absolute top-0 right-0 z-1 inline-flex min-h-9 cursor-pointer items-center gap-1 border-l border-base-300 bg-base-100 px-3 py-2 text-xs peer-checked:bg-mint peer-checked:text-primary peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-3 peer-focus-visible:outline-primary motion-reduce:hidden"
      >
        <PauseIcon size={14} aria-hidden="true" />
        <span>বন্ধ করুন</span>
      </label>

      <div
        className="overflow-hidden peer-checked:*:[animation-play-state:paused] motion-reduce:overflow-x-auto"
        role="group"
        aria-label="পণ্যের দামের তালিকা"
        tabIndex={0}
      >
        <div
          id="price-ticker-track"
          className="flex w-max animate-ticker group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className={`flex shrink-0 items-center gap-6 py-2 pr-6 pl-4 ${
                copy === 1 ? "motion-reduce:hidden" : ""
              }`}
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
