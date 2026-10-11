"use client";

import { SignOutIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function ProfileSignOut() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function signOut() {
    setPending(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Sign out failed");
      toast.success("সাইন আউট হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" className="btn btn-outline btn-error ml-auto h-11 shrink-0 border-error/25 text-sm hover:border-error hover:bg-[#fbeded] hover:text-error min-[480px]:ml-0 min-[480px]:h-10" disabled={pending} onClick={signOut}>
      <SignOutIcon size={16} aria-hidden="true" />
      {pending ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}
    </button>
  );
}
