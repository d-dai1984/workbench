import { useState } from 'react'
import {
  Card, Segmented, Typography, Tag, Skeleton, Breadcrumb,
  Steps, Descriptions, Timeline, Pagination, Divider,
  Row, Col, Space, Button,
} from 'antd'
import {
  SearchOutlined, FilterOutlined, PlusOutlined,
  EditOutlined, DeleteOutlined, ExportOutlined,
  CheckOutlined, CloseOutlined,
} from '@ant-design/icons'
import './PagePatternsDemo.css'

const { Text, Title } = Typography

/* ─── Reusable skeleton primitives ─── */

function Block({ w = '100%', h = 14, r = 6, color }: { w?: string | number; h?: number; r?: number; color?: string }) {
  return <div className="pp-block" style={{ width: w, height: h, borderRadius: r, background: color }} />
}

function InputSkeleton({ width = '100%' }: { width?: string | number }) {
  return <div className="pp-input" style={{ width }} />
}

function ButtonSkeleton({ text, type = 'default' }: { text: string; type?: 'default' | 'primary' | 'danger' }) {
  const cls = type === 'primary' ? 'pp-btn--primary' : type === 'danger' ? 'pp-btn--danger' : ''
  return <div className={`pp-btn ${cls}`}>{text}</div>
}

/* ─── Annotation label ─── */
function Annotation({ children }: { children: React.ReactNode }) {
  return <div className="pp-annotation">{children}</div>
}

/* ─── 1. Dashboard ─── */
function DashboardPattern() {
  return (
    <div className="pp-page">
      {/* Page Header */}
      <div>
        <Title level={4} style={{ margin: 0 }}>My Bench</Title>
        <Text type="secondary">Welcome back, here's your overview</Text>
      </div>

      {/* Stat Cards */}
      <Annotation>Statistics Cards (4-column grid, max 4 per row)</Annotation>
      <Row gutter={16}>
        {['Total Revenue', 'Active Campaigns', 'Pending Orders', 'New Merchants'].map((label) => (
          <Col span={6} key={label}>
            <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 24 } }}>
              <Text type="secondary" style={{ fontSize: 12 }}>{label}</Text>
              <div style={{ marginTop: 8 }}>
                <Block w={100} h={28} r={6} />
              </div>
              <div style={{ marginTop: 12 }}>
                <Block w={60} h={10} color="rgba(0,0,0,0.04)" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Chart + Task List */}
      <Annotation>Main content area (chart + side panel)</Annotation>
      <Row gutter={16}>
        <Col span={16}>
          <Card style={{ borderRadius: 16, minHeight: 280 }} styles={{ body: { padding: 24 } }}>
            <Text strong>Revenue Trend</Text>
            <div className="pp-chart-area">
              {[40, 55, 35, 70, 50, 65, 80, 60, 75, 45, 55, 68].map((h, i) => (
                <div key={i} className="pp-chart-bar-real" style={{ height: `${h}%` }} />
              ))}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ borderRadius: 16, minHeight: 280 }} styles={{ body: { padding: 24 } }}>
            <Text strong>Task List</Text>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="pp-task-row">
                  <Block w={16} h={16} r={4} color="rgba(0,0,0,0.04)" />
                  <Block w="60%" h={12} />
                  <div style={{ marginLeft: 'auto' }}><Block w={40} h={10} color="rgba(0,0,0,0.04)" /></div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Access */}
      <Annotation>Quick Access entries (max 6)</Annotation>
      <Row gutter={16}>
        {['Create Campaign', 'Product List', 'Settlement', 'Merchant Audit', 'Export Report', 'System Config'].map((label) => (
          <Col span={4} key={label}>
            <Card
              style={{ borderRadius: 16, background: 'var(--pp-accent-bg, #E6F4FF)' }}
              styles={{ body: { padding: 16, textAlign: 'center' } }}
            >
              <Block w={32} h={32} r={8} color="rgba(22,119,255,0.15)" />
              <Text style={{ fontSize: 12, marginTop: 8, display: 'block' }}>{label}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

/* ─── 2. List Page (Standard Table) ─── */
function ListTablePattern() {
  const columns = ['ID', 'Name', 'Category', 'Status', 'Updated', 'Actions']
  return (
    <div className="pp-page">
      {/* Page Header */}
      <div className="pp-page-header">
        <div>
          <Title level={4} style={{ margin: 0 }}>Campaign List</Title>
          <Text type="secondary">Manage all campaigns in this workspace</Text>
        </div>
        <ButtonSkeleton text="+ Create Campaign" type="primary" />
      </div>

      {/* Filter area */}
      <Annotation>Filter bar: Search + Advanced Filters (collapsed)</Annotation>
      <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 16 } }}>
        <div className="pp-filter-bar">
          <div className="pp-search-box">
            <SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />
            <Text type="secondary" style={{ fontSize: 13 }}>Search campaigns...</Text>
          </div>
          <div className="pp-btn">
            <FilterOutlined style={{ fontSize: 12, marginRight: 4 }} />Advanced Filters
          </div>
        </div>
      </Card>

      {/* Data count */}
      <Text type="secondary" style={{ fontSize: 13 }}>32 items</Text>

      {/* Table */}
      <Annotation>Table: rowKey=id, action column fixed right, all actions inline</Annotation>
      <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 0 } }}>
        {/* Header */}
        <div className="pp-table-head">
          {columns.map((col) => (
            <div key={col} className={`pp-table-cell ${col === 'Actions' ? 'pp-table-cell--actions' : ''}`}>
              <Text type="secondary" strong style={{ fontSize: 12 }}>{col}</Text>
            </div>
          ))}
        </div>
        {/* Rows */}
        {[1, 2, 3, 4, 5].map((r) => (
          <div key={r} className="pp-table-data-row">
            <div className="pp-table-cell"><Block w={40} h={12} /></div>
            <div className="pp-table-cell"><Block w="70%" h={12} /></div>
            <div className="pp-table-cell"><Block w={60} h={12} /></div>
            <div className="pp-table-cell">
              <Tag color={r % 2 === 0 ? 'green' : 'blue'}>{r % 2 === 0 ? 'Active' : 'Draft'}</Tag>
            </div>
            <div className="pp-table-cell"><Block w={80} h={12} color="rgba(0,0,0,0.04)" /></div>
            <div className="pp-table-cell pp-table-cell--actions">
              <Space size={8}>
                <Button type="link" size="small" icon={<EditOutlined />}>Edit</Button>
                <Button type="link" size="small" icon={<DeleteOutlined />} danger>Delete</Button>
              </Space>
            </div>
          </div>
        ))}
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination size="small" total={32} showTotal={(t) => `${t} items`} />
        </div>
      </Card>
    </div>
  )
}

