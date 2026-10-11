import { connection } from "next/server";

import { getBangladeshDate } from "@/lib/bangladesh-date";
import { getCategories } from "@/lib/categories";
import type { Category } from "@/types/category";
import { Navbar } from "./navbar";

export async function PageHeader() {
  await connection();

  const date = getBangladeshDate(new Date());
  let categories: Category[] = [];
  let categoriesUnavailable = false;

  try {
    categories = await getCategories();
  } catch {
    categoriesUnavailable = true;
  }

  return (
    <Navbar
      categories={categories}
      dateLabel={date.label}
      dateTime={date.dateTime}
      categoriesUnavailable={categoriesUnavailable}
    />
  );
}

export function HeaderSkeleton() {
  return (
    <header className="site-header" aria-busy="true">
      <div className="site-container header-main" aria-hidden="true">
        <div className="header-placeholder">
          <span className="skeleton-brand" />
          <span className="skeleton-title" />
        </div>
        <span className="skeleton-actions" />
      </div>
      <div className="category-strip">
        <div className="site-container">
          <p className="category-status" role="status">
            ক্যাটাগরি লোড হচ্ছে…
          </p>
        </div>
      </div>
    </header>
  );
}
