import type { StudyPathData } from "@/lib/types"
import { ProgressBar } from "@/components/ui/progress-bar"
import { MetricCard } from "@/components/ui/metric-card"
import { HOURS_PER_WORKING_DAY, PHASE_MAP } from "@/lib/constants"
import { formatHours } from "@/lib/date-utils"

interface DashboardViewProps {
  pathData: StudyPathData
}

export function DashboardView({ pathData }: DashboardViewProps) {
  const {
    progressGeneral = 0,
    remainingWorkingDays = 0,
    completionDate = "",
    techStats = [],
    profileStats = [],
    categoryStats = [],
    loggedHoursAll = 0,
    totalEstimatedHours = 0,
    currentWeek = 1,
  } = pathData

  const totalWeeks = pathData.tasks.reduce((max, task) => Math.max(max, task.week), 0)

  const getCurrentPhase = (week: number) => {
    if (week <= 13) return 1
    if (week <= 26) return 2
    if (week <= 39) return 3
    return 4
  }

  const currentPhase = getCurrentPhase(currentWeek)
  const currentPhaseInfo = PHASE_MAP[currentPhase]

  return (
    <div className="p-4 sm:p-8 space-y-10">
      {/* General Progress */}
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border-t-4 border-indigo-500">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Progreso General del Plan</h2>
        <p className="text-slate-400 mb-6">
          Plan DATA/BI Specialist - 3 horas diarias (15 horas por semana) - 52 semanas totales
        </p>
        <ProgressBar
          label={`${formatHours(loggedHoursAll, HOURS_PER_WORKING_DAY)} completadas de ${formatHours(totalEstimatedHours, HOURS_PER_WORKING_DAY)} en total.`}
          progress={progressGeneral}
          color="indigo-500"
        />
        <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
          <p className={`text-sm font-semibold text-${currentPhaseInfo.color.split("-")[0]}-400`}>
            {currentPhaseInfo.name}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Carga Semanal Uniforme" value="15 Horas" icon="⏳" color="purple-500" />
        <MetricCard title="Días Hábiles Restantes" value={remainingWorkingDays} icon="🗓️" color="amber-500" />
        <MetricCard title="Fecha de Fin Proyectada" value={completionDate} icon="🏁" color="emerald-500" />
        <MetricCard title="Semana Actual" value={`Semana ${currentWeek} / ${totalWeeks}`} icon="🗺️" color="sky-500" />
      </div>

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Progreso por Fase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(PHASE_MAP).map(([phaseNum, phase]) => {
            const phaseNumber = Number.parseInt(phaseNum)
            const phaseWeeks =
              phaseNumber === 1
                ? { start: 1, end: 13 }
                : phaseNumber === 2
                  ? { start: 14, end: 26 }
                  : phaseNumber === 3
                    ? { start: 27, end: 39 }
                    : { start: 40, end: 52 }

            const phaseTasks = pathData.tasks.filter(
              (task) => task.week >= phaseWeeks.start && task.week <= phaseWeeks.end,
            )
            const phaseEstimated = phaseTasks.reduce((sum, task) => sum + task.durationHours, 0)
            const phaseLogged = phaseTasks.reduce((sum, task) => sum + task.loggedHours, 0)
            const phaseProgress = phaseEstimated > 0 ? Math.round((phaseLogged / phaseEstimated) * 100) : 0

            const isCurrentPhase = phaseNumber === currentPhase
            const isCompleted = phaseProgress === 100
            const isFuture = currentWeek < phaseWeeks.start

            return (
              <div
                key={phaseNum}
                className={`p-4 rounded-lg transition-all ${
                  isCurrentPhase
                    ? "bg-slate-700 border-2 border-indigo-500"
                    : isCompleted
                      ? "bg-emerald-900/30 border border-emerald-700"
                      : isFuture
                        ? "bg-slate-800/50 border border-slate-700 opacity-50"
                        : "bg-slate-800 border border-slate-700"
                }`}
              >
                <div className="text-xs text-slate-400 mb-1">Fase {phaseNum}</div>
                <div className={`text-sm font-semibold text-${phase.color.split("-")[0]}-400 mb-2`}>
                  Semanas {phaseWeeks.start}-{phaseWeeks.end}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{phaseProgress}%</span>
                  <span className="text-xs text-slate-500">
                    {phaseLogged}h / {phaseEstimated}h
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
        {/* Profiles & Technology */}
        <div className="space-y-6 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">
            Progreso por Rol/Tecnología
          </h3>

          <h4 className="text-sm font-semibold text-slate-400 uppercase mt-4">Perfiles de Trabajo</h4>
          {profileStats.map((stat) => (
            <ProgressBar
              key={stat.name}
              label={stat.name}
              progress={stat.progress}
              color={stat.color}
              estimated={stat.estimated}
              logged={stat.logged}
            />
          ))}

          <h4 className="text-sm font-semibold text-slate-400 uppercase mt-8">Tecnologías Principales</h4>
          {techStats.map((stat) => (
            <ProgressBar
              key={stat.name}
              label={stat.name}
              progress={stat.progress}
              color={stat.color}
              estimated={stat.estimated}
              logged={stat.logged}
            />
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-6 bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">
            Progreso por Categoría de Estudio
          </h3>

          {categoryStats.map((stat) => (
            <ProgressBar
              key={stat.name}
              label={stat.name}
              progress={stat.progress}
              color={stat.color}
              estimated={stat.estimated}
              logged={stat.logged}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
