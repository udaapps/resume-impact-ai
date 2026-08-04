import {
  createHash,
} from "node:crypto";

import OpenAI from "openai";
import {
  NextResponse,
} from "next/server";

import {
  createAdminClient,
} from "@/lib/supabase/admin";

import {
  createClient as createServerClient,
} from "@/lib/supabase/server";

import {
  createApiRequestId,
  errorJson,
  logApiError,
} from "@/lib/server/apiLogger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TABLE_NAME =
  "analytics_ai_summaries";

const DAILY_LIMIT = 5;

const CACHE_VERSION =
  "analytics-v1";

type MetricSummary = {
  label: string;
  average: number;
};

type MissingKeywordTrend = {
  keyword: string;
  count: number;
};

type AnalyticsInsightsRequest = {
  analysisCount: number;

  latestScore: number;
  previousScore: number;

  changeFromPrevious: number;
  changeFromFirst: number;

  trend:
    | "improving"
    | "declining"
    | "stable"
    | "baseline";

  consistency:
    | "high"
    | "moderate"
    | "low";

  recentActivityCount: number;

  strongestMetric:
    | MetricSummary
    | null;

  weakestMetric:
    | MetricSummary
    | null;

  topMissingKeywords:
    MissingKeywordTrend[];

  existingInsights: string[];
};

type CleanAnalyticsPayload = {
  analysisCount: number;
  latestScore: number;
  previousScore: number;
  changeFromPrevious: number;
  changeFromFirst: number;
  trend: string;
  consistency: string;
  recentActivityCount: number;
  strongestMetric:
    | MetricSummary
    | null;
  weakestMetric:
    | MetricSummary
    | null;
  topMissingKeywords:
    MissingKeywordTrend[];
  existingInsights: string[];
};

type CachedSummaryRow = {
  id: string;
  summary: string;
  generated_at: string;
  model: string;
  usage_day: string;
  analysis_count: number;
  latest_score: number;
  deleted_at: string | null;
};

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : fallback;
}

function clampScore(
  value: unknown
): number {
  return Math.max(
    0,
    Math.min(
      100,
      Math.round(
        safeNumber(value)
      )
    )
  );
}

function safeText(
  value: unknown,
  maximumLength = 120
): string {
  return typeof value === "string"
    ? value
        .trim()
        .slice(0, maximumLength)
    : "";
}

function cleanMetric(
  value: unknown
): MetricSummary | null {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }

  const metric =
    value as Record<
      string,
      unknown
    >;

  const label =
    safeText(
      metric.label,
      80
    );

  if (!label) {
    return null;
  }

  return {
    label,

    average:
      clampScore(
        metric.average
      ),
  };
}

function cleanMissingKeywords(
  value: unknown
): MissingKeywordTrend[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (
        !item ||
        typeof item !== "object"
      ) {
        return null;
      }

      const keywordItem =
        item as Record<
          string,
          unknown
        >;

      const keyword =
        safeText(
          keywordItem.keyword,
          60
        );

      if (!keyword) {
        return null;
      }

      return {
        keyword,

        count: Math.max(
          0,
          Math.round(
            safeNumber(
              keywordItem.count
            )
          )
        ),
      };
    })
    .filter(
      (
        item
      ): item is MissingKeywordTrend =>
        item !== null
    )
    .slice(0, 5);
}

function cleanExistingInsights(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) =>
      safeText(item, 220)
    )
    .filter(Boolean)
    .slice(0, 5);
}

function cleanAnalyticsPayload(
  body:
    Partial<AnalyticsInsightsRequest>
): CleanAnalyticsPayload {
  return {
    analysisCount:
      Math.max(
        0,
        Math.round(
          safeNumber(
            body.analysisCount
          )
        )
      ),

    latestScore:
      clampScore(
        body.latestScore
      ),

    previousScore:
      clampScore(
        body.previousScore
      ),

    changeFromPrevious:
      Math.round(
        safeNumber(
          body.changeFromPrevious
        )
      ),

    changeFromFirst:
      Math.round(
        safeNumber(
          body.changeFromFirst
        )
      ),

    trend:
      safeText(
        body.trend,
        20
      ) || "baseline",

    consistency:
      safeText(
        body.consistency,
        20
      ) || "high",

    recentActivityCount:
      Math.max(
        0,
        Math.round(
          safeNumber(
            body.recentActivityCount
          )
        )
      ),

    strongestMetric:
      cleanMetric(
        body.strongestMetric
      ),

    weakestMetric:
      cleanMetric(
        body.weakestMetric
      ),

    topMissingKeywords:
      cleanMissingKeywords(
        body.topMissingKeywords
      ),

    existingInsights:
      cleanExistingInsights(
        body.existingInsights
      ),
  };
}

