"use client"

import { useState, useEffect, useCallback } from "react"
import type { StudyPathData } from "@/lib/types"
import { generateStudyPlan, recalculateProgress } from "@/lib/study-plan"
import { LOCAL_STORAGE_KEY, PLAN_VERSION } from "@/lib/constants"
import { dateKey } from "@/lib/date-utils"

export function useStudyPath() {
  const [pathData, setPathData] = useState<StudyPathData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      const initialPlan = generateStudyPlan()
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)

      if (savedData) {
        try {
          const parsed = JSON.parse(savedData) as StudyPathData
          // Los ids de tarea (semana-posición) cambian con cada plan: las horas de otro plan no se reutilizan,
          // se guardan aparte y el registro diario (por fecha) se conserva para la racha
          const samePlan = parsed.planVersion === PLAN_VERSION
          if (!samePlan && Object.keys(parsed.loggedHours || {}).length > 0) {
            const backupKey = `${LOCAL_STORAGE_KEY}.plan-v${parsed.planVersion ?? 1}`
            if (!localStorage.getItem(backupKey)) localStorage.setItem(backupKey, savedData)
          }
          const mergedPath = {
            ...initialPlan,
            loggedHours: samePlan ? parsed.loggedHours || {} : {},
            dailyHours: parsed.dailyHours || {},
          }
          setPathData(recalculateProgress(mergedPath))
        } catch (error) {
          console.error("Error parsing localStorage:", error)
          setPathData(recalculateProgress(initialPlan))
        }
      } else {
        setPathData(recalculateProgress(initialPlan))
      }

      setIsLoading(false)
    }

    loadData()
  }, [])

  const saveData = useCallback(
    (newLoggedHours: Record<string, number>, newDailyHours: Record<string, number>) => {
      if (!pathData) return

      const dataToSave: StudyPathData = {
        tasks: pathData.tasks,
        planVersion: PLAN_VERSION,
        totalEstimatedHours: pathData.totalEstimatedHours,
        totalEstimatedWorkingDays: pathData.totalEstimatedWorkingDays,
        loggedHours: newLoggedHours,
        dailyHours: newDailyHours,
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
      setPathData(recalculateProgress({ ...pathData, loggedHours: newLoggedHours, dailyHours: newDailyHours }))
    },
    [pathData],
  )

  const logHours = useCallback(
    (taskId: string, hoursChange: number) => {
      if (!pathData) return

      const currentHours = pathData.loggedHours[taskId] || 0
      let newHours = currentHours + hoursChange

      if (newHours < 0) newHours = 0

      const task = pathData.tasks.find((t) => t.id === taskId)
      if (task && newHours > task.durationHours) {
        newHours = task.durationHours
      }

      const newLoggedHours = { ...pathData.loggedHours }

      if (newHours === 0) {
        delete newLoggedHours[taskId]
      } else {
        newLoggedHours[taskId] = newHours
      }

      // Registro diario (para "Hoy", racha y gráfico semanal): solo lo realmente aplicado
      const applied = newHours - currentHours
      const today = dateKey()
      const newDailyHours = { ...(pathData.dailyHours || {}) }
      const todayTotal = Math.max(0, Math.round(((newDailyHours[today] || 0) + applied) * 10) / 10)
      if (todayTotal === 0) delete newDailyHours[today]
      else newDailyHours[today] = todayTotal

      saveData(newLoggedHours, newDailyHours)
    },
    [pathData, saveData],
  )

  return {
    pathData,
    isLoading,
    logHours,
  }
}
