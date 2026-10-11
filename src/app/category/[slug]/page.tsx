import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ProductCard } from "@/components/products/product-card";
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
      <div className="site-container category-page">
        <section className="catalog-message category-message" aria-labelledby="category-error-title">
          <h1 id="category-error-title">পণ্যের দাম লোড করা যাচ্ছে না</h1>
          <p>সংযোগে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
          <RefreshButton />
        </section>
      </div>
    );
  }

  if (!category || !products?.length) notFound();

  return (
    <div className="site-container category-page">
      <header className="category-heading">
        <span className="category-heading-icon" aria-hidden="true">{category.icon}</span>
        <div>
          <h1>{category.nameBn}</h1>
          <p>{formatPrice(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>
      <section className="category-catalog" aria-label={`${category.nameBn} পণ্যের তালিকা`}>
        <p className="category-count">মোট {formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="product-grid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
