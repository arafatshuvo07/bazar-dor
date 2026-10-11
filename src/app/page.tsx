import { Suspense } from "react";
import { Hero, HeroSkeleton } from "@/components/layout/hero";
import { CatalogSkeleton } from "@/components/products/catalog-skeleton";
import { HomeCatalog } from "@/components/products/home-catalog";

export default function Home() {
  return (
    <div className="site-container home-page">
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<CatalogSkeleton />}>
        <HomeCatalog />
      </Suspense>
    </div>
  );
}
