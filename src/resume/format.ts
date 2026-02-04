const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

export function formatYm(ym?: string): string | undefined {
  if (!ym) return undefined
  const match = /^(\d{4})-(\d{2})$/.exec(ym.trim())
  if (!match) return ym
  const year = match[1]
  const monthIndex = Number(match[2]) - 1
  const month = MONTHS[monthIndex]
  if (!month) return ym
  return `${month} ${year}`
}

export function formatDateRange(startDate?: string, endDate?: string): string | undefined {
  const start = formatYm(startDate)
  const end = endDate ? formatYm(endDate) : 'Present'
  if (!start && !endDate) return undefined
  if (!start) return end
  return `${start} - ${end}`
}

export function joinTruthy(parts: Array<string | undefined>): string | undefined {
  const filtered = parts.map((p) => p?.trim()).filter((p): p is string => Boolean(p))
  return filtered.length ? filtered.join(', ') : undefined
}

