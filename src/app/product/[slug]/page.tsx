import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/products";
import { ProductSummary } from "@/components/products/product-summary";
import { ProductMarketPrices } from "@/components/products/market-prices";

export const metadata: Metadata = { title: "পণ্যের বিস্তারিত দাম" };

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");

  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
      <nav className="breadcrumbs mb-4 py-0 text-sm text-muted" aria-label="পেজের অবস্থান">
        <ul>
          <li><Link href="/" className="hover:text-primary">হোম</Link></li>
          <li><Link href={`/category/${encodeURIComponent(product.category)}`} className="hover:text-primary">{product.categoryNameBn}</Link></li>
          <li><span aria-current="page">{product.nameBn}</span></li>
        </ul>
      </nav>
      <ProductSummary product={product} />
      <ProductMarketPrices product={product} />
    </div>
  );
}
