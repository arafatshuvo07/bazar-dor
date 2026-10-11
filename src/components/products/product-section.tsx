import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

type ProductSectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  direction?: "up" | "down";
  products: Product[];
  emptyMessage: string;
};

export const productGridClass = "grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3";

export function ProductSection({
  id, title, subtitle, direction, products, emptyMessage,
}: ProductSectionProps) {
  return (
    <section id={id} className="min-w-0 scroll-mt-6" aria-labelledby={`${id}-title`}>
      <div className="mb-4">
        <h2 id={`${id}-title`} className="flex items-center gap-2 text-xl leading-7 font-bold">
          {title}
          {direction && (
            <span className={`text-sm ${direction === "up" ? "text-up" : "text-down"}`} aria-hidden="true">
              {direction === "up" ? "▲" : "▼"}
            </span>
          )}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {products.length > 0 ? (
        <div className={productGridClass}>
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : <p className="rounded-box border border-base-300 bg-base-100 p-6 text-muted">{emptyMessage}</p>}
    </section>
  );
}
