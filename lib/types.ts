/** Prioridad de un tema según la demanda en ofertas; sin valor = interés alto */
export type Interest = "media" | "baja"

/**
 * Tareas fuera del plan principal de 78 semanas (no suman a horas totales, ritmo ni progreso):
 *  - "alt":   alternativa de la Fase 6 (opción B, ciberseguridad); se hace una de las dos opciones
 *  - "fase7": temas para después de los 18 meses, sin plazo
 */
export type TaskTrack = "alt" | "fase7"

export interface Task {
  id: string
  week: number
  name: string
  durationHours: number
  loggedHours: number
  category: string
  tech: string[]
  profile: string[]
  progress: number
  links?: string[]
  cert?: string
  interest?: Interest
  track?: TaskTrack
}

export interface ColorConfig {
  name: string
  color: string
}

export interface StatData extends ColorConfig {
  estimated: number
  logged: number
  progress: number
}

export interface StudyPathData {
  tasks: Task[]
  totalEstimatedHours: number
  totalEstimatedWorkingDays: number
  /** versión del plan con el que se generaron los ids de `loggedHours` */
  planVersion?: number
  loggedHours: Record<string, number>
  dailyHours?: Record<string, number>
  loggedHoursAll?: number
  progressGeneral?: number
  currentWeek?: number
  calendarWeek?: number
  idealHours?: number
  hoursDiff?: number
  certsEarned?: string[]
  remainingWorkingDays?: number
  completionDate?: string
  techStats?: StatData[]
  profileStats?: StatData[]
  categoryStats?: StatData[]
}
