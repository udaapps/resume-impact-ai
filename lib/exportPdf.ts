import { jsPDF } from "jspdf";

type AtsAnalysis = {
  score: number;
  rating: string;
  strengths: string[];
  suggestions: string[];
};

type GeneratedBullet = {
  id: number;
  text: string;
};

export function exportResumePdf(
  bullets: GeneratedBullet[],
  atsAnalysis: AtsAnalysis | null
) {
  if (bullets.length === 0) {
    return;
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const leftMargin = 20;
  const rightMargin = 20;
  const bottomMargin = 20;
  const contentWidth = pageWidth - leftMargin - rightMargin;

  let y = 22;

  function addPageIfNeeded(requiredHeight: number) {
    if (y + requiredHeight > pageHeight - bottomMargin) {
      pdf.addPage();
      y = 22;
    }
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("Resume Impact AI", leftMargin, y);

  y += 9;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(
    "AI-generated resume bullet points and ATS analysis",
    leftMargin,
    y
  );

  y += 12;

  pdf.setDrawColor(37, 99, 235);
  pdf.setLineWidth(0.8);
  pdf.line(leftMargin, y, pageWidth - rightMargin, y);

  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Generated Resume Bullets", leftMargin, y);

  y += 9;

  bullets.forEach((bullet, index) => {
    addPageIfNeeded(25);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text(`${index + 1}.`, leftMargin, y);

    pdf.setFont("helvetica", "normal");

    const lines = pdf.splitTextToSize(
      bullet.text,
      contentWidth - 10
    );

    pdf.text(lines, leftMargin + 10, y);
    y += lines.length * 6 + 5;
  });

  if (atsAnalysis) {
    addPageIfNeeded(45);

    y += 5;

    pdf.setDrawColor(16, 185, 129);
    pdf.setFillColor(236, 253, 245);
    pdf.roundedRect(
      leftMargin,
      y,
      contentWidth,
      25,
      3,
      3,
      "FD"
    );

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(5, 150, 105);
    pdf.setFontSize(11);
    pdf.text("ATS ANALYSIS", leftMargin + 6, y + 8);

    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(17);
    pdf.text(
      `ATS Score: ${atsAnalysis.score}/100`,
      leftMargin + 6,
      y + 18
    );

    pdf.setFontSize(11);
    pdf.text(
      atsAnalysis.rating,
      pageWidth - rightMargin - 6,
      y + 18,
      { align: "right" }
    );

    y += 35;

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(5, 150, 105);
    pdf.setFontSize(14);
    pdf.text("Strengths", leftMargin, y);

    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(10.5);

    atsAnalysis.strengths.forEach((strength) => {
      const lines = pdf.splitTextToSize(
        `• ${strength}`,
        contentWidth
      );

      addPageIfNeeded(lines.length * 6 + 3);
      pdf.text(lines, leftMargin, y);
      y += lines.length * 6 + 3;
    });

    y += 5;

    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(217, 119, 6);
    pdf.setFontSize(14);
    pdf.text("Suggestions", leftMargin, y);

    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(15, 23, 42);
    pdf.setFontSize(10.5);

    atsAnalysis.suggestions.forEach((suggestion) => {
      const lines = pdf.splitTextToSize(
        `• ${suggestion}`,
        contentWidth
      );

      addPageIfNeeded(lines.length * 6 + 3);
      pdf.text(lines, leftMargin, y);
      y += lines.length * 6 + 3;
    });
  }

  addPageIfNeeded(20);

  y += 10;

  pdf.setDrawColor(203, 213, 225);
  pdf.line(leftMargin, y, pageWidth - rightMargin, y);

  y += 7;

  pdf.setFont("helvetica", "italic");
  pdf.setTextColor(100, 116, 139);
  pdf.setFontSize(9);

  const note = pdf.splitTextToSize(
    "Review every generated statement and keep only claims that accurately reflect your real experience.",
    contentWidth
  );

  pdf.text(note, leftMargin, y);

  pdf.save("resume-impact-ai.pdf");
}