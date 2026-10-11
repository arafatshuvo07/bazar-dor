import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CategoryProducts } from "@/components/products/category-products";
import { RefreshButton } from "@/components/ui/refresh-button";
import { getCategories } from "@/lib/categories";
import { formatPrice } from "@/lib/product-format";
import { getProducts } from "@/lib/products";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export const metadata: Metadata = { title: "ক্যাটাগরি অনুযায়ী বাজার দর" };

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  await connection();
  const { slug } = await params;
  let category: Category | undefined;
  let products: Product[] | undefined;
  let unavailable = false;

  try {
    const categories = await getCategories();
    category = categories.find((item) => item.slug === slug);
    if (category) products = await getProducts(category.slug);
  } catch {
    unavailable = true;
  }

  if (unavailable) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
        <section className="rounded-box border border-base-300 bg-base-100 p-6 text-muted" aria-labelledby="category-error-title">
          <h1 id="category-error-title" className="mb-2 text-2xl font-bold text-base-content">পণ্যের দাম লোড করা যাচ্ছে না</h1>
          <p className="mb-4">সংযোগে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
          <RefreshButton />
        </section>
      </div>
    );
  }

  if (!category || !products?.length) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
      <header className="flex min-h-[94px] items-center gap-3 rounded-box border border-base-300 bg-base-100 p-5">
        <span className="shrink-0 text-4xl leading-10" aria-hidden="true">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-muted">{formatPrice(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>
      <section className="mt-6" aria-label={`${category.nameBn} পণ্যের তালিকা`}>
        <CategoryProducts key={category.slug} products={products} />
      </section>
    </div>
  );
}
