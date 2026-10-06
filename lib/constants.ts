import type { ColorConfig } from "./types"

export const HOURS_PER_WORKING_DAY = 4
export const TOTAL_WEEKS = 52
// Lunes de la semana 1. Las semanas del plan se calendarizan desde aquí.
export const START_DATE = new Date(2026, 9, 5)
export const LOCAL_STORAGE_KEY = "studyPathLocal"

export const PROFILE_MAP: Record<string, ColorConfig> = {
  da: { name: "Data Analyst", color: "sky-500" },
  bi: { name: "Business Intelligence", color: "violet-500" },
  ml: { name: "Machine Learning", color: "fuchsia-500" },
  de: { name: "Data Engineer", color: "cyan-500" },
  ds: { name: "Data Scientist", color: "rose-500" },
}

export const TECH_MAP: Record<string, ColorConfig> = {
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
}

export const CERTIFICATIONS = [
  "Google Data Analytics",
  "AI-900 Azure AI",
  "Google Advanced DA",
  "PL-300 Power BI",
]

export const PHASE_MAP: Record<number, { name: string; color: string }> = {
  1: { name: "FASE 1: Fundamentos Sólidos", color: "indigo-500" },
  2: { name: "FASE 2: Data Science Core", color: "sky-500" },
  3: { name: "FASE 3: BI + ML + Proyectos Capstone", color: "violet-500" },
  4: { name: "FASE 4: Especialización + Empleabilidad", color: "fuchsia-500" },
}
