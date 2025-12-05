import type { StudyPathData, Task, StatData } from "./types"
import { HOURS_PER_WORKING_DAY, TOTAL_WEEKS, PROFILE_MAP, TECH_MAP, CATEGORY_MAP } from "./constants"
import { addWorkingDays } from "./date-utils"

interface TaskTemplate {
  name: string
  durationHours: number
  category: string
  tech: string[]
  profile: string[]
  links?: string[]
}

/**
 * Generates the initial 52-week study plan structure
 */
export function generateStudyPlan(): StudyPathData {
  const path: Task[] = []
  let totalEstimatedHours = 0

  for (let week = 1; week <= TOTAL_WEEKS; week++) {
    const tasks = getWeeklyTasks(week)

    tasks.forEach((task, index) => {
      totalEstimatedHours += task.durationHours
      path.push({
        id: `${week}-${index + 1}`,
        week,
        name: task.name,
        durationHours: task.durationHours,
        loggedHours: 0,
        category: task.category,
        tech: task.tech,
        profile: task.profile,
        progress: 0,
        links: task.links,
      })
    })
  }

  const totalEstimatedWorkingDays = Math.ceil(totalEstimatedHours / HOURS_PER_WORKING_DAY)

  return {
    tasks: path,
    totalEstimatedHours,
    totalEstimatedWorkingDays,
    loggedHours: {},
  }
}

/**
 * Gets task templates for a specific week based on the DATA/BI Specialist roadmap
 */
