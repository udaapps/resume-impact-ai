import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

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

export async function exportResumeDocx(
  bullets: GeneratedBullet[],
  atsAnalysis: AtsAnalysis | null
) {
  if (bullets.length === 0) {
    return;
  }

  const children: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: "ResumeClimb AI",
          bold: true,
        }),
      ],
    }),

    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      text: "Generated Resume Bullets",
    }),
  ];

  bullets.forEach((bullet) => {
    children.push(
      new Paragraph({
        bullet: {
          level: 0,
        },
        children: [
          new TextRun({
            text: bullet.text,
          }),
        ],
      })
    );
  });

  if (atsAnalysis) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        text: "ATS Analysis",
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: `Score: ${atsAnalysis.score}/100`,
            bold: true,
          }),
          new TextRun({
            text: ` — ${atsAnalysis.rating}`,
          }),
        ],
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        text: "Strengths",
      })
    );

    atsAnalysis.strengths.forEach((strength) => {
      children.push(
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: strength,
        })
      );
    });

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        text: "Suggestions",
      })
    );

    atsAnalysis.suggestions.forEach((suggestion) => {
      children.push(
        new Paragraph({
          bullet: {
            level: 0,
          },
          text: suggestion,
        })
      );
    });
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text:
            "Review every generated statement and keep only claims that accurately reflect your real experience.",
          italics: true,
        }),
      ],
    })
  );

  const document = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(document);

  saveAs(blob, "resume-impact-ai.docx");
}