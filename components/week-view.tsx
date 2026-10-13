"use client"

import { useState, type ReactNode } from "react"
import type { StudyPathData } from "@/lib/types"
import type { Block } from "@/lib/route"
import { TOTAL_WEEKS } from "@/lib/constants"
import { type DayItem, dailyPlanCsv, getWeekPlan, weekOfDate } from "@/lib/daily-plan"

/** Clases de cada bloque (literales, para que Tailwind las genere) */
export const BLOCK_CLASSES: Record<Block, { border: string; text: string }> = {
  ingles: { border: "border-emerald-500", text: "text-emerald-400" },
  aleman: { border: "border-yellow-500", text: "text-yellow-400" },
  soporte: { border: "border-amber-500", text: "text-amber-400" },
  datos: { border: "border-sky-500", text: "text-sky-400" },
  empleo: { border: "border-pink-500", text: "text-pink-400" },
  ampliacion: { border: "border-violet-500", text: "text-violet-400" },
  gallego: { border: "border-rose-500", text: "text-rose-400" },
}

/** Nombre corto del sitio de un enlace */
export function linkLabel(url: string): string {
  const host = new URL(url).hostname.replace(/^www\./, "")
  if (host === "platzi.com") return "Platzi"
  if (host === "netacad.com") return "Cisco"
  if (host === "learn.microsoft.com") return "Microsoft Learn"
  if (host === "microsoft.com" || host === "azure.microsoft.com") return "Microsoft"
  if (host === "labs.google") return "Little Language Lessons"
  if (host === "app.sesame.com") return "Sesame"
  if (host === "ed.engdis.com") return "English Discoveries"
  if (host.endsWith("skilljar.com")) return "Anthropic"
  if (host.endsWith("vhs-lernportal.de")) return "vhs-Lernportal"
  return host
}

export function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${m} min`
}

function LinkChip({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-700 hover:bg-slate-600 text-sky-300"
    >
      {linkLabel(url)} →
    </a>
  )
}

/** Una tarea del plan diario: bloque, minutos, tarea, enlaces y, en inglés, los pasos de la rutina */
export function DayItemView({ item, action }: { item: DayItem; action?: ReactNode }) {
  const style = BLOCK_CLASSES[item.block]
  return (
    <li className={`border-l-4 ${style.border} pl-3`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className={`text-[11px] font-bold uppercase tracking-wider ${style.text}`}>
            {item.blockLabel} · {formatMinutes(item.minutes)}
          </div>
          <div className="text-sm text-white">{item.task}</div>
        </div>
        {action}
      </div>
      {item.steps ? (
        <ul className="mt-1 space-y-1">
          {item.steps.map((s, i) => (
            <li key={i} className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="text-slate-500 w-12 shrink-0">{s.minutes} min</span>
              <span>{s.label}</span>
              {s.link && <LinkChip url={s.link} />}
            </li>
          ))}
        </ul>
      ) : (
        item.links.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.links.map((url) => (
              <LinkChip key={url} url={url} />
            ))}
          </div>
        )
      )}
    </li>
  )
}

function downloadCsv() {
  const blob = new Blob(["﻿" + dailyPlanCsv()], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "plan-diario-2026-2028.csv"
  a.click()
  URL.revokeObjectURL(url)
}

interface WeekViewProps {
  pathData: StudyPathData
}

export function WeekView({ pathData }: WeekViewProps) {
  const todayWeek = weekOfDate(new Date())
  const [week, setWeek] = useState(Math.min(TOTAL_WEEKS, Math.max(1, todayWeek || pathData.calendarWeek || 1)))
  const days = getWeekPlan(week)
  const total = days.reduce((s, d) => s + d.totalMinutes, 0)
  const today = new Date().toDateString()
  const fmt = (d: Date) => d.toLocaleDateString("es-ES", { day: "numeric", month: "short" })

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Plan semanal</h2>
          <p className="text-slate-400 text-sm mt-1">
            Semana {week}: {fmt(days[0].date)} – {fmt(days[6].date)} · {formatMinutes(total)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setWeek((w) => Math.max(1, w - 1))}
            disabled={week === 1}
            className="px-3 py-2 rounded-lg font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40"
            aria-label="Semana anterior"
          >
            ‹
          </button>
          <select
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="px-3 py-2 rounded-lg text-sm bg-slate-800 border border-slate-700 text-white"
            aria-label="Semana"
          >
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((w) => (
              <option key={w} value={w}>
                Semana {w}
              </option>
            ))}
          </select>
          <button
            onClick={() => setWeek((w) => Math.min(TOTAL_WEEKS, w + 1))}
            disabled={week === TOTAL_WEEKS}
            className="px-3 py-2 rounded-lg font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40"
            aria-label="Semana siguiente"
          >
            ›
          </button>
          <button
            onClick={downloadCsv}
            className="px-3 py-2 rounded-lg font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            Descargar plan diario (CSV)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`p-3 rounded-xl bg-slate-800 ${day.date.toDateString() === today ? "border-2 border-indigo-500" : "border border-slate-700"}`}
          >
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <div className="text-sm font-bold text-white">{day.dayName}</div>
                <div className="text-xs text-slate-400">{fmt(day.date)}</div>
              </div>
              <div className="text-xs font-semibold text-slate-300">{formatMinutes(day.totalMinutes)}</div>
            </div>
            <ul className="space-y-3">
              {day.items.map((item, i) => (
                <DayItemView key={i} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
