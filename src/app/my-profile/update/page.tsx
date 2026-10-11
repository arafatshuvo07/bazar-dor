import type { Metadata } from "next";
import { ProfileUpdateForm } from "@/components/auth/profile-update-form";
import { requireProfileSession } from "@/lib/profile-session";

export const metadata: Metadata = { title: "প্রোফাইল আপডেট" };

export default async function ProfileUpdatePage() {
  const { user } = await requireProfileSession();

  return (
    <div className="profile-page">
      <header className="profile-heading">
        <h1>প্রোফাইল আপডেট</h1>
        <p>আপনার নাম পরিবর্তন করে তথ্য আপডেট করুন।</p>
      </header>
      <section className="profile-information" aria-labelledby="profile-update-title">
        <h2 id="profile-update-title">তথ্য</h2>
        <ProfileUpdateForm name={user.name} email={user.email} />
      </section>
    </div>
  );
}