function createCacheKey(
  payload: object,
  model: string
): string {
  return createHash("sha256")
    .update(
      JSON.stringify({
        version: CACHE_VERSION,
        model,
        payload,
      })
    )
    .digest("hex");
}

function getUtcUsageDay(): string {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

function getNextUtcReset(): string {
  const now = new Date();

  return new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1
    )
  ).toISOString();
}

function createUsageInfo(
  used: number
) {
  return {
    limit: DAILY_LIMIT,

    used,

    remaining: Math.max(
      0,
      DAILY_LIMIT - used
    ),

    resetsAt:
      getNextUtcReset(),
  };
}

function getAnalyticsModel(): string {
  return (
    process.env
      .OPENAI_ANALYTICS_MODEL
      ?.trim() ||
    "gpt-5-mini"
  );
}

async function getDailyUsage(
  admin:
    ReturnType<
      typeof createAdminClient
    >,
  userId: string,
  usageDay: string
): Promise<number> {
  const {
    count,
    error,
  } = await admin
    .from(TABLE_NAME)
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .eq("usage_day", usageDay);

  if (error) {
    throw new Error(
      error.message ||
        "Unable to check AI usage."
    );
  }

  return count ?? 0;
}

async function loadCachedSummary(
  admin:
    ReturnType<
      typeof createAdminClient
    >,
  userId: string,
  cacheKey: string
): Promise<
  CachedSummaryRow | null
> {
  const {
    data,
    error,
  } = await admin
    .from(TABLE_NAME)
    .select(
      `
        id,
        summary,
        generated_at,
        model,
        usage_day,
        analysis_count,
        latest_score,
        deleted_at
      `
    )
    .eq("user_id", userId)
    .eq("cache_key", cacheKey)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    throw new Error(
      error.message ||
        "Unable to load the cached AI summary."
    );
  }

  return data
    ? (data as CachedSummaryRow)
    : null;
}

async function restoreDeletedCachedSummary(
  admin:
    ReturnType<
      typeof createAdminClient
    >,
  userId: string,
  cacheKey: string
): Promise<
  CachedSummaryRow | null
> {
  const {
    data: deletedRow,
    error: lookupError,
  } = await admin
    .from(TABLE_NAME)
    .select(
      `
        id,
        summary,
        generated_at,
        model,
        usage_day,
        analysis_count,
        latest_score,
        deleted_at
      `
    )
    .eq("user_id", userId)
    .eq("cache_key", cacheKey)
    .not("deleted_at", "is", null)
    .maybeSingle();

  if (lookupError) {
    throw new Error(
      lookupError.message ||
        "Unable to check the deleted AI summary cache."
    );
  }

  if (!deletedRow) {
    return null;
  }

  const {
    data: restoredRow,
    error: restoreError,
  } = await admin
    .from(TABLE_NAME)
    .update({
      deleted_at: null,
    })
    .eq("id", deletedRow.id)
    .eq("user_id", userId)
    .select(
      `
        id,
        summary,
        generated_at,
        model,
        usage_day,
        analysis_count,
        latest_score,
        deleted_at
      `
    )
    .single();

  if (restoreError) {
    throw new Error(
      restoreError.message ||
        "Unable to restore the cached AI summary."
    );
  }

  return restoredRow as CachedSummaryRow;
}

async function loadLatestSummary(
  admin:
    ReturnType<
      typeof createAdminClient
    >,
  userId: string
): Promise<
  CachedSummaryRow | null
> {
  const {
    data,
    error,
  } = await admin
    .from(TABLE_NAME)
    .select(
      `
        id,
        summary,
        generated_at,
        model,
        usage_day,
        analysis_count,
        latest_score,
        deleted_at
      `
    )
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("generated_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      error.message ||
        "Unable to load the latest AI summary."
    );
  }

  return data
    ? (data as CachedSummaryRow)
    : null;
}

async function getSignedInUserId(): Promise<
  string | null
