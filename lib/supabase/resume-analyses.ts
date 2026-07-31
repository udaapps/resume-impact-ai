import type {
  SupabaseClient,
} from "@supabase/supabase-js";

import {
  createClient,
} from "@/lib/supabase/client";

const TABLE_NAME =
  "resume_analyses";

export type ResumeAnalysisSource =
  | "web"
  | "local-import"
  | "cloud";

export type ResumeSectionResult = {
  name?: string;
  section?: string;
  found?: boolean;
  required?: boolean;
  score?: number;
  status?: string;
  message?: string;
  [key: string]: unknown;
};

export type FormattingIssue = {
  title?: string;
  description?: string;
  severity?: string;
  recommendation?: string;
  [key: string]: unknown;
};

export type KeywordItem = {
  keyword?: string;
  name?: string;
  category?: string;
  matched?: boolean;
  required?: boolean;
  [key: string]: unknown;
};

export type ResumeAnalysisResult = {
  overallScore?: number;
  keywordScore?: number;
  skillsScore?: number;
  experienceScore?: number;
  structureScore?: number;
  bulletScore?: number;
  achievementScore?: number;
  formattingScore?: number;
  readabilityScore?: number;

  matchedKeywords?: string[];
  missingKeywords?: string[];

  foundSections?: string[];
  missingSections?: string[];
  requiredMissingSections?: string[];

  recommendations?: string[];

  sections?: ResumeSectionResult[];
  formattingIssues?: FormattingIssue[];

  matchedItems?: KeywordItem[];
  missingItems?: KeywordItem[];

  achievementMetrics?: number;
  achievementActionVerbs?: number;
  achievementCount?: number;

  wordCount?: number;
  bulletCount?: number;
  weakPhraseCount?: number;
  longSentenceCount?: number;
  longParagraphCount?: number;

  hasEmail?: boolean;
  hasPhone?: boolean;
  hasLinkedIn?: boolean;

  [key: string]: unknown;
};

export type SaveResumeAnalysisInput = {
  title?: string;

  resumeText: string;
  jobDescription: string;

  result: ResumeAnalysisResult;

  source?: ResumeAnalysisSource;
};

export type UpdateResumeAnalysisInput = {
  title?: string;
  resumeText?: string;
  jobDescription?: string;
  result?: ResumeAnalysisResult;
  source?: ResumeAnalysisSource;
};

export type ResumeAnalysisRecord = {
  id: string;
  userId: string;

  title: string;
  resumeText: string;
  jobDescription: string;

  overallScore: number;
  keywordScore: number;
  skillsScore: number;
  experienceScore: number;
  structureScore: number;
  bulletScore: number;
  achievementScore: number;
  formattingScore: number;
  readabilityScore: number;

  matchedKeywords: string[];
  missingKeywords: string[];

  foundSections: string[];
  missingSections: string[];
  requiredMissingSections: string[];

  recommendations: string[];

  sections: ResumeSectionResult[];
  formattingIssues: FormattingIssue[];

  matchedItems: KeywordItem[];
  missingItems: KeywordItem[];

  achievementMetrics: number;
  achievementActionVerbs: number;
  achievementCount: number;

  wordCount: number;
  bulletCount: number;
  weakPhraseCount: number;
  longSentenceCount: number;
  longParagraphCount: number;

  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;

  analysisResult: ResumeAnalysisResult;

  source: ResumeAnalysisSource;

  createdAt: string;
  updatedAt: string;
};

type ResumeAnalysisDatabaseRow = {
  id: string;
  user_id: string;

  title: string;
  resume_text: string;
  job_description: string;

  overall_score: number;
  keyword_score: number;
  skills_score: number;
  experience_score: number;
  structure_score: number;
  bullet_score: number;
  achievement_score: number;
  formatting_score: number;
  readability_score: number;

  matched_keywords: unknown;
  missing_keywords: unknown;

  found_sections: unknown;
  missing_sections: unknown;
  required_missing_sections: unknown;

  recommendations: unknown;

  sections: unknown;
  formatting_issues: unknown;

  matched_items: unknown;
  missing_items: unknown;

  achievement_metrics: number;
  achievement_action_verbs: number;
  achievement_count: number;

  word_count: number;
  bullet_count: number;
  weak_phrase_count: number;
  long_sentence_count: number;
  long_paragraph_count: number;

  has_email: boolean;
  has_phone: boolean;
  has_linkedin: boolean;

  analysis_result: unknown;

  source: ResumeAnalysisSource;

  created_at: string;
  updated_at: string;
};

