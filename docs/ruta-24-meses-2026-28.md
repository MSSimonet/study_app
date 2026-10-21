# Ruta IT de 24 meses · 26/10/2026 → 22/10/2028

**Candidato:**
- 52 años, ciudadano español, vive en Argentina y se muda a Galicia en julio de 2027.
- Sin experiencia laboral en IT. Inglés A2, alemán nulo.
- PC de 16 GB de RAM, Platzi activo.
- **Disponibilidad: 20 h por semana** (10 h en las 4 semanas de la mudanza).

**Versión 2 (12/10/2026):** soporte y datos en paralelo desde la semana 1, para el primer empleo.
**Versión 2.1 (13/10/2026):** ubicados los temas del repo que la ruta no traía (sección 4.1). No se quita ninguno.
**Versión 3 (13/10/2026):** 20 h por semana fijas y alemán a 3 h por semana. Las horas ganadas van a inglés, soporte/sistemas, datos y gallego (sección 4.2). Total: **2.040 h** (antes 1.532 fijas).
**Versión 3.1 (14/10/2026):** la ruta empieza el **lunes 26/10/2026** y termina el domingo 22/10/2028; las semanas van de lunes a domingo. Las semanas de examen se corren 6 días: MD-102 el 18/12/2027, PL-300 el 19/02/2028, Aptis el 22/04/2028, AZ-104 el 01/07/2028 y alemán A2 el 21/10/2028.

**Cómo leer este documento:** cada sección separa tres tipos de contenido.

| Etiqueta | Qué significa |
|---|---|
| **[DATO COMPROBADO]** | Tiene fuente y fecha de consulta (12–13/10/2026) |
| **[INTERPRETACIÓN DE MERCADO]** | Lectura mía de los datos; puede estar equivocada |
| **[PLAN DE ACCIÓN RECOMENDADO]** | Qué hacer |

---

## 0. Resumen

1. **Primer empleo por dos vías en paralelo:**
   - **Principal:** Service Desk / Helpdesk N1 bilingüe (español + inglés). Es la que más acepta ≤1 año de experiencia y casi nunca pide título.
   - **Secundaria:** puestos con Excel + SQL + Power BI: datos/BI junior, soporte de aplicaciones, administración o finanzas con Power BI (en Galicia, cerca de la mitad de la demanda de Power BI está en puestos de negocio).
2. **Stack de los meses 1–9:**
   - **Soporte, 5–6 h por semana:** tickets e ITSM; redes básicas; Windows 10/11 con hardware de puesto; Active Directory + Microsoft 365; seguridad básica e Intune (teoría). PowerShell solo para los laboratorios.
   - **Datos, 3–4 h por semana desde la semana 1:** Excel → SQL → Power BI.
   - Nada de ML, Big Data, DevOps ni desarrollo web. Python entra en la fase 2.
   - **Costo del paralelo:** el portfolio de soporte queda completo unos 3 meses más tarde que en la versión 1 (mes 9 en vez de mes 6).
3. **Las certificaciones no filtran la entrada:** ninguna de 47 ofertas de soporte las exige. La fase 1 no gasta dinero en exámenes; la evidencia es un portfolio de 4 proyectos (3 de soporte y 1 que une soporte y datos).
4. **Desde Argentina:** el filtro real no es el permiso de trabajo (ya lo tienes como ciudadano español), sino la **cláusula de residencia**. Hay que priorizar ofertas "worldwide" o "LATAM + España" y empleadores que usen EOR, porque pueden pasarte de Argentina a España.
5. **Inglés:** 6 h por semana durante 9 meses → B1. **B2 certificado (Aptis) en abril de 2028**, semana 78.
6. **Alemán:** empieza en **agosto de 2027**, ya instalado en Galicia, a **3 h por semana → A2 en octubre de 2028** (≈ 183 h). B1 queda para 2029. Para Viena da igual en 2028: los puestos que piden alemán exigen B2–C2, y los que son en inglés no lo piden.
7. **Viena y Suiza en octubre de 2028:** realista solo para puestos con el inglés como idioma principal (3 de 30 en Viena, ninguno N1) o con más alemán en 2029. En la Suiza germanófona piden alemán nativo y título EFZ.
8. **El repo hoy no respeta tu disponibilidad:** el plan cargado (78 semanas) pide de media 23,3 h por semana en la etapa 1, con picos de 25 h. Hay que recargarlo con esta ruta de 104 semanas.

---

## 0.1 Estado del repo `study_app` (revisado el 12/10/2026)

**[DATO COMPROBADO]**
- `main` está en el commit `98ec4d0` del 8/10/2026. Sus cambios:
  - Carga la ruta de 18 meses en `lib/route.ts`, con 78 semanas (`TOTAL_WEEKS = 78`).
  - Fecha de inicio `START_DATE = 12/10/2026`.
  - `PLAN_VERSION = 3`.
  - Corrige una vulnerabilidad de React Server Components.
- Al generar el plan con el código del repo salen **1.462 h en 78 semanas**: media de **23,3 h por semana** en las semanas 1–39 y 14,2 h en las 40–78, con mínimo de 12 h y máximo de 25 h.
- Los commits siguen firmados con `msanchezsimonetmail.com`, sin "@". GitHub no los vincula a tu perfil.

**[INTERPRETACIÓN]** El plan del repo supera tu techo de 20 h por semana y empieza el 12/10, no el 20/10. Si lo sigues tal cual, el panel "Hoy" te marcará atrasado desde el primer día.

**[PLAN]** Recargar la app con esta ruta:
- `TOTAL_WEEKS = 104`.
- `START_DATE = 26/10/2026` (lunes; en la versión 3 era el martes 20/10/2026).
- `PLAN_VERSION = 4`.
- Corregir el email de git antes del próximo commit.

---

## 1. Rol de entrada con menor fricción y stack mínimo

**[DATO COMPROBADO]** Muestra de ofertas de entrada, leídas una por una el 12/10/2026 (Tecnoempleo y Remote Rocketship):
- **Tipo A, Soporte / Service Desk / Helpdesk:** 47 ofertas.
- **Tipo B, Data Analyst / BI junior:** 21 ofertas.

| Métrica | A · Soporte | B · Datos |
|---|---|---|
| Aceptan ≤1 año de experiencia | **42,6 %** (20/47) | 23,8 % (5/21) |
| Descartadas por pedir 3 años o más, entre las fichas abiertas | 14 % | **34 %** |
| Exigen título universitario explícito | **2 %** | 24 % (48 % contando implícitos) |
| Exigen inglés B2+ / fluido / alto | **55 %** | 14 % |
| Solo España: aceptan ≤1 año | 68 % (13/19) | 63 % (5/8) |
| Solo España: título | FP en 12/19 (16/19 "o equivalente"); universidad 0/19 | Universidad en 6/8 (incluye implícito) |

**Qué aparece en las ofertas de soporte (A):**

| Requisito | Ofertas |
|---|---|
| Atención al cliente | 96 % |
| **Herramienta de tickets** | **68 %**. Ningún producto domina: ServiceNow, Zendesk y Jira aparecen 3 veces cada uno; GLPI y Jira Service Management, 0 |
| **Redes** | **51 %**; el 30 % nombra DNS, DHCP, TCP/IP o VPN |
| **Hardware** | **49 %** |
| **Windows 10/11** | **38 %** |
| **M365 o Active Directory** | **32 %** |
| Turnos | 28 % |
| Intune/MDM | 15 % |
| Linux | 11 % |
| ITIL | 6 % |
| PowerShell | 4 % |
| SQL | 2 % |

**Certificaciones en soporte:** ninguna de 47 ofertas exige una; 5 la citan como plus (ITIL 2, CompTIA A+ 1, Microsoft Windows 1, ServiceNow 1). AZ-900, MD-102 y Google IT Support: 0.

**Qué aparece en las ofertas de datos (B):** SQL 62 %, Power BI 52 %, Python 52 %, Excel 38 %.

**Muestra gallega de datos y BI, 31 ofertas con la ficha leída** (doc del proyecto `analisis-mercados-verificado-oct-2026`):
- Power BI 21, SQL 11, Excel 10, Python 4.
- Título universitario requerido en 10; título o FP aceptado en 3; título o experiencia en 2.
- Junior, prácticas o recién titulado: 6. 100 % remoto: 3.
- Cerca de la mitad de la demanda de Power BI está en puestos de negocio (administración, finanzas, control de gestión, RRHH), no en "analista de datos" puro (doc `ofertas-galicia-oct-2026`).

**Tecnoempleo con tu sesión (12–13/10/2026):**
- El portal solo cubre España (2.482 de 2.484 ofertas; las otras 2 son de Andorra, Francia y Portugal). **No sirve para Argentina, Austria ni Suiza.**

| Búsqueda | Total | 100 % remoto | ≤1 año | Formación mínima más pedida | A Coruña |
|---|---|---|---|---|---|
| "soporte" | 595 | 86 | 92 (15,5 %) | FP2/Grado Superior 124, Grado Medio 45 | 9 (Pontevedra 3) |
| "helpdesk" | 52 | 5 | — | — | 3 |
| "Primer empleo" | 273 | 21 | — | — | — |

- En "Primer empleo", por función: Soporte Técnico 40, Técnico de Sistemas 28, Helpdesk 26, Programador 73.
- **"Remoto" en España significa residir en España.** Ejemplo: Easy Things Software pide modalidad "100 % remota desde cualquier punto de España" (12/10/2026).
- **Ofertas freelance en todo el portal:** 2, ambas senior.

