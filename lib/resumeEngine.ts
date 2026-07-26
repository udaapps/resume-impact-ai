const actionVerbs = [
  "Resolved",
  "Managed",
  "Handled",
  "Addressed",
  "Improved",
  "Streamlined",
  "Supported",
  "Coordinated",
  "Delivered",
  "Enhanced",
];

function cleanText(value: string) {
  return value.trim().replace(/[.!?]+$/, "");
}

function lowercaseFirst(value: string) {
  if (!value) return value;
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function removeLeadingVerb(value: string) {
  const words = cleanText(value).split(/\s+/);

  if (words.length <= 1) {
    return lowercaseFirst(value);
  }

  const firstWord = words[0].toLowerCase();

  const commonPastVerbs = [
    "answered",
    "resolved",
    "managed",
    "handled",
    "created",
    "developed",
    "implemented",
    "improved",
    "supported",
    "coordinated",
    "delivered",
    "designed",
    "organized",
    "processed",
    "assisted",
  ];

  if (commonPastVerbs.includes(firstWord)) {
    return lowercaseFirst(words.slice(1).join(" "));
  }

  return lowercaseFirst(cleanText(value));
}

function getUniqueVerbs(count: number) {
  const shuffled = [...actionVerbs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateResumeBullets(
  jobTitle: string,
  responsibility: string,
  achievement: string,
  metric?: string
): string[] {
  const cleanJobTitle = cleanText(jobTitle);
  const cleanResponsibility = removeLeadingVerb(responsibility);
  const cleanAchievement = cleanText(achievement);
  const cleanMetric = cleanText(metric ?? "");

  const verbs = getUniqueVerbs(3);

  const achievementPart = cleanAchievement
    ? `, contributing to ${lowercaseFirst(cleanAchievement)}`
    : "";

  const metricPart = cleanMetric ? ` by ${cleanMetric}` : "";

  return [
    `${verbs[0]} ${cleanResponsibility} as a ${cleanJobTitle}${achievementPart}${metricPart}.`,

    `${verbs[1]} ${cleanResponsibility}, helping ${lowercaseFirst(
      cleanAchievement || "improve operational performance"
    )}${metricPart}.`,

    `${verbs[2]} ${cleanResponsibility} while applying strong communication and problem-solving skills${achievementPart}${metricPart}.`,
  ];
}