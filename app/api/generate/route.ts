import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GenerateRequest = {
  jobTitle?: unknown;
  experienceLevel?: unknown;
  resumeStyle?: unknown;
  responsibility?: unknown;
  achievement?: unknown;
  metric?: unknown;
};

type AtsAnalysis = {
  score: number;
  rating: string;
  strengths: string[];
  suggestions: string[];
};

const MAX_FIELD_LENGTH = 2_000;

function cleanText(
  value: unknown,
  maximumLength = MAX_FIELD_LENGTH
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, maximumLength);
}

function clampScore(score: number): number {
  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}

function parseGeneratedBullets(
  outputText: string
): string[] {
  const lines = outputText
    .replace(/```(?:json|text)?/gi, "")
    .replace(/```/g, "")
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(
          /^\s*(?:[-*•▪◦‣]|\d+[.)])\s*/,
          ""
        )
        .trim()
    )
    .filter((line) => line.length >= 20);

  const uniqueLines = lines.filter(
    (line, index, items) =>
      items.indexOf(line) === index
  );

  return uniqueLines.slice(0, 3);
}

function createAtsAnalysis(params: {
  jobTitle: string;
  responsibility: string;
  achievement: string;
  metric: string;
  bullets: string[];
}): AtsAnalysis {
  const {
    jobTitle,
    responsibility,
    achievement,
    metric,
    bullets,
  } = params;

  let score = 62;

  if (jobTitle.length >= 3) {
    score += 6;
  }

  if (responsibility.length >= 25) {
    score += 8;
  }

  if (achievement) {
    score += 8;
  }

  if (metric) {
    score += 8;
  }

  const actionVerbPattern =
    /^(achieved|administered|automated|built|coordinated|created|delivered|designed|developed|engineered|generated|implemented|improved|increased|launched|led|managed|optimized|reduced|resolved|streamlined|supervised)\b/i;

  const actionVerbCount =
    bullets.filter((bullet) =>
      actionVerbPattern.test(bullet)
    ).length;

  score += actionVerbCount * 2;
  score = clampScore(Math.min(score, 95));

  const rating =
    score >= 90
      ? "Excellent"
      : score >= 80
        ? "Strong"
        : score >= 70
          ? "Good"
          : score >= 60
            ? "Fair"
            : "Needs Improvement";

  const strengths = [
    "Uses concise, action-oriented resume language.",
    `Targets the ${jobTitle} role and stated responsibility.`,
  ];

  if (metric) {
    strengths.push(
      "Includes a measurable result supplied by the user."
    );
  } else if (achievement) {
    strengths.push(
      "Highlights a result supplied by the user."
    );
  }

  const suggestions = [
    "Tailor the final wording to the exact job description and include only truthful claims.",
  ];

  if (!achievement) {
    suggestions.push(
      "Add a specific, truthful outcome or contribution when one is available."
    );
  }

  if (!metric) {
    suggestions.push(
      "Add a verified number, percentage, time saving, volume, or quality measure when available."
    );
  }

  return {
    score,
    rating,
    strengths: strengths.slice(0, 4),
    suggestions: suggestions.slice(0, 4),
  };
}

export async function POST(
  request: Request
) {
  try {
    let body: GenerateRequest;

    try {
      body =
        (await request.json()) as GenerateRequest;
    } catch {
      return NextResponse.json(
        {
          error:
            "The request body must contain valid JSON.",
        },
        {
          status: 400,
        }
      );
    }

    const jobTitle =
      cleanText(body.jobTitle, 160);

    const experienceLevel =
      cleanText(body.experienceLevel, 80) ||
      "Mid Level";

    const resumeStyle =
      cleanText(body.resumeStyle, 80) ||
      "ATS Optimized";

    const responsibility =
      cleanText(body.responsibility);

    const achievement =
      cleanText(body.achievement, 500);

    const metric =
      cleanText(body.metric, 120);

    if (
      jobTitle.length < 2 ||
      responsibility.length < 6
    ) {
      return NextResponse.json(
        {
          error:
            "Job title and responsibility are required.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenAI API configuration is missing.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Use a dedicated non-reasoning model for this short,
     * structured writing task. Do not reuse the analytics
     * reasoning-model setting here.
     */
    const model =
      process.env.OPENAI_RESUME_MODEL?.trim() ||
      "gpt-4.1-mini";

    const openai =
      new OpenAI({
        apiKey,
      });

    const response =
      await openai.responses.create({
        model,

        instructions: `
You are the resume bullet writer for ResumeClimb AI.

Generate exactly three professional resume bullet points.

Rules:
- Use only the facts supplied by the user.
- Never invent employers, tools, skills, qualifications, achievements, numbers, percentages, revenue, team sizes, timelines, or outcomes.
- Use the achievement and metric only when they logically match the responsibility.
- If an optional achievement or metric does not logically match the responsibility, do not force it into the bullet.
- Start each bullet with a strong action verb.
- Keep each bullet concise, professional, ATS-friendly, and suitable for the requested experience level and resume style.
- Do not use first-person pronouns.
- Do not promise interviews or job offers.
- Return exactly three lines.
- Begin every line with "- ".
- Do not add headings, numbering, commentary, JSON, or code fences.
        `.trim(),

        input: `
Create resume bullets from the following information:

Job title: ${jobTitle}
Experience level: ${experienceLevel}
Resume style: ${resumeStyle}
Current responsibility: ${responsibility}
Achievement or result: ${achievement || "Not provided"}
Metric or number: ${metric || "Not provided"}
        `.trim(),

        max_output_tokens: 700,
      });

    const outputText =
      response.output_text?.trim() ?? "";

    if (!outputText) {
      console.error(
        "Empty resume generation response:",
        {
          status: response.status,
          incompleteDetails:
            response.incomplete_details,
          output: response.output,
        }
      );

      return NextResponse.json(
        {
          error:
            "The AI did not generate usable resume bullets. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    const bullets =
      parseGeneratedBullets(outputText);

    if (bullets.length !== 3) {
      console.error(
        "Invalid resume generation format:",
        outputText
      );

      return NextResponse.json(
        {
          error:
            "The AI response did not contain three valid bullets. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    const atsAnalysis =
      createAtsAnalysis({
        jobTitle,
        responsibility,
        achievement,
        metric,
        bullets,
      });

    return NextResponse.json(
      {
        bullets,
        atsAnalysis,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Resume bullet generation error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate resume bullets.";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV ===
          "development"
            ? message
            : "Unable to generate resume bullets right now. Please try again.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  }
}
