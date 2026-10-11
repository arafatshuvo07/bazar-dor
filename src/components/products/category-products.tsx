"use client";

import { useId, useState } from "react";

import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/product-format";
import { ProductCard } from "./product-card";

type SortOrder = "default" | "price-asc" | "price-desc";

type CategoryProductsProps = {
  products: Product[];
};

export function CategoryProducts({ products }: CategoryProductsProps) {
  const selectId = useId();
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const sortedProducts = [...products];

  if (sortOrder === "price-asc") {
    sortedProducts.sort((first, second) => first.today - second.today);
  } else if (sortOrder === "price-desc") {
    sortedProducts.sort((first, second) => second.today - first.today);
  }

  return (
    <div className="category-products">
      <div className="product-sort">
        <label htmlFor={selectId}>সাজান:</label>
        <select
          id={selectId}
          className="sort-select"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="category-count">মোট {formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
