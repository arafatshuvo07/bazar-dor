import "server-only";

import type { Category } from "@/types/category";

const categoryEndpoints = [
  "https://openapi.programming-hero.com/api/bazardor/categories",
  "https://api.abcz.workers.dev/api/bazardor/categories",
];

function isCategory(value: unknown): value is Category {
  if (typeof value !== "object" || value === null) return false;

  const category = value as Record<string, unknown>;
  return ["id", "slug", "nameBn", "icon"].every(
    (key) =>
      typeof category[key] === "string" && category[key].trim().length > 0,
  );
}

export async function getCategories(): Promise<Category[]> {
  for (const endpoint of categoryEndpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) continue;

      const data: unknown = await response.json();
      if (Array.isArray(data) && data.length > 0 && data.every(isCategory)) {
        return data;
      }
    } catch {
      continue;
    }
  }

  throw new Error("Category data is unavailable");
}
