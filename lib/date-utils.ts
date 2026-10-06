import { START_DATE } from "./constants"

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

/** Lunes de la semana `week` (1-indexada) del plan */
export function weekStart(week: number): Date {
  const d = new Date(START_DATE.getTime())
  d.setDate(d.getDate() + (week - 1) * 7)
  return d
}

/** Clave local YYYY-MM-DD */
export function dateKey(d: Date = new Date()): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}
