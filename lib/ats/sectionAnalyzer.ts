export type ResumeSectionKey =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "languages";

export type ResumeSectionResult = {
  key: ResumeSectionKey;
  label: string;
  found: boolean;
  required: boolean;
};

export type SectionAnalysisResult = {
  sections: ResumeSectionResult[];
  foundSections: string[];
  missingSections: string[];
  requiredMissingSections: string[];
  sectionScore: number;
};

type SectionDefinition = {
  key: ResumeSectionKey;
  label: string;
  required: boolean;
  headings: string[];
};

const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    key: "summary",
    label: "Professional Summary",
    required: true,
    headings: [
      "summary",
      "professional summary",
      "career summary",
      "profile",
      "professional profile",
      "objective",
      "career objective",
    ],
  },
  {
    key: "skills",
    label: "Skills",
    required: true,
    headings: [
      "skills",
      "technical skills",
      "core skills",
      "core competencies",
      "competencies",
      "areas of expertise",
      "technologies",
      "tools and technologies",
    ],
  },
  {
    key: "experience",
    label: "Work Experience",
    required: true,
    headings: [
      "experience",
      "work experience",
      "professional experience",
      "employment history",
      "career history",
      "work history",
    ],
  },
  {
    key: "education",
    label: "Education",
    required: true,
    headings: [
      "education",
      "academic background",
      "academic qualifications",
      "qualifications",
    ],
  },
  {
    key: "projects",
    label: "Projects",
    required: false,
    headings: [
      "projects",
      "personal projects",
      "professional projects",
      "selected projects",
      "key projects",
    ],
  },
  {
    key: "certifications",
    label: "Certifications",
    required: false,
    headings: [
      "certifications",
      "certificates",
      "licenses",
      "licenses and certifications",
      "professional certifications",
    ],
  },
  {
    key: "languages",
    label: "Languages",
    required: false,
    headings: [
      "languages",
      "language skills",
      "language proficiency",
    ],
  },
];

function normalizeLine(line: string) {
  return line
    .toLowerCase()
    .replace(/[^\w\s&/-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikelyHeading(
  line: string,
  headings: string[]
) {
  const normalized = normalizeLine(line);

  if (!normalized || normalized.length > 60) {
    return false;
  }

  return headings.some((heading) => {
    const normalizedHeading = normalizeLine(heading);

    return (
      normalized === normalizedHeading ||
      normalized.startsWith(`${normalizedHeading} `) ||
      normalized.endsWith(` ${normalizedHeading}`)
    );
  });
}

function detectSection(
  resumeText: string,
  definition: SectionDefinition
) {
  const lines = resumeText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const headingMatch = lines.some((line) =>
    isLikelyHeading(line, definition.headings)
  );

  if (headingMatch) {
    return true;
  }

  const normalizedResume = resumeText.toLowerCase();

  return definition.headings.some((heading) => {
    const pattern = new RegExp(
      `(^|\\n|\\r)\\s*${heading.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}\\s*[:\\-]?\\s*(\\n|\\r|$)`,
      "i"
    );

    return pattern.test(normalizedResume);
  });
}

export function analyzeResumeSections(
  resumeText: string
): SectionAnalysisResult {
  const sections = SECTION_DEFINITIONS.map(
    (definition) => ({
      key: definition.key,
      label: definition.label,
      required: definition.required,
      found: detectSection(
        resumeText,
        definition
      ),
    })
  );

  const foundSections = sections
    .filter((section) => section.found)
    .map((section) => section.label);

  const missingSections = sections
    .filter((section) => !section.found)
    .map((section) => section.label);

  const requiredSections = sections.filter(
    (section) => section.required
  );

  const requiredMissingSections = requiredSections
    .filter((section) => !section.found)
    .map((section) => section.label);

  const requiredFoundCount = requiredSections.filter(
    (section) => section.found
  ).length;

  const optionalFoundCount = sections.filter(
    (section) =>
      !section.required && section.found
  ).length;

  const requiredScore =
    requiredSections.length === 0
      ? 0
      : (requiredFoundCount /
          requiredSections.length) *
        85;

  const optionalScore = Math.min(
    optionalFoundCount * 5,
    15
  );

  const sectionScore = Math.round(
    Math.min(requiredScore + optionalScore, 100)
  );

  return {
    sections,
    foundSections,
    missingSections,
    requiredMissingSections,
    sectionScore,
  };
}