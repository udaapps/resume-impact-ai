"use client";

import {
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileSearch,
  FileText,
  Loader2,
  Pencil,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import {
  exportAtsAnalysisPdf,
} from "@/lib/ats/exportAtsPdf";

import type {
  AtsHistoryAnalysisResult,
} from "@/lib/ats/analysisHistory";

import {
  deleteResumeAnalysis,
  loadResumeAnalyses,
  renameResumeAnalysis,
  type ResumeAnalysisRecord,
} from "@/lib/supabase/resume-analyses";

type SortOption =
  | "newest"
  | "oldest"
  | "highest"
  | "lowest"
  | "title";

type ScoreFilter =
  | "all"
  | "strong"
  | "good"
  | "improving"
  | "low";

function clampScore(
  value: number
): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(value)
    )
  );
}

function formatReportDate(
  dateValue: string
): string {
  const date =
    new Date(dateValue);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

function getItemDate(
  item: ResumeAnalysisRecord
): string {
  return (
    item.updatedAt ||
    item.createdAt
  );
}

function getScoreLabel(
  score: number
): string {
  if (score >= 80) {
    return "Strong Match";
  }

  if (score >= 60) {
    return "Good Foundation";
  }

  if (score >= 40) {
    return "Needs Improvement";
  }

  return "Low Match";
}

function getScoreClasses(
  score: number
) {
  if (score >= 80) {
    return {
      text:
        "text-emerald-300",
      border:
        "border-emerald-500/30",
      background:
        "bg-emerald-500/10",
      progress:
        "bg-emerald-500",
    };
  }

  if (score >= 60) {
    return {
      text:
        "text-blue-300",
      border:
        "border-blue-500/30",
      background:
        "bg-blue-500/10",
      progress:
        "bg-blue-500",
    };
  }

  if (score >= 40) {
    return {
      text:
        "text-amber-300",
      border:
        "border-amber-500/30",
      background:
        "bg-amber-500/10",
      progress:
        "bg-amber-500",
    };
  }

  return {
    text:
      "text-red-300",
    border:
      "border-red-500/30",
    background:
      "bg-red-500/10",
    progress:
      "bg-red-500",
  };
}

function matchesScoreFilter(
  score: number,
  filter: ScoreFilter
): boolean {
  if (filter === "all") {
    return true;
  }

  if (filter === "strong") {
    return score >= 80;
  }

  if (filter === "good") {
    return (
      score >= 60 &&
      score < 80
    );
  }

  if (
    filter === "improving"
  ) {
    return (
      score >= 40 &&
      score < 60
    );
  }

  return score < 40;
}

function createPreviewText(
  value: string,
  maximumLength = 220
): string {
  const cleaned =
    value
      .replace(/\s+/g, " ")
      .trim();

  if (
    cleaned.length <=
    maximumLength
  ) {
    return cleaned;
  }

  return `${cleaned.slice(
    0,
    maximumLength
  )}...`;
}

function getMissingKeywordPreview(
  keywords: string[]
): string {
  if (
    keywords.length === 0
  ) {
    return "No important missing keywords";
  }

  const visible =
    keywords.slice(0, 4);

  const remaining =
    keywords.length -
    visible.length;

  return remaining > 0
    ? `${visible.join(
        ", "
      )} +${remaining}`
    : visible.join(", ");
}

function createPdfResult(
  item: ResumeAnalysisRecord
): AtsHistoryAnalysisResult {
  return {
    overallScore:
      item.overallScore,

    keywordScore:
      item.keywordScore,

    skillsScore:
      item.skillsScore,

    experienceScore:
      item.experienceScore,

    structureScore:
      item.structureScore,

    bulletScore:
      item.bulletScore,

    achievementScore:
      item.achievementScore,

    formattingScore:
      item.formattingScore,

    readabilityScore:
      item.readabilityScore,

    matchedKeywords:
      item.matchedKeywords,

    missingKeywords:
      item.missingKeywords,

    foundSections:
      item.foundSections,

    missingSections:
      item.missingSections,

    requiredMissingSections:
      item.requiredMissingSections,

    recommendations:
      item.recommendations,

    sections:
      item.sections as AtsHistoryAnalysisResult["sections"],

    formattingIssues:
      item.formattingIssues as AtsHistoryAnalysisResult["formattingIssues"],

    matchedItems:
      item.matchedItems as AtsHistoryAnalysisResult["matchedItems"],

    missingItems:
      item.missingItems as AtsHistoryAnalysisResult["missingItems"],

    achievementMetrics:
      item.achievementMetrics,

    achievementActionVerbs:
      item.achievementActionVerbs,

    achievementCount:
      item.achievementCount,

    wordCount:
      item.wordCount,

    bulletCount:
      item.bulletCount,

    weakPhraseCount:
      item.weakPhraseCount,

    longSentenceCount:
      item.longSentenceCount,

    longParagraphCount:
      item.longParagraphCount,

    hasEmail:
      item.hasEmail,

    hasPhone:
      item.hasPhone,

    hasLinkedIn:
      item.hasLinkedIn,

    firstPersonPronounCount:
      typeof item.analysisResult
        .firstPersonPronounCount ===
      "number"
        ? item.analysisResult
            .firstPersonPronounCount
        : 0,

    repeatedKeywordCount:
      typeof item.analysisResult
        .repeatedKeywordCount ===
      "number"
        ? item.analysisResult
            .repeatedKeywordCount
        : 0,
  };
}

function EmptyReports() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center sm:p-12">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
        <FileText
          aria-hidden
          className="h-8 w-8"
        />
      </span>

      <h2 className="mt-5 text-2xl font-bold text-white">
        No cloud ATS reports yet
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        Complete an ATS resume
        analysis while signed in.
        Your report will be saved to
        Supabase and appear here
        automatically.
      </p>

      <Link
        href="/ats-resume-checker"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        <FileSearch
          aria-hidden
          className="h-4 w-4"
        />

        Start ATS Analysis
      </Link>
    </section>
  );
}

