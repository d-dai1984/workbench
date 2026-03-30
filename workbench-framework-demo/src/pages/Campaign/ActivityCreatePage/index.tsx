import { Steps, Form, Button, Breadcrumb, message, Alert } from 'antd'
import { useState } from 'react'
import { useActivityForm } from './hooks/useActivityForm'
import { Step1BasicInfo } from './steps/Step1BasicInfo'
import { Step2TargetRules } from './steps/Step2TargetRules'
import { Step3Products } from './steps/Step3Products'
import { Step4Review } from './steps/Step4Review'
import '../ActivityCreatePage.css'

const STEP_ITEMS = [
  { title: 'Basic Info' },
  { title: 'Target & Rules' },
  { title: 'Products' },
  { title: 'Review & Submit' },
]

export function ActivityCreatePage() {
  const { form, currentStep, stepsCompleted, submitting, setSubmitting, goNext, goPrev, goToStep } =
    useActivityForm()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const values = form.getFieldsValue(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Activity created:', values)
      message.success('Activity created successfully')
    } catch {
      setSubmitError('Failed to create activity. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const stepContent = [
    <Step1BasicInfo key="step1" form={form} />,
    <Step2TargetRules key="step2" form={form} />,
    <Step3Products key="step3" form={form} />,
    <Step4Review key="step4" form={form} />,
  ]

  return (
    <div className="activity-create">
      {/* Page Header */}
      <div className="activity-create__header">
        <Breadcrumb
          items={[
            { title: 'Campaign' },
            { title: 'Activity' },
            { title: 'Create Activity' },
          ]}
        />
        <h1 className="activity-create__title">Create Activity</h1>
      </div>

      {/* Steps Progress */}
      <Steps
        current={currentStep}
        items={STEP_ITEMS}
        onChange={goToStep}
        className="activity-create__steps"
      />

      {/* Form Content */}
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        initialValues={{
          applicableScope: 'all_products',
          selectedProductIds: [],
        }}
      >
        <div className="activity-create__content">
          {submitError && (
            <Alert
              type="error"
              message={submitError}
              closable
              onClose={() => setSubmitError(null)}
              style={{ marginBottom: 16 }}
            />
          )}
          {stepContent[currentStep]}
        </div>
      </Form>

      {/* Fixed Bottom Action Bar */}
      <div className="activity-create__footer">
        <div className="activity-create__footer-inner">
          {currentStep > 0 && (
            <Button onClick={goPrev} disabled={submitting}>
              Previous
            </Button>
          )}
          <div style={{ flex: 1 }} />
          {currentStep < 3 ? (
            <Button type="primary" onClick={goNext}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleSubmit} loading={submitting}>
              Submit Activity
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
