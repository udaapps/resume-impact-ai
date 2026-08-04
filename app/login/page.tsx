"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  FormEvent,
  Suspense,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  createClient,
} from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const nextPath = useMemo(() => {
    const requestedPath =
      searchParams.get("next");

    if (
      requestedPath &&
      requestedPath.startsWith("/") &&
      !requestedPath.startsWith("//")
    ) {
      return requestedPath;
    }

    return "/dashboard";
  }, [searchParams]);

  const accountConfirmed =
    searchParams.get("confirmed") ===
    "true";

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage(
        "Please enter your email address."
      );
      return;
    }

    if (!password) {
      setErrorMessage(
        "Please enter your password."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const supabase =
        createClient();

      const {
        data,
        error,
      } =
        await supabase.auth
          .signInWithPassword({
            email:
              normalizedEmail,
            password,
          });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error(
          "Unable to verify your account."
        );
      }

      toast.success(
        "Signed in successfully."
      );

      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to sign in.";

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden border-r border-slate-800 bg-gradient-to-br from-blue-600/20 via-slate-950 to-violet-600/20 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                <Sparkles
                  aria-hidden
                  className="h-6 w-6"
                />
              </span>

              <span>
                <span className="block text-xl font-bold">
                  ResumeClimb AI
                </span>

                <span className="text-sm text-slate-400">
                  Professional ATS Platform
                </span>
              </span>
            </Link>

            <h1 className="mt-16 max-w-md text-4xl font-bold leading-tight">
              Continue improving your resume
              with data-driven insights.
            </h1>

            <p className="mt-5 max-w-lg leading-8 text-slate-400">
              Access your ATS reports,
              analytics, resume history,
              comparisons, AI coaching plans,
              and premium dashboard.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Secure Supabase authentication",
              "Cloud resume-history sync",
              "Professional ATS PDF reports",
              "Personalized AI resume coaching",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-300"
              >
                <ShieldCheck
                  aria-hidden
                  className="h-5 w-5 text-emerald-300"
                />

                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                  <Sparkles
                    aria-hidden
                    className="h-5 w-5"
                  />
                </span>

                <span className="font-bold">
                  ResumeClimb AI
                </span>
              </Link>
            </div>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400 lg:mt-0">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Enter your registered email
              address and password.
            </p>

            {accountConfirmed && (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="text-sm leading-6 text-emerald-200">
                  Your email address has been
                  confirmed. You can now sign
                  in.
                </p>
              </div>
            )}

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
                  htmlFor="login-email"
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
                    id="login-email"
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
                    className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold text-slate-200"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-blue-300 transition hover:text-blue-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative mt-2">
                  <LockKeyhole
                    aria-hidden
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600"
                  />

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    className="h-14 w-full rounded-2xl border border-slate-700 bg-slate-950 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      aria-hidden
                      className="h-5 w-5 animate-spin"
                    />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              Do not have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-blue-300 transition hover:text-blue-200"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <Loader2
          aria-hidden
          className="mx-auto h-8 w-8 animate-spin text-blue-400"
        />

        <p className="mt-4 text-sm text-slate-400">
          Loading sign in...
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={<LoginLoading />}
    >
      <LoginForm />
    </Suspense>
  );
}