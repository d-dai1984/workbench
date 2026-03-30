import { useState, useCallback } from 'react'
import { Form } from 'antd'
import type { ActivityFormValues } from '../types'

export function useActivityForm() {
  const [form] = Form.useForm<ActivityFormValues>()
  const [currentStep, setCurrentStep] = useState(0)
  const [stepsCompleted, setStepsCompleted] = useState<boolean[]>([false, false, false, false])
  const [submitting, setSubmitting] = useState(false)

  const totalSteps = 4

  const goNext = useCallback(async () => {
    try {
      // Validate current step fields before proceeding
      const stepFieldsMap: Record<number, string[]> = {
        0: ['activityName', 'activityType', 'dateRange'],
        1: ['discountType', 'discountValue', 'applicableScope'],
        2: ['selectedProductIds'],
      }
      const fields = stepFieldsMap[currentStep]
      if (fields) {
        await form.validateFields(fields)
      }
      setStepsCompleted((prev) => {
        const next = [...prev]
        next[currentStep] = true
        return next
      })
      setCurrentStep((s) => Math.min(s + 1, totalSteps - 1))
    } catch {
      // validation failed, stay on current step
    }
  }, [currentStep, form])

  const goPrev = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0))
  }, [])

  const goToStep = useCallback((step: number) => {
    // Only allow jumping to completed steps
    if (stepsCompleted[step] || step < currentStep) {
      setCurrentStep(step)
    }
  }, [stepsCompleted, currentStep])

  return {
    form,
    currentStep,
    stepsCompleted,
    submitting,
    setSubmitting,
    totalSteps,
    goNext,
    goPrev,
    goToStep,
  }
}
