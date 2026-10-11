import { connection } from "next/server";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import { PriceTicker } from "./price-ticker";

function TickerStatus({ children, busy = false }: { children: string; busy?: boolean }) {
  return (
    <div className="min-h-[37px] border-b border-base-300 bg-base-100" aria-busy={busy || undefined}>
      <p className="mx-auto w-full max-w-6xl px-4 py-2 text-xs text-muted" role={busy ? "status" : undefined}>
        {children}
      </p>
    </div>
  );
}

export async function LivePriceTicker() {
  await connection();

  let products: Product[] | undefined;
  try {
    products = await getProducts();
  } catch {
    products = undefined;
  }

  if (!products) {
    return <TickerStatus>দামের তালিকা এখন লোড করা যাচ্ছে না।</TickerStatus>;
  }

  return <PriceTicker products={products} />;
}

export function TickerSkeleton() {
  return <TickerStatus busy>দামের তালিকা লোড হচ্ছে…</TickerStatus>;
}
