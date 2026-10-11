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

async function loadProducts(category?: string): Promise<Product[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  for (const endpoint of productEndpoints) {
    try {
      const url = new URL(endpoint);
      if (category) url.searchParams.set("category", category);

      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) continue;

      const data: unknown = await response.json();
      if (
        Array.isArray(data) && data.every(isProduct) &&
        (!category || data.every((product) => product.category === category))
      ) return data;
    } catch {
      continue;
    }
  }

  throw new Error("Product data is unavailable");
}

export const getProducts = cache(loadProducts);

async function loadProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  const products = await getProducts();
  const match = products.find((product) => product.slug === slug);
  if (!match) return null;

  let missingResponses = 0;
  for (const endpoint of productEndpoints) {
    try {
      const response = await fetch(`${endpoint}/${match.id}`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });
      if (response.status === 404) {
        missingResponses += 1;
        continue;
      }
      if (!response.ok) continue;
      const data: unknown = await response.json();
      if (isProduct(data) && data.id === match.id && data.slug === slug) return data;
    } catch {
      continue;
    }
  }

  if (missingResponses === productEndpoints.length) return null;
  throw new Error("Product details are unavailable");
}

export const getProductBySlug = cache(loadProductBySlug);
