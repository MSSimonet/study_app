import type { Interest, TaskTrack } from "./types"

/**
 * Ruta de 18 meses (docs/ruta-2026-28.md): empleo remoto en 9 meses y perfil técnico en crecimiento.
 * Inicio lunes 12/10/2026 · objetivo de empleo semana 39 (09/07/2027) · fin viernes 07/04/2028 (semana 78).
 *
 * Los plazos son los de la ruta: fases, semanas de examen e hitos. Cada bloque tiene una capacidad
 * semanal fija (Etapa 1: 21 h = inglés 7 + soporte 7/6 + datos 5/4 + empleo 2/3/4; Etapa 2: 12 h = inglés 4 +
 * soporte 5 + datos 3). Dentro de cada tramo, los módulos "weekly" se repiten cada semana y los "sequence"
 * se vierten en orden sobre las horas que quedan. Si un tramo no cuadra, el módulo falla al cargar.
 *
 * Además de los cuatro bloques de la ruta, el bloque «ampliacion» suma entre 1 y 4 h por semana con temas del repo
 * que la ruta no traía (Git, SQL avanzado, visualización y EDA, BI estratégico, portfolio, práctica de coding y cursos
 * de Claude). Cada uno entra justo después de su base, para ir profundizando; los plazos de la ruta no se mueven.
 */

export interface RouteItem {
  name: string
  hours: number
  category: string
  tech?: string[]
  profile?: string[]
  links?: string[]
  cert?: string
  interest?: Interest
}

export interface RouteTask {
  name: string
  durationHours: number
  category: string
  tech: string[]
  profile: string[]
  links?: string[]
  cert?: string
  interest?: Interest
  track?: TaskTrack
}

type Block = "ingles" | "soporte" | "datos" | "empleo" | "ampliacion"
const BLOCK_ORDER: Block[] = ["ingles", "soporte", "datos", "empleo", "ampliacion"]

interface Segment {
  block: Block
  weeks: [number, number]
  /** horas por semana del bloque en este tramo */
  cap: number
  /** módulos que se repiten cada semana (horas por semana) */
  weekly?: RouteItem[]
  /** módulos en orden; las horas son el total y se reparten en las semanas */
  sequence?: RouteItem[]
  /** alternativa a `sequence` en las mismas semanas (no cuenta en el total de horas) */
  alt?: RouteItem[]
}

/** Semana a la que van las tareas de la Fase 7 (sin plazo) */
export const FASE7_WEEK = 79

const NETACAD_IT = "https://www.netacad.com/es/catalogs/learn/information-technology"
const NETACAD_NET = "https://www.netacad.com/es/catalogs/learn/networking"
const NETACAD_SEC = "https://www.netacad.com/es/catalogs/learn/cybersecurity"
const PLATZI_ING = "https://platzi.com/escuela/ingles/"
const JOBS = [
  "https://www.tecnoempleo.com/ofertas-trabajo/?te=helpdesk",
  "https://www.remoterocketship.com/country/argentina/jobs/it-support/",
  "https://www.remoterocketship.com/country/argentina/jobs/technical-support/",
]

// ───────────────────────────── ETAPA 1 · semanas 1–39 · 21 h por semana ─────────────────────────────

