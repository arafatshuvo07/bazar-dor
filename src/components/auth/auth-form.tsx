"use client";

import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type Ref,
} from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import {
  setOAuthPending,
  SocialLogin,
  type SocialProviders,
} from "./social-login";

type AuthFormProps = {
  mode: "signin" | "signup";
  socialProviders: SocialProviders;
};

type PasswordFieldProps = {
  id: string;
  name: "password" | "confirmPassword";
  label: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  disabled: boolean;
  inputRef?: Ref<HTMLInputElement>;
};

function PasswordField({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  disabled,
  inputRef,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const toggleLabel =
    name === "confirmPassword" ? "নিশ্চিতকরণের পাসওয়ার্ড" : "পাসওয়ার্ড";

  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={name}
          className="input w-full h-11 text-base min-[480px]:h-10 min-[480px]:text-sm placeholder:text-[#68796c] pr-11"
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={8}
          maxLength={128}
          required
          disabled={disabled}
        />
        <button
          type="button"
          className="btn btn-ghost btn-square btn-sm absolute top-1/2 right-1 -translate-y-1/2 text-muted hover:bg-soft hover:text-base-content"
          aria-label={`${toggleLabel} ${visible ? "লুকান" : "দেখান"}`}
          aria-controls={id}
          aria-pressed={visible}
          disabled={disabled}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? (
            <EyeSlashIcon size={18} aria-hidden="true" />
          ) : (
            <EyeIcon size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

function getErrorMessage(
  error: { code?: string; status?: number },
  mode: "signin" | "signup",
) {
  if (error.status === 429) {
    return "অনেকবার চেষ্টা করা হয়েছে। একটু পরে আবার চেষ্টা করুন।";
  }

  switch (error.code) {
    case "INVALID_EMAIL_OR_PASSWORD":
    case "INVALID_PASSWORD":
      return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
    case "INVALID_EMAIL":
      return "সঠিক ইমেইল ঠিকানা লিখুন।";
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "এই ইমেইলে অ্যাকাউন্ট আছে। সাইন ইন করুন।";
    case "PASSWORD_TOO_SHORT":
      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
    case "PASSWORD_TOO_LONG":
      return "পাসওয়ার্ড ১২৮ অক্ষরের মধ্যে রাখুন।";
    default:
      return mode === "signup"
        ? "সাইন আপ করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।"
        : "সাইন ইন করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।";
  }
}

export function AuthForm({ mode, socialProviders }: AuthFormProps) {
  const formId = useId();
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [socialPending, setSocialPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const isSignup = mode === "signup";
  const busy = submitting || socialPending;

  function reportError(message: string) {
    setFormError(message);
    toast.error(message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    setFormError(null);

    if (isSignup && !name) {
      reportError("আপনার নাম লিখুন।");
      nameRef.current?.focus();
      return;
    }

    if (isSignup && password !== confirmPassword) {
      reportError("দুটি পাসওয়ার্ড মিলছে না। আবার লিখুন।");
      confirmPasswordRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setOAuthPending(false);

    try {
      if (isSignup) {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (error) {
          reportError(getErrorMessage(error, mode));
          return;
        }

        form.reset();
        toast.success("এবার ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।");
        router.replace("/signin");
      } else {
        const { error } = await authClient.signIn.email({ email, password });

        if (error) {
          reportError(getErrorMessage(error, mode));
          return;
        }

        form.reset();
        toast.success("সাইন ইন সফল হয়েছে।");
        router.replace("/");
        router.refresh();
      }
    } catch {
      reportError("অনুরোধটি পাঠানো যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form
        className="grid gap-4"
        onSubmit={handleSubmit}
        aria-busy={busy}
        onInvalid={(event) => {
          const input = event.target as HTMLInputElement;
          const message = input.validity.valueMissing
            ? "প্রয়োজনীয় ঘরগুলো পূরণ করুন।"
            : input.type === "email"
              ? "সঠিক ইমেইল ঠিকানা লিখুন।"
              : "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
          toast.error(message, { id: "form-validation" });
        }}
      >
        {isSignup && (
          <div className="grid gap-1.5">
            <label htmlFor={`${formId}-name`} className="text-sm font-medium">
              নাম
            </label>
            <input
              ref={nameRef}
              id={`${formId}-name`}
              name="name"
              className="input w-full h-11 text-base min-[480px]:h-10 min-[480px]:text-sm placeholder:text-[#68796c]"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
              required
              disabled={busy}
            />
          </div>
        )}

        <div className="grid gap-1.5">
          <label htmlFor={`${formId}-email`} className="text-sm font-medium">
            ইমেইল
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            className="input w-full h-11 text-base min-[480px]:h-10 min-[480px]:text-sm placeholder:text-[#68796c]"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            disabled={busy}
          />
        </div>

        <PasswordField
          id={`${formId}-password`}
          name="password"
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete={isSignup ? "new-password" : "current-password"}
          disabled={busy}
        />

        {isSignup && (
          <PasswordField
            id={`${formId}-confirm-password`}
            name="confirmPassword"
            label="পাসওয়ার্ড নিশ্চিত করুন"
            placeholder="আবার লিখুন"
            autoComplete="new-password"
            inputRef={confirmPasswordRef}
            disabled={busy}
          />
        )}

        {formError && (
          <p className="text-sm text-error" role="alert">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-block h-11 text-sm min-[480px]:h-10"
          disabled={busy}
        >
          {submitting
            ? "অপেক্ষা করুন…"
            : isSignup
              ? "অ্যাকাউন্ট তৈরি করুন"
              : "সাইন ইন"}
        </button>
      </form>

      <div className="divider my-5 text-xs text-muted">অথবা</div>

      <SocialLogin
        providers={socialProviders}
        disabled={busy}
        onPendingChange={setSocialPending}
      />

      <p className="mt-5 text-center text-sm">
        {isSignup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
        <Link href={isSignup ? "/signin" : "/signup"} prefetch={false} className="link link-primary underline-offset-[3px]">
          {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>
    </>
  );
}
