/**
 * KbrDetailPageSkeleton — section-to-code 骨架模式输出
 *
 * 页面结构树：
 *   Page Chrome: 面包屑 / 身份栏 / 步骤条 / 全局操作栏 / 全局面板
 *   L1 Section: 商户信息 [简单型，可折叠]
 *     L3: 基础信息 / 财务信息 / 归属信息
 *   L1 Section: 订单报告概览 [简单型]
 *     L3: KPI 汇总 / 交易明细 → 功能容器(交易数据表)
 *   L1 Section: 操作面板 [简单型]
 *     L3: 系统检测问题 / 下一步
 *
 * Token 合规：所有颜色引用 token.*，无硬编码 hex
 */
import { useState } from 'react'
import {
  Breadcrumb,
  Button,
  Col,
  Input,
  Row,
  Select,
  Space,
  Steps,
  Tag,
  Typography,
  theme,
} from 'antd'
import {
  Section,
  FieldGroup,
  FunctionalContainer,
  PageLayout,
} from './SectionLayout'

const { Title, Text } = Typography
const { useToken } = theme

// ─── Page Chrome 组件 ────────────────────────────────────────────────────────

/** 身份栏：商户名 · 结算周期 · KBR 编号 + 标签 */
const IdentityBar = () => {
  const { token } = useToken()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        padding: '9px 0',
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        background: token.colorFillQuaternary,
      }}
    >
      <Space size={8}>
        <Text strong style={{ fontSize: 15 }}>Tokyo Skytree Tours</Text>
        <Text type="secondary">·</Text>
        <Text type="secondary" style={{ fontSize: 13 }}>
          2024-11-01 00:00:00 ~ 2024-11-30 23:59:59
        </Text>
        <Text type="secondary">·</Text>
        <code style={{ fontSize: 12, color: token.colorTextSecondary }}>KBR2411088001</code>
      </Space>
      <Space size={6}>
        <Tag color="blue">Later Settlement</Tag>
        <Tag color="purple">Based on Merchant</Tag>
      </Space>
    </div>
  )
}