const ETAPA1: Segment[] = [
  // ── Inglés (7 h) ──
  {
    block: "ingles",
    weeks: [1, 13],
    cap: 7,
    weekly: [
      { name: "Inglés: Platzi English Academy A2", hours: 3, category: "ingles", links: [PLATZI_ING], cert: "Inglés A2 (Platzi)" },
      { name: "Inglés: Sesame, conversación diaria", hours: 2, category: "ingles" },
      { name: "Inglés: English Discoveries (test de nivel la semana 1 y práctica mientras seas elegible)", hours: 1, category: "ingles" },
    ],
    sequence: [
      { name: "Inglés: Platzi «Inglés para Programadores» (terminar, vas 9/13)", hours: 5, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Little Language Lessons", hours: 8, category: "ingles" },
    ],
  },
  {
    block: "ingles",
    weeks: [14, 26],
    cap: 7,
    weekly: [
      { name: "Inglés: Platzi B1", hours: 3, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Sesame", hours: 2, category: "ingles" },
      { name: "Inglés: English Discoveries y Little Language Lessons", hours: 1, category: "ingles" },
    ],
    sequence: [
      { name: "Inglés: Platzi «Inglés para Entrevistas de Trabajo»", hours: 6, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Platzi «Inglés para Servicio al Cliente»", hours: 7, category: "ingles", links: [PLATZI_ING] },
    ],
  },
  {
    block: "ingles",
    weeks: [27, 39],
    cap: 7,
    weekly: [
      { name: "Inglés: Platzi B1", hours: 3, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Sesame, simulacros de entrevista en inglés", hours: 2, category: "ingles" },
    ],
    sequence: [
      { name: "Inglés: preparación de Aptis", hours: 20, category: "ingles", links: ["https://www.britishcouncil.es/en/exam/aptis/what"] },
      {
        name: "Inglés: examen Aptis opcional (semanas 37–38), certifica tu nivel actual",
        hours: 4,
        category: "ingles",
        links: ["https://www.britishcouncil.es/eu/azterketak/aptis/datak-prezioak-tokiak"],
        cert: "Aptis (nivel actual, opcional)",
      },
      { name: "Inglés: repaso de inglés técnico para entrevistas", hours: 2, category: "ingles" },
    ],
  },

  // ── Soporte y sistemas (7 h en Fases 1–2, 6 h en Fase 3) ──
  {
    block: "soporte",
    weeks: [1, 2],
    cap: 7,
    sequence: [
      { name: "Platzi «Computadores e Informática» (terminar, vas 16/26)", hours: 3, category: "soporte", profile: ["it"], links: ["https://platzi.com/cursos/computacion-basica/"] },
      { name: "Platzi «Terminal» (terminar, vas 23/26)", hours: 1, category: "soporte", profile: ["it"], tech: ["linux"], links: ["https://platzi.com/cursos/terminal/"] },
      { name: "Cisco: Hardware Basics", hours: 6, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
      { name: "Cisco: IT Customer Support Basics", hours: 4, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
    ],
  },
  {
    block: "soporte",
    weeks: [3, 5],
    cap: 7,
    sequence: [
      { name: "Cisco: Operating Systems Basics", hours: 12, category: "soporte", profile: ["it"], tech: ["windows"], links: [NETACAD_IT] },
      { name: "Cisco: Linux Unhatched", hours: 8, category: "soporte", profile: ["it"], tech: ["linux"], links: [NETACAD_IT] },
      { name: "Práctica de sistemas operativos y Linux en máquina virtual", hours: 1, category: "practica", profile: ["it"], tech: ["linux"] },
    ],
  },
  {
    block: "soporte",
    weeks: [6, 9],
    cap: 7,
    sequence: [
      { name: "Cisco: Conceptos básicos de redes", hours: 22, category: "soporte", profile: ["it"], tech: ["redes"], links: [NETACAD_NET] },
      { name: "Platzi «Redes Informáticas de Internet»", hours: 6, category: "soporte", profile: ["it"], tech: ["redes"], links: ["https://platzi.com/cursos/redes/"] },
    ],
  },
  {
    block: "soporte",
    weeks: [10, 13],
    cap: 7,
    sequence: [
      { name: "AZ-900: curso de Platzi", hours: 5, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: ["https://platzi.com/cursos/az-900/"] },
      { name: "AZ-900: práctica", hours: 20, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: ["https://platzi.com/cursos/az-900/"] },
      {
        name: "AZ-900: guía de Microsoft Learn",
        hours: 2,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["cloud"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"],
      },
      {
        name: "AZ-900: examen (semana 13)",
        hours: 1,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["cloud"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"],
        cert: "AZ-900 Azure Fundamentals",
      },
    ],
  },
  {
    block: "soporte",
    weeks: [14, 17],
    cap: 7,
    sequence: [
      // El curso dura 30 h según la ruta; se cuentan 28 h porque parte se solapa con módulos ya hechos en la Fase 1
      { name: "Cisco: IT Support Specialist Career Path", hours: 28, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
    ],
  },
  {
    block: "soporte",
    weeks: [18, 23],
    cap: 7,
    sequence: [
      { name: "Laboratorio en casa: Windows Server de prueba en VirtualBox", hours: 8, category: "practica", profile: ["it", "sys"], tech: ["windows"] },
      { name: "Laboratorio en casa: Active Directory", hours: 10, category: "practica", profile: ["it", "sys"], tech: ["windows"] },
      { name: "Laboratorio en casa: directivas de grupo (GPO)", hours: 8, category: "practica", profile: ["it", "sys"], tech: ["windows"] },
      { name: "Laboratorio en casa: DNS y DHCP", hours: 8, category: "practica", profile: ["it", "sys"], tech: ["windows", "redes"] },
      { name: "Laboratorio en casa: GLPI como sistema de tickets", hours: 5, category: "practica", profile: ["it"] },
      { name: "Laboratorio en casa: documentación completa en GitHub", hours: 3, category: "practica", profile: ["it", "sys"] },
    ],
  },
  {
    block: "soporte",
    weeks: [24, 26],
    cap: 7,
    sequence: [
      { name: "Platzi «Azure Active Directory»", hours: 8, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "cloud"], links: ["https://platzi.com/escuela/devops-cloud/"] },
      { name: "Platzi «Microsoft 365 Copilot»", hours: 3, category: "sistemas", profile: ["it"], tech: ["windows", "ia"], links: ["https://platzi.com/escuela/devops-cloud/"] },
      {
        name: "AB-900: preparación (Microsoft Learn)",
        hours: 8,
        category: "certificacion",
        profile: ["it"],
        tech: ["windows"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-900/"],
      },
      {
        name: "AB-900: examen (semana 26)",
        hours: 2,
        category: "certificacion",
        profile: ["it"],
        tech: ["windows"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-900/"],
        cert: "AB-900",
      },
    ],
  },
  {
    block: "soporte",
    weeks: [27, 30],
    cap: 6,
    sequence: [
      { name: "PowerShell básico: automatizar altas de usuarios en el laboratorio", hours: 18, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "linux"] },
      { name: "Platzi «Servidores Linux» (4 h de curso + 2 h de práctica)", hours: 6, category: "sistemas", profile: ["sys"], tech: ["linux"], links: ["https://platzi.com/escuela/devops-cloud/"] },
    ],
  },
  {
    block: "soporte",
    weeks: [31, 36],
    cap: 6,
    sequence: [
      { name: "Cisco: Introducción a Ciberseguridad", hours: 6, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
      { name: "Cisco: Seguridad de Terminales", hours: 27, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
      { name: "Platzi «Seguridad Informática para Equipos Técnicos»", hours: 3, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: ["https://platzi.com/escuela/devops-cloud/"] },
    ],
  },
  {
    block: "soporte",
    weeks: [37, 39],
    cap: 6,
    sequence: [
      { name: "Simulacros de entrevista técnica de soporte: casos de tickets y resolución de problemas", hours: 18, category: "practica", profile: ["it"] },
    ],
  },

  // ── Datos (5 h en Fase 1, 4 h en Fases 2–3) ──
  {
    block: "datos",
    weeks: [1, 2],
    cap: 5,
    sequence: [
      { name: "Platzi «SQL y MySQL» (terminar, estás en la última clase) y sacar el certificado", hours: 1, category: "fundamentos", tech: ["sql"], profile: ["da"], links: ["https://platzi.com/cursos/sql-basico/"], cert: "SQL y MySQL (Platzi)" },
      { name: "Excel Intermedio", hours: 9, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/excel-basico/"] },
    ],
  },
  {
    block: "datos",
    weeks: [3, 5],
    cap: 5,
    sequence: [
      { name: "Excel Intermedio (continuación)", hours: 3, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/excel-basico/"] },
      { name: "Platzi «Excel Avanzado para Análisis de Datos»", hours: 12, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/excel-avanzado/"] },
    ],
  },
  {
    block: "datos",
    weeks: [6, 9],
    cap: 5,
    sequence: [
      { name: "Platzi «Fundamentos de Bases de Datos y SQL»", hours: 20, category: "fundamentos", tech: ["sql"], profile: ["da"], links: ["https://platzi.com/cursos/sql-practico/"] },
    ],
  },
  {
    block: "datos",
    weeks: [10, 13],
    cap: 5,
    sequence: [
      { name: "Práctica de SQL en HackerRank", hours: 20, category: "practica", tech: ["sql"], profile: ["da"], links: ["https://www.hackerrank.com/domains/sql"] },
    ],
  },
  {
    block: "datos",
    weeks: [14, 17],
    cap: 4,
    sequence: [
      { name: "Platzi Power BI", hours: 16, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/power-bi/"] },
    ],
  },
  {
    block: "datos",
    weeks: [18, 23],
    cap: 4,
    sequence: [
      { name: "Platzi «DAX para Power BI»", hours: 24, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/power-bi-dax/"] },
    ],
  },
  {
    block: "datos",
    weeks: [24, 26],
    cap: 4,
    sequence: [
      { name: "Dashboard con datos reales del pensionado (ocupación, ingresos, clientes), publicado", hours: 12, category: "practica", tech: ["powerbi"], profile: ["da", "bi"] },
    ],
  },
  {
    block: "datos",
    weeks: [27, 30],
    cap: 4,
    sequence: [
      { name: "Platzi «Fundamentos de Python» (vas 5/32)", hours: 16, category: "fundamentos", tech: ["python"], profile: ["da"], links: ["https://platzi.com/cursos/python-basico/"] },
    ],
  },
  {
    block: "datos",
    weeks: [31, 36],
    cap: 4,
    sequence: [
      { name: "Python con pandas: Platzi «Python para Ciencia de Datos»", hours: 24, category: "python_avanzado", tech: ["python"], profile: ["da"], links: ["https://platzi.com/escuela/datos/"] },
    ],
  },
  {
    block: "datos",
    weeks: [37, 39],
    cap: 4,
    sequence: [
      { name: "Proyecto Python + SQL en GitHub", hours: 12, category: "practica", tech: ["python", "sql"], profile: ["da"] },
    ],
  },

  // ── Empleo e IA (2 h en Fase 1, 3 h en Fase 2, 4 h en Fase 3) ──
  {
    block: "empleo",
    weeks: [1, 7],
    cap: 2,
    sequence: [
      { name: "CV en español e inglés, con el diploma de la Xunta", hours: 4, category: "empleabilidad" },
      { name: "LinkedIn", hours: 3, category: "empleabilidad" },
      { name: "GitHub: README de study_app y de Tu Lugar en Galicia", hours: 3, category: "empleabilidad" },
      { name: "Platzi «Preparar una Entrevista de Trabajo» (terminar, vas 13/19)", hours: 4, category: "empleabilidad" },
    ],
  },
  {
    block: "empleo",
    weeks: [8, 13],
    cap: 2,
    weekly: [
      { name: "Postulaciones: 3 por semana a atención al cliente o soporte en español (empleo puente, remoto desde Argentina)", hours: 1, category: "empleabilidad", links: JOBS },
    ],
    sequence: [
      { name: "Platzi «Claude AI» (terminar, vas 5/20)", hours: 6, category: "claude", tech: ["ia"], links: ["https://platzi.com/cursos/claude"] },
    ],
  },
  {
    block: "empleo",
    weeks: [14, 26],
    cap: 3,
    weekly: [
      { name: "Postulaciones: 5 por semana a soporte junior remoto", hours: 1, category: "empleabilidad", links: JOBS },
      { name: "LinkedIn: una publicación por semana sobre el laboratorio o el dashboard", hours: 1, category: "empleabilidad" },
    ],
    sequence: [
      { name: "Platzi «Servicio al Cliente y Soporte a Usuarios»", hours: 7, category: "empleabilidad", profile: ["it"] },
      { name: "Platzi «Claude Code para No Programadores»", hours: 6, category: "claude", tech: ["ia"] },
    ],
  },
  {
    block: "empleo",
    weeks: [27, 39],
    cap: 4,
    weekly: [
      { name: "Postulaciones (5–10 por semana) y entrevistas", hours: 3, category: "empleabilidad", links: JOBS },
    ],
    sequence: [
      { name: "Scrum y Jira básico", hours: 3, category: "empleabilidad", links: ["https://scrumguides.org/"] },
      { name: "Platzi «Curso para Conseguir Trabajo en Tecnología»", hours: 1, category: "empleabilidad" },
      { name: "Preparación de entrevistas y seguimiento de postulaciones", hours: 9, category: "empleabilidad" },
    ],
  },
  // ── Ampliación (1–4 h por semana): temas del repo, cada uno justo después de su base ──
  {
    // antes del README de GitHub y de documentar el laboratorio
    block: "ampliacion",
    weeks: [1, 6],
    cap: 2,
    sequence: [
      { name: "Platzi «Git + GitHub»", hours: 10, category: "fundamentos", profile: ["da", "it"], links: ["https://platzi.com/cursos/gitgithub/"] },
      { name: "Práctica: repositorios y flujo de trabajo (commits, ramas, pull requests)", hours: 2, category: "practica", profile: ["da", "it"] },
    ],
  },
  {
    // tras Platzi «Claude AI» (semanas 8–13) y antes de «Claude Code para No Programadores»
    block: "ampliacion",
    weeks: [14, 20],
    cap: 1,
    sequence: [
      { name: "Claude 101 — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-101"] },
      { name: "AI Fluency: Framework & Foundations — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/ai-fluency-framework-foundations"] },
    ],
  },
  {
    // tras SQL básico (semanas 6–9) y la práctica en HackerRank (10–13)
    block: "ampliacion",
    weeks: [10, 15],
    cap: 2,
    sequence: [
      { name: "Platzi «SQL Avanzado I»", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da"], links: ["https://platzi.com/cursos/sql-avanzado/"] },
      { name: "Práctica: optimización de consultas", hours: 2, category: "practica", tech: ["sql"], profile: ["da"] },
    ],
  },
  {
    block: "ampliacion",
    weeks: [16, 22],
    cap: 2,
    sequence: [
      { name: "Platzi «SQL Avanzado II + PostgreSQL»", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da", "de"], links: ["https://platzi.com/cursos/postgresql/"] },
      { name: "Proyecto: diseñar una base de datos en PostgreSQL", hours: 4, category: "practica", tech: ["sql"], profile: ["da"] },
    ],
  },
  {
    // con el dashboard del pensionado y el laboratorio ya construidos, antes de la búsqueda intensiva
    block: "ampliacion",
    weeks: [23, 26],
    cap: 3,
    sequence: [
      { name: "Portfolio web: publicar el laboratorio, el dashboard y los proyectos en GitHub Pages", hours: 12, category: "empleabilidad", profile: ["it", "da"] },
    ],
  },
  {
    // tras Fundamentos de Python (semanas 27–30)
    block: "ampliacion",
    weeks: [31, 39],
    cap: 1,
    sequence: [
      { name: "Entrevistas técnicas: ejercicios de código en LeetCode y HackerRank", hours: 9, category: "empleabilidad", tech: ["python"], links: ["https://leetcode.com/", "https://www.hackerrank.com/"] },
    ],
  },
  {
    // junto a pandas (semanas 31–36)
    block: "ampliacion",
    weeks: [31, 34],
    cap: 3,
    sequence: [
      { name: "Platzi «Visualización: Matplotlib y Seaborn»", hours: 12, category: "python_avanzado", tech: ["python"], profile: ["da"], links: ["https://platzi.com/cursos/matplotlib-seaborn/"] },
    ],
  },
  {
    // con pandas y visualización listos, alimenta el proyecto Python + SQL
    block: "ampliacion",
    weeks: [36, 39],
    cap: 3,
    sequence: [
      { name: "Platzi «Análisis Exploratorio de Datos (EDA)» aplicado al proyecto Python + SQL", hours: 12, category: "analisis", tech: ["python", "sql"], profile: ["da"], links: ["https://platzi.com/cursos/eda/"] },
    ],
  },
]

// ───────────────────────────── ETAPA 2 · semanas 40–78 · 12 h por semana ─────────────────────────────

const ETAPA2: Segment[] = [
  // ── Inglés (4 h) ──
  {
    block: "ingles",
    weeks: [40, 63],
    cap: 4,
    weekly: [
      { name: "Inglés: Platzi B2", hours: 3, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Sesame", hours: 1, category: "ingles" },
    ],
  },
  {
    block: "ingles",
    weeks: [64, 65],
    cap: 4,
    weekly: [
      {
        name: "Inglés: preparación y examen Aptis B2 (semanas 64–65)",
        hours: 4,
        category: "ingles",
        links: ["https://www.britishcouncil.es/eu/azterketak/aptis/datak-prezioak-tokiak"],
        cert: "Aptis B2",
      },
    ],
  },
  {
    block: "ingles",
    weeks: [66, 78],
    cap: 4,
    weekly: [
      { name: "Inglés: Platzi B2", hours: 3, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: conversación", hours: 1, category: "ingles" },
    ],
  },

  // ── Soporte y sistemas (5 h) ──
  {
    block: "soporte",
    weeks: [40, 52],
    cap: 5,
    sequence: [
      {
        name: "MD-102 (Endpoint Administrator, Intune): ruta de Microsoft Learn",
        hours: 52,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["windows"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/"],
      },
      {
        name: "MD-102: simulacros y laboratorio de Intune",
        hours: 11,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["windows"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/"],
      },
      {
        name: "MD-102: examen (semana 52)",
        hours: 2,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["windows"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/"],
        cert: "MD-102",
      },
    ],
  },
  {
    block: "soporte",
    weeks: [53, 65],
    cap: 5,
    sequence: [
      // Linux Essentials dura 70 h: aquí se hacen unas 45 h (semanas 53–61) y el resto va a la Fase 7
      { name: "Cisco Linux Essentials (unas 45 de sus 70 h; el resto, en la Fase 7)", hours: 45, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NETACAD_IT] },
      { name: "ITIL 4 Foundation: preparación (semanas 62–65)", hours: 18, category: "certificacion", profile: ["it", "sys"] },
      {
        name: "ITIL 4 Foundation: examen (opcional, solo si lo paga la empresa)",
        hours: 2,
        category: "certificacion",
        profile: ["it", "sys"],
        cert: "ITIL 4 Foundation",
      },
    ],
  },
  {
    block: "soporte",
    weeks: [66, 78],
    cap: 5,
    // Opción A · Sistemas y cloud (la de más volumen: «cloud» 663 ofertas en España)
    sequence: [
      { name: "Opción A · Platzi Azure: IaaS, almacenamiento y bases de datos en Azure", hours: 20, category: "sistemas", profile: ["sys"], tech: ["cloud"], links: ["https://platzi.com/escuela/devops-cloud/"] },
      // La carrera dura 70 h; con Azure no caben todas en 65 h: el resto va a la Fase 7
      { name: "Opción A · Cisco «Carrera Profesional de Técnico en Redes» (45 de 70 h; el resto, en la Fase 7)", hours: 45, category: "sistemas", profile: ["sys"], tech: ["redes"], links: [NETACAD_NET] },
    ],
    // Opción B · Ciberseguridad (alternativa, solo una de las dos)
    alt: [
      { name: "Opción B · Cisco «Analista Junior en Ciberseguridad» (unas 65 de 120 h; el resto, en la Fase 7)", hours: 65, category: "seguridad", profile: ["sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
    ],
  },

  // ── Datos y negocio (3 h) ──
  {
    block: "datos",
    weeks: [40, 52],
    cap: 3,
    sequence: [
      { name: "Platzi «Power BI Avanzado»", hours: 24, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/power-bi/"] },
      { name: "Modelado de datos: esquema estrella y modelo semántico", hours: 15, category: "bi", tech: ["powerbi", "sql"], profile: ["da", "bi"], links: ["https://learn.microsoft.com/es-es/training/modules/design-model-power-bi/"] },
    ],
  },
  {
    block: "datos",
    weeks: [53, 65],
    cap: 3,
    sequence: [
      {
        name: "PL-300: preparación (Microsoft Learn, mocks y laboratorios)",
        hours: 36,
        category: "certificacion",
        tech: ["powerbi"],
        profile: ["bi", "da"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/"],
      },
      {
        name: "PL-300: examen (semana 65)",
        hours: 3,
        category: "certificacion",
        tech: ["powerbi"],
        profile: ["bi", "da"],
        links: ["https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/"],
        cert: "PL-300 Power BI",
      },
    ],
  },
  {
    block: "datos",
    weeks: [66, 78],
    cap: 3,
    sequence: [
      {
        name: "Contabilidad, finanzas y control de gestión para analistas",
        hours: 20,
        category: "negocio",
        tech: ["excel"],
        profile: ["da", "bi"],
        links: ["https://platzi.com/cursos/contabilidad-basica/", "https://platzi.com/cursos/planeacion-financiera/"],
      },
      {
        name: "Power Automate: automatización de procesos",
        hours: 8,
        category: "bi",
        profile: ["bi"],
        links: ["https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/"],
      },
      {
        name: "Introducción a ERP/SAP",
        hours: 11,
        category: "negocio",
        profile: ["bi"],
        links: ["https://learning.sap.com/courses/exploring-sap-analytics-cloud", "https://learning.sap.com/courses/discovering-sap-s-4hana-embedded-analytics"],
      },
    ],
  },
  // ── Ampliación (1–2 h por semana) ──
  {
    // tras Power BI, DAX y el dashboard de la Fase 2; profundiza el modelado de la misma fase
    block: "ampliacion",
    weeks: [40, 52],
    cap: 1,
    sequence: [
      { name: "Platzi «Business Intelligence Estratégico»", hours: 10, category: "bi", tech: ["powerbi"], profile: ["bi", "da"], links: ["https://platzi.com/cursos/business-intelligence/"] },
      { name: "Caso práctico: KPIs de un negocio", hours: 3, category: "practica", tech: ["powerbi"], profile: ["bi", "da"] },
    ],
  },
  {
    // tras «Claude AI» y «Claude Code para No Programadores» de la Etapa 1
    block: "ampliacion",
    weeks: [40, 46],
    cap: 1,
    sequence: [
      { name: "Claude Code 101 — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-code-101"] },
      { name: "Claude Code in Action — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-code-in-action"] },
    ],
  },
]


// ───────────────────────────── Programación semana a semana ─────────────────────────────

function toTask(item: RouteItem, hours: number, name: string, isLast: boolean, track?: TaskTrack): RouteTask {
  return {
    name,
    durationHours: hours,
    category: item.category,
    tech: item.tech ?? [],
    profile: item.profile ?? [],
    links: item.links,
    // la certificación se obtiene al completar la última parte
    cert: isLast ? item.cert : undefined,
    interest: item.interest,
    track,
  }
}

/** Vierte los módulos de una lista, en orden, sobre `weeks` semanas con `perWeek` horas libres cada una */
function pour(items: RouteItem[], from: number, weeks: number, perWeek: number, track?: TaskTrack) {
  const result: { week: number; task: RouteTask }[] = []
  let week = from
  let left = perWeek
  for (const item of items) {
    const pieces: { week: number; hours: number }[] = []
    let remaining = item.hours
    while (remaining > 1e-9) {
      if (week >= from + weeks) throw new Error(`Ruta: «${item.name}» no cabe en las semanas ${from}–${from + weeks - 1}`)
      const take = Math.min(remaining, left)
      pieces.push({ week, hours: take })
      remaining -= take
      left -= take
      if (left <= 1e-9) {
        week++
        left = perWeek
      }
    }
    pieces.forEach((p, i) => {
      const name = pieces.length > 1 ? `${item.name} (${i + 1}/${pieces.length})` : item.name
      result.push({ week: p.week, task: toTask(item, p.hours, name, i === pieces.length - 1, track) })
    })
  }
  const total = weeks * perWeek
  const filled = items.reduce((s, i) => s + i.hours, 0)
  if (Math.abs(filled - total) > 1e-9) {
    throw new Error(`Ruta: el tramo semanas ${from}–${from + weeks - 1} suma ${filled} h y debería sumar ${total} h`)
  }
  return result
}

type Cell = { block: Block; task: RouteTask }
const BY_WEEK: Record<number, Cell[]> = {}

function schedule(segments: Segment[]) {
  for (const seg of segments) {
    const [from, to] = seg.weeks
    const weeks = to - from + 1
    const weeklySum = (seg.weekly ?? []).reduce((s, i) => s + i.hours, 0)
    const free = seg.cap - weeklySum
    if (free < 0 || (!seg.sequence && free !== 0)) {
      throw new Error(`Ruta: el tramo ${seg.block} semanas ${from}–${to} no cuadra con ${seg.cap} h por semana`)
    }
    const put = (week: number, task: RouteTask) => (BY_WEEK[week] ??= []).push({ block: seg.block, task })

    for (const item of seg.weekly ?? []) {
      for (let w = from; w <= to; w++) put(w, toTask(item, item.hours, item.name, w === to))
    }
    if (seg.sequence) pour(seg.sequence, from, weeks, free).forEach((p) => put(p.week, p.task))
    if (seg.alt) pour(seg.alt, from, weeks, free, "alt").forEach((p) => put(p.week, p.task))
  }
}

schedule(ETAPA1)
schedule(ETAPA2)

/** Horas planificadas de una semana del plan principal (sin la opción B ni la Fase 7) */
export function getWeeklyHours(week: number): number {
  return (BY_WEEK[week] ?? []).reduce((sum, cell) => sum + (cell.task.track ? 0 : cell.task.durationHours), 0)
}

/** Tareas del plan principal de una semana (1–78), ordenadas: inglés, soporte y sistemas, datos, empleo e IA */
export function getRouteTasks(week: number): RouteTask[] {
  return (BY_WEEK[week] ?? [])
    .map((cell, order) => ({ cell, order }))
    .sort((a, b) => BLOCK_ORDER.indexOf(a.cell.block) - BLOCK_ORDER.indexOf(b.cell.block) || a.order - b.order)
    .map(({ cell }) => cell.task)
}

// ───────────────────────────── FASE 7 · después de los 18 meses (sin plazo) ─────────────────────────────
// En el orden de importancia laboral de la ruta. Los módulos que ya existían en la ruta anterior del repo
// (Tableau, Looker, storytelling, A/B, ML, Big Data, Docker, Claude API/MCP, Google DA, AI-901, etc.)
// conservan sus horas y su nivel de interés. Las horas marcadas «estimadas» no figuran en ningún documento.

const f7 = (item: RouteItem): RouteTask => toTask(item, item.hours, item.name, true, "fase7")

const FASE7: RouteItem[] = [
  // 1 · BI en Galicia
  { name: "ERP y SAP para analistas (resto): SAP Analytics Cloud y analítica en S/4HANA", hours: 4, category: "negocio", profile: ["bi"], links: ["https://learning.sap.com/courses/exploring-sap-analytics-cloud", "https://learning.sap.com/courses/discovering-sap-s-4hana-embedded-analytics"] },
  { name: "Microsoft Fabric: introducción", hours: 8, category: "bi", tech: ["cloud"], profile: ["bi"], links: ["https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"] },
  { name: "Qlik Sense: introducción", hours: 6, category: "bi", profile: ["bi"], links: ["https://learning.qlik.com/student/collection/2196958-qlik-sense-business-analyst-free-learning-content"] },
  // 2
  { name: "Calidad de datos: validaciones y tests", hours: 5, category: "analisis", tech: ["sql"], profile: ["da"], links: ["https://docs.getdbt.com/docs/build/data-tests"] },
  { name: "Stack moderno: dbt con BigQuery y Snowflake (introducción)", hours: 10, category: "ingenieria", tech: ["sql", "cloud"], profile: ["da", "de"], links: ["https://docs.getdbt.com/guides/bigquery", "https://docs.snowflake.com/en/user-guide/tutorials/snowflake-in-20minutes"] },
  // 2b · búsqueda de empleo (prolonga el bloque de empleo de las Fases 2 y 3)
  { name: "Networking y aplicaciones: contactos, reclutadores y comunidades", hours: 10, category: "empleabilidad" },
  { name: "Estrategia de búsqueda de empleo: embudo, seguimiento y métricas", hours: 3, category: "empleabilidad" },
  // 3 · redes y cloud (resto de la Fase 6) y certificación según la opción elegida
  { name: "Cisco Linux Essentials (resto de las 70 h)", hours: 25, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NETACAD_IT] },
  { name: "Opción A (resto): Cisco «Carrera Profesional de Técnico en Redes», 25 de 70 h", hours: 25, category: "sistemas", profile: ["sys"], tech: ["redes"], links: [NETACAD_NET] },
  { name: "CCNA (Cisco), si elegiste la opción A — horas estimadas", hours: 120, category: "certificacion", profile: ["sys"], tech: ["redes"], links: [NETACAD_NET] },
  { name: "Certificación de Azure de nivel intermedio (p. ej. AZ-104), si elegiste la opción A — horas estimadas", hours: 60, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: ["https://learn.microsoft.com/en-us/credentials/browse/?products=azure"] },
  { name: "Cloud AWS: fundamentos (para comparar con Azure, tras AZ-900 y la certificación intermedia)", hours: 10, category: "ingenieria", tech: ["cloud"], profile: ["de", "sys"], links: ["https://platzi.com/cursos/aws-fundamentos/"] },
  { name: "Práctica: desplegar un servicio básico en AWS", hours: 3, category: "practica", tech: ["cloud"], profile: ["de", "sys"] },
  // 4 · seguridad, si elegiste la opción B
  { name: "Opción B (resto): Cisco «Analista Junior en Ciberseguridad», 55 de 120 h", hours: 55, category: "seguridad", profile: ["sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
  { name: "Google Cybersecurity, si elegiste la opción B — horas estimadas", hours: 70, category: "certificacion", profile: ["sys"], tech: ["seguridad"], links: ["https://grow.google/certificates/cybersecurity/"] },
  { name: "CompTIA Security+, si elegiste la opción B — horas estimadas", hours: 60, category: "certificacion", profile: ["sys"], tech: ["seguridad"], links: ["https://www.comptia.org/certifications/security"] },
  // 5 · IA avanzada: de los conceptos a la API y después a los agentes
  { name: "AI Capabilities and Limitations — Anthropic", hours: 2, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/ai-capabilities-and-limitations"] },
  { name: "Platzi «Prompt Engineering» (IA aplicada)", hours: 10, category: "ia", tech: ["ia"], profile: ["ds"], links: ["https://platzi.com/cursos/prompt-engineering/"] },
  { name: "Proyecto: chatbot básico", hours: 3, category: "practica", tech: ["ia"], profile: ["ds"] },
  { name: "Platzi «APIs de IA (OpenAI y Anthropic)»", hours: 10, category: "ia", tech: ["python", "ia"], profile: ["ds"], links: ["https://platzi.com/cursos/openai-api/"] },
  { name: "Proyecto: integración de IA en una app", hours: 3, category: "practica", tech: ["python", "ia"], profile: ["ds"] },
  { name: "Building with Claude API", hours: 8, category: "claude", tech: ["ia", "python"], links: ["https://anthropic.skilljar.com/claude-with-the-anthropic-api"] },
  { name: "Introduction to MCP", hours: 6, category: "claude", tech: ["ia", "python"], links: ["https://anthropic.skilljar.com/introduction-to-model-context-protocol"] },
  { name: "MCP: Advanced Topics", hours: 5, category: "claude", tech: ["ia", "python"], links: ["https://anthropic.skilljar.com/model-context-protocol-advanced-topics"] },
  { name: "LangChain & RAG", hours: 10, category: "ia", tech: ["python", "ia"], profile: ["ds"], links: ["https://platzi.com/cursos/langchain/"] },
  { name: "Proyecto: Sistema RAG", hours: 3, category: "practica", tech: ["python", "ia"], profile: ["ds"] },
  { name: "Introduction to Agent Skills — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/introduction-to-agent-skills"] },
  { name: "Introduction to Subagents — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/introduction-to-subagents"] },
  { name: "Introduction to Claude Cowork — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/introduction-to-claude-cowork"] },
  { name: "Microsoft Azure AI Fundamentals (AI-901)", hours: 20, category: "certificacion", tech: ["cloud", "ia"], links: ["https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/"], cert: "AI-901 Azure AI Fundamentals" },
  { name: "Copilot Studio — horas estimadas", hours: 8, category: "ia", tech: ["ia"], links: ["https://learn.microsoft.com/es-es/training/paths/work-power-virtual-agents/"] },
  // 6 · Python aplicado a informes, visualización y analítica
  { name: "Platzi «Excel con Python (OpenPyXL)»", hours: 10, category: "fundamentos", tech: ["python", "excel"], profile: ["da"], links: ["https://platzi.com/cursos/python-excel/"] },
  { name: "Proyecto: automatización de informes en Excel con Python", hours: 3, category: "practica", tech: ["python", "excel"], profile: ["da"] },
  { name: "Tableau Básico", hours: 10, category: "bi", tech: ["tableau"], profile: ["da"], links: ["https://platzi.com/cursos/tableau/"] },
  { name: "Práctica: Visualizaciones en Tableau", hours: 3, category: "practica", tech: ["tableau"], profile: ["da"] },
  { name: "Tableau Avanzado", hours: 6, interest: "media", category: "bi", tech: ["tableau"], profile: ["da"], links: ["https://platzi.com/cursos/tableau-avanzado/"] },
  { name: "Proyecto: Dashboard ejecutivo", hours: 2, interest: "media", category: "practica", tech: ["tableau"], profile: ["da"] },
  { name: "Looker Studio + Google Analytics", hours: 10, category: "bi", profile: ["da"], links: ["https://platzi.com/cursos/google-data-studio/"] },
  { name: "Proyecto: Reporte automatizado en Looker Studio", hours: 3, category: "practica", profile: ["da"] },
  { name: "Storytelling con Datos", hours: 10, category: "bi", profile: ["da"], links: ["https://platzi.com/cursos/storytelling-datos/"] },
  { name: "Proyecto: Presentación ejecutiva", hours: 3, category: "practica", profile: ["da"] },
  { name: "Proyecto Integrador BI: de los datos al dashboard y la presentación", hours: 10, category: "practica", tech: ["powerbi", "sql"], profile: ["bi", "da"] },
  { name: "Portfolio: documentación del proyecto integrador", hours: 3, category: "practica", tech: ["powerbi"], profile: ["bi", "da"] },
  { name: "Analítica de producto y web: GA4, embudos, cohortes y retención", hours: 6, interest: "media", category: "analisis", profile: ["da"], links: ["https://support.google.com/analytics/answer/6367342?hl=es"] },
  // 7 · estadística (de las bases a la inferencia), A/B y certificados de Google
  { name: "Estadística Descriptiva", hours: 10, category: "analisis", tech: ["python"], profile: ["ds"], links: ["https://platzi.com/cursos/estadistica-descriptiva/"] },
  { name: "Proyecto: Análisis estadístico", hours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "Platzi «Matemáticas para Data Science»: estadística inferencial", hours: 10, category: "fundamentos", tech: ["python"], profile: ["ds"], links: ["https://platzi.com/cursos/estadistica-inferencial/"] },
  { name: "Práctica: ejercicios matemáticos y de probabilidad", hours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "A/B Testing & Experimentación", hours: 6, interest: "media", category: "analisis", tech: ["python"], profile: ["ds", "da"], links: ["https://platzi.com/cursos/ab-testing/"] },
  { name: "Proyecto: Diseño de experimento", hours: 2, interest: "media", category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "Google Data Analytics — Módulo 1", hours: 10, category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/data-analytics/"] },
  { name: "Google Data Analytics — Módulos 2–8", hours: 80, category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/data-analytics/"], cert: "Google Data Analytics" },
  { name: "Google Advanced DA — Preparación", hours: 20, interest: "media", category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/advanced-data-analytics/"] },
  { name: "Google Advanced DA — Examen", hours: 10, interest: "media", category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/advanced-data-analytics/"], cert: "Google Advanced DA" },
  // 8 · ML, Big Data, Docker, Kubernetes
  { name: "Fundamentos Machine Learning", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/machine-learning/"] },
  { name: "Práctica: Primer modelo", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Regresión Lineal & Logística", hours: 6, interest: "media", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/regresion-lineal-python/"] },
  { name: "Proyecto: Modelo predictivo", hours: 2, interest: "media", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Árboles de Decisión & Random Forest", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/scikit-learn/"] },
  { name: "Proyecto: Clasificación", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Support Vector Machines & KNN", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/machine-learning-python/"] },
  { name: "Práctica: Comparación de modelos", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Clustering & Dimensionalidad", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/clustering-segmentacion/"] },
  { name: "Proyecto: Segmentación de clientes", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Feature Engineering", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/feature-engineering/"] },
  { name: "Práctica: Optimización de features", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Model Evaluation & Validation", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/validacion-modelos/"] },
  { name: "Proyecto: Pipeline completo", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Redes Neuronales Básicas", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/redes-neuronales/"] },
  { name: "Práctica: Primera red neuronal", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "TensorFlow & Keras", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/tensorflow/"] },
  { name: "Proyecto: Clasificación de imágenes", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "NLP Fundamentos", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/nlp/"] },
  { name: "Proyecto: Análisis de sentimientos", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Series Temporales", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/series-temporales/"] },
  { name: "Proyecto: Forecasting", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "MLOps Básico", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: ["https://platzi.com/cursos/mlops/"] },
  { name: "Proyecto: Deploy de modelo", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "Proyecto ML Completo", hours: 6, interest: "media", category: "practica", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Documentación & Presentación del proyecto ML", hours: 2, interest: "media", category: "practica", profile: ["ds"] },
  { name: "Big Data Fundamentos", hours: 6, interest: "media", category: "ingenieria", tech: ["python"], profile: ["de"], links: ["https://platzi.com/cursos/big-data/"] },
  { name: "Práctica: PySpark básico", hours: 2, interest: "media", category: "practica", tech: ["python"], profile: ["de"] },
  { name: "Docker & Containerization", hours: 4, interest: "baja", category: "ingenieria", profile: ["de"], links: ["https://platzi.com/cursos/docker/"] },
  { name: "Proyecto: Containerizar app", hours: 1, interest: "baja", category: "practica", profile: ["de"] },
  { name: "Kubernetes — horas estimadas", hours: 10, interest: "baja", category: "ingenieria", profile: ["de"] },
  // 9 · idiomas
  { name: "Francés (subir desde A2)", hours: 20, interest: "baja", category: "idiomas" },
  { name: "Alemán A1 (inicio); solo si vuelves a mirar Suiza", hours: 11, interest: "media", category: "idiomas", links: ["https://a1.vhs-lernportal.de/"] },
  // 10 · cursos de Platzi en pausa (horas estimadas; «y otros» no se pueden enumerar desde aquí)
  { name: "Platzi en pausa: Django — horas estimadas", hours: 10, interest: "baja", category: "fundamentos" },
  { name: "Platzi en pausa: React — horas estimadas", hours: 10, interest: "baja", category: "fundamentos" },
  { name: "Platzi en pausa: Node — horas estimadas", hours: 10, interest: "baja", category: "fundamentos" },
  { name: "Platzi en pausa: JavaScript — horas estimadas", hours: 10, interest: "baja", category: "fundamentos" },
  { name: "Platzi en pausa: Cálculo — horas estimadas", hours: 10, interest: "baja", category: "fundamentos" },
  { name: "Platzi en pausa: Data Warehousing — horas estimadas", hours: 10, interest: "baja", category: "ingenieria" },
  { name: "Platzi en pausa: Arquitectura de Software — horas estimadas", hours: 10, interest: "baja", category: "ingenieria" },
]

export function getFase7Tasks(): RouteTask[] {
  return FASE7.map(f7)
}
