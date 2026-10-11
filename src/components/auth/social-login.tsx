"use client";

import { GoogleLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { useId, useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export type SocialProviders = {
  google: boolean;
  github: boolean;
};

type SocialLoginProps = {
  providers: SocialProviders;
  disabled?: boolean;
  onPendingChange?: (pending: boolean) => void;
};

export function setOAuthPending(pending: boolean) {
  try {
    if (pending) {
      sessionStorage.setItem("bazar:oauth-pending", "true");
    } else {
      sessionStorage.removeItem("bazar:oauth-pending");
    }
  } catch {
    return;
  }
}

export function SocialLogin({
  providers,
  disabled = false,
  onPendingChange,
}: SocialLoginProps) {
  const statusId = useId();
  const [pendingProvider, setPendingProvider] = useState<
    "google" | "github" | null
  >(null);
  const unavailableProviders = [
    ...(!providers.google ? ["Google"] : []),
    ...(!providers.github ? ["GitHub"] : []),
  ];

  async function signIn(provider: "google" | "github") {
    if (disabled || pendingProvider !== null || !providers[provider]) {
      return;
    }

    setPendingProvider(provider);
    onPendingChange?.(true);

    try {
      setOAuthPending(true);
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signin?error=oauth",
      });

      if (error) {
        setOAuthPending(false);
        toast.error(
          `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন শুরু করা যায়নি। আবার চেষ্টা করুন।`,
        );
      }
    } catch {
      setOAuthPending(false);
      toast.error("সংযোগ করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।");
    } finally {
      setPendingProvider(null);
      onPendingChange?.(false);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
        <button
          type="button"
          className="btn btn-outline h-11 min-w-0 gap-1.5 border-[#b8c7bc] px-2 text-xs font-normal hover:bg-soft min-[480px]:h-10"
          disabled={disabled || pendingProvider !== null || !providers.google}
          aria-busy={pendingProvider === "google"}
          aria-describedby={!providers.google ? statusId : undefined}
          onClick={() => signIn("google")}
        >
          <GoogleLogoIcon size={18} aria-hidden="true" />
          <span>
            {pendingProvider === "google"
              ? "অপেক্ষা করুন…"
              : "Google দিয়ে চালিয়ে যান"}
          </span>
        </button>
        <button
          type="button"
          className="btn btn-outline h-11 min-w-0 gap-1.5 border-[#b8c7bc] px-2 text-xs font-normal hover:bg-soft min-[480px]:h-10"
          disabled={disabled || pendingProvider !== null || !providers.github}
          aria-busy={pendingProvider === "github"}
          aria-describedby={!providers.github ? statusId : undefined}
          onClick={() => signIn("github")}
        >
          <GithubLogoIcon size={18} aria-hidden="true" />
          <span>
            {pendingProvider === "github"
              ? "অপেক্ষা করুন…"
              : "GitHub দিয়ে চালিয়ে যান"}
          </span>
        </button>
      </div>

      {unavailableProviders.length > 0 && (
        <p id={statusId} className="mt-3 text-xs leading-[18px] text-muted">
          {unavailableProviders.join(" ও ")} দিয়ে সাইন ইন এখন চালু নেই। ইমেইল
          দিয়ে চালিয়ে যান।
        </p>
      )}
    </div>
  );
}
