type AnalyticsSummaryExportInput = {
  summary: string;
  generatedAt: string;
  stale: boolean;
};

function formatExportDate(
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

function createExportText({
  summary,
  generatedAt,
  stale,
}: AnalyticsSummaryExportInput): string {
  return [
    "Resume Impact AI",
    "AI Performance Summary",
    "",
    `Generated: ${formatExportDate(
      generatedAt
    )}`,
    `Status: ${
      stale
        ? "Saved summary — analytics have changed"
        : "Current analytics"
    }`,
    "",
    summary.trim(),
    "",
    "Important: Review all AI recommendations before use. Add only skills, keywords, and claims that accurately reflect your real experience.",
  ].join("\n");
}

function createFileName(
  generatedAt: string,
  extension: "txt" | "pdf"
): string {
  const date = new Date(generatedAt);

  const datePart = Number.isNaN(
    date.getTime()
  )
    ? "summary"
    : date
        .toISOString()
        .slice(0, 10);

  return `resume-impact-ai-summary-${datePart}.${extension}`;
}

function downloadBlob(
  blob: Blob,
  fileName: string
) {
  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function normalizePdfText(
  value: string
): string {
  return value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[•·]/g, "-")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E\n]/g, "");
}

function wrapPdfText(
  text: string,
  maximumLength = 88
): string[] {
  const result: string[] = [];

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();

    if (!line) {
      result.push("");
      continue;
    }

    const words = line.split(/\s+/);
    let current = "";

    for (const word of words) {
      const next = current
        ? `${current} ${word}`
        : word;

      if (
        next.length <= maximumLength
      ) {
        current = next;
        continue;
      }

      if (current) {
        result.push(current);
      }

      if (
        word.length > maximumLength
      ) {
        for (
          let index = 0;
          index < word.length;
          index += maximumLength
        ) {
          result.push(
            word.slice(
              index,
              index + maximumLength
            )
          );
        }

        current = "";
      } else {
        current = word;
      }
    }

    if (current) {
      result.push(current);
    }
  }

  return result;
}

function escapePdfText(
  value: string
): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function createSimplePdf(
  text: string
): string {
  const lines = wrapPdfText(
    normalizePdfText(text)
  );

  const linesPerPage = 52;
  const pages: string[][] = [];

  for (
    let index = 0;
    index < lines.length;
    index += linesPerPage
  ) {
    pages.push(
      lines.slice(
        index,
        index + linesPerPage
      )
    );
  }

  if (pages.length === 0) {
    pages.push([""]);
  }

  const pageObjectNumbers =
    pages.map(
      (_, index) => 4 + index * 2
    );

  const objects: string[] = [];

  objects[1] =
    "<< /Type /Catalog /Pages 2 0 R >>";

  objects[2] =
    `<< /Type /Pages /Kids [${pageObjectNumbers
      .map((number) => `${number} 0 R`)
      .join(" ")}] /Count ${pages.length} >>`;

  objects[3] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

  pages.forEach(
    (pageLines, index) => {
      const pageObjectNumber =
        4 + index * 2;

      const contentObjectNumber =
        pageObjectNumber + 1;

      const content = [
        "BT",
        "/F1 10 Tf",
        "50 792 Td",
        "13 TL",
        ...pageLines.flatMap(
          (line) => [
            `(${escapePdfText(
              line
            )}) Tj`,
            "T*",
          ]
        ),
        "ET",
      ].join("\n");

      objects[pageObjectNumber] =
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`;

      objects[contentObjectNumber] =
        `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
    }
  );

  let pdf = "%PDF-1.4\n%----\n";
  const offsets: number[] = [0];

  for (
    let objectNumber = 1;
    objectNumber < objects.length;
    objectNumber += 1
  ) {
    offsets[objectNumber] =
      pdf.length;

    pdf += `${objectNumber} 0 obj\n${objects[objectNumber]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;

  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";

  for (
    let objectNumber = 1;
    objectNumber < objects.length;
    objectNumber += 1
  ) {
    pdf += `${String(
      offsets[objectNumber]
    ).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

export function downloadAnalyticsSummaryTxt(
  input: AnalyticsSummaryExportInput
) {
  const text =
    createExportText(input);

  downloadBlob(
    new Blob([text], {
      type: "text/plain;charset=utf-8",
    }),
    createFileName(
      input.generatedAt,
      "txt"
    )
  );
}

export function downloadAnalyticsSummaryPdf(
  input: AnalyticsSummaryExportInput
) {
  const text =
    createExportText(input);

  const pdf =
    createSimplePdf(text);

  downloadBlob(
    new Blob([pdf], {
      type: "application/pdf",
    }),
    createFileName(
      input.generatedAt,
      "pdf"
    )
  );
}
