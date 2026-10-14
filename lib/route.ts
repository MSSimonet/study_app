import type { Interest, TaskTrack } from "./types"

/**
 * Ruta de 24 meses v3 (docs/ruta-24-meses-2026-28.md): 20 h fijas por semana (10 en la mudanza, semanas 40–43).
 * Inicio lunes 26/10/2026 · primer empleo hacia la semana 39 · fin domingo 22/10/2028 (semana 104). Total: 2.040 h.
 *
 * Capacidad semanal de cada bloque (secciones 3, 4 y 4.2 del doc):
 *  - Semanas 1–26:   inglés 6 + soporte 6 + datos 4 + empleo 2 + ampliación 2 = 20 h
 *  - Semanas 27–39:  inglés 6 + soporte 5 + datos 3 + empleo 4 + ampliación 2 = 20 h
 *  - Semanas 40–43:  inglés 2 + sistemas 4 + datos 2 + empleo 2 = 10 h (mudanza)
 *  - Semanas 44–91:  inglés 4 + alemán 3 + sistemas 7 + datos 5 + gallego 1 = 20 h
 *  - Semanas 92–104: inglés 3 + alemán 3 + sistemas 7 + datos 5 + empleo 1 + gallego 1 = 20 h
 * Dentro de cada tramo, los módulos "weekly" se repiten cada semana y los "sequence" se vierten en orden sobre las horas
 * que quedan. Si un tramo no cuadra, el módulo falla al cargar. Lo que la sección 4.2 suma va en su orden, detrás del
 * núcleo de cada tramo; si no entra, pasa al tramo siguiente y, si no entra en ninguno, queda en la Fase 7.
 *
 * Exámenes: en su semana, lo que los prepara va antes (de lunes a viernes), el examen va el sábado y el domingo sigue
 * con la tarea siguiente del bloque (lib/daily-plan.ts). Por eso los tramos de sistemas se cortan en la semana del
 * examen: las 3 h previas al sábado (lunes, miércoles y viernes) son de repaso y la hora del domingo, del tramo siguiente.
 * El inglés es una tarea semanal con la rutina de la sección 3.1, que lib/daily-plan.ts reparte por días.
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

export type Block = "ingles" | "aleman" | "soporte" | "datos" | "empleo" | "ampliacion" | "gallego"
const BLOCK_ORDER: Block[] = ["ingles", "aleman", "soporte", "datos", "empleo", "ampliacion", "gallego"]

interface Segment {
  block: Block
  weeks: [number, number]
  /** horas por semana del bloque en este tramo */
  cap: number
  /** módulos que se repiten cada semana (horas por semana) */
  weekly?: RouteItem[]
  /** módulos en orden; las horas son el total y se reparten en las semanas */
  sequence?: RouteItem[]
}

/** Semana a la que van las tareas de la Fase 7 (sin plazo) */
export const FASE7_WEEK = 105

// ── Enlaces: solo los del anexo «Enlaces verificados», los de la sección 3.1 y los comprobados el 13/10/2026 ──
const NA_HW = "https://www.netacad.com/es/courses/computer-hardware-basics?courseLang=es-XL"
const NA_OS = "https://www.netacad.com/es/courses/operating-systems-basics"
const NA_ITCS = "https://www.netacad.com/es/courses/it-customer-support-basics"
const NA_NET = "https://www.netacad.com/es/courses/networking-basics"
const NA_UNHATCHED = "https://www.netacad.com/es/courses/linux-unhatched?courseLang=es-XL"
const NA_LINUX = "https://www.netacad.com/es/courses/fundamentos-de-linux?courseLang=es-XL"
const NA_ITSS = "https://www.netacad.com/es/career-paths/it-support-specialist"
const NA_CIBER = "https://www.netacad.com/es/courses/introduction-to-cybersecurity"
const NA_ENDPOINT = "https://www.netacad.com/es/courses/endpoint-security"
const NA_NETTECH = "https://www.netacad.com/es/career-paths/network-technician"
const NA_CYBERPATH = "https://www.netacad.com/es/career-paths/cybersecurity"
const NA_CCNA = "https://www.netacad.com/es/courses/ccna-introduction-networks"
const PACKET_TRACER = "https://www.netacad.com/cisco-packet-tracer"
const P = (slug: string) => `https://platzi.com/cursos/${slug}/`
const EA = (slug: string) => `https://platzi.com/english-academy/${slug}/`
export const LLL = "https://labs.google/lll/es"
export const SESAME = "https://app.sesame.com/"
export const ED = "https://ed.engdis.com/cababilingue#/login"
const PLATZI_TEST = "https://platzi.com/evaluation/test-ingles/"
const VHS_A1 = "https://a1.vhs-lernportal.de/"
const APTIS = "https://www.britishcouncil.es/eu/azterketak/aptis/datak-prezioak-tokiak"
const OSD = "https://sprachenzentrum.univie.ac.at/en/language-university/oesd-examinations"
const GLPI = "https://github.com/glpi-project/docker-images"
const VBOX = "https://www.virtualbox.org/wiki/Downloads"
const UBUNTU = "https://ubuntu.com/download/server"
const WS2025 = "https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025"
const WIN11 = "https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-enterprise"
const PS_INTRO = "https://learn.microsoft.com/es-es/training/modules/introduction-to-powershell/"
const PS_AD = "https://learn.microsoft.com/es-es/powershell/module/activedirectory/"
const ENTRA_CONNECT = "https://learn.microsoft.com/es-es/entra/identity/hybrid/connect/whatis-azure-ad-connect"
const AB900 = "https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-900/"
const MD102 = "https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/"
const PL300 = "https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/"
const AZ104 = "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/"
const AZ900 = "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
const AZURE_FREE = "https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account"
const HACKERRANK_SQL = "https://www.hackerrank.com/domains/sql"
const LEETCODE_SQL = "https://leetcode.com/studyplan/top-sql-50/"
const DEEL_ES = "https://www.deel.com/employees/spain"
// enlaces añadidos el 13/10/2026 por la tarde (anexo del doc)
const PLATZI_CV = P("conseguir-trabajo-tech")
const PLATZI_LINKEDIN = P("linkedin")
const PLATZI_ENTREVISTA = P("entrevista-trabajo")
const LEETCODE_PANDAS = "https://leetcode.com/studyplan/30-days-of-pandas/"
const ITIL5 = "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154"
const ITIL4 = "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-foundation-2565"
const CELGA1 = "https://www.lingua.gal/recursos/para-aprender-o-galego/_/celga-1/contido_0052/curso-celga-1-lina"
const CELGA2 = "https://www.lingua.gal/recursos/para-aprender-o-galego/_/celga-2/contido_0047/curso-celga-2-lina"
const PADRON_CORUNA = "https://www.coruna.gal/web/gl/detalle/empadroamento-normas-e-obtencion-do-volante-ou-certificado/contenido/1149055362379"
const CITA_DNI = "https://www.citapreviadnie.es/"
const ITIL_NAME = "ITIL Foundation (versión 5; la 4 sigue disponible)"
const JOBS = [
  "https://www.tecnoempleo.com/ofertas-trabajo/?te=helpdesk",
  "https://www.remoterocketship.com/country/argentina/jobs/it-support/",
  "https://www.remoterocketship.com/country/argentina/jobs/technical-support/",
]
const JOBS_ES = ["https://www.tecnoempleo.com/ofertas-trabajo/?te=soporte", "https://www.tecnoempleo.com/ofertas-trabajo/?te=helpdesk"]

