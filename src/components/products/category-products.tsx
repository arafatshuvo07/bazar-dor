"use client";

import { useId, useState } from "react";

import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/product-format";
import { ProductCard } from "./product-card";
import { productGridClass } from "./product-section";

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
    <div>
      <div className="mb-4 flex min-h-[66px] items-center justify-end gap-2 rounded-box border border-base-300 bg-base-100 p-4">
        <label htmlFor={selectId} className="shrink-0 text-sm text-muted">সাজান:</label>
        <select
          id={selectId}
          className="select select-sm h-11 min-w-0 flex-1 text-sm min-[480px]:h-8 min-[480px]:w-auto min-[480px]:min-w-[170px] min-[480px]:flex-none min-[480px]:text-xs"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-muted">মোট {formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <div className={productGridClass}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
