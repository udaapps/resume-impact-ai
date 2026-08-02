"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { sendGAEvent } from "@next/third-parties/google";

import { exportResumeDocx } from "@/lib/exportDocx";
import { exportResumePdf } from "@/lib/exportPdf";
import {
  getResumeHistory,
  saveResumeHistory,
} from "@/lib/history";
import {
  deleteSavedBullet,
  getSavedBullets,
  saveBullet,
  toggleBulletFavorite,
  type SavedBullet,
} from "@/lib/savedBullets";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type GeneratedBullet = {
  id: number;
  text: string;
};

type AtsAnalysis = {
  score: number;
  rating: string;
  strengths: string[];
  suggestions: string[];
};

type FormState = {
  jobTitle: string;
  experienceLevel: string;
  resumeStyle: string;
  responsibility: string;
  achievement: string;
  metric: string;
};

type DailyUsage = {
  date: string;
  count: number;
};

type HistoryItem = {
  id: string;
  createdAt: string;
  jobTitle: string;
  bullets: GeneratedBullet[];
  atsAnalysis: AtsAnalysis | null;
};

type ResumeHistoryRow = {
  id: string;
  job_title: string;
  bullets: GeneratedBullet[];
  ats_analysis: AtsAnalysis | null;
  created_at: string;
};

const initialForm: FormState = {
  jobTitle: "",
  experienceLevel: "Mid Level",
  resumeStyle: "ATS Optimized",
  responsibility: "",
  achievement: "",
  metric: "",
};

