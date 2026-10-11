import { connection } from "next/server";
import { formatPrice } from "@/lib/product-format";
import { getTopMovers } from "@/lib/product-movers";
import { getProducts } from "@/lib/products";
import { RefreshButton } from "@/components/ui/refresh-button";
import { ProductSection } from "./product-section";

export async function HomeCatalog() {
  await connection();

  let products;
  try {
    products = await getProducts();
  } catch {
    return (
      <section id="সব-পণ্য" className="catalog-message catalog-error" aria-labelledby="catalog-error-title">
        <h2 id="catalog-error-title">পণ্যের দাম লোড করা যাচ্ছে না</h2>
        <p>কিছুক্ষণ পরে আবার চেষ্টা করুন।</p>
        <RefreshButton />
      </section>
    );
  }

  const { risers, fallers } = getTopMovers(products);

  return (
    <div className="home-catalog">
      <ProductSection
        id="দাম-বেড়েছে"
        title="আজ দাম বেড়েছে"
        direction="up"
        products={risers}
        emptyMessage="আজ কোনো পণ্যের দাম বাড়েনি।"
      />
      <ProductSection
        id="দাম-কমেছে"
        title="আজ দাম কমেছে"
        direction="down"
        products={fallers}
        emptyMessage="আজ কোনো পণ্যের দাম কমেনি।"
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`বাংলাদেশের বাজারভিত্তিক নিত্যপ্রয়োজনীয় ${formatPrice(products.length)}টি পণ্যের আজকের দাম।`}
        products={products}
        emptyMessage="এখন কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না।"
      />
    </div>
  );
}
