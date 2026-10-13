import { START_DATE, TOTAL_WEEKS } from "./constants"
import { ED, ENGLISH_ROUTINE_PREFIX, LLL, SESAME, englishWeek, getRouteCells, type Block } from "./route"

/**
 * Plan diario (sección 4.3 del doc): reparte las tareas de cada semana en sus 7 días con la plantilla de minutos por bloque.
 * Las semanas van de martes a lunes (START_DATE es martes) y se llenan en ese orden.
 *
 * Reglas de reparto de cada bloque:
 *  - las tareas se vierten en orden sobre sus huecos; si una no termina, sigue en el próximo hueco del bloque;
 *  - si el bloque tiene hueco el sábado, ese día van primero los laboratorios y proyectos;
 *  - en la semana de un examen, lo que lo prepara va antes del sábado, el examen ocupa el sábado y el domingo y el lunes
 *    siguen con la tarea siguiente. Si el examen dura más que el hueco del sábado (Aptis, PL-300 y alemán A2), ese
 *    sábado se alarga y los demás huecos del bloque se acortan en proporción: la semana suma lo mismo;
 *  - el hueco de inglés se muestra como la rutina de la sección 3.1, con sus pasos, minutos y enlaces.
 */

export const BLOCK_LABEL: Record<Block, string> = {
  ingles: "Inglés",
  aleman: "Alemán",
  soporte: "Soporte y sistemas",
  datos: "Datos",
  empleo: "Empleo",
  ampliacion: "Ampliación",
  gallego: "Gallego",
}

/** Minutos por bloque de cada día de la semana (índice de Date.getDay(): 0 = domingo) */
type DayTemplate = Partial<Record<Block, number>>
type WeekTemplate = Record<number, DayTemplate>

const F1A: WeekTemplate = {
  1: { ingles: 60, soporte: 120 },
  2: { ingles: 60, datos: 120 },
  3: { ingles: 60, soporte: 120 },
  4: { ingles: 60, datos: 120 },
  5: { ingles: 60, soporte: 120 },
  6: { ingles: 60, empleo: 60, ampliacion: 90 },
  0: { empleo: 60, ampliacion: 30 },
}
const F1B: WeekTemplate = {
  ...F1A,
  4: { ingles: 60, datos: 60, empleo: 60 },
  5: { ingles: 60, soporte: 60, empleo: 60 },
}
// mudanza: de lunes a viernes, 1 h de sistemas, datos o empleo, alternando
const MUDANZA: WeekTemplate = {
  1: { soporte: 60 },
  2: { datos: 60 },
  3: { empleo: 60 },
  4: { soporte: 60 },
  5: { empleo: 60 },
  6: { ingles: 60, soporte: 120 },
  0: { ingles: 60, datos: 60 },
}
const F2: WeekTemplate = {
  1: { ingles: 30, aleman: 30, soporte: 60 },
  2: { ingles: 30, aleman: 30, datos: 60 },
  3: { ingles: 30, aleman: 30, soporte: 60 },
  4: { ingles: 30, aleman: 30, datos: 60 },
  5: { ingles: 30, aleman: 30, soporte: 60 },
  6: { ingles: 30, soporte: 180, datos: 90 },
  0: { ingles: 60, aleman: 30, soporte: 60, datos: 90, gallego: 60 },
}
const F2B: WeekTemplate = {
  ...F2,
  0: { aleman: 30, soporte: 60, datos: 90, gallego: 60, empleo: 60 },
}

/** Plantilla de la sección 4.3 que corresponde a una semana */
export function templateOfWeek(week: number): WeekTemplate {
  if (week <= 26) return F1A
  if (week <= 39) return F1B
  if (week <= 43) return MUDANZA
  if (week <= 91) return F2
  return F2B
}

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const BLOCKS: Block[] = ["ingles", "aleman", "soporte", "datos", "empleo", "ampliacion", "gallego"]
const SATURDAY = 6

export interface RoutineStep {
  label: string
  minutes: number
  link?: string
}

export interface DayItem {
  block: Block
  blockLabel: string
  /** id de la tarea en el plan (`semana-posición`), para registrar horas */
  taskId: string
  task: string
  minutes: number
  links: string[]
  /** pasos de la rutina de inglés (sección 3.1) */
  steps?: RoutineStep[]
}

export interface DayPlan {
  date: Date
  week: number
  dayName: string
  items: DayItem[]
  totalMinutes: number
}

interface Piece {
  taskId: string
  name: string
  links: string[]
  left: number
  /** laboratorio o proyecto: va al sábado */
  saturday: boolean
  exam: boolean
  routine: boolean
}

/** Pasos de la rutina de inglés de la sección 3.1 para un hueco de `minutes` minutos */
function englishSteps(week: number, saturday: boolean, minutes: number): RoutineStep[] {
  const e = englishWeek(week)
  const main = e.platzi.links[0]
  if (saturday && minutes >= 30) {
    return [
      { label: "Revista Discoveries en tu nivel (English Discoveries)", minutes: minutes / 2, link: ED },
      { label: e.sabado.label, minutes: minutes / 2, link: e.sabado.link },
    ]
  }
  if (minutes >= 60) {
    return [
      { label: `${e.platzi.label}: 2–3 clases`, minutes: 25, link: main },
      { label: "Little Language Lessons: Tiny Lesson con la situación del día", minutes: 10, link: LLL },
      { label: "Sesame: juego de roles con la gramática de la clase", minutes: 20, link: SESAME },
      { label: "Escribir 3 frases en inglés sobre el ticket o la tarea técnica del día", minutes: 5 },
    ]
  }
  if (minutes >= 30) {
    return [
      { label: `${e.platzi.label}: 1–2 clases`, minutes: 15, link: main },
      { label: "Little Language Lessons: Tiny Lesson con la situación del día", minutes: 5, link: LLL },
      { label: "Sesame: juego de roles con la gramática de la clase", minutes: 10, link: SESAME },
    ]
  }
  return [{ label: e.platzi.label, minutes, link: main }]
}

/** Primer día (martes) de la semana `week` */
function weekFirstDay(week: number): Date {
  const d = new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate())
  d.setDate(d.getDate() + (week - 1) * 7)
  return d
}

/** Reparte `total` minutos en huecos proporcionales a `sizes` (en múltiplos de 5 min) */
function scaleSlots(sizes: number[], total: number): number[] {
  const cap = sizes.reduce((a, b) => a + b, 0)
  if (total > cap) throw new Error(`Plan diario: ${total} min no caben en ${cap} min de huecos`)
  if (cap === 0) return sizes
  const scaled = sizes.map((s) => Math.floor((s * total) / cap / 5) * 5)
  let rest = total - scaled.reduce((a, b) => a + b, 0)
  for (let i = 0; rest > 0; i = (i + 1) % sizes.length) {
    if (scaled[i] < sizes[i]) {
      scaled[i] += 5
      rest -= 5
    }
  }
  return scaled
}

const WEEK_CACHE: Record<number, DayPlan[]> = {}

/** Los 7 días de una semana (1–104), de martes a lunes */
export function getWeekPlan(week: number): DayPlan[] {
  if (WEEK_CACHE[week]) return WEEK_CACHE[week]
  const template = templateOfWeek(week)
  const days: DayPlan[] = Array.from({ length: 7 }, (_, i) => {
    const date = weekFirstDay(week)
    date.setDate(date.getDate() + i)
    return { date, week, dayName: DAY_NAMES[date.getDay()], items: [], totalMinutes: 0 }
  })
  const satIndex = days.findIndex((d) => d.date.getDay() === SATURDAY)

  // colas de cada bloque, en el orden de la ruta
  const queues: Partial<Record<Block, Piece[]>> = {}
  getRouteCells(week).forEach((cell, index) => {
    const t = cell.task
    const exam = !!t.cert && /examen/i.test(t.name)
    ;(queues[cell.block] ??= []).push({
      taskId: `${week}-${index + 1}`,
      name: t.name,
      links: t.links ?? [],
      left: Math.round(t.durationHours * 60),
      saturday: !exam && (t.category === "practica" || /laborator|proyecto/i.test(t.name)),
      exam,
      routine: t.name.startsWith(ENGLISH_ROUTINE_PREFIX),
    })
  })

  const put = (day: DayPlan, block: Block, piece: Piece, minutes: number) => {
    piece.left -= minutes
    day.items.push({
      block,
      blockLabel: BLOCK_LABEL[block],
      taskId: piece.taskId,
      task: piece.routine ? "Rutina de inglés" : piece.name,
      minutes,
      links: piece.links,
      steps: piece.routine ? englishSteps(week, day.date.getDay() === SATURDAY, minutes) : undefined,
    })
    day.totalMinutes += minutes
  }
  /** Vierte las piezas, en orden, sobre los huecos dados (minutos por día) */
  const fill = (block: Block, pieces: Piece[], slots: number[], dayIndexes: number[]) => {
    dayIndexes.forEach((d, k) => {
      let slot = slots[k]
      while (slot > 0) {
        const piece = pieces.find((p) => p.left > 0)
        if (!piece) throw new Error(`Plan diario: al bloque ${block} le faltan tareas en la semana ${week}`)
        const minutes = Math.min(slot, piece.left)
        put(days[d], block, piece, minutes)
        slot -= minutes
      }
    })
  }

  for (const block of BLOCKS) {
    const queue = queues[block] ?? []
    const slotOf = (d: number) => template[days[d].date.getDay()]?.[block] ?? 0
    const examAt = queue.findIndex((p) => p.exam)

    if (examAt >= 0) {
      // semana de examen: preparación antes del sábado, examen el sábado y tarea siguiente después
      const before = queue.slice(0, examAt)
      const after = queue.slice(examAt + 1)
      const pre = days.map((_, i) => i).filter((i) => i < satIndex)
      const post = days.map((_, i) => i).filter((i) => i > satIndex)
      const minutesOf = (ps: Piece[]) => ps.reduce((s, p) => s + p.left, 0)
      fill(block, before, scaleSlots(pre.map(slotOf), minutesOf(before)), pre)
      put(days[satIndex], block, queue[examAt], queue[examAt].left)
      fill(block, after, scaleSlots(post.map(slotOf), minutesOf(after)), post)
    } else {
      const hasSaturday = slotOf(satIndex) > 0
      let current: Piece | undefined
      days.forEach((day, d) => {
        let slot = slotOf(d)
        while (slot > 0) {
          const pending = queue.filter((p) => p.left > 0)
          if (pending.length === 0) throw new Error(`Plan diario: al bloque ${block} le faltan tareas en la semana ${week}`)
          // con hueco el sábado: ese día van primero laboratorios y proyectos; los demás días siguen con la tarea a
          // medias y, si no hay, con la primera que no es de sábado
          let piece: Piece
          if (!hasSaturday) piece = pending[0]
          else if (d === satIndex) piece = pending.find((p) => p.saturday) ?? pending[0]
          else piece = current && current.left > 0 ? current : (pending.find((p) => !p.saturday) ?? pending[0])
          current = piece
          const minutes = Math.min(slot, piece.left)
          put(day, block, piece, minutes)
          slot -= minutes
        }
      })
    }
    const rest = queue.reduce((s, p) => s + p.left, 0)
    if (rest > 0) throw new Error(`Plan diario: al bloque ${block} le sobran ${rest} min en la semana ${week}`)
  }

  WEEK_CACHE[week] = days
  return days
}

/** Semana del plan (1–104) de una fecha; 0 antes del inicio y TOTAL_WEEKS + 1 después del final */
export function weekOfDate(date: Date): number {
  const start = new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate())
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diff = Math.round((day.getTime() - start.getTime()) / 864e5)
  if (diff < 0) return 0
  return Math.min(TOTAL_WEEKS + 1, Math.floor(diff / 7) + 1)
}

/** Plan de un día; null si la fecha cae fuera de las 104 semanas */
export function getDayPlan(date: Date): DayPlan | null {
  const week = weekOfDate(date)
  if (week < 1 || week > TOTAL_WEEKS) return null
  return getWeekPlan(week).find((d) => d.date.toDateString() === date.toDateString()) ?? null
}

/** Los 728 días del plan */
export function getAllDays(): DayPlan[] {
  return Array.from({ length: TOTAL_WEEKS }, (_, i) => getWeekPlan(i + 1)).flat()
}

const csvField = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
const isoDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

/** CSV del plan diario: una fila por bloque y día (separador «;», para Excel en español) */
export function dailyPlanCsv(): string {
  const header = ["fecha", "semana", "día", "bloque", "tarea", "minutos", "enlaces"]
  const rows: (string | number)[][] = []
  for (const day of getAllDays()) {
    for (const block of BLOCKS) {
      const items = day.items.filter((i) => i.block === block)
      if (items.length === 0) continue
      const task = items.map((i) => (i.steps ? `${i.task}: ${i.steps.map((s) => `${s.label} (${s.minutes} min)`).join(" · ")}` : i.task)).join(" + ")
      const links = [...new Set(items.flatMap((i) => (i.steps ? i.steps.flatMap((s) => (s.link ? [s.link] : [])) : i.links)))]
      rows.push([isoDate(day.date), day.week, day.dayName, BLOCK_LABEL[block], task, items.reduce((s, i) => s + i.minutes, 0), links.join(" ")])
    }
  }
  return [header, ...rows].map((r) => r.map(csvField).join(";")).join("\r\n")
}
