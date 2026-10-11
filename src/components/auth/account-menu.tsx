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

  if (isPending) return <span className="account-skeleton card-skeleton" role="status" aria-label="অ্যাকাউন্ট লোড হচ্ছে…" />;
  if (error) return <button className="button button-ghost button-sm" onClick={() => refetch()}>অ্যাকাউন্ট আবার লোড করুন</button>;
  if (!session) return (
    <>
      <Link href="/signin" className="button button-ghost button-sm" prefetch={false}>সাইন ইন</Link>
      <Link href="/signup" className="button button-primary button-sm" prefetch={false}>সাইন আপ</Link>
    </>
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="account-trigger" disabled={signingOut}>
        <span className="account-avatar" aria-hidden="true">{session.user.name.trim().slice(0, 1) || <UserIcon size={20} />}</span>
        <span className="account-name">{signingOut ? "সাইন আউট হচ্ছে…" : session.user.name}</span>
        <CaretDownIcon size={14} aria-hidden="true" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="account-dropdown" align="end" sideOffset={8} collisionPadding={16}>
          <DropdownMenu.Label className="account-summary"><strong>{session.user.name}</strong><span>{session.user.email}</span></DropdownMenu.Label>
          <DropdownMenu.Separator className="account-separator" />
          <DropdownMenu.Item asChild><Link className="account-menu-item" href="/my-profile" prefetch={false}><UserIcon size={18} />আমার প্রোফাইল</Link></DropdownMenu.Item>
          <DropdownMenu.Item className="account-menu-item" onSelect={signOut} disabled={signingOut}><SignOutIcon size={18} />সাইন আউট</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
