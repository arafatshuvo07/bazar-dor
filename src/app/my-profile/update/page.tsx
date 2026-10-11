import type { Metadata } from "next";
import { ProfileUpdateForm } from "@/components/auth/profile-update-form";
import { requireProfileSession } from "@/lib/profile-session";

export const metadata: Metadata = { title: "প্রোফাইল আপডেট" };

export default async function ProfileUpdatePage() {
  const { user } = await requireProfileSession();

  return (
    <div className="mx-auto grid w-full max-w-3xl content-start gap-6 px-4 pt-8 pb-12 min-[480px]:pt-10">
      <header>
        <h1 className="mb-2 text-2xl font-bold">প্রোফাইল আপডেট</h1>
        <p className="text-sm text-muted">আপনার নাম পরিবর্তন করে তথ্য আপডেট করুন।</p>
      </header>
      <section className="card card-border min-w-0 border-base-300 bg-base-100 p-5" aria-labelledby="profile-update-title">
        <h2 id="profile-update-title" className="mb-5 text-lg font-semibold">তথ্য</h2>
        <ProfileUpdateForm name={user.name} email={user.email} />
      </section>
    </div>
  );
}
