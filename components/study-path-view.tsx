"use client"

import type { StudyPathData } from "@/lib/types"
import { HourActionButton } from "@/components/ui/hour-action-button"
import { weekStart } from "@/lib/date-utils"
import { PROFILE_MAP, TECH_MAP, CATEGORY_MAP, PHASE_MAP } from "@/lib/constants"

interface StudyPathViewProps {
  pathData: StudyPathData
  onLogHours: (taskId: string, hours: number) => void
}

export function StudyPathView({ pathData, onLogHours }: StudyPathViewProps) {
  const { tasks, currentWeek = 1 } = pathData

  const weeks = tasks.reduce<Record<number, { week: number; tasks: typeof tasks }>>((acc, task) => {
    if (!acc[task.week]) {
      acc[task.week] = { week: task.week, tasks: [] }
    }
    acc[task.week].tasks.push(task)
    return acc
  }, {})

  const getWeekPhase = (week: number) => {
    if (week <= 13) return 1
    if (week <= 26) return 2
    if (week <= 39) return 3
    return 4
  }

  let currentDisplayPhase = 0

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-extrabold text-white mb-6">Ruta de Estudio Detallada</h2>
      <p className="text-slate-400 mb-8">Plan completo de 52 semanas, del {weekStart(1).toLocaleDateString("es-ES", { month: "long", year: "numeric" })} al {weekStart(53).toLocaleDateString("es-ES", { month: "long", year: "numeric" })} (Lunes a Viernes)</p>
      <div className="space-y-8">
        {Object.values(weeks).map((weekObj) => {
          const isCurrentWeek = weekObj.week === currentWeek
          const isFutureWeek = weekObj.week > currentWeek
          const weeklyHoursTotal = weekObj.tasks.reduce((sum, task) => sum + task.durationHours, 0)
          const weekPhase = getWeekPhase(weekObj.week)

          const showPhaseHeader = weekPhase !== currentDisplayPhase
          if (showPhaseHeader) {
            currentDisplayPhase = weekPhase
          }

          return (
            <div key={weekObj.week}>
              {showPhaseHeader && (
                <div
                  className={`mb-6 p-4 rounded-lg bg-${PHASE_MAP[weekPhase].color.split("-")[0]}-900/30 border-l-4 border-${PHASE_MAP[weekPhase].color}`}
                >
                  <h3 className={`text-lg font-bold text-${PHASE_MAP[weekPhase].color.split("-")[0]}-400`}>
                    {PHASE_MAP[weekPhase].name}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {weekPhase === 1 && "Python, SQL, Excel, Estadística básica, Git, Claude, Google DA (inicio)"}
                    {weekPhase === 2 && "EDA, Visualización, Power BI, Tableau, Google DA, AI-900, Claude Code"}
                    {weekPhase === 3 && "ML, Claude API y MCP, Google Advanced DA"}
                    {weekPhase === 4 && "Big Data, Cloud, IA, PL-300, Portfolio, Job Hunting"}
                  </p>
                </div>
              )}

              {/* Week Card */}
              <div
                className={`p-6 rounded-xl shadow-xl transition-all duration-300 ${
                  isCurrentWeek ? "bg-slate-700 border-2 border-indigo-500" : "bg-slate-800 border border-slate-700"
                } ${isFutureWeek ? "opacity-40" : ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${isCurrentWeek ? "text-indigo-300" : "text-white"}`}>
                    Semana {weekObj.week}
                    <span className="ml-3 text-sm font-normal text-slate-400">
                      {weekStart(weekObj.week).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </h3>
                  <span className={`text-sm font-semibold ${isCurrentWeek ? "text-indigo-300" : "text-slate-400"}`}>
                    {weeklyHoursTotal}h (Carga Semanal)
                  </span>
                </div>

                <div className="space-y-4">
                  {weekObj.tasks.map((task) => {
                    const isActive = isCurrentWeek
                    const isCompleted = task.progress === 100

                    const primaryColorKey = task.profile[0] || task.tech[0]
                    const primaryColor = primaryColorKey
                      ? PROFILE_MAP[primaryColorKey]?.color || TECH_MAP[primaryColorKey]?.color
                      : CATEGORY_MAP[task.category]?.color
                    const baseColor = primaryColor ? primaryColor.split("-")[0] : "gray"

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg border ${
                          isCompleted ? "border-emerald-600 bg-slate-900/50" : "border-slate-600 bg-slate-900"
                        }`}
                      >
                        {/* Task header with buttons */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 min-w-0 mr-4">
                            <div
                              className={`text-sm font-semibold text-white ${isCompleted ? "line-through opacity-70" : ""}`}
                            >
                              {task.name}
                            </div>
                            <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mt-1">
                              <span className={`text-${baseColor}-400 font-medium`}>
                                {task.durationHours}h Estimadas
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-mono bg-${CATEGORY_MAP[task.category]?.color.split("-")[0]}-900 text-${CATEGORY_MAP[task.category]?.color.split("-")[0]}-400`}
                              >
                                {CATEGORY_MAP[task.category]?.name}
                              </span>
                              {/* Tech badges */}
                              {task.tech.map((t) => (
                                <span
                                  key={t}
                                  className={`px-2 py-0.5 rounded-full text-xs font-mono bg-${TECH_MAP[t]?.color.split("-")[0]}-900 text-${TECH_MAP[t]?.color.split("-")[0]}-400`}
                                >
                                  {TECH_MAP[t]?.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="w-16 text-right">
                              <span className={`text-sm font-bold ${isCompleted ? "text-emerald-400" : "text-white"}`}>
                                {task.loggedHours}h
                              </span>
                              <span className="block text-xs text-slate-500">{task.progress}%</span>
                            </div>

                            <HourActionButton
                              taskId={task.id}
                              hours={-1}
                              onClick={onLogHours}
                              isDisabled={!isActive || isFutureWeek}
                            />
                            <HourActionButton
                              taskId={task.id}
                              hours={1}
                              onClick={onLogHours}
                              isDisabled={!isActive || isFutureWeek || isCompleted}
                            />
                          </div>
                        </div>

                        {task.links && task.links.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <div className="flex flex-wrap gap-2">
                              {task.links.map((link, index) => {
                                // Extract platform name from URL
                                const getPlatformInfo = (url: string) => {
                                  if (url.includes("platzi.com")) return { name: "Platzi", color: "emerald" }
                                  if (url.includes("santander")) return { name: "Santander Academy", color: "red" }
                                  if (url.includes("mit")) return { name: "MIT", color: "purple" }
                                  return { name: "Recurso", color: "blue" }
                                }

                                const platform = getPlatformInfo(link)

                                return (
                                  <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-${platform.color}-900/40 text-${platform.color}-400 border border-${platform.color}-800 hover:bg-${platform.color}-900/60 hover:border-${platform.color}-700 transition-all duration-200`}
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                    <span>{platform.name}</span>
                                  </a>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
