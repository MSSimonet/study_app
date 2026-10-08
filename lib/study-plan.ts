import type { StudyPathData, Task, StatData } from "./types"
import { TOTAL_WEEKS, PROFILE_MAP, TECH_MAP, CATEGORY_MAP, START_DATE, PLAN_VERSION, hoursPerDay } from "./constants"
import { addWorkingDays } from "./date-utils"
import { getRouteTasks, getFase7Tasks, FASE7_WEEK } from "./route"

/**
 * Genera la ruta de 78 semanas (docs/ruta-2026-28.md) más la Fase 7 sin plazo.
 * Las tareas con `track` ("alt" = opción B de la Fase 6, "fase7") van aparte: no suman a horas totales, ritmo ni progreso.
 */
export function generateStudyPlan(): StudyPathData {
  const path: Task[] = []
  let totalEstimatedHours = 0
  let totalEstimatedWorkingDays = 0

  const push = (week: number, index: number, task: ReturnType<typeof getRouteTasks>[number]) => {
    if (!task.track) {
      totalEstimatedHours += task.durationHours
      totalEstimatedWorkingDays += task.durationHours / hoursPerDay(week)
    }
    path.push({
      id: `${week}-${index + 1}`,
      week,
      name: task.name,
      durationHours: task.durationHours,
      loggedHours: 0,
      category: task.category,
      tech: task.tech,
      profile: task.profile,
      progress: 0,
      links: task.links,
      cert: task.cert,
      interest: task.interest,
      track: task.track,
    })
  }

  for (let week = 1; week <= TOTAL_WEEKS; week++) {
    getRouteTasks(week).forEach((task, index) => push(week, index, task))
  }
  getFase7Tasks().forEach((task, index) => push(FASE7_WEEK, index, task))

  return {
    tasks: path,
    planVersion: PLAN_VERSION,
    totalEstimatedHours,
    totalEstimatedWorkingDays: Math.ceil(Math.round(totalEstimatedWorkingDays * 1000) / 1000),
    loggedHours: {},
  }
}

/**
 * Recalculates all progress metrics
 */
export function recalculateProgress(data: StudyPathData): StudyPathData {
  const { tasks, totalEstimatedHours, loggedHours } = data
  let loggedHoursAll = 0
  let currentWeek = TOTAL_WEEKS
  let firstIncompleteFound = false
  let remainingDays = 0

  const techStats: Record<string, StatData> = {}
  Object.entries(TECH_MAP).forEach(([key, value]) => {
    techStats[key] = { ...value, estimated: 0, logged: 0, progress: 0 }
  })

  const profileStats: Record<string, StatData> = {}
  Object.entries(PROFILE_MAP).forEach(([key, value]) => {
    profileStats[key] = { ...value, estimated: 0, logged: 0, progress: 0 }
  })

  const categoryStats: Record<string, StatData> = {}
  Object.entries(CATEGORY_MAP).forEach(([key, value]) => {
    categoryStats[key] = { ...value, estimated: 0, logged: 0, progress: 0 }
  })

  // horas planificadas por semana del plan principal, para el ritmo ideal
  const plannedByWeek: Record<number, number> = {}

  const updatedTasks = tasks.map((task) => {
    const taskLoggedHours = loggedHours[task.id] || 0
    const progress = Math.min(100, Math.round((taskLoggedHours / task.durationHours) * 100))

    // La opción B y la Fase 7 se pueden estudiar y registrar, pero quedan fuera de las métricas del plan
    if (task.track) return { ...task, loggedHours: taskLoggedHours, progress }

    loggedHoursAll += taskLoggedHours
    plannedByWeek[task.week] = (plannedByWeek[task.week] || 0) + task.durationHours

    if (!firstIncompleteFound && progress < 100) {
      currentWeek = task.week
      firstIncompleteFound = true
    }
    remainingDays += Math.max(0, task.durationHours - taskLoggedHours) / hoursPerDay(task.week)

    if (categoryStats[task.category]) {
      categoryStats[task.category].estimated += task.durationHours
      categoryStats[task.category].logged += taskLoggedHours
    }

    task.tech.forEach((t) => {
      if (techStats[t]) {
        techStats[t].estimated += task.durationHours
        techStats[t].logged += taskLoggedHours
      }
    })

    task.profile.forEach((p) => {
      if (profileStats[p]) {
        profileStats[p].estimated += task.durationHours
        profileStats[p].logged += taskLoggedHours
      }
    })

    return { ...task, loggedHours: taskLoggedHours, progress }
  })

  const progressGeneral = Math.min(100, Math.round((loggedHoursAll / totalEstimatedHours) * 100))
  ;[techStats, profileStats, categoryStats].forEach((stats) => {
    Object.values(stats).forEach((stat) => {
      stat.progress = stat.estimated > 0 ? Math.min(100, Math.round((stat.logged / stat.estimated) * 100)) : 0
    })
  })

  const remainingWorkingDays = Math.ceil(Math.round(remainingDays * 1000) / 1000)
  // si todavía no empezó el plan, los días hábiles se cuentan desde el lunes de la semana 1
  const countFrom = new Date(Math.max(Date.now(), START_DATE.getTime() - 864e5))
  const completionDate = addWorkingDays(countFrom, remainingWorkingDays)

  // Ritmo: horas ideales según el calendario, sumando las horas planificadas de cada semana transcurrida
  const elapsedWeeks = Math.min(TOTAL_WEEKS, Math.max(0, (Date.now() - START_DATE.getTime()) / (7 * 864e5)))
  const wholeWeeks = Math.floor(elapsedWeeks)
  let ideal = 0
  for (let w = 1; w <= wholeWeeks; w++) ideal += plannedByWeek[w] || 0
  ideal += (plannedByWeek[wholeWeeks + 1] || 0) * (elapsedWeeks - wholeWeeks)
  const idealHours = Math.round(ideal * 10) / 10
  const hoursDiff = Math.round((loggedHoursAll - idealHours) * 10) / 10
  const calendarWeek = Math.min(TOTAL_WEEKS, Math.max(1, wholeWeeks + 1))
  const certsEarned = updatedTasks.filter((t) => t.cert && t.progress === 100).map((t) => t.cert as string)

  return {
    ...data,
    tasks: updatedTasks,
    loggedHoursAll,
    progressGeneral,
    currentWeek,
    calendarWeek,
    idealHours,
    hoursDiff,
    certsEarned,
    remainingWorkingDays,
    completionDate: completionDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    techStats: Object.values(techStats),
    profileStats: Object.values(profileStats),
    categoryStats: Object.values(categoryStats),
  }
}
