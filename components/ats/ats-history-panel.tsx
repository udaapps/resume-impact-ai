"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  exportAtsHistoryItemPdf,
} from "@/lib/ats/exportAtsPdf";

import {
  clearAtsAnalysisHistory,
  deleteAtsAnalysisHistory,
  type AtsAnalysisHistoryItem,
} from "@/lib/ats/analysisHistory";

type AtsHistoryPanelProps = {
  history: AtsAnalysisHistoryItem[];

  onHistoryChange: (
    nextHistory: AtsAnalysisHistoryItem[]
  ) => void;

  onRestore: (
    historyItem: AtsAnalysisHistoryItem
  ) => void;
};

function formatHistoryDate(
  dateValue: string
): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
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

function getScoreStyle(score: number) {
  if (score >= 80) {
    return {
      label: "Strong Match",

      className:
        "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    };
  }

  if (score >= 60) {
    return {
      label: "Good Foundation",

      className:
        "border-blue-500/40 bg-blue-500/10 text-blue-300",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs Improvement",

      className:
        "border-amber-500/40 bg-amber-500/10 text-amber-300",
    };
  }

  return {
    label: "Low Match",

    className:
      "border-red-500/40 bg-red-500/10 text-red-300",
  };
}

function getKeywordSummary(
  keywords: string[]
): string {
  if (keywords.length === 0) {
    return "No missing keywords";
  }

  const visibleKeywords =
    keywords.slice(0, 3);

  const extraCount =
    keywords.length -
    visibleKeywords.length;

  return extraCount > 0
    ? `${visibleKeywords.join(", ")} +${extraCount}`
    : visibleKeywords.join(", ");
}

export default function AtsHistoryPanel({
  history,
  onHistoryChange,
  onRestore,
}: AtsHistoryPanelProps) {
  const [searchText, setSearchText] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState<
      "newest" | "oldest" | "score"
    >("newest");

  const [isExpanded, setIsExpanded] =
    useState(true);

  const [
    exportingHistoryId,
    setExportingHistoryId,
  ] = useState<string | null>(null);

  const filteredHistory = useMemo(() => {
    const normalizedSearch =
      searchText
        .trim()
        .toLowerCase();

    const filtered =
      history.filter((item) => {
        if (!normalizedSearch) {
          return true;
        }

        const searchableText = [
          item.title,
          item.resumeText,
          item.jobDescription,
          ...item.result.matchedKeywords,
          ...item.result.missingKeywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          normalizedSearch
        );
      });

    return [...filtered].sort(
      (first, second) => {
        if (sortOrder === "score") {
          return (
            second.result.overallScore -
            first.result.overallScore
          );
        }

        const firstTime =
          new Date(
            first.updatedAt ||
              first.createdAt
          ).getTime();

        const secondTime =
          new Date(
            second.updatedAt ||
              second.createdAt
          ).getTime();

        return sortOrder === "newest"
          ? secondTime - firstTime
          : firstTime - secondTime;
      }
    );
  }, [
    history,
    searchText,
    sortOrder,
  ]);

  function handleRestore(
    item: AtsAnalysisHistoryItem
  ) {
    onRestore(item);

    toast.success(
      "ATS analysis restored.",
      {
        description:
          "The resume, job description and previous results were loaded.",
      }
    );

    window.setTimeout(() => {
      document
        .getElementById("ats-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 150);
  }

  async function handleExportPdf(
    item: AtsAnalysisHistoryItem
  ) {
    setExportingHistoryId(
      item.id
    );

    try {
      await exportAtsHistoryItemPdf(
        item
      );

      toast.success(
        "Saved ATS report downloaded."
      );
    } catch (pdfError) {
      console.error(
        "History PDF export error:",
        pdfError
      );

      toast.error(
        "Unable to export this ATS report."
      );
    } finally {
      setExportingHistoryId(
        null
      );
    }
  }

  function handleDelete(
    item: AtsAnalysisHistoryItem
  ) {
    const shouldDelete =
      window.confirm(
        `Delete "${item.title}" from ATS history?`
      );

    if (!shouldDelete) {
      return;
    }

    const nextHistory =
      deleteAtsAnalysisHistory(
        item.id
      );

    onHistoryChange(
      nextHistory
    );

    toast.success(
      "ATS history item deleted."
    );
  }

  function handleClearAll() {
    if (history.length === 0) {
      return;
    }

    const shouldClear =
      window.confirm(
        "Delete all saved ATS analyses? This cannot be undone."
      );

    if (!shouldClear) {
      return;
    }

    clearAtsAnalysisHistory();

    onHistoryChange([]);

    toast.success(
      "ATS analysis history cleared."
    );
  }

  return (
    <section
      aria-labelledby="ats-history-title"
      className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20 sm:p-7"
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            Saved Analyses
          </p>

          <h2
            id="ats-history-title"
            className="mt-2 text-2xl font-bold text-white"
          >
            Resume analysis history
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Restore previous resume and job
            comparisons, review earlier ATS
            scores, export reports, or delete
            analyses that you no longer need.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300">
            {history.length} Saved
          </span>

          <button
            type="button"
            onClick={() =>
              setIsExpanded(
                (current) =>
                  !current
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            {isExpanded
              ? "Hide History"
              : "Show History"}
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            disabled={
              history.length === 0 ||
              exportingHistoryId !== null
            }
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear All
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_190px]">
            <label
              htmlFor="ats-history-search"
              className="sr-only"
            >
              Search ATS history
            </label>

            <input
              id="ats-history-search"
              type="search"
              value={searchText}
              onChange={(event) =>
                setSearchText(
                  event.target.value
                )
              }
              placeholder="Search by title, keyword, resume or job description..."
              className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <label
              htmlFor="ats-history-sort"
              className="sr-only"
            >
              Sort ATS history
            </label>

            <select
              id="ats-history-sort"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(
                  event.target
                    .value as
                    | "newest"
                    | "oldest"
                    | "score"
                )
              }
              className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="score">
                Highest Score
              </option>
            </select>
          </div>

          {history.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
              <p className="text-lg font-semibold text-slate-200">
                No ATS history yet
              </p>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Complete an ATS analysis and it
                will appear here automatically.
              </p>
            </div>
          ) : filteredHistory.length ===
            0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
              <p className="text-lg font-semibold text-slate-200">
                No matching analyses
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredHistory.map(
                (item) => {
                  const scoreStyle =
                    getScoreStyle(
                      item.result
                        .overallScore
                    );

                  const isExporting =
                    exportingHistoryId ===
                    item.id;

                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-slate-700"
                    >
                      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="min-w-0 break-words text-lg font-bold text-white">
                              {item.title}
                            </h3>

                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${scoreStyle.className}`}
                            >
                              {
                                item.result
                                  .overallScore
                              }
                              /100 ·{" "}
                              {
                                scoreStyle.label
                              }
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-slate-500">
                            Saved{" "}
                            {formatHistoryDate(
                              item.updatedAt ||
                                item.createdAt
                            )}
                          </p>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                              {
                                label:
                                  "Keywords",

                                value:
                                  item.result
                                    .keywordScore,
                              },
                              {
                                label:
                                  "Structure",

                                value:
                                  item.result
                                    .structureScore,
                              },
                              {
                                label:
                                  "Formatting",

                                value:
                                  item.result
                                    .formattingScore,
                              },
                              {
                                label:
                                  "Readability",

                                value:
                                  item.result
                                    .readabilityScore,
                              },
                            ].map(
                              (metric) => (
                                <div
                                  key={
                                    metric.label
                                  }
                                  className="rounded-xl border border-slate-800 bg-slate-900 p-3"
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

                          <div className="mt-4 grid gap-3 lg:grid-cols-2">
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                                Matched
                              </p>

                              <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                                {item.result
                                  .matchedKeywords
                                  .slice(0, 5)
                                  .join(", ") ||
                                  "No matched keywords"}
                              </p>
                            </div>

                            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                                Missing
                              </p>

                              <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                                {getKeywordSummary(
                                  item.result
                                    .missingKeywords
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid shrink-0 grid-cols-2 gap-3 sm:flex sm:flex-wrap xl:w-40 xl:flex-col">
                          <button
                            type="button"
                            onClick={() =>
                              handleRestore(
                                item
                              )
                            }
                            disabled={
                              isExporting
                            }
                            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Restore
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleExportPdf(
                                item
                              )
                            }
                            disabled={
                              isExporting
                            }
                            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isExporting
                              ? "Creating..."
                              : "Export PDF"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                item
                              )
                            }
                            disabled={
                              isExporting
                            }
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}