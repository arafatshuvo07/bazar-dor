import { connection } from "next/server";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import { PriceTicker } from "./price-ticker";

export async function LivePriceTicker() {
  await connection();

  let products: Product[] | undefined;
  try {
    products = await getProducts();
  } catch {
    products = undefined;
  }

  if (!products) {
    return (
      <div className="ticker-status">
        <p className="site-container">দামের তালিকা এখন লোড করা যাচ্ছে না।</p>
      </div>
    );
  }

  return <PriceTicker products={products} />;
}

export function TickerSkeleton() {
  return (
    <div className="ticker-status" aria-busy="true">
      <p className="site-container" role="status">দামের তালিকা লোড হচ্ছে…</p>
    </div>
  );
}