**[INTERPRETACIÓN DE MERCADO]**
- **Soporte es el rol de menor fricción** en experiencia y título.
- Su barrera para ti es el **inglés**: el 55 % pide B2 o más, sobre todo en remoto.
- Datos/BI tiene menos exigencia de inglés, pero más de título y experiencia, y menos ofertas junior.
- Excel, SQL y Power BI también aparecen en puestos que no son de IT puro (administración, finanzas, soporte de aplicaciones). Sumarlos desde la semana 1 amplía las ofertas a las que puedes postular, sin cambiar de rol principal.

**[PLAN DE ACCIÓN RECOMENDADO]**

**Roles objetivo, en este orden:**
1. **Service Desk / Helpdesk N1 bilingüe.** Mientras sigas en Argentina, también "Technical Customer Support L1" en español + inglés para empresas de software (SaaS) o proveedores de servicios gestionados (MSP).
2. **Soporte de aplicaciones / soporte funcional N1:** tickets + SQL básico para consultar datos del cliente.
3. **Puestos de negocio con Excel y Power BI** (administrativo, control de gestión, informes): sobre todo en Galicia, desde julio de 2027.
4. **Data analyst / BI junior:** remoto LATAM desde Argentina, y en España con el PL-300 (febrero de 2028).

**Stack nuclear de los meses 1–9 (cuatro piezas, por frecuencia en las ofertas):**

| # | Pieza | Por qué | Herramienta del laboratorio |
|---|---|---|---|
| 1 | ITSM / tickets | 68 % | GLPI (gratis, Docker oficial) y conceptos transferibles a ServiceNow, Jira y Zendesk |
| 2 | Redes básicas (TCP/IP, DNS, DHCP, VPN, wifi) | 51 % | Cisco "Conceptos básicos de redes" y Packet Tracer |
| 3 | Windows 10/11 + hardware de puesto | 38 % / 49 % | Cisco Hardware Basics y Operating Systems Basics, más una VM de Windows 11 |
| 4 | Active Directory + Microsoft 365 | 32 % | Windows Server 2025 de evaluación (controlador de dominio) y Microsoft Learn |

- **Transversal:** atención al cliente en español e inglés (96 %).
- **Auxiliar, no nuclear:** PowerShell básico, solo para automatizar el laboratorio.

**Stack de datos, en paralelo (3 h por semana en los meses 1–6, 2 h en los 7–9):**

| # | Pieza | Por qué | Recurso |
|---|---|---|---|
| 1 | Excel (tablas dinámicas, BUSCARX, limpieza) | 38 % de las ofertas de datos; 10 de 31 en Galicia | Platzi "Excel Intermedio" y "Excel Avanzado para Análisis de Datos" |
| 2 | SQL (SELECT, JOIN, GROUP BY) | 62 %; 11 de 31 en Galicia | Terminar Platzi "SQL y MySQL" (te falta 1 clase) y "Fundamentos de Bases de Datos y SQL" |
| 3 | Power BI (Power Query, modelo, DAX básico) | 52 %; 21 de 31 en Galicia | Platzi "Power BI" y "Power BI DAX". Power BI Desktop es gratis |

**Fuera de la fase 1:** ML, Big Data, DevOps, desarrollo web y Tableau. Python (52 % de las ofertas de datos) entra en la fase 2, semana 70.

---

## 2. Contratación remota desde Argentina

**[DATO COMPROBADO]**

**Monotributo:**
- ARCA permite a los monotributistas **exportar servicios con Factura E**, sin superar el tope de la categoría máxima.
- La exportación **cuenta** para el tope.
- La recategorización evalúa los últimos 12 meses y se hace en febrero y agosto.

| Categoría (valores desde el 1/08/2026) | Tope anual | Cuota mensual (servicios) |
|---|---|---|
| A | $12.009.410,45 | $49.527,18 |
| B | $17.595.182,74 | $56.379,08 |

**Cobro en dólares (BCRA):**
- La Comunicación **A 8330** (18/09/2025) exime a las personas humanas de liquidar los cobros por exportación de servicios **sin límite de monto**.
- La **A 8417** (09/04/2026) extiende esa excepción **a todos los conceptos de servicios**.
- Según fuentes secundarias (BBVA, Allende), los fondos deben ingresar en 20 días hábiles a una cuenta propia en moneda extranjera.

**Plataformas de contratación:**

| Plataforma | EOR en Argentina | Contratistas en Argentina | EOR en España |
|---|---|---|---|
| Deel | Sí, desde US$599/mes | Sí | Sí |
| Remote.com | Sí, US$699/mes | US$29/mes por contratista | Sí |
| Oyster | Sí | No verificado | Sí |

- Deel permite retirar a DolarApp en Argentina con una comisión del 0,75 %.

**Después de mudarte a España:**
- **IRPF, art. 9:** eres residente fiscal si pasas más de 183 días en el año, si tienes en España el núcleo de tus intereses económicos, o por presunción si residen aquí tu cónyuge e hijos menores.
- **Convenios:** hay convenio de doble imposición España–Argentina (BOE-A-2014-373) y convenio de Seguridad Social, vigente desde el 01/12/2004.
- **Autónomo (RETA):** obligatorio si trabajas por cuenta propia. La "tarifa plana" dura 12 meses, prorrogables otros 12. **Su importe de 2026 no está verificado en norma oficial**; fuentes secundarias dicen 80 €/mes.

**Remote Rocketship, 22 ofertas revisadas:**
- Listados abiertos a Argentina: IT support 10, technical support 13, customer support 71.
- Solo **3 de 22** dicen "worldwide/anywhere". **4 exigen residir en Latinoamérica.** Las que piden "Spain/Europe – Remote" o "Living in EMEA" excluyen Argentina.

| Rango salarial visto | Dónde |
|---|---|
| US$500–1.200/mes | Synergy Beam |
| US$700–1.200/mes | Scale Army (sin experiencia) |
| US$1.200–1.500/mes | Remote Talent LATAM |
| US$18–22 k/año | Interlaced |

**En Argentina, en el propio país:**
- Help Desk L1 100 % remoto (Grow UP HR): sin experiencia obligatoria, inglés avanzado, salario en USD.
- Analista Help Desk Junior, híbrido (SMS Buenos Aires): pide estudiante avanzado o graduado.
- Mesa de Ayuda JR, híbrido (Yel).
- Los conteos de Bumeran, ZonaJobs y Computrabajo **no se verificaron**: no se pueden leer.

**[INTERPRETACIÓN DE MERCADO]**
- Un empleo **portable** (que sigas teniendo al mudarte) es el escenario menos probable: pocas ofertas lo permiten de forma explícita.
- Hay tres escenarios realistas:
  - **(a)** Soporte o atención técnica para una empresa extranjera, como contratista desde Argentina, cobrando en USD por Deel o Factura E. Portable solo si el empleador acepta España.
  - **(b)** Helpdesk junior en Argentina, híbrido en Buenos Aires. **No es portable**, pero suma experiencia demostrable.
  - **(c)** Llegar sin empleo y entrar por helpdesk N1 en Galicia o remoto en España, ya residiendo allí.
- Si llegas el 1 de julio de 2027, sumas 184 días en España ese año, así que probablemente serías residente fiscal español en 2027. Consúltalo con un asesor antes de mudarte.

**[PLAN DE ACCIÓN RECOMENDADO] · Filtros para postular**

| Señal en la oferta | Acción |
|---|---|
| "Argentina – Remote", "LATAM", "Worldwide/Anywhere", "independent contractor", "Deel/Remote" | **Postular** |
| "Worldwide/Anywhere", o el empleador ya usa EOR | **Prioridad máxima** (posible portabilidad) |
| "Only LATAM-based", "must be based in LATAM" | Postular solo como empleo puente; asume que lo dejarás en julio de 2027 |
| "Spain – Remote", "desde cualquier punto de España", "Europe/EMEA" | **No postular hasta estar en España** |
| "B2/C1 English" | Postular desde el mes 6–7, cuando estés en B1+; antes, solo puestos en español |
| Más de 2 años de experiencia | No postular |

**Rutina:**
- Desde la semana 9: 5 postulaciones por semana. Desde la semana 27: 10.
- Desde la semana 23, con P4 v1 publicado, suma ofertas de soporte de aplicaciones y de datos junior al mismo cupo.
- Registro en una hoja: fecha, empresa, filtro de residencia, inglés pedido, respuesta.
- **En cada entrevista pregunta:** "If I relocate to Spain in July 2027, could I keep the role through your EOR/contractor setup?"

---

## 3. Idiomas integrados al cronograma

**[DATO COMPROBADO]**

**Horas guiadas acumuladas desde cero:**

| Nivel | Inglés (Cambridge) | Alemán (Goethe-Institut) |
|---|---|---|
| A1 | — | 60–150 h |
| A2 | 180–200 h | 150–260 h |
| B1 | 350–400 h | 260–490 h |
| B2 | 500–600 h | 450–600 h |
| C1 | 700–800 h | 600–750 h |

**Viena, 30 ofertas de soporte y sistemas revisadas:**
- 26 exigen alemán o están escritas solo en alemán.
- Niveles explícitos: B1 en 1, B2 en 3, C1 en 2, C2 en 3; el resto pide "sehr gute" o "ausgezeichnete" (muy bueno o excelente).
- 3 tienen el inglés como idioma principal (administrador de sistemas, soporte de software, IT para eventos); **ninguna es N1**.
- 0 ofertas activas de soporte con español.

**Salario mínimo en Austria** (convenio IT de 2026, categoría AT, que incluye "Help desk, support"): **2.547 €/mes × 14 pagas** = 35.658 €/año; para principiantes, 2.420 €.

**Suiza:**
- Zona germanófona: 8 de 8 ofertas piden alemán, 5 a nivel nativo o "verhandlungssicher" (dominio negociador).
- Romandía: 4 de 6 piden francés.
- 8 de 14 piden **EFZ/CFC** (título suizo de formación profesional) o equivalente.

