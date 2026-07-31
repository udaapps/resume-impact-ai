"use client";

import { useMemo, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { toast } from "sonner";

type RewriteTone =
  | "professional"
  | "technical"
  | "executive"
  | "entry-level";

type RewriteStyle =
  | "achievement-focused"
  | "ats-friendly"
  | "star-method"
  | "concise";

type RewriteResult = {
  originalBullet: string;
  rewrittenBullet: string;
  alternatives: string[];
  keywordsUsed: string[];
  improvementSummary: string;
};

type AtsBulletRewriterProps = {
  jobDescription?: string;
  missingKeywords?: string[];
  defaultJobTitle?: string;
  onUseRewrite?: (rewrittenBullet: string) => void;
};

const TONE_OPTIONS: Array<{
  value: RewriteTone;
  label: string;
  description: string;
}> = [
  {
    value: "professional",
    label: "Professional",
    description:
      "Clear and polished language suitable for most roles.",
  },
  {
    value: "technical",
    label: "Technical",
    description:
      "Highlights engineering, systems, tools, and technical work.",
  },
  {
    value: "executive",
    label: "Executive",
    description:
      "Emphasizes leadership, strategy, ownership, and business impact.",
  },
  {
    value: "entry-level",
    label: "Entry Level",
    description:
      "Strong but realistic wording for students and junior candidates.",
  },
];

const STYLE_OPTIONS: Array<{
  value: RewriteStyle;
  label: string;
  description: string;
}> = [
  {
    value: "achievement-focused",
    label: "Achievement Focused",
    description:
      "Emphasizes actions, outcomes, and measurable impact.",
  },
  {
    value: "ats-friendly",
    label: "ATS Friendly",
    description:
      "Improves clarity and naturally adds relevant job terminology.",
  },
  {
    value: "star-method",
    label: "STAR Method",
    description:
      "Uses situation, action, and result-oriented wording.",
  },
  {
    value: "concise",
    label: "Concise",
    description:
      "Creates a shorter and more direct resume bullet.",
  },
];

function normalizeKeywords(keywords: string[]): string[] {
  return [
    ...new Set(
      keywords
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    ),
  ].slice(0, 12);
}

async function copyText(
  value: string,
  successMessage: string
) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(successMessage);
  } catch (error) {
    console.error("Clipboard error:", error);
    toast.error("Unable to copy the text.");
  }
}

