"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type ProfileUpdateFormProps = {
  name: string;
  email: string;
};

export function ProfileUpdateForm({ name, email }: ProfileUpdateFormProps) {
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const [nameValue, setNameValue] = useState(name);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [nameInvalid, setNameInvalid] = useState(false);
  const trimmedName = nameValue.trim();
  const unchanged = trimmedName === name.trim();
  const errorId = `${formId}-error`;

  function reportError(message: string, invalidName = false) {
    setFormError(message);
    setNameInvalid(invalidName);
    toast.error(message, { id: "profile-update-error" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending || unchanged) {
      return;
    }

    setFormError(null);
    setNameInvalid(false);

    if (!trimmedName) {
      reportError("আপনার নাম লিখুন। শুধু ফাঁকা জায়গা ব্যবহার করা যাবে না।", true);
      nameRef.current?.focus();
      return;
    }

    if (trimmedName.length > 100) {
      reportError("নাম সর্বোচ্চ ১০০ অক্ষরের হতে হবে।", true);
      nameRef.current?.focus();
      return;
    }

    setPending(true);

    try {
      const { error } = await authClient.updateUser({ name: trimmedName });

      if (error) {
        if (error.status === 401 || error.code === "UNAUTHORIZED") {
          await refetch({ query: { disableCookieCache: true } });
          router.replace("/signin?reason=profile-login-required");
          router.refresh();
          return;
        }

        if (error.status === 429) {
          reportError("অনেকবার চেষ্টা হয়েছে। একটু পরে আবার চেষ্টা করুন।");
        } else if (error.status === 400) {
          reportError("নামটি ঠিকভাবে লিখুন। সর্বোচ্চ ১০০ অক্ষর ব্যবহার করুন।", true);
          nameRef.current?.focus();
        } else {
          reportError("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        }
        return;
      }

      await refetch({ query: { disableCookieCache: true } });
      toast.success("আপনার নাম আপডেট হয়েছে।");
      router.replace("/my-profile");
      router.refresh();
    } catch {
      reportError("অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit}
      aria-busy={pending}
    >
      <div className="grid gap-1.5">
        <label htmlFor={`${formId}-name`} className="text-sm font-medium">
          নাম
        </label>
        <input
          ref={nameRef}
          id={`${formId}-name`}
          name="name"
          type="text"
          className="input w-full h-11 text-base min-[480px]:h-10 min-[480px]:text-sm placeholder:text-[#68796c] aria-invalid:input-error"
          placeholder="আপনার নাম লিখুন"
          autoComplete="name"
          value={nameValue}
          maxLength={100}
          required
          disabled={pending}
          aria-invalid={nameInvalid || undefined}
          aria-describedby={formError ? errorId : undefined}
          onChange={(event) => {
            setNameValue(event.target.value);
            setFormError(null);
            setNameInvalid(false);
          }}
          onInvalid={() => reportError("আপনার নাম লিখুন।", true)}
        />
      </div>

      <dl className="grid gap-1.5">
        <dt className="text-sm font-medium">ইমেইল</dt>
        <dd className="text-muted [overflow-wrap:anywhere]">{email}</dd>
      </dl>

      {formError && (
        <p id={errorId} className="text-sm text-error" role="alert">
          {formError}
        </p>
      )}

      <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
        <button
          type="submit"
          className="btn btn-primary h-11 w-full min-[480px]:h-10 min-[480px]:w-auto"
          disabled={pending || unchanged}
        >
          {pending ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
        </button>
        <Link
          href="/my-profile"
          className="btn btn-ghost h-11 w-full aria-disabled:cursor-not-allowed aria-disabled:opacity-60 min-[480px]:h-10 min-[480px]:w-auto"
          aria-disabled={pending || undefined}
          tabIndex={pending ? -1 : undefined}
          onClick={(event) => {
            if (pending) {
              event.preventDefault();
            }
          }}
        >
          প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </form>
  );
}
