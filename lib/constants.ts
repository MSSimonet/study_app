import type { ColorConfig } from "./types"
import { getWeeklyHours } from "./route"

// Ruta de 18 meses (docs/ruta-2026-28.md): Etapa 1 = semanas 1–39 a 21 h por semana; Etapa 2 = semanas 40–78 a 12 h.
// A esas horas se suma una ampliación de 1–4 h por semana (ver lib/route.ts), así que las horas reales de cada semana salen del plan.
export const TOTAL_WEEKS = 78
export const STAGE1_LAST_WEEK = 39
export const HOURS_PER_WEEK_STAGE1 = 21
export const HOURS_PER_WEEK_STAGE2 = 12

/** Horas por día hábil (lunes a viernes) de una semana, según lo planificado en ella */
export function hoursPerDay(week: number): number {
  const planned = getWeeklyHours(week)
  const base = week <= STAGE1_LAST_WEEK ? HOURS_PER_WEEK_STAGE1 : HOURS_PER_WEEK_STAGE2
  return (planned || base) / 5
}

// Lunes de la semana 1. Las semanas del plan se calendarizan desde aquí.
export const START_DATE = new Date(2026, 9, 12)
export const LOCAL_STORAGE_KEY = "studyPathLocal"
/** Sube cuando cambian los ids de las tareas (semana-posición), para no mezclar horas guardadas de otro plan */
export const PLAN_VERSION = 3

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

/** En orden de la ruta (sección 7); las tres últimas son de la Fase 7 */
export const CERTIFICATIONS = [
  "SQL y MySQL (Platzi)",
  "AZ-900 Azure Fundamentals",
  "Inglés A2 (Platzi)",
  "AB-900",
  "Aptis (nivel actual, opcional)",
  "MD-102",
  "ITIL 4 Foundation",
  "PL-300 Power BI",
  "Aptis B2",
  "AI-901 Azure AI Fundamentals",
  "Google Data Analytics",
  "Google Advanced DA",
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
    name: "FASE 1: Base de soporte",
    color: "indigo-500",
    weeks: [1, 13],
    summary: "Hardware, sistemas operativos y redes con Cisco, AZ-900, SQL y Excel, inglés A2, CV y LinkedIn; Git, SQL avanzado, Claude y postulaciones desde la semana 8",
    milestone: "Semana 13: AZ-900 aprobado, certificados de SQL y de inglés A2, CV listo",
  },
  2: {
    name: "FASE 2: Certificar y mostrar",
    color: "sky-500",
    weeks: [14, 26],
    summary: "Cisco IT Support Specialist, laboratorio de Windows Server y Active Directory, AB-900, Power BI y DAX, SQL avanzado y PostgreSQL, portfolio web, dashboard publicado, inglés B1",
    milestone: "Semana 26: AZ-900 y AB-900 aprobados, laboratorio y dashboard publicados, inglés B1 en curso",
  },
  3: {
    name: "FASE 3: Búsqueda intensiva",
    color: "violet-500",
    weeks: [27, 39],
    summary: "PowerShell, Linux, ciberseguridad, Python con pandas, visualización y EDA, práctica de coding, Scrum y Jira, Aptis opcional, simulacros y 5–10 postulaciones por semana",
    milestone: "Semana 39: primer empleo remoto",
  },
  4: {
    name: "FASE 4: Soporte N2",
    color: "fuchsia-500",
    weeks: [40, 52],
    summary: "MD-102 (Intune) con examen en la semana 52, Power BI avanzado y modelado de datos, BI estratégico y KPIs, Claude Code, inglés B2",
  },
  5: {
    name: "FASE 5: Sistemas y BI",
    color: "cyan-500",
    weeks: [53, 65],
    summary: "Cisco Linux Essentials, ITIL 4 Foundation, PL-300 con examen en la semana 65, Aptis B2",
  },
  6: {
    name: "FASE 6: Especialización",
    color: "emerald-500",
    weeks: [66, 78],
    summary: "Una opción según tu empleo (A: sistemas y cloud, o B: ciberseguridad), contabilidad y finanzas, Power Automate, ERP/SAP, inglés B2",
    milestone: "Semana 78: soporte N2 y sistemas con MD-102, Linux, ITIL y especialización iniciada; PL-300 y Power Automate; inglés B2 certificado",
  },
  7: {
    name: "FASE 7: Después de los 18 meses (sin plazo)",
    color: "rose-500",
    summary: "En orden de importancia laboral: ERP/SAP, Fabric, Qlik, dbt, networking, CCNA, Azure y AWS, ciberseguridad, IA (de los prompts a los agentes), Python para informes, Tableau, estadística, Google DA, ML, Big Data, Docker, idiomas y cursos en pausa",
  },
}

/** Fase de una semana del plan (1–78); las tareas sin plazo (semana 79) son la Fase 7 */
export function phaseOfWeek(week: number): number {
  for (const [num, phase] of Object.entries(PHASE_MAP)) {
    if (phase.weeks && week >= phase.weeks[0] && week <= phase.weeks[1]) return Number(num)
  }
  return 7
}
