import "server-only";

import { cache } from "react";
import { cacheLife } from "next/cache";
import type { Product } from "@/types/product";

const productEndpoints = [
  "https://openapi.programming-hero.com/api/bazardor/products",
  "https://api.abcz.workers.dev/api/bazardor/products",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPrice(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;

  const strings = [
    "slug", "nameBn", "category", "categoryNameBn", "categoryIcon", "image",
  ];

  return (
    Number.isInteger(value.id) &&
    Number(value.id) > 0 &&
    strings.every((key) => typeof value[key] === "string" && value[key].trim()) &&
    ["kg", "litre", "dozen", "piece"].includes(String(value.unit)) &&
    ["today", "yesterday", "lastWeek", "lastMonth"].every((key) => isPrice(value[key])) &&
    isRecord(value.change) &&
    ["up", "down", "flat"].includes(String(value.change.dir)) &&
    typeof value.change.pct === "number" &&
    Number.isFinite(value.change.pct) &&
    Array.isArray(value.markets) &&
    value.markets.every((market: unknown) =>
      isRecord(market) &&
      typeof market.market === "string" &&
      typeof market.division === "string" &&
      isPrice(market.min) && isPrice(market.max) && market.min <= market.max,
    )
  );
}

async function loadProducts(): Promise<Product[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  for (const endpoint of productEndpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) continue;

      const data: unknown = await response.json();
      if (Array.isArray(data) && data.every(isProduct)) return data;
    } catch {
      continue;
    }
  }

  throw new Error("Product data is unavailable");
}

export const getProducts = cache(loadProducts);
