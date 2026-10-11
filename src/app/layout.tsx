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
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          মূল বিষয়বস্তুতে যান
        </a>
        <Suspense fallback={<HeaderSkeleton />}>
          <PageHeader />
        </Suspense>
        <Suspense fallback={<TickerSkeleton />}>
          <LivePriceTicker />
        </Suspense>
        <main id="main-content" className="site-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ToastProvider />
        <Suspense fallback={null}><AuthNotifications /></Suspense>
      </body>
    </html>
  );
}
