import type { Metadata } from "next";
import Link from "next/link";
import { ProfileSignOut } from "@/components/auth/profile-sign-out";
import { requireProfileSession } from "@/lib/profile-session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const { user } = await requireProfileSession();

  return (
    <div className="profile-page">
      <header className="profile-heading">
        <h1>আমার প্রোফাইল</h1>
        <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>
      <section className="profile-identity" aria-label="অ্যাকাউন্ট পরিচিতি">
        <span className="profile-avatar" aria-hidden="true">{user.name.trim().slice(0, 1) || "অ"}</span>
        <div className="profile-identity-text">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <ProfileSignOut />
      </section>
      <section className="profile-information" aria-labelledby="profile-information-title">
        <h2 id="profile-information-title">তথ্য</h2>
        <dl className="profile-fields">
          <div><dt>নাম</dt><dd>{user.name}</dd></div>
          <div><dt>ইমেইল</dt><dd>{user.email}</dd></div>
        </dl>
        <Link href="/my-profile/update" className="button button-primary" prefetch={false}>তথ্য আপডেট করুন</Link>
      </section>
    </div>
  );
}
