import { connection } from "next/server";

import { getBangladeshDate } from "@/lib/bangladesh-date";
import { getCategories } from "@/lib/categories";
import type { Category } from "@/types/category";
import { CategoryStatus, Navbar } from "./navbar";

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
    <header className="shrink-0 border-b border-base-300 bg-base-100" aria-busy="true">
      <div className="navbar mx-auto min-h-[68px] w-full max-w-6xl flex-wrap justify-between gap-3 px-4 py-3 min-[480px]:flex-nowrap" aria-hidden="true">
        <div className="inline-flex flex-[1_1_100%] items-center gap-3 min-[480px]:flex-initial">
          <span className="skeleton size-10 rounded-xl" />
          <span className="skeleton h-8 w-30" />
        </div>
        <span className="skeleton ml-auto h-10 w-36" />
      </div>
      <CategoryStatus>ক্যাটাগরি লোড হচ্ছে…</CategoryStatus>
    </header>
  );
}
