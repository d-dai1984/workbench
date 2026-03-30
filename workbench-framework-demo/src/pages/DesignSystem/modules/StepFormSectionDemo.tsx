import { useState } from 'react'
import { Button, Input, Select, Tag, Badge } from 'antd'
import { PlusOutlined, SendOutlined, NodeIndexOutlined, CalendarOutlined } from '@ant-design/icons'
import { CodePreview } from '../CodePreview'
import './StepFormSectionDemo.css'

type TaskType = 'blast' | 'journey' | null

function StepFormSection() {
  const [taskType, setTaskType] = useState<TaskType>('blast')

  return (
    <div className="sf-container">
      {/* Section Header */}
      <div className="sf-header">
        <div className="sf-header-left">
          <Badge count={2} className="sf-step-badge" />
          <span className="sf-section-title">Plans</span>
          <span className="sf-section-count">1 plan</span>
        </div>
        <Button size="small" icon={<PlusOutlined />}>Add Plan</Button>
      </div>

      {/* Plan Card */}
      <div className="sf-plan-card">
        <div className="sf-plan-card-header">
          <CalendarOutlined className="sf-plan-icon" />
          <span className="sf-plan-name">Plan 1</span>
          <Tag className="sf-plan-tag">Default</Tag>
        </div>
        <div className="sf-plan-card-body">
          {/* Plan Name */}
          <div className="sf-form-field">
            <label className="sf-label">Plan Name <span className="sf-required">*</span></label>
            <Input placeholder="e.g., Pre-heating Phase" size="large" />
          </div>

          {/* Core Process Metric */}
          <div className="sf-form-field">
            <label className="sf-label">Core Process Metric <span className="sf-required">*</span></label>
            <p className="sf-help">The key operational metric to track for this plan</p>
            <Select placeholder="Select a metric..." size="large" style={{ width: '100%' }} options={[
              { value: 'open_rate', label: 'Open Rate' },
              { value: 'click_rate', label: 'Click Rate' },
              { value: 'conversion', label: 'Conversion Rate' },
            ]} />
          </div>

          {/* Task Type */}
          <div className="sf-form-field">
            <label className="sf-label">Task Type <span className="sf-required">*</span></label>
            <p className="sf-help">Determines the type of all tasks under this plan</p>
            <div className="sf-radio-cards">
              <div
                className={`sf-radio-card ${taskType === 'blast' ? 'sf-radio-card--selected' : ''}`}
                onClick={() => setTaskType('blast')}
              >
                <SendOutlined className="sf-radio-card-icon" />
                <div className="sf-radio-card-text">
                  <strong>Blast</strong>
                  <span>One-time message sends to a segment</span>
                </div>
              </div>
              <div
                className={`sf-radio-card ${taskType === 'journey' ? 'sf-radio-card--selected' : ''}`}
                onClick={() => setTaskType('journey')}
              >
                <NodeIndexOutlined className="sf-radio-card-icon" />
                <div className="sf-radio-card-text">
                  <strong>Journey</strong>
                  <span>Automated multi-step flow triggered by events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add more */}
      <div className="sf-add-more">
        <PlusOutlined /> Add another plan
      </div>
    </div>
  )
}

const codeString = `import { Button, Input, Select, Tag, Badge } from 'antd'
import { PlusOutlined, SendOutlined, NodeIndexOutlined } from '@ant-design/icons'

const [taskType, setTaskType] = useState('blast')

<div className="sf-container">
  {/* Section Header: step badge + title + count + Add button */}
  <div className="sf-header">
    <div>
      <Badge count={2} />
      <span>Plans</span>
      <span className="count">1 plan</span>
    </div>
    <Button size="small" icon={<PlusOutlined />}>Add Plan</Button>
  </div>

  {/* Plan Card with left orange accent border */}
  <div className="sf-plan-card">
    <div className="sf-plan-card-header">
      <CalendarOutlined />
      <span>Plan 1</span>
      <Tag>Default</Tag>
    </div>
    <div className="sf-plan-card-body">
      {/* Text field */}
      <div className="sf-form-field">
        <label>Plan Name <span className="required">*</span></label>
        <Input placeholder="e.g., Pre-heating Phase" size="large" />
      </div>

      {/* Select field with help text */}
      <div className="sf-form-field">
        <label>Core Process Metric <span className="required">*</span></label>
        <p className="help">The key operational metric to track</p>
        <Select placeholder="Select a metric..." style={{ width: '100%' }} />
      </div>

      {/* Radio Card: icon + title + description, 2-column */}
      <div className="sf-form-field">
        <label>Task Type <span className="required">*</span></label>
        <div className="sf-radio-cards">
          <div
            className={\`sf-radio-card \${taskType === 'blast' ? 'selected' : ''}\`}
            onClick={() => setTaskType('blast')}
          >
            <SendOutlined className="icon" />
            <strong>Blast</strong>
            <span>One-time message sends to a segment</span>
          </div>
          <div
            className={\`sf-radio-card \${taskType === 'journey' ? 'selected' : ''}\`}
            onClick={() => setTaskType('journey')}
          >
            <NodeIndexOutlined className="icon" />
            <strong>Journey</strong>
            <span>Automated multi-step flow triggered by events</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Dashed add button */}
  <div className="sf-add-more">
    <PlusOutlined /> Add another plan
  </div>
</div>`

export function StepFormSectionDemo() {
  return (
    <CodePreview
      title="StepFormSection 分步表单"
      description="编号区块头 · 可折叠计划卡片 · 表单字段 · Radio Card 双列 · 虚线添加按钮"
      code={codeString}
    >
      <StepFormSection />
    </CodePreview>
  )
}
