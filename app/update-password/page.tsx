"use client";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  return null;
}

export default function UpdatePasswordPage() {
  const supabase = useMemo(() => createClient(), []);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      setHasRecoverySession(Boolean(user));
      setIsCheckingSession(false);
    }

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (
        event === "PASSWORD_RECOVERY" ||
        event === "SIGNED_IN" ||
        session?.user
      ) {
        setHasRecoverySession(true);
        setIsCheckingSession(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const passwordError = validatePassword(password);

    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setPasswordUpdated(true);
      toast.success("Your password has been updated.");
    } catch (error) {
      console.error("Password update error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update your password.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 aria-hidden className="h-6 w-6 animate-spin text-blue-400" />
          Verifying your secure reset link...
        </div>
      </main>
    );
  }

  if (passwordUpdated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
        <section className="w-full max-w-xl rounded-[2rem] border border-emerald-500/25 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <CheckCircle2 aria-hidden className="h-8 w-8" />
          </span>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Password updated
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Your account is secure
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            Your ResumeClimb AI password has been changed successfully.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Continue to dashboard
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </section>
      </main>
    );
  }

  if (!hasRecoverySession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
        <section className="w-full max-w-xl rounded-[2rem] border border-amber-500/25 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
            <ShieldAlert aria-hidden className="h-8 w-8" />
          </span>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
            Reset link unavailable
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            This link is invalid or expired
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            Request a new password reset email and use the most recent link.
          </p>

          <Link
            href="/forgot-password"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Request a new reset link
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <section className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-2xl shadow-black/30 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
          <ShieldCheck aria-hidden className="h-7 w-7" />
        </span>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          Secure account recovery
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Create a new password
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          Use at least 8 characters with one uppercase letter, one lowercase
          letter and one number.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <PasswordField
            id="new-password"
            label="New password"
            value={password}
            showPassword={showPassword}
            placeholder="Enter a strong password"
            onChange={(value) => {
              setPassword(value);
              setErrorMessage("");
            }}
            onToggle={() => setShowPassword((current) => !current)}
          />

          <PasswordField
            id="confirm-new-password"
            label="Confirm new password"
            value={confirmPassword}
            showPassword={showPassword}
            placeholder="Re-enter the new password"
            onChange={(value) => {
              setConfirmPassword(value);
              setErrorMessage("");
            }}
            onToggle={() => setShowPassword((current) => !current)}
          />

          <div className="grid gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400 sm:grid-cols-2">
            <span>✓ 8 or more characters</span>
            <span>✓ One uppercase letter</span>
            <span>✓ One lowercase letter</span>
            <span>✓ One number</span>
          </div>

          {errorMessage ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200"
            >
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
                Updating password...
              </>
            ) : (
              <>
                Update password
                <ArrowRight aria-hidden className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  showPassword: boolean;
  placeholder: string;
  onChange: (value: string) => void;
  onToggle: () => void;
};

function PasswordField({
  id,
  label,
  value,
  showPassword,
  placeholder,
  onChange,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-200">
        {label}
      </label>

      <div className="relative mt-2">
        <LockKeyhole
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600"
        />

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff aria-hidden className="h-5 w-5" />
          ) : (
            <Eye aria-hidden className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