/** 步骤条：6 步进度 */
const StepsBar = () => {
  const { token } = useToken()
  return (
    <div
      style={{
        padding: '8px 0',
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Steps
        current={0}
        size="small"
        labelPlacement="vertical"
        items={[
          { title: 'Overview' },
          { title: 'Reconciliation' },
          { title: 'Issue Resolution' },
          { title: 'Review & Submit' },
          { title: 'Approval' },
          { title: 'Payment' },
        ]}
      />
    </div>
  )
}

/** 全局操作栏 + 可展开面板 */
const GlobalActionsBar = () => {
  const { token } = useToken()
  const [panel, setPanel] = useState<'deduction' | 'attachments' | null>(null)

  const toggle = (p: 'deduction' | 'attachments') =>
    setPanel(prev => (prev === p ? null : p))

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 0',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Text
          type="secondary"
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Global
        </Text>
        <Button size="small" onClick={() => toggle('deduction')}>
          − Deduction
        </Button>
        <Button size="small" onClick={() => toggle('attachments')}>
          📎 Attachments
        </Button>
      </div>

      {/* 全局面板 */}
      {panel && (
        <div
          style={{
            padding: '12px 0',
            background: token.colorFillQuaternary,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          {panel === 'deduction' && (
            <Space size={12} wrap>
              <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Reason</Text>
              <Select size="small" style={{ width: 200 }} placeholder="— No deduction —" options={[]} />
              <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>Amount (JPY)</Text>
              <Input size="small" style={{ width: 130 }} placeholder="0" />
            </Space>
          )}
          {panel === 'attachments' && (
            <Space size={8} wrap>
              {/* TODO: 附件列表 */}
              <Tag color="success">✓ Merchant Statement</Tag>
              <Tag color="warning">⚠ Invoice — not uploaded</Tag>
              <Button size="small" type="dashed">+ Upload file</Button>
            </Space>
          )}
        </div>
      )}
    </>
  )
}

// ─── 页面组件（骨架模式）─────────────────────────────────────────────────────

export function KbrDetailPageSkeleton() {
  return (
    <div style={{ minHeight: '100%' }}>

      {/* ════════════════════════════════════════════════════════════════
          页面 Chrome（非 L1 — 6 个步骤共享）
          ════════════════════════════════════════════════════════════ */}
      <Breadcrumb
        style={{ marginBottom: 10 }}
        items={[{ title: <span style={{ fontSize: 13 }}>← KBR List</span> }]}
      />
      <IdentityBar />
      <StepsBar />
      <GlobalActionsBar />

      {/* ════════════════════════════════════════════════════════════════
          L1 Sections（gap: 32px）
          ════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 24 }}>
        <PageLayout>

          {/* ── L1 Section: Merchant Info ────────────────────────────── */}
          <Section title="Merchant Info" collapsible defaultCollapsed>

            <FieldGroup title="Basic Info">
              {/* TODO: Row gutter={[16,16]}
                  Col: Merchant ID (code JP-00341)
                  Col: Merchant Name (Tokyo Skytree Tours)
                  Col: Payment Info Status (⚠ Unverified)
                  Col: Settlement Rule (Tag: Later Settlement + Based on Merchant)
              */}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>{/* TODO: Merchant ID */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Merchant Name */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Payment Info Status */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Settlement Rule */}</Col>
              </Row>
            </FieldGroup>

            <FieldGroup title="Financial Info">
              {/* TODO:
                  Col: Settlement Currency (JPY)
                  Col: Payment Currency (JPY)
                  Col span=12: Settlement Period (2024-11-01 ~ 2024-11-30)
              */}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>{/* TODO: Settlement Currency */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Payment Currency */}</Col>
                <Col xs={24} md={12}>{/* TODO: Settlement Period */}</Col>
              </Row>
            </FieldGroup>

            <FieldGroup title="Assignment Info">
              {/* TODO:
                  Col: Contracting Subsidiary (Klook Asia Pacific Limited)
                  Col: Assignee AP (Hannah Ji)
                  Col: Payment Due Date (2025-03-20, red)
                  Col: Additional Notes (—)
              */}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>{/* TODO: Contracting Subsidiary */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Assignee (AP) */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Payment Due Date */}</Col>
                <Col xs={24} sm={12} md={6}>{/* TODO: Additional Notes */}</Col>
              </Row>
            </FieldGroup>

          </Section>

          {/* ── L1 Section: Booking Report Overview ───────────────────── */}
          <Section title="Booking Report Overview" collapsible={false}>

            <FieldGroup title="KPI Summary">
              {/* TODO: 4 stat cards in a row
                  - Total Transactions: 156 / 128 bookings
                  - KBR Amount: ¥234,500 (Gross settlement amount)
                  - Settlement Period: Nov 01 – Nov 30
                  - Reconciliation Status: Not Started (no statement uploaded)
              */}
              <Row gutter={[14, 14]}>
                <Col xs={24} sm={12} lg={6}>{/* TODO: Total Transactions Statistic */}</Col>
                <Col xs={24} sm={12} lg={6}>{/* TODO: KBR Amount Statistic */}</Col>
                <Col xs={24} sm={12} lg={6}>{/* TODO: Settlement Period */}</Col>
                <Col xs={24} sm={12} lg={6}>{/* TODO: Reconciliation Status */}</Col>
              </Row>
            </FieldGroup>

            <FieldGroup title="Transaction Details">
              {/* TODO: Toolbar
                  - Button: Export KBR Details (Excel)
                  - Button: Send to Merchant
                  - Input: Search by Booking No.
                  - Select: All Types (Fulfillment / Return / Compensation)
              */}
              <Space style={{ marginBottom: 10 }} wrap>
                {/* TODO: toolbar buttons & filters */}
              </Space>

              <FunctionalContainer>
                {/* TODO: Transaction Table
                    - 28 columns, scroll={{ x: 3400 }}
                    - Row colors: Fulfillment=green, Return=red, Compensation=blue
                    - Pagination: pageSize=6
                    - Footer: "Reconciliation will compare against merchant statement
                      at Booking No. level (transactions aggregated per booking)."
                */}
              </FunctionalContainer>
            </FieldGroup>

          </Section>

          {/* ── L1 Section: Action Panel ──────────────────────────────── */}
          <Section title="Action Panel" collapsible={false}>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <FieldGroup title="System-Detected Issues">
                  {/* TODO: Warning card
                      - ⚠ Merchant Payment Info Unverified
                      - Description + "Send Reminder to BD →" link
                      - Footer note: "No direct AP action needed at this stage"
                  */}
                </FieldGroup>
              </Col>

              <Col xs={24} lg={12}>
                <FieldGroup title="Next Step">
                  {/* TODO:
                      - Title: Start Reconciliation
                      - Description text
                      - Primary Button: Proceed to Reconciliation →
                      - Divider
                      - Link Button: Record proactive adjustment in Step 3 →
                  */}
                </FieldGroup>
              </Col>
            </Row>

          </Section>

        </PageLayout>
      </div>
    </div>
  )
}