function clampScore(
  value: unknown
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
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

function toNonNegativeInteger(
  value: unknown
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.round(value)
  );
}

function cleanText(
  value: unknown,
  maximumLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maximumLength);
}

function cleanStringArray(
  value: unknown,
  maximumItems = 100,
  maximumItemLength = 200
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) =>
      cleanText(
        item,
        maximumItemLength
      )
    )
    .filter(Boolean)
    .filter(
      (item, index, items) =>
        items.indexOf(item) ===
        index
    )
    .slice(0, maximumItems);
}

function cleanObjectArray<T>(
  value: unknown,
  maximumItems = 100
): T[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is T =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
    )
    .slice(0, maximumItems);
}

function cleanAnalysisResult(
  result: ResumeAnalysisResult
): ResumeAnalysisResult {
  return {
    ...result,

    overallScore:
      clampScore(
        result.overallScore
      ),

    keywordScore:
      clampScore(
        result.keywordScore
      ),

    skillsScore:
      clampScore(
        result.skillsScore
      ),

    experienceScore:
      clampScore(
        result.experienceScore
      ),

    structureScore:
      clampScore(
        result.structureScore
      ),

    bulletScore:
      clampScore(
        result.bulletScore
      ),

    achievementScore:
      clampScore(
        result.achievementScore
      ),

    formattingScore:
      clampScore(
        result.formattingScore
      ),

    readabilityScore:
      clampScore(
        result.readabilityScore
      ),

    matchedKeywords:
      cleanStringArray(
        result.matchedKeywords
      ),

    missingKeywords:
      cleanStringArray(
        result.missingKeywords
      ),

    foundSections:
      cleanStringArray(
        result.foundSections
      ),

    missingSections:
      cleanStringArray(
        result.missingSections
      ),

    requiredMissingSections:
      cleanStringArray(
        result
          .requiredMissingSections
      ),

    recommendations:
      cleanStringArray(
        result.recommendations,
        50,
        500
      ),

    sections:
      cleanObjectArray<ResumeSectionResult>(
        result.sections
      ),

    formattingIssues:
      cleanObjectArray<FormattingIssue>(
        result.formattingIssues
      ),

    matchedItems:
      cleanObjectArray<KeywordItem>(
        result.matchedItems
      ),

    missingItems:
      cleanObjectArray<KeywordItem>(
        result.missingItems
      ),

    achievementMetrics:
      toNonNegativeInteger(
        result.achievementMetrics
      ),

    achievementActionVerbs:
      toNonNegativeInteger(
        result
          .achievementActionVerbs
      ),

    achievementCount:
      toNonNegativeInteger(
        result.achievementCount
      ),

    wordCount:
      toNonNegativeInteger(
        result.wordCount
      ),

    bulletCount:
      toNonNegativeInteger(
        result.bulletCount
      ),

    weakPhraseCount:
      toNonNegativeInteger(
        result.weakPhraseCount
      ),

    longSentenceCount:
      toNonNegativeInteger(
        result.longSentenceCount
      ),

    longParagraphCount:
      toNonNegativeInteger(
        result.longParagraphCount
      ),

    hasEmail:
      Boolean(result.hasEmail),

    hasPhone:
      Boolean(result.hasPhone),

    hasLinkedIn:
      Boolean(result.hasLinkedIn),
  };
}

