/**
 * Módulos de la ruta 2026-27 (ruta_2026_completa.html) que no estaban en el plan de 52 semanas:
 * cursos Claude/Anthropic y certificaciones (Google DA, AI-900, Google Advanced DA, PL-300).
 * Cada módulo se reparte en partes iguales sobre un rango de semanas, según el calendario original.
 */

export interface ExtraTaskTemplate {
  name: string
  durationHours: number
  category: string
  tech: string[]
  profile: string[]
  links?: string[]
  cert?: string
}

interface ExtraModule {
  name: string
  hours: number
  weeks: [number, number] // rango inclusivo
  category: string
  tech?: string[]
  profile?: string[]
  url?: string
  cert?: string
}

const MODULES: ExtraModule[] = [
  // Claude / Anthropic
  { name: "Curso Claude AI — Platzi", hours: 40, weeks: [1, 8], category: "claude", tech: ["ia"], url: "https://platzi.com/cursos/claude" },
  { name: "Claude 101 — Anthropic", hours: 3, weeks: [1, 1], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/claude-101" },
  { name: "AI Fluency: Framework & Foundations", hours: 4, weeks: [2, 2], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
  { name: "AI Capabilities and Limitations", hours: 2, weeks: [3, 3], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/ai-capabilities-and-limitations" },
  { name: "Claude Code 101 — Anthropic", hours: 3, weeks: [10, 10], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/claude-code-101" },
  { name: "Claude Code in Action", hours: 4, weeks: [11, 11], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/claude-code-in-action" },
  { name: "Introduction to Agent Skills", hours: 3, weeks: [12, 12], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/introduction-to-agent-skills" },
  { name: "Introduction to Subagents", hours: 3, weeks: [13, 13], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/introduction-to-subagents" },
  { name: "Building with Claude API", hours: 8, weeks: [29, 29], category: "claude", tech: ["ia", "python"], url: "https://anthropic.skilljar.com/claude-with-the-anthropic-api" },
  { name: "Introduction to MCP", hours: 6, weeks: [30, 30], category: "claude", tech: ["ia", "python"], url: "https://anthropic.skilljar.com/introduction-to-model-context-protocol" },
  { name: "MCP: Advanced Topics", hours: 5, weeks: [31, 31], category: "claude", tech: ["ia", "python"], url: "https://anthropic.skilljar.com/model-context-protocol-advanced-topics" },
  { name: "Introduction to Claude Cowork", hours: 4, weeks: [42, 42], category: "claude", tech: ["ia"], url: "https://anthropic.skilljar.com/introduction-to-claude-cowork" },

  // Google Data Analytics
  { name: "Google Data Analytics — Módulo 1", hours: 10, weeks: [7, 9], category: "certificacion", profile: ["da"], url: "https://grow.google/certificates/data-analytics/" },
  { name: "Google Data Analytics — Módulos 2–8", hours: 80, weeks: [10, 20], category: "certificacion", profile: ["da"], url: "https://grow.google/certificates/data-analytics/", cert: "Google Data Analytics" },

  // Microsoft AI-900
  { name: "Microsoft GenAI Fundamentals (AI-900)", hours: 20, weeks: [14, 17], category: "certificacion", tech: ["cloud", "ia"], url: "https://learn.microsoft.com/training/paths/introduction-generative-ai/", cert: "AI-900 Azure AI" },

  // Google Advanced DA
  { name: "Google Advanced DA — Preparación", hours: 30, weeks: [22, 28], category: "certificacion", profile: ["da"], url: "https://grow.google/certificates/advanced-data-analytics/" },
  { name: "Google Advanced DA — Examen", hours: 15, weeks: [41, 42], category: "certificacion", profile: ["da"], url: "https://grow.google/certificates/advanced-data-analytics/", cert: "Google Advanced DA" },

  // Power BI PL-300
  { name: "PL-300 — Preparación (mocks y laboratorios)", hours: 60, weeks: [33, 41], category: "certificacion", tech: ["powerbi"], profile: ["bi"], url: "https://learn.microsoft.com/certifications/exams/pl-300/" },
  { name: "PL-300 — Rendir examen", hours: 5, weeks: [46, 46], category: "certificacion", tech: ["powerbi"], profile: ["bi"], url: "https://learn.microsoft.com/certifications/exams/pl-300/", cert: "PL-300 Power BI" },
]

/** Reparte `total` horas en `parts` partes de múltiplos de 0.5h; la última absorbe el resto. */
function splitHours(total: number, parts: number): number[] {
  const base = Math.floor((total / parts) * 2) / 2
  const result = Array<number>(parts).fill(base)
  result[parts - 1] = Math.round((total - base * (parts - 1)) * 2) / 2
  return result
}

const BY_WEEK: Record<number, ExtraTaskTemplate[]> = {}

for (const m of MODULES) {
  const [from, to] = m.weeks
  const parts = to - from + 1
  const hours = splitHours(m.hours, parts)

  hours.forEach((h, i) => {
    const week = from + i
    ;(BY_WEEK[week] ??= []).push({
      name: parts > 1 ? `${m.name} (${i + 1}/${parts})` : m.name,
      durationHours: h,
      category: m.category,
      tech: m.tech ?? [],
      profile: m.profile ?? [],
      links: m.url ? [m.url] : undefined,
      // la certificación se obtiene al completar la última parte
      cert: i === parts - 1 ? m.cert : undefined,
    })
  })
}

export function getExtraTasks(week: number): ExtraTaskTemplate[] {
  return BY_WEEK[week] ?? []
}
