import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import {
  createApiRequestId,
  errorJson,
  logApiError,
} from "@/lib/server/apiLogger";

export const runtime = "nodejs";

const TABLE_NAME = "analytics_ai_summaries";
const DEFAULT_PAGE_SIZE = 5;
const MAX_PAGE_SIZE = 20;
const MAX_SEARCH_LENGTH = 120;
const MAX_CSV_ROWS = 5000;
const CSV_BATCH_SIZE = 1000;

type HistorySort =
  | "newest"
  | "oldest"
  | "score_desc"
  | "score_asc";

type SummaryHistoryRow = {
  id: string;
  summary: string;
  generated_at: string;
  model: string;
  analysis_count: number;
  latest_score: number;
  usage_day: string;
};

async function getSignedInUserId(): Promise<string | null> {
  const supabase = await createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

function parsePositiveInteger(
  value: string | null,
  fallback: number,
  maximum?: number
): number {
  const parsed = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return maximum ? Math.min(parsed, maximum) : parsed;
}

function parseSort(value: string | null): HistorySort {
  if (
    value === "oldest" ||
    value === "score_desc" ||
    value === "score_asc"
  ) {
    return value;
  }

  return "newest";
}

function isDateOnly(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(
      new Date(`${value}T00:00:00.000Z`).getTime()
    )
  );
}

function nextUtcDate(dateOnly: string): string {
  const date = new Date(`${dateOnly}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString();
}

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

function protectCsvFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

function csvCell(value: string | number): string {
  const safeValue = protectCsvFormula(String(value));
  return `"${safeValue.replace(/"/g, '""')}"`;
}

function createCsv(rows: SummaryHistoryRow[]): string {
  const header = [
    "Generated At",
    "Latest Score",
    "Analysis Count",
    "Model",
    "Summary",
  ]
    .map(csvCell)
    .join(",");

  const lines = rows.map((row) =>
    [
      row.generated_at,
      row.latest_score,
      row.analysis_count,
      row.model,
      row.summary,
    ]
      .map(csvCell)
      .join(",")
  );

  return `\uFEFF${[header, ...lines].join("\r\n")}`;
}

function mapHistoryItems(rows: SummaryHistoryRow[]) {
  return rows.map((row) => ({
    id: row.id,
    summary: row.summary,
    generatedAt: row.generated_at,
    model: row.model,
    analysisCount: row.analysis_count,
    latestScore: row.latest_score,
    usageDay: row.usage_day,
  }));
}

