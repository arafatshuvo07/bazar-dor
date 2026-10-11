"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Category } from "@/types/category";

type CategoryNavProps = {
  categories: Category[];
  unavailable?: boolean;
};

export function CategoryNav({
  categories,
  unavailable = false,
}: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <nav className="category-strip" aria-label="পণ্যের ক্যাটাগরি">
      <div className="site-container">
        {unavailable ? (
          <p className="category-status" role="status">
            ক্যাটাগরি এখন লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।
          </p>
        ) : (
          <ul className="category-list">
            {categories.map((category) => {
              const href = `/category/${encodeURIComponent(category.slug)}`;
              const isActive = pathname === href;

              return (
                <li key={category.id}>
                  <Link
                    href={href}
                    className={`category-link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    prefetch={false}
                  >
                    <span aria-hidden="true">{category.icon}</span>
                    <span>{category.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
