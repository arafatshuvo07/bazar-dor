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
      className="profile-update-form"
      onSubmit={handleSubmit}
      aria-busy={pending}
    >
      <div className="form-field">
        <label htmlFor={`${formId}-name`} className="form-label">
          নাম
        </label>
        <input
          ref={nameRef}
          id={`${formId}-name`}
          name="name"
          type="text"
          className="form-input"
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

      <dl className="form-field profile-readonly-field">
        <dt className="form-label">ইমেইল</dt>
        <dd className="profile-readonly-value">{email}</dd>
      </dl>

      {formError && (
        <p id={errorId} className="form-error" role="alert">
          {formError}
        </p>
      )}

      <div className="profile-form-actions">
        <button
          type="submit"
          className="button button-primary"
          disabled={pending || unchanged}
        >
          {pending ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
        </button>
        <Link
          href="/my-profile"
          className="button button-ghost"
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