> {
  const supabase =
    await createServerClient();

  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

function unauthorizedResponse(
  message: string
) {
  return NextResponse.json(
    {
      error: message,
    },
    {
      status: 401,
    }
  );
}

export async function GET(
  request: Request
) {
  const requestId =
    createApiRequestId(request);

  let userId: string | null =
    null;

  try {
    userId =
      await getSignedInUserId();

    if (!userId) {
      return unauthorizedResponse(
        "You must be signed in to view AI analytics insights."
      );
    }

    const admin =
      createAdminClient();

    const usageDay =
      getUtcUsageDay();

    const [
      latestSummary,
      dailyUsed,
    ] = await Promise.all([
      loadLatestSummary(
        admin,
        userId
      ),
      getDailyUsage(
        admin,
        userId,
        usageDay
      ),
    ]);

    return NextResponse.json({
      summary:
        latestSummary?.summary ??
        null,

      source: "cache",

      cached:
        latestSummary !== null,

      stale: false,

      generatedAt:
        latestSummary
          ?.generated_at ?? null,

      analysisCount:
        latestSummary
          ?.analysis_count ?? null,

      latestScore:
        latestSummary
          ?.latest_score ?? null,

      usage:
        createUsageInfo(
          dailyUsed
        ),
    });
  } catch (error) {
    logApiError({
      route:
        "/api/analytics-insights",
      method: "GET",
      requestId,
      userId,
      statusCode: 500,
      error,
    });

    return errorJson({
      message:
        "Unable to load AI analytics status.",
      code:
        "ANALYTICS_STATUS_FAILED",
      status: 500,
      requestId,
    });
  }
}

/*
 * PUT checks whether the latest saved
 * summary matches the current analytics
 * payload. It never calls OpenAI.
 */
export async function PUT(
  request: Request
) {
  const requestId =
    createApiRequestId(request);

  let userId: string | null =
    null;

  try {
    userId =
      await getSignedInUserId();

    if (!userId) {
      return unauthorizedResponse(
        "You must be signed in to view AI analytics insights."
      );
    }

    const body =
      (await request.json()) as
        Partial<AnalyticsInsightsRequest>;

    const payload =
      cleanAnalyticsPayload(body);

    if (payload.analysisCount < 1) {
      return NextResponse.json(
        {
          error:
            "At least one resume analysis is required.",
        },
        {
          status: 400,
        }
      );
    }

    const model =
      getAnalyticsModel();

    const cacheKey =
      createCacheKey(
        payload,
        model
      );

    const admin =
      createAdminClient();

    const usageDay =
      getUtcUsageDay();

    const [
      matchingSummary,
      latestSummary,
      dailyUsed,
    ] = await Promise.all([
      loadCachedSummary(
        admin,
        userId,
        cacheKey
      ),
      loadLatestSummary(
        admin,
        userId
      ),
      getDailyUsage(
        admin,
        userId,
        usageDay
      ),
    ]);

    const summaryToShow =
      matchingSummary ??
      latestSummary;

    return NextResponse.json({
      summary:
        summaryToShow?.summary ??
        null,

      source: "cache",

      cached:
        summaryToShow !== null,

      stale:
        summaryToShow !== null &&
        matchingSummary === null,

      generatedAt:
        summaryToShow
          ?.generated_at ?? null,

      analysisCount:
        summaryToShow
          ?.analysis_count ?? null,

      latestScore:
        summaryToShow
          ?.latest_score ?? null,

      usage:
        createUsageInfo(
          dailyUsed
        ),
    });
  } catch (error) {
    logApiError({
      route:
        "/api/analytics-insights",
      method: "PUT",
      requestId,
      userId,
      statusCode: 500,
      error,
    });

    return errorJson({
      message:
        "Unable to check the AI analytics summary.",
      code:
        "ANALYTICS_CACHE_CHECK_FAILED",
      status: 500,
      requestId,
    });
  }
}

export async function POST(
  request: Request
) {
  const requestId =
    createApiRequestId(request);

  let userId: string | null =
    null;

  try {
    userId =
      await getSignedInUserId();

    if (!userId) {
      return unauthorizedResponse(
        "You must be signed in to generate AI analytics insights."
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

    const body =
      (await request.json()) as
        Partial<AnalyticsInsightsRequest>;

    const payload =
      cleanAnalyticsPayload(body);

    if (payload.analysisCount < 1) {
      return NextResponse.json(
        {
          error:
            "At least one resume analysis is required.",
        },
        {
          status: 400,
        }
      );
    }

    const model =
      getAnalyticsModel();

    const cacheKey =
      createCacheKey(
        payload,
        model
      );

    const usageDay =
      getUtcUsageDay();

    const admin =
      createAdminClient();

    const cachedSummary =
      await loadCachedSummary(
        admin,
        userId,
        cacheKey
      );

    const restoredSummary =
      cachedSummary
        ? null
        : await restoreDeletedCachedSummary(
            admin,
            userId,
            cacheKey
          );

    const availableSummary =
      cachedSummary ??
      restoredSummary;

    const dailyUsed =
      await getDailyUsage(
        admin,
        userId,
        usageDay
      );

    if (availableSummary) {
      return NextResponse.json({
        summary:
          availableSummary.summary,

        source: "cache",
        cached: true,
        stale: false,

        generatedAt:
          availableSummary.generated_at,

        usage:
          createUsageInfo(
            dailyUsed
          ),
      });
    }

    if (
      dailyUsed >= DAILY_LIMIT
    ) {
      return NextResponse.json(
        {
          error:
            `You have used all ${DAILY_LIMIT} AI analytics summaries for today.`,

          code:
            "DAILY_LIMIT_REACHED",

          usage:
            createUsageInfo(
              dailyUsed
            ),
        },
        {
          status: 429,
        }
      );
    }

    const openai =
      new OpenAI({
        apiKey,
      });

    const response =
      await openai.responses.create({
        model,

        reasoning: {
          effort: "low",
        },

        instructions: `
You are the analytics coach for ResumeClimb AI.

Analyze only the aggregated ATS resume statistics supplied by the application.

Rules:
- Never invent work experience, skills, qualifications, achievements, metrics, or personal facts.
- Do not claim that an ATS score guarantees an interview or job.
- Treat keyword suggestions as optional and truthful only.
- Focus on practical, high-impact resume improvements.
- Keep the response under 180 words.
- Use clear professional English.

Return plain text using exactly these headings:

Executive Summary
Top Priorities
Next Analysis Goal
Truthfulness Note

Under Top Priorities, provide exactly three numbered actions.
        `.trim(),

        input: `
Analyze this resume analytics data:

${JSON.stringify(
  payload,
  null,
  2
)}
        `.trim(),

        max_output_tokens: 1200,
      });

    const summary =
      response.output_text
        ?.trim() ?? "";

    if (!summary) {
      logApiError({
        route:
          "/api/analytics-insights",
        method: "POST",
        requestId,
        userId,
        statusCode: 502,
        error: new Error(
          "OpenAI returned an empty analytics summary."
        ),
        metadata: {
          providerStatus:
            response.status,
          incompleteReason:
            response
              .incomplete_details
              ?.reason ?? null,
        },
      });

      if (
        response.status ===
        "incomplete"
      ) {
        throw new Error(
          "The AI response stopped before generating the summary. Please try again."
        );
      }

      throw new Error(
        "The AI did not generate a usable analytics summary."
      );
    }

    const generatedAt =
      new Date().toISOString();

    const {
      error: insertError,
    } = await admin
      .from(TABLE_NAME)
      .insert({
        user_id:
          userId,

        cache_key:
          cacheKey,

        cache_version:
          CACHE_VERSION,

        summary,

        model,

        analysis_count:
          payload.analysisCount,

        latest_score:
          payload.latestScore,

        usage_day:
          usageDay,

        generated_at:
          generatedAt,

        deleted_at: null,
      });

    if (
      insertError &&
      insertError.code !== "23505"
    ) {
      throw new Error(
        insertError.message ||
          "Unable to save the AI summary cache."
      );
    }

    if (
      insertError?.code === "23505"
    ) {
      const existingSummary =
        await loadCachedSummary(
          admin,
          userId,
          cacheKey
        );

      if (existingSummary) {
        const refreshedUsage =
          await getDailyUsage(
            admin,
            userId,
            usageDay
          );

        return NextResponse.json({
          summary:
            existingSummary.summary,

          source: "cache",
          cached: true,
          stale: false,

          generatedAt:
            existingSummary
              .generated_at,

          usage:
            createUsageInfo(
              refreshedUsage
            ),
        });
      }
    }

    const updatedDailyUsed =
      await getDailyUsage(
        admin,
        userId,
        usageDay
      );

    return NextResponse.json({
      summary,

      source: "ai",
      cached: false,
      stale: false,

      generatedAt,

      usage:
        createUsageInfo(
          updatedDailyUsed
        ),
    });
  } catch (error) {
    logApiError({
      route:
        "/api/analytics-insights",
      method: "POST",
      requestId,
      userId,
      statusCode: 500,
      error,
    });

    return errorJson({
      message:
        "Unable to generate AI analytics insights. Please try again.",
      code:
        "ANALYTICS_GENERATION_FAILED",
      status: 500,
      requestId,
    });
  }
}
