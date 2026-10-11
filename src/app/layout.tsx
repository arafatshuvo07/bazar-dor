import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { HeaderSkeleton, PageHeader } from "@/components/layout/page-header";
import { LivePriceTicker, TickerSkeleton } from "@/components/layout/live-price-ticker";
import { AuthNotifications, ToastProvider } from "@/providers/auth-notifications";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর | নিত্যপ্রয়োজনীয় পণ্যের দাম",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম, দামের পরিবর্তন এবং বাজারভিত্তিক তথ্য দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn-BD"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-base-200 font-sans text-base leading-normal text-base-content">
        <a href="#main-content" className="btn btn-neutral btn-sm absolute top-2 left-4 z-50 -translate-y-[150%] focus:translate-y-0">
          মূল বিষয়বস্তুতে যান
        </a>
        <Suspense fallback={<HeaderSkeleton />}>
          <PageHeader />
        </Suspense>
        <Suspense fallback={<TickerSkeleton />}>
          <LivePriceTicker />
        </Suspense>
        <main id="main-content" className="min-w-0 flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ToastProvider />
        <Suspense fallback={null}><AuthNotifications /></Suspense>
      </body>
    </html>
  );
}