**Exámenes:**
- ÖSD en la Universidad de Viena: B1 a 60 € por módulo (unos 240 € los 4).
- Aptis General en España: 95 €; hay sesiones en A Coruña.

**Recursos gratis de alemán:** vhs-Lernportal (A1–B1, gratis) y Goethe "Deutsch üben".

**[INTERPRETACIÓN DE MERCADO]**
- **Inglés:** de A2 a B1 faltan unas 150–220 h; de A2 a B2, unas 300–420 h. A 5 h por semana, B1 llega hacia el mes 7–9 y B2 hacia 2028. Eso justifica pedir solo puestos en español o con inglés intermedio hasta el mes 6.
- **Alemán:** de cero a B2 son 450–600 h, unas 6–8 h por semana durante 18 meses. Eso canibalizaría la fase de búsqueda del primer empleo. Para octubre de 2028, B1 es alcanzable; B2 no, sin recortar lo técnico.

**[PLAN DE ACCIÓN RECOMENDADO]**

**Inglés: 6 h por semana en la fase 1; en la fase 2, 2 h en la mudanza, 4 h en las semanas 44–91 y 3 h en las 92–104:**

| Recurso | h/semana | Para qué |
|---|---|---|
| Platzi English Academy | 2 h | Terminar A2 (vas al 27 %) y seguir con B1 |
| Sesame | 1,5 h (15–20 min por día) | Simular llamadas de soporte y entrevistas |
| Conversación (Sesame o English Discoveries) | 1 h | Hablar: es lo que más pesa en las entrevistas de soporte |
| Producción técnica | 1 h | Escribir en inglés cada ticket y artículo de conocimiento del laboratorio |
| Escucha | 0,5 h | Material técnico en inglés (Microsoft Learn y Cisco en inglés) |

- **Integración sin canibalizar:** desde el mes 3, estudia el material técnico en inglés. Eso es exposición extra sin horas adicionales.
- **Exámenes:** Aptis General en España en la **semana 78 (abril de 2028)** para certificar B2: llegarías con unas 570 h acumuladas (B2 = 500–600 h). En la fase 1, opcional uno para medir nivel; no hace falta.
- Después del Aptis, el inglés sigue hacia C1 (700–800 h), que llegaría en 2029.

**Alemán (3 h por semana):**

| Período | Semanas | h/semana | Horas | Contenido |
|---|---|---|---|---|
| Ago 2027 → ene 2028 | 44–65 | 3 | ≈ 66 | vhs-Lernportal A1 |
| Ene → oct 2028 | 66–104 | 3 | ≈ 117 | A2; **examen A2 opcional (ÖSD o Goethe) en la semana 104** |

- **Total: ≈ 183 h**, dentro de la franja de A2 (150–260 h). B1 (260–490 h) llegaría en 2029.
- **No empieces alemán antes de agosto de 2027.** En la fase 1 cada hora de alemán resta a inglés, soporte o datos, y ninguna oferta alcanzable desde Argentina lo pide.

**Gallego (1 h por semana, desde la mudanza, semanas 44–104):** 3 de 19 ofertas españolas de soporte en la muestra exigen gallego alto. Las tres son de Sosmatic, en remoto desde España.

### 3.1 Inglés guiado por Platzi, con Little Language Lessons, Sesame y English Discoveries

**[DATO COMPROBADO] (13/10/2026, en tu navegador)**
- **Platzi English Academy** tiene una ruta por nivel, con certificado al terminar cada uno. Tu avance:

| Nivel | Enlace directo | Cursos | Tu avance |
|---|---|---|---|
| A1 | https://platzi.com/english-academy/beginner-core/ | 16 | 3 de 16 cursos (15 %) |
| A2 | https://platzi.com/english-academy/beginner-core2/ | 15 | 105 de 254 clases, 5 de 15 cursos (27 %) |
| B1 | https://platzi.com/english-academy/intermediate-core/ | 18 | 7 de 396 clases (1 %) |
| B2 | https://platzi.com/english-academy/intermediate-core2/ | 15 | 1 % |
| C1 | https://platzi.com/english-academy/advanced-core/ | 11 | 1 % |

  - Test de nivel de Platzi (15–30 min): https://platzi.com/evaluation/test-ingles/
  - B2 incluye "Inglés Práctico para Conversaciones de Trabajo", phrasal verbs, pronunciación y escritura.
- **Cursos de Platzi para tu perfil, fuera de los niveles:**
  - Inglés para Programadores: https://platzi.com/cursos/ingles-developers/
  - Inglés para Servicio al Cliente: https://platzi.com/cursos/customerservice/
  - Inglés para Entrevistas de Trabajo: https://platzi.com/cursos/ingles-entrevistas/
  - Inglés Práctico para Conversaciones de Trabajo: https://platzi.com/cursos/taller-conversaciones-trabajo/
  - Vocabulario en Inglés para el Trabajo: https://platzi.com/cursos/ingles-basico-trabajo/
  - Inglés para el Desarrollo Profesional: https://platzi.com/cursos/ingles-intermedio-trabajo/
  - Inglés para Ciberseguridad: https://platzi.com/cursos/ingles-ciberseguridad/
  - Practicar Inglés con AI: https://platzi.com/cursos/practica-ingles-con-ai/
