"use client";

import { useEffect, useMemo, useState } from "react";
import { exportResumeDocx } from "@/lib/exportDocx";
import { exportResumePdf } from "@/lib/exportPdf";

type GeneratedBullet = {
  id: number;
  text: string;
};

type HistoryItem = {
  id: string;
  createdAt: string;
  jobTitle: string;
  bullets: GeneratedBullet[];
  atsAnalysis: AtsAnalysis | null;
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

const initialForm: FormState = {
  jobTitle: "",
  experienceLevel: "Mid Level",
  resumeStyle: "ATS Optimized",
  responsibility: "",
  achievement: "",
  metric: "",
};

type DailyUsage = {
  date: string;
  count: number;
};

const DAILY_FREE_LIMIT = 5;
const USAGE_STORAGE_KEY = "resume-impact-ai-daily-usage";
const HISTORY_STORAGE_KEY = "resume-impact-ai-history";
function getLocalDateKey() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Home() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [bullets, setBullets] = useState<GeneratedBullet[]>([]);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [usageLoaded, setUsageLoaded] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
const [atsAnalysis, setAtsAnalysis] =
  useState<AtsAnalysis | null>(null);
  const canGenerate = useMemo(() => {
    return (
      form.jobTitle.trim().length > 1 &&
      form.responsibility.trim().length > 5
    );
  }, [form.jobTitle, form.responsibility]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }
useEffect(() => {
  const today = getLocalDateKey();
  const savedUsage = window.localStorage.getItem(
    USAGE_STORAGE_KEY
  );

  if (!savedUsage) {
    setUsageCount(0);
    setUsageLoaded(true);
    return;
  }

  try {
    const parsedUsage = JSON.parse(
      savedUsage
    ) as DailyUsage;

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
    window.localStorage.removeItem(
      USAGE_STORAGE_KEY
    );
    setUsageCount(0);
  } finally {
    setUsageLoaded(true);
  }
}, []);

useEffect(() => {
  const savedHistory =
    window.localStorage.getItem(
      HISTORY_STORAGE_KEY
    );

  if (!savedHistory) {
    return;
  }

  try {
    const parsedHistory = JSON.parse(
      savedHistory
    ) as HistoryItem[];

    setHistory(parsedHistory);
  } catch {
    window.localStorage.removeItem(
      HISTORY_STORAGE_KEY
    );
    setHistory([]);
  }
}, []);
const remainingGenerations = Math.max(
  DAILY_FREE_LIMIT - usageCount,
  0
);

const dailyLimitReached =
  usageLoaded && usageCount >= DAILY_FREE_LIMIT;

async function handleGenerate() {
  if (!usageLoaded) {
    setError("Please wait while your daily usage is checked.");
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
      console.error("Non-JSON server response:", responseText);

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

    const generatedBullets: GeneratedBullet[] = data.bullets.map(
      (text, index) => ({
        id: index + 1,
        text,
      })
    );

    setBullets(generatedBullets);
    if (data.atsAnalysis) {
    setAtsAnalysis(data.atsAnalysis);
}
const newHistory: HistoryItem = {
  id: crypto.randomUUID(),
  createdAt: new Date().toLocaleString(),
  jobTitle: form.jobTitle,
  bullets: generatedBullets,
  atsAnalysis: data.atsAnalysis ?? null,
};

const updatedHistory = [newHistory, ...history].slice(0, 20);

setHistory(updatedHistory);

localStorage.setItem(
  HISTORY_STORAGE_KEY,
  JSON.stringify(updatedHistory)
);

    const newUsageCount = usageCount + 1;

    setUsageCount(newUsageCount);

    window.localStorage.setItem(
      USAGE_STORAGE_KEY,
      JSON.stringify({
        date: getLocalDateKey(),
        count: newUsageCount,
      })
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate resume bullets.";

    setError(message);
  } finally {
    setIsGenerating(false);
  }
}

async function handleCopy(bullet: GeneratedBullet) {
    try {
      await navigator.clipboard.writeText(bullet.text);
      setCopiedId(bullet.id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      setError("Copy failed. Please select the text and copy it manually.");
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
      (bullet, index) => `${index + 1}. ${bullet.text}`
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
}

  function handleClear() {
  setForm(initialForm);
  setBullets([]);
  setAtsAnalysis(null);
  setError("");
  setCopiedId(null);
  setAllCopied(false);
}
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#" className="text-xl font-bold tracking-tight">
            Resume Impact AI
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#generator" className="transition hover:text-white">
              Generator
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </div>

          <a
            href="#generator"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Try Free
          </a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-start gap-14 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div className="pt-4 lg:sticky lg:top-28">
          <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            Free AI Resume Bullet Generator
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Write powerful resume bullets in seconds
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Turn ordinary job duties into professional, achievement-focused and
            ATS-friendly resume bullet points using strong action verbs and
            measurable results.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#generator"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-500"
            >
              Generate Resume Bullets
            </a>

            <a
              href="#features"
              className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              See Features
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-slate-400">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-2xl font-bold text-white">3</div>
              Bullets per generation
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-2xl font-bold text-white">5</div>
              Free uses daily
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-2xl font-bold text-white">ATS</div>
              Friendly wording
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section
            id="generator"
            className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-blue-950/30 sm:p-8"
          >
            <div className="mb-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Generator
              </p>
              <h2 className="mt-2 text-3xl font-bold">
                Create stronger resume achievements
              </h2>
              <p className="mt-3 text-slate-400">
                Job title and responsibility are required. Achievement and
                metric are optional but improve the result.
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
                    updateField("jobTitle", event.target.value)
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
      onChange={(e) =>
        updateField("experienceLevel", e.target.value)
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
      onChange={(e) =>
        updateField("resumeStyle", e.target.value)
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
                    updateField("responsibility", event.target.value)
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
                    updateField("achievement", event.target.value)
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
                    updateField("metric", event.target.value)
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

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGenerate}
        disabled={
  isGenerating ||
  !usageLoaded ||
  dailyLimitReached}
                  className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >{isGenerating
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
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm">
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
          </section>

          {(isGenerating || bullets.length > 0) && (
            <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    Results
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Your improved resume bullets
                  </h2>
                </div>

             {bullets.length > 0 && (
  <div className="flex flex-wrap items-center gap-3">
    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
      Ready
    </span>

    <button
      type="button"
      onClick={handleCopyAll}
      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
    >
      {allCopied ? "All Copied!" : "Copy All"}
    </button>

    <button
      type="button"
      onClick={handleDownloadTxt}
      className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-blue-500 hover:bg-slate-700"
    >
      Download TXT
    </button>
  </div>
)}
<button
  type="button"
  onClick={() =>
    exportResumeDocx(bullets, atsAnalysis)
  }
  className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
>
  Download DOCX
</button>
<button
  type="button"
  onClick={() => exportResumePdf(bullets, atsAnalysis)}
  className="rounded-lg border border-rose-600 bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
>
  Download PDF
</button>
              </div>
{atsAnalysis && (
  <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
          ATS Analysis
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
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
          {atsAnalysis.strengths.map((item, index) => (
            <li key={index}>✓ {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-amber-300">
          Suggestions
        </h4>

        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
          {atsAnalysis.suggestions.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
{history.length > 0 && (
  <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-white">
        Recent History
      </h3>

      <span className="text-sm text-slate-400">
        {history.length} Saved
      </span>
    </div>

    <div className="mt-5 space-y-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-800 bg-slate-900 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-white">
                {item.jobTitle}
              </h4>

              <p className="text-xs text-slate-500">
                {item.createdAt}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setBullets(item.bullets);
                setAtsAnalysis(item.atsAnalysis);
              }}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Restore
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
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
                          <p className="leading-7 text-slate-200">
                            {bullet.text}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleCopy(bullet)}
                            className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
                          >
                            {copiedId === bullet.id ? "Copied!" : "Copy bullet"}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {bullets.length > 0 && (
                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Review every generated statement and keep only claims that
                  accurately reflect your real experience.
                </p>
              )}
            </section>
          )}
        </div>
      </section>

      <section
        id="features"
        className="border-t border-slate-900 bg-slate-950 px-6 py-24 lg:px-8"
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

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">⚡</div>
              <h3 className="text-xl font-semibold">Live generation</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Enter your details and instantly receive three improved resume
                bullet options.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">🎯</div>
              <h3 className="text-xl font-semibold">Achievement focused</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Present duties using stronger wording, measurable outcomes and
                professional impact.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-4 text-3xl">📋</div>
              <h3 className="text-xl font-semibold">One-click copy</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Copy each generated bullet and paste it directly into your
                resume editor.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-t border-slate-900 px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold text-blue-400">Simple pricing</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Start free and upgrade later
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-left">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="mt-4 text-4xl font-bold">$0</p>
              <p className="mt-2 text-slate-400">For occasional job seekers</p>

              <ul className="mt-8 space-y-4 text-slate-300">
                <li>✓ 5 generations per day</li>
                <li>✓ 3 bullets per generation</li>
                <li>✓ Copy generated results</li>
                <li>✓ Basic ATS-friendly wording</li>
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

      <footer className="border-t border-slate-900 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 Resume Impact AI. Built by UDA Apps.
      </footer>
    </main>
  );
}