export default function ReportsPage() {
  const [
    reports,
    setReports,
  ] = useState<
    ResumeAnalysisRecord[]
  >([]);

  const [
    reportsLoaded,
    setReportsLoaded,
  ] = useState(false);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    sortOption,
    setSortOption,
  ] = useState<SortOption>(
    "newest"
  );

  const [
    scoreFilter,
    setScoreFilter,
  ] = useState<ScoreFilter>(
    "all"
  );

  const [
    previewItem,
    setPreviewItem,
  ] = useState<
    ResumeAnalysisRecord | null
  >(null);

  const [
    exportingId,
    setExportingId,
  ] = useState<string | null>(
    null
  );

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  const [
    renamingItem,
    setRenamingItem,
  ] = useState<
    ResumeAnalysisRecord | null
  >(null);

  const [
    renameValue,
    setRenameValue,
  ] = useState("");

  const [
    isRenaming,
    setIsRenaming,
  ] = useState(false);

  const loadReports =
    useCallback(
      async (
        showRefreshToast = false
      ) => {
        if (showRefreshToast) {
          setIsRefreshing(true);
        }

        setErrorMessage("");

        try {
          const cloudReports =
            await loadResumeAnalyses(
              300
            );

          setReports(
            cloudReports
          );

          setPreviewItem(
            (current) => {
              if (!current) {
                return null;
              }

              return (
                cloudReports.find(
                  (item) =>
                    item.id ===
                    current.id
                ) ?? null
              );
            }
          );

          if (
            showRefreshToast
          ) {
            toast.success(
              "Cloud reports refreshed."
            );
          }
        } catch (error) {
          console.error(
            "Unable to load cloud ATS reports:",
            error
          );

          const message =
            error instanceof Error
              ? error.message
              : "Unable to load cloud reports.";

          setErrorMessage(
            message
          );

          toast.error(
            "Unable to load reports.",
            {
              description:
                message,
            }
          );
        } finally {
          setReportsLoaded(
            true
          );

          setIsRefreshing(
            false
          );
        }
      },
      []
    );

  useEffect(() => {
    void loadReports();
  }, [loadReports]);

  useEffect(() => {
    if (!previewItem) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape"
      ) {
        setPreviewItem(null);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [previewItem]);

  useEffect(() => {
    if (!renamingItem) {
      return;
    }

    setRenameValue(
      renamingItem.title
    );
  }, [renamingItem]);

  const bestReport =
    useMemo(
      () =>
        reports.reduce<
          ResumeAnalysisRecord | null
        >(
          (best, current) => {
            if (!best) {
              return current;
            }

            return (
              current.overallScore >
              best.overallScore
                ? current
                : best
            );
          },
          null
        ),
      [reports]
    );

  const averageScore =
    useMemo(() => {
      if (
        reports.length === 0
      ) {
        return 0;
      }

      const total =
        reports.reduce(
          (sum, item) =>
            sum +
            clampScore(
              item.overallScore
            ),
          0
        );

      return Math.round(
        total / reports.length
      );
    }, [reports]);

  const filteredReports =
    useMemo(() => {
      const query =
        searchText
          .trim()
          .toLowerCase();

      const filtered =
        reports.filter(
          (item) => {
            const score =
              clampScore(
                item.overallScore
              );

            if (
              !matchesScoreFilter(
                score,
                scoreFilter
              )
            ) {
              return false;
            }

            if (!query) {
              return true;
            }

            const searchableText =
              [
                item.title,
                item.resumeText,
                item.jobDescription,
                ...item
                  .matchedKeywords,
                ...item
                  .missingKeywords,
                ...item
                  .recommendations,
              ]
                .join(" ")
                .toLowerCase();

            return searchableText.includes(
              query
            );
          }
        );

      return [
        ...filtered,
      ].sort(
        (
          first,
          second
        ) => {
          if (
            sortOption ===
            "highest"
          ) {
            return (
              second.overallScore -
              first.overallScore
            );
          }

          if (
            sortOption ===
            "lowest"
          ) {
            return (
              first.overallScore -
              second.overallScore
            );
          }

          if (
            sortOption ===
            "title"
          ) {
            return first.title.localeCompare(
              second.title
            );
          }

          const firstTime =
            new Date(
              getItemDate(first)
            ).getTime();

          const secondTime =
            new Date(
              getItemDate(second)
            ).getTime();

          return sortOption ===
            "newest"
            ? secondTime -
                firstTime
            : firstTime -
                secondTime;
        }
      );
    }, [
      reports,
      searchText,
      scoreFilter,
      sortOption,
    ]);

  async function handleExport(
    item: ResumeAnalysisRecord
  ) {
    setExportingId(item.id);

    try {
      await exportAtsAnalysisPdf({
        resumeText:
          item.resumeText,

        jobDescription:
          item.jobDescription,

        result:
          createPdfResult(
            item
          ),

        title:
          item.title ||
          "ATS Resume Analysis Report",
      });

      toast.success(
        "ATS PDF report downloaded."
      );
    } catch (error) {
      console.error(
        "Cloud report PDF export error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to export the PDF report.";

      toast.error(
        "Unable to export PDF.",
        {
          description:
            message,
        }
      );
    } finally {
      setExportingId(null);
    }
  }

  async function handleDelete(
    item: ResumeAnalysisRecord
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.title}" from cloud history? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(item.id);

    try {
      await deleteResumeAnalysis(
        item.id
      );

      setReports(
        (currentReports) =>
          currentReports.filter(
            (report) =>
              report.id !==
              item.id
          )
      );

      if (
        previewItem?.id ===
        item.id
      ) {
        setPreviewItem(null);
      }

      if (
        renamingItem?.id ===
        item.id
      ) {
        setRenamingItem(null);
      }

      toast.success(
        "Cloud ATS report deleted."
      );
    } catch (error) {
      console.error(
        "Unable to delete cloud report:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to delete the report.";

      toast.error(
        "Delete failed.",
        {
          description:
            message,
        }
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleRename() {
    if (!renamingItem) {
      return;
    }

    const normalizedTitle =
      renameValue.trim();

    if (!normalizedTitle) {
      toast.error(
        "Report title is required."
      );

      return;
    }

    if (
      normalizedTitle.length >
      200
    ) {
      toast.error(
        "Report title is too long.",
        {
          description:
            "Use 200 characters or fewer.",
        }
      );

      return;
    }

    setIsRenaming(true);

    try {
      const updated =
        await renameResumeAnalysis(
          renamingItem.id,
          normalizedTitle
        );

      setReports(
        (currentReports) =>
          currentReports.map(
            (report) =>
              report.id ===
              updated.id
                ? updated
                : report
          )
      );

      setPreviewItem(
        (current) =>
          current?.id ===
          updated.id
            ? updated
            : current
      );

      setRenamingItem(null);
      setRenameValue("");

      toast.success(
        "Report renamed successfully."
      );
    } catch (error) {
      console.error(
        "Unable to rename cloud report:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to rename the report.";

      toast.error(
        "Rename failed.",
        {
          description:
            message,
        }
      );
    } finally {
      setIsRenaming(false);
    }
  }

  function handleResetFilters() {
    setSearchText("");
    setScoreFilter("all");
    setSortOption("newest");
  }

  if (!reportsLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-900" />

        <div className="h-24 animate-pulse rounded-2xl bg-slate-900" />

        <div className="grid gap-5 xl:grid-cols-2">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-3xl bg-slate-900"
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <section className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-red-200">
          Cloud reports unavailable
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-red-100/80">
          {errorMessage}
        </p>

        <button
          type="button"
          onClick={() =>
            void loadReports()
          }
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-300/30 px-5 py-3 font-semibold text-red-100 transition hover:bg-red-500/10"
        >
          <RefreshCw
            aria-hidden
            className="h-4 w-4"
          />

          Try Again
        </button>
      </section>
    );
  }

  if (
    reports.length === 0
  ) {
    return (
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Cloud Reports Center
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
                ATS analysis reports
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                Review, organize and
                export professional ATS
                reports saved in your
                Supabase account.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                void loadReports(
                  true
                )
              }
              disabled={
                isRefreshing
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white disabled:opacity-50"
            >
              <RefreshCw
                aria-hidden
                className={`h-4 w-4 ${
                  isRefreshing
                    ? "animate-spin"
                    : ""
                }`}
              />

              Refresh
            </button>
          </div>
        </section>

        <EmptyReports />
      </div>
    );
  }

  const bestScore =
    bestReport
      ? clampScore(
          bestReport.overallScore
        )
      : 0;

  return (
    <>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Cloud Reports Center
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Manage your ATS
                analysis reports
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Search Supabase reports,
                filter by score, preview
                details, rename records,
                remove old reports and
                export professional PDF
                files.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/ats-resume-checker"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  <FileSearch
                    aria-hidden
                    className="h-4 w-4"
                  />

                  New ATS Analysis
                </Link>

                <Link
                  href="/dashboard/analytics"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
                >
                  View Analytics
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    void loadReports(
                      true
                    )
                  }
                  disabled={
                    isRefreshing
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/70 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    aria-hidden
                    className={`h-4 w-4 ${
                      isRefreshing
                        ? "animate-spin"
                        : ""
                    }`}
                  />

                  {isRefreshing
                    ? "Refreshing..."
                    : "Refresh Cloud"}
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[480px]">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Total Reports
                </p>

                <p className="mt-3 text-3xl font-bold text-white">
                  {reports.length}
                </p>
              </div>

              <div className="rounded-2xl border border-blue-500/25 bg-blue-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
                  Average Score
                </p>

                <p className="mt-3 text-3xl font-bold text-white">
                  {averageScore}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  Best Score
                </p>

                <p className="mt-3 text-3xl font-bold text-white">
                  {bestScore}
                </p>
              </div>
            </div>
          </div>
        </section>

        {bestReport && (
          <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  <Award
                    aria-hidden
                    className="h-6 w-6"
                  />
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300">
                    Best Cloud Report
                  </p>

                  <h2 className="mt-2 truncate text-xl font-bold text-white">
                    {
                      bestReport.title
                    }
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {bestScore}/100 ·{" "}
                    {getScoreLabel(
                      bestScore
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewItem(
                      bestReport
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
                >
                  <Eye
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Preview
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRenamingItem(
                      bestReport
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-bold text-violet-200 transition hover:bg-violet-500/20"
                >
                  <Pencil
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Rename
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void handleExport(
                      bestReport
                    )
                  }
                  disabled={
                    exportingId ===
                    bestReport.id
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download
                    aria-hidden
                    className="h-4 w-4"
                  />

                  {exportingId ===
                  bestReport.id
                    ? "Creating PDF..."
                    : "Export Best"}
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-7">
          <div className="grid gap-4 lg:grid-cols-[1fr_210px_210px]">
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target
                      .value
                  )
                }
                placeholder="Search reports, keywords, resumes or job descriptions..."
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="relative">
              <select
                value={scoreFilter}
                onChange={(event) =>
                  setScoreFilter(
                    event.target
                      .value as ScoreFilter
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="all">
                  All Scores
                </option>

                <option value="strong">
                  Strong Match — 80+
                </option>

                <option value="good">
                  Good — 60–79
                </option>

                <option value="improving">
                  Improving — 40–59
                </option>

                <option value="low">
                  Low — Below 40
                </option>
              </select>

              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
            </div>

            <div className="relative">
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target
                      .value as SortOption
                  )
                }
                className="h-12 w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>

                <option value="highest">
                  Highest Score
                </option>

                <option value="lowest">
                  Lowest Score
                </option>

                <option value="title">
                  Title A–Z
                </option>
              </select>

              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-300">
                {
                  filteredReports.length
                }
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-300">
                {reports.length}
              </span>{" "}
              cloud reports
            </p>

            {(searchText ||
              scoreFilter !==
                "all" ||
              sortOption !==
                "newest") && (
              <button
                type="button"
                onClick={
                  handleResetFilters
                }
                className="text-sm font-semibold text-blue-300 transition hover:text-blue-200"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {filteredReports.length ===
        0 ? (
          <section className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
            <Search
              aria-hidden
              className="mx-auto h-9 w-9 text-slate-600"
            />

            <h2 className="mt-4 text-xl font-bold text-white">
              No matching reports
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try a different search
              term or score filter.
            </p>

            <button
              type="button"
              onClick={
                handleResetFilters
              }
              className="mt-5 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Reset Filters
            </button>
          </section>
        ) : (
          <section className="grid gap-5 xl:grid-cols-2">
            {filteredReports.map(
              (item) => {
                const score =
                  clampScore(
                    item.overallScore
                  );

                const style =
                  getScoreClasses(
                    score
                  );

                const isExporting =
                  exportingId ===
                  item.id;

                const isDeleting =
                  deletingId ===
                  item.id;

                return (
                  <article
                    key={item.id}
                    className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-black/10 transition hover:border-slate-700 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${style.border} ${style.background} ${style.text}`}
                          >
                            {score}
                            /100 ·{" "}
                            {getScoreLabel(
                              score
                            )}
                          </span>

                          {bestReport?.id ===
                            item.id && (
                            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                              Best Report
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-white">
                          {
                            item.title
                          }
                        </h2>

                        <p className="mt-3 inline-flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays
                            aria-hidden
                            className="h-3.5 w-3.5"
                          />

                          {formatReportDate(
                            getItemDate(
                              item
                            )
                          )}
                        </p>
                      </div>

                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${style.border} ${style.background} ${style.text}`}
                      >
                        <FileText
                          aria-hidden
                          className="h-6 w-6"
                        />
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {[
                        {
                          label:
                            "Keywords",
                          value:
                            item.keywordScore,
                        },
                        {
                          label:
                            "Structure",
                          value:
                            item.structureScore,
                        },
                        {
                          label:
                            "Formatting",
                          value:
                            item.formattingScore,
                        },
                        {
                          label:
                            "Readability",
                          value:
                            item.readabilityScore,
                        },
                      ].map(
                        (metric) => (
                          <div
                            key={
                              metric.label
                            }
                            className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                          >
                            <p className="text-xs text-slate-500">
                              {
                                metric.label
                              }
                            </p>

                            <p className="mt-1 text-lg font-bold text-white">
                              {
                                metric.value
                              }
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                          Matched Keywords
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                          {item
                            .matchedKeywords
                            .slice(
                              0,
                              5
                            )
                            .join(
                              ", "
                            ) ||
                            "No matched keywords"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                          Missing Keywords
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                          {getMissingKeywordPreview(
                            item.missingKeywords
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Target Job Preview
                      </p>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                        {createPreviewText(
                          item.jobDescription
                        )}
                      </p>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-3 pt-5 sm:grid-cols-4">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewItem(
                            item
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-300 transition hover:border-blue-500 hover:text-white"
                      >
                        <Eye
                          aria-hidden
                          className="h-4 w-4"
                        />

                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setRenamingItem(
                            item
                          )
                        }
                        disabled={
                          isDeleting
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-bold text-violet-200 transition hover:bg-violet-500/20 disabled:opacity-50"
                      >
                        <Pencil
                          aria-hidden
                          className="h-4 w-4"
                        />

                        Rename
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleExport(
                            item
                          )
                        }
                        disabled={
                          isExporting ||
                          isDeleting
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isExporting ? (
                          <Loader2
                            aria-hidden
                            className="h-4 w-4 animate-spin"
                          />
                        ) : (
                          <Download
                            aria-hidden
                            className="h-4 w-4"
                          />
                        )}

                        {isExporting
                          ? "Creating..."
                          : "Export"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void handleDelete(
                            item
                          )
                        }
                        disabled={
                          isExporting ||
                          isDeleting
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2
                            aria-hidden
                            className="h-4 w-4 animate-spin"
                          />
                        ) : (
                          <Trash2
                            aria-hidden
                            className="h-4 w-4"
                          />
                        )}

                        {isDeleting
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </article>
                );
              }
            )}
          </section>
        )}

        <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-slate-900 to-blue-500/10 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-violet-300">
                Continue Improving
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Create a stronger
                resume report
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                Analyze another resume
                version, resolve missing
                keywords and compare the
                new score with your
                cloud reports.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ats-resume-checker"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500"
              >
                <FileSearch
                  aria-hidden
                  className="h-4 w-4"
                />

                Analyze Resume
              </Link>

              <Link
                href="/ats-resume-checker#ats-bullet-rewriter-title"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-bold text-violet-200 transition hover:bg-violet-500/20"
              >
                <Sparkles
                  aria-hidden
                  className="h-4 w-4"
                />

                Rewrite a Bullet
              </Link>
            </div>
          </div>
        </section>
      </div>

      {previewItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-preview-title"
        >
          <button
            type="button"
            onClick={() =>
              setPreviewItem(null)
            }
            aria-label="Close report preview"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <article className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/60">
            <header className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-slate-800 bg-slate-900/95 p-5 backdrop-blur-xl sm:p-6">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                  Cloud ATS Report
                  Preview
                </p>

                <h2
                  id="report-preview-title"
                  className="mt-2 break-words text-2xl font-bold text-white"
                >
                  {
                    previewItem.title
                  }
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {formatReportDate(
                    getItemDate(
                      previewItem
                    )
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setPreviewItem(null)
                }
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-slate-400 transition hover:border-red-500 hover:text-red-300"
                aria-label="Close preview"
              >
                <X
                  aria-hidden
                  className="h-5 w-5"
                />
              </button>
            </header>

            <div className="space-y-6 p-5 sm:p-7">
              <section className="grid gap-4 sm:grid-cols-[220px_1fr]">
                <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-300">
                    Overall ATS Score
                  </p>

                  <p className="mt-4 text-6xl font-bold text-white">
                    {clampScore(
                      previewItem.overallScore
                    )}
                  </p>

                  <p className="mt-3 font-semibold text-blue-300">
                    {getScoreLabel(
                      clampScore(
                        previewItem.overallScore
                      )
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label:
                        "Keywords",
                      value:
                        previewItem.keywordScore,
                    },
                    {
                      label:
                        "Structure",
                      value:
                        previewItem.structureScore,
                    },
                    {
                      label:
                        "Achievements",
                      value:
                        previewItem.achievementScore,
                    },
                    {
                      label:
                        "Formatting",
                      value:
                        previewItem.formattingScore,
                    },
                    {
                      label:
                        "Readability",
                      value:
                        previewItem.readabilityScore,
                    },
                    {
                      label:
                        "Experience",
                      value:
                        previewItem.experienceScore,
                    },
                    {
                      label:
                        "Bullets",
                      value:
                        previewItem.bulletScore,
                    },
                    {
                      label:
                        "Skills",
                      value:
                        previewItem.skillsScore,
                    },
                  ].map(
                    (metric) => (
                      <div
                        key={
                          metric.label
                        }
                        className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                      >
                        <p className="text-xs text-slate-500">
                          {
                            metric.label
                          }
                        </p>

                        <p className="mt-2 text-2xl font-bold text-white">
                          {
                            metric.value
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>

              <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                  <h3 className="font-bold text-emerald-300">
                    Matched Keywords
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {previewItem
                      .matchedKeywords
                      .length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No matched
                        keywords.
                      </p>
                    ) : (
                      previewItem.matchedKeywords.map(
                        (keyword) => (
                          <span
                            key={
                              keyword
                            }
                            className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200"
                          >
                            <CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />

                            {keyword}
                          </span>
                        )
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
                  <h3 className="font-bold text-amber-300">
                    Missing Keywords
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {previewItem
                      .missingKeywords
                      .length === 0 ? (
                      <p className="text-sm text-emerald-300">
                        No important
                        keywords missing.
                      </p>
                    ) : (
                      previewItem.missingKeywords.map(
                        (keyword) => (
                          <span
                            key={
                              keyword
                            }
                            className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-sm text-amber-200"
                          >
                            {keyword}
                          </span>
                        )
                      )
                    )}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="text-lg font-bold text-white">
                  Recommended
                  Improvements
                </h3>

                <ol className="mt-4 space-y-3">
                  {previewItem
                    .recommendations
                    .length === 0 ? (
                    <li className="text-sm text-slate-500">
                      No recommendations
                      available.
                    </li>
                  ) : (
                    previewItem.recommendations.map(
                      (
                        recommendation,
                        index
                      ) => (
                        <li
                          key={`${index}-${recommendation}`}
                          className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300">
                            {index + 1}
                          </span>

                          <p className="text-sm leading-6 text-slate-300">
                            {
                              recommendation
                            }
                          </p>
                        </li>
                      )
                    )
                  )}
                </ol>
              </section>

              <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="font-bold text-white">
                    Resume Content
                  </h3>

                  <pre className="mt-4 max-h-80 overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-400">
                    {
                      previewItem.resumeText
                    }
                  </pre>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <h3 className="font-bold text-white">
                    Target Job
                    Description
                  </h3>

                  <pre className="mt-4 max-h-80 overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-400">
                    {
                      previewItem.jobDescription
                    }
                  </pre>
                </div>
              </section>

              <div className="flex flex-col justify-end gap-3 border-t border-slate-800 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    setPreviewItem(
                      null
                    )
                  }
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-slate-500 hover:text-white"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setRenamingItem(
                      previewItem
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-bold text-violet-200 transition hover:bg-violet-500/20"
                >
                  <Pencil
                    aria-hidden
                    className="h-4 w-4"
                  />

                  Rename Report
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void handleExport(
                      previewItem
                    )
                  }
                  disabled={
                    exportingId ===
                    previewItem.id
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {exportingId ===
                  previewItem.id ? (
                    <Loader2
                      aria-hidden
                      className="h-4 w-4 animate-spin"
                    />
                  ) : (
                    <Download
                      aria-hidden
                      className="h-4 w-4"
                    />
                  )}

                  {exportingId ===
                  previewItem.id
                    ? "Creating PDF..."
                    : "Download PDF"}
                </button>
              </div>
            </div>
          </article>
        </div>
      )}

      {renamingItem && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rename-report-title"
        >
          <button
            type="button"
            onClick={() =>
              setRenamingItem(
                null
              )
            }
            aria-label="Close rename dialog"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <article className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-300">
                  Cloud Report
                </p>

                <h2
                  id="rename-report-title"
                  className="mt-2 text-2xl font-bold text-white"
                >
                  Rename ATS report
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setRenamingItem(
                    null
                  )
                }
                aria-label="Close rename dialog"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-slate-400 transition hover:border-red-500 hover:text-red-300"
              >
                <X
                  aria-hidden
                  className="h-5 w-5"
                />
              </button>
            </div>

            <label
              htmlFor="report-title"
              className="mt-6 block text-sm font-semibold text-slate-300"
            >
              Report title
            </label>

            <input
              id="report-title"
              type="text"
              value={renameValue}
              onChange={(event) =>
                setRenameValue(
                  event.target.value
                )
              }
              maxLength={200}
              autoFocus
              className="mt-2 h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />

            <p className="mt-2 text-right text-xs text-slate-500">
              {renameValue.length}
              /200
            </p>

            <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  setRenamingItem(
                    null
                  )
                }
                disabled={
                  isRenaming
                }
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleRename()
                }
                disabled={
                  isRenaming ||
                  !renameValue.trim()
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isRenaming ? (
                  <Loader2
                    aria-hidden
                    className="h-4 w-4 animate-spin"
                  />
                ) : (
                  <Pencil
                    aria-hidden
                    className="h-4 w-4"
                  />
                )}

                {isRenaming
                  ? "Saving..."
                  : "Save New Title"}
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  );
}