function mapResultToDatabaseValues(
  result: ResumeAnalysisResult
) {
  const cleaned =
    cleanAnalysisResult(result);

  return {
    overall_score:
      clampScore(
        cleaned.overallScore
      ),

    keyword_score:
      clampScore(
        cleaned.keywordScore
      ),

    skills_score:
      clampScore(
        cleaned.skillsScore
      ),

    experience_score:
      clampScore(
        cleaned.experienceScore
      ),

    structure_score:
      clampScore(
        cleaned.structureScore
      ),

    bullet_score:
      clampScore(
        cleaned.bulletScore
      ),

    achievement_score:
      clampScore(
        cleaned.achievementScore
      ),

    formatting_score:
      clampScore(
        cleaned.formattingScore
      ),

    readability_score:
      clampScore(
        cleaned.readabilityScore
      ),

    matched_keywords:
      cleanStringArray(
        cleaned.matchedKeywords
      ),

    missing_keywords:
      cleanStringArray(
        cleaned.missingKeywords
      ),

    found_sections:
      cleanStringArray(
        cleaned.foundSections
      ),

    missing_sections:
      cleanStringArray(
        cleaned.missingSections
      ),

    required_missing_sections:
      cleanStringArray(
        cleaned
          .requiredMissingSections
      ),

    recommendations:
      cleanStringArray(
        cleaned.recommendations,
        50,
        500
      ),

    sections:
      cleanObjectArray<ResumeSectionResult>(
        cleaned.sections
      ),

    formatting_issues:
      cleanObjectArray<FormattingIssue>(
        cleaned.formattingIssues
      ),

    matched_items:
      cleanObjectArray<KeywordItem>(
        cleaned.matchedItems
      ),

    missing_items:
      cleanObjectArray<KeywordItem>(
        cleaned.missingItems
      ),

    achievement_metrics:
      toNonNegativeInteger(
        cleaned.achievementMetrics
      ),

    achievement_action_verbs:
      toNonNegativeInteger(
        cleaned
          .achievementActionVerbs
      ),

    achievement_count:
      toNonNegativeInteger(
        cleaned.achievementCount
      ),

    word_count:
      toNonNegativeInteger(
        cleaned.wordCount
      ),

    bullet_count:
      toNonNegativeInteger(
        cleaned.bulletCount
      ),

    weak_phrase_count:
      toNonNegativeInteger(
        cleaned.weakPhraseCount
      ),

    long_sentence_count:
      toNonNegativeInteger(
        cleaned.longSentenceCount
      ),

    long_paragraph_count:
      toNonNegativeInteger(
        cleaned.longParagraphCount
      ),

    has_email:
      Boolean(cleaned.hasEmail),

    has_phone:
      Boolean(cleaned.hasPhone),

    has_linkedin:
      Boolean(cleaned.hasLinkedIn),

    analysis_result:
      cleaned,
  };
}

