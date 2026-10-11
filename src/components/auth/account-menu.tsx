"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretDownIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function AccountMenu() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);
  const router = useRouter();

  async function signOut() {
    setSigningOut(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Sign out failed");
      toast.success("সাইন আউট হয়েছে।");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) return <span className="skeleton block h-10 w-35" role="status" aria-label="অ্যাকাউন্ট লোড হচ্ছে…" />;
  if (error) return <button className="btn btn-ghost btn-sm sm:btn-md" onClick={() => refetch()}>অ্যাকাউন্ট আবার লোড করুন</button>;
  if (!session) return (
    <>
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md" prefetch={false}>সাইন ইন</Link>
      <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md" prefetch={false}>সাইন আপ</Link>
    </>
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="btn btn-ghost h-10 max-w-60 gap-2 py-0.5 pr-2 pl-0.5 text-sm font-medium" disabled={signingOut}>
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-mint text-xl text-forest" aria-hidden="true">{session.user.name.trim().slice(0, 1) || <UserIcon size={20} />}</span>
        <span className="truncate">{signingOut ? "সাইন আউট হচ্ছে…" : session.user.name}</span>
        <CaretDownIcon size={14} aria-hidden="true" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-60 w-64 max-w-[calc(100vw-32px)] rounded-box border border-base-300 bg-base-100 p-2 shadow-[0_8px_24px_#0000001a]" align="end" sideOffset={8} collisionPadding={16}>
          <DropdownMenu.Label className="grid gap-0.5 px-3 py-2 [overflow-wrap:anywhere]"><strong className="text-sm font-semibold">{session.user.name}</strong><span className="text-xs text-muted">{session.user.email}</span></DropdownMenu.Label>
          <DropdownMenu.Separator className="m-1 h-px bg-base-300" />
          <DropdownMenu.Item asChild><Link className="flex min-h-10 cursor-pointer items-center gap-2 rounded-field px-3 py-1.5 text-sm outline-none data-disabled:cursor-not-allowed data-disabled:opacity-60 data-highlighted:bg-[#e3eee5]" href="/my-profile" prefetch={false}><UserIcon size={18} />আমার প্রোফাইল</Link></DropdownMenu.Item>
          <DropdownMenu.Item className="flex min-h-10 cursor-pointer items-center gap-2 rounded-field px-3 py-1.5 text-sm outline-none data-disabled:cursor-not-allowed data-disabled:opacity-60 data-highlighted:bg-[#e3eee5]" onSelect={signOut} disabled={signingOut}><SignOutIcon size={18} />সাইন আউট</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
