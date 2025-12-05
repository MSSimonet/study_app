"use client"

import { useState } from "react"
import { useStudyPath } from "@/hooks/use-study-path"
import { DashboardView } from "@/components/dashboard-view"
import { StudyPathView } from "@/components/study-path-view"

export default function Home() {
  const { pathData, isLoading, logHours } = useStudyPath()
  const [view, setView] = useState<"dashboard" | "study">("dashboard")

  if (isLoading || !pathData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-xl animate-pulse">Cargando Plan de Estudio...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-400">Plan de Estudios</h1>
          <nav className="flex space-x-2">
            <button
              onClick={() => setView("dashboard")}
              className={`px-3 py-2 sm:px-4 rounded-lg font-semibold text-sm transition duration-200 ${
                view === "dashboard"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setView("study")}
              className={`px-3 py-2 sm:px-4 rounded-lg font-semibold text-sm transition duration-200 ${
                view === "study"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              Ruta
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {view === "dashboard" ? (
          <DashboardView pathData={pathData} />
        ) : (
          <StudyPathView pathData={pathData} onLogHours={logHours} />
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-700 mt-10 p-4 text-center">
        <p className="text-xs text-slate-500 font-mono">
          MODO LOCAL: Los datos se guardan en el Navegador (LocalStorage).
        </p>
      </footer>
    </div>
  )
}