// ───────────────────────────── Inglés: orden de Platzi (sección 3.1) ─────────────────────────────

export interface EnglishWeek {
  weeks: [number, number]
  /** nivel o curso de Platzi de la semana (paso 1 de la rutina) */
  platzi: { label: string; links: string[] }
  /** curso práctico del sábado, junto a la Revista Discoveries */
  sabado: { label: string; link: string }
}

const VOCABULARIO = { label: "Platzi «Vocabulario en Inglés para el Trabajo»", link: P("ingles-basico-trabajo") }
const APTIS_MODELOS = { label: "Aptis: modelos de examen", link: APTIS }
const B1 = { label: "Platzi B1 (18 cursos)", links: [EA("intermediate-core")] }
const B2_RESTO = { label: "Platzi: resto de B2; después, C1", links: [EA("intermediate-core2"), EA("advanced-core")] }

export const ENGLISH_ORDER: EnglishWeek[] = [
  { weeks: [1, 13], platzi: { label: "Platzi A2: terminar los 10 cursos que faltan", links: [EA("beginner-core2")] }, sabado: VOCABULARIO },
  { weeks: [14, 17], platzi: { label: "Platzi «Inglés para Programadores» (terminar)", links: [P("ingles-developers")] }, sabado: VOCABULARIO },
  {
    weeks: [18, 22],
    platzi: { label: "Platzi «Inglés para Servicio al Cliente»", links: [P("customerservice")] },
    sabado: { label: "Platzi «Inglés para Servicio al Cliente»: juego de roles de soporte", link: P("customerservice") },
  },
  {
    weeks: [23, 26],
    platzi: { label: "Platzi «Inglés para Entrevistas de Trabajo» y test de nivel (punto de control B1)", links: [P("ingles-entrevistas"), PLATZI_TEST] },
    sabado: { label: "Platzi «Inglés para Entrevistas de Trabajo»: simulacro de entrevista", link: P("ingles-entrevistas") },
  },
  { weeks: [27, 40], platzi: B1, sabado: { label: "Platzi «Practicar Inglés con AI»", link: P("practica-ingles-con-ai") } },
  { weeks: [41, 56], platzi: B1, sabado: { label: "Platzi «Inglés Práctico y Conversacional»", link: P("ingles-conversacional") } },
  { weeks: [57, 60], platzi: B1, sabado: APTIS_MODELOS },
  {
    weeks: [61, 77],
    platzi: { label: "Platzi B2, con «Inglés Práctico para Conversaciones de Trabajo» primero", links: [P("taller-conversaciones-trabajo"), EA("intermediate-core2")] },
    sabado: APTIS_MODELOS,
  },
  { weeks: [78, 78], platzi: { label: "Repaso para el Aptis General B2", links: [APTIS] }, sabado: APTIS_MODELOS },
  { weeks: [79, 91], platzi: B2_RESTO, sabado: { label: "Platzi «Inglés para el Desarrollo Profesional»", link: P("ingles-intermedio-trabajo") } },
  { weeks: [92, 104], platzi: B2_RESTO, sabado: { label: "Platzi «Inglés para Ciberseguridad»", link: P("ingles-ciberseguridad") } },
]

export function englishWeek(week: number): EnglishWeek {
  return ENGLISH_ORDER.find((e) => week >= e.weeks[0] && week <= e.weeks[1]) ?? ENGLISH_ORDER[ENGLISH_ORDER.length - 1]
}

/** Comienzo del nombre de la tarea semanal de inglés (la rutina de la sección 3.1) */
export const ENGLISH_ROUTINE_PREFIX = "Inglés: rutina diaria"
const routine = (e: EnglishWeek, hours: number, cert?: string): RouteItem => ({
  name: `${ENGLISH_ROUTINE_PREFIX} · ${e.platzi.label} · Little Language Lessons · Sesame · 3 frases · sábado: Revista Discoveries y ${e.sabado.label}`,
  hours,
  category: "ingles",
  links: [...e.platzi.links, LLL, SESAME, ED, e.sabado.link],
  cert,
})
const englishSegments = (from: number, to: number, cap: number): Segment[] =>
  ENGLISH_ORDER.filter((e) => e.weeks[1] >= from && e.weeks[0] <= to).map((e) => ({
    block: "ingles" as const,
    weeks: [Math.max(from, e.weeks[0]), Math.min(to, e.weeks[1])] as [number, number],
    cap,
    // el certificado de A2 de Platzi se obtiene al terminar la semana 13
    weekly: [routine(e, cap, e.weeks[1] === 13 ? "Inglés A2 (Platzi)" : undefined)],
  }))

// ───────────────────────────── FASE 1 · semanas 1–39 · 20 h por semana ─────────────────────────────

