"use client";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import {
  FormEvent,
  useState,
} from "react";
import { toast } from "sonner";

import {
  createClient,
} from "@/lib/supabase/client";

function validatePassword(
  password: string
): string | null {
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

export default function SignupPage() {
  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    agreedToTerms,
    setAgreedToTerms,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    confirmationEmail,
    setConfirmationEmail,
  ] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedName =
      fullName.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (
      normalizedName.length < 2
    ) {
      setErrorMessage(
        "Please enter your full name."
      );

      return;
    }

    if (!normalizedEmail) {
      setErrorMessage(
        "Please enter your email address."
      );

      return;
    }

    const passwordError =
      validatePassword(password);

    if (passwordError) {
      setErrorMessage(
        passwordError
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setErrorMessage(
        "The passwords do not match."
      );

      return;
    }

    if (!agreedToTerms) {
      setErrorMessage(
        "Please accept the Terms and Privacy Policy."
      );

      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

   try {
  const supabase =
    createClient();

  const siteUrl =
    process.env
      .NEXT_PUBLIC_SITE_URL ??
    window.location.origin;

  const {
    data,
    error,
  } =
    await supabase.auth.signUp({
      email:
        normalizedEmail,

      password,

      options: {
        data: {
          full_name:
            normalizedName,
        },

        emailRedirectTo:
          `${siteUrl}/auth/callback?next=/dashboard`,
      },
    });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Unable to create your account."
        );
      }

      if (data.session) {
        toast.success(
          "Account created successfully."
        );

        window.location.assign(
          "/dashboard"
        );

        return;
      }

      setConfirmationEmail(
        normalizedEmail
      );

      toast.success(
        "Check your email to confirm your account."
      );
    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to create your account.";

      setErrorMessage(message);

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmationEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
        <section className="w-full max-w-xl rounded-[2rem] border border-emerald-500/25 bg-slate-900 p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            <Mail
              aria-hidden
              className="h-8 w-8"
            />
          </span>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Confirmation email sent
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Check your inbox
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            We sent an account confirmation
            link to:
          </p>

          <p className="mt-3 break-words font-bold text-white">
            {confirmationEmail}
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-500">
            Click the link in the email to
            verify your account. Check your
            spam or promotions folder if the
            email does not appear.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition hover:bg-emerald-500"
          >
            Go to Sign In

            <ArrowRight
              aria-hidden
              className="h-4 w-4"
            />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden border-r border-slate-800 bg-gradient-to-br from-violet-600/20 via-slate-950 to-blue-600/20 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600">
                <Sparkles
                  aria-hidden
                  className="h-6 w-6"
                />
              </span>

              <span>
                <span className="block text-xl font-bold">
                  Resume Impact AI
                </span>

                <span className="text-sm text-slate-400">
                  ATS Career Platform
                </span>
              </span>
            </Link>

            <h1 className="mt-16 max-w-md text-4xl font-bold leading-tight">
              Create your personal resume
              optimization workspace.
            </h1>

            <p className="mt-5 max-w-lg leading-8 text-slate-400">
              Save ATS analyses, compare resume
              versions, export reports, review
              analytics, and receive
              personalized coaching.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Private user-specific history",
              "Cloud synchronization",
              "ATS score analytics",
              "Resume comparison reports",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <Check
                  aria-hidden
                  className="h-5 w-5 text-emerald-300"
                />

                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600">
                  <Sparkles
                    aria-hidden
                    className="h-5 w-5"
                  />
                </span>

                <span className="font-bold">
                  Resume Impact AI
                </span>
              </Link>
            </div>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-violet-400 lg:mt-0">
              Create account
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Start your free workspace
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Create an account to save and
              synchronize your ATS resume
              analyses.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4"
              >
                <p className="text-sm leading-6 text-red-200">
                  {errorMessage}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="signup-name"
                  className="text-sm font-semibold text-slate-200"
                >
                  Full name
                </label>

                <div className="relative mt-2">
                  <UserRound
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(event) =>
                      setFullName(
                        event.target.value
                      )
                    }
                    placeholder="Your full name"
                    className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
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
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="text-sm font-semibold text-slate-200"
                >
                  Password
                </label>

                <div className="relative mt-2">
                  <LockKeyhole
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="signup-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Create a strong password"
                    className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        aria-hidden
                        className="h-5 w-5"
                      />
                    ) : (
                      <Eye
                        aria-hidden
                        className="h-5 w-5"
                      />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Use at least 8 characters,
                  including uppercase,
                  lowercase, and a number.
                </p>
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="text-sm font-semibold text-slate-200"
                >
                  Confirm password
                </label>

                <div className="relative mt-2">
                  <ShieldCheck
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="signup-confirm-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter the password again"
                    className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(event) =>
                    setAgreedToTerms(
                      event.target.checked
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-violet-600"
                />

                <span className="text-sm leading-6 text-slate-400">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-violet-300 hover:text-violet-200"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-violet-300 hover:text-violet-200"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      aria-hidden
                      className="h-5 w-5 animate-spin"
                    />

                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-violet-300 transition hover:text-violet-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}