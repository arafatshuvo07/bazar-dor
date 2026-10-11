import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/products";
import { ProductSummary } from "@/components/products/product-summary";

export const metadata: Metadata = { title: "পণ্যের বিস্তারিত দাম" };

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login-required");

  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="site-container product-detail-page">
      <nav className="product-breadcrumb" aria-label="পেজের অবস্থান">
        <Link href="/">হোম</Link><span aria-hidden="true">/</span>
        <Link href={`/category/${encodeURIComponent(product.category)}`}>{product.categoryNameBn}</Link>
        <span aria-hidden="true">/</span><span aria-current="page">{product.nameBn}</span>
      </nav>
      <ProductSummary product={product} />
    </div>
  );
}
