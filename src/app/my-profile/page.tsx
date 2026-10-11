import type { Metadata } from "next";
import Link from "next/link";
import { ProfileSignOut } from "@/components/auth/profile-sign-out";
import { requireProfileSession } from "@/lib/profile-session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireProfileSession();

  return (
    <div className="mx-auto grid w-full max-w-3xl content-start gap-6 px-4 pt-8 pb-12 min-[480px]:pt-10">
      <header>
        <h1 className="mb-2 text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>
      <section className="card card-border flex-row flex-wrap items-center gap-3 border-base-300 bg-base-100 p-5 min-[480px]:flex-nowrap min-[480px]:gap-4 min-[480px]:p-6" aria-label="অ্যাকাউন্ট পরিচিতি">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-box bg-mint text-2xl font-semibold text-forest min-[480px]:h-[70px] min-[480px]:w-20 min-[480px]:text-[32px]" aria-hidden="true">{user.name.trim().slice(0, 1) || "অ"}</span>
        <div className="min-w-0 flex-1 basis-[calc(100%-68px)] [overflow-wrap:anywhere] min-[480px]:basis-auto">
          <h2 className="mb-1 text-xl font-semibold">{user.name}</h2>
          <p className="text-muted">{user.email}</p>
        </div>
        <ProfileSignOut />
      </section>
      <section className="card card-border min-w-0 border-base-300 bg-base-100 p-5" aria-labelledby="profile-information-title">
        <h2 id="profile-information-title" className="mb-5 text-lg font-semibold">তথ্য</h2>
        <dl className="mb-5 grid gap-4">
          <div><dt className="mb-1 text-sm text-muted">নাম</dt><dd className="[overflow-wrap:anywhere]">{user.name}</dd></div>
          <div><dt className="mb-1 text-sm text-muted">ইমেইল</dt><dd className="[overflow-wrap:anywhere]">{user.email}</dd></div>
        </dl>
        <Link href="/my-profile/update" className="btn btn-primary h-11 w-fit min-[480px]:h-10" prefetch={false}>তথ্য আপডেট করুন</Link>
      </section>
    </div>
  );
}
