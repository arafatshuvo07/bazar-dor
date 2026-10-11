"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function ToastProvider() {
  return <Toaster position="top-center" toastOptions={{ duration: 4500, style: { fontFamily: "var(--font-bangla), sans-serif", background: "#fafcfa", color: "#1d271f" } }} />;
}

export function AuthNotifications() {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const oauthError = pathname === "/signin" && searchParams.has("error");
  const loginRequired = pathname === "/signin" && searchParams.get("reason") === "login-required";

  useEffect(() => {
    if (loginRequired) {
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।", { id: "login-required" });
      router.replace("/signin", { scroll: false });
      return;
    }
    if (oauthError) {
      try { sessionStorage.removeItem("bazar:oauth-pending"); } catch {}
      toast.error("Social login সম্পূর্ণ হয়নি। আবার চেষ্টা করুন অথবা ইমেইল দিয়ে সাইন ইন করুন।", { id: "oauth-result" });
      router.replace("/signin", { scroll: false });
      return;
    }
    if (session?.user && pathname === "/") {
      try {
        if (sessionStorage.getItem("bazar:oauth-pending") === "true") {
          sessionStorage.removeItem("bazar:oauth-pending");
          toast.success("সাইন ইন সফল হয়েছে।", { id: "oauth-result" });
        }
      } catch {}
    }
  }, [session?.user, pathname, oauthError, loginRequired, router]);

  return null;
}
