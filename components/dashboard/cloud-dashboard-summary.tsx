"use client";

import {
  AlertTriangle,
  BarChart3,
  Cloud,
  FileSearch,
  Loader2,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  loadResumeAnalyses,
  type ResumeAnalysisRecord,
} from "@/lib/supabase/resume-analyses";

function average(
  values: number[]
): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (total, value) =>
        total + value,
      0
    ) / values.length
  );
}

function getScoreTextClass(
  score: number
): string {
  if (score >= 80) {
    return "text-emerald-300";
  }

  if (score >= 60) {
    return "text-amber-300";
  }

  return "text-red-300";
}

function formatDate(
  value: string
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

export default function CloudDashboardSummary() {
  const [
    analyses,
    setAnalyses,
  ] = useState<
    ResumeAnalysisRecord[]
  >([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  async function loadCloudData() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const records =
        await loadResumeAnalyses(
          100
        );

      setAnalyses(records);
    } catch (error) {
      console.error(
        "Dashboard cloud load error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to load cloud dashboard data.";

      setErrorMessage(message);

      toast.error(
        "Unable to load cloud data.",
        {
          description: message,
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadCloudData();
  }, []);

  const dashboardStats =
    useMemo(() => {
      const total =
        analyses.length;

      const averageScore =
        average(
          analyses.map(
            (item) =>
              item.overallScore
          )
        );

      const averageKeywordScore =
        average(
          analyses.map(
            (item) =>
              item.keywordScore
          )
        );

      const bestScore =
        total > 0
          ? Math.max(
              ...analyses.map(
                (item) =>
                  item.overallScore
              )
            )
          : 0;

      const recentScore =
        analyses[0]
          ?.overallScore ?? 0;

      const previousScore =
        analyses[1]
          ?.overallScore ?? 0;

      const scoreChange =
        total >= 2
          ? recentScore -
            previousScore
          : 0;

      return {
        total,
        averageScore,
        averageKeywordScore,
        bestScore,
        recentScore,
        scoreChange,
      };
    }, [analyses]);

  if (isLoading) {
    return (
      <section className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900">
        <div className="text-center">
          <Loader2
            aria-hidden
            className="mx-auto h-8 w-8 animate-spin text-blue-400"
          />

          <p className="mt-4 text-sm text-slate-400">
            Loading cloud dashboard...
          </p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle
            aria-hidden
            className="mt-1 h-6 w-6 shrink-0 text-red-300"
          />

          <div>
            <h2 className="font-bold text-red-200">
              Cloud dashboard unavailable
            </h2>

            <p className="mt-2 text-sm leading-6 text-red-200/80">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                void loadCloudData()
              }
              className="mt-4 rounded-xl border border-red-400/30 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/10"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            <Cloud
              aria-hidden
              className="h-4 w-4"
            />

            Cloud Workspace
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Real ATS Performance
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            These statistics are loaded from your personal Supabase cloud history.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            void loadCloudData()
          }
          className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
        >
          Refresh Cloud Data
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
              <FileSearch
                aria-hidden
                className="h-5 w-5"
              />
            </span>

            <span className="text-xs text-slate-500">
              Cloud
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Total Analyses
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {dashboardStats.total}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <BarChart3
                aria-hidden
                className="h-5 w-5"
              />
            </span>

            <span className="text-xs text-slate-500">
              Average
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Average ATS Score
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${getScoreTextClass(
              dashboardStats.averageScore
            )}`}
          >
            {
              dashboardStats.averageScore
            }
            <span className="text-base text-slate-500">
              /100
            </span>
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
              <Target
                aria-hidden
                className="h-5 w-5"
              />
            </span>

            <span className="text-xs text-slate-500">
              Best
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Best ATS Score
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${getScoreTextClass(
              dashboardStats.bestScore
            )}`}
          >
            {
              dashboardStats.bestScore
            }
            <span className="text-base text-slate-500">
              /100
            </span>
          </p>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
              <TrendingUp
                aria-hidden
                className="h-5 w-5"
              />
            </span>

            <span
              className={
                dashboardStats.scoreChange >=
                0
                  ? "text-xs text-emerald-300"
                  : "text-xs text-red-300"
              }
            >
              {dashboardStats.scoreChange >
              0
                ? "+"
                : ""}
              {
                dashboardStats.scoreChange
              }
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Latest ATS Score
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${getScoreTextClass(
              dashboardStats.recentScore
            )}`}
          >
            {
              dashboardStats.recentScore
            }
            <span className="text-base text-slate-500">
              /100
            </span>
          </p>
        </article>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold text-white">
              Recent Cloud Analyses
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Your newest ATS reports saved in Supabase.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Keyword average:{" "}
            <span className="font-bold text-white">
              {
                dashboardStats.averageKeywordScore
              }
              /100
            </span>
          </p>
        </div>

        {analyses.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
            <FileSearch
              aria-hidden
              className="mx-auto h-8 w-8 text-slate-600"
            />

            <p className="mt-4 font-semibold text-white">
              No cloud analyses yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Run an ATS analysis while signed in. It will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {analyses
              .slice(0, 5)
              .map((analysis) => (
                <article
                  key={analysis.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      {
                        analysis.title
                      }
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(
                        analysis.createdAt
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-xs text-slate-500">
                        Keywords
                      </p>

                      <p className="mt-1 font-bold text-slate-200">
                        {
                          analysis.keywordScore
                        }
                        /100
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        ATS Score
                      </p>

                      <p
                        className={`mt-1 text-lg font-bold ${getScoreTextClass(
                          analysis.overallScore
                        )}`}
                      >
                        {
                          analysis.overallScore
                        }
                        /100
                      </p>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}