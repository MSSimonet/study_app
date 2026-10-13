import type { Interest, TaskTrack } from "./types"

/**
 * Ruta de 24 meses v2.1 (docs/ruta-24-meses-2026-28.md): soporte y datos en paralelo desde la semana 1 para el primer
 * empleo, mudanza a Galicia en las semanas 40–43 y alemán desde la semana 44.
 * Inicio lunes 20/10/2026 · primer empleo hacia la semana 39 · fin viernes 16/10/2028 (semana 104).
 *
 * Cada bloque tiene una capacidad semanal fija (secciones 3 y 4 del doc):
 *  - Semanas 1–26:   soporte 5 + datos 3 + inglés 5 + empleo 2 = 15 h
 *  - Semanas 27–39:  soporte 4 + datos 2 + inglés 5 + empleo 4 = 15 h
 *  - Semanas 40–43:  sistemas 4 + datos 2 + inglés 2 = 8 h (mudanza)
 *  - Semanas 44–69:  sistemas 5 + datos 3 + inglés 3 + alemán 4 = 15 h
 *  - Semanas 70–91:  sistemas 4 + datos 2 + inglés 3 + alemán 6 = 15 h
 *  - Semanas 92–104: sistemas 4 + datos 2 + inglés 2 + alemán 7 = 15 h
 * Total fijo: 1.532 h. Dentro de cada tramo, los módulos "weekly" se repiten cada semana y los "sequence" se vierten en
 * orden sobre las horas que quedan. Si un tramo no cuadra, el módulo falla al cargar.
 *
 * El bloque «ampliacion» es opcional (track "opcional": no suma al total ni al ritmo): los temas del repo que la ruta
 * ubica en las horas opcionales de la fase 1 (sección 4.1, 91 h, con la semana en 19 h como máximo) y el gallego,
 * 1 h por semana desde la semana 44 (61 h). Lo que no entra en los 24 meses va a la Fase 7, en el orden de la sección 4.1.
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

type Block = "ingles" | "aleman" | "soporte" | "datos" | "empleo" | "ampliacion"
const BLOCK_ORDER: Block[] = ["ingles", "aleman", "soporte", "datos", "empleo", "ampliacion"]

interface Segment {
  block: Block
  weeks: [number, number]
  /** horas por semana del bloque en este tramo */
  cap: number
  /** módulos que se repiten cada semana (horas por semana) */
  weekly?: RouteItem[]
  /** módulos en orden; las horas son el total y se reparten en las semanas */
  sequence?: RouteItem[]
  /** "opcional": se ve en la semana y se puede registrar, pero no suma al total ni al ritmo */
  track?: TaskTrack
}

/** Semana a la que van las tareas de la Fase 7 (sin plazo) */
export const FASE7_WEEK = 105

const NETACAD_IT = "https://www.netacad.com/es/catalogs/learn/information-technology"
const NETACAD_NET = "https://www.netacad.com/es/catalogs/learn/networking"
const NETACAD_SEC = "https://www.netacad.com/es/catalogs/learn/cybersecurity"
const PACKET_TRACER = "https://www.netacad.com/cisco-packet-tracer"
const PLATZI_ING = "https://platzi.com/escuela/ingles/"
const VHS = "https://www.vhs-lernportal.de/"
const APTIS = "https://www.britishcouncil.es/eu/azterketak/aptis/datak-prezioak-tokiak"
const OSD = "https://sprachenzentrum.univie.ac.at/en/language-university/oesd-examinations"
const GLPI = "https://github.com/glpi-project/docker-images"
const AB900 = "https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-900/"
const MD102 = "https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/"
const PL300 = "https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/"
const AZ104 = "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/"
const AZ900 = "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
const JOBS = [
  "https://www.tecnoempleo.com/ofertas-trabajo/?te=helpdesk",
  "https://www.remoterocketship.com/country/argentina/jobs/it-support/",
  "https://www.remoterocketship.com/country/argentina/jobs/technical-support/",
]
const JOBS_ES = ["https://www.tecnoempleo.com/ofertas-trabajo/?te=soporte", "https://www.tecnoempleo.com/ofertas-trabajo/?te=helpdesk"]

// ───────────────────────────── FASE 1 · semanas 1–39 · 15 h fijas por semana ─────────────────────────────

const FASE1: Segment[] = [
  // ── Inglés (5 h) ──
  {
    block: "ingles",
    weeks: [1, 39],
    cap: 5,
    weekly: [
      { name: "Inglés: Sesame, 15–20 min por día (llamadas de soporte y entrevistas)", hours: 1.5, category: "ingles" },
      { name: "Inglés: producción técnica (escribir en inglés los tickets y artículos del laboratorio)", hours: 1, category: "ingles" },
      { name: "Inglés: escucha (Microsoft Learn y Cisco en inglés, o Little Language Lessons)", hours: 0.5, category: "ingles" },
    ],
    sequence: [
      { name: "Inglés: test de nivel en English Discoveries", hours: 1, category: "ingles" },
      { name: "Inglés: Platzi «Inglés para Programadores» (terminar, vas 9/13)", hours: 5, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Platzi English Academy A2 (terminar, vas al 27 %)", hours: 26, category: "ingles", links: [PLATZI_ING], cert: "Inglés A2 (Platzi)" },
      { name: "Inglés: Platzi «Inglés para Entrevistas de Trabajo»", hours: 6, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Platzi «Inglés para Servicio al Cliente»", hours: 7, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Platzi English Academy B1 (inicio)", hours: 6, category: "ingles", links: [PLATZI_ING] },
      // cae en la semana 26
      { name: "Inglés: punto de control B1 en English Discoveries o Platzi (un Aptis para medir nivel es opcional; no hace falta)", hours: 1, category: "ingles" },
      { name: "Inglés: Platzi English Academy B1 (continuación)", hours: 26, category: "ingles", links: [PLATZI_ING] },
    ],
  },

  // ── Soporte (5 h en las semanas 1–26, 4 h en las 27–39) ──
  {
    block: "soporte",
    weeks: [1, 13],
    cap: 5,
    sequence: [
      { name: "Platzi «Computadores e Informática» (terminar, vas 16/26)", hours: 3, category: "soporte", profile: ["it"], links: ["https://platzi.com/cursos/computacion-basica/"] },
      { name: "Platzi «Terminal» (terminar, vas 23/26)", hours: 1, category: "soporte", profile: ["it"], tech: ["linux"], links: ["https://platzi.com/cursos/terminal/"] },
      { name: "Cisco: Hardware Basics", hours: 6, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
      { name: "Cisco: Operating Systems Basics", hours: 12, category: "soporte", profile: ["it"], tech: ["windows"], links: [NETACAD_IT] },
      { name: "Cisco: IT Customer Support Basics", hours: 4, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
      { name: "Cisco: Conceptos básicos de redes", hours: 22, category: "soporte", profile: ["it"], tech: ["redes"], links: [NETACAD_NET] },
      {
        name: "Preparar el host: ¿Windows Home? (sin Hyper-V → VirtualBox 7.2), Ubuntu Server 26.04 en VM con práctica de Linux, y descargar las evaluaciones de Windows Server 2025 y Windows 11 (se instalan en la semana 14)",
        hours: 5,
        category: "practica",
        profile: ["it", "sys"],
        tech: ["linux", "windows"],
        links: ["https://www.virtualbox.org/wiki/Downloads", "https://ubuntu.com/download/server"],
      },
      { name: "GLPI en Docker (glpi/glpi): categorías, prioridades, SLA y base de conocimiento", hours: 9, category: "practica", profile: ["it"], links: [GLPI] },
      { name: "Práctica en Packet Tracer", hours: 3, category: "practica", profile: ["it"], tech: ["redes"], links: [PACKET_TRACER] },
    ],
  },
  {
    block: "soporte",
    weeks: [14, 17],
    cap: 5,
    sequence: [
      {
        name: "P1 · Pyme Ficticia: controlador de dominio en Windows Server 2025 Core (2 GB) con DNS y DHCP",
        hours: 6,
        category: "practica",
        profile: ["it", "sys"],
        tech: ["windows", "redes"],
        links: ["https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025"],
      },
      { name: "P1: unidades organizativas, usuarios, grupos y GPO (unidades de red, contraseñas, bloqueo de pantalla)", hours: 7, category: "practica", profile: ["it", "sys"], tech: ["windows"] },
      {
        name: "P1: cliente Windows 11 (4 GB, vTPM) unido al dominio",
        hours: 4,
        category: "practica",
        profile: ["it"],
        tech: ["windows"],
        links: ["https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-enterprise"],
      },
      { name: "P1 v1: README, diagrama de red y publicación en GitHub", hours: 3, category: "practica", profile: ["it", "sys"] },
    ],
  },
  {
    block: "soporte",
    weeks: [18, 22],
    cap: 5,
    sequence: [
      { name: "PowerShell básico con el módulo de Active Directory", hours: 9, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "linux"] },
      { name: "P2 v1: altas y bajas desde un CSV de RRHH con PowerShell (usuarios, grupos, carpetas y logs), publicado", hours: 8, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"] },
      { name: "Microsoft 365 y Entra ID: guía de AB-900 en Microsoft Learn (sin examen)", hours: 8, category: "sistemas", profile: ["it"], tech: ["windows", "cloud"], links: [AB900] },
    ],
  },
  {
    block: "soporte",
    weeks: [23, 26],
    cap: 5,
    sequence: [
      { name: "ITSM: incidente, problema, cambio y SLA", hours: 3, category: "soporte", profile: ["it"] },
      { name: "P1: primeras 5 incidencias simuladas, cada una con su ticket en GLPI", hours: 5, category: "practica", profile: ["it"] },
      { name: "Cisco: IT Support Specialist Career Path (parte 1 de 30 h)", hours: 12, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
    ],
  },
  {
    block: "soporte",
    weeks: [27, 39],
    cap: 4,
    sequence: [
      { name: "Cisco: IT Support Specialist Career Path (resto)", hours: 18, category: "soporte", profile: ["it"], links: [NETACAD_IT] },
      {
        name: "P1: 5 incidencias más (10 en total) con diagnóstico, causa raíz y solución, y 5 artículos de conocimiento en español e inglés",
        hours: 10,
        category: "practica",
        profile: ["it"],
      },
      {
        name: "P3 · Red de oficina en Packet Tracer: 2 VLAN, DHCP, DNS, salida simulada, 5 fallos inyectados y vídeo de 3–5 min en inglés",
        hours: 12,
        category: "practica",
        profile: ["it"],
        tech: ["redes"],
        links: [PACKET_TRACER],
      },
      { name: "Cisco: Linux Unhatched", hours: 8, category: "soporte", profile: ["it"], tech: ["linux"], links: [NETACAD_IT] },
      { name: "Reconstruir P1 con scripts (la evaluación de Windows 11 caduca a los 90 días)", hours: 4, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"] },
    ],
  },

  // ── Datos (3 h en las semanas 1–26, 2 h en las 27–39) ──
  {
    block: "datos",
    weeks: [1, 4],
    cap: 3,
    sequence: [
      { name: "Platzi «SQL y MySQL» (terminar, estás en la última clase) y sacar el certificado", hours: 1, category: "fundamentos", tech: ["sql"], profile: ["da"], links: ["https://platzi.com/cursos/sql-mysql/"], cert: "SQL y MySQL (Platzi)" },
      { name: "Platzi «Excel Intermedio»", hours: 11, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/excel-basico/"] },
    ],
  },
  {
    block: "datos",
    weeks: [5, 9],
    cap: 3,
    sequence: [
      { name: "Platzi «Excel Avanzado para Análisis de Datos»", hours: 12, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/excel-avanzado/"] },
      { name: "Práctica de Excel: tablas dinámicas, BUSCARX y limpieza de datos", hours: 3, category: "practica", tech: ["excel"], profile: ["da", "bi"] },
    ],
  },
  {
    block: "datos",
    weeks: [10, 13],
    cap: 3,
    sequence: [
      { name: "Platzi «Fundamentos de Bases de Datos y SQL»", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da"], links: ["https://platzi.com/cursos/sql-practico/"] },
      { name: "Primeras consultas SQL sobre la base de datos de GLPI", hours: 2, category: "practica", tech: ["sql"], profile: ["da", "it"] },
    ],
  },
  {
    block: "datos",
    weeks: [14, 17],
    cap: 3,
    sequence: [{ name: "Platzi «Power BI»", hours: 12, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/power-bi/"] }],
  },
  {
    block: "datos",
    weeks: [18, 22],
    cap: 3,
    sequence: [
      // DAX se profundiza en las semanas 44–69 (modelado y PL-300)
      { name: "Platzi «DAX para Power BI»", hours: 9, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/power-bi-dax/"] },
      { name: "P4a v1 · Panel de SLA: 200 tickets simulados → consultas SQL → CSV → Power BI, publicado", hours: 6, category: "practica", tech: ["sql", "powerbi"], profile: ["da", "bi", "it"] },
    ],
  },
  {
    block: "datos",
    weeks: [23, 26],
    cap: 3,
    sequence: [
      { name: "P4b · Panel del pensionado con datos reales (ocupación, ingresos, clientes), anonimizado y publicado", hours: 12, category: "practica", tech: ["powerbi"], profile: ["da", "bi"] },
    ],
  },
  {
    block: "datos",
    weeks: [27, 39],
    cap: 2,
    sequence: [
      { name: "Práctica de SQL en HackerRank y LeetCode", hours: 14, category: "practica", tech: ["sql"], profile: ["da"], links: ["https://www.hackerrank.com/domains/sql", "https://leetcode.com/"] },
      { name: "P4a v2: los mismos indicadores con los tickets reales de P1 (base de datos de GLPI) y medidas DAX documentadas", hours: 8, category: "practica", tech: ["sql", "powerbi"], profile: ["da", "bi", "it"] },
      { name: "20 preguntas típicas de entrevista de datos (SQL, Excel, Power BI) respondidas", hours: 4, category: "empleabilidad", tech: ["sql", "excel", "powerbi"], profile: ["da"] },
    ],
  },

  // ── Empleo y portfolio (2 h en las semanas 1–26, 4 h en las 27–39) ──
  {
    block: "empleo",
    weeks: [1, 8],
    cap: 2,
    sequence: [
      { name: "Corregir el email de git y protocolo de IA: AI_USAGE.md en cada repo (sección 5)", hours: 1, category: "empleabilidad", tech: ["ia"] },
      { name: "CV en español e inglés, con el diploma de la Xunta", hours: 4, category: "empleabilidad" },
      { name: "LinkedIn", hours: 3, category: "empleabilidad" },
      { name: "GitHub: README de study_app y de Tu Lugar en Galicia", hours: 3, category: "empleabilidad" },
      { name: "Platzi «Preparar una Entrevista de Trabajo» (terminar, vas 13/19)", hours: 4, category: "empleabilidad" },
      { name: "Hoja de registro de postulaciones (fecha, empresa, filtro de residencia, inglés pedido, respuesta) y filtros de la sección 2", hours: 1, category: "empleabilidad" },
    ],
  },
  {
    block: "empleo",
    weeks: [9, 26],
    cap: 2,
    weekly: [
      { name: "Postulaciones: 5 por semana con los filtros de residencia de la sección 2, anotadas en la hoja", hours: 1, category: "empleabilidad", links: JOBS },
    ],
    sequence: [
      { name: "README «Lab host» en GitHub", hours: 2, category: "empleabilidad", profile: ["it"] },
      { name: "Platzi «Servicio al Cliente y Soporte a Usuarios»", hours: 7, category: "empleabilidad", profile: ["it"] },
      { name: "LinkedIn: una publicación por entrega (P1 v1, P2 v1, P4a v1)", hours: 3, category: "empleabilidad" },
      { name: "Platzi «Curso para Conseguir Trabajo en Tecnología»", hours: 1, category: "empleabilidad" },
      {
        name: "Entrevistas: preparar la pregunta sobre EOR («If I relocate to Spain in July 2027, could I keep the role through your EOR/contractor setup?»)",
        hours: 1,
        category: "empleabilidad",
      },
      { name: "Desde la semana 23: sumar ofertas de soporte de aplicaciones y de datos junior, con el CV adaptado", hours: 2, category: "empleabilidad" },
      { name: "Punto de control de la semana 26: postulaciones, respuestas y reparto de bloques (sección 7)", hours: 2, category: "empleabilidad" },
    ],
  },
  {
    block: "empleo",
    weeks: [27, 39],
    cap: 4,
    weekly: [
      { name: "Postulaciones: 10 por semana y entrevistas, anotadas en la hoja", hours: 2, category: "empleabilidad", links: JOBS },
      { name: "Simulacro semanal sin IA: un ticket aleatorio de P1 resuelto en voz alta, en inglés y con cronómetro", hours: 1, category: "practica", profile: ["it"] },
    ],
    sequence: [
      { name: "Scrum y Jira básico", hours: 3, category: "empleabilidad", links: ["https://scrumguides.org/"] },
      { name: "Banco de 30 preguntas técnicas respondidas en español e inglés", hours: 6, category: "empleabilidad", profile: ["it"] },
      { name: "Entrevistas en inglés: preparación y seguimiento de postulaciones", hours: 4, category: "empleabilidad" },
    ],
  },

  // ── Ampliación opcional (sección 4.1): 91 h, la semana no pasa de 19 h ──
  {
    block: "ampliacion",
    weeks: [1, 6],
    cap: 2,
    track: "opcional",
    sequence: [
      { name: "Platzi «Git + GitHub»", hours: 10, category: "fundamentos", profile: ["da", "it"], links: ["https://platzi.com/cursos/gitgithub/"] },
      { name: "Práctica: repositorios y flujo de trabajo (commits, ramas, pull requests)", hours: 2, category: "practica", profile: ["da", "it"] },
    ],
  },
  {
    block: "ampliacion",
    weeks: [7, 13],
    cap: 3,
    track: "opcional",
    sequence: [
      { name: "Platzi «Claude AI» (terminar, vas 5/20)", hours: 6, category: "claude", tech: ["ia"], links: ["https://platzi.com/cursos/claude"] },
      { name: "Claude 101 — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-101"] },
      { name: "AI Fluency: Framework & Foundations — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/ai-fluency-framework-foundations"] },
      { name: "AI Capabilities and Limitations — Anthropic", hours: 2, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/ai-capabilities-and-limitations"] },
      { name: "Platzi «Claude Code para No Programadores»", hours: 6, category: "claude", tech: ["ia"] },
    ],
  },
  {
    block: "ampliacion",
    weeks: [14, 19],
    cap: 2,
    track: "opcional",
    sequence: [
      { name: "Platzi «SQL Avanzado I»", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da"], links: ["https://platzi.com/cursos/sql-avanzado/"] },
      { name: "Práctica: optimización de consultas", hours: 2, category: "practica", tech: ["sql"], profile: ["da"] },
    ],
  },
  {
    block: "ampliacion",
    weeks: [20, 26],
    cap: 2,
    track: "opcional",
    sequence: [
      { name: "Platzi «SQL Avanzado II + PostgreSQL»", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da", "de"], links: ["https://platzi.com/cursos/postgresql/"] },
      { name: "Proyecto: diseñar una base de datos en PostgreSQL", hours: 4, category: "practica", tech: ["sql"], profile: ["da"] },
    ],
  },
  {
    block: "ampliacion",
    weeks: [27, 30],
    cap: 3,
    track: "opcional",
    sequence: [{ name: "Portfolio web en GitHub Pages con P1–P4", hours: 12, category: "empleabilidad", profile: ["it", "da"] }],
  },
  {
    block: "ampliacion",
    weeks: [31, 35],
    cap: 4,
    track: "opcional",
    sequence: [
      {
        name: "Contabilidad, finanzas y control de gestión para analistas (9 de 31 ofertas gallegas lo piden)",
        hours: 20,
        category: "negocio",
        tech: ["excel"],
        profile: ["da", "bi"],
        links: ["https://platzi.com/cursos/contabilidad-basica/", "https://platzi.com/cursos/planeacion-financiera/"],
      },
    ],
  },
]

// ───────────────────────────── FASE 2 · semanas 40–104 · 15 h fijas por semana (8 en la mudanza) ─────────────────────────────

const FASE2: Segment[] = [
  // ── Inglés (2 h en la mudanza y en las semanas 92–104; 3 h en las 44–91) ──
  {
    block: "ingles",
    weeks: [40, 43],
    cap: 2,
    weekly: [
      { name: "Inglés: Platzi English Academy B1", hours: 1, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Sesame", hours: 1, category: "ingles" },
    ],
  },
  {
    block: "ingles",
    weeks: [44, 69],
    cap: 3,
    weekly: [
      { name: "Inglés: Platzi English Academy B2", hours: 2, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Sesame", hours: 1, category: "ingles" },
    ],
  },
  {
    block: "ingles",
    weeks: [70, 91],
    cap: 3,
    weekly: [
      { name: "Inglés: Platzi English Academy B2", hours: 1, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: Sesame", hours: 1, category: "ingles" },
    ],
    sequence: [
      { name: "Inglés: preparación de Aptis General B2", hours: 21, category: "ingles", links: ["https://www.britishcouncil.es/en/exam/aptis/what"] },
      { name: "Inglés: examen Aptis General B2 (semana 91)", hours: 1, category: "ingles", links: [APTIS], cert: "Aptis B2" },
    ],
  },
  {
    block: "ingles",
    weeks: [92, 104],
    cap: 2,
    weekly: [
      { name: "Inglés: Platzi English Academy B2", hours: 1, category: "ingles", links: [PLATZI_ING] },
      { name: "Inglés: conversación", hours: 1, category: "ingles" },
    ],
  },

  // ── Alemán (4 h en las semanas 44–69, 6 h en las 70–91, 7 h en las 92–104): ≈ 327 h hasta B1 ──
  {
    block: "aleman",
    weeks: [44, 69],
    cap: 4,
    sequence: [
      { name: "Alemán A1: vhs-Lernportal y Goethe «Deutsch üben»", hours: 64, category: "aleman", links: ["https://a1.vhs-lernportal.de/", VHS] },
      { name: "Alemán A2: vhs-Lernportal (inicio)", hours: 40, category: "aleman", links: [VHS] },
    ],
  },
  {
    block: "aleman",
    weeks: [70, 91],
    cap: 6,
    sequence: [
      { name: "Alemán A2: vhs-Lernportal (resto)", hours: 60, category: "aleman", links: [VHS] },
      { name: "Alemán: examen A2 opcional (ÖSD o Goethe) o simulacro", hours: 2, category: "aleman", links: [OSD] },
      { name: "Alemán B1: vhs-Lernportal (inicio)", hours: 70, category: "aleman", links: [VHS] },
    ],
  },
  {
    block: "aleman",
    weeks: [92, 104],
    cap: 7,
    sequence: [
      { name: "Alemán B1: vhs-Lernportal (resto)", hours: 70, category: "aleman", links: [VHS] },
      { name: "Alemán B1: modelos de examen ÖSD y Goethe", hours: 18, category: "aleman", links: [OSD] },
      { name: "Alemán: examen B1, ÖSD o Goethe (semana 104)", hours: 3, category: "aleman", links: [OSD], cert: "Alemán B1 (ÖSD o Goethe)" },
    ],
  },

  // ── Sistemas (4 h en la mudanza, 5 h en las semanas 44–69, 4 h en las 70–104) ──
  {
    block: "soporte",
    weeks: [40, 43],
    cap: 4,
    weekly: [
      { name: "Postulaciones a helpdesk N1 en Galicia y en remoto desde España, ya residiendo allí", hours: 2, category: "empleabilidad", profile: ["it"], links: JOBS_ES },
    ],
    sequence: [
      { name: "Mudanza: padrón, DNI e inscripción como demandante de empleo en Galicia (da acceso al programa de la Xunta para mayores de 52)", hours: 4, category: "empleabilidad" },
      { name: "Volver a montar el laboratorio P1 tras la mudanza", hours: 4, category: "practica", profile: ["it", "sys"], tech: ["windows"] },
    ],
  },
  {
    block: "soporte",
    weeks: [44, 60],
    cap: 5,
    sequence: [
      { name: "MD-102 (Endpoint Administrator): ruta de Microsoft Learn (Intune, despliegue de Windows, cumplimiento de dispositivos)", hours: 60, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
      {
        name: "MD-102: laboratorio de Intune (prueba de 30 días de Intune o M365 Business Premium, opcional: pide tarjeta, cancela a tiempo)",
        hours: 12,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["windows"],
        links: [MD102],
      },
      { name: "MD-102: simulacros", hours: 10, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
      { name: "MD-102: examen (semana 60)", hours: 3, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102], cert: "MD-102" },
    ],
  },
  {
    block: "soporte",
    weeks: [61, 69],
    cap: 5,
    sequence: [
      { name: "Windows Server avanzado", hours: 12, category: "sistemas", profile: ["sys"], tech: ["windows"] },
      { name: "Identidad híbrida: Entra Connect", hours: 8, category: "sistemas", profile: ["sys"], tech: ["windows", "cloud"] },
      { name: "Platzi «Azure Active Directory»", hours: 8, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "cloud"], links: ["https://platzi.com/escuela/devops-cloud/"] },
      { name: "PowerShell intermedio: funciones, manejo de errores y logs", hours: 10, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "linux"] },
      { name: "P2 v2: manejo de errores, parámetros, una prueba simple y CSV de resultados que lee P4a", hours: 7, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"] },
    ],
  },
  {
    block: "soporte",
    weeks: [70, 91],
    cap: 4,
    sequence: [
      { name: "Platzi «AZ-900» como entrada a Azure", hours: 5, category: "sistemas", profile: ["it", "sys"], tech: ["cloud"], links: ["https://platzi.com/cursos/az-900/"] },
      { name: "AZ-104 (Azure Administrator): ruta de Microsoft Learn", hours: 44, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104] },
      {
        name: "AZ-104: laboratorios (la cuenta gratuita de Azure da 200 US$ por 30 días y pide tarjeta; los sandboxes de Learn ya no existen)",
        hours: 14,
        category: "certificacion",
        profile: ["sys"],
        tech: ["cloud"],
        links: [AZ104, "https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account"],
      },
      { name: "AZ-104: simulacros", hours: 10, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104] },
      { name: "AZ-104: examen (semana 88)", hours: 3, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104], cert: "AZ-104 Azure Administrator" },
      { name: "Cisco Linux Essentials (semanas 89–91)", hours: 12, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NETACAD_IT] },
    ],
  },
  {
    block: "soporte",
    weeks: [92, 104],
    cap: 4,
    // con las semanas 89–91 suman 64 de sus 70 h; el resto va a la Fase 7
    sequence: [{ name: "Cisco Linux Essentials (continuación)", hours: 52, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NETACAD_IT] }],
  },

  // ── Datos (2 h en la mudanza, 3 h en las semanas 44–69, 2 h en las 70–104) ──
  {
    block: "datos",
    weeks: [40, 43],
    cap: 2,
    weekly: [
      { name: "Postulaciones a puestos con Excel y Power BI en Galicia y en remoto desde España", hours: 1, category: "empleabilidad", profile: ["da", "bi"], links: JOBS_ES },
    ],
    sequence: [
      { name: "Adaptar P4 y el CV a ofertas de negocio con Power BI (administración, finanzas, control de gestión)", hours: 4, category: "empleabilidad", tech: ["powerbi"], profile: ["da", "bi"] },
    ],
  },
  {
    block: "datos",
    weeks: [44, 60],
    cap: 3,
    sequence: [
      { name: "Platzi «Power BI Avanzado»", hours: 24, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: ["https://platzi.com/cursos/power-bi/"] },
      {
        name: "Modelado de datos: esquema estrella, modelo semántico, Power Query y DAX en profundidad",
        hours: 15,
        category: "bi",
        tech: ["powerbi", "sql"],
        profile: ["da", "bi"],
        links: ["https://learn.microsoft.com/es-es/training/modules/design-model-power-bi/"],
      },
      { name: "PL-300: ruta de Microsoft Learn (parte 1)", hours: 12, category: "certificacion", tech: ["powerbi"], profile: ["bi", "da"], links: [PL300] },
    ],
  },
  {
    block: "datos",
    weeks: [61, 69],
    cap: 3,
    sequence: [
      { name: "PL-300: ruta de Learn (resto), simulacros y laboratorios", hours: 24, category: "certificacion", tech: ["powerbi"], profile: ["bi", "da"], links: [PL300] },
      { name: "PL-300: examen (semana 69)", hours: 3, category: "certificacion", tech: ["powerbi"], profile: ["bi", "da"], links: [PL300], cert: "PL-300 Power BI" },
    ],
  },
  {
    block: "datos",
    weeks: [70, 91],
    cap: 2,
    sequence: [
      { name: "Platzi «Fundamentos de Python» (vas 5/32)", hours: 16, category: "fundamentos", tech: ["python"], profile: ["da"], links: ["https://platzi.com/cursos/python-basico/"] },
      { name: "Python con pandas: Platzi «Python para Ciencia de Datos»", hours: 24, category: "python_avanzado", tech: ["python"], profile: ["da"], links: ["https://platzi.com/escuela/datos/"] },
      { name: "Práctica: pandas con los datos de P4", hours: 4, category: "practica", tech: ["python"], profile: ["da"] },
    ],
  },
  {
    block: "datos",
    weeks: [92, 104],
    cap: 2,
    sequence: [
      { name: "Proyecto Python + SQL en GitHub (con CTE y funciones de ventana)", hours: 12, category: "practica", tech: ["python", "sql"], profile: ["da"] },
      { name: "Platzi «Análisis Exploratorio de Datos (EDA)» aplicado al proyecto Python + SQL", hours: 12, category: "analisis", tech: ["python", "sql"], profile: ["da"], links: ["https://platzi.com/cursos/eda/"] },
      { name: "Portfolio de datos y CV para España y Viena", hours: 2, category: "empleabilidad", profile: ["da"] },
    ],
  },

  // ── Gallego opcional desde la mudanza (sección 3) ──
  {
    block: "ampliacion",
    weeks: [44, 104],
    cap: 1,
    track: "opcional",
    weekly: [{ name: "Gallego básico (opcional; 3 de 19 ofertas españolas de soporte lo piden)", hours: 1, category: "idiomas" }],
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
      for (let w = from; w <= to; w++) put(w, toTask(item, item.hours, item.name, w === to, seg.track))
    }
    if (seg.sequence) pour(seg.sequence, from, weeks, free, seg.track).forEach((p) => put(p.week, p.task))
  }
}

schedule(FASE1)
schedule(FASE2)

/** Horas fijas planificadas de una semana (sin las opcionales ni la Fase 7) */
export function getWeeklyHours(week: number): number {
  return (BY_WEEK[week] ?? []).reduce((sum, cell) => sum + (cell.task.track ? 0 : cell.task.durationHours), 0)
}

/** Tareas de una semana (1–104), ordenadas: inglés, alemán, soporte y sistemas, datos, empleo y ampliación opcional */
export function getRouteTasks(week: number): RouteTask[] {
  return (BY_WEEK[week] ?? [])
    .map((cell, order) => ({ cell, order }))
    .sort((a, b) => BLOCK_ORDER.indexOf(a.cell.block) - BLOCK_ORDER.indexOf(b.cell.block) || a.order - b.order)
    .map(({ cell }) => cell.task)
}

// ───────────────────────────── FASE 7 · después de octubre de 2028 (sin plazo) ─────────────────────────────
// En el orden de la sección 4.1: BI en Galicia, sistemas, datos e IA; al final, lo que la ruta no ubica (empleo, otros
// idiomas y cursos de Platzi en pausa). Cada módulo conserva sus horas y su nivel de interés. Las horas marcadas
// «estimadas» no figuran en ningún documento.

const f7 = (item: RouteItem): RouteTask => toTask(item, item.hours, item.name, true, "fase7")

const FASE7: RouteItem[] = [
  // 1 · BI en Galicia (si tu empleo o una oferta lo piden, entran antes en el bloque de datos)
  { name: "Introducción a ERP/SAP (8 de 31 ofertas gallegas)", hours: 11, category: "negocio", profile: ["bi"], links: ["https://learning.sap.com/courses/exploring-sap-analytics-cloud", "https://learning.sap.com/courses/discovering-sap-s-4hana-embedded-analytics"] },
  { name: "ERP y SAP para analistas: SAP Analytics Cloud y analítica en S/4HANA", hours: 4, category: "negocio", profile: ["bi"], links: ["https://learning.sap.com/courses/exploring-sap-analytics-cloud", "https://learning.sap.com/courses/discovering-sap-s-4hana-embedded-analytics"] },
  { name: "Power Automate: automatización de procesos", hours: 8, category: "bi", profile: ["bi"], links: ["https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/"] },
  { name: "Platzi «Business Intelligence Estratégico»", hours: 10, category: "bi", tech: ["powerbi"], profile: ["bi", "da"], links: ["https://platzi.com/cursos/business-intelligence/"] },
  { name: "Caso práctico: KPIs de un negocio", hours: 3, category: "practica", tech: ["powerbi"], profile: ["bi", "da"] },
  { name: "Microsoft Fabric: introducción", hours: 8, category: "bi", tech: ["cloud"], profile: ["bi"], links: ["https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"] },
  { name: "Qlik Sense: introducción", hours: 6, category: "bi", profile: ["bi"], links: ["https://learning.qlik.com/student/collection/2196958-qlik-sense-business-analyst-free-learning-content"] },
  // 2 · sistemas
  { name: "ITIL 4 Foundation: preparación (si lo paga la empresa, entra en las semanas 92–104)", hours: 18, category: "certificacion", profile: ["it", "sys"] },
  { name: "ITIL 4 Foundation: examen (solo si lo paga la empresa)", hours: 2, category: "certificacion", profile: ["it", "sys"], cert: "ITIL 4 Foundation" },
  { name: "AZ-900: práctica y guía de Microsoft Learn (el examen es opcional y sin fecha)", hours: 22, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: [AZ900] },
  { name: "AZ-900: examen opcional (€76 en España)", hours: 1, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: [AZ900], cert: "AZ-900 Azure Fundamentals" },
  { name: "AB-900: examen opcional (la guía ya está en las semanas 18–22)", hours: 2, category: "certificacion", profile: ["it"], tech: ["windows"], links: [AB900], cert: "AB-900" },
  { name: "Cisco: Introducción a Ciberseguridad", hours: 6, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
  { name: "Cisco: Seguridad de Terminales", hours: 27, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
  { name: "Platzi «Seguridad Informática para Equipos Técnicos»", hours: 3, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: ["https://platzi.com/escuela/devops-cloud/"] },
  { name: "Platzi «Redes Informáticas de Internet»", hours: 6, category: "soporte", profile: ["it"], tech: ["redes"], links: ["https://platzi.com/cursos/redes/"] },
  { name: "Platzi «Servidores Linux» (4 h de curso + 2 h de práctica)", hours: 6, category: "sistemas", profile: ["sys"], tech: ["linux"], links: ["https://platzi.com/escuela/devops-cloud/"] },
  { name: "Cisco Linux Essentials (resto de las 70 h)", hours: 6, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NETACAD_IT] },
  { name: "Opción A · Platzi Azure: IaaS, almacenamiento y bases de datos en Azure", hours: 20, category: "sistemas", profile: ["sys"], tech: ["cloud"], links: ["https://platzi.com/escuela/devops-cloud/"] },
  { name: "Opción A · Cisco «Carrera Profesional de Técnico en Redes»", hours: 70, category: "sistemas", profile: ["sys"], tech: ["redes"], links: [NETACAD_NET] },
  { name: "Opción A · CCNA (Cisco) — horas estimadas", hours: 120, category: "certificacion", profile: ["sys"], tech: ["redes"], links: [NETACAD_NET] },
  { name: "Opción B · Cisco «Analista Junior en Ciberseguridad»", hours: 120, category: "seguridad", profile: ["sys"], tech: ["seguridad"], links: [NETACAD_SEC] },
  { name: "Opción B · Google Cybersecurity — horas estimadas", hours: 70, category: "certificacion", profile: ["sys"], tech: ["seguridad"], links: ["https://grow.google/certificates/cybersecurity/"] },
  { name: "Opción B · CompTIA Security+ — horas estimadas", hours: 60, category: "certificacion", profile: ["sys"], tech: ["seguridad"], links: ["https://www.comptia.org/certifications/security"] },
  { name: "Cloud AWS: fundamentos (para comparar con Azure, tras AZ-104)", hours: 10, category: "ingenieria", tech: ["cloud"], profile: ["de", "sys"], links: ["https://platzi.com/cursos/aws-fundamentos/"] },
  { name: "Práctica: desplegar un servicio básico en AWS", hours: 3, category: "practica", tech: ["cloud"], profile: ["de", "sys"] },
  // 3 · datos
  { name: "Platzi «Visualización: Matplotlib y Seaborn»", hours: 12, category: "python_avanzado", tech: ["python"], profile: ["da"], links: ["https://platzi.com/cursos/matplotlib-seaborn/"] },
  { name: "Entrevistas técnicas: ejercicios de Python en LeetCode y HackerRank", hours: 9, category: "empleabilidad", tech: ["python"], links: ["https://leetcode.com/", "https://www.hackerrank.com/"] },
  { name: "Platzi «Excel con Python (OpenPyXL)»", hours: 10, category: "fundamentos", tech: ["python", "excel"], profile: ["da"], links: ["https://platzi.com/cursos/python-excel/"] },
  { name: "Proyecto: automatización de informes en Excel con Python", hours: 3, category: "practica", tech: ["python", "excel"], profile: ["da"] },
  { name: "Tableau Básico", hours: 10, category: "bi", tech: ["tableau"], profile: ["da"], links: ["https://platzi.com/cursos/tableau/"] },
  { name: "Práctica: Visualizaciones en Tableau", hours: 3, category: "practica", tech: ["tableau"], profile: ["da"] },
  { name: "Tableau Avanzado", hours: 6, interest: "media", category: "bi", tech: ["tableau"], profile: ["da"], links: ["https://platzi.com/cursos/tableau-avanzado/"] },
  { name: "Proyecto: Dashboard ejecutivo", hours: 2, interest: "media", category: "practica", tech: ["tableau"], profile: ["da"] },
  { name: "Looker Studio + Google Analytics", hours: 10, category: "bi", profile: ["da"], links: ["https://platzi.com/cursos/google-data-studio/"] },
  { name: "Proyecto: Reporte automatizado en Looker Studio", hours: 3, category: "practica", profile: ["da"] },
  { name: "Analítica de producto y web: GA4, embudos, cohortes y retención", hours: 6, interest: "media", category: "analisis", profile: ["da"], links: ["https://support.google.com/analytics/answer/6367342?hl=es"] },
  { name: "Storytelling con Datos", hours: 10, category: "bi", profile: ["da"], links: ["https://platzi.com/cursos/storytelling-datos/"] },
  { name: "Proyecto: Presentación ejecutiva", hours: 3, category: "practica", profile: ["da"] },
  { name: "Proyecto Integrador BI: de los datos al dashboard y la presentación", hours: 10, category: "practica", tech: ["powerbi", "sql"], profile: ["bi", "da"] },
  { name: "Portfolio: documentación del proyecto integrador", hours: 3, category: "practica", tech: ["powerbi"], profile: ["bi", "da"] },
  { name: "Google Data Analytics — Módulo 1", hours: 10, category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/data-analytics/"] },
  { name: "Google Data Analytics — Módulos 2–8", hours: 80, category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/data-analytics/"], cert: "Google Data Analytics" },
  { name: "Estadística Descriptiva", hours: 10, category: "analisis", tech: ["python"], profile: ["ds"], links: ["https://platzi.com/cursos/estadistica-descriptiva/"] },
  { name: "Proyecto: Análisis estadístico", hours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "Platzi «Matemáticas para Data Science»: estadística inferencial", hours: 10, category: "fundamentos", tech: ["python"], profile: ["ds"], links: ["https://platzi.com/cursos/estadistica-inferencial/"] },
  { name: "Práctica: ejercicios matemáticos y de probabilidad", hours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "A/B Testing & Experimentación", hours: 6, interest: "media", category: "analisis", tech: ["python"], profile: ["ds", "da"], links: ["https://platzi.com/cursos/ab-testing/"] },
  { name: "Proyecto: Diseño de experimento", hours: 2, interest: "media", category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "Google Advanced DA — Preparación", hours: 20, interest: "media", category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/advanced-data-analytics/"] },
  { name: "Google Advanced DA — Examen", hours: 10, interest: "media", category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/advanced-data-analytics/"], cert: "Google Advanced DA" },
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
  { name: "Calidad de datos: validaciones y tests", hours: 5, category: "analisis", tech: ["sql"], profile: ["da"], links: ["https://docs.getdbt.com/docs/build/data-tests"] },
  { name: "Stack moderno: dbt con BigQuery y Snowflake (introducción)", hours: 10, category: "ingenieria", tech: ["sql", "cloud"], profile: ["da", "de"], links: ["https://docs.getdbt.com/guides/bigquery", "https://docs.snowflake.com/en/user-guide/tutorials/snowflake-in-20minutes"] },
  { name: "Docker & Containerization", hours: 4, interest: "baja", category: "ingenieria", profile: ["de"], links: ["https://platzi.com/cursos/docker/"] },
  { name: "Proyecto: Containerizar app", hours: 1, interest: "baja", category: "practica", profile: ["de"] },
  { name: "Kubernetes — horas estimadas", hours: 10, interest: "baja", category: "ingenieria", profile: ["de"] },
  // 4 · IA: resto de los cursos de Claude, de los conceptos a la API y después a los agentes
  { name: "Claude Code 101 — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-code-101"] },
  { name: "Claude Code in Action — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-code-in-action"] },
  { name: "Platzi «Microsoft 365 Copilot»", hours: 3, category: "ia", profile: ["it"], tech: ["windows", "ia"], links: ["https://platzi.com/escuela/devops-cloud/"] },
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
  // 5 · lo que la ruta no ubica: búsqueda de empleo, otros idiomas y cursos de Platzi en pausa
  { name: "Networking y aplicaciones: contactos, reclutadores y comunidades", hours: 10, category: "empleabilidad" },
  { name: "Estrategia de búsqueda de empleo: embudo, seguimiento y métricas", hours: 3, category: "empleabilidad" },
  { name: "Francés (subir desde A2)", hours: 20, interest: "baja", category: "idiomas" },
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