export async function GET(request: Request) {
  const requestId = createApiRequestId(request);
  let userId: string | null = null;

  try {
    userId = await getSignedInUserId();

    if (!userId) {
      return NextResponse.json(
        {
          error: "You must be signed in to view AI summary history.",
        },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const page = parsePositiveInteger(url.searchParams.get("page"), 1);
    const pageSize = parsePositiveInteger(
      url.searchParams.get("pageSize"),
      DEFAULT_PAGE_SIZE,
      MAX_PAGE_SIZE
    );
    const search = (url.searchParams.get("search") ?? "")
      .trim()
      .slice(0, MAX_SEARCH_LENGTH);
    const fromDate = (url.searchParams.get("from") ?? "").trim();
    const toDate = (url.searchParams.get("to") ?? "").trim();
    const sort = parseSort(url.searchParams.get("sort"));
    const exportCsv = url.searchParams.get("export") === "csv";

    if (fromDate && !isDateOnly(fromDate)) {
      return NextResponse.json(
        { error: "The history start date is invalid." },
        { status: 400 }
      );
    }

    if (toDate && !isDateOnly(toDate)) {
      return NextResponse.json(
        { error: "The history end date is invalid." },
        { status: 400 }
      );
    }

    if (fromDate && toDate && fromDate > toDate) {
      return NextResponse.json(
        { error: "The start date cannot be after the end date." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { count: allTotalCount, error: allTotalError } = await admin
      .from(TABLE_NAME)
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (allTotalError) {
      throw new Error(
        allTotalError.message || "Unable to count AI summary history."
      );
    }

    if (exportCsv) {
      let countQuery = admin
        .from(TABLE_NAME)
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("user_id", userId)
        .is("deleted_at", null);

      if (search) {
        countQuery = countQuery.ilike(
          "summary",
          `%${escapeLikePattern(search)}%`
        );
      }

      if (fromDate) {
        countQuery = countQuery.gte(
          "generated_at",
          `${fromDate}T00:00:00.000Z`
        );
      }

      if (toDate) {
        countQuery = countQuery.lt("generated_at", nextUtcDate(toDate));
      }

      const { count: filteredCount, error: filteredCountError } =
        await countQuery;

      if (filteredCountError) {
        throw new Error(
          filteredCountError.message ||
            "Unable to count filtered AI summary history."
        );
      }

      const totalToExport = filteredCount ?? 0;

      if (totalToExport > MAX_CSV_ROWS) {
        return NextResponse.json(
          {
            error: `CSV export supports up to ${MAX_CSV_ROWS} matching summaries. Narrow the date range or search first.`,
          },
          { status: 400 }
        );
      }

      const rows: SummaryHistoryRow[] = [];

      for (
        let rangeStart = 0;
        rangeStart < totalToExport;
        rangeStart += CSV_BATCH_SIZE
      ) {
        const rangeEnd = Math.min(
          rangeStart + CSV_BATCH_SIZE - 1,
          totalToExport - 1
        );

        let exportQuery = admin
          .from(TABLE_NAME)
          .select(
            `
              id,
              summary,
              generated_at,
              model,
              analysis_count,
              latest_score,
              usage_day
            `
          )
          .eq("user_id", userId)
          .is("deleted_at", null);

        if (search) {
          exportQuery = exportQuery.ilike(
            "summary",
            `%${escapeLikePattern(search)}%`
          );
        }

        if (fromDate) {
          exportQuery = exportQuery.gte(
            "generated_at",
            `${fromDate}T00:00:00.000Z`
          );
        }

        if (toDate) {
          exportQuery = exportQuery.lt(
            "generated_at",
            nextUtcDate(toDate)
          );
        }

        if (sort === "oldest") {
          exportQuery = exportQuery.order("generated_at", {
            ascending: true,
          });
        } else if (sort === "score_desc") {
          exportQuery = exportQuery
            .order("latest_score", { ascending: false })
            .order("generated_at", { ascending: false });
        } else if (sort === "score_asc") {
          exportQuery = exportQuery
            .order("latest_score", { ascending: true })
            .order("generated_at", { ascending: false });
        } else {
          exportQuery = exportQuery.order("generated_at", {
            ascending: false,
          });
        }

        const { data, error } = await exportQuery.range(
          rangeStart,
          rangeEnd
        );

        if (error) {
          throw new Error(
            error.message || "Unable to export AI summary history."
          );
        }

        rows.push(...((data ?? []) as SummaryHistoryRow[]));
      }

      const today = new Date().toISOString().slice(0, 10);
      const csv = createCsv(rows);

      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="resume-impact-ai-summary-history-${today}.csv"`,
          "Cache-Control": "no-store",
        },
      });
    }

    const rangeStart = (page - 1) * pageSize;
    const rangeEnd = rangeStart + pageSize - 1;

    let query = admin
      .from(TABLE_NAME)
      .select(
        `
          id,
          summary,
          generated_at,
          model,
          analysis_count,
          latest_score,
          usage_day
        `,
        { count: "exact" }
      )
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (search) {
      query = query.ilike(
        "summary",
        `%${escapeLikePattern(search)}%`
      );
    }

    if (fromDate) {
      query = query.gte(
        "generated_at",
        `${fromDate}T00:00:00.000Z`
      );
    }

    if (toDate) {
      query = query.lt("generated_at", nextUtcDate(toDate));
    }

    if (sort === "oldest") {
      query = query.order("generated_at", { ascending: true });
    } else if (sort === "score_desc") {
      query = query
        .order("latest_score", { ascending: false })
        .order("generated_at", { ascending: false });
    } else if (sort === "score_asc") {
      query = query
        .order("latest_score", { ascending: true })
        .order("generated_at", { ascending: false });
    } else {
      query = query.order("generated_at", { ascending: false });
    }

    const { data, error, count } = await query.range(
      rangeStart,
      rangeEnd
    );

    if (error) {
      throw new Error(
        error.message || "Unable to load AI summary history."
      );
    }

    const total = count ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return NextResponse.json({
      items: mapHistoryItems((data ?? []) as SummaryHistoryRow[]),
      allTotal: allTotalCount ?? 0,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
      filters: {
        search,
        fromDate: fromDate || null,
        toDate: toDate || null,
        sort,
      },
    });
  } catch (error) {
    logApiError({
      route: "/api/analytics-insights/history",
      method: "GET",
      requestId,
      userId,
      statusCode: 500,
      error,
    });

    return errorJson({
      message: "Unable to load AI summary history.",
      code: "ANALYTICS_HISTORY_LOAD_FAILED",
      status: 500,
      requestId,
    });
  }
}

type DeleteHistoryRequest = {
  id?: string;
  clearAll?: boolean;
};

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export async function DELETE(request: Request) {
  const requestId = createApiRequestId(request);
  let userId: string | null = null;

  try {
    userId = await getSignedInUserId();

    if (!userId) {
      return NextResponse.json(
        {
          error: "You must be signed in to delete AI summary history.",
        },
        { status: 401 }
      );
    }

    const body = (await request.json()) as DeleteHistoryRequest;
    const clearAll = body.clearAll === true;
    const id = typeof body.id === "string" ? body.id.trim() : "";

    if (!clearAll && !isUuid(id)) {
      return NextResponse.json(
        { error: "A valid summary id is required." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();
    const deletedAt = new Date().toISOString();

    let query = admin
      .from(TABLE_NAME)
      .update({ deleted_at: deletedAt })
      .eq("user_id", userId)
      .is("deleted_at", null);

    if (!clearAll) {
      query = query.eq("id", id);
    }

    const { data, error } = await query.select("id, generated_at");

    if (error) {
      throw new Error(
        error.message || "Unable to delete AI summary history."
      );
    }

    const deletedItems = data ?? [];

    if (!clearAll && deletedItems.length === 0) {
      return NextResponse.json(
        { error: "The saved AI summary was not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedCount: deletedItems.length,
      deletedIds: deletedItems.map((item) => item.id),
    });
  } catch (error) {
    logApiError({
      route: "/api/analytics-insights/history",
      method: "DELETE",
      requestId,
      userId,
      statusCode: 500,
      error,
    });

    return errorJson({
      message: "Unable to delete AI summary history.",
      code: "ANALYTICS_HISTORY_DELETE_FAILED",
      status: 500,
      requestId,
    });
  }
}