const DAILY_FREE_LIMIT = 5;
const USAGE_STORAGE_KEY = "resume-impact-ai-daily-usage";

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ResumeBulletGeneratorClient({
  children,
}: {
  children?: ReactNode;
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [bullets, setBullets] = useState<GeneratedBullet[]>([]);
  const [atsAnalysis, setAtsAnalysis] =
    useState<AtsAnalysis | null>(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const [usageCount, setUsageCount] = useState(0);
  const [usageLoaded, setUsageLoaded] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const [savedBullets, setSavedBullets] = useState<SavedBullet[]>([]);
  const [savedBulletsLoading, setSavedBulletsLoading] = useState(false);
  const [savingBulletId, setSavingBulletId] =
    useState<number | null>(null);

  const [savedBulletSearch, setSavedBulletSearch] =
    useState("");
  const [savedBulletFilter, setSavedBulletFilter] =
    useState<"all" | "favorites">("all");
  const [savedBulletSort, setSavedBulletSort] =
    useState<"newest" | "oldest">("newest");

  const canGenerate = useMemo(() => {
    return (
      form.jobTitle.trim().length > 1 &&
      form.responsibility.trim().length > 5
    );
  }, [form.jobTitle, form.responsibility]);

  const remainingGenerations = Math.max(
    DAILY_FREE_LIMIT - usageCount,
    0
  );

  const dailyLimitReached =
    usageLoaded && usageCount >= DAILY_FREE_LIMIT;

  const filteredSavedBullets = useMemo(() => {
    const searchText =
      savedBulletSearch.trim().toLowerCase();

    const filtered = savedBullets.filter((item) => {
      const matchesSearch =
        searchText.length === 0 ||
        item.bullet.toLowerCase().includes(searchText);

      const matchesFavorite =
        savedBulletFilter === "all" || item.favorite;

      return matchesSearch && matchesFavorite;
    });

    return [...filtered].sort((a, b) => {
      const firstDate =
        new Date(a.created_at).getTime();
      const secondDate =
        new Date(b.created_at).getTime();

      return savedBulletSort === "newest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [
    savedBullets,
    savedBulletSearch,
    savedBulletFilter,
    savedBulletSort,
  ]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
    setSuccessMessage("");
  }

  useEffect(() => {
    const today = getLocalDateKey();
    const savedUsage =
      window.localStorage.getItem(USAGE_STORAGE_KEY);

    if (!savedUsage) {
      setUsageCount(0);
      setUsageLoaded(true);
      return;
    }

    try {
      const parsedUsage = JSON.parse(savedUsage) as DailyUsage;

      if (parsedUsage.date === today) {
        setUsageCount(parsedUsage.count);
      } else {
        window.localStorage.setItem(
          USAGE_STORAGE_KEY,
          JSON.stringify({
            date: today,
            count: 0,
          })
        );
        setUsageCount(0);
      }
    } catch {
      window.localStorage.removeItem(USAGE_STORAGE_KEY);
      setUsageCount(0);
    } finally {
      setUsageLoaded(true);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "Session loading error:",
          sessionError.message
        );
      }

      if (isMounted) {
        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const userId = user.id;
    let cancelled = false;

    async function loadCloudHistory() {
      try {
        setHistoryLoading(true);

        const rows =
          (await getResumeHistory(userId)) as ResumeHistoryRow[];

        if (cancelled) {
          return;
        }

        const mappedHistory: HistoryItem[] = rows.map((row) => ({
          id: row.id,
          createdAt: new Date(row.created_at).toLocaleString(),
          jobTitle: row.job_title,
          bullets: row.bullets,
          atsAnalysis: row.ats_analysis,
        }));

        setHistory(mappedHistory);
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load resume history."
          );
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      }
    }

    void loadCloudHistory();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      setSavedBullets([]);
      return;
    }

    const userId = user.id;
    let cancelled = false;

    async function loadSavedBulletLibrary() {
      try {
        setSavedBulletsLoading(true);
        const rows = await getSavedBullets(userId);

        if (!cancelled) {
          setSavedBullets(rows);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load saved bullets."
          );
        }
      } finally {
        if (!cancelled) {
          setSavedBulletsLoading(false);
        }
      }
    }

    void loadSavedBulletLibrary();

    return () => {
      cancelled = true;
    };
  }, [user]);

async function handleGoogleLogin() {
  setError("");
  setSuccessMessage("");

  try {
    toast.loading("Opening Google sign-in...", {
      id: "google-login",
    });

    const redirectTo =
      window.location.hostname === "localhost"
        ? "http://localhost:3000/"
        : "https://resume-impact-ai.vercel.app/";

    sendGAEvent("event", "google_login_start", {
      method: "google",
    });

    const { error: loginError } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });

    if (loginError) {
      throw loginError;
    }
  } catch (loginError) {
    const message =
      loginError instanceof Error
        ? loginError.message
        : "Unable to start Google login.";

    console.error(
      "Google login exception:",
      loginError
    );

    toast.error("Google login failed.", {
      id: "google-login",
      description: message,
    });

    setError(message);
  }
}
async function handleLogout() {
  setError("");
  setSuccessMessage("");

  try {
    const { error: logoutError } =
      await supabase.auth.signOut();

    if (logoutError) {
      throw logoutError;
    }

    setUser(null);
    setHistory([]);
    setSavedBullets([]);

    sendGAEvent("event", "user_logout", {
      method: "google",
    });

    toast.success("Signed out successfully.");
  } catch (logoutError) {
    const message =
      logoutError instanceof Error
        ? logoutError.message
        : "Unable to sign out.";

    console.error("Logout error:", logoutError);

    toast.error("Sign out failed.", {
      description: message,
    });

    setError(message);
  }
}

  async function handleGenerate() {
    if (!usageLoaded) {
      setError(
        "Please wait while your daily usage is checked."
      );
      return;
    }

    if (dailyLimitReached) {
      setError(
        "You have used all 5 free generations for today. Your free limit resets tomorrow."
      );
      return;
    }

    if (!canGenerate) {
      setError(
        "Please enter a job title and a clear responsibility before generating."
      );
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsGenerating(true);
    setBullets([]);
    setAtsAnalysis(null);
    setCopiedId(null);
    setAllCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle: form.jobTitle,
          experienceLevel: form.experienceLevel,
          resumeStyle: form.resumeStyle,
          responsibility: form.responsibility,
          achievement: form.achievement,
          metric: form.metric,
        }),
      });

      const responseText = await response.text();

      let data: {
        bullets?: string[];
        atsAnalysis?: AtsAnalysis;
        error?: string;
      };

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Non-JSON server response:",
          responseText
        );

        throw new Error(
          "The server returned an unexpected response. Check the VS Code terminal."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to generate resume bullets."
        );
      }

      if (!data.bullets || data.bullets.length !== 3) {
        throw new Error(
          "The AI response did not contain three valid bullets."
        );
      }

      const generatedBullets: GeneratedBullet[] =
        data.bullets.map((text, index) => ({
          id: index + 1,
          text,
        }));

      const generatedAtsAnalysis =
        data.atsAnalysis ?? null;

      setBullets(generatedBullets);
      setAtsAnalysis(generatedAtsAnalysis);

      if (user) {
        const savedRow = await saveResumeHistory({
          userId: user.id,
          jobTitle: form.jobTitle,
          experienceLevel: form.experienceLevel,
          resumeStyle: form.resumeStyle,
          responsibility: form.responsibility,
          bullets: generatedBullets,
          atsAnalysis: generatedAtsAnalysis,
        });

        const newHistoryItem: HistoryItem = {
          id: savedRow.id,
          createdAt: new Date(
            savedRow.created_at
          ).toLocaleString(),
          jobTitle: savedRow.job_title,
          bullets: savedRow.bullets,
          atsAnalysis: savedRow.ats_analysis,
        };

        setHistory((current) =>
          [newHistoryItem, ...current].slice(0, 20)
        );
      }

      const newUsageCount = usageCount + 1;
      setUsageCount(newUsageCount);

      window.localStorage.setItem(
        USAGE_STORAGE_KEY,
        JSON.stringify({
          date: getLocalDateKey(),
          count: newUsageCount,
        })
      );

      sendGAEvent("event", "resume_generate", {
        experience_level: form.experienceLevel,
        resume_style: form.resumeStyle,
        bullet_count: generatedBullets.length,
        has_achievement: Boolean(
          form.achievement.trim()
        ),
        has_metric: Boolean(form.metric.trim()),
        signed_in: Boolean(user),
      });

      toast.success("Resume bullets generated successfully.");
    } catch (generationError) {
      const message =
        generationError instanceof Error
          ? generationError.message
          : "Unable to generate resume bullets.";

      setError(message);
      toast.error("Generation failed.", {
        description: message,
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveBullet(
    bullet: GeneratedBullet
  ) {
    if (!user) {
      setError(
        "Please sign in with Google to save bullets."
      );
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      setSavingBulletId(bullet.id);

      const savedBullet = await saveBullet(
        user.id,
        bullet.text
      );

      setSavedBullets((current) => [
        savedBullet,
        ...current,
      ]);
      setSuccessMessage("Bullet saved successfully.");

      sendGAEvent("event", "bullet_save", {
        source: "generated_results",
      });

      toast.success("Bullet saved successfully.");
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Unable to save bullet.";

      setError(message);
      toast.error("Unable to save bullet.", {
        description: message,
      });
    } finally {
      setSavingBulletId(null);
    }
  }

  async function handleToggleFavorite(
    item: SavedBullet
  ) {
    try {
      setError("");
      setSuccessMessage("");

      const updatedBullet =
        await toggleBulletFavorite(
          item.id,
          item.favorite
        );

      setSavedBullets((current) =>
        current
          .map((bullet) =>
            bullet.id === updatedBullet.id
              ? updatedBullet
              : bullet
          )
          .sort((a, b) => {
            if (a.favorite !== b.favorite) {
              return (
                Number(b.favorite) -
                Number(a.favorite)
              );
            }

            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
      );

      sendGAEvent("event", "favorite_toggle", {
        favorite_state: updatedBullet.favorite
          ? "added"
          : "removed",
      });

      toast.success(
        updatedBullet.favorite
          ? "Added to favorites."
          : "Removed from favorites."
      );
    } catch (favoriteError) {
      const message =
        favoriteError instanceof Error
          ? favoriteError.message
          : "Unable to update favorite.";

      setError(message);
      toast.error("Favorite update failed.", {
        description: message,
      });
    }
  }

  async function handleDeleteSavedBullet(
    bulletId: string
  ) {
    try {
      setError("");
      setSuccessMessage("");

      await deleteSavedBullet(bulletId);

      setSavedBullets((current) =>
        current.filter(
          (bullet) => bullet.id !== bulletId
        )
      );
      setSuccessMessage("Saved bullet deleted.");

      sendGAEvent("event", "saved_bullet_delete", {
        source: "saved_library",
      });

      toast.success("Saved bullet deleted.");
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete saved bullet.";

      setError(message);
      toast.error("Delete failed.", {
        description: message,
      });
    }
  }

  function handleRestoreSavedBullet(item: SavedBullet) {
    setBullets([
      {
        id: 1,
        text: item.bullet,
      },
    ]);
    setAtsAnalysis(null);
    setSuccessMessage("Saved bullet restored.");

    sendGAEvent("event", "saved_bullet_restore", {
      source: "saved_library",
    });

    toast.success("Saved bullet restored.");
    window.location.hash = "results";
  }

  async function handleCopy(
    bullet: GeneratedBullet
  ) {
    try {
      await navigator.clipboard.writeText(bullet.text);
      setCopiedId(bullet.id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      setError(
        "Copy failed. Please select the text and copy it manually."
      );
    }
  }

  async function handleCopySavedBullet(
    item: SavedBullet
  ) {
    try {
      await navigator.clipboard.writeText(item.bullet);
      setSuccessMessage("Saved bullet copied.");
      toast.success("Saved bullet copied.");
    } catch {
      setError(
        "Copy failed. Please select the text and copy it manually."
      );
    }
  }

  async function handleCopyAll() {
    if (bullets.length === 0) {
      return;
    }

    const allBulletText = bullets
      .map((bullet) => `• ${bullet.text}`)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(allBulletText);
      toast.success("All resume bullets copied.");
      setAllCopied(true);
      setCopiedId(null);

      window.setTimeout(() => {
        setAllCopied(false);
      }, 1800);
    } catch {
      setError(
        "Copy failed. Please select the generated bullets and copy them manually."
      );
    }
  }

  function handleDownloadTxt() {
    if (bullets.length === 0) {
      return;
    }

    const fileContent = [
      "Resume Impact AI",
      "Generated Resume Bullets",
      "",
      ...bullets.map(
        (bullet, index) =>
          `${index + 1}. ${bullet.text}`
      ),
      "",
      "Review each bullet and keep only claims that accurately reflect your experience.",
    ].join("\n");

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = "resume-bullets.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
    sendGAEvent("event", "txt_export", {
      bullet_count: bullets.length,
      has_ats_analysis: Boolean(atsAnalysis),
    });

    toast.success("TXT file downloaded.");
  }

  function handleExportDocx() {
    exportResumeDocx(bullets, atsAnalysis);

    sendGAEvent("event", "docx_export", {
      bullet_count: bullets.length,
      has_ats_analysis: Boolean(atsAnalysis),
    });

    toast.success("DOCX file downloaded.");
  }

  function handleExportPdf() {
    exportResumePdf(bullets, atsAnalysis);

    sendGAEvent("event", "pdf_export", {
      bullet_count: bullets.length,
      has_ats_analysis: Boolean(atsAnalysis),
    });

    toast.success("PDF file downloaded.");
  }

  function handleRestoreHistory(item: HistoryItem) {
    setBullets(item.bullets);
    setAtsAnalysis(item.atsAnalysis);

    sendGAEvent("event", "history_restore", {
      bullet_count: item.bullets.length,
      has_ats_analysis: Boolean(item.atsAnalysis),
    });

    toast.success("Resume history restored.");
    window.location.hash = "results";
  }

  function handleClear() {
    setForm(initialForm);
    setBullets([]);
    setAtsAnalysis(null);
    setError("");
    setSuccessMessage("");
    setCopiedId(null);
    setAllCopied(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 pb-24 text-white md:pb-0">
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 shadow-sm shadow-black/20 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
          <a
            href="#"
            className="min-w-0 shrink text-base font-bold tracking-tight sm:text-xl"
            aria-label="Resume Impact AI home"
          >
            <span className="sm:hidden">Resume AI</span>
            <span className="hidden sm:inline">Resume Impact AI</span>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a
              href="#generator"
              className="transition hover:text-white"
            >
              Generator
            </a>
            <a
              href="#library"
              className="transition hover:text-white"
            >
              Library
            </a>
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="transition hover:text-white"
            >
              Pricing
            </a>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>

            {authLoading ? (
              <span className="max-w-24 truncate text-[11px] text-slate-400 sm:max-w-none sm:text-sm">
                Checking account...
              </span>
            ) : user ? (
              <>
                <div className="hidden min-w-0 text-right lg:block">
                  <p className="max-w-48 truncate text-sm font-semibold text-white">
                    {user.user_metadata?.full_name ??
                      user.email ??
                      "Signed in"}
                  </p>
                  <p className="text-xs text-slate-400">
                    Free Account
                  </p>
                </div>

                {user.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User"
                    className="h-8 w-8 shrink-0 rounded-full border border-slate-700 sm:h-10 sm:w-10"
                  />
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="shrink-0 rounded-xl border border-slate-700 px-2.5 py-2 text-xs font-semibold hover:bg-slate-800 sm:px-4 sm:text-sm"
                >
                  <span className="sm:hidden">Out</span>
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
  <Link
    href="/login"
    className="rounded-full border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
  >
    Sign In
  </Link>

  <Link
    href="/signup"
    className="rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500 sm:px-5 sm:py-2.5 sm:text-sm"
  >
    Create Account
  </Link>
</div>
            )}
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8 lg:py-20">
        <div className="pt-1 lg:sticky lg:top-28">
          <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            Free AI Resume Bullet Generator
          </div>

          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
            Write powerful resume bullets in seconds
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            Turn ordinary job duties into professional,
            achievement-focused and ATS-friendly resume bullet
            points using strong action verbs and measurable
            results.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#generator"
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-500 sm:w-auto"
            >
              Generate Resume Bullets
            </a>

            <a
              href="#features"
              className="w-full rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900 sm:w-auto"
            >
              See Features
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm text-slate-400 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-2xl font-bold text-white">
                3
              </div>
              Bullets per generation
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-2xl font-bold text-white">
                5
              </div>
              Free uses daily
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-2xl font-bold text-white">
                ATS
              </div>
              Friendly wording
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-6">
          <section
            id="generator"
            className="scroll-mt-24 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-blue-950/30 sm:p-8"
          >
            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Generator
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Create stronger resume achievements
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Job title and responsibility are required.
                Achievement and metric are optional but improve
                the result.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="job-title"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Job title
                </label>
                <input
                  id="job-title"
                  value={form.jobTitle}
                  onChange={(event) =>
                    updateField(
                      "jobTitle",
                      event.target.value
                    )
                  }
                  type="text"
                  placeholder="Example: Customer Service Representative"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="experience-level"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experience-level"
                    value={form.experienceLevel}
                    onChange={(event) =>
                      updateField(
                        "experienceLevel",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                    <option>Manager</option>
                    <option>Director</option>
                    <option>Executive</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="resume-style"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Resume Style
                  </label>
                  <select
                    id="resume-style"
                    value={form.resumeStyle}
                    onChange={(event) =>
                      updateField(
                        "resumeStyle",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    <option>ATS Optimized</option>
                    <option>Professional</option>
                    <option>Technical</option>
                    <option>Leadership</option>
                    <option>Executive</option>
                    <option>Results Focused</option>
                    <option>Concise</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="responsibility"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Current responsibility
                </label>
                <textarea
                  id="responsibility"
                  value={form.responsibility}
                  onChange={(event) =>
                    updateField(
                      "responsibility",
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Example: Answered customer complaints and solved account issues"
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="achievement"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Achievement or result
                  <span className="ml-2 font-normal text-slate-500">
                    Optional
                  </span>
                </label>
                <input
                  id="achievement"
                  value={form.achievement}
                  onChange={(event) =>
                    updateField(
                      "achievement",
                      event.target.value
                    )
                  }
                  type="text"
                  placeholder="Example: Improved customer satisfaction"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="metric"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Metric or number
                  <span className="ml-2 font-normal text-slate-500">
                    Optional
                  </span>
                </label>
                <input
                  id="metric"
                  value={form.metric}
                  onChange={(event) =>
                    updateField(
                      "metric",
                      event.target.value
                    )
                  }
                  type="text"
                  placeholder="Example: 20%"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {successMessage}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={
                    isGenerating ||
                    !usageLoaded ||
                    dailyLimitReached
                  }
                  className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating
                    ? "Generating..."
                    : dailyLimitReached
                      ? "Daily Limit Reached"
                      : "Generate Resume Bullets"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-xl border border-slate-700 px-5 py-3.5 font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  Clear
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm">
                <span className="text-slate-400">
                  Free daily usage
                </span>
                <span
                  className={
                    dailyLimitReached
                      ? "font-semibold text-red-300"
                      : "font-semibold text-emerald-300"
                  }
                >
                  {usageLoaded
                    ? `${remainingGenerations} of ${DAILY_FREE_LIMIT} remaining`
                    : "Checking..."}
                </span>
              </div>
            </div>
          </section>

          {(isGenerating || bullets.length > 0) && (
            <section
              id="results"
              className="scroll-mt-24 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    Results
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Your improved resume bullets
                  </h2>
                </div>

                {bullets.length > 0 && (
                  <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                      Ready
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAll}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      {allCopied ? "All Copied!" : "Copy All"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadTxt}
                      className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-500 hover:bg-slate-700"
                    >
                      TXT
                    </button>
                    <button
                      type="button"
                      onClick={handleExportDocx}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                      DOCX
                    </button>
                    <button
                      type="button"
                      onClick={handleExportPdf}
                      className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                    >
                      PDF
                    </button>
                  </div>
                )}
              </div>

              {atsAnalysis && (
                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        ATS Analysis
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">
                        ATS Score: {atsAnalysis.score}/100
                      </h3>
                    </div>
                    <span className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-300">
                      {atsAnalysis.rating}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-emerald-300">
                        Strengths
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                        {atsAnalysis.strengths.map(
                          (item, index) => (
                            <li key={index}>✓ {item}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-amber-300">
                        Suggestions
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                        {atsAnalysis.suggestions.map(
                          (item, index) => (
                            <li key={index}>• {item}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {isGenerating ? (
                <div className="mt-6 space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-28 animate-pulse rounded-2xl bg-slate-800"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {bullets.map((bullet, index) => (
                    <article
                      key={bullet.id}
                      className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-semibold text-blue-300">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="break-words leading-7 text-slate-200">
                            {bullet.text}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(bullet)
                              }
                              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
                            >
                              {copiedId === bullet.id
                                ? "Copied!"
                                : "Copy bullet"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleSaveBullet(bullet)
                              }
                              disabled={
                                savingBulletId === bullet.id
                              }
                              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {savingBulletId === bullet.id
                                ? "Saving..."
                                : "⭐ Save"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {bullets.length > 0 && (
                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Review every generated statement and keep only
                  claims that accurately reflect your real
                  experience.
                </p>
              )}
            </section>
          )}

          {user && (
            <section
              id="library"
              className="scroll-mt-24 rounded-2xl border border-slate-700 bg-slate-950/70 p-5 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-xl font-bold">
                    Saved Bullet Library
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Save, favorite, restore, copy or delete your
                    best bullets.
                  </p>
                </div>
                <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
                  {savedBullets.length} Saved
                </span>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <input
                  type="search"
                  value={savedBulletSearch}
                  onChange={(event) =>
                    setSavedBulletSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search saved bullets..."
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />

                <select
                  value={savedBulletFilter}
                  onChange={(event) =>
                    setSavedBulletFilter(
                      event.target.value as
                        | "all"
                        | "favorites"
                    )
                  }
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="all">
                    All Bullets
                  </option>
                  <option value="favorites">
                    Favorites Only
                  </option>
                </select>

                <select
                  value={savedBulletSort}
                  onChange={(event) =>
                    setSavedBulletSort(
                      event.target.value as
                        | "newest"
                        | "oldest"
                    )
                  }
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                >
                  <option value="newest">
                    Newest First
                  </option>
                  <option value="oldest">
                    Oldest First
                  </option>
                </select>
              </div>

              {savedBulletsLoading ? (
                <p className="mt-5 text-sm text-slate-400">
                  Loading saved bullets...
                </p>
              ) : filteredSavedBullets.length === 0 ? (
                <div className="mt-5 rounded-xl border border-dashed border-slate-700 p-6 text-center">
                  <p className="text-slate-300">
                    {savedBullets.length === 0
                      ? "No saved bullets yet."
                      : "No saved bullets match your search or filter."}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {savedBullets.length === 0
                      ? "Generate a bullet and press ⭐ Save."
                      : "Try changing the search text or filter."}
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {filteredSavedBullets.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="min-w-0 flex-1 break-words leading-7 text-slate-200">
                          {item.bullet}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            handleToggleFavorite(item)
                          }
                          className="shrink-0 text-xl"
                          aria-label={
                            item.favorite
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          {item.favorite ? "⭐" : "☆"}
                        </button>
                      </div>

                      <p className="mt-3 text-xs text-slate-500">
                        {new Date(
                          item.created_at
                        ).toLocaleString()}
                      </p>

                      <div className="mt-4 grid grid-cols-1 gap-2 xs:grid-cols-3 sm:flex sm:flex-wrap">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopySavedBullet(item)
                          }
                          className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-blue-500 hover:text-white"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleRestoreSavedBullet(item)
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                        >
                          Restore
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteSavedBullet(item.id)
                          }
                          className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {user && (
            <section className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold">
                  Recent History
                </h3>
                <span className="text-sm text-slate-400">
                  {history.length} Saved
                </span>
              </div>

              {historyLoading ? (
                <p className="mt-5 text-sm text-slate-400">
                  Loading resume history...
                </p>
              ) : history.length === 0 ? (
                <p className="mt-5 text-sm text-slate-500">
                  No cloud history yet.
                </p>
              ) : (
                <div className="mt-5 space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="min-w-0">
                          <h4 className="truncate font-semibold">
                            {item.jobTitle}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {item.createdAt}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRestoreHistory(item)}
                          className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 sm:w-fit"
                        >
                          Restore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </section>

      <section
        id="features"
        className="border-t border-slate-900 bg-slate-950 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-blue-400">
              Stronger resume content
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything needed to improve your resume bullets
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">⚡</div>
              <h3 className="text-xl font-semibold">
                Live generation
              </h3>
              <p className="mt-3 leading-7 text-slate-400">
                Enter your details and instantly receive three
                improved resume bullet options.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">🎯</div>
              <h3 className="text-xl font-semibold">
                Achievement focused
              </h3>
              <p className="mt-3 leading-7 text-slate-400">
                Present duties using stronger wording, measurable
                outcomes and professional impact.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">⭐</div>
              <h3 className="text-xl font-semibold">
                Saved library
              </h3>
              <p className="mt-3 leading-7 text-slate-400">
                Save, favorite, restore and reuse your strongest
                resume bullet points.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-t border-slate-900 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold text-blue-400">
            Simple pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Start free and upgrade later
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="mt-4 text-4xl font-bold">$0</p>
              <p className="mt-2 text-slate-400">
                For occasional job seekers
              </p>

              <ul className="mt-8 space-y-4 text-slate-300">
                <li>✓ 5 generations per day</li>
                <li>✓ 3 bullets per generation</li>
                <li>✓ ATS analysis</li>
                <li>✓ Saved bullet library</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-blue-500 bg-blue-600/10 p-8 text-left">
              <div className="mb-4 inline-flex rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold">
                Planned
              </div>
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="mt-4 text-4xl font-bold">
                $4.99
                <span className="text-base font-normal text-slate-400">
                  /month
                </span>
              </p>

              <ul className="mt-8 space-y-4 text-slate-300">
                <li>✓ Unlimited generations</li>
                <li>✓ Job-description matching</li>
                <li>✓ ATS keyword suggestions</li>
                <li>✓ Full resume rewriting</li>
                <li>✓ PDF and DOCX export</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {children}

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 px-3 py-2 backdrop-blur md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          <a
            href="#generator"
            className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            ✨
            <span className="mt-1 block">Generate</span>
          </a>
          <a
            href="#library"
            className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            ⭐
            <span className="mt-1 block">Library</span>
          </a>
          <a
            href="#features"
            className="rounded-xl px-2 py-2 text-center text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            ⚡
            <span className="mt-1 block">Features</span>
          </a>
          <div className="flex items-center justify-center">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <footer className="border-t border-slate-900 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 Resume Impact AI. Built by UDA Apps.
      </footer>
    </main>
  );
}
