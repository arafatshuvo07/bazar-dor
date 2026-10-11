import { ShoppingCartIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Suspense } from "react";

import type { Category } from "@/types/category";
import { AccountMenu } from "@/components/auth/account-menu";
import { CategoryNav } from "./category-nav";

type NavbarProps = {
  categories: Category[];
  dateLabel: string;
  dateTime?: string;
  categoriesUnavailable?: boolean;
};

export function CategoryStatus({ children }: { children: string }) {
  return (
    <div className="border-t border-base-300">
      <div className="mx-auto w-full max-w-6xl px-4">
        <p className="flex min-h-12 items-center py-2 text-xs text-muted" role="status">
          {children}
        </p>
      </div>
    </div>
  );
}

export function Navbar({
  categories,
  dateLabel,
  dateTime,
  categoriesUnavailable = false,
}: NavbarProps) {
  return (
    <header className="shrink-0 border-b border-base-300 bg-base-100 text-base-content">
      <div className="navbar mx-auto min-h-[68px] w-full max-w-6xl flex-wrap justify-between gap-3 px-4 py-3 min-[480px]:flex-nowrap min-[480px]:gap-4">
        <Link href="/" className="inline-flex min-w-0 flex-[1_1_100%] items-center gap-3 min-[480px]:flex-initial">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-content" aria-hidden="true">
            <ShoppingCartIcon size={22} weight="regular" />
          </span>
          <span>
            <span className="block text-xl leading-7 font-bold">বাজার দর</span>
            <time className="block text-xs text-muted" dateTime={dateTime}>
              {dateLabel}
            </time>
          </span>
        </Link>

        <nav className="ml-auto flex shrink-0 items-center gap-2" aria-label="অ্যাকাউন্ট">
          <AccountMenu />
        </nav>
      </div>

      <Suspense fallback={<CategoryStatus>ক্যাটাগরি লোড হচ্ছে…</CategoryStatus>}>
        <CategoryNav
          categories={categories}
          unavailable={categoriesUnavailable}
        />
      </Suspense>
    </header>
  );
}
