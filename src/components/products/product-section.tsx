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

export function ProductSection({
  id, title, subtitle, direction, products, emptyMessage,
}: ProductSectionProps) {
  return (
    <section id={id} className="product-section" aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <h2 id={`${id}-title`}>
          {title}
          {direction && (
            <span className={`section-direction price-change--${direction}`} aria-hidden="true">
              {direction === "up" ? "▲" : "▼"}
            </span>
          )}
        </h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : <p className="catalog-message">{emptyMessage}</p>}
    </section>
  );
}
