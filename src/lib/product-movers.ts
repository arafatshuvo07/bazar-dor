import type { Product } from "@/types/product";

export function getTopMovers(products: Product[]) {
  return {
    risers: products
      .filter((product) => product.change.dir === "up")
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6),
    fallers: products
      .filter((product) => product.change.dir === "down")
      .sort((a, b) => a.change.pct - b.change.pct)
      .slice(0, 6),
  };
}