function mapDatabaseRow(
  row: ResumeAnalysisDatabaseRow
): ResumeAnalysisRecord {
  const analysisResult =
    typeof row.analysis_result ===
      "object" &&
    row.analysis_result !== null &&
    !Array.isArray(
      row.analysis_result
    )
      ? (row.analysis_result as ResumeAnalysisResult)
      : {};

  return {
    id: row.id,
    userId: row.user_id,

    title: row.title,
    resumeText: row.resume_text,
    jobDescription:
      row.job_description,

    overallScore:
      clampScore(
        row.overall_score
      ),

    keywordScore:
      clampScore(
        row.keyword_score
      ),

    skillsScore:
      clampScore(
        row.skills_score
      ),

    experienceScore:
      clampScore(
        row.experience_score
      ),

    structureScore:
      clampScore(
        row.structure_score
      ),

    bulletScore:
      clampScore(
        row.bullet_score
      ),

    achievementScore:
      clampScore(
        row.achievement_score
      ),

    formattingScore:
      clampScore(
        row.formatting_score
      ),

    readabilityScore:
      clampScore(
        row.readability_score
      ),

    matchedKeywords:
      cleanStringArray(
        row.matched_keywords
      ),

    missingKeywords:
      cleanStringArray(
        row.missing_keywords
      ),

    foundSections:
      cleanStringArray(
        row.found_sections
      ),

    missingSections:
      cleanStringArray(
        row.missing_sections
      ),

    requiredMissingSections:
      cleanStringArray(
        row
          .required_missing_sections
      ),

    recommendations:
      cleanStringArray(
        row.recommendations,
        50,
        500
      ),

    sections:
      cleanObjectArray<ResumeSectionResult>(
        row.sections
      ),

    formattingIssues:
      cleanObjectArray<FormattingIssue>(
        row.formatting_issues
      ),

    matchedItems:
      cleanObjectArray<KeywordItem>(
        row.matched_items
      ),

    missingItems:
      cleanObjectArray<KeywordItem>(
        row.missing_items
      ),

    achievementMetrics:
      toNonNegativeInteger(
        row.achievement_metrics
      ),

    achievementActionVerbs:
      toNonNegativeInteger(
        row
          .achievement_action_verbs
      ),

    achievementCount:
      toNonNegativeInteger(
        row.achievement_count
      ),

    wordCount:
      toNonNegativeInteger(
        row.word_count
      ),

    bulletCount:
      toNonNegativeInteger(
        row.bullet_count
      ),

    weakPhraseCount:
      toNonNegativeInteger(
        row.weak_phrase_count
      ),

    longSentenceCount:
      toNonNegativeInteger(
        row.long_sentence_count
      ),

    longParagraphCount:
      toNonNegativeInteger(
        row.long_paragraph_count
      ),

    hasEmail:
      Boolean(row.has_email),

    hasPhone:
      Boolean(row.has_phone),

    hasLinkedIn:
      Boolean(row.has_linkedin),

    analysisResult:
      cleanAnalysisResult(
        analysisResult
      ),

    source: row.source,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getAuthenticatedUserId(
  supabase: SupabaseClient
): Promise<string> {
  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth.getUser();

  if (error) {
    throw new Error(
      error.message ||
        "Unable to verify the signed-in user."
    );
  }

  if (!user) {
    throw new Error(
      "You must be signed in to access cloud resume history."
    );
  }

  return user.id;
}

function validateResumeContent(
  resumeText: string,
  jobDescription: string
) {
  if (
    resumeText.trim().length <
    100
  ) {
    throw new Error(
      "Resume content must contain at least 100 characters."
    );
  }

  if (
    jobDescription.trim()
      .length < 100
  ) {
    throw new Error(
      "Job description must contain at least 100 characters."
    );
  }
}

export async function saveResumeAnalysis(
  input: SaveResumeAnalysisInput
): Promise<ResumeAnalysisRecord> {
  const supabase =
    createClient();

  const userId =
    await getAuthenticatedUserId(
      supabase
    );

  const resumeText =
    cleanText(
      input.resumeText,
      50_000
    );

  const jobDescription =
    cleanText(
      input.jobDescription,
      40_000
    );

  validateResumeContent(
    resumeText,
    jobDescription
  );

  const title =
    cleanText(
      input.title,
      200
    ) ||
    "ATS Resume Analysis";

  const payload = {
    user_id: userId,

    title,

    resume_text: resumeText,

    job_description:
      jobDescription,

    ...mapResultToDatabaseValues(
      input.result
    ),

    source:
      input.source ?? "web",
  };

  const {
    data,
    error,
  } = await supabase
    .from(TABLE_NAME)
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw new Error(
      error.message ||
        "Unable to save the resume analysis."
    );
  }

  if (!data) {
    throw new Error(
      "The resume analysis was saved, but no record was returned."
    );
  }

  return mapDatabaseRow(
    data as ResumeAnalysisDatabaseRow
  );
}

export async function loadResumeAnalyses(
  limit = 100
): Promise<
  ResumeAnalysisRecord[]
> {
  const supabase =
    createClient();

  await getAuthenticatedUserId(
    supabase
  );

  const safeLimit = Math.max(
    1,
    Math.min(
      500,
      Math.round(limit)
    )
  );

  const {
    data,
    error,
  } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(safeLimit);

  if (error) {
    throw new Error(
      error.message ||
        "Unable to load cloud resume history."
    );
  }

  return (
    data ??
    []
  ).map((row) =>
    mapDatabaseRow(
      row as ResumeAnalysisDatabaseRow
    )
  );
}

export async function loadResumeAnalysisById(
  analysisId: string
): Promise<
  ResumeAnalysisRecord | null
> {
  const supabase =
    createClient();

  await getAuthenticatedUserId(
    supabase
  );

  const cleanId =
    analysisId.trim();

  if (!cleanId) {
    throw new Error(
      "Resume analysis ID is required."
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", cleanId)
    .maybeSingle();

  if (error) {
    throw new Error(
      error.message ||
        "Unable to load the resume analysis."
    );
  }

  if (!data) {
    return null;
  }

  return mapDatabaseRow(
    data as ResumeAnalysisDatabaseRow
  );
}

export async function updateResumeAnalysis(
  analysisId: string,
  input: UpdateResumeAnalysisInput
): Promise<ResumeAnalysisRecord> {
  const supabase =
    createClient();

  await getAuthenticatedUserId(
    supabase
  );

  const cleanId =
    analysisId.trim();

  if (!cleanId) {
    throw new Error(
      "Resume analysis ID is required."
    );
  }

  const payload: Record<
    string,
    unknown
  > = {};

  if (
    input.title !== undefined
  ) {
    const title =
      cleanText(
        input.title,
        200
      );

    if (!title) {
      throw new Error(
        "Analysis title cannot be empty."
      );
    }

    payload.title = title;
  }

  if (
    input.resumeText !==
    undefined
  ) {
    const resumeText =
      cleanText(
        input.resumeText,
        50_000
      );

    if (
      resumeText.length < 100
    ) {
      throw new Error(
        "Resume content must contain at least 100 characters."
      );
    }

    payload.resume_text =
      resumeText;
  }

  if (
    input.jobDescription !==
    undefined
  ) {
    const jobDescription =
      cleanText(
        input.jobDescription,
        40_000
      );

    if (
      jobDescription.length <
      100
    ) {
      throw new Error(
        "Job description must contain at least 100 characters."
      );
    }

    payload.job_description =
      jobDescription;
  }

  if (input.result) {
    Object.assign(
      payload,
      mapResultToDatabaseValues(
        input.result
      )
    );
  }

  if (input.source) {
    payload.source =
      input.source;
  }

  if (
    Object.keys(payload)
      .length === 0
  ) {
    throw new Error(
      "No resume analysis changes were provided."
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from(TABLE_NAME)
    .update(payload)
    .eq("id", cleanId)
    .select("*")
    .single();

  if (error) {
    throw new Error(
      error.message ||
        "Unable to update the resume analysis."
    );
  }

  if (!data) {
    throw new Error(
      "The resume analysis could not be found."
    );
  }

  return mapDatabaseRow(
    data as ResumeAnalysisDatabaseRow
  );
}

export async function renameResumeAnalysis(
  analysisId: string,
  title: string
): Promise<ResumeAnalysisRecord> {
  return updateResumeAnalysis(
    analysisId,
    {
      title,
    }
  );
}

export async function deleteResumeAnalysis(
  analysisId: string
): Promise<void> {
  const supabase =
    createClient();

  await getAuthenticatedUserId(
    supabase
  );

  const cleanId =
    analysisId.trim();

  if (!cleanId) {
    throw new Error(
      "Resume analysis ID is required."
    );
  }

  const {
    error,
  } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", cleanId);

  if (error) {
    throw new Error(
      error.message ||
        "Unable to delete the resume analysis."
    );
  }
}

export async function deleteAllResumeAnalyses(): Promise<void> {
  const supabase =
    createClient();

  const userId =
    await getAuthenticatedUserId(
      supabase
    );

  const {
    error,
  } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("user_id", userId);

  if (error) {
    throw new Error(
      error.message ||
        "Unable to delete cloud resume history."
    );
  }
}

export async function getResumeAnalysisCount(): Promise<number> {
  const supabase =
    createClient();

  await getAuthenticatedUserId(
    supabase
  );

  const {
    count,
    error,
  } = await supabase
    .from(TABLE_NAME)
    .select("id", {
      count: "exact",
      head: true,
    });

  if (error) {
    throw new Error(
      error.message ||
        "Unable to count cloud resume analyses."
    );
  }

  return count ?? 0;
}