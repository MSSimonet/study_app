import type { ColorConfig } from "./types"
import { getWeeklyHours } from "./route"

// Ruta de 24 meses v3 (docs/ruta-24-meses-2026-28.md): 20 h fijas por semana, salvo 10 h en la mudanza (semanas 40–43).
// Las horas reales de cada semana salen del plan (ver lib/route.ts) y su reparto por días, de lib/daily-plan.ts.
export const TOTAL_WEEKS = 104
export const HOURS_PER_WEEK = 20

/** Horas por día hábil (lunes a viernes) de una semana, según lo planificado en ella */
export function hoursPerDay(week: number): number {
  return (getWeeklyHours(week) || HOURS_PER_WEEK) / 5
}

// Primer día de la semana 1 (lunes 26/10/2026): las semanas del plan van de lunes a domingo.
export const START_DATE = new Date(2026, 9, 26)
export const LOCAL_STORAGE_KEY = "studyPathLocal"
/** Sube cuando cambian los ids de las tareas (semana-posición), para no mezclar horas guardadas de otro plan */
export const PLAN_VERSION = 5

export const PROFILE_MAP: Record<string, ColorConfig> = {
  it: { name: "Soporte IT", color: "amber-500" },
  sys: { name: "Administración de Sistemas", color: "blue-500" },
  da: { name: "Data Analyst", color: "sky-500" },
  bi: { name: "Business Intelligence", color: "violet-500" },
  ml: { name: "Machine Learning", color: "fuchsia-500" },
  de: { name: "Data Engineer", color: "cyan-500" },
  ds: { name: "Data Scientist", color: "rose-500" },
}

export const TECH_MAP: Record<string, ColorConfig> = {
  windows: { name: "Windows, AD y M365", color: "blue-500" },
  linux: { name: "Linux y PowerShell", color: "lime-500" },
  redes: { name: "Redes", color: "indigo-500" },
  seguridad: { name: "Ciberseguridad", color: "red-500" },
  python: { name: "Python", color: "blue-500" },
  sql: { name: "SQL", color: "teal-500" },
  excel: { name: "Excel", color: "green-500" },
  powerbi: { name: "Power BI", color: "yellow-500" },
  tableau: { name: "Tableau", color: "orange-500" },
  ml: { name: "Machine Learning", color: "fuchsia-500" },
  cloud: { name: "Cloud (AWS/Azure)", color: "cyan-500" },
  ia: { name: "IA Generativa", color: "purple-500" },
}

export const CATEGORY_MAP: Record<string, ColorConfig> = {
  soporte: { name: "Soporte IT", color: "amber-600" },
  sistemas: { name: "Sistemas y Cloud", color: "blue-600" },
  seguridad: { name: "Ciberseguridad", color: "red-600" },
  fundamentos: { name: "Fundamentos", color: "indigo-600" },
  practica: { name: "Práctica", color: "red-600" },
  ingles: { name: "Inglés", color: "emerald-600" },
  aleman: { name: "Alemán", color: "yellow-600" },
  consolidacion: { name: "Consolidación", color: "amber-600" },
  empleabilidad: { name: "Empleabilidad", color: "pink-600" },
  certificacion: { name: "Certificación", color: "purple-600" },
  claude: { name: "Claude / Anthropic", color: "orange-600" },
  python_avanzado: { name: "Python Avanzado", color: "blue-600" },
  analisis: { name: "Análisis", color: "teal-600" },
  bi: { name: "Business Intelligence", color: "violet-600" },
  ml: { name: "Machine Learning", color: "fuchsia-600" },
  ingenieria: { name: "Ingeniería de Datos", color: "cyan-600" },
  ia: { name: "IA Generativa", color: "purple-500" },
  negocio: { name: "Negocio, finanzas y ERP", color: "lime-600" },
  idiomas: { name: "Otros idiomas", color: "rose-600" },
}

/** En orden de la ruta (Aptis en la semana 78, AZ-104 en la 88, alemán A2 en la 104); desde "ITIL Foundation" son de la Fase 7 */
export const CERTIFICATIONS = [
  "SQL y MySQL (Platzi)",
  "Inglés A2 (Platzi)",
  "MD-102",
  "PL-300 Power BI",
  "Aptis B2",
  "AZ-104 Azure Administrator",
  "Alemán A2 (opcional)",
  "ITIL Foundation",
  "AZ-900 Azure Fundamentals",
  "AB-900",
  "AI-901 Azure AI Fundamentals",
  "Google Data Analytics",
  "Google Advanced DA",
  "Alemán B1 (ÖSD o Goethe)",
]

export interface PhaseInfo {
  name: string
  color: string
  /** semanas inclusivas; sin valor = sin plazo */
  weeks?: [number, number]
  summary: string
  milestone?: string
}

export const PHASE_MAP: Record<number, PhaseInfo> = {
  1: {
    name: "FASE 1: Soporte y datos en paralelo",
    color: "indigo-500",
    weeks: [1, 26],
    summary:
      "Hardware, sistemas operativos, redes, seguridad básica, GLPI, Active Directory, PowerShell, M365 e Intune (P1, P2) · Excel, SQL, Power BI y DAX (P4a, P4b) · inglés hacia B1 · CV, LinkedIn y postulaciones desde la semana 9 · Git, Claude y SQL avanzado",
    milestone: "Semana 26: P1, P2 v1, P4a v1 y P4b publicados; punto de control de inglés B1",
  },
  2: {
    name: "FASE 2: Búsqueda intensiva",
    color: "sky-500",
    weeks: [27, 39],
    summary:
      "Career Path de Cisco, 10 incidencias y 5 artículos, P3 en Packet Tracer, Linux, Intune, P1 con scripts · SQL en HackerRank y LeetCode, P4a v2 · 10 postulaciones por semana, simulacros sin IA, Scrum y Jira · portfolio web",
    milestone: "Semana 39: P1–P4 publicados, inglés B1, 150–250 postulaciones; idealmente, primer empleo",
  },
  3: {
    name: "FASE 3: Mudanza y MD-102",
    color: "violet-500",
    weeks: [40, 60],
    summary:
      "Semanas 40–43 a 10 h: trámites en Galicia y postulaciones · MD-102 (Intune) y Seguridad de Terminales · Power BI avanzado, contabilidad, ERP/SAP y Power Automate · alemán A1 y gallego desde la semana 44",
    milestone: "Semana 60: examen MD-102",
  },
  4: {
    name: "FASE 4: Servidores y PL-300",
    color: "fuchsia-500",
    weeks: [61, 69],
    summary: "Windows Server avanzado, Entra Connect, PowerShell intermedio, P2 v2 y AZ-900 · PL-300 · alemán A1 → A2",
    milestone: "Semana 69: examen PL-300",
  },
  5: {
    name: "FASE 5: Azure, Python e inglés B2",
    color: "cyan-500",
    weeks: [70, 91],
    summary: "ITIL, AZ-104, Azure IaaS y Linux Essentials · Python con pandas, BI, Fabric, Qlik y Excel con Python · Aptis B2 · alemán A2",
    milestone: "Semana 78: Aptis B2 · semana 88: examen AZ-104",
  },
  6: {
    name: "FASE 6: Linux, redes y proyecto integrador",
    color: "emerald-500",
    weeks: [92, 104],
    summary: "Linux Essentials, AWS y Cisco Técnico en Redes · proyecto Python + SQL con EDA, Tableau, storytelling y proyecto integrador de BI · CV para España y Viena · alemán A2",
    milestone: "Semana 104: examen de alemán A2 (opcional)",
  },
  7: {
    name: "FASE 7: Después de octubre de 2028 (sin plazo)",
    color: "rose-500",
    summary:
      "En el orden de la ruta: sistemas (resto de Técnico en Redes, CCNA, ciberseguridad, exámenes opcionales), datos (Google DA, estadística, Looker, calidad de datos, dbt, ML, Big Data), IA (Claude Code, API, MCP, agentes, AI-901) y otros (empleo, francés, alemán B1, cursos en pausa)",
  },
}

/** Fase de una semana del plan (1–104); las tareas sin plazo (semana 105) son la Fase 7 */
export function phaseOfWeek(week: number): number {
  for (const [num, phase] of Object.entries(PHASE_MAP)) {
    if (phase.weeks && week >= phase.weeks[0] && week <= phase.weeks[1]) return Number(num)
  }
  return 7
}