- **Little Language Lessons** (https://labs.google/lll/es): experimento gratuito de Google Labs con 3 herramientas.
  - Tiny Lesson: vocabulario y frases para una situación que eliges.
  - Slang Hang: conversaciones con expresiones naturales.
  - Word Cam: vocabulario de los objetos de una foto.
  - Para entrar hay que aceptar un aviso de "experimento"; eso lo haces tú.
- **Sesame** (https://app.sesame.com/): llamada de voz con una IA (Maya o Miles) que habla inglés. Funciona sin iniciar sesión. Es una "research preview": no tiene lecciones ni guarda tu avance.
- **English Discoveries** (https://ed.engdis.com/cababilingue#/login), con tu sesión:
  - **No tienes ningún curso asignado.** La página dice que contactes a tu profesor o administrador.
  - El Centro de Evaluaciones tiene 0 pruebas disponibles.
  - Lo que sí está abierto: la **Revista Discoveries** (lecturas mensuales en nivel Basic, Intermediate y Advanced; la de octubre de 2026 es "Social Media at Work") y el **Libro de gramática**.

**[INTERPRETACIÓN]** Sí, se puede aprender guiado por Platzi. Platzi pone el orden y la gramática de cada semana, y las otras tres se usan para practicar eso mismo:
- Little Language Lessons y Sesame no siguen a Platzi solas: les das tú el tema del día.
- English Discoveries sirve hoy para leer y repasar gramática. Si te asignan el curso, suma su unidad y sus pruebas.

**[PLAN DE ACCIÓN RECOMENDADO] · Rutina diaria (fase 1: 1 h de lunes a sábado; fase 2: 30 min entre semana y 1–1,5 h el fin de semana)**

| Paso | Minutos (fase 1) | Qué haces | Enlace |
|---|---|---|---|
| 1 | 25 | 2–3 clases de Platzi del nivel o curso de la semana | El de la tabla de arriba |
| 2 | 10 | Tiny Lesson con la situación del día ("a user can't log in", "explain a ticket status", "job interview: tell me about yourself") | https://labs.google/lll/es |
| 3 | 20 | Sesame: juego de roles usando la gramática de la clase. Ejemplo de inicio: "Let's practice. You are a user with a network problem and I am the help desk. Correct my grammar at the end." | https://app.sesame.com/ |
| 4 | 5 | Escribir 3 frases en inglés sobre el ticket o la tarea técnica del día | — |
| Sábado | 60 | 30 min de la Revista Discoveries en tu nivel y 30 min de un curso práctico de Platzi (servicio al cliente, entrevistas) | ED y Platzi |

**Orden de Platzi en la ruta:**

| Semanas | Platzi |
|---|---|
| 1–13 | Terminar A2 (10 cursos que faltan) |
| 14–17 | Terminar Inglés para Programadores |
| 18–22 | Inglés para Servicio al Cliente |
| 23–26 | Inglés para Entrevistas de Trabajo y test de nivel de Platzi (punto de control B1) |
| 27–60 | B1 (18 cursos) |
| 61–77 | B2, con Conversaciones de Trabajo primero; preparación de Aptis desde la semana 57 |
| 78 | **Aptis B2** |
| 79–104 | Resto de B2, Inglés para Ciberseguridad y Desarrollo Profesional; después, C1 |

**Para English Discoveries:** escribe a "Buenos Aires Ciudad Bilingüe" (botón de chat de la página o tu profesor/administrador) y pide que te asignen el curso y la prueba de nivel. Si lo hacen, la unidad de English Discoveries reemplaza la revista del sábado.

---

## 4. Itinerario técnico en dos fases

### FASE 1 · Meses 1–9 · semanas 1–39 · 26/10/2026 → 25/07/2027 · antes de la mudanza

**Carga:** 20 h por semana fijas (versión 3; antes 15 + opcionales).

| Bloque | Meses 1–6 | Meses 7–9 |
|---|---|---|
| Soporte (teoría + laboratorio) | 6 h | 5 h |
| Datos (Excel → SQL → Power BI) | 4 h | 3 h |
| Inglés | 6 h | 6 h |
| Empleo y portfolio | 2 h | 4 h |
| Ampliación (temas del repo, ahora fija; sección 4.1) | 2 h | 2 h |
| **Total** | **20 h** | **20 h** |

La tabla de meses de abajo es el núcleo. Lo que se suma con las horas extra está en la sección 4.2.

| Mes | Semanas · fechas | Soporte | Datos | Entregable |
|---|---|---|---|---|
| **1** | 1–4 · 26/10 → 22/11/2026 | Terminar Platzi "Computadores" (vas 16/26) y "Terminal" (23/26). Cisco Hardware Basics (6 h) y Operating Systems Basics (12 h) | Terminar Platzi "SQL y MySQL" (1 clase). Platzi "Excel Intermedio" | Corregir el email de git |
| **2** | 5–9 · 23/11 → 27/12 | Cisco IT Customer Support Basics (4 h) y "Conceptos básicos de redes" (22 h) | Platzi "Excel Avanzado para Análisis de Datos" | CV en español e inglés (con el diploma de la Xunta), LinkedIn. **Semana 9: primeras postulaciones** |
| **3** | 10–13 · 28/12 → 24/01/2027 | **Preparar el host:** comprobar si tu Windows es Home (sin Hyper-V → VirtualBox 7.2); Ubuntu Server 26.04; descargar las evaluaciones de Windows Server 2025 y Windows 11 (instalarlas en el mes 4, porque el plazo corre desde la instalación). **GLPI en Docker** (`glpi/glpi`): categorías, prioridades, SLA, base de conocimiento. Práctica en Packet Tracer | Platzi "Fundamentos de Bases de Datos y SQL". Primeras consultas SQL sobre la base de datos de GLPI | README "Lab host" en GitHub |
| **4** | 14–17 · 25/01 → 21/02 | **Active Directory:** controlador de dominio en Windows Server Core (2 GB), DNS, DHCP, unidades organizativas, usuarios, grupos, GPO. Cliente Windows 11 (4 GB) unido al dominio | Platzi "Power BI" | **P1 v1** publicado |
| **5** | 18–22 · 22/02 → 28/03 | **PowerShell básico** con el módulo de Active Directory. Teoría de Microsoft 365 y Entra ID (guía de AB-900 en Learn, sin examen) | Platzi "Power BI DAX". **P4a v1:** panel de SLA con 200 tickets simulados | **P2 v1** (altas y bajas desde un CSV) y **P4a v1** publicados |
| **6** | 23–26 · 29/03 → 25/04 | Cisco "IT Support Specialist Career Path" (30 h; sigue en 7–9). Primeras 5 incidencias simuladas en P1, cada una con su ticket en GLPI. Conceptos de ITSM (incidente, problema, cambio, SLA) | **P4b:** panel del pensionado con datos reales (ocupación, ingresos, clientes); ya está en la ruta del repo | P4b publicado; punto de control de inglés B1 |
| **7–9** | 27–39 · 26/04 → 25/07 | Terminar el Career Path. 10 incidencias + 5 artículos de conocimiento en español e inglés. **P3** en Packet Tracer. Linux Unhatched (8 h). Banco de 30 preguntas técnicas respondidas en español e inglés. **Reconstruir P1 con scripts**, porque la evaluación de Windows 11 caduca a los 90 días. Simulacros semanales sin IA | Práctica de SQL en HackerRank y LeetCode (gratis). **P4a v2** con los tickets reales de P1. 20 preguntas típicas de entrevista de datos (SQL, Excel, Power BI) | 10 postulaciones por semana, entrevistas. Scrum y Jira básico (3 h). Semanas 36–39: mudanza |

**Hito de la semana 39:**
- 4 proyectos publicados (P1–P4).
- 10 tickets documentados y 5 artículos de conocimiento.
- Inglés B1.
- 150–250 postulaciones registradas.
- Idealmente, empleo de soporte, soporte de aplicaciones o datos (escenarios a/b de la sección 2).

### FASE 2 · Meses 10–24 · semanas 40–104 · 26/07/2027 → 22/10/2028 · trabajando

**Carga (versión 3):** 20 h por semana, salvo las 4 semanas de la mudanza (10 h). Estarás trabajando: son unas 3 h por día laborable y 5 h el fin de semana.

| Semanas | Inglés | Alemán | Sistemas | Datos | Empleo | Gallego | Total |
|---|---|---|---|---|---|---|---|
| 40–43 | 2 | – | 4 | 2 | 2 | – | **10** |
| 44–69 | 4 | 3 | 7 | 5 | – | 1 | **20** |
| 70–91 | 4 | 3 | 7 | 5 | – | 1 | **20** |
| 92–104 | 3 | 3 | 7 | 5 | 1 | 1 | **20** |

La tabla de abajo es el núcleo de cada tramo (las columnas de horas son las de la versión 2.1). Lo que se suma con las horas extra está en la sección 4.2.

| Semanas · fechas | Sistemas | Datos | Inglés | Alemán | Contenido |
|---|---|---|---|---|---|
| **40–43** · 26/07 → 22/08/2027 | 4 | 2 | 2 | 0 | **Mudanza:** padrón, DNI, inscripción como demandante de empleo en Galicia (da acceso al programa de la Xunta para mayores de 52). Postular a helpdesk N1 y a puestos con Excel/Power BI, en Galicia y remotos en España |
| **44–60** · 23/08 → 19/12/2027 | 5 | 3 | 3 | 4 | Sistemas: **MD-102** (Intune, despliegue de Windows, cumplimiento de dispositivos), **examen en la semana 60**. Prueba de Intune o M365 Business Premium opcional (30 días, piden tarjeta, cancela a tiempo). Datos: Platzi "Power BI Avanzado", modelo en estrella, Power Query; ruta del PL-300 en Learn |
| **61–69** · 20/12/2027 → 20/02/2028 | 5 | 3 | 3 | 4 | Sistemas: Windows Server avanzado, identidad híbrida (Entra Connect), PowerShell intermedio (funciones, manejo de errores, logs) → **P2 v2**. Datos: simulacros y **examen PL-300 en la semana 69** |
| **70–91** · 21/02 → 23/07/2028 | 4 | 2 | 3 | 6 | Sistemas: curso AZ-900 de Platzi (5 h) como entrada y después **Azure, administración (AZ-104)**, **examen en la semana 88**; la cuenta gratuita de Azure da 200 US$ por 30 días y pide tarjeta; los sandboxes de Learn ya no existen. Cisco Linux Essentials desde la semana 89. Datos: Python con pandas (Platzi "Fundamentos de Python", vas 5/32). **Aptis B2 en la semana 78** |
| **92–104** · 24/07 → 22/10/2028 | 4 | 2 | 2 | 7 | Sistemas: Linux Essentials (con las semanas 89–91 suman ≈ 64 de sus 70 h). ITIL 4 Foundation solo si lo paga la empresa. Datos: proyecto Python + SQL (con CTE y funciones de ventana) y EDA aplicado a ese proyecto. CV para España y Viena. **Alemán A2 en la semana 104 (examen opcional)** |

**Si tu primer empleo es de datos:** invierte los bloques desde la semana 44 (datos 7 h, sistemas 5 h). PL-300 pasa a la semana 60 y MD-102 a después de octubre de 2028.

**Después de octubre de 2028:** ver la sección 4.1.

### 4.1 Temas del repo `study_app` que la ruta no traía

Ninguno se quita. Cada uno va al bloque de ampliación de la fase 1, se fusiona con un tema de la ruta o queda para después de octubre de 2028 (la "Fase 7" de la app).

**Ampliación de la fase 1 (versión 3: fija, 2 h por semana, 78 h), en este orden:**

| Tema | Horas |
|---|---|
| Platzi "Git + GitHub" y práctica (commits, ramas, pull requests) | 12 |
| Terminar Platzi "Claude AI" (vas 5/20), Claude 101, AI Fluency, AI Capabilities and Limitations, Platzi "Claude Code para No Programadores" | 21 |
| Platzi "SQL Avanzado I" y práctica | 12 |
| Platzi "SQL Avanzado II + PostgreSQL" y proyecto | 14 |
| Portfolio web en GitHub Pages con P1–P4 | 12 |
| Práctica: SQL avanzado aplicado a P4a | 7 |

**Total: 78 h.** "Contabilidad, finanzas y control de gestión" pasa a datos, semanas 44–69 (sección 4.2), cuando ya estás en Galicia.

**Se fusionan con temas de la ruta:**
- **AZ-900:** el curso de Platzi abre el bloque de AZ-104 (semana 70). El examen AZ-900 es opcional y sin fecha (€76 en España).
- **AB-900:** la guía ya está en el mes 5. El examen es opcional y sin fecha.
- **Python y pandas:** datos, semanas 70–91.
- **Proyecto Python + SQL y EDA:** datos, semanas 92–104.
- **LeetCode y HackerRank:** práctica de SQL en los meses 7–9. La parte de Python va después de octubre de 2028.
- **Scrum y Jira, "Conseguir Trabajo en Tecnología", preparación de entrevistas:** bloque de empleo.
- **Ya están en la ruta:**
  - AZ-104 deja de depender de la "opción A".
  - El "Alemán A1, 11 h" pasa al bloque de alemán (semanas 44–104).
  - Linux Essentials e ITIL siguen en la ruta; ITIL, solo si lo paga la empresa.
- **Gallego:** 1 h por semana desde la mudanza (sección 3).

**Después de octubre de 2028 (versión 3), en este orden:**
1. **Sistemas:** resto de Cisco "Técnico en Redes", CCNA (opción A), opción B (ciberseguridad: Analista Junior, Google Cybersecurity, Security+), exámenes opcionales de AZ-900 y AB-900.
2. **Datos:** Google Data Analytics, estadística y A/B, Tableau Avanzado, analítica GA4, dbt/Snowflake, ML, Big Data, Docker, Kubernetes.
3. **IA:** resto de los cursos de Claude (Claude Code 101 e in Action, API, MCP, agentes), AI-901, Copilot Studio.
4. **Otros:** networking y estrategia de búsqueda, francés, alemán B1.

### 4.2 Qué se suma con las horas de la versión 3

Lo que antes estaba en la Fase 7 entra en la ruta, en orden de importancia laboral. Si algo no entra en su tramo, pasa al siguiente o vuelve a la Fase 7.

**Fase 1 (+1 h de inglés, +1 h de soporte y +1 h de datos por semana; 39 h cada uno):**
- **Inglés:** 1 h de conversación por semana.
- **Soporte, en este orden:**
  - Platzi "Redes Informáticas de Internet" (6 h), junto a Cisco Redes.
  - Cisco "Introducción a Ciberseguridad" (6 h).
  - Platzi "Seguridad Informática para Equipos Técnicos" (3 h).
  - Platzi "Servidores Linux" (6 h), junto a Linux Unhatched.
  - Teoría de Intune: primeros módulos de la ruta MD-102 en Learn (18 h). Intune aparece en el 15 % de las ofertas de soporte.
- **Datos:** devolver las horas que se recortaron para que todo cupiera (Fundamentos de BD 10 → 20 h, Power BI 12 → 16, DAX 9 → 24, HackerRank 14 → 20, Excel Intermedio 11 → 12) y 3 h de práctica en P4. Es la parte de "aprender mejor": más práctica en lo mismo.

**Fase 2, sistemas (7 h por semana; +157 h):**

| Semanas | Se suma |
|---|---|
| 44–69 | Cisco "Seguridad de Terminales" (27 h), junto a MD-102. AZ-900: práctica y guía de Learn (22 h), como base del AZ-104; el examen sigue opcional |
| 70–91 | Platzi Azure: IaaS, almacenamiento y bases de datos (20 h), junto a AZ-104. ITIL 4: preparación (18 h); el examen, solo si lo paga la empresa. AWS: fundamentos y práctica (13 h). Linux Essentials empieza antes y se completa (70 h) |
| 92–104 | Cisco "Técnico en Redes" (≈ 45 de sus 70 h; el resto, después de octubre de 2028) |

**Fase 2, datos (5 h por semana; +157 h):**

| Semanas | Se suma |
|---|---|
| 44–69 | Contabilidad, finanzas y control de gestión (20 h; 9 de 31 ofertas gallegas). Introducción a ERP/SAP y SAP Analytics (15 h; 8 de 31). Power Automate (8 h). BI Estratégico (10 h) |
| 70–91 | Caso práctico de KPIs (3 h). Fabric (8 h). Qlik (6 h). Matplotlib y Seaborn (12 h). Excel con Python y proyecto (13 h). LeetCode Python (9 h). Tableau Básico y práctica (13 h) |
| 92–104 | Storytelling con datos y proyecto (13 h). Proyecto integrador de BI y su documentación (13 h). Calidad de datos (5 h). Looker Studio (10 h) |

**Fase 2, otros:** inglés +1 h (Aptis B2 pasa a la semana 78), gallego 1 h, empleo 2 h en la mudanza y 1 h en las semanas 92–104 (CV para España y Viena, búsqueda de N2).

### 4.3 Plan diario (plantilla para los 728 días)

La app reparte las tareas de cada semana en los 7 días con esta plantilla. Cada día muestra qué hacer, cuántos minutos y el enlace directo.

**Fase 1, semanas 1–26 (20 h):**

| Día | Inglés | Soporte | Datos | Empleo | Ampliación | Total |
|---|---|---|---|---|---|---|
| Lunes | 1 | 2 | – | – | – | 3 |
| Martes | 1 | – | 2 | – | – | 3 |
| Miércoles | 1 | 2 | – | – | – | 3 |
| Jueves | 1 | – | 2 | – | – | 3 |
| Viernes | 1 | 2 | – | – | – | 3 |
| Sábado | 1 | – | – | 1 | 1,5 | 3,5 |
| Domingo | – | – | – | 1 | 0,5 | 1,5 |

**Fase 1, semanas 27–39:** igual, salvo jueves (datos 1 h + empleo 1 h) y viernes (soporte 1 h + empleo 1 h). Queda soporte 5, datos 3, empleo 4.

**Mudanza, semanas 40–43 (10 h):** lunes a viernes 1 h (sistemas, datos o empleo, alternando); sábado 3 h; domingo 2 h. Inglés 2 h en la semana.

**Fase 2, semanas 44–104 (20 h, trabajando):**

| Día | Inglés | Alemán | Sistemas | Datos | Gallego / empleo | Total |
|---|---|---|---|---|---|---|
| Lunes, miércoles, viernes | 0,5 | 0,5 | 1 | – | – | 2 |
| Martes, jueves | 0,5 | 0,5 | – | 1 | – | 2 |
| Sábado | 0,5 | – | 3 | 1,5 | – | 5 |
| Domingo | 1 (0 en 92–104) | 0,5 | 1 | 1,5 | gallego 1 (+ empleo 1 en 92–104) | 5 |

- **Reglas de reparto:** las tareas del bloque se vierten en orden sobre sus huecos del día. Si una tarea no termina, sigue al día siguiente del mismo bloque. Los laboratorios y proyectos van al sábado.
- **Inglés:** cada día de inglés se muestra como la rutina de la sección 3.1, con los 3–4 enlaces (Platzi, Little Language Lessons, Sesame y, el sábado, English Discoveries).
- **Enlaces:** cada tarea lleva al menos un enlace. Las prácticas enlazan al curso o documento en el que se apoyan. Los enlaces comprobados están en el anexo de enlaces.

---

## 5. Portfolio contra el sesgo de edad y experiencia

**[DATO COMPROBADO]**
- **Sesgo de edad:** según Van Borm, Burn y Baert (IZA DP 12849), la percepción de menor habilidad tecnológica y menor capacidad de aprender explica cerca del 41 % del efecto de la edad en las invitaciones a entrevista.
- **Requisitos mínimos oficiales:**

| Sistema | RAM | Otros |
|---|---|---|
| Windows Server 2025 Server Core | 2 GB | Evaluación de 180 días; activar en los primeros 10. Un controlador de dominio de evaluación no se puede convertir a licencia retail |
| Windows 11 | 4 GB | TPM 2.0 y arranque seguro; en VM, vTPM. Evaluación de 90 días; al expirar, se apaga cada hora |
| Ubuntu Server 26.04 LTS | 1,5 GB (3 GB sugeridos) | — |

- GLPI 12 es la versión estable; tiene imagen Docker oficial.
- Hyper-V solo existe en Windows Pro, Enterprise y Education. VirtualBox 7.2 admite TPM y arranque seguro.
- Packet Tracer es gratis y pide 4 GB de RAM libres.
- El sandbox E5 del programa para desarrolladores de M365 solo está disponible para suscriptores de Visual Studio, partners o clientes Premier/Unified.

**[INTERPRETACIÓN]**
- El presupuesto de RAM que propongo es cálculo mío: controlador de dominio 2 GB + Windows 11 4 GB + Ubuntu con GLPI 2 GB = **8 GB para las VMs y 8 GB para el host**. Packet Tracer y Power BI Desktop se usan en el host con las VMs de Windows apagadas.
- Que el laboratorio sea reproducible con scripts es en sí mismo evidencia de competencia.

**[PLAN DE ACCIÓN RECOMENDADO] · Cuatro proyectos**

**P1 · "Pyme Ficticia S.L.": dominio, puesto de trabajo y mesa de ayuda**
- **Qué contiene:**
  - Controlador de dominio Windows Server 2025 Core con DNS y DHCP.
  - Cliente Windows 11 unido al dominio.
  - GLPI con categorías y SLA.
  - Directivas de grupo: unidades de red, política de contraseñas, bloqueo de pantalla.
- **Evidencia:**
  - 10 incidencias reales reproducidas y resueltas, cada una con ticket, diagnóstico, causa raíz y solución. Ejemplos: cuenta bloqueada, sin red por DHCP, DNS que no resuelve, impresora, perfil corrupto, espacio en disco, VPN.
  - 5 artículos de base de conocimiento en español e inglés.
  - Diagrama de la red.
- **Criterio de "hecho":** alguien sin contexto puede reconstruir el laboratorio con el README en menos de 2 horas.

**P2 · Automatización de altas y bajas con PowerShell**
- **Qué hace:**
  - Lee un CSV de RRHH.
  - Crea usuarios, grupos y carpetas.
  - Deshabilita las bajas.
  - Deja logs y genera un informe CSV o Excel del resultado.
- **v2:** manejo de errores, parámetros, una prueba simple y un CSV de resultados que P4a puede leer.
- **Evidencia:** comparar el tiempo manual con el script ("20 altas: 40 min → 2 min").

**P3 · Red de oficina pyme en Packet Tracer con diagnóstico**
- **Qué contiene:** 2 VLAN, DHCP, DNS, salida a internet simulada y 5 fallos inyectados, cada uno con su método de diagnóstico (ipconfig, ping, nslookup, tracert, show).
- **Evidencia:** un vídeo corto (3–5 min) donde explicas en inglés un fallo y su solución. Ataca directamente el sesgo de "no aprende" y el de inglés.

**P4 · Datos de la mesa de ayuda y de un negocio real (une soporte y datos)**
- **P4a, panel de SLA:**
  - v1 (mes 5): 200 tickets simulados → consultas SQL (tiempo de resolución, % dentro del SLA, tickets por categoría, reaperturas) → CSV → Power BI.
  - v2 (meses 7–9): los mismos indicadores con los tickets reales de P1, leídos de la base de datos de GLPI. Medidas DAX documentadas.
- **P4b, panel del pensionado (mes 6):** ocupación, ingresos y clientes con datos reales. Anonimiza los datos de clientes antes de publicarlo.
- **Evidencia:** el `.pbix`, las consultas SQL y un README con 3 decisiones que tomarías mirando cada panel.
- **Para qué sirve:** es la pieza que mostrar en ofertas de soporte de aplicaciones, de datos junior y de negocio con Power BI.

**Suman como contexto:**
- Tu trabajo técnico en Tu Lugar en Galicia (Next.js/Vercel) y la propia study_app.
- Pero no reemplazan P1–P4.

### Protocolo de uso de IA (Claude o Copilot)

**[DATO COMPROBADO]**
- **Anthropic** (29/01/2026, ensayo aleatorizado con 52 participantes): quienes usaron IA sacaron **50 %** en el cuestionario de comprensión, frente a **67 %** de quienes programaron a mano. La mayor diferencia apareció en depuración.
  - Patrones con media ≥65 %: preguntas conceptuales, pedir el código **con explicación**, y generar y luego preguntar para entender.
  - Patrones con media <40 %: delegar todo, depender cada vez más, y depurar iterando con la IA.
- **Bastani et al. (PNAS, 2025):** al retirar un tutor GPT-4 sin salvaguardas, los estudiantes rindieron **−17 %**; con salvaguardas, el daño se mitigó.
- **Exámenes de Microsoft:** está prohibido usar IA. Los exámenes associate permiten consultar Microsoft Learn; los Fundamentals, no.
- **Entrevistas:** la guía de Anthropic para candidatos dice que en las entrevistas en vivo no se usa IA salvo que se indique.

**[PLAN] · Reglas**
1. **Primero intentas solo,** 25 minutos como mínimo, antes de preguntar.
2. **Pregunta conceptos, no soluciones:** "¿por qué falla DHCP si el ámbito está activo?", no "arréglame esto".
3. **Si pides código, pídelo con explicación línea por línea.** Después lo reescribes sin mirar y lo ejecutas.
4. **La depuración la haces tú.** La IA solo puede sugerir hipótesis; tú las compruebas con comandos.
5. **IA como auditor:** "revisa mi script y dime 3 riesgos"; tú corriges.
6. **Archivo `AI_USAGE.md` en cada repo:** qué te ayudó a hacer la IA y qué hiciste tú. Es honesto y suma en entrevistas.
7. **Simulacro semanal sin IA:** un ticket aleatorio de P1 resuelto en voz alta, en inglés, con cronómetro.
8. **Los exámenes los preparas como se rinden:** sin IA.

---

## 6. Calendario resumido

| Período | Semanas | Fechas | h/semana | Foco | Hito |
|---|---|---|---|---|---|
| Mes 1 | 1–4 | 26/10 → 22/11/2026 | 20 | Hardware, Windows · Excel | — |
| Mes 2 | 5–9 | 23/11 → 27/12 | 20 | Redes · Excel avanzado · CV | Primeras postulaciones |
| Mes 3 | 10–13 | 28/12 → 24/01/2027 | 20 | Host, GLPI, seguridad básica · SQL | Laboratorio listo |
| Mes 4 | 14–17 | 25/01 → 21/02 | 20 | Active Directory · Power BI | P1 v1 |
| Mes 5 | 18–22 | 22/02 → 28/03 | 20 | PowerShell, M365 · DAX | P2 v1 y P4a v1 |
| Mes 6 | 23–26 | 29/03 → 25/04 | 20 | Diagnóstico, ITSM · pensionado | P4b; B1 de inglés en curso |
| Meses 7–9 | 27–39 | 26/04 → 25/07 | 20 | Búsqueda intensiva, incidencias, P3, Linux, Intune · SQL | P1–P4; empleo o plan B; mudanza |
| Mudanza | 40–43 | 26/07 → 22/08/2027 | 10 | Trámites y postulaciones en Galicia | — |
| Meses 11–14 | 44–60 | 23/08 → 19/12/2027 | 20 | MD-102, seguridad de terminales · Power BI avanzado, contabilidad, SAP · alemán A1, gallego | MD-102 (semana 60) |
| Meses 14–16 | 61–69 | 20/12/2027 → 20/02/2028 | 20 | Servidores, PowerShell, AZ-900 · PL-300, Power Automate | P2 v2; PL-300 (semana 69) |
| Meses 16–21 | 70–91 | 21/02 → 23/07/2028 | 20 | AZ-104, Azure IaaS, ITIL, AWS, Linux · Python, Tableau, Fabric · inglés B2, alemán A2 | Aptis B2 (semana 78); AZ-104 (semana 88) |
| Meses 22–24 | 92–104 | 24/07 → 22/10/2028 | 20 | Linux, redes (Cisco) · proyecto integrador BI · CV para la UE | Alemán A2 (opcional) |

**Horas planificadas (versión 3):**
- Fase 1: 780 h (39 × 20).
- Mudanza: 40 h.
- Fase 2: 1.220 h (61 × 20).
- **Total: 2.040 h.** Alemán: ≈ 183 h. Gallego: 61 h.
- A la misma fecha que el final de la ruta del repo (abril de 2028) llevas ≈ 1.520 h, de ellas ≈ 105 de alemán. La ruta del repo sumaba 1.462 h.

---

## 7. Plan B y puntos de control

- **Semana 13** (enero 2027): ¿GLPI funcionando, Excel y SQL terminados, 20+ postulaciones? Si no, recorta la ampliación y mantén el núcleo.
- **Ritmo de 20 h:** si durante 4 semanas seguidas haces menos de 17 h por semana, vuelve a 15 h. Se quita lo de la sección 4.2 empezando por lo último. Aplica sobre todo desde la semana 44, ya trabajando.
- **Semana 26** (abril 2027): ¿P1, P2 v1 y P4 publicados? ¿Inglés B1 en el test de English Discoveries o de Platzi? Si no llegas a B1, pasa 1 h de datos a inglés.
- **Semana 26, respuestas:** si las entrevistas llegan más por datos que por soporte, invierte los bloques (datos 5 h, soporte 3 h) en los meses 7–9.
- **Semana 39** (julio 2027):
  - **Sin empleo:** sigue en el escenario (c). En Galicia, helpdesk N1 (en "soporte" hay 9 ofertas locales en A Coruña), remoto en España ya residiendo allí (86 ofertas de "soporte" 100 % remotas, 15,5 % piden ≤1 año), y el programa de la Xunta para mayores de 52.
  - **Con empleo no portable:** renuncias al mudarte con 6–9 meses de experiencia, que ya valen en el CV.
- **Semana 69** (febrero 2028): PL-300. Si no apruebas, repite en la semana 75 con 1 h de sistemas pasada a datos.
- **Semana 78** (abril 2028): Aptis B2. Decide si Viena sigue siendo objetivo. Si sí, sube alemán a 6–8 h por semana a costa de lo último de la sección 4.2.

---

## 8. Costo (sin contar Platzi)

| Concepto | Fase | Costo |
|---|---|---|
| Cisco NetAcad, Microsoft Learn, evaluaciones de Windows Server y Windows 11, Ubuntu, GLPI, Packet Tracer, vhs-Lernportal, Sesame | 1 y 2 | Gratis |
| MD-102 (España) | 2 | €126 |
| PL-300 (España) | 2 | €126 |
| AZ-104 (España) | 2 | €126, si mantiene la tarifa de examen associate verificada para MD-102 y PL-300; confírmalo en la página |
| Aptis General B2 (España) | 2 | €95 |
| Alemán A2 (ÖSD) | Opcional | €185 en la Universidad de Viena en 2026 (€135 escrito + €50 oral); en España, no verificado |
| ITIL Foundation (versión 4 o 5) | Opcional | ITIL 4: 559 € + IVA ≈ €676 (precio consultado antes); la versión 5, no verificado. Solo si lo paga la empresa |
| Pruebas de Azure, Intune o M365 | Opcional | Gratis, pero piden tarjeta; cancelar antes de que se cobren |

**Totales (versión 3):**
- Fase 1: **€0**.
- Fase 2: **≈ €473**, o ≈ €658 si rindes el A2 de alemán en Viena, o ≈ €1.149 sin el A2 y con ITIL pagado por ti. Los cursos que se suman en la sección 4.2 son gratis (Cisco, Learn, SAP Learning, Qlik) o de Platzi.
- Un reintento del PL-300 suma €126.

---

## 9. Expectativas realistas

Estas probabilidades son **[INTERPRETACIÓN]**, no datos.

**Hasta julio de 2027:**

| Escenario | Probabilidad |
|---|---|
| Algún empleo de soporte, soporte de aplicaciones o datos (escenarios a o b) | 40–55 % (versión 3: más inglés y más práctica) |
| De ellos, solo por la vía de datos | 5–15 % |
| Que además sea portable a España | 10–20 % |

- Respecto de la versión 1: el portfolio de soporte llega unos 3 meses más tarde (menos probabilidad en soporte antes de abril de 2027), pero sumas ofertas de soporte de aplicaciones y de datos. El total no cambia en mi estimación.

**Al llegar a Galicia:**
- Helpdesk N1 local o remoto en España: 30–45 %. En España, el 68 % de las ofertas de soporte de la muestra acepta ≤1 año, y lo que más pesa es la FP o la experiencia.
- Puestos de negocio con Excel y Power BI: suman opciones, pero en Galicia 10 de 31 ofertas piden título universitario.

**Octubre de 2028**, con unos 12 meses de experiencia, MD-102, PL-300, AZ-104, inglés B2 desde abril y lo de la sección 4.2:

| Destino | Tipo de puesto | Probabilidad (versión 3) | Antes (v2.1) |
|---|---|---|---|
| España | Soporte N2 o sistemas junior | 45–60 % presencial o híbrido; 30–45 % remoto | 40–55 %; 25–40 % |
| España | Analista BI / datos junior, o negocio con Power BI | 25–35 % | 20–30 % |
| Viena | Puestos con el inglés como idioma principal (pocos) | 5–15 % | 5–15 % |
| Viena | Puestos que exigen alemán (con A2) | ≈ 0–2 % | < 5 % |
| Suiza | Cualquiera | 0–3 % | 0–3 % |

- Lo que más pesa sigue siendo la experiencia real, no las horas de estudio. Por eso la mejora es moderada.

**Lo que no promete esta ruta:** que Viena o Suiza sean viables en octubre de 2028. Requieren, según los datos, alemán B2–C1 (o C2/nativo en Suiza) y, en Suiza, el título EFZ. Son objetivos para 2030 o después si mantienes el alemán.

---

## Fuentes (consultadas el 12–13/10/2026)

**Ofertas de empleo:**
- Tecnoempleo, con la sesión del candidato:
  - https://www.tecnoempleo.com/ofertas-trabajo/?te=soporte
  - https://www.tecnoempleo.com/ofertas-trabajo/?te=helpdesk
  - https://www.tecnoempleo.com/ofertas-trabajo/primer-empleo
  - https://www.tecnoempleo.com/ofertas-trabajo/freelance
- Remote Rocketship:
  - https://www.remoterocketship.com/country/argentina/jobs/it-support/
  - https://www.remoterocketship.com/country/argentina/jobs/technical-support/
  - https://www.remoterocketship.com/country/argentina/jobs/customer-support/
  - https://www.remoterocketship.com/country/spain/jobs/it-support/
- Las 68 fichas de la muestra de roles están en el informe de trabajo (cada una con su URL de Tecnoempleo o Remote Rocketship).

**Argentina:**
- ARCA, exportación de servicios: https://arca.gob.ar/monotributo/exportacion-servicios/
- ARCA, categorías: https://www.afip.gob.ar/monotributo/categorias.asp
- BCRA, Comunicación A 8330: https://www.bcra.gob.ar/archivos/Pdfs/comytexord/A8330.pdf
- BCRA, Comunicación A 8417: https://www.bcra.gob.ar/archivos/Pdfs/comytexord/A8417.pdf

**Plataformas de contratación:**
- Deel, Argentina: https://www.deel.com/employees/argentina
- Deel, España: https://www.deel.com/employees/spain
- Remote, Argentina: https://remote.com/country-explorer/argentina
- Remote, España: https://remote.com/country-explorer/spain
- Oyster, España: https://www.oysterhr.com/hire-employees/spain
- Deel, retiro a DolarApp: https://help.letsdeel.com/hc/en-gb/articles/26544942478609-DolarApp-Withdrawal-Method-for-Contractors-in-Argentina

**España:**
- IRPF, art. 9: https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764
- Convenio de doble imposición España–Argentina: https://www.boe.es/buscar/act.php?id=BOE-A-2014-373
- RETA, cuota reducida: https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/10721/10724/1320/1322
- Convenio de Seguridad Social España–Argentina: https://www.seg-social.es/descarga/en/8216

**Viena y Suiza:**
- karriere.at, IT Support en Viena: https://www.karriere.at/jobs/it-support/wien
- StepStone.at, IT Support en Viena: https://www.stepstone.at/jobs/it-support/in-wien
- WKO, convenio IT 2026: https://www.wko.at/kollektivvertrag/kollektivvertrags-abschluss-informationstechnologie-2026
- Lista de profesiones con escasez 2026 (BGBl. II 316/2025): https://www.wko.at/noe/industrie/bundesgesetzblatt-2025-ii-316.pdf
- jobs.ch: https://www.jobs.ch/de/stellenangebote/?term=IT%20Support
- SEM, permiso B para ciudadanos UE: https://www.sem.admin.ch/sem/de/home/themen/aufenthalt/eu_efta/ausweis_b_eu_efta.html

**Idiomas:**
- Goethe-Institut, horas por nivel: https://www.goethe.de/ins/gb/de/sta/lon/kur/faq.html
- Cambridge, horas guiadas: https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours
- ÖSD en la Universidad de Viena: https://sprachenzentrum.univie.ac.at/en/language-university/oesd-examinations
- Aptis en España: https://www.britishcouncil.es/eu/azterketak/aptis/datak-prezioak-tokiak

**Laboratorios:**
- Windows Server 2025, requisitos: https://learn.microsoft.com/en-us/windows-server/get-started/hardware-requirements
- Windows Server 2025, evaluación: https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025
- Windows 11 Enterprise, evaluación: https://www.microsoft.com/en-us/evalcenter/evaluate-windows-11-enterprise
- Ubuntu Server: https://ubuntu.com/download/server
- GLPI, imágenes Docker: https://github.com/glpi-project/docker-images
- Hyper-V: https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/about/
- VirtualBox: https://www.virtualbox.org/wiki/Downloads
- Packet Tracer: https://www.netacad.com/cisco-packet-tracer
- Programa para desarrolladores de M365: https://learn.microsoft.com/en-us/office/developer-program/microsoft-365-developer-program-faq
- Sandboxes de Microsoft Learn: https://learn.microsoft.com/en-us/training/support/faq?pivots=sandbox
- Cuenta gratuita de Azure: https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account

**IA y edad:**
- Anthropic, IA y aprendizaje: https://www.anthropic.com/research/AI-assistance-coding-skills
- Bastani et al., PNAS: https://doi.org/10.1073/pnas.2422633122
- Microsoft, uso de IA en exámenes: https://learn.microsoft.com/en-us/credentials/support/exam-and-assessment-lab-security-policies
- Anthropic, guía para candidatos: https://www.anthropic.com/candidate-ai-guidance
- IZA DP 12849: https://www.iza.org/publications/dp/12849

**Precios de exámenes Microsoft:**
- MD-102: https://learn.microsoft.com/es-es/credentials/certifications/modern-desktop/
- PL-300: https://learn.microsoft.com/es-es/credentials/certifications/power-bi-data-analyst-associate/

**Datos en Galicia:** docs del proyecto `analisis-mercados-verificado-oct-2026` (31 ofertas con ficha leída) y `ofertas-galicia-oct-2026`.

---

## Anexo · Enlaces verificados (13/10/2026)

Comprobados uno por uno: Platzi con tu sesión (estado de la página y título), Cisco NetAcad en el navegador y el resto con lectura directa de la página. Usa solo estos enlaces en la app.

### Platzi: enlaces del repo que fallan y su reemplazo

| En el repo | Qué pasa | Reemplazo |
|---|---|---|
| /cursos/power-bi-dax/ | No existe (404) | https://platzi.com/cursos/powerbi-dax/ (Curso de DAX para Power BI) |
| /cursos/power-bi/ | Existe, pero es "Análisis de Datos con Power BI", no el curso base | https://platzi.com/cursos/powerbi/ (Curso de Power BI) |
| /cursos/sql-avanzado/ y /cursos/sql-practico/ | No existen. Platzi ya no tiene "SQL Avanzado I/II" | https://platzi.com/cursos/postgresql/ + LeetCode SQL 50 + HackerRank SQL |
| /cursos/eda/ | No existe | https://platzi.com/cursos/analisis-exploratorio-datos/ |
| /cursos/python-excel/ | No existe | https://platzi.com/cursos/excel-analytics-python/ (Excel Analytics con AI y Python) |
| /cursos/google-data-studio/ | No existe | https://platzi.com/cursos/lookerstudio/ |
| /cursos/storytelling-datos/ | No existe | https://platzi.com/cursos/data-viz/ (Visualización de Datos y Storytelling) |
| /cursos/matplotlib-seaborn/ | Curso retirado (abre una página genérica) | https://platzi.com/cursos/data-viz/ y, para gráficos en Python, https://platzi.com/cursos/python-data-science/ |
| /cursos/tableau-avanzado/ | No existe | Sin reemplazo: queda solo https://platzi.com/cursos/tableau/ |
| /cursos/python-basico/ | Redirige | https://platzi.com/cursos/fundamentos-python/ |
| ab-testing, clustering-segmentacion, feature-engineering, langchain, machine-learning-python, redes-neuronales, regresion-lineal-python, scikit-learn, series-temporales, tensorflow, validacion-modelos | No existen o abren una página genérica | Son de la Fase 7. Buscar reemplazo en Platzi o dejarlos sin enlace con la nota "curso retirado". En el buscador aparece /cursos/regresion-lineal/ |
| /escuela/ingles/ | Redirige a English Academy | El enlace del nivel o curso de la sección 3.1 |

### Platzi: enlaces que funcionan

| Área | Curso | Enlace |
|---|---|---|
| Soporte | Computadores e Informática | https://platzi.com/cursos/computacion-basica/ |
| Soporte | Terminal y Línea de Comandos | https://platzi.com/cursos/terminal/ |
| Soporte | Redes Informáticas de Internet | https://platzi.com/cursos/redes/ |
| Soporte | Redes Avanzado | https://platzi.com/cursos/avanzado-redes/ |
| Soporte | Atención al Cliente y Soporte a Usuarios | https://platzi.com/cursos/soporte-usuarios/ |
| Soporte | Seguridad Informática Básica | https://platzi.com/cursos/guia-seguridad-informatica/ |
| Soporte | Seguridad Informática para Equipos Técnicos | https://platzi.com/cursos/seguridad-empresas/ |
| Sistemas | Introducción a la Administración de Linux | https://platzi.com/cursos/linux/ |
| Sistemas | Administración de Servidores Linux | https://platzi.com/cursos/servidores-linux/ |
| Sistemas | Configuración de Entorno en Linux | https://platzi.com/cursos/entorno-linux/ |
| Sistemas | Azure Active Directory | https://platzi.com/cursos/azure-active-directory/ |
| Sistemas | Microsoft 365 Copilot | https://platzi.com/cursos/copilot-365/ |
| Sistemas | Fundamentos de Azure (AZ-900) | https://platzi.com/cursos/az-900/ |
| Sistemas | Azure IaaS | https://platzi.com/cursos/azure-iaas/ |
| Sistemas | Introducción a AWS | https://platzi.com/cursos/aws-fundamentos/ |
| Datos | SQL y MySQL | https://platzi.com/cursos/sql-mysql/ |
| Datos | Excel Básico / Intermedio / Avanzado | https://platzi.com/cursos/excel-basico/ · https://platzi.com/cursos/excel-intermedio/ · https://platzi.com/cursos/excel-avanzado/ |
| Datos | Excel Avanzado para Análisis de Datos | https://platzi.com/cursos/excel-avanzado-datos/ |
| Datos | Fundamentos de Bases de Datos y SQL | https://platzi.com/cursos/fundamentos-bbdd-sql/ |
| Datos | Power BI / DAX / Avanzado | https://platzi.com/cursos/powerbi/ · https://platzi.com/cursos/powerbi-dax/ · https://platzi.com/cursos/powerbi-avanzado/ |
| Datos | PostgreSQL | https://platzi.com/cursos/postgresql/ |
| Datos | Python desde cero | https://platzi.com/cursos/fundamentos-python/ |
| Datos | Python para Ciencia de Datos (pandas) | https://platzi.com/cursos/python-data-science/ |
| Datos | Análisis Exploratorio de Datos | https://platzi.com/cursos/analisis-exploratorio-datos/ |
| Datos | Visualización de Datos y Storytelling | https://platzi.com/cursos/data-viz/ |
| Datos | Excel Analytics con AI y Python | https://platzi.com/cursos/excel-analytics-python/ |
| Datos | Looker Studio | https://platzi.com/cursos/lookerstudio/ |
| Datos | Tableau | https://platzi.com/cursos/tableau/ |
| Datos | Business Intelligence | https://platzi.com/cursos/business-intelligence/ |
| Datos | Contabilidad Básica / Planeación Financiera | https://platzi.com/cursos/contabilidad-basica/ · https://platzi.com/cursos/planeacion-financiera/ |
| Datos | Power Apps y Power Automate | https://platzi.com/cursos/power-automate/ |
| Datos (Fase 7) | Estadística Descriptiva, Fundamentos de ML, MLOps, NLP, Docker, Big Data en AWS, Chatbots con OpenAI API, Prompt Engineering | /cursos/estadistica-descriptiva/, /machine-learning/, /mlops/, /nlp/, /docker/, /big-data/, /openai-api/, /prompt-engineering/ |
| IA | Claude AI / Claude Code para No Programadores | https://platzi.com/cursos/claude/ · https://platzi.com/cursos/claude-code-no-programadores/ |
| IA | Agentes con Copilot Studio | https://platzi.com/cursos/copilot-studio/ |
| Empleo | Git y GitHub | https://platzi.com/cursos/gitgithub/ |
| Empleo | Conseguir Trabajo en Tecnología | https://platzi.com/cursos/conseguir-trabajo-tech/ |
| Empleo | Atención al Cliente | https://platzi.com/cursos/atencion-cliente/ |
| Inglés | Niveles y cursos | Ver la sección 3.1 |

### Cisco NetAcad: cambiar los catálogos por el enlace directo de cada curso

| Curso | Enlace |
|---|---|
| Conceptos Básicos de Hardware de Computadora | https://www.netacad.com/es/courses/computer-hardware-basics?courseLang=es-XL |
| Operating Systems Basics | https://www.netacad.com/es/courses/operating-systems-basics |
| IT Customer Support Basics | https://www.netacad.com/es/courses/it-customer-support-basics |
| Conceptos Básicos de Redes (Networking Basics) | https://www.netacad.com/es/courses/networking-basics |
| Linux Unhatched | https://www.netacad.com/es/courses/linux-unhatched?courseLang=es-XL |
| Linux Essentials, en español "Fundamentos de Linux" | https://www.netacad.com/es/courses/fundamentos-de-linux?courseLang=es-XL |
| IT Support Specialist (itinerario) | https://www.netacad.com/es/career-paths/it-support-specialist |
| Introducción a Ciberseguridad | https://www.netacad.com/es/courses/introduction-to-cybersecurity |
| Seguridad de Terminales | https://www.netacad.com/es/courses/endpoint-security |
| Técnico en Redes (itinerario) | https://www.netacad.com/es/career-paths/network-technician |
| Analista Junior en Ciberseguridad (itinerario) | https://www.netacad.com/es/career-paths/cybersecurity |
| Packet Tracer | https://www.netacad.com/cisco-packet-tracer |

### Otros: funcionan

- **Anthropic (gratis):** los 11 cursos de anthropic.skilljar.com del repo abren. "Introduction to Model Context Protocol" muestra un aviso de "video still being processed".
- **Microsoft:**
  - AZ-104, AZ-900, AB-900, PL-300, MD-102 y Azure AI Fundamentals (el examen ahora es **AI-901**).
  - Módulos de Power Automate y modelo semántico, ruta de Fabric, ruta de Copilot Studio.
  - Cuenta gratuita de Azure; evaluaciones de Windows 11 (90 días) y Windows Server 2025 (180 días, activar en los primeros 10).
  - MD-102 se actualiza el 27/10/2026: revisa la guía de estudio antes de prepararlo.
- **Laboratorio:**
  - GLPI en Docker: https://github.com/glpi-project/docker-images
  - Ubuntu Server 26.04.1 LTS: https://ubuntu.com/download/server
  - VirtualBox 7.2.20: https://www.virtualbox.org/wiki/Downloads
- **Práctica de SQL:**
  - HackerRank SQL: https://www.hackerrank.com/domains/sql
  - LeetCode SQL 50: https://leetcode.com/studyplan/top-sql-50/ (en lugar de la portada de LeetCode)
- **BI y datos:** Qlik (gratis), SAP Analytics Cloud (4 h 57 min), SAP S/4HANA embedded analytics (2 h 48 min), dbt (2 enlaces), Snowflake, cuenta demo de Google Analytics, Google Data Analytics / Advanced / Cybersecurity, Scrum Guide.
- **CompTIA Security+:** sale la V8 hacia el 17/11/2026.
- **Exámenes de idiomas:**
  - Aptis General: €95; hay sesiones en A Coruña en noviembre y diciembre de 2026.
  - ÖSD en Viena: A2 a C2.
- **Alemán:** vhs-Lernportal A1 (https://a1.vhs-lernportal.de/) abre una página intermedia: hay que pulsar "weiter zu A1-Deutschkurs".
- **Empleo:** Remote Rocketship (13 ofertas de soporte técnico abiertas a Argentina) y Tecnoempleo.
- **Inglés:**
  - Little Language Lessons: https://labs.google/lll/es
  - Sesame: https://app.sesame.com/
  - English Discoveries: https://ed.engdis.com/cababilingue#/login

### Enlaces añadidos (13/10/2026, tarde)

Para las tareas que quedaban sin enlace:

| Tarea | Enlace |
|---|---|
| PowerShell básico | https://learn.microsoft.com/es-es/training/modules/introduction-to-powershell/ |
| PowerShell con Active Directory, P2 v1 y v2 | https://learn.microsoft.com/es-es/powershell/module/activedirectory/ |
| Entra Connect (identidad híbrida) | https://learn.microsoft.com/es-es/entra/identity/hybrid/connect/whatis-azure-ad-connect |
| CCNA | https://www.netacad.com/es/courses/ccna-introduction-networks |
| Punto de control de inglés (S26) | https://platzi.com/evaluation/test-ingles/ |
| Pregunta sobre EOR | https://www.deel.com/employees/spain |
| CV | https://platzi.com/cursos/conseguir-trabajo-tech/ |
| LinkedIn | https://platzi.com/cursos/linkedin/ (Optimización de LinkedIn) |
| Preparar una entrevista de trabajo | https://platzi.com/cursos/entrevista-trabajo/ |
| Python para entrevistas de datos (en lugar de "LeetCode Python") | https://leetcode.com/studyplan/30-days-of-pandas/ |
| ITIL: preparación | https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154 |
| Gallego, semanas 44–75 (Celga 1 en liña, autoaprendizaje abierto) | https://www.lingua.gal/recursos/para-aprender-o-galego/_/celga-1/contido_0052/curso-celga-1-lina |
| Gallego, semanas 76–104 (Celga 2 en liña) | https://www.lingua.gal/recursos/para-aprender-o-galego/_/celga-2/contido_0047/curso-celga-2-lina |
| Mudanza: empadronamiento en A Coruña | https://www.coruna.gal/web/gl/detalle/empadroamento-normas-e-obtencion-do-volante-ou-certificado/contenido/1149055362379 |
| Mudanza: cita para el DNI | https://www.citapreviadnie.es/ |

- **ITIL:** PeopleCert ya ofrece **ITIL Foundation versión 5**; la 4 sigue disponible (https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-foundation-2565). Si la empresa te lo paga, conviene la 5. Su precio no está verificado.
- **Inscripción como demandante de empleo en Galicia:** la página de Emprego Xunta no permite la lectura automática; ábrela tú desde xunta.gal.

### No verificado

- **Goethe "Deutsch üben":** la página no permite la lectura automática. Ábrela tú desde goethe.de.
- **/escuela/datos/ y /escuela/devops-cloud/ de Platzi:** son portadas de escuela. Reemplázalas por el curso concreto de la tabla.