const FASE1: Segment[] = [
  ...englishSegments(1, 39, 6),

  // ── Soporte: 6 h en las semanas 1–26 (sección 4.2: redes de Platzi, ciberseguridad, seguridad y teoría de Intune) ──
  {
    block: "soporte",
    weeks: [1, 26],
    cap: 6,
    sequence: [
      { name: "Platzi «Computadores e Informática» (terminar, vas 16/26)", hours: 3, category: "soporte", profile: ["it"], links: [P("computacion-basica")] },
      { name: "Platzi «Terminal» (terminar, vas 23/26)", hours: 1, category: "soporte", profile: ["it"], tech: ["linux"], links: [P("terminal")] },
      { name: "Cisco: Hardware Basics", hours: 6, category: "soporte", profile: ["it"], links: [NA_HW] },
      { name: "Cisco: Operating Systems Basics", hours: 12, category: "soporte", profile: ["it"], tech: ["windows"], links: [NA_OS] },
      { name: "Cisco: IT Customer Support Basics", hours: 4, category: "soporte", profile: ["it"], links: [NA_ITCS] },
      { name: "Cisco: Conceptos básicos de redes", hours: 22, category: "soporte", profile: ["it"], tech: ["redes"], links: [NA_NET] },
      { name: "Platzi «Redes Informáticas de Internet»", hours: 6, category: "soporte", profile: ["it"], tech: ["redes"], links: [P("redes")] },
      {
        name: "Preparar el host: ¿Windows Home? (sin Hyper-V → VirtualBox 7.2), Ubuntu Server 26.04 en VM con práctica de Linux, y descargar las evaluaciones de Windows Server 2025 y Windows 11 (se instalan en la semana 14)",
        hours: 5,
        category: "practica",
        profile: ["it", "sys"],
        tech: ["linux", "windows"],
        links: [VBOX, UBUNTU],
      },
      { name: "GLPI en Docker (glpi/glpi): categorías, prioridades, SLA y base de conocimiento", hours: 9, category: "practica", profile: ["it"], links: [GLPI] },
      { name: "Práctica en Packet Tracer", hours: 3, category: "practica", profile: ["it"], tech: ["redes"], links: [PACKET_TRACER] },
      { name: "Cisco: Introducción a Ciberseguridad", hours: 6, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [NA_CIBER] },
      { name: "Platzi «Seguridad Informática para Equipos Técnicos»", hours: 3, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [P("seguridad-empresas")] },
      { name: "P1 · Pyme Ficticia: controlador de dominio en Windows Server 2025 Core (2 GB) con DNS y DHCP", hours: 6, category: "practica", profile: ["it", "sys"], tech: ["windows", "redes"], links: [WS2025] },
      { name: "P1: unidades organizativas, usuarios, grupos y GPO (unidades de red, contraseñas, bloqueo de pantalla)", hours: 7, category: "practica", profile: ["it", "sys"], tech: ["windows"], links: [WS2025] },
      { name: "P1: cliente Windows 11 (4 GB, vTPM) unido al dominio", hours: 4, category: "practica", profile: ["it"], tech: ["windows"], links: [WIN11] },
      { name: "P1 v1: README, diagrama de red y publicación en GitHub", hours: 3, category: "practica", profile: ["it", "sys"], links: [P("gitgithub")] },
      { name: "PowerShell básico con el módulo de Active Directory", hours: 9, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "linux"], links: [PS_INTRO, PS_AD] },
      { name: "P2 v1: altas y bajas desde un CSV de RRHH con PowerShell (usuarios, grupos, carpetas y logs), publicado", hours: 8, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"], links: [PS_AD] },
      { name: "Microsoft 365 y Entra ID: guía de AB-900 en Microsoft Learn (sin examen)", hours: 8, category: "sistemas", profile: ["it"], tech: ["windows", "cloud"], links: [AB900] },
      { name: "Teoría de Intune: primeros módulos de la ruta MD-102 en Learn (parte 1 de 18 h)", hours: 11, category: "sistemas", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
      { name: "ITSM: incidente, problema, cambio y SLA", hours: 3, category: "soporte", profile: ["it"], links: [NA_ITSS] },
      { name: "P1: primeras 5 incidencias simuladas, cada una con su ticket en GLPI", hours: 5, category: "practica", profile: ["it"], links: [GLPI] },
      { name: "Cisco: IT Support Specialist Career Path (parte 1 de 30 h)", hours: 12, category: "soporte", profile: ["it"], links: [NA_ITSS] },
    ],
  },
  // ── Soporte: 5 h en las semanas 27–39 ──
  {
    block: "soporte",
    weeks: [27, 39],
    cap: 5,
    sequence: [
      { name: "Cisco: IT Support Specialist Career Path (resto)", hours: 18, category: "soporte", profile: ["it"], links: [NA_ITSS] },
      { name: "P1: 5 incidencias más (10 en total) con diagnóstico, causa raíz y solución, y 5 artículos de conocimiento en español e inglés", hours: 10, category: "practica", profile: ["it"], links: [GLPI] },
      {
        name: "P3 · Red de oficina en Packet Tracer: 2 VLAN, DHCP, DNS, salida simulada, 5 fallos inyectados y vídeo de 3–5 min en inglés",
        hours: 12,
        category: "practica",
        profile: ["it"],
        tech: ["redes"],
        links: [PACKET_TRACER],
      },
      { name: "Cisco: Linux Unhatched", hours: 8, category: "soporte", profile: ["it"], tech: ["linux"], links: [NA_UNHATCHED] },
      { name: "Platzi «Administración de Servidores Linux»", hours: 6, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [P("servidores-linux")] },
      { name: "Teoría de Intune: ruta MD-102 en Learn (resto)", hours: 7, category: "sistemas", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
      { name: "Reconstruir P1 con scripts (la evaluación de Windows 11 caduca a los 90 días)", hours: 4, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"], links: [WIN11, WS2025] },
    ],
  },

  // ── Datos: 4 h en las semanas 1–26 (horas devueltas, sección 4.2) y 3 h en las 27–39 ──
  {
    block: "datos",
    weeks: [1, 26],
    cap: 4,
    sequence: [
      { name: "Platzi «SQL y MySQL» (terminar, estás en la última clase) y sacar el certificado", hours: 1, category: "fundamentos", tech: ["sql"], profile: ["da"], links: [P("sql-mysql")], cert: "SQL y MySQL (Platzi)" },
      { name: "Platzi «Excel Intermedio»", hours: 12, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: [P("excel-intermedio")] },
      { name: "Platzi «Excel Avanzado para Análisis de Datos»", hours: 12, category: "fundamentos", tech: ["excel"], profile: ["da", "bi"], links: [P("excel-avanzado-datos")] },
      { name: "Práctica de Excel: tablas dinámicas, BUSCARX y limpieza de datos", hours: 3, category: "practica", tech: ["excel"], profile: ["da", "bi"], links: [P("excel-avanzado-datos")] },
      { name: "Platzi «Fundamentos de Bases de Datos y SQL»", hours: 20, category: "fundamentos", tech: ["sql"], profile: ["da"], links: [P("fundamentos-bbdd-sql")] },
      { name: "Primeras consultas SQL sobre la base de datos de GLPI", hours: 2, category: "practica", tech: ["sql"], profile: ["da", "it"], links: [P("fundamentos-bbdd-sql"), GLPI] },
      { name: "Platzi «Power BI»", hours: 16, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi")] },
      { name: "Platzi «DAX para Power BI» (parte 1 de 24 h)", hours: 20, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi-dax")] },
      { name: "P4a v1 · Panel de SLA: 200 tickets simulados → consultas SQL → CSV → Power BI, publicado", hours: 6, category: "practica", tech: ["sql", "powerbi"], profile: ["da", "bi", "it"], links: [P("powerbi"), P("fundamentos-bbdd-sql")] },
      { name: "P4b · Panel del pensionado con datos reales (ocupación, ingresos, clientes), anonimizado y publicado", hours: 12, category: "practica", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi")] },
    ],
  },
  {
    block: "datos",
    weeks: [27, 39],
    cap: 3,
    sequence: [
      { name: "Platzi «DAX para Power BI» (resto)", hours: 4, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi-dax")] },
      { name: "Práctica de SQL en HackerRank y LeetCode SQL 50", hours: 20, category: "practica", tech: ["sql"], profile: ["da"], links: [HACKERRANK_SQL, LEETCODE_SQL] },
      { name: "P4a v2: los mismos indicadores con los tickets reales de P1 (base de datos de GLPI) y medidas DAX documentadas", hours: 8, category: "practica", tech: ["sql", "powerbi"], profile: ["da", "bi", "it"], links: [P("powerbi-dax"), GLPI] },
      { name: "20 preguntas típicas de entrevista de datos (SQL, Excel, Power BI) respondidas", hours: 4, category: "empleabilidad", tech: ["sql", "excel", "powerbi"], profile: ["da"], links: [LEETCODE_SQL] },
      { name: "Práctica en P4: README con 3 decisiones por panel", hours: 3, category: "practica", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi")] },
    ],
  },

  // ── Empleo y portfolio (2 h en las semanas 1–26, 4 h en las 27–39) ──
  {
    block: "empleo",
    weeks: [1, 8],
    cap: 2,
    sequence: [
      { name: "Corregir el email de git y protocolo de IA: AI_USAGE.md en cada repo (sección 5)", hours: 1, category: "empleabilidad", tech: ["ia"], links: [P("gitgithub")] },
      { name: "CV en español e inglés, con el diploma de la Xunta", hours: 4, category: "empleabilidad", links: [PLATZI_CV] },
      { name: "LinkedIn", hours: 3, category: "empleabilidad", links: [PLATZI_LINKEDIN] },
      { name: "GitHub: README de study_app y de Tu Lugar en Galicia", hours: 3, category: "empleabilidad", links: [P("gitgithub")] },
      { name: "Platzi «Preparar una Entrevista de Trabajo» (terminar, vas 13/19)", hours: 4, category: "empleabilidad", links: [PLATZI_ENTREVISTA] },
      { name: "Hoja de registro de postulaciones (fecha, empresa, filtro de residencia, inglés pedido, respuesta) y filtros de la sección 2", hours: 1, category: "empleabilidad", links: JOBS },
    ],
  },
  {
    block: "empleo",
    weeks: [9, 26],
    cap: 2,
    weekly: [{ name: "Postulaciones: 5 por semana con los filtros de residencia de la sección 2, anotadas en la hoja", hours: 1, category: "empleabilidad", links: JOBS }],
    sequence: [
      { name: "README «Lab host» en GitHub", hours: 2, category: "empleabilidad", profile: ["it"], links: [P("gitgithub")] },
      { name: "Platzi «Atención al Cliente y Soporte a Usuarios»", hours: 7, category: "empleabilidad", profile: ["it"], links: [P("soporte-usuarios")] },
      { name: "LinkedIn: una publicación por entrega (P1 v1, P2 v1, P4a v1)", hours: 3, category: "empleabilidad", links: [PLATZI_LINKEDIN] },
      { name: "Platzi «Curso para Conseguir Trabajo en Tecnología»", hours: 1, category: "empleabilidad", links: [P("conseguir-trabajo-tech")] },
      { name: "Entrevistas: preparar la pregunta sobre EOR («If I relocate to Spain in July 2027, could I keep the role through your EOR/contractor setup?»)", hours: 1, category: "empleabilidad", links: [DEEL_ES] },
      { name: "Desde la semana 23: sumar ofertas de soporte de aplicaciones y de datos junior, con el CV adaptado", hours: 2, category: "empleabilidad", links: JOBS },
      { name: "Punto de control de la semana 26: postulaciones, respuestas, test de inglés y reparto de bloques (sección 7)", hours: 2, category: "empleabilidad", links: [PLATZI_TEST] },
    ],
  },
  {
    block: "empleo",
    weeks: [27, 39],
    cap: 4,
    weekly: [
      { name: "Postulaciones: 10 por semana y entrevistas, anotadas en la hoja", hours: 2, category: "empleabilidad", links: JOBS },
      { name: "Simulacro semanal sin IA: un ticket aleatorio de P1 resuelto en voz alta, en inglés y con cronómetro", hours: 1, category: "practica", profile: ["it"], links: [GLPI] },
    ],
    sequence: [
      { name: "Scrum y Jira básico", hours: 3, category: "empleabilidad", links: ["https://scrumguides.org/"] },
      { name: "Banco de 30 preguntas técnicas respondidas en español e inglés", hours: 6, category: "empleabilidad", profile: ["it"], links: [NA_ITSS] },
      { name: "Entrevistas en inglés: preparación y seguimiento de postulaciones", hours: 4, category: "empleabilidad", links: [P("ingles-entrevistas")] },
    ],
  },

  // ── Ampliación (sección 4.1): fija, 2 h por semana, 78 h ──
  {
    block: "ampliacion",
    weeks: [1, 39],
    cap: 2,
    sequence: [
      { name: "Platzi «Git y GitHub»", hours: 10, category: "fundamentos", profile: ["da", "it"], links: [P("gitgithub")] },
      { name: "Práctica: repositorios y flujo de trabajo (commits, ramas, pull requests)", hours: 2, category: "practica", profile: ["da", "it"], links: [P("gitgithub")] },
      { name: "Platzi «Claude AI» (terminar, vas 5/20)", hours: 6, category: "claude", tech: ["ia"], links: [P("claude")] },
      { name: "Claude 101 — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-101"] },
      { name: "AI Fluency: Framework & Foundations — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/ai-fluency-framework-foundations"] },
      { name: "AI Capabilities and Limitations — Anthropic", hours: 2, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/ai-capabilities-and-limitations"] },
      { name: "Platzi «Claude Code para No Programadores»", hours: 6, category: "claude", tech: ["ia"], links: [P("claude-code-no-programadores")] },
      // Platzi ya no tiene «SQL Avanzado I/II»: el anexo los reemplaza por LeetCode SQL 50, HackerRank SQL y PostgreSQL
      { name: "SQL avanzado I: LeetCode SQL 50 y HackerRank SQL (antes Platzi «SQL Avanzado I»)", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da"], links: [LEETCODE_SQL, HACKERRANK_SQL] },
      { name: "Práctica: optimización de consultas", hours: 2, category: "practica", tech: ["sql"], profile: ["da"], links: [LEETCODE_SQL] },
      { name: "SQL avanzado II: Platzi «PostgreSQL» (antes «SQL Avanzado II + PostgreSQL»)", hours: 10, category: "fundamentos", tech: ["sql"], profile: ["da", "de"], links: [P("postgresql")] },
      { name: "Proyecto: diseñar una base de datos en PostgreSQL", hours: 4, category: "practica", tech: ["sql"], profile: ["da"], links: [P("postgresql")] },
      { name: "Portfolio web en GitHub Pages con P1–P4", hours: 12, category: "empleabilidad", profile: ["it", "da"], links: [P("gitgithub")] },
      { name: "Práctica: SQL avanzado aplicado a P4a", hours: 7, category: "practica", tech: ["sql"], profile: ["da"], links: [P("postgresql"), LEETCODE_SQL] },
    ],
  },
]

// ───────────────────────────── FASE 2 · semanas 40–104 · 20 h por semana (10 en la mudanza) ─────────────────────────────

const FASE2: Segment[] = [
  // ── Inglés (2 h en la mudanza, 4 h en las semanas 44–91, 3 h en las 92–104); Aptis B2 en la semana 78 ──
  ...englishSegments(40, 43, 2),
  ...englishSegments(44, 77, 4),
  {
    block: "ingles",
    weeks: [78, 78],
    cap: 4,
    weekly: [routine(englishWeek(78), 1), { name: "Inglés: examen Aptis General B2 (semana 78)", hours: 3, category: "ingles", links: [APTIS], cert: "Aptis B2" }],
  },
  ...englishSegments(79, 91, 4),
  ...englishSegments(92, 104, 3),

  // ── Alemán (3 h por semana): A1 en las semanas 44–65 y A2 en las 66–104 ──
  {
    block: "aleman",
    weeks: [44, 65],
    cap: 3,
    sequence: [{ name: "Alemán A1: vhs-Lernportal (pulsa «weiter zu A1-Deutschkurs») y Goethe «Deutsch üben»", hours: 66, category: "aleman", links: [VHS_A1] }],
  },
  {
    block: "aleman",
    weeks: [66, 104],
    cap: 3,
    sequence: [
      { name: "Alemán A2: vhs-Lernportal", hours: 114, category: "aleman", links: [VHS_A1] },
      { name: "Alemán A2: repaso con un modelo de examen ÖSD", hours: 1, category: "aleman", links: [OSD] },
      { name: "Alemán: examen A2 opcional, ÖSD o Goethe (semana 104)", hours: 2, category: "aleman", links: [OSD], cert: "Alemán A2 (opcional)" },
    ],
  },

  // ── Gallego (1 h por semana desde la semana 44): Celga 1 en las semanas 44–75 y Celga 2 en las 76–104 ──
  {
    block: "gallego",
    weeks: [44, 75],
    cap: 1,
    weekly: [{ name: "Gallego: Celga 1 en liña, autoaprendizaje abierto (3 de 19 ofertas españolas de soporte piden gallego)", hours: 1, category: "idiomas", links: [CELGA1] }],
  },
  {
    block: "gallego",
    weeks: [76, 104],
    cap: 1,
    weekly: [{ name: "Gallego: Celga 2 en liña", hours: 1, category: "idiomas", links: [CELGA2] }],
  },

  // ── Sistemas: 4 h en la mudanza ──
  {
    block: "soporte",
    weeks: [40, 43],
    cap: 4,
    weekly: [{ name: "Simulacro semanal sin IA: un ticket aleatorio de P1 resuelto en voz alta, en inglés y con cronómetro", hours: 1, category: "practica", profile: ["it"], links: [GLPI] }],
    sequence: [
      { name: "Volver a montar el laboratorio P1 tras la mudanza", hours: 4, category: "practica", profile: ["it", "sys"], tech: ["windows"], links: [VBOX, WS2025, WIN11] },
      { name: "P1: 3 incidencias nuevas en el laboratorio reinstalado, con ticket y artículo", hours: 4, category: "practica", profile: ["it"], links: [GLPI] },
      { name: "P2: probar el script en el dominio reinstalado y actualizar el README", hours: 4, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"], links: [PS_AD] },
    ],
  },
  // ── Sistemas: 7 h en las semanas 44–104 (tramos cortados en las semanas de examen: 60 y 88) ──
  {
    block: "soporte",
    weeks: [44, 59],
    cap: 7,
    sequence: [
      { name: "MD-102 (Endpoint Administrator): ruta de Microsoft Learn (Intune, despliegue de Windows, cumplimiento de dispositivos; se actualiza el 27/10/2026)", hours: 60, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
      { name: "Cisco: Seguridad de Terminales", hours: 27, category: "seguridad", profile: ["it", "sys"], tech: ["seguridad"], links: [NA_ENDPOINT] },
      { name: "AZ-900: práctica y guía de Microsoft Learn (parte 1 de 22 h; el examen es opcional)", hours: 4, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: [AZ900] },
      {
        name: "MD-102: laboratorio de Intune (prueba de 30 días de Intune o M365 Business Premium, opcional: pide tarjeta, cancela a tiempo)",
        hours: 14,
        category: "certificacion",
        profile: ["it", "sys"],
        tech: ["windows"],
        links: [MD102],
      },
      { name: "MD-102: simulacros", hours: 7, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
    ],
  },
  {
    block: "soporte",
    weeks: [60, 69],
    cap: 7,
    sequence: [
      // semana 60: 3 h de simulacros (lunes, miércoles y viernes), examen el sábado y el tramo siguiente el domingo
      { name: "MD-102: simulacros (resto)", hours: 3, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102] },
      { name: "MD-102: examen (semana 60)", hours: 3, category: "certificacion", profile: ["it", "sys"], tech: ["windows"], links: [MD102], cert: "MD-102" },
      { name: "Windows Server avanzado", hours: 12, category: "sistemas", profile: ["sys"], tech: ["windows"], links: [WS2025] },
      { name: "Identidad híbrida: Entra Connect", hours: 8, category: "sistemas", profile: ["sys"], tech: ["windows", "cloud"], links: [ENTRA_CONNECT] },
      { name: "Práctica: identidad híbrida con Entra Connect en el laboratorio P1", hours: 1, category: "practica", profile: ["sys"], tech: ["windows", "cloud"], links: [ENTRA_CONNECT] },
      { name: "Platzi «Azure Active Directory»", hours: 8, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "cloud"], links: [P("azure-active-directory")] },
      { name: "PowerShell intermedio: funciones, manejo de errores y logs", hours: 10, category: "sistemas", profile: ["it", "sys"], tech: ["windows", "linux"], links: [PS_INTRO, PS_AD] },
      { name: "P2 v2: manejo de errores, parámetros, una prueba simple y CSV de resultados que lee P4a", hours: 7, category: "practica", profile: ["it", "sys"], tech: ["windows", "linux"], links: [PS_AD] },
      { name: "AZ-900: práctica y guía de Microsoft Learn (resto; base del AZ-104)", hours: 18, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: [AZ900] },
    ],
  },
  {
    block: "soporte",
    weeks: [70, 87],
    cap: 7,
    // Linux Essentials empieza antes (sección 4.2): 1 h por semana junto a Azure
    weekly: [{ name: "Cisco «Fundamentos de Linux» (Linux Essentials), 1 h por semana", hours: 1, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NA_LINUX] }],
    sequence: [
      { name: `${ITIL_NAME}: preparación (el examen, solo si lo paga la empresa)`, hours: 18, category: "certificacion", profile: ["it", "sys"], links: [ITIL5, ITIL4] },
      { name: "Platzi «Fundamentos de Azure (AZ-900)» como entrada a Azure", hours: 5, category: "sistemas", profile: ["it", "sys"], tech: ["cloud"], links: [P("az-900")] },
      { name: "AZ-104 (Azure Administrator): ruta de Microsoft Learn", hours: 44, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104] },
      { name: "Platzi «Azure IaaS»: almacenamiento y bases de datos en Azure", hours: 20, category: "sistemas", profile: ["sys"], tech: ["cloud"], links: [P("azure-iaas")] },
      {
        name: "AZ-104: laboratorios (la cuenta gratuita de Azure da 200 US$ por 30 días y pide tarjeta; los sandboxes de Learn ya no existen)",
        hours: 14,
        category: "certificacion",
        profile: ["sys"],
        tech: ["cloud"],
        links: [AZ104, AZURE_FREE],
      },
      { name: "AZ-104: simulacros", hours: 7, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104] },
    ],
  },
  {
    block: "soporte",
    weeks: [88, 104],
    cap: 7,
    sequence: [
      // semana 88: 3 h de simulacros, examen el sábado y Linux Essentials el domingo
      { name: "AZ-104: simulacros (resto)", hours: 3, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104] },
      { name: "AZ-104: examen (semana 88)", hours: 3, category: "certificacion", profile: ["sys"], tech: ["cloud"], links: [AZ104], cert: "AZ-104 Azure Administrator" },
      { name: "Cisco «Fundamentos de Linux» (Linux Essentials): resto hasta completar las 70 h", hours: 52, category: "sistemas", profile: ["sys"], tech: ["linux"], links: [NA_LINUX] },
      { name: "Platzi «Introducción a AWS» (para comparar con Azure)", hours: 10, category: "ingenieria", tech: ["cloud"], profile: ["de", "sys"], links: [P("aws-fundamentos")] },
      { name: "Práctica: desplegar un servicio básico en AWS", hours: 3, category: "practica", tech: ["cloud"], profile: ["de", "sys"], links: [P("aws-fundamentos")] },
      { name: "Cisco «Técnico en Redes» (45 de sus 70 h; el resto, después de octubre de 2028)", hours: 45, category: "sistemas", profile: ["sys"], tech: ["redes"], links: [NA_NETTECH] },
      { name: "Práctica: servidor Ubuntu con GLPI montado desde cero con lo de Linux Essentials", hours: 3, category: "practica", profile: ["sys"], tech: ["linux"], links: [NA_LINUX, GLPI] },
    ],
  },

  // ── Datos: 2 h en la mudanza ──
  {
    block: "datos",
    weeks: [40, 43],
    cap: 2,
    sequence: [
      { name: "Adaptar P4 y el CV a ofertas de negocio con Power BI (administración, finanzas, control de gestión)", hours: 4, category: "empleabilidad", tech: ["powerbi"], profile: ["da", "bi"], links: JOBS_ES },
      { name: "Práctica en P4: repasar Power Query y DAX con P4a y P4b", hours: 4, category: "practica", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi-dax")] },
    ],
  },
  // ── Datos: 5 h en las semanas 44–104 ──
  {
    block: "datos",
    weeks: [44, 69],
    cap: 5,
    sequence: [
      { name: "Platzi «Power BI Avanzado»", hours: 24, category: "bi", tech: ["powerbi"], profile: ["da", "bi"], links: [P("powerbi-avanzado")] },
      {
        name: "Modelado de datos: esquema estrella, modelo semántico, Power Query y DAX en profundidad",
        hours: 15,
        category: "bi",
        tech: ["powerbi", "sql"],
        profile: ["da", "bi"],
        links: ["https://learn.microsoft.com/es-es/training/modules/design-model-power-bi/"],
      },
      { name: "Contabilidad, finanzas y control de gestión para analistas (9 de 31 ofertas gallegas)", hours: 20, category: "negocio", tech: ["excel"], profile: ["da", "bi"], links: [P("contabilidad-basica"), P("planeacion-financiera")] },
      { name: "Introducción a ERP/SAP (8 de 31 ofertas gallegas)", hours: 11, category: "negocio", profile: ["bi"], links: ["https://learning.sap.com/courses/exploring-sap-analytics-cloud", "https://learning.sap.com/courses/discovering-sap-s-4hana-embedded-analytics"] },
      { name: "ERP y SAP para analistas: SAP Analytics Cloud y analítica en S/4HANA", hours: 4, category: "negocio", profile: ["bi"], links: ["https://learning.sap.com/courses/exploring-sap-analytics-cloud", "https://learning.sap.com/courses/discovering-sap-s-4hana-embedded-analytics"] },
      { name: "Power Automate: automatización de procesos", hours: 8, category: "bi", profile: ["bi"], links: [P("power-automate"), "https://learn.microsoft.com/es-es/training/modules/build-microsoft-power-automate-flow/"] },
      { name: "PL-300: ruta de Microsoft Learn, simulacros y laboratorios", hours: 36, category: "certificacion", tech: ["powerbi"], profile: ["bi", "da"], links: [PL300] },
      // BI Estratégico (10 h) no entra antes del examen: pasa al tramo 70–91; las 9 h que sobran son práctica de P4
      { name: "PL-300: práctica con P4 (modelo, DAX e informes)", hours: 9, category: "practica", tech: ["powerbi"], profile: ["bi", "da"], links: [PL300, P("powerbi-dax")] },
      { name: "PL-300: examen (semana 69)", hours: 3, category: "certificacion", tech: ["powerbi"], profile: ["bi", "da"], links: [PL300], cert: "PL-300 Power BI" },
    ],
  },
  {
    block: "datos",
    weeks: [70, 91],
    cap: 5,
    sequence: [
      { name: "Platzi «Python desde cero» (antes «Fundamentos de Python», vas 5/32)", hours: 16, category: "fundamentos", tech: ["python"], profile: ["da"], links: [P("fundamentos-python")] },
      { name: "Python con pandas: Platzi «Python para Ciencia de Datos»", hours: 24, category: "python_avanzado", tech: ["python"], profile: ["da"], links: [P("python-data-science")] },
      { name: "Práctica: pandas con los datos de P4", hours: 4, category: "practica", tech: ["python"], profile: ["da"], links: [P("python-data-science")] },
      { name: "Platzi «Business Intelligence» (BI Estratégico)", hours: 10, category: "bi", tech: ["powerbi"], profile: ["bi", "da"], links: [P("business-intelligence")] },
      { name: "Caso práctico: KPIs de un negocio", hours: 3, category: "practica", tech: ["powerbi"], profile: ["bi", "da"], links: [P("business-intelligence")] },
      { name: "Microsoft Fabric: introducción", hours: 8, category: "bi", tech: ["cloud"], profile: ["bi"], links: ["https://learn.microsoft.com/es-es/training/paths/get-started-fabric/"] },
      { name: "Qlik Sense: introducción", hours: 6, category: "bi", profile: ["bi"], links: ["https://learning.qlik.com/student/collection/2196958-qlik-sense-business-analyst-free-learning-content"] },
      { name: "Visualización en Python (antes «Matplotlib y Seaborn», curso retirado)", hours: 12, category: "python_avanzado", tech: ["python"], profile: ["da"], links: [P("data-viz"), P("python-data-science")] },
      { name: "Platzi «Excel Analytics con AI y Python» (antes «Excel con Python»)", hours: 10, category: "fundamentos", tech: ["python", "excel"], profile: ["da"], links: [P("excel-analytics-python")] },
      { name: "Proyecto: automatización de informes en Excel con Python", hours: 3, category: "practica", tech: ["python", "excel"], profile: ["da"], links: [P("excel-analytics-python")] },
      { name: "Python para entrevistas de datos: LeetCode «30 Days of Pandas» (antes «LeetCode Python»)", hours: 9, category: "empleabilidad", tech: ["python"], links: [LEETCODE_PANDAS] },
      // Tableau (13 h) no entra: pasa al tramo 92–104; las 5 h que sobran son práctica del proyecto de Python
      { name: "Práctica: proyecto Python + SQL, primeras consultas y limpieza con pandas", hours: 5, category: "practica", tech: ["python", "sql"], profile: ["da"], links: [P("python-data-science")] },
    ],
  },
  {
    block: "datos",
    weeks: [92, 104],
    cap: 5,
    sequence: [
      { name: "Proyecto Python + SQL en GitHub (con CTE y funciones de ventana)", hours: 12, category: "practica", tech: ["python", "sql"], profile: ["da"], links: [P("postgresql"), P("python-data-science")] },
      { name: "Platzi «Análisis Exploratorio de Datos» aplicado al proyecto Python + SQL", hours: 12, category: "analisis", tech: ["python", "sql"], profile: ["da"], links: [P("analisis-exploratorio-datos")] },
      { name: "Platzi «Tableau»", hours: 10, category: "bi", tech: ["tableau"], profile: ["da"], links: [P("tableau")] },
      { name: "Práctica: visualizaciones en Tableau", hours: 3, category: "practica", tech: ["tableau"], profile: ["da"], links: [P("tableau")] },
      { name: "Platzi «Visualización de Datos y Storytelling»", hours: 10, category: "bi", profile: ["da"], links: [P("data-viz")] },
      { name: "Proyecto: presentación ejecutiva", hours: 3, category: "practica", profile: ["da"], links: [P("data-viz")] },
      { name: "Proyecto integrador de BI: de los datos al dashboard y la presentación", hours: 10, category: "practica", tech: ["powerbi", "sql"], profile: ["bi", "da"], links: [P("powerbi")] },
      { name: "Portfolio: documentación del proyecto integrador", hours: 3, category: "practica", tech: ["powerbi"], profile: ["bi", "da"], links: [P("gitgithub")] },
      { name: "Portfolio de datos en GitHub", hours: 2, category: "empleabilidad", profile: ["da"], links: [P("gitgithub")] },
    ],
  },

  // ── Empleo: 2 h en la mudanza y 1 h en las semanas 92–104 ──
  {
    block: "empleo",
    weeks: [40, 43],
    cap: 2,
    weekly: [{ name: "Postulaciones a helpdesk N1 y a puestos con Excel y Power BI, en Galicia y en remoto desde España", hours: 1, category: "empleabilidad", profile: ["it", "da"], links: JOBS_ES }],
    sequence: [
      { name: "Mudanza: empadronamiento en A Coruña", hours: 1, category: "empleabilidad", links: [PADRON_CORUNA] },
      { name: "Mudanza: cita para el DNI", hours: 1, category: "empleabilidad", links: [CITA_DNI] },
      // la página de Emprego Xunta no permite la lectura automática: sin enlace verificado (ábrela desde xunta.gal)
      { name: "Mudanza: inscripción como demandante de empleo en Galicia (da acceso al programa de la Xunta para mayores de 52; ábrela desde xunta.gal)", hours: 2, category: "empleabilidad" },
    ],
  },
  {
    block: "empleo",
    weeks: [92, 104],
    cap: 1,
    sequence: [
      { name: "CV para España y Viena", hours: 3, category: "empleabilidad", links: [PLATZI_CV] },
      { name: "Búsqueda de soporte N2 o sistemas junior en España: postulaciones y seguimiento", hours: 10, category: "empleabilidad", links: JOBS_ES },
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

export type RouteCell = { block: Block; task: RouteTask }
const BY_WEEK: Record<number, RouteCell[]> = {}

function schedule(segments: Segment[]) {
  for (const seg of segments) {
    const [from, to] = seg.weeks
    const weeks = to - from + 1
    const weeklySum = (seg.weekly ?? []).reduce((s, i) => s + i.hours, 0)
    const free = seg.cap - weeklySum
    if (free < -1e-9 || (!seg.sequence && Math.abs(free) > 1e-9)) {
      throw new Error(`Ruta: el tramo ${seg.block} semanas ${from}–${to} no cuadra con ${seg.cap} h por semana`)
    }
    const put = (week: number, task: RouteTask) => (BY_WEEK[week] ??= []).push({ block: seg.block, task })

    for (const item of seg.weekly ?? []) {
      for (let w = from; w <= to; w++) put(w, toTask(item, item.hours, item.name, w === to))
    }
    if (seg.sequence) pour(seg.sequence, from, weeks, free).forEach((p) => put(p.week, p.task))
  }
}

schedule(FASE1)
schedule(FASE2)

/** Horas planificadas de una semana (sin la Fase 7) */
export function getWeeklyHours(week: number): number {
  return (BY_WEEK[week] ?? []).reduce((sum, cell) => sum + (cell.task.track ? 0 : cell.task.durationHours), 0)
}

/** Tareas de una semana (1–104) con su bloque, en el orden de la app: inglés, alemán, soporte y sistemas, datos, empleo, ampliación y gallego */
export function getRouteCells(week: number): RouteCell[] {
  return (BY_WEEK[week] ?? [])
    .map((cell, order) => ({ cell, order }))
    .sort((a, b) => BLOCK_ORDER.indexOf(a.cell.block) - BLOCK_ORDER.indexOf(b.cell.block) || a.order - b.order)
    .map(({ cell }) => cell)
}

/** Tareas de una semana (1–104); el id de cada una es `${semana}-${posición + 1}` */
export function getRouteTasks(week: number): RouteTask[] {
  return getRouteCells(week).map((cell) => cell.task)
}

// ───────────────────────────── FASE 7 · después de octubre de 2028 (sin plazo) ─────────────────────────────
// En el orden de la sección 4.1 (versión 3): sistemas, datos, IA y otros. Cada módulo conserva sus horas y su interés.
// Las horas marcadas «estimadas» no figuran en ningún documento. Los cursos retirados de Platzi quedan sin enlace.

const f7 = (item: RouteItem): RouteTask => toTask(item, item.hours, item.name, true, "fase7")
const RETIRADO = "curso retirado de Platzi, sin enlace"

const FASE7: RouteItem[] = [
  // 1 · sistemas
  { name: "Opción A · Cisco «Técnico en Redes» (resto: 25 de sus 70 h)", hours: 25, category: "sistemas", profile: ["sys"], tech: ["redes"], links: [NA_NETTECH] },
  { name: "Opción A · CCNA (Cisco) — horas estimadas", hours: 120, category: "certificacion", profile: ["sys"], tech: ["redes"], links: [NA_CCNA] },
  { name: "Opción B · Cisco «Analista Junior en Ciberseguridad»", hours: 120, category: "seguridad", profile: ["sys"], tech: ["seguridad"], links: [NA_CYBERPATH] },
  { name: "Opción B · Google Cybersecurity — horas estimadas", hours: 70, category: "certificacion", profile: ["sys"], tech: ["seguridad"], links: ["https://grow.google/certificates/cybersecurity/"] },
  { name: "Opción B · CompTIA Security+ (la V8 sale hacia el 17/11/2026) — horas estimadas", hours: 60, category: "certificacion", profile: ["sys"], tech: ["seguridad"], links: ["https://www.comptia.org/certifications/security"] },
  { name: `${ITIL_NAME}: examen (solo si lo paga la empresa)`, hours: 2, category: "certificacion", profile: ["it", "sys"], links: [ITIL5, ITIL4], cert: "ITIL Foundation" },
  { name: "AZ-900: examen opcional (€76 en España)", hours: 1, category: "certificacion", profile: ["it", "sys"], tech: ["cloud"], links: [AZ900], cert: "AZ-900 Azure Fundamentals" },
  { name: "AB-900: examen opcional (la guía ya está en la fase 1)", hours: 2, category: "certificacion", profile: ["it"], tech: ["windows"], links: [AB900], cert: "AB-900" },
  // 2 · datos
  { name: "Google Data Analytics — Módulo 1", hours: 10, category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/data-analytics/"] },
  { name: "Google Data Analytics — Módulos 2–8", hours: 80, category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/data-analytics/"], cert: "Google Data Analytics" },
  { name: "Estadística Descriptiva", hours: 10, category: "analisis", tech: ["python"], profile: ["ds"], links: [P("estadistica-descriptiva")] },
  { name: "Proyecto: Análisis estadístico", hours: 3, category: "practica", tech: ["python"], profile: ["ds"], links: [P("estadistica-descriptiva")] },
  { name: "Platzi «Matemáticas para Data Science»: estadística inferencial (enlace no verificado en el anexo)", hours: 10, category: "fundamentos", tech: ["python"], profile: ["ds"] },
  { name: "Práctica: ejercicios matemáticos y de probabilidad", hours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
  { name: `A/B Testing & Experimentación (${RETIRADO})`, hours: 6, interest: "media", category: "analisis", tech: ["python"], profile: ["ds", "da"] },
  { name: "Proyecto: Diseño de experimento", hours: 2, interest: "media", category: "practica", tech: ["python"], profile: ["ds"] },
  { name: "Google Advanced DA — Preparación", hours: 20, interest: "media", category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/advanced-data-analytics/"] },
  { name: "Google Advanced DA — Examen", hours: 10, interest: "media", category: "certificacion", profile: ["da"], links: ["https://grow.google/certificates/advanced-data-analytics/"], cert: "Google Advanced DA" },
  { name: `Tableau Avanzado (${RETIRADO}; queda «Tableau», ya hecho en la ruta)`, hours: 6, interest: "media", category: "bi", tech: ["tableau"], profile: ["da"] },
  { name: "Proyecto: Dashboard ejecutivo", hours: 2, interest: "media", category: "practica", tech: ["tableau"], profile: ["da"], links: [P("tableau")] },
  { name: "Analítica de producto y web: GA4, embudos, cohortes y retención", hours: 6, interest: "media", category: "analisis", profile: ["da"], links: ["https://support.google.com/analytics/answer/6367342?hl=es"] },
  // no entraron en el tramo 92–104 de datos (sección 4.2): vuelven a la Fase 7
  { name: "Calidad de datos: validaciones y tests", hours: 5, category: "analisis", tech: ["sql"], profile: ["da"], links: ["https://docs.getdbt.com/docs/build/data-tests"] },
  { name: "Platzi «Looker Studio»", hours: 10, category: "bi", profile: ["da"], links: [P("lookerstudio")] },
  { name: "Proyecto: Reporte automatizado en Looker Studio", hours: 3, category: "practica", profile: ["da"], links: [P("lookerstudio")] },
  { name: "Stack moderno: dbt con BigQuery y Snowflake (introducción)", hours: 10, category: "ingenieria", tech: ["sql", "cloud"], profile: ["da", "de"], links: ["https://docs.getdbt.com/guides/bigquery", "https://docs.snowflake.com/en/user-guide/tutorials/snowflake-in-20minutes"] },
  { name: "Fundamentos Machine Learning", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: [P("machine-learning")] },
  { name: "Práctica: Primer modelo", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"], links: [P("machine-learning")] },
  { name: "Regresión Lineal & Logística (enlace a verificar)", hours: 6, interest: "media", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Proyecto: Modelo predictivo", hours: 2, interest: "media", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `Árboles de Decisión & Random Forest (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Proyecto: Clasificación", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `Support Vector Machines & KNN (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Práctica: Comparación de modelos", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `Clustering & Dimensionalidad (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Proyecto: Segmentación de clientes", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `Feature Engineering (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Práctica: Optimización de features", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `Model Evaluation & Validation (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Proyecto: Pipeline completo", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `Redes Neuronales Básicas (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Práctica: Primera red neuronal", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: `TensorFlow & Keras (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Proyecto: Clasificación de imágenes", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "NLP Fundamentos", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: [P("nlp")] },
  { name: "Proyecto: Análisis de sentimientos", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"], links: [P("nlp")] },
  { name: `Series Temporales (${RETIRADO})`, hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Proyecto: Forecasting", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"] },
  { name: "MLOps Básico", hours: 4, interest: "baja", category: "ml", tech: ["ml", "python"], profile: ["ds"], links: [P("mlops")] },
  { name: "Proyecto: Deploy de modelo", hours: 1, interest: "baja", category: "practica", tech: ["ml"], profile: ["ds"], links: [P("mlops")] },
  { name: "Proyecto ML Completo", hours: 6, interest: "media", category: "practica", tech: ["ml", "python"], profile: ["ds"] },
  { name: "Documentación & Presentación del proyecto ML", hours: 2, interest: "media", category: "practica", profile: ["ds"] },
  { name: "Big Data Fundamentos (Platzi «Big Data en AWS»)", hours: 6, interest: "media", category: "ingenieria", tech: ["python"], profile: ["de"], links: [P("big-data")] },
  { name: "Práctica: PySpark básico", hours: 2, interest: "media", category: "practica", tech: ["python"], profile: ["de"], links: [P("big-data")] },
  { name: "Docker & Containerization", hours: 4, interest: "baja", category: "ingenieria", profile: ["de"], links: [P("docker")] },
  { name: "Proyecto: Containerizar app", hours: 1, interest: "baja", category: "practica", profile: ["de"], links: [P("docker")] },
  { name: "Kubernetes — horas estimadas", hours: 10, interest: "baja", category: "ingenieria", profile: ["de"] },
  // 3 · IA
  { name: "Claude Code 101 — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-code-101"] },
  { name: "Claude Code in Action — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/claude-code-in-action"] },
  { name: "Platzi «Microsoft 365 Copilot»", hours: 3, category: "ia", profile: ["it"], tech: ["windows", "ia"], links: [P("copilot-365")] },
  { name: "Platzi «Prompt Engineering» (IA aplicada)", hours: 10, category: "ia", tech: ["ia"], profile: ["ds"], links: [P("prompt-engineering")] },
  { name: "Proyecto: chatbot básico", hours: 3, category: "practica", tech: ["ia"], profile: ["ds"], links: [P("openai-api")] },
  { name: "Platzi «Chatbots con OpenAI API» (APIs de IA)", hours: 10, category: "ia", tech: ["python", "ia"], profile: ["ds"], links: [P("openai-api")] },
  { name: "Proyecto: integración de IA en una app", hours: 3, category: "practica", tech: ["python", "ia"], profile: ["ds"], links: [P("openai-api")] },
  { name: "Building with Claude API", hours: 8, category: "claude", tech: ["ia", "python"], links: ["https://anthropic.skilljar.com/claude-with-the-anthropic-api"] },
  { name: "Introduction to MCP", hours: 6, category: "claude", tech: ["ia", "python"], links: ["https://anthropic.skilljar.com/introduction-to-model-context-protocol"] },
  { name: "MCP: Advanced Topics", hours: 5, category: "claude", tech: ["ia", "python"], links: ["https://anthropic.skilljar.com/model-context-protocol-advanced-topics"] },
  { name: `LangChain & RAG (${RETIRADO})`, hours: 10, category: "ia", tech: ["python", "ia"], profile: ["ds"] },
  { name: "Proyecto: Sistema RAG", hours: 3, category: "practica", tech: ["python", "ia"], profile: ["ds"] },
  { name: "Introduction to Agent Skills — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/introduction-to-agent-skills"] },
  { name: "Introduction to Subagents — Anthropic", hours: 3, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/introduction-to-subagents"] },
  { name: "Introduction to Claude Cowork — Anthropic", hours: 4, category: "claude", tech: ["ia"], links: ["https://anthropic.skilljar.com/introduction-to-claude-cowork"] },
  { name: "Microsoft Azure AI Fundamentals (AI-901)", hours: 20, category: "certificacion", tech: ["cloud", "ia"], links: ["https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/"], cert: "AI-901 Azure AI Fundamentals" },
  { name: "Copilot Studio — horas estimadas", hours: 8, category: "ia", tech: ["ia"], links: [P("copilot-studio"), "https://learn.microsoft.com/es-es/training/paths/work-power-virtual-agents/"] },
  // 4 · otros
  { name: "Networking y aplicaciones: contactos, reclutadores y comunidades", hours: 10, category: "empleabilidad" },
  { name: "Estrategia de búsqueda de empleo: embudo, seguimiento y métricas", hours: 3, category: "empleabilidad" },
  { name: "Francés (subir desde A2)", hours: 20, interest: "baja", category: "idiomas" },
  { name: "Alemán B1: vhs-Lernportal, modelos y examen ÖSD o Goethe (horas de B1 de la versión 2.1)", hours: 161, category: "aleman", links: [VHS_A1, OSD], cert: "Alemán B1 (ÖSD o Goethe)" },
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
