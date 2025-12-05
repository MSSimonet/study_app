"use client"

import { useState, useEffect, useCallback } from "react"
import type { StudyPathData } from "@/lib/types"
import { generateStudyPlan, recalculateProgress } from "@/lib/study-plan"
import { LOCAL_STORAGE_KEY } from "@/lib/constants"

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
          const mergedPath = {
            ...initialPlan,
            loggedHours: parsed.loggedHours || {},
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
    (newLoggedHours: Record<string, number>) => {
      if (!pathData) return

      const dataToSave: StudyPathData = {
        tasks: pathData.tasks,
        totalEstimatedHours: pathData.totalEstimatedHours,
        totalEstimatedWorkingDays: pathData.totalEstimatedWorkingDays,
        loggedHours: newLoggedHours,
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
      setPathData(recalculateProgress({ ...pathData, loggedHours: newLoggedHours }))
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

      saveData(newLoggedHours)
    },
    [pathData, saveData],
  )

  return {
    pathData,
    isLoading,
    logHours,
  }
}