function getWeeklyTasks(week: number): TaskTemplate[] {
  // FASE 1: FUNDAMENTOS SÓLIDOS (Weeks 1-13)
  if (week === 1) {
    return [
      {
        name: "Setup + Computación Base + Terminal",
        durationHours: 10,
        category: "fundamentos",
        tech: [],
        profile: ["da"],
        links: ["https://platzi.com/cursos/computacion-basica/", "https://platzi.com/cursos/terminal/"],
      },
      { name: "Práctica: Scripts bash", durationHours: 3, category: "practica", tech: [], profile: ["da"] },
      {
        name: "Inglés: Vocabulario técnico básico (A1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 2) {
    return [
      {
        name: "Git + GitHub",
        durationHours: 10,
        category: "fundamentos",
        tech: [],
        profile: ["da"],
        links: ["https://platzi.com/cursos/gitgithub/"],
      },
      { name: "Práctica: Repositorios y workflow", durationHours: 3, category: "practica", tech: [], profile: ["da"] },
      {
        name: "Inglés: Git/GitHub vocabulary (A1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 3) {
    return [
      {
        name: "Python Fundamentos I",
        durationHours: 10,
        category: "fundamentos",
        tech: ["python"],
        profile: ["da"],
        links: ["https://platzi.com/cursos/python-basico/"],
      },
      { name: "Proyecto: Mini agenda CLI", durationHours: 3, category: "practica", tech: ["python"], profile: ["da"] },
      {
        name: "Inglés: Python vocabulary (A1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 4) {
    return [
      {
        name: "Python Fundamentos II",
        durationHours: 10,
        category: "fundamentos",
        tech: ["python"],
        profile: ["da"],
        links: ["https://platzi.com/cursos/python-intermedio/"],
      },
      {
        name: "Proyecto: Calculadora científica",
        durationHours: 3,
        category: "practica",
        tech: ["python"],
        profile: ["da"],
      },
      {
        name: "Inglés: Programming terms (A1-A2)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 5) {
    return [
      {
        name: "Excel Básico + Avanzado",
        durationHours: 10,
        category: "fundamentos",
        tech: ["bi"],
        profile: ["da"],
        links: ["https://platzi.com/cursos/excel-basico/", "https://platzi.com/cursos/excel-avanzado/"],
      },
      { name: "Proyecto: Dashboard Excel", durationHours: 3, category: "practica", tech: ["bi"], profile: ["da"] },
      {
        name: "Inglés: Business vocabulary (A2)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core2/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 6) {
    return [
      {
        name: "Excel con Python (OpenPyXL)",
        durationHours: 10,
        category: "fundamentos",
        tech: ["python", "bi"],
        profile: ["da"],
        links: ["https://platzi.com/cursos/python-excel/"],
      },
      {
        name: "Proyecto: Automatización informes",
        durationHours: 3,
        category: "practica",
        tech: ["python"],
        profile: ["da"],
      },
      {
        name: "Inglés: Data vocabulary (A2)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core2/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 7) {
    return [
      {
        name: "SQL Básico",
        durationHours: 10,
        category: "fundamentos",
        tech: ["sql"],
        profile: ["da"],
        links: ["https://platzi.com/cursos/sql-basico/"],
      },
      { name: "Práctica: Consultas SELECT", durationHours: 3, category: "practica", tech: ["sql"], profile: ["da"] },
      {
        name: "Inglés: Database terms (A2)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core2/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 8) {
    return [
      {
        name: "SQL Intermedio",
        durationHours: 10,
        category: "fundamentos",
        tech: ["sql"],
        profile: ["da"],
        links: ["https://platzi.com/cursos/sql-practico/"],
      },
      { name: "Práctica: JOINs y subqueries", durationHours: 3, category: "practica", tech: ["sql"], profile: ["da"] },
      {
        name: "Inglés: Technical reading (A2)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core2/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 9) {
    return [
      {
        name: "Matemáticas para Data Science",
        durationHours: 10,
        category: "fundamentos",
        tech: ["python"],
        profile: ["ds"],
        links: ["https://platzi.com/cursos/estadistica-inferencial/"],
      },
      {
        name: "Práctica: Ejercicios matemáticos",
        durationHours: 3,
        category: "practica",
        tech: ["python"],
        profile: ["ds"],
      },
      {
        name: "Inglés: Math & Stats vocabulary (A2)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/beginner-core2/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 10) {
    return [
      {
        name: "Estadística Descriptiva",
        durationHours: 10,
        category: "fundamentos",
        tech: ["python"],
        profile: ["ds"],
        links: ["https://platzi.com/cursos/estadistica-descriptiva/"],
      },
      {
        name: "Proyecto: Análisis estadístico",
        durationHours: 3,
        category: "practica",
        tech: ["python"],
        profile: ["ds"],
      },
      {
        name: "Inglés: Scientific terms (B1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/intermediate-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 11) {
    return [
      {
        name: "Python: Pandas & NumPy I",
        durationHours: 10,
        category: "python_avanzado",
        tech: ["python"],
        profile: ["ds", "da"],
        links: ["https://platzi.com/cursos/pandas-numpy/"],
      },
      {
        name: "Práctica: Data manipulation",
        durationHours: 3,
        category: "practica",
        tech: ["python"],
        profile: ["ds"],
      },
      {
        name: "Inglés: Data Science vocabulary (B1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/intermediate-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 12) {
    return [
      {
        name: "Python: Pandas & NumPy II",
        durationHours: 10,
        category: "python_avanzado",
        tech: ["python"],
        profile: ["ds", "da"],
        links: ["https://platzi.com/cursos/manipulacion-datos-python/"],
      },
      {
        name: "Práctica: Análisis exploratorio",
        durationHours: 3,
        category: "practica",
        tech: ["python"],
        profile: ["ds"],
      },
      {
        name: "Inglés: Technical documentation (B1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/intermediate-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  if (week === 13) {
    return [
      {
        name: "Visualización: Matplotlib & Seaborn",
        durationHours: 10,
        category: "python_avanzado",
        tech: ["python", "bi"],
        profile: ["ds", "da"],
        links: ["https://platzi.com/cursos/matplotlib-seaborn/"],
      },
      { name: "Proyecto: Dashboard Python", durationHours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
      {
        name: "Inglés: Presentation skills (B1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/intermediate-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  // FASE 2: DATA ANALYSIS (Weeks 14-26)
  if (week === 14) {
    return [
      {
        name: "Análisis Exploratorio de Datos (EDA)",
        durationHours: 10,
        category: "analisis",
        tech: ["python"],
        profile: ["ds", "da"],
        links: ["https://platzi.com/cursos/eda/"],
      },
      { name: "Proyecto: EDA completo", durationHours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
      {
        name: "Inglés: Analysis vocabulary (B1)",
        durationHours: 2,
        category: "ingles",
        tech: [],
        profile: [],
        links: [
          "https://platzi.com/ruta/intermediate-core/",
          "https://platzi.com/escuela/ingles/",
          "https://www.sesamestreet.org/",
          "https://ciudadbilingue.edu.co/",
        ],
      },
    ]
  }

  // Apply the same pattern for weeks 15-26...

  if (week >= 15 && week <= 26) {
    const weekTasks: TaskTemplate[] = []

    // Week-specific technical tasks
    if (week === 15) {
      weekTasks.push(
        {
          name: "SQL Avanzado I",
          durationHours: 10,
          category: "fundamentos",
          tech: ["sql"],
          profile: ["da", "de"],
          links: ["https://platzi.com/cursos/sql-avanzado/"],
        },
        {
          name: "Práctica: Optimización queries",
          durationHours: 3,
          category: "practica",
          tech: ["sql"],
          profile: ["da"],
        },
      )
    } else if (week === 16) {
      weekTasks.push(
        {
          name: "SQL Avanzado II + PostgreSQL",
          durationHours: 10,
          category: "fundamentos",
          tech: ["sql"],
          profile: ["da", "de"],
          links: ["https://platzi.com/cursos/postgresql/"],
        },
        { name: "Proyecto: Base de datos", durationHours: 3, category: "practica", tech: ["sql"], profile: ["da"] },
      )
    } else if (week === 17) {
      weekTasks.push(
        {
          name: "Power BI I - Fundamentos",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/power-bi/"],
        },
        { name: "Práctica: Primer dashboard", durationHours: 3, category: "practica", tech: ["bi"], profile: ["da"] },
      )
    } else if (week === 18) {
      weekTasks.push(
        {
          name: "Power BI II - DAX",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/power-bi-dax/"],
        },
        {
          name: "Proyecto: Dashboard interactivo",
          durationHours: 3,
          category: "practica",
          tech: ["bi"],
          profile: ["da"],
        },
      )
    } else if (week === 19) {
      weekTasks.push(
        {
          name: "Tableau Básico",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/tableau/"],
        },
        { name: "Práctica: Visualizaciones", durationHours: 3, category: "practica", tech: ["bi"], profile: ["da"] },
      )
    } else if (week === 20) {
      weekTasks.push(
        {
          name: "Tableau Avanzado",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/tableau-avanzado/"],
        },
        {
          name: "Proyecto: Dashboard ejecutivo",
          durationHours: 3,
          category: "practica",
          tech: ["bi"],
          profile: ["da"],
        },
      )
    } else if (week === 21) {
      weekTasks.push(
        {
          name: "Looker Studio + Google Analytics",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/google-data-studio/"],
        },
        {
          name: "Proyecto: Reporte automatizado",
          durationHours: 3,
          category: "practica",
          tech: ["bi"],
          profile: ["da"],
        },
      )
    } else if (week === 22) {
      weekTasks.push(
        {
          name: "Storytelling con Datos",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/storytelling-datos/"],
        },
        {
          name: "Proyecto: Presentación ejecutiva",
          durationHours: 3,
          category: "practica",
          tech: ["bi"],
          profile: ["da"],
        },
      )
    } else if (week === 23) {
      weekTasks.push(
        {
          name: "Proyecto Integrador BI",
          durationHours: 10,
          category: "practica",
          tech: ["bi", "sql"],
          profile: ["da"],
        },
        {
          name: "Portfolio: Documentación proyecto",
          durationHours: 3,
          category: "practica",
          tech: ["bi"],
          profile: ["da"],
        },
      )
    } else if (week === 24) {
      weekTasks.push(
        {
          name: "Business Intelligence Estratégico",
          durationHours: 10,
          category: "bi",
          tech: ["bi"],
          profile: ["da"],
          links: ["https://platzi.com/cursos/business-intelligence/"],
        },
        { name: "Caso práctico: KPIs", durationHours: 3, category: "practica", tech: ["bi"], profile: ["da"] },
      )
    } else if (week === 25) {
      weekTasks.push(
        {
          name: "A/B Testing & Experimentación",
          durationHours: 10,
          category: "analisis",
          tech: ["python"],
          profile: ["ds", "da"],
          links: ["https://platzi.com/cursos/ab-testing/"],
        },
        {
          name: "Proyecto: Diseño experimento",
          durationHours: 3,
          category: "practica",
          tech: ["python"],
          profile: ["ds"],
        },
      )
    } else {
      // week 26
      weekTasks.push(
        {
          name: "Proyecto Final Fase 2",
          durationHours: 10,
          category: "practica",
          tech: ["python", "sql", "bi"],
          profile: ["da"],
        },
        { name: "Preparación Portfolio", durationHours: 3, category: "practica", tech: [], profile: ["da"] },
      )
    }

    weekTasks.push({
      name: `Inglés: Technical communication (B1)`,
      durationHours: 2,
      category: "ingles",
      tech: [],
      profile: [],
      links: [
        "https://platzi.com/ruta/intermediate-core/",
        "https://platzi.com/escuela/ingles/",
        "https://www.sesamestreet.org/",
        "https://ciudadbilingue.edu.co/",
      ],
    })

    return weekTasks
  }

  // FASE 3: MACHINE LEARNING (Weeks 27-39)
  if (week >= 27 && week <= 39) {
    const weekTasks: TaskTemplate[] = []

    if (week === 27) {
      weekTasks.push(
        {
          name: "Fundamentos Machine Learning",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/machine-learning/"],
        },
        { name: "Práctica: Primer modelo", durationHours: 3, category: "practica", tech: ["ml"], profile: ["ds"] },
      )
    } else if (week === 28) {
      weekTasks.push(
        {
          name: "Regresión Lineal & Logística",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/regresion-lineal-python/"],
        },
        { name: "Proyecto: Modelo predictivo", durationHours: 3, category: "practica", tech: ["ml"], profile: ["ds"] },
      )
    } else if (week === 29) {
      weekTasks.push(
        {
          name: "Árboles de Decisión & Random Forest",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/scikit-learn/"],
        },
        { name: "Proyecto: Clasificación", durationHours: 3, category: "practica", tech: ["ml"], profile: ["ds"] },
      )
    } else if (week === 30) {
      weekTasks.push(
        {
          name: "Support Vector Machines & KNN",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/machine-learning-python/"],
        },
        {
          name: "Práctica: Comparación modelos",
          durationHours: 3,
          category: "practica",
          tech: ["ml"],
          profile: ["ds"],
        },
      )
    } else if (week === 31) {
      weekTasks.push(
        {
          name: "Clustering & Dimensionalidad",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/clustering-segmentacion/"],
        },
        {
          name: "Proyecto: Segmentación clientes",
          durationHours: 3,
          category: "practica",
          tech: ["ml"],
          profile: ["ds"],
        },
      )
    } else if (week === 32) {
      weekTasks.push(
        {
          name: "Feature Engineering",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/feature-engineering/"],
        },
        {
          name: "Práctica: Optimización features",
          durationHours: 3,
          category: "practica",
          tech: ["ml"],
          profile: ["ds"],
        },
      )
    } else if (week === 33) {
      weekTasks.push(
        {
          name: "Model Evaluation & Validation",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/validacion-modelos/"],
        },
        { name: "Proyecto: Pipeline completo", durationHours: 3, category: "practica", tech: ["ml"], profile: ["ds"] },
      )
    } else if (week === 34) {
      weekTasks.push(
        {
          name: "Redes Neuronales Básicas",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/redes-neuronales/"],
        },
        {
          name: "Práctica: Primera red neuronal",
          durationHours: 3,
          category: "practica",
          tech: ["ml"],
          profile: ["ds"],
        },
      )
    } else if (week === 35) {
      weekTasks.push(
        {
          name: "TensorFlow & Keras",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/tensorflow/"],
        },
        {
          name: "Proyecto: Clasificación imágenes",
          durationHours: 3,
          category: "practica",
          tech: ["ml"],
          profile: ["ds"],
        },
      )
    } else if (week === 36) {
      weekTasks.push(
        {
          name: "NLP Fundamentos",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/nlp/"],
        },
        {
          name: "Proyecto: Análisis sentimientos",
          durationHours: 3,
          category: "practica",
          tech: ["ml"],
          profile: ["ds"],
        },
      )
    } else if (week === 37) {
      weekTasks.push(
        {
          name: "Series Temporales",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/series-temporales/"],
        },
        { name: "Proyecto: Forecasting", durationHours: 3, category: "practica", tech: ["ml"], profile: ["ds"] },
      )
    } else if (week === 38) {
      weekTasks.push(
        {
          name: "MLOps Básico",
          durationHours: 10,
          category: "ml",
          tech: ["ml", "python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/mlops/"],
        },
        { name: "Proyecto: Deploy modelo", durationHours: 3, category: "practica", tech: ["ml"], profile: ["ds"] },
      )
    } else {
      // week 39
      weekTasks.push(
        {
          name: "Proyecto ML Completo",
          durationHours: 10,
          category: "practica",
          tech: ["ml", "python"],
          profile: ["ds"],
        },
        { name: "Documentación & Presentación", durationHours: 3, category: "practica", tech: [], profile: ["ds"] },
      )
    }

    weekTasks.push({
      name: `Inglés: Technical writing & presentations (B1-B2)`,
      durationHours: 2,
      category: "ingles",
      tech: [],
      profile: [],
      links: [
        "https://platzi.com/ruta/intermediate-core2/",
        "https://platzi.com/escuela/ingles/",
        "https://www.sesamestreet.org/",
        "https://ciudadbilingue.edu.co/",
      ],
    })

    return weekTasks
  }

  // FASE 4: SPECIALIZATION & EMPLOYMENT (Weeks 40-52)
  if (week >= 40 && week <= 52) {
    const weekTasks: TaskTemplate[] = []

    if (week === 40) {
      weekTasks.push(
        {
          name: "Big Data Fundamentos",
          durationHours: 10,
          category: "ingenieria",
          tech: ["python"],
          profile: ["de"],
          links: ["https://platzi.com/cursos/big-data/"],
        },
        { name: "Práctica: PySpark básico", durationHours: 3, category: "practica", tech: ["python"], profile: ["de"] },
      )
    } else if (week === 41) {
      weekTasks.push(
        {
          name: "Cloud Computing (AWS/Azure)",
          durationHours: 10,
          category: "ingenieria",
          tech: [],
          profile: ["de"],
          links: ["https://platzi.com/cursos/aws-fundamentos/", "https://platzi.com/cursos/azure-fundamentos/"],
        },
        { name: "Práctica: Deploy en cloud", durationHours: 3, category: "practica", tech: [], profile: ["de"] },
      )
    } else if (week === 42) {
      weekTasks.push(
        {
          name: "Docker & Containerization",
          durationHours: 10,
          category: "ingenieria",
          tech: [],
          profile: ["de"],
          links: ["https://platzi.com/cursos/docker/"],
        },
        { name: "Proyecto: Containerizar app", durationHours: 3, category: "practica", tech: [], profile: ["de"] },
      )
    } else if (week === 43) {
      weekTasks.push(
        {
          name: "IA Aplicada - Prompt Engineering",
          durationHours: 10,
          category: "ia",
          tech: [],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/prompt-engineering/"],
        },
        { name: "Proyecto: Chatbot básico", durationHours: 3, category: "practica", tech: [], profile: ["ds"] },
      )
    } else if (week === 44) {
      weekTasks.push(
        {
          name: "APIs IA (OpenAI, Anthropic)",
          durationHours: 10,
          category: "ia",
          tech: ["python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/openai-api/"],
        },
        { name: "Proyecto: Integración IA", durationHours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
      )
    } else if (week === 45) {
      weekTasks.push(
        {
          name: "LangChain & RAG",
          durationHours: 10,
          category: "ia",
          tech: ["python"],
          profile: ["ds"],
          links: ["https://platzi.com/cursos/langchain/"],
        },
        { name: "Proyecto: Sistema RAG", durationHours: 3, category: "practica", tech: ["python"], profile: ["ds"] },
      )
    } else if (week === 46) {
      weekTasks.push(
        {
          name: "Proyecto Capstone Final",
          durationHours: 10,
          category: "practica",
          tech: ["python", "sql", "ml", "bi"],
          profile: ["ds", "da"],
        },
        { name: "Documentación profesional", durationHours: 3, category: "practica", tech: [], profile: [] },
      )
    } else if (week === 47) {
      weekTasks.push(
        {
          name: "Portfolio Web & GitHub",
          durationHours: 10,
          category: "empleabilidad",
          tech: [],
          profile: [],
        },
        { name: "Optimización LinkedIn", durationHours: 3, category: "empleabilidad", tech: [], profile: [] },
      )
    } else if (week === 48) {
      weekTasks.push(
        {
          name: "CV Técnico + Carta Presentación",
          durationHours: 10,
          category: "empleabilidad",
          tech: [],
          profile: [],
        },
        { name: "Preparación entrevistas", durationHours: 3, category: "empleabilidad", tech: [], profile: [] },
      )
    } else if (week === 49) {
      weekTasks.push(
        {
          name: "Entrevistas Técnicas - Coding",
          durationHours: 10,
          category: "empleabilidad",
          tech: ["python"],
          profile: [],
          links: ["https://leetcode.com/", "https://www.hackerrank.com/"],
        },
        { name: "Mock interviews", durationHours: 3, category: "empleabilidad", tech: [], profile: [] },
      )
    } else if (week === 50) {
      weekTasks.push(
        {
          name: "Entrevistas Técnicas - SQL",
          durationHours: 10,
          category: "empleabilidad",
          tech: ["sql"],
          profile: ["da"],
          links: ["https://www.hackerrank.com/domains/sql"],
        },
        { name: "Casos prácticos SQL", durationHours: 3, category: "empleabilidad", tech: ["sql"], profile: ["da"] },
      )
    } else if (week === 51) {
      weekTasks.push(
        {
          name: "Networking & Aplicaciones",
          durationHours: 10,
          category: "empleabilidad",
          tech: [],
          profile: [],
        },
        { name: "Estrategia búsqueda empleo", durationHours: 3, category: "empleabilidad", tech: [], profile: [] },
      )
    } else {
      // week 52
      weekTasks.push(
        {
          name: "Certificaciones & Next Steps",
          durationHours: 10,
          category: "empleabilidad",
          tech: [],
          profile: [],
        },
        { name: "Plan Q1 2027", durationHours: 3, category: "empleabilidad", tech: [], profile: [] },
      )
    }

    weekTasks.push({
      name: `Inglés: Professional communication (B2)`,
      durationHours: 2,
      category: "ingles",
      tech: [],
      profile: [],
      links: [
        "https://platzi.com/ruta/intermediate-core2/",
        "https://platzi.com/escuela/ingles/",
        "https://www.sesamestreet.org/",
        "https://ciudadbilingue.edu.co/",
      ],
    })

    return weekTasks
  }

  // Default fallback
  return [
    { name: "Estudio semanal", durationHours: 10, category: "fundamentos", tech: [], profile: [] },
    { name: "Práctica", durationHours: 3, category: "practica", tech: [], profile: [] },
    { name: "Inglés", durationHours: 2, category: "ingles", tech: [], profile: [] },
  ]
}

/**
 * Recalculates all progress metrics
 */
export function recalculateProgress(data: StudyPathData): StudyPathData {
  const { tasks, totalEstimatedHours, loggedHours } = data
  let loggedHoursAll = 0
  let currentWeek = 1
  let firstIncompleteFound = false

  const techStats: Record<string, StatData> = {}
  Object.entries(TECH_MAP).forEach(([key, value]) => {
    techStats[key] = { ...value, estimated: 0, logged: 0, progress: 0 }
  })

  const profileStats: Record<string, StatData> = {}
  Object.entries(PROFILE_MAP).forEach(([key, value]) => {
    profileStats[key] = { ...value, estimated: 0, logged: 0, progress: 0 }
  })

  const categoryStats: Record<string, StatData> = {}
  Object.entries(CATEGORY_MAP).forEach(([key, value]) => {
    categoryStats[key] = { ...value, estimated: 0, logged: 0, progress: 0 }
  })

  const updatedTasks = tasks.map((task) => {
    const taskLoggedHours = loggedHours[task.id] || 0
    const progress = Math.min(100, Math.round((taskLoggedHours / task.durationHours) * 100))

    loggedHoursAll += taskLoggedHours

    if (!firstIncompleteFound && progress < 100) {
      currentWeek = task.week
      firstIncompleteFound = true
    }

    if (categoryStats[task.category]) {
      categoryStats[task.category].estimated += task.durationHours
      categoryStats[task.category].logged += taskLoggedHours
    }

    task.tech.forEach((t) => {
      if (techStats[t]) {
        techStats[t].estimated += task.durationHours
        techStats[t].logged += taskLoggedHours
      }
    })

    task.profile.forEach((p) => {
      if (profileStats[p]) {
        profileStats[p].estimated += task.durationHours
        profileStats[p].logged += taskLoggedHours
      }
    })

    return { ...task, loggedHours: taskLoggedHours, progress }
  })

  const progressGeneral = Math.min(100, Math.round((loggedHoursAll / totalEstimatedHours) * 100))
  ;[techStats, profileStats, categoryStats].forEach((stats) => {
    Object.values(stats).forEach((stat) => {
      stat.progress = stat.estimated > 0 ? Math.min(100, Math.round((stat.logged / stat.estimated) * 100)) : 0
    })
  })

  const remainingHours = totalEstimatedHours - loggedHoursAll
  const remainingWorkingDays = Math.ceil(remainingHours / HOURS_PER_WORKING_DAY)
  const completionDate = addWorkingDays(new Date(), remainingWorkingDays)

  return {
    ...data,
    tasks: updatedTasks,
    loggedHoursAll,
    progressGeneral,
    currentWeek,
    remainingWorkingDays,
    completionDate: completionDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    techStats: Object.values(techStats),
    profileStats: Object.values(profileStats),
    categoryStats: Object.values(categoryStats),
  }
}
