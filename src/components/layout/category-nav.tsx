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
    <nav className="border-t border-base-300" aria-label="পণ্যের ক্যাটাগরি">
      <div className="mx-auto w-full max-w-6xl px-4">
        {unavailable ? (
          <p className="flex min-h-12 items-center py-2 text-xs text-muted" role="status">
            ক্যাটাগরি এখন লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।
          </p>
        ) : (
          <ul className="flex min-h-12 items-center gap-1 overflow-x-auto py-2 [scrollbar-color:#bacbbb_transparent] [scrollbar-width:thin]">
            {categories.map((category) => {
              const href = `/category/${encodeURIComponent(category.slug)}`;
              const isActive = pathname === href;

              return (
                <li key={category.id} className="shrink-0">
                  <Link
                    href={href}
                    className={`btn btn-sm h-10 min-h-10 gap-1.5 px-3 text-xs md:h-8 md:min-h-8 ${
                      isActive ? "btn-primary" : "btn-ghost"
                    }`}
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
