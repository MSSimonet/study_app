/**
 * Adds working days to a date, skipping weekends
 */
export function addWorkingDays(startDate: Date, days: number): Date {
  const date = new Date(startDate.getTime())
  let remainingDays = days

  while (remainingDays > 0) {
    date.setDate(date.getDate() + 1)
    const dayOfWeek = date.getDay()

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remainingDays--
    }
  }

  return date
}

/**
 * Formats hours into a readable string with days
 */
export function formatHours(hours: number, hoursPerDay: number): string {
  const totalDays = Math.round(hours / hoursPerDay)
  if (totalDays > 0) {
    return `${hours} horas (${totalDays} días)`
  }
  return `${hours} horas`
}