/* ─── 2b. List Page (Card List) ─── */
function ListCardPattern() {
  return (
    <div className="pp-page">
      <div className="pp-page-header">
        <div>
          <Title level={4} style={{ margin: 0 }}>Combo Products</Title>
          <Text type="secondary">Nested data with expandable sub-items</Text>
        </div>
        <ButtonSkeleton text="+ New Combo" type="primary" />
      </div>

      <Annotation>Filter bar (same as standard list)</Annotation>
      <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 16 } }}>
        <div className="pp-filter-bar">
          <div className="pp-search-box">
            <SearchOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />
            <Text type="secondary" style={{ fontSize: 13 }}>Search products...</Text>
          </div>
          <div className="pp-btn"><FilterOutlined style={{ fontSize: 12, marginRight: 4 }} />Advanced Filters</div>
        </div>
      </Card>

      <Text type="secondary" style={{ fontSize: 13 }}>12 items</Text>

      <Annotation>Card List: column header fixed, each card expandable with sub-items</Annotation>
      {/* Column header */}
      <div className="pp-cardlist-header">
        {['Product', 'Category', 'Items', 'Price', 'Status'].map((h) => (
          <Text key={h} type="secondary" strong style={{ fontSize: 12 }}>{h}</Text>
        ))}
      </div>

      {/* Cards */}
      {[
        { name: 'Tokyo Explorer Bundle', items: 3, status: 'Active' },
        { name: 'Bali Wellness Package', items: 4, status: 'Draft' },
        { name: 'Seoul Day Pass Combo', items: 2, status: 'Active' },
      ].map((item, idx) => (
        <Card key={idx} style={{ borderRadius: 16 }} styles={{ body: { padding: 16 } }}>
          <div className="pp-cardlist-row">
            <Text strong>{item.name}</Text>
            <Block w={60} h={12} />
            <Text>{item.items} items</Text>
            <Block w={50} h={12} />
            <Tag color={item.status === 'Active' ? 'green' : 'default'}>{item.status}</Tag>
          </div>
          {/* Sub-items preview */}
          <div className="pp-cardlist-children">
            {Array.from({ length: item.items }).map((_, i) => (
              <div key={i} className="pp-cardlist-child">
                <Block w={14} h={14} r={4} color="rgba(0,0,0,0.04)" />
                <Block w="50%" h={10} />
                <div style={{ marginLeft: 'auto' }}><Block w={40} h={10} color="rgba(0,0,0,0.04)" /></div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination size="small" total={12} />
      </div>
    </div>
  )
}

/* ─── 3. Detail Page ─── */
function DetailPattern() {
  return (
    <div className="pp-page">
      <Breadcrumb items={[{ title: 'Campaign' }, { title: 'Campaign List' }, { title: 'Campaign Detail' }]} />

      <Annotation>Page Header: title + status tag + action buttons (max 3, overflow to Dropdown)</Annotation>
      <div className="pp-page-header">
        <Space align="center">
          <Title level={4} style={{ margin: 0 }}>Summer Flash Sale 2026</Title>
          <Tag color="green">Active</Tag>
        </Space>
        <Space>
          <ButtonSkeleton text="Export" />
          <ButtonSkeleton text="Edit" type="primary" />
        </Space>
      </div>

      {/* Basic Info */}
      <Annotation>Basic Info section (Descriptions inside Card)</Annotation>
      <Card title="Basic Information" style={{ borderRadius: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="Campaign ID"><Block w={80} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Type"><Tag color="blue">Flash Sale</Tag></Descriptions.Item>
          <Descriptions.Item label="Date Range"><Block w={160} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Created By"><Block w={120} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Budget"><Block w={60} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Status"><Tag color="green">Active</Tag></Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Related Table */}
      <Annotation>Related data (Table or Card)</Annotation>
      <Card title="Associated Products" style={{ borderRadius: 16 }} styles={{ body: { padding: 0 } }}>
        <div className="pp-table-head">
          {['Product ID', 'Name', 'Original Price', 'Discount Price', 'Status'].map((col) => (
            <div key={col} className="pp-table-cell">
              <Text type="secondary" strong style={{ fontSize: 12 }}>{col}</Text>
            </div>
          ))}
        </div>
        {[1, 2, 3].map((r) => (
          <div key={r} className="pp-table-data-row">
            {[40, '60%', 50, 50].map((w, i) => (
              <div key={i} className="pp-table-cell"><Block w={w} h={12} /></div>
            ))}
            <div className="pp-table-cell"><Tag color="green">Active</Tag></div>
          </div>
        ))}
      </Card>

      {/* Timeline */}
      <Annotation>Operation History (Timeline, optional)</Annotation>
      <Card title="Operation History" style={{ borderRadius: 16 }}>
        <Timeline items={[
          { children: <><Text strong>Published</Text> <Text type="secondary">by admin@klook.com · 2026-03-20 14:30</Text></> },
          { children: <><Text strong>Approved</Text> <Text type="secondary">by reviewer@klook.com · 2026-03-19 10:15</Text></> },
          { children: <><Text strong>Created</Text> <Text type="secondary">by operator@klook.com · 2026-03-18 09:00</Text></> },
        ]} />
      </Card>
    </div>
  )
}

/* ─── 3b. Detail Page (Audit) ─── */
function DetailAuditPattern() {
  return (
    <div className="pp-page">
      <Breadcrumb items={[{ title: 'Admin' }, { title: 'Merchant Audit' }, { title: 'Audit Detail' }]} />

      <Annotation>Audit variant: Approve/Reject visible only in "Pending Review" status</Annotation>
      <div className="pp-page-header">
        <Space align="center">
          <Title level={4} style={{ margin: 0 }}>Merchant Application #M-2026-0892</Title>
          <Tag color="orange">Pending Review</Tag>
        </Space>
        <Space>
          <Button danger icon={<CloseOutlined />}>Reject</Button>
          <Button type="primary" icon={<CheckOutlined />}>Approve</Button>
        </Space>
      </div>

      {/* Read-only Info */}
      <Card title="Merchant Information" style={{ borderRadius: 16 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="Company Name"><Block w={140} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Contact"><Block w={100} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Business Type"><Block w={80} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Region"><Block w={80} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Submitted"><Block w={120} h={14} /></Descriptions.Item>
          <Descriptions.Item label="Documents"><Text type="link">3 files attached</Text></Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Reject Modal hint */}
      <Annotation>On Reject: Modal with mandatory reason (TextArea, max 200 chars)</Annotation>
      <Card style={{ borderRadius: 16, borderLeft: '3px solid #faad14' }} styles={{ body: { padding: 16 } }}>
        <Text type="secondary">
          Reject triggers a confirmation Modal requiring a mandatory reason field (TextArea, 200 char limit).
          After rejection, status tag updates and action buttons become disabled.
        </Text>
      </Card>

      {/* Audit Timeline */}
      <Card title="Audit History" style={{ borderRadius: 16 }}>
        <Timeline items={[
          { color: 'orange', children: <><Text strong>Pending Review</Text> <Text type="secondary">assigned to admin · 2026-03-28</Text></> },
          { color: 'blue', children: <><Text strong>Submitted</Text> <Text type="secondary">by merchant · 2026-03-27</Text></> },
        ]} />
      </Card>
    </div>
  )
}

/* ─── 4. Form Page (Single) ─── */
function FormSinglePattern() {
  return (
    <div className="pp-page" style={{ paddingBottom: 80 }}>
      <Breadcrumb items={[{ title: 'Campaign' }, { title: 'Create Activity' }]} />
      <Title level={4} style={{ margin: 0 }}>Create Activity</Title>

      {/* Form Section 1 */}
      <Annotation>Form fields: ≤6 = 1 col, 7-12 = 2 col, &gt;12 = Card groups</Annotation>
      <Card title="Basic Information" style={{ borderRadius: 16 }}>
        <Row gutter={[16, 20]}>
          {['Activity Name', 'Activity Type', 'Date Range', 'Owner'].map((label) => (
            <Col span={12} key={label}>
              <div className="pp-field">
                <Text type="secondary" style={{ fontSize: 13 }}>{label} <Text type="danger">*</Text></Text>
                <InputSkeleton />
              </div>
            </Col>
          ))}
          <Col span={24}>
            <div className="pp-field">
              <Text type="secondary" style={{ fontSize: 13 }}>Description</Text>
              <InputSkeleton width="100%" />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Form Section 2 */}
      <Card title="Discount Rules" style={{ borderRadius: 16 }}>
        <Row gutter={[16, 20]}>
          {['Discount Type', 'Discount Value', 'Min Purchase', 'Max Discount'].map((label) => (
            <Col span={12} key={label}>
              <div className="pp-field">
                <Text type="secondary" style={{ fontSize: 13 }}>{label}</Text>
                <InputSkeleton />
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Fixed bottom bar */}
      <Annotation>Bottom action bar: fixed, not scrollable with content</Annotation>
      <div className="pp-footer-bar">
        <div style={{ flex: 1 }} />
        <ButtonSkeleton text="Cancel" />
        <ButtonSkeleton text="Submit Activity" type="primary" />
      </div>
    </div>
  )
}

/* ─── 4b. Form Page (Steps Wizard) ─── */
function FormStepsPattern() {
  return (
    <div className="pp-page" style={{ paddingBottom: 80 }}>
      <Breadcrumb items={[{ title: 'Campaign' }, { title: 'Activity' }, { title: 'Create Activity' }]} />
      <Title level={4} style={{ margin: 0 }}>Create Activity</Title>

      {/* Steps */}
      <Annotation>Steps progress bar (3-5 steps, max 6), horizontal, fixed above form</Annotation>
      <Card style={{ borderRadius: 16 }} styles={{ body: { padding: '16px 24px' } }}>
        <Steps
          current={1}
          items={[
            { title: 'Basic Info' },
            { title: 'Target & Rules' },
            { title: 'Products' },
            { title: 'Review & Submit' },
          ]}
        />
      </Card>

      {/* Current step content */}
      <Annotation>Current step form content (Card wrapped). Switching steps preserves data.</Annotation>
      <Card title="Target & Rules" style={{ borderRadius: 16 }}>
        <Row gutter={[16, 20]}>
          {['Discount Type', 'Discount Value'].map((label) => (
            <Col span={12} key={label}>
              <div className="pp-field">
                <Text type="secondary" style={{ fontSize: 13 }}>{label} <Text type="danger">*</Text></Text>
                <InputSkeleton />
              </div>
            </Col>
          ))}
          {['Min Purchase Amount', 'Max Discount Cap'].map((label) => (
            <Col span={12} key={label}>
              <div className="pp-field">
                <Text type="secondary" style={{ fontSize: 13 }}>{label}</Text>
                <InputSkeleton />
              </div>
            </Col>
          ))}
          <Col span={24}>
            <div className="pp-field">
              <Text type="secondary" style={{ fontSize: 13 }}>Applicable Scope <Text type="danger">*</Text></Text>
              <InputSkeleton />
            </div>
          </Col>
        </Row>
      </Card>

      <Annotation>Step dependencies: Discount Type options determined by Activity Type in Step 1</Annotation>
      <Card style={{ borderRadius: 16, borderLeft: '3px solid var(--pp-accent, #1677ff)' }} styles={{ body: { padding: 16 } }}>
        <Text type="secondary">
          Step dependency: available Discount Types are filtered based on the Activity Type selected in Step 1.
          Product selection in Step 3 only appears when Applicable Scope = "Specific Products".
        </Text>
      </Card>

      {/* Fixed bottom bar */}
      <Annotation>Step actions: Previous + Next/Submit, fixed at bottom</Annotation>
      <div className="pp-footer-bar">
        <ButtonSkeleton text="Previous" />
        <div style={{ flex: 1 }} />
        <ButtonSkeleton text="Next" type="primary" />
      </div>
    </div>
  )
}

/* ─── 5. Config Page ─── */
function ConfigPattern() {
  return (
    <div className="pp-page">
      <Title level={4} style={{ margin: 0 }}>System Settings</Title>

      <Annotation>Config page: optional left Anchor nav + Card-grouped settings</Annotation>
      <div className="pp-config-layout">
        {/* Left Anchor Nav */}
        <div className="pp-config-nav">
          {['General', 'Notifications', 'Permissions', 'Danger Zone'].map((s, i) => (
            <div key={s} className={`pp-config-nav-item ${i === 0 ? 'pp-config-nav-item--active' : ''}`}>
              {s}
            </div>
          ))}
        </div>

        {/* Config Sections */}
        <div className="pp-config-body">
          <Card title="General" style={{ borderRadius: 16 }}>
            {['Workspace Name', 'Default Language', 'Timezone'].map((label) => (
              <div key={label} className="pp-config-row">
                <div className="pp-config-row-info">
                  <Text strong>{label}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Configure {label.toLowerCase()} for this workspace</Text>
                </div>
                <InputSkeleton width={240} />
              </div>
            ))}
          </Card>

          <Card title="Notifications" style={{ borderRadius: 16 }}>
            {['Email Alerts', 'Push Notifications', 'Weekly Report'].map((label, i) => (
              <div key={label} className="pp-config-row">
                <div className="pp-config-row-info">
                  <Text strong>{label}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Enable or disable {label.toLowerCase()}</Text>
                </div>
                <div className={`pp-toggle ${i < 2 ? 'pp-toggle--on' : ''}`}>
                  <div className="pp-toggle-handle" />
                </div>
              </div>
            ))}
          </Card>

          <Annotation>Danger Zone: destructive actions require confirmation (Modal.confirm + danger button)</Annotation>
          <Card title="Danger Zone" style={{ borderRadius: 16, borderColor: '#ffa39e' }}>
            <div className="pp-config-row">
              <div className="pp-config-row-info">
                <Text strong>Delete Workspace</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>This action is irreversible. All data will be permanently removed.</Text>
              </div>
              <ButtonSkeleton text="Delete Workspace" type="danger" />
            </div>
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <ButtonSkeleton text="Cancel" />
            <ButtonSkeleton text="Save Changes" type="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */

type PatternKey = 'dashboard' | 'list-table' | 'list-card' | 'detail' | 'detail-audit' | 'form-single' | 'form-steps' | 'config'

const PATTERN_OPTIONS: { label: string; value: PatternKey }[] = [
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'List (Table)', value: 'list-table' },
  { label: 'List (Card)', value: 'list-card' },
  { label: 'Detail', value: 'detail' },
  { label: 'Detail (Audit)', value: 'detail-audit' },
  { label: 'Form (Single)', value: 'form-single' },
  { label: 'Form (Steps)', value: 'form-steps' },
  { label: 'Config', value: 'config' },
]

const PATTERN_META: Record<PatternKey, { title: string; desc: string; tags: string[] }> = {
  'dashboard': {
    title: 'Dashboard',
    desc: 'Statistics overview, charts, and quick-access entry points for high-frequency tasks.',
    tags: ['Stats ≤4/row', 'Charts area', 'Quick Access ≤6'],
  },
  'list-table': {
    title: 'List Page — Standard Table',
    desc: 'Flat data rows with search, advanced filters, batch actions, and pagination.',
    tags: ['Search + Advanced Filters', 'Action col fixed right', 'Batch actions bar'],
  },
  'list-card': {
    title: 'List Page — Card List',
    desc: 'Nested data with expandable cards — each card may contain sub-items.',
    tags: ['Card per row', 'Expandable children', 'Column header fixed'],
  },
  'detail': {
    title: 'Detail Page',
    desc: 'Single record view with structured info sections, related data, and operation history.',
    tags: ['Breadcrumb ≥3 levels', 'Descriptions card', 'Timeline optional'],
  },
  'detail-audit': {
    title: 'Detail Page — Audit Variant',
    desc: 'Approve or reject with mandatory reason for rejection. Buttons disabled after decision.',
    tags: ['Status Tag', 'Approve / Reject', 'Reject reason modal', 'Audit Timeline'],
  },
  'form-single': {
    title: 'Form Page — Single Page',
    desc: 'Linear form on a single page. Fields grouped by Card when >12 fields.',
    tags: ['≤6: 1 col', '7–12: 2 col', '>12: Card groups', 'Fixed footer'],
  },
  'form-steps': {
    title: 'Form Page — Steps Wizard',
    desc: 'Multi-step wizard when steps have dependencies or field count >20.',
    tags: ['3–5 steps', 'Step dependency', 'Last step = Review', 'State persisted'],
  },
  'config': {
    title: 'Config Page',
    desc: 'System/business settings grouped by category with optional left-side anchor nav.',
    tags: ['Anchor nav', 'Card per group', 'Danger = confirm'],
  },
}

const PATTERN_COMPONENTS: Record<PatternKey, React.FC> = {
  'dashboard': DashboardPattern,
  'list-table': ListTablePattern,
  'list-card': ListCardPattern,
  'detail': DetailPattern,
  'detail-audit': DetailAuditPattern,
  'form-single': FormSinglePattern,
  'form-steps': FormStepsPattern,
  'config': ConfigPattern,
}

export function PagePatternsDemo() {
  const [active, setActive] = useState<PatternKey>('dashboard')
  const meta = PATTERN_META[active]
  const PatternComponent = PATTERN_COMPONENTS[active]

  return (
    <div className="skill-ref-page pp-demo">
      <div className="pp-demo-header">
        <h2 className="ds-section-title">Page Patterns</h2>
        <p className="ds-section-desc">
          5 standard page patterns (8 variants) from the design system. Each page must belong to one pattern — no freestyle component stacking.
        </p>
      </div>

      <Segmented
        options={PATTERN_OPTIONS}
        value={active}
        onChange={(v) => setActive(v as PatternKey)}
        block
        style={{ marginBottom: 24 }}
      />

      <div className="pp-pattern-info">
        <Title level={5} style={{ margin: 0 }}>{meta.title}</Title>
        <Text type="secondary">{meta.desc}</Text>
        <div className="pp-demo-tags">
          {meta.tags.map((t) => (
            <Tag key={t} color="blue">{t}</Tag>
          ))}
        </div>
      </div>

      <Divider style={{ margin: '16px 0' }} />

      <PatternComponent />
    </div>
  )
}
