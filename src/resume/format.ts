const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatYm(ym?: string): string | undefined {
  if (!ym) return undefined;
  const match = /^(\d{4})-(\d{2})$/.exec(ym.trim());
  if (!match) return ym;
  const year = match[1];
  const monthIndex = Number(match[2]) - 1;
  const month = MONTHS[monthIndex];
  if (!month) return ym;
  return `${month} ${year}`;
}

export function formatDateRange(
  startDate?: string,
  endDate?: string,
): string | undefined {
  const start = formatYm(startDate);
  const end = endDate ? formatYm(endDate) : "Present";
  if (!start && !endDate) return undefined;
  if (!start) return end;
  return `${start} - ${end}`;
}

export function joinTruthy(
  parts: Array<string | undefined>,
): string | undefined {
  const filtered = parts
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p));
  return filtered.length ? filtered.join(", ") : undefined;
}

// I would like to formally refer Reza Babaei for the Senior Full-Stack Software Engineer position within the Energy UI team. Reza is a highly skilled engineer with over 8 years of experience specializing in React, TypeScript, and GraphQL. He has a proven track record of building large-scale platforms, including a TypeScript SDK and client platform that serves over 100 million monthly active users.
// +2

// What makes him a particularly strong fit for Tesla Energy is his recent work with the United Nations, where he architected offline-first sync systems for real-time monitoring in mission-critical environments. This experience directly aligns with the technical challenges of managing distributed energy resources like Powerhub. He is also an expert in Next.js and distributed architectures, with deep experience in CI/CD and cloud infrastructure.