export default function AtsBulletRewriter({
  jobDescription = "",
  missingKeywords = [],
  defaultJobTitle = "",
  onUseRewrite,
}: AtsBulletRewriterProps) {
  const [bullet, setBullet] = useState("");
  const [jobTitle, setJobTitle] =
    useState(defaultJobTitle);

  const [tone, setTone] =
    useState<RewriteTone>("professional");

  const [style, setStyle] =
    useState<RewriteStyle>("achievement-focused");

  const [result, setResult] =
    useState<RewriteResult | null>(null);

  const [isRewriting, setIsRewriting] =
    useState(false);

  const [error, setError] = useState("");

  const safeKeywords = useMemo(
    () => normalizeKeywords(missingKeywords),
    [missingKeywords]
  );

  const canRewrite =
    bullet.trim().length >= 12 && !isRewriting;

  async function handleRewrite() {
    const cleanedBullet = bullet.trim();

    if (cleanedBullet.length < 12) {
      const message =
        "Please enter a more detailed resume bullet.";

      setError(message);

      toast.error("More detail required.", {
        description: message,
      });

      return;
    }

    setIsRewriting(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/ats-rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bullet: cleanedBullet,
          jobTitle: jobTitle.trim(),
          jobDescription: jobDescription.trim(),
          missingKeywords: safeKeywords,
          tone,
          style,
        }),
      });

      const responseText = await response.text();

      let data:
        | RewriteResult
        | {
            error?: string;
          };

      try {
        data = JSON.parse(responseText);
      } catch {
        console.error(
          "Unexpected rewrite response:",
          responseText
        );

        throw new Error(
          "The server returned an unexpected response."
        );
      }

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Unable to rewrite this resume bullet."
        );
      }

      const rewriteResult = data as RewriteResult;

      const safeResult: RewriteResult = {
        originalBullet:
          rewriteResult.originalBullet ||
          cleanedBullet,

        rewrittenBullet:
          rewriteResult.rewrittenBullet || "",

        alternatives:
          rewriteResult.alternatives || [],

        keywordsUsed:
          rewriteResult.keywordsUsed || [],

        improvementSummary:
          rewriteResult.improvementSummary || "",
      };

      if (!safeResult.rewrittenBullet) {
        throw new Error(
          "The AI did not return a usable rewrite."
        );
      }

      setResult(safeResult);

      sendGAEvent("event", "ats_bullet_rewrite", {
        tone,
        rewrite_style: style,
        keyword_count:
          safeResult.keywordsUsed.length,
        alternative_count:
          safeResult.alternatives.length,
        used_job_description:
          jobDescription.trim().length > 0,
      });

      toast.success("Resume bullet rewritten.");

      window.setTimeout(() => {
        document
          .getElementById("ats-rewrite-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);
    } catch (rewriteError) {
      const message =
        rewriteError instanceof Error
          ? rewriteError.message
          : "Unable to rewrite this resume bullet.";

      console.error(
        "ATS rewrite request error:",
        rewriteError
      );

      setError(message);

      toast.error("Rewrite failed.", {
        description: message,
      });
    } finally {
      setIsRewriting(false);
    }
  }

  function handleClear() {
    setBullet("");
    setResult(null);
    setError("");

    toast.success("Bullet rewriter cleared.");
  }

  function handleUseRewrite(
    rewrittenBullet: string
  ) {
    setBullet(rewrittenBullet);
    onUseRewrite?.(rewrittenBullet);

    sendGAEvent("event", "ats_rewrite_use", {
      tone,
      rewrite_style: style,
    });

    toast.success("Rewrite selected.");
  }

  return (
    <section
      aria-labelledby="ats-bullet-rewriter-title"
      className="overflow-hidden rounded-3xl border border-violet-500/40 bg-[#070b18] text-white shadow-2xl shadow-black/40"
    >
      <header className="border-b border-slate-700/70 bg-gradient-to-r from-[#111a33] via-[#10162a] to-[#1a1030] px-5 py-7 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
              AI Resume Rewrite
            </p>

        <h2
  id="ats-bullet-rewriter-title"
  className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
>
  Rewrite a weak resume bullet
</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Turn a duty-focused sentence into a
              stronger, clearer, and more ATS-friendly
              resume bullet. Review all generated claims
              before adding them to your resume.
            </p>
          </div>

          <span className="w-fit rounded-full border border-violet-400/50 bg-violet-500/20 px-4 py-2 text-xs font-bold text-violet-100">
            ✨ AI Powered
          </span>
        </div>
      </header>

      <div className="space-y-7 px-5 py-7 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <label
              htmlFor="rewrite-job-title"
              className="text-sm font-bold text-white"
            >
              Target job title
            </label>

            <input
              id="rewrite-job-title"
              type="text"
              value={jobTitle}
              onChange={(event) =>
                setJobTitle(event.target.value)
              }
              maxLength={120}
              placeholder="Example: Senior Software Engineer"
              className="mt-2 h-12 w-full rounded-xl border border-slate-700 bg-[#020617] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="rewrite-tone"
              className="text-sm font-bold text-white"
            >
              Rewrite tone
            </label>

            <select
              id="rewrite-tone"
              value={tone}
              onChange={(event) =>
                setTone(
                  event.target.value as RewriteTone
                )
              }
              className="mt-2 h-12 w-full rounded-xl border border-slate-700 bg-[#020617] px-4 text-sm text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
            >
              {TONE_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              {
                TONE_OPTIONS.find(
                  (option) => option.value === tone
                )?.description
              }
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-white">
            Rewrite style
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {STYLE_OPTIONS.map((option) => {
              const isSelected =
                style === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setStyle(option.value)
                  }
                  className={
                    isSelected
                      ? "rounded-2xl border border-violet-400 bg-violet-500/20 p-4 text-left ring-2 ring-violet-400/30"
                      : "rounded-2xl border border-slate-700 bg-[#020617] p-4 text-left transition hover:border-violet-500 hover:bg-slate-900"
                  }
                >
                  <p className="font-bold text-white">
                    {option.label}
                  </p>

                  <p
                    className={
                      isSelected
                        ? "mt-2 text-xs leading-5 text-violet-100"
                        : "mt-2 text-xs leading-5 text-slate-400"
                    }
                  >
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <label
                htmlFor="resume-bullet"
                className="text-sm font-bold text-white"
              >
                Original resume bullet
              </label>

              <p className="mt-1 text-xs text-slate-400">
                Paste one weak duty or achievement
                statement.
              </p>
            </div>

            <span
              className={
                bullet.trim().length >= 12
                  ? "text-xs font-bold text-emerald-300"
                  : "text-xs text-slate-500"
              }
            >
              {bullet.length}/1200
            </span>
          </div>

          <textarea
            id="resume-bullet"
            value={bullet}
            onChange={(event) => {
              setBullet(
                event.target.value.slice(0, 1200)
              );
              setError("");
            }}
            rows={5}
            placeholder="Example: Responsible for developing backend APIs and database queries."
            className="mt-3 w-full resize-y rounded-2xl border border-slate-700 bg-[#020617] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        {safeKeywords.length > 0 && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
            <p className="text-sm font-bold text-amber-200">
              Potential ATS keywords
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              Use these only when they accurately
              reflect your real experience.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {safeKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm leading-6 text-red-200"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRewrite}
            disabled={!canRewrite}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 font-bold text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {isRewriting
              ? "Rewriting with AI..."
              : "Rewrite with AI"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isRewriting}
            className="w-full rounded-xl border border-slate-700 bg-[#020617] px-6 py-3 font-bold text-slate-300 transition hover:border-slate-500 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Clear
          </button>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
          <p className="text-sm font-bold text-amber-200">
            Accuracy reminder
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Remove any technology, skill, duty,
            metric, or achievement that does not
            accurately reflect your real experience.
          </p>
        </div>

        {result && (
          <div
            id="ats-rewrite-results"
            className="scroll-mt-8 space-y-5"
          >
            <article className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-300">
                    Primary Rewrite
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-white">
                    Recommended resume bullet
                  </h3>
                </div>

                <span className="w-fit rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
                  Best Match
                </span>
              </div>

              <p className="mt-5 rounded-2xl border border-emerald-500/25 bg-[#020617] p-5 text-base leading-8 text-slate-100">
                {result.rewrittenBullet}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      result.rewrittenBullet,
                      "Rewrite copied."
                    )
                  }
                  className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-500/20"
                >
                  Copy Rewrite
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleUseRewrite(
                      result.rewrittenBullet
                    )
                  }
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  Use This Rewrite
                </button>
              </div>
            </article>

            {result.alternatives.length > 0 && (
              <article className="rounded-3xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
                <h3 className="text-xl font-bold text-white">
                  Alternative rewrites
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Choose the version that best reflects
                  your real work and experience.
                </p>

                <div className="mt-5 space-y-4">
                  {result.alternatives.map(
                    (alternative, index) => (
                      <article
                        key={`${index}-${alternative}`}
                        className="rounded-2xl border border-slate-800 bg-[#020617] p-5"
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">
                            {index + 1}
                          </span>

                          <p className="leading-7 text-slate-200">
                            {alternative}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                          <button
                            type="button"
                            onClick={() =>
                              copyText(
                                alternative,
                                "Alternative copied."
                              )
                            }
                            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-blue-500"
                          >
                            Copy
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleUseRewrite(
                                alternative
                              )
                            }
                            className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-blue-500/20"
                          >
                            Use This Version
                          </button>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </article>
            )}

            <div className="grid gap-5 lg:grid-cols-2">
              <article className="rounded-3xl border border-blue-500/35 bg-blue-500/10 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-blue-200">
                  Keywords used
                </h3>

                {result.keywordsUsed.length === 0 ? (
                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    No additional ATS keywords were
                    included.
                  </p>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.keywordsUsed.map(
                      (keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-blue-500/35 bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-200"
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                )}
              </article>

              <article className="rounded-3xl border border-violet-500/35 bg-violet-500/10 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-violet-200">
                  Why this is stronger
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {result.improvementSummary}
                </p>
              </article>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}