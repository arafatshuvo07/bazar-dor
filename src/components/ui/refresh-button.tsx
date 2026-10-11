"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className="btn btn-primary btn-sm sm:btn-md"
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => router.refresh())}
    >
      {isPending ? "লোড হচ্ছে…" : "আবার চেষ্টা করুন"}
    </button>
  );
}
