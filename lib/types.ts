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
  loggedHours: Record<string, number>
  loggedHoursAll?: number
  progressGeneral?: number
  currentWeek?: number
  remainingWorkingDays?: number
  completionDate?: string
  techStats?: StatData[]
  profileStats?: StatData[]
  categoryStats?: StatData[]
}
