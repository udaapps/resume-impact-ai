"use client";

import { ArrowLeft, ArrowRight, Loader2, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        }
      );

      if (error) throw error;

      setEmailSent(true);
      toast.success("Password reset instructions sent.");
    } catch (error) {
      console.error("Password reset request error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send password reset instructions.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (emailSent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
        <section className="w-full max-w-xl rounded-[2rem] border border-emerald-500/25 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <Mail aria-hidden className="h-8 w-8" />
          </span>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Check your inbox
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Password reset email sent
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            If an account exists for this email address, ResumeClimb AI sent a
            secure password reset link.
          </p>

          <p className="mt-3 break-words font-bold text-white">
            {email.trim().toLowerCase()}
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            Use the newest email. Check spam or promotions if it does not
            appear within a few minutes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                setEmailSent(false);
                setErrorMessage("");
              }}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              Send again
            </button>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Back to sign in
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <section className="w-full max-w-xl rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-2xl shadow-black/30 sm:p-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          Back to sign in
        </Link>

        <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
          <ShieldCheck aria-hidden className="h-7 w-7" />
        </span>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          Account recovery
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Reset your password
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          Enter the email address connected to your ResumeClimb AI account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="reset-email"
              className="text-sm font-semibold text-slate-200"
            >
              Email address
            </label>

            <div className="relative mt-2">
              <Mail
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600"
              />

              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="you@example.com"
                className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
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
                Sending reset link...
              </>
            ) : (
              <>
                Send reset link
                <ArrowRight aria-hidden className="h-5 w-5" />
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
