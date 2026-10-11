import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = { title: "অ্যাকাউন্ট তৈরি করুন" };
export default function SignUpPage() { return <AuthPage mode="signup" />; }
