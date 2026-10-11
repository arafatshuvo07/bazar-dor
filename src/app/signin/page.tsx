import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/auth-page";

export const metadata: Metadata = { title: "সাইন ইন" };
export default function SignInPage() { return <AuthPage mode="signin" />; }
