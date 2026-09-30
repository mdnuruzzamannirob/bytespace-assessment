export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (!hours) return `${remaining} mins`
  if (!remaining) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remaining} mins`
}
