"use client"

import type { StudyPathData } from "@/lib/types"
import { CATEGORY_MAP, CERTIFICATIONS, hoursPerDay } from "@/lib/constants"
import { dateKey, weekStart } from "@/lib/date-utils"

interface TodayPanelProps {
  pathData: StudyPathData
  onLogHours: (taskId: string, hours: number) => void
}

const DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"]

function hoursOn(daily: Record<string, number>, d: Date) {
  return daily[dateKey(d)] || 0
}

/** Racha de días hábiles con ≥0.5h. Hoy aún vacío no rompe la racha; fines de semana vacíos tampoco. */
function computeStreak(daily: Record<string, number>) {
  let streak = 0
  const d = new Date()
  let first = true
  for (let i = 0; i < 400; i++) {
    const h = hoursOn(daily, d)
    const weekend = d.getDay() === 0 || d.getDay() === 6
    if (h >= 0.5) streak++
    else if (!first && !weekend) break
    first = false
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function lastSevenDays(daily: Record<string, number>) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return { label: DAY_LABELS[d.getDay()], hours: hoursOn(daily, d), isToday: i === 6 }
  })
}

export function TodayPanel({ pathData, onLogHours }: TodayPanelProps) {
  const {
    tasks,
    dailyHours = {},
    loggedHoursAll = 0,
    idealHours = 0,
    hoursDiff = 0,
    calendarWeek = 1,
    certsEarned = [],
  } = pathData

  const HOURS_PER_WORKING_DAY = Math.round(hoursPerDay(calendarWeek) * 10) / 10
  const suggested = tasks.find((t) => !t.track && t.progress < 100)
  const today = hoursOn(dailyHours, new Date())
  const streak = computeStreak(dailyHours)
  const days = lastSevenDays(dailyHours)
  const maxDay = Math.max(HOURS_PER_WORKING_DAY, ...days.map((d) => d.hours))

  const status = hoursDiff >= 0 ? "ahead" : hoursDiff > -10 ? "ontrack" : "behind"
  const statusText = hoursDiff >= 0 ? `+${hoursDiff}h adelantado` : hoursDiff > -10 ? "En ritmo" : `${Math.abs(hoursDiff)}h atrasado`
  const statusColor = status === "ahead" ? "text-emerald-400" : status === "ontrack" ? "text-sky-400" : "text-rose-400"

  // Meta de hoy: la base diaria, más 1/7 de lo que se debe, con tope de 1 hora extra
  const goalToday = hoursDiff >= 0 ? HOURS_PER_WORKING_DAY : Math.min(HOURS_PER_WORKING_DAY + Math.abs(hoursDiff) / 7, HOURS_PER_WORKING_DAY + 1)
  const goalLabel = Math.round(goalToday * 10) / 10

  const now = new Date()
  const longDate = now.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
  const wkStart = weekStart(calendarWeek)
  const wkEnd = new Date(wkStart)
  wkEnd.setDate(wkEnd.getDate() + 6)
  const fmt = (d: Date) => d.toLocaleDateString("es-ES", { day: "numeric", month: "short" })

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-sky-500/30">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-white">🎯 Hoy</h2>
          <p className="text-sm text-slate-400 capitalize">{longDate}</p>
          <p className="text-xs text-slate-500 mt-1">
            Semana del calendario: {calendarWeek} ({fmt(wkStart)} – {fmt(wkEnd)})
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-slate-400">Ritmo</div>
          <div className={`text-2xl font-extrabold ${statusColor}`}>{statusText}</div>
        </div>
      </div>

      {suggested ? (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            📚 Estudiar hoy · Semana {suggested.week}
          </div>
          <div className="text-lg font-bold text-white">{suggested.name}</div>
          <div className="text-sm text-slate-400 mt-1">
            {CATEGORY_MAP[suggested.category]?.name ?? suggested.category} · {suggested.loggedHours}h / {suggested.durationHours}h ·{" "}
            {suggested.progress}%
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-3 overflow-hidden">
            <div className="h-2 rounded-full bg-sky-500" style={{ width: `${suggested.progress}%` }} />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => onLogHours(suggested.id, 0.5)}
              className="px-3 py-1.5 rounded-md text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              +30 min
            </button>
            <button
              onClick={() => onLogHours(suggested.id, 1)}
              className="px-3 py-1.5 rounded-md text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              +1 h
            </button>
            <button
              onClick={() => onLogHours(suggested.id, -0.5)}
              disabled={suggested.loggedHours === 0}
              className="px-3 py-1.5 rounded-md text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-rose-300 disabled:opacity-40"
            >
              −30 min
            </button>
            {suggested.links?.[0] && (
              <a
                href={suggested.links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-md text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-sky-300"
              >
                Ir al curso →
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 py-6">🎉 ¡Completaste todo el plan!</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Stat label="Meta hoy" value={`${goalLabel}h`} className="text-amber-400" />
        <Stat label="Estudiado hoy" value={`${today}h`} className="text-sky-400" />
        <Stat label="Total acum." value={`${Math.round(loggedHoursAll * 10) / 10}h`} className="text-emerald-400" />
        <Stat label="Ideal a hoy" value={`${idealHours}h`} className="text-slate-300" />
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-slate-700 pt-4">
        <div className="flex items-end gap-2 flex-1">
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full max-w-8 rounded ${d.isToday ? "ring-2 ring-white" : ""} ${
                  d.hours >= HOURS_PER_WORKING_DAY ? "bg-emerald-500" : d.hours >= 2 ? "bg-amber-400" : d.hours > 0 ? "bg-sky-500" : "bg-slate-700"
                }`}
                style={{ height: `${Math.max(4, Math.round((d.hours / maxDay) * 48))}px` }}
              />
              <div className="text-[10px] text-slate-400">{d.label}</div>
              <div className="text-[9px] text-slate-500 h-3">{d.hours || ""}</div>
            </div>
          ))}
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs uppercase tracking-wider text-slate-400">Racha</div>
          <div className="text-2xl font-extrabold text-orange-400">🔥 {streak}d</div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-4 pt-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Certificaciones</div>
        <div className="flex flex-wrap gap-2">
          {CERTIFICATIONS.map((c) => {
            const earned = certsEarned.includes(c)
            return (
              <span
                key={c}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  earned
                    ? "bg-emerald-900/40 border-emerald-700 text-emerald-300"
                    : "bg-slate-900 border-slate-700 text-slate-400"
                }`}
              >
                {earned ? "🏆" : "○"} {c}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
      <div className={`text-xl font-extrabold ${className}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
    </div>
  )
}
