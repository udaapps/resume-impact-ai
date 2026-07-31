export interface AchievementResult {
  score: number;
  achievements: number;
  metrics: number;
  actionVerbs: number;
  recommendations: string[];
}

const actionVerbs = [
  "developed",
  "created",
  "implemented",
  "built",
  "optimized",
  "improved",
  "designed",
  "managed",
  "led",
  "reduced",
  "increased",
  "generated",
  "delivered",
  "collaborated",
  "engineered",
  "launched",
  "automated",
  "maintained",
  "upgraded",
  "achieved",
];

export function analyzeAchievements(
  resume: string
): AchievementResult {
  const text = resume.toLowerCase();

  const metricMatches =
    text.match(
      /\d+%|\$\d+|\d+\+|\d+\s?(users|customers|projects|years|months)/g
    ) || [];

  const verbMatches = actionVerbs.filter((verb) =>
    text.includes(verb)
  );

  let score = 40;

  score += Math.min(metricMatches.length * 8, 30);

  score += Math.min(verbMatches.length * 2, 20);

  score = Math.min(score, 100);

  const recommendations: string[] = [];

  if (metricMatches.length < 3) {
    recommendations.push(
      "Include more measurable achievements (%, $, numbers)."
    );
  }

  if (verbMatches.length < 5) {
    recommendations.push(
      "Use stronger action verbs such as Developed, Led, Optimized, Improved."
    );
  }

  return {
    score,
    achievements: verbMatches.length,
    metrics: metricMatches.length,
    actionVerbs: verbMatches.length,
    recommendations,
  };
}