"use client";

import { sendGAEvent } from "@next/third-parties/google";

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
}

const FIVERR_GIG_URL = "https://www.fiverr.com/s/Lda2G6p";

type HumanAtsReviewCtaProps = {
  className?: string;
  source?: string;
};

export default function HumanAtsReviewCta({
  className = "",
  source = "website",
}: HumanAtsReviewCtaProps) {
  function handleFiverrClick() {
    const eventParameters = {
      source,
      offer: "ats_resume_quick_fix",
      value: 15,
      currency: "USD",
      destination: "fiverr",
    };

    if (typeof window.gtag === "function") {
      window.gtag("event", "fiverr_cta_click", eventParameters);
      return;
    }

    sendGAEvent("event", "fiverr_cta_click", eventParameters);
  }

  return (
    <section
      aria-labelledby={`human-ats-review-${source}`}
      className={`border-y border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-slate-950 to-violet-600/10 px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/30 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <div className="p-6 sm:p-9 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Human Resume Service
            </p>

            <h2
              id={`human-ats-review-${source}`}
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Need a Human ATS Resume Review?
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Use the free tools for a quick check, or get a focused
              human-reviewed improvement package for one target job
              application.
            </p>

            <ul className="mt-7 grid gap-3 text-sm text-slate-200 sm:grid-cols-2 sm:text-base">
              {[
                "ATS-focused resume review",
                "Missing keyword recommendations",
                "10 improved bullet points",
                "PDF action report",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-300"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Recommendations are based on the resume and job description you
              provide. No false experience, skills, or achievements are added.
            </p>
          </div>

          <div className="flex flex-col justify-center border-t border-slate-800 bg-slate-950/70 p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
              Launch Price
            </p>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-bold text-white">$15</span>
              <span className="pb-1 text-sm text-slate-400">
                Basic package
              </span>
            </div>

            <a
              href={FIVERR_GIG_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFiverrClick}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Get My ATS Resume Quick Fix
              <span aria-hidden="true">↗</span>
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Secure order, communication, and payment through Fiverr.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
