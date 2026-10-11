import { Suspense } from "react";
import { Hero, HeroSkeleton } from "@/components/layout/hero";
import { CatalogSkeleton } from "@/components/products/catalog-skeleton";
import { HomeCatalog } from "@/components/products/home-catalog";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<CatalogSkeleton />}>
        <HomeCatalog />
      </Suspense>
    </div>
  );
}
