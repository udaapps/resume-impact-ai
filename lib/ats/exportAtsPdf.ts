import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
  AtsAnalysisHistoryItem,
  AtsHistoryAnalysisResult,
} from "@/lib/ats/analysisHistory";

type ExportAtsPdfParams = {
  title?: string;
  resumeText: string;
  jobDescription: string;
  result: AtsHistoryAnalysisResult;
  createdAt?: string;
};

type PdfColor = [
  number,
  number,
  number,
];

const COLORS = {
  navy: [15, 23, 42] as PdfColor,
  dark: [30, 41, 59] as PdfColor,
  slate: [71, 85, 105] as PdfColor,
  muted: [100, 116, 139] as PdfColor,
  border: [203, 213, 225] as PdfColor,
  light: [241, 245, 249] as PdfColor,
  white: [255, 255, 255] as PdfColor,

  blue: [37, 99, 235] as PdfColor,
  blueLight: [219, 234, 254] as PdfColor,

  green: [5, 150, 105] as PdfColor,
  greenLight: [209, 250, 229] as PdfColor,

  amber: [217, 119, 6] as PdfColor,
  amberLight: [254, 243, 199] as PdfColor,

  red: [220, 38, 38] as PdfColor,
  redLight: [254, 226, 226] as PdfColor,

  violet: [124, 58, 237] as PdfColor,
  violetLight: [237, 233, 254] as PdfColor,
};

const PAGE = {
  width: 210,
  height: 297,
  marginX: 16,
  marginTop: 18,
  marginBottom: 18,
};

function clampScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : fallback;
}

function safeString(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string"
    ? value
    : fallback;
}

function safeStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(
  value?: string
): string {
  if (!value) {
    return new Intl.DateTimeFormat(
      "en-US",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(new Date());
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

function sanitizeFileName(
  value: string
): string {
  const sanitized = value
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^\.+|\.+$/g, "")
    .slice(0, 80);

  return (
    sanitized ||
    "resume-impact-ai-ats-report"
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

function getScoreColor(
  score: number
): PdfColor {
  if (score >= 80) {
    return COLORS.green;
  }

  if (score >= 60) {
    return COLORS.blue;
  }

  if (score >= 40) {
    return COLORS.amber;
  }

  return COLORS.red;
}

function getScoreBackground(
  score: number
): PdfColor {
  if (score >= 80) {
    return COLORS.greenLight;
  }

  if (score >= 60) {
    return COLORS.blueLight;
  }

  if (score >= 40) {
    return COLORS.amberLight;
  }

  return COLORS.redLight;
}

function setFillColor(
  pdf: jsPDF,
  color: PdfColor
) {
  pdf.setFillColor(
    color[0],
    color[1],
    color[2]
  );
}

function setTextColor(
  pdf: jsPDF,
  color: PdfColor
) {
  pdf.setTextColor(
    color[0],
    color[1],
    color[2]
  );
}

function setDrawColor(
  pdf: jsPDF,
  color: PdfColor
) {
  pdf.setDrawColor(
    color[0],
    color[1],
    color[2]
  );
}

function ensureSpace(
  pdf: jsPDF,
  y: number,
  requiredHeight: number,
  onNewPage?: () => void
): number {
  const maximumY =
    PAGE.height - PAGE.marginBottom;

  if (
    y + requiredHeight <= maximumY
  ) {
    return y;
  }

  pdf.addPage();

  if (onNewPage) {
    onNewPage();
  }

  return PAGE.marginTop;
}

function drawBrandHeader(
  pdf: jsPDF,
  reportTitle: string,
  reportDate: string
): number {
  setFillColor(pdf, COLORS.navy);

  pdf.rect(
    0,
    0,
    PAGE.width,
    43,
    "F"
  );

  setFillColor(pdf, COLORS.blue);

  pdf.roundedRect(
    PAGE.marginX,
    10,
    14,
    14,
    3,
    3,
    "F"
  );

  setTextColor(pdf, COLORS.white);

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(14);

  pdf.text(
    "RI",
    PAGE.marginX + 7,
    19.2,
    {
      align: "center",
    }
  );

  pdf.setFontSize(17);

  pdf.text(
    "ResumeClimb AI",
    PAGE.marginX + 19,
    16
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(8.5);

  setTextColor(
    pdf,
    [191, 219, 254]
  );

  pdf.text(
    "ATS Resume Analysis Report",
    PAGE.marginX + 19,
    21.5
  );

  pdf.setFontSize(8);

  setTextColor(
    pdf,
    [203, 213, 225]
  );

  pdf.text(
    `Generated ${reportDate}`,
    PAGE.width - PAGE.marginX,
    14.5,
    {
      align: "right",
    }
  );

  const titleLines =
    pdf.splitTextToSize(
      reportTitle,
      115
    );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(10);

  setTextColor(pdf, COLORS.white);

  pdf.text(
    titleLines.slice(0, 2),
    PAGE.width - PAGE.marginX,
    23,
    {
      align: "right",
    }
  );

  return 52;
}

function drawContinuationHeader(
  pdf: jsPDF
) {
  setFillColor(pdf, COLORS.navy);

  pdf.rect(
    0,
    0,
    PAGE.width,
    15,
    "F"
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(9);

  setTextColor(pdf, COLORS.white);

  pdf.text(
    "ResumeClimb AI",
    PAGE.marginX,
    9.8
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(8);

  setTextColor(
    pdf,
    [203, 213, 225]
  );

  pdf.text(
    "ATS Resume Analysis Report",
    PAGE.width - PAGE.marginX,
    9.8,
    {
      align: "right",
    }
  );
}

function drawSectionTitle(
  pdf: jsPDF,
  title: string,
  y: number,
  subtitle?: string
): number {
  y = ensureSpace(
    pdf,
    y,
    subtitle ? 20 : 14,
    () => drawContinuationHeader(pdf)
  );

  setFillColor(
    pdf,
    COLORS.blueLight
  );

  pdf.roundedRect(
    PAGE.marginX,
    y,
    4,
    11,
    2,
    2,
    "F"
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(13);

  setTextColor(pdf, COLORS.navy);

  pdf.text(
    title,
    PAGE.marginX + 8,
    y + 7.5
  );

  let nextY = y + 14;

  if (subtitle) {
    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(8.5);

    setTextColor(pdf, COLORS.muted);

    const subtitleLines =
      pdf.splitTextToSize(
        subtitle,
        PAGE.width -
          PAGE.marginX * 2 -
          8
      );

    pdf.text(
      subtitleLines,
      PAGE.marginX + 8,
      nextY
    );

    nextY +=
      subtitleLines.length * 4 + 2;
  }

  return nextY;
}

function drawScoreOverview(
  pdf: jsPDF,
  result: AtsHistoryAnalysisResult,
  y: number
): number {
  const overallScore = clampScore(
    safeNumber(result.overallScore)
  );

  const scoreColor =
    getScoreColor(overallScore);

  const scoreBackground =
    getScoreBackground(overallScore);

  y = ensureSpace(
    pdf,
    y,
    48,
    () => drawContinuationHeader(pdf)
  );

  setFillColor(pdf, COLORS.light);

  setDrawColor(pdf, COLORS.border);

  pdf.roundedRect(
    PAGE.marginX,
    y,
    PAGE.width -
      PAGE.marginX * 2,
    43,
    4,
    4,
    "FD"
  );

  setFillColor(
    pdf,
    scoreBackground
  );

  setDrawColor(
    pdf,
    scoreColor
  );

  pdf.roundedRect(
    PAGE.marginX + 7,
    y + 6,
    44,
    31,
    4,
    4,
    "FD"
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(28);

  setTextColor(
    pdf,
    scoreColor
  );

  pdf.text(
    String(overallScore),
    PAGE.marginX + 29,
    y + 24,
    {
      align: "center",
    }
  );

  pdf.setFontSize(8);

  pdf.text(
    "OUT OF 100",
    PAGE.marginX + 29,
    y + 31,
    {
      align: "center",
    }
  );

  pdf.setFontSize(15);

  setTextColor(pdf, COLORS.navy);

  pdf.text(
    getScoreLabel(overallScore),
    PAGE.marginX + 59,
    y + 14
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(9);

  setTextColor(pdf, COLORS.slate);

  const description =
    overallScore >= 80
      ? "The resume demonstrates strong alignment with the target job description."
      : overallScore >= 60
        ? "The resume has a solid foundation but still has meaningful opportunities for improvement."
        : overallScore >= 40
          ? "The resume requires targeted improvements in keywords, structure, or content."
          : "The resume has limited alignment and should be revised before applying.";

  const descriptionLines =
    pdf.splitTextToSize(
      description,
      116
    );

  pdf.text(
    descriptionLines,
    PAGE.marginX + 59,
    y + 21
  );

  pdf.setFontSize(8);

  setTextColor(pdf, COLORS.muted);

  pdf.text(
    "This score is an estimate and does not represent any specific employer ATS.",
    PAGE.marginX + 59,
    y + 34
  );

  return y + 50;
}

function drawMetricGrid(
  pdf: jsPDF,
  result: AtsHistoryAnalysisResult,
  y: number
): number {
  const metrics = [
    {
      label: "Keywords",
      value: result.keywordScore,
    },
    {
      label: "Skills",
      value: result.skillsScore,
    },
    {
      label: "Experience",
      value: result.experienceScore,
    },
    {
      label: "Structure",
      value: result.structureScore,
    },
    {
      label: "Bullets",
      value: result.bulletScore,
    },
    {
      label: "Achievements",
      value: result.achievementScore,
    },
    {
      label: "Formatting",
      value: result.formattingScore,
    },
    {
      label: "Readability",
      value: result.readabilityScore,
    },
  ];

  const columns = 4;
  const gap = 3;

  const totalWidth =
    PAGE.width - PAGE.marginX * 2;

  const cardWidth =
    (totalWidth -
      gap * (columns - 1)) /
    columns;

  const cardHeight = 25;
  const rowGap = 3;

  for (
    let startIndex = 0;
    startIndex < metrics.length;
    startIndex += columns
  ) {
    y = ensureSpace(
      pdf,
      y,
      cardHeight + rowGap,
      () => drawContinuationHeader(pdf)
    );

    const rowMetrics =
      metrics.slice(
        startIndex,
        startIndex + columns
      );

    rowMetrics.forEach(
      (metric, column) => {
        const x =
          PAGE.marginX +
          column *
            (cardWidth + gap);

        const score =
          clampScore(
            safeNumber(metric.value)
          );

        const scoreColor =
          getScoreColor(score);

        setFillColor(
          pdf,
          COLORS.white
        );

        setDrawColor(
          pdf,
          COLORS.border
        );

        pdf.roundedRect(
          x,
          y,
          cardWidth,
          cardHeight,
          3,
          3,
          "FD"
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(7.5);

        setTextColor(
          pdf,
          COLORS.muted
        );

        pdf.text(
          metric.label,
          x + 4,
          y + 6
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(15);

        setTextColor(
          pdf,
          COLORS.navy
        );

        pdf.text(
          String(score),
          x + 4,
          y + 16
        );

        setFillColor(
          pdf,
          COLORS.light
        );

        pdf.roundedRect(
          x + 4,
          y + 20,
          cardWidth - 8,
          2.5,
          1.2,
          1.2,
          "F"
        );

        if (score > 0) {
          setFillColor(
            pdf,
            scoreColor
          );

          pdf.roundedRect(
            x + 4,
            y + 20,
            ((cardWidth - 8) *
              score) /
              100,
            2.5,
            1.2,
            1.2,
            "F"
          );
        }
      }
    );

    y += cardHeight + rowGap;
  }

  return y + 2;
}

function drawKeywordSection(
  pdf: jsPDF,
  title: string,
  keywords: string[],
  y: number,
  variant:
    | "matched"
    | "missing"
): number {
  const accent =
    variant === "matched"
      ? COLORS.green
      : COLORS.amber;

  const background =
    variant === "matched"
      ? COLORS.greenLight
      : COLORS.amberLight;

  const text =
    keywords.length > 0
      ? keywords.join(", ")
      : variant === "matched"
        ? "No matched keywords were detected."
        : "No important missing keywords were detected.";

  const lines =
    pdf.splitTextToSize(
      text,
      PAGE.width -
        PAGE.marginX * 2 -
        14
    );

  const height =
    Math.max(
      24,
      15 + lines.length * 4
    );

  y = ensureSpace(
    pdf,
    y,
    height + 4,
    () => drawContinuationHeader(pdf)
  );

  setFillColor(pdf, background);

  setDrawColor(pdf, accent);

  pdf.roundedRect(
    PAGE.marginX,
    y,
    PAGE.width -
      PAGE.marginX * 2,
    height,
    3,
    3,
    "FD"
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(9);

  setTextColor(pdf, accent);

  pdf.text(
    `${title} (${keywords.length})`,
    PAGE.marginX + 6,
    y + 7
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(8.5);

  setTextColor(pdf, COLORS.dark);

  pdf.text(
    lines,
    PAGE.marginX + 6,
    y + 13
  );

  return y + height + 5;
}

function drawSimpleTable(
  pdf: jsPDF,
  head: string[],
  body: Array<
    Array<string | number>
  >,
  y: number,
  columnStyles?: Record<
    number,
    {
      cellWidth?: number | "auto";
      halign?:
        | "left"
        | "center"
        | "right";
    }
  >
): number {
  autoTable(pdf, {
    startY: y,
    margin: {
      left: PAGE.marginX,
      right: PAGE.marginX,
      bottom: PAGE.marginBottom,
    },
    head: [head],
    body,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 8,
      textColor: COLORS.dark,
      lineColor: COLORS.border,
      lineWidth: 0.2,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: COLORS.navy,
      textColor: COLORS.white,
      fontStyle: "bold",
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: COLORS.light,
    },
    columnStyles,
    didDrawPage: () => {
      if (
        pdf.getNumberOfPages() > 1
      ) {
        drawContinuationHeader(pdf);
      }
    },
  });

 const finalY =
  (
    pdf as jsPDF & {
      lastAutoTable?: {
        finalY?: number;
      };
    }
  ).lastAutoTable?.finalY;

return (
  typeof finalY === "number"
    ? finalY
    : y
) + 7;
}

function drawRecommendations(
  pdf: jsPDF,
  recommendations: string[],
  y: number
): number {
  if (
    recommendations.length === 0
  ) {
    y = ensureSpace(
      pdf,
      y,
      20,
      () => drawContinuationHeader(pdf)
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);

    setTextColor(pdf, COLORS.muted);

    pdf.text(
      "No additional recommendations were generated.",
      PAGE.marginX,
      y + 7
    );

    return y + 15;
  }

  recommendations.forEach(
    (recommendation, index) => {
      const lines =
        pdf.splitTextToSize(
          recommendation,
          PAGE.width -
            PAGE.marginX * 2 -
            18
        );

      const cardHeight =
        Math.max(
          18,
          10 + lines.length * 4
        );

      y = ensureSpace(
        pdf,
        y,
        cardHeight + 4,
        () =>
          drawContinuationHeader(pdf)
      );

      setFillColor(pdf, COLORS.light);

      setDrawColor(pdf, COLORS.border);

      pdf.roundedRect(
        PAGE.marginX,
        y,
        PAGE.width -
          PAGE.marginX * 2,
        cardHeight,
        3,
        3,
        "FD"
      );

      setFillColor(pdf, COLORS.blue);

      pdf.circle(
        PAGE.marginX + 7,
        y + 8,
        4,
        "F"
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(8);

      setTextColor(pdf, COLORS.white);

      pdf.text(
        String(index + 1),
        PAGE.marginX + 7,
        y + 10.5,
        {
          align: "center",
        }
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8.5);

      setTextColor(pdf, COLORS.dark);

      pdf.text(
        lines,
        PAGE.marginX + 15,
        y + 7
      );

      y += cardHeight + 4;
    }
  );

  return y;
}

function drawTextContent(
  pdf: jsPDF,
  title: string,
  content: string,
  y: number,
  maximumCharacters = 5000
): number {
  y = drawSectionTitle(
    pdf,
    title,
    y
  );

  const trimmedContent =
    content.trim();

  if (!trimmedContent) {
    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);

    setTextColor(pdf, COLORS.muted);

    pdf.text(
      "No content available.",
      PAGE.marginX,
      y + 5
    );

    return y + 13;
  }

  const truncated =
    trimmedContent.length >
    maximumCharacters
      ? `${trimmedContent.slice(
          0,
          maximumCharacters
        )}\n\n[Content shortened for this report.]`
      : trimmedContent;

  const paragraphs =
    truncated
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);

  for (const paragraph of paragraphs) {
    const lines =
      pdf.splitTextToSize(
        paragraph,
        PAGE.width -
          PAGE.marginX * 2
      );

    const requiredHeight =
      lines.length * 4 + 5;

    y = ensureSpace(
      pdf,
      y,
      requiredHeight,
      () => drawContinuationHeader(pdf)
    );

    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(8.5);

    setTextColor(pdf, COLORS.dark);

    pdf.text(
      lines,
      PAGE.marginX,
      y
    );

    y += requiredHeight;
  }

  return y + 2;
}

function drawFooter(
  pdf: jsPDF,
  pageNumber: number,
  totalPages: number
) {
  const y =
    PAGE.height - 9;

  setDrawColor(pdf, COLORS.border);

  pdf.line(
    PAGE.marginX,
    y - 4,
    PAGE.width - PAGE.marginX,
    y - 4
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(7);

  setTextColor(pdf, COLORS.muted);

  pdf.text(
    "ResumeClimb AI · UDA Apps",
    PAGE.marginX,
    y
  );

  pdf.text(
    `Page ${pageNumber} of ${totalPages}`,
    PAGE.width - PAGE.marginX,
    y,
    {
      align: "right",
    }
  );
}

function addPageFooters(
  pdf: jsPDF
) {
  const totalPages =
    pdf.getNumberOfPages();

  for (
    let pageNumber = 1;
    pageNumber <= totalPages;
    pageNumber += 1
  ) {
    pdf.setPage(pageNumber);

    drawFooter(
      pdf,
      pageNumber,
      totalPages
    );
  }
}

function createSectionRows(
  result: AtsHistoryAnalysisResult
): Array<[string, string, string]> {
  const sections =
    Array.isArray(result.sections)
      ? result.sections
      : [];

  if (sections.length > 0) {
    return sections.map(
      (section) => [
        safeString(
          section.label ||
            section.key,
          "Resume section"
        ),
        section.found ? "Found" : "Missing",
        section.required
          ? "Required"
          : "Optional",
      ]
    );
  }

  const foundSections =
    safeStringArray(
      result.foundSections
    );

  const missingSections =
    safeStringArray(
      result.missingSections
    );

  return [
    ...foundSections.map(
      (section) =>
        [
          section,
          "Found",
          "—",
        ] as [
          string,
          string,
          string,
        ]
    ),

    ...missingSections.map(
      (section) =>
        [
          section,
          "Missing",
          "—",
        ] as [
          string,
          string,
          string,
        ]
    ),
  ];
}

function createFormattingRows(
  result: AtsHistoryAnalysisResult
): Array<[string, string, string]> {
  const issues =
    Array.isArray(
      result.formattingIssues
    )
      ? result.formattingIssues
      : [];

  return issues.map(
    (issue) => [
      safeString(
        issue.title,
        "Formatting issue"
      ),
      safeString(
        issue.description,
        "Review this formatting item."
      ),
      safeString(
        issue.severity,
        "low"
      ).toUpperCase(),
    ]
  );
}

export async function exportAtsPdf({
  title =
    "ATS Resume Analysis",
  resumeText,
  jobDescription,
  result,
  createdAt,
}: ExportAtsPdfParams): Promise<void> {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  pdf.setProperties({
    title,
    subject:
      "ATS Resume Analysis Report",
    author: "ResumeClimb AI",
    creator: "UDA Apps",
    keywords:
      "ATS resume report, resume analysis, job match",
  });

  const reportDate =
    formatDate(createdAt);

  let y = drawBrandHeader(
    pdf,
    title,
    reportDate
  );

  y = drawScoreOverview(
    pdf,
    result,
    y
  );

  y = drawSectionTitle(
    pdf,
    "Score Breakdown",
    y,
    "Scores are estimated from resume and job-description alignment."
  );

  y = drawMetricGrid(
    pdf,
    result,
    y
  );

  y = drawSectionTitle(
    pdf,
    "Keyword Analysis",
    y,
    "Only add skills and keywords that truthfully represent your experience."
  );

  y = drawKeywordSection(
    pdf,
    "Matched Keywords",
    safeStringArray(
      result.matchedKeywords
    ),
    y,
    "matched"
  );

  y = drawKeywordSection(
    pdf,
    "Missing Keywords",
    safeStringArray(
      result.missingKeywords
    ),
    y,
    "missing"
  );

  const sectionRows =
    createSectionRows(result);

  y = drawSectionTitle(
    pdf,
    "Resume Section Analysis",
    y
  );

  if (sectionRows.length > 0) {
    y = drawSimpleTable(
      pdf,
      [
        "Section",
        "Status",
        "Requirement",
      ],
      sectionRows,
      y,
      {
        1: {
          cellWidth: 32,
          halign: "center",
        },
        2: {
          cellWidth: 32,
          halign: "center",
        },
      }
    );
  } else {
    pdf.setFont(
      "helvetica",
      "normal"
    );

    pdf.setFontSize(9);

    setTextColor(pdf, COLORS.muted);

    pdf.text(
      "No section analysis data available.",
      PAGE.marginX,
      y + 5
    );

    y += 14;
  }

  y = drawSectionTitle(
    pdf,
    "Achievement & Content Insights",
    y
  );

  y = drawSimpleTable(
    pdf,
    [
      "Metric",
      "Result",
    ],
    [
      [
        "Detected achievements",
        safeNumber(
          result.achievementCount
        ),
      ],
      [
        "Action verbs detected",
        safeNumber(
          result.achievementActionVerbs
        ),
      ],
      [
        "Measurable metrics detected",
        safeNumber(
          result.achievementMetrics
        ),
      ],
      [
        "Resume word count",
        safeNumber(
          result.wordCount
        ),
      ],
      [
        "Resume bullet count",
        safeNumber(
          result.bulletCount
        ),
      ],
      [
        "Long paragraphs",
        safeNumber(
          result.longParagraphCount
        ),
      ],
      [
        "Long sentences",
        safeNumber(
          result.longSentenceCount
        ),
      ],
      [
        "Weak phrases",
        safeNumber(
          result.weakPhraseCount
        ),
      ],
      [
        "Repeated keywords",
        safeNumber(
          result.repeatedKeywordCount
        ),
      ],
    ],
    y,
    {
      1: {
        cellWidth: 38,
        halign: "center",
      },
    }
  );

  y = drawSectionTitle(
    pdf,
    "Contact & ATS Formatting Checks",
    y
  );

  y = drawSimpleTable(
    pdf,
    [
      "Check",
      "Status",
    ],
    [
      [
        "Email address detected",
        result.hasEmail
          ? "Yes"
          : "No",
      ],
      [
        "Phone number detected",
        result.hasPhone
          ? "Yes"
          : "No",
      ],
      [
        "LinkedIn profile detected",
        result.hasLinkedIn
          ? "Yes"
          : "No",
      ],
      [
        "First-person pronouns",
        safeNumber(
          result.firstPersonPronounCount
        ),
      ],
    ],
    y,
    {
      1: {
        cellWidth: 40,
        halign: "center",
      },
    }
  );

  const formattingRows =
    createFormattingRows(result);

  if (formattingRows.length > 0) {
    y = drawSectionTitle(
      pdf,
      "Formatting Issues",
      y
    );

    y = drawSimpleTable(
      pdf,
      [
        "Issue",
        "Description",
        "Severity",
      ],
      formattingRows,
      y,
      {
        0: {
          cellWidth: 42,
        },
        2: {
          cellWidth: 24,
          halign: "center",
        },
      }
    );
  }

  y = drawSectionTitle(
    pdf,
    "Priority Recommendations",
    y,
    "Apply recommendations only when they remain accurate and relevant."
  );

  y = drawRecommendations(
    pdf,
    safeStringArray(
      result.recommendations
    ),
    y
  );

  y = drawTextContent(
    pdf,
    "Resume Content",
    resumeText,
    y
  );

  y = drawTextContent(
    pdf,
    "Target Job Description",
    jobDescription,
    y
  );

  y = drawSectionTitle(
    pdf,
    "Important Disclaimer",
    y
  );

  y = ensureSpace(
    pdf,
    y,
    35,
    () => drawContinuationHeader(pdf)
  );

  setFillColor(
    pdf,
    COLORS.amberLight
  );

  setDrawColor(
    pdf,
    COLORS.amber
  );

  pdf.roundedRect(
    PAGE.marginX,
    y,
    PAGE.width -
      PAGE.marginX * 2,
    29,
    3,
    3,
    "FD"
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(8);

  setTextColor(pdf, COLORS.dark);

  const disclaimer =
    "ResumeClimb AI provides estimated analysis for educational and resume-improvement purposes. The report cannot guarantee compatibility with every applicant tracking system, recruiter review, interview, offer, or hiring decision. Always review generated suggestions before use and never add skills, qualifications, tools, metrics, or achievements that you do not genuinely possess.";

  pdf.text(
    pdf.splitTextToSize(
      disclaimer,
      PAGE.width -
        PAGE.marginX * 2 -
        12
    ),
    PAGE.marginX + 6,
    y + 7
  );

  addPageFooters(pdf);

  const fileName =
    `${sanitizeFileName(
      title
    )}-ats-report.pdf`;

  pdf.save(fileName);
}

export async function exportAtsHistoryItemPdf(
  item: AtsAnalysisHistoryItem
): Promise<void> {
  await exportAtsPdf({
    title:
      item.title ||
      "ATS Resume Analysis",
    resumeText:
      item.resumeText || "",
    jobDescription:
      item.jobDescription || "",
    result: item.result,
    createdAt:
      item.updatedAt ||
      item.createdAt,
  });
}
export async function exportAtsAnalysisPdf(
  params: ExportAtsPdfParams
): Promise<void> {
  await exportAtsPdf(params);
}