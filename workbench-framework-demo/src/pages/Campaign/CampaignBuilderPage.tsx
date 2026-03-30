import {
  Form, Input, Select, Radio, Checkbox, DatePicker, Switch,
  InputNumber, Button, Card, Breadcrumb, Space, Alert, Result,
  Modal, Typography, Row, Col, Divider,
} from 'antd'
import {
  FileTextOutlined, DesktopOutlined, AimOutlined,
  ArrowRightOutlined, ExclamationCircleFilled, LinkOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import './CampaignBuilderPage.css'

const { TextArea } = Input
const { RangePicker } = DatePicker
const { Text, Title } = Typography

// ─── Static data ─────────────────────────────────────────────────────────────

const TERMINAL_OPTIONS = [
  { label: 'Mobile App (iOS/Android)', value: 'mobile_app' },
  { label: 'Desktop Web', value: 'desktop_web' },
  { label: 'Mobile Web', value: 'mobile_web' },
  { label: 'External Partners', value: 'external' },
]

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD – United States Dollar' },
  { value: 'SGD', label: 'SGD – Singapore Dollar' },
  { value: 'HKD', label: 'HKD – Hong Kong Dollar' },
  { value: 'TWD', label: 'TWD – Taiwan Dollar' },
  { value: 'MYR', label: 'MYR – Malaysian Ringgit' },
  { value: 'JPY', label: 'JPY – Japanese Yen' },
  { value: 'KRW', label: 'KRW – Korean Won' },
]

const POC_OPTIONS = [
  { value: 'jasmine.xie', label: 'Jasmine Xie', email: 'jasmine.xie@klook.com' },
  { value: 'kevin.tan', label: 'Kevin Tan', email: 'kevin.tan@klook.com' },
  { value: 'sarah.lim', label: 'Sarah Lim', email: 'sarah.lim@klook.com' },
  { value: 'michael.chen', label: 'Michael Chen', email: 'michael.chen@klook.com' },
]

const CAMPAIGN_OPTIONS = [
  { value: 'CMP-2025-001', label: 'CMP-2025-001 · 双十一全球大促' },
  { value: 'CMP-2025-002', label: 'CMP-2025-002 · 东南亚夏日季' },
  { value: 'CMP-2025-003', label: 'CMP-2025-003 · 新加坡国庆专场' },
]

const GOAL_METRICS = [
  { name: 'revenue', label: 'Target Revenue' },
  { name: 'booking', label: 'Target Bookings' },
  { name: 'sessions', label: 'Target Sessions' },
  { name: 'newUsers', label: 'New Users Target' },
] as const

// ─── Component ────────────────────────────────────────────────────────────────

type ViewState = 'form' | 'success'

