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

export function Navbar({
  categories,
  dateLabel,
  dateTime,
  categoriesUnavailable = false,
}: NavbarProps) {
  return (
    <header className="site-header">
      <div className="site-container header-main">
        <Link href="/" className="brand-link">
          <span className="brand-icon" aria-hidden="true">
            <ShoppingCartIcon size={22} weight="regular" />
          </span>
          <span>
            <span className="brand-name">বাজার দর</span>
            <time className="brand-date" dateTime={dateTime}>
              {dateLabel}
            </time>
          </span>
        </Link>

        <nav className="auth-links" aria-label="অ্যাকাউন্ট">
          <AccountMenu />
        </nav>
      </div>

      <Suspense
        fallback={
          <div className="category-strip">
            <div className="site-container">
              <p className="category-status" role="status">
                ক্যাটাগরি লোড হচ্ছে…
              </p>
            </div>
          </div>
        }
      >
        <CategoryNav
          categories={categories}
          unavailable={categoriesUnavailable}
        />
      </Suspense>
    </header>
  );
}