export function CampaignBuilderPage() {
  const [form] = Form.useForm()
  const [view, setView] = useState<ViewState>('form')
  const [conflictVisible, setConflictVisible] = useState(false)
  const [pageIdStatus, setPageIdStatus] = useState<'success' | 'error' | null>(null)

  // Reactive watch — keeps conditional rendering in sync with form state
  const featureCard = Form.useWatch('featureCard', form) ?? true

  const handleReset = () => {
    form.resetFields()
    setPageIdStatus(null)
    setView('form')
  }

  const verifyPageId = () => {
    const id = form.getFieldValue('pageId') as string | undefined
    if (!id) { setPageIdStatus('error'); return }
    setPageIdStatus(/^PID_[A-Z0-9_]+$/.test(id) ? 'success' : 'error')
  }

  const handleFinish = (values: Record<string, unknown>) => {
    if (values.level === 'S') {
      setConflictVisible(true)
      return
    }
    setView('success')
  }

  const handleSaveDraft = async () => {
    try {
      await form.validateFields(['name', 'terminals', 'poc', 'level'])
      setView('success')
    } catch {
      // inline errors shown by Form
    }
  }

  // ── Success view ────────────────────────────────────────────────────────────
  if (view === 'success') {
    return (
      <div className="cpb-page">
        <Result
          status="success"
          title="Campaign submitted for approval"
          subTitle={`Campaign ID: CMP-2025-${Math.floor(Math.random() * 900) + 100}`}
          extra={<Button onClick={handleReset}>Create Another</Button>}
        />
      </div>
    )
  }

  // ── Form view ───────────────────────────────────────────────────────────────
  return (
    <div className="cpb-page">
      {/* Breadcrumb */}
      <div className="cpb-breadcrumb">
        <Breadcrumb
          items={[
            { title: 'Promo System' },
            { title: 'Campaign Management' },
            { title: 'Create Campaign' },
          ]}
        />
      </div>

      <div className="cpb-body">
        {/* Page heading */}
        <div className="cpb-heading">
          <Title level={4} style={{ margin: 0 }}>Create New Campaign</Title>
          <Text type="secondary">Configure your marketing initiative parameters and performance targets.</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ currency: 'USD', featureCard: true }}
          onFinish={handleFinish}
          scrollToFirstError
          onValuesChange={(changed) => {
            if ('featureCard' in changed && !changed.featureCard) {
              form.setFieldValue('pageId', '')
              setPageIdStatus(null)
            }
          }}
        >
          <Row gutter={14} align="top" wrap={false}>

            {/* ── LEFT: Main fields ─────────────────────────────────────────── */}
            <Col flex="1 1 0" style={{ minWidth: 0 }}>
              <Space orientation="vertical" size={12} style={{ width: '100%' }}>

                {/* Campaign Overview */}
                <Card
                  size="small"
                  title={<Space size={6}><FileTextOutlined />Campaign Overview</Space>}
                  styles={{ header: {} }}
                >
                  <Row gutter={[14, 0]}>
                    <Col span={24}>
                      <Form.Item
                        name="name"
                        label="Campaign Name"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <Input placeholder="e.g., Q4 Global Summer Extravaganza" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="level"
                        label="Campaign Level"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <Radio.Group optionType="button" buttonStyle="solid">
                          <Radio.Button value="S">S</Radio.Button>
                          <Radio.Button value="A">A</Radio.Button>
                          <Radio.Button value="B">B</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="parentId" label="Parent Campaign ID">
                        <Select
                          options={CAMPAIGN_OPTIONS}
                          placeholder="Select Parent Campaign..."
                          allowClear
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="poc"
                        label="Campaign POC"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <Select
                          mode="multiple"
                          showSearch
                          placeholder="Owner email or name"
                          filterOption={(input, option) => {
                            const poc = POC_OPTIONS.find(p => p.value === option?.value)
                            return poc
                              ? poc.label.toLowerCase().includes(input.toLowerCase()) ||
                                poc.email.toLowerCase().includes(input.toLowerCase())
                              : false
                          }}
                          options={POC_OPTIONS.map(p => ({ value: p.value, label: p.label, email: p.email }))}
                          optionRender={(opt) => (
                            <Space orientation="vertical" size={0}>
                              <Text style={{ fontSize: 13, fontWeight: 500 }}>{opt.data.label}</Text>
                              <Text type="secondary" style={{ fontSize: 11 }}>{opt.data.email}</Text>
                            </Space>
                          )}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <Radio.Group>
                          <Radio value="mega">Mega</Radio>
                          <Radio value="local">Local</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name="terminals"
                        label="Target Channels & Destinations"
                        rules={[{ required: true, message: 'Select at least one' }]}
                      >
                        <Checkbox.Group options={TERMINAL_OPTIONS} />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name="duration"
                        label="Campaign Duration"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <RangePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                {/* Display Configuration */}
                <Card
                  size="small"
                  title={<Space size={6}><DesktopOutlined />Display Configuration</Space>}
                  styles={{ header: {} }}
                >
                  <Row align="middle" justify="space-between" style={{ marginBottom: featureCard ? 12 : 0 }}>
                    <Col>
                      <Text strong style={{ fontSize: 13 }}>Campaign Feature Card</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>Enable prominent placement in app discovery feed</Text>
                    </Col>
                    <Col>
                      <Form.Item name="featureCard" valuePropName="checked" noStyle>
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>

                  {featureCard && (
                    <>
                      <Form.Item
                        name="pageId"
                        label="Campaign Page ID Mapping"
                        validateStatus={
                          pageIdStatus === 'error' ? 'error' :
                          pageIdStatus === 'success' ? 'success' : ''
                        }
                        help={
                          pageIdStatus === 'success' ? 'ID format is valid' :
                          pageIdStatus === 'error' ? 'Invalid format. Expected: PID_XXXXX_XXXX' :
                          undefined
                        }
                        rules={[{ required: true, message: 'Required when Feature Card is on' }]}
                      >
                        <Space.Compact style={{ width: '100%' }}>
                          <Input
                            placeholder="PID_XXXXX_2B24"
                            style={{ fontFamily: 'monospace' }}
                            onChange={() => setPageIdStatus(null)}
                          />
                          <Button onClick={verifyPageId}>Verify ID</Button>
                        </Space.Compact>
                      </Form.Item>
                      <Button
                        type="link"
                        size="small"
                        icon={<LinkOutlined />}
                        style={{ paddingLeft: 0 }}
                      >
                        Preview Landing Page Layout
                      </Button>
                    </>
                  )}
                </Card>
              </Space>
            </Col>

            {/* ── RIGHT: Goals panel ────────────────────────────────────────── */}
            <Col flex="0 0 300px">
              <div className="cpb-goals-sticky">
                <Card
                  size="small"
                  title={<Space size={6}><AimOutlined />Campaign Goals</Space>}
                  styles={{ header: {} }}
                >
                  <Form.Item name="currency" label="Currency">
                    <Select options={CURRENCY_OPTIONS} />
                  </Form.Item>

                  <Form.Item
                    label="Revenue Share"
                    help={
                      (() => {
                        const k = form.getFieldValue('klookPct') as number | undefined
                        const p = form.getFieldValue('partnerPct') as number | undefined
                        if (k && p) {
                          const sum = Number(k) + Number(p)
                          return sum === 100
                            ? <Text type="success" style={{ fontSize: 11 }}>Sum: 100% ✓</Text>
                            : <Text type="warning" style={{ fontSize: 11 }}>Sum: {sum}% — must equal 100%</Text>
                        }
                        return null
                      })()
                    }
                  >
                    <Row gutter={8}>
                      <Col span={12}>
                        <Form.Item
                          name="klookPct"
                          noStyle
                          rules={[
                            { required: true, message: '' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const partner = getFieldValue('partnerPct') as number | undefined
                                if (value && partner && Number(value) + Number(partner) !== 100) {
                                  return Promise.reject()
                                }
                                return Promise.resolve()
                              },
                            }),
                          ]}
                        >
                          <Space.Compact style={{ width: '100%' }}>
                            <Button style={{ pointerEvents: 'none' }}>K</Button>
                            <InputNumber style={{ width: '100%' }} placeholder="Klook" min={0} max={100} />
                          </Space.Compact>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="partnerPct" noStyle rules={[{ required: true, message: '' }]}>
                          <Space.Compact style={{ width: '100%' }}>
                            <Button style={{ pointerEvents: 'none' }}>P</Button>
                            <InputNumber style={{ width: '100%' }} placeholder="Partner" min={0} max={100} />
                          </Space.Compact>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>

                  <Divider style={{ margin: '4px 0 8px' }} />

                  {GOAL_METRICS.map(({ name, label }) => (
                    <Form.Item
                      key={name}
                      name={name}
                      label={label}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <InputNumber style={{ width: '100%' }} placeholder="0" min={0} />
                    </Form.Item>
                  ))}

                  <Form.Item name="brandNotes" label="Brand Awareness Notes">
                    <TextArea
                      rows={3}
                      placeholder="Describe the qualitative brand impact goals..."
                    />
                  </Form.Item>
                </Card>
              </div>
            </Col>
          </Row>

          {/* ── Footer actions ────────────────────────────────────────────── */}
          <div className="cpb-footer">
            <Button type="link" onClick={() => form.resetFields()} style={{ paddingLeft: 0 }}>
              Cancel changes
            </Button>
            <Space>
              <Button onClick={handleSaveDraft}>Save as Draft</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
              >
                Submit Campaign for Approval
              </Button>
            </Space>
          </div>
        </Form>
      </div>

      {/* ── S-Level Conflict Modal ─────────────────────────────────────────── */}
      <Modal
        open={conflictVisible}
        onCancel={() => setConflictVisible(false)}
        footer={null}
        width={420}
        title={
          <Space>
            <ExclamationCircleFilled style={{ color: '#D85A30' }} />
            S-Level Campaign Conflict
          </Space>
        }
      >
        <Space orientation="vertical" style={{ width: '100%' }} size={12}>
          <Text type="secondary">
            This campaign overlaps with an existing S-level campaign:
          </Text>
          <Alert
            type="warning"
            message="Conflicting Campaign"
            description={
              <Space orientation="vertical" size={2}>
                <Text>CMP-2025-001 · 双十一全球大促</Text>
                <Text type="secondary" style={{ fontSize: 11 }}>2025/11/01 – 2025/11/15</Text>
              </Space>
            }
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Concurrent S-level campaigns may cause traffic dilution. You can ignore and continue, or go back to adjust.
          </Text>
          <Row gutter={8} style={{ marginTop: 4 }}>
            <Col span={12}>
              <Button block onClick={() => setConflictVisible(false)}>Go Back</Button>
            </Col>
            <Col span={12}>
              <Button
                block
                danger
                onClick={() => { setConflictVisible(false); setView('success') }}
              >
                Ignore & Save
              </Button>
            </Col>
          </Row>
        </Space>
      </Modal>
    </div>
  )
}
