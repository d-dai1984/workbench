import { Card, Typography, Tag, Row, Col, Divider } from 'antd'
import { TAG_PRESETS } from '../data/businessModules'
import {
  SearchOutlined,
  FilterOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  StopOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography

/* ─── Bilingual helpers ─── */
function Bi({ en, cn }: { en: string; cn: string }) {
  return (
    <>
      {en}
      <Text type="secondary" style={{ fontSize: '0.85em', marginLeft: 6 }}>
        {cn}
      </Text>
    </>
  )
}

function BiBlock({ en, cn }: { en: string; cn: string }) {
  return (
    <div>
      <div>{en}</div>
      <Text type="secondary" style={{ fontSize: 12 }}>
        {cn}
      </Text>
    </div>
  )
}

/* ─── Skeleton primitives ─── */
function Block({
  w = '100%',
  h = 14,
  bg = '#f0f0f0',
  label,
  style,
}: {
  w?: string | number
  h?: number
  bg?: string
  label?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: bg,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        color: '#666',
        flexShrink: 0,
        ...style,
      }}
    >
      {label}
    </div>
  )
}

function FakeBtn({
  text,
  primary,
  danger,
}: {
  text: string
  primary?: boolean
  danger?: boolean
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 12px',
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 500,
        background: danger ? '#fff1f0' : primary ? '#1677FF' : '#fafafa',
        color: danger ? '#ff4d4f' : primary ? '#fff' : '#333',
        border: `1px solid ${danger ? '#ffa39e' : primary ? '#1677FF' : '#d9d9d9'}`,
      }}
    >
      {text}
    </div>
  )
}

/* ─── Module 1: Filter Table ─── */
function FilterTableModule() {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color="blue">01</Tag>
          <Bi en="Filter Table Module" cn="筛选表格模块" />
        </div>
      }
      style={{ borderRadius: 16 }}
    >
      <Row gutter={16}>
        {/* Variant A: Flat */}
        <Col xs={24} lg={12}>
          <Text strong>
            <Bi en="Variant A: Flat Filters (<=4 fields)" cn="变体A：平铺筛选（<=4个字段）" />
          </Text>
          <div
            style={{
              marginTop: 8,
              padding: 16,
              background: '#fafafa',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Filter row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Block w={120} h={32} label="Select" bg="#fff" style={{ border: '1px solid #d9d9d9' }} />
              <Block w={120} h={32} label="Input" bg="#fff" style={{ border: '1px solid #d9d9d9' }} />
              <Block w={120} h={32} label="DatePicker" bg="#fff" style={{ border: '1px solid #d9d9d9' }} />
              <div
                style={{
                  padding: '4px 12px',
                  background: '#1677FF',
                  color: '#fff',
                  borderRadius: 6,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 32,
                }}
              >
                <SearchOutlined /> Search
              </div>
            </div>
            {/* Table skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Block w="100%" h={36} bg="#e6f4ff" label="Table Header" />
              <Block w="100%" h={32} bg="#fff" label="Row 1" style={{ border: '1px solid #f0f0f0' }} />
              <Block w="100%" h={32} bg="#fff" label="Row 2" style={{ border: '1px solid #f0f0f0' }} />
            </div>
          </div>
        </Col>
        {/* Variant B: Collapsed */}
        <Col xs={24} lg={12}>
          <Text strong>
            <Bi en="Variant B: Collapsed (>4 fields)" cn="变体B：折叠筛选（>4个字段）" />
          </Text>
          <div
            style={{
              marginTop: 8,
              padding: 16,
              background: '#fafafa',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {/* Search + advanced */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Block w={200} h={32} label="Search keyword..." bg="#fff" style={{ border: '1px solid #d9d9d9', flex: 1 }} />
              <div
                style={{
                  padding: '4px 12px',
                  color: '#1677FF',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 32,
                  cursor: 'pointer',
                }}
              >
                <FilterOutlined /> Advanced Filters
              </div>
            </div>
            {/* Expanded filter area hint */}
            <div
              style={{
                padding: 12,
                background: '#e6f4ff',
                borderRadius: 8,
                border: '1px dashed #91caff',
                fontSize: 11,
                color: '#1677FF',
                textAlign: 'center',
              }}
            >
              Expanded: additional filter fields appear here
              <br />
              <Text type="secondary" style={{ fontSize: 10 }}>
                展开后：更多筛选字段显示在此区域
              </Text>
            </div>
            {/* Table skeleton */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Block w="100%" h={36} bg="#e6f4ff" label="Table Header" />
              <Block w="100%" h={32} bg="#fff" label="Row 1" style={{ border: '1px solid #f0f0f0' }} />
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

/* ─── Module 2: Batch Actions ─── */
function BatchActionsModule() {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color="green">02</Tag>
          <Bi en="Batch Actions Module" cn="批量操作模块" />
        </div>
      }
      style={{ borderRadius: 16 }}
    >
      <BiBlock
        en="When rows are selected, an action bar appears. Max 4 buttons. Confirm before execute."
        cn="选中行后，操作栏出现。最多4个按钮。执行前需确认。"
      />
      <Divider style={{ margin: '12px 0' }} />
      <div
        style={{
          padding: 16,
          background: '#fafafa',
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Table with selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Block w="100%" h={36} bg="#e6f4ff" label="☑ Select All  |  Column A  |  Column B  |  Actions" />
          <Block
            w="100%"
            h={32}
            bg="#e6f7ff"
            label="☑  Selected Row 1"
            style={{ border: '1px solid #91caff' }}
          />
          <Block
            w="100%"
            h={32}
            bg="#e6f7ff"
            label="☑  Selected Row 2"
            style={{ border: '1px solid #91caff' }}
          />
          <Block w="100%" h={32} bg="#fff" label="☐  Unselected Row" style={{ border: '1px solid #f0f0f0' }} />
        </div>
        {/* Action bar */}
        <div
          style={{
            padding: '8px 16px',
            background: '#fff',
            borderRadius: 8,
            border: '1px solid #1677FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 12 }}>
            <Text strong style={{ color: '#1677FF' }}>
              2
            </Text>{' '}
            items selected
            <Text type="secondary" style={{ fontSize: 11, marginLeft: 6 }}>
              已选 2 项
            </Text>
          </Text>
          <div style={{ display: 'flex', gap: 8 }}>
            <FakeBtn text="Export" />
            <FakeBtn text="Enable" primary />
            <FakeBtn text="Disable" />
            <FakeBtn text="Delete" danger />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag>Max 4 buttons</Tag>
          <Tag color="orange">Confirm before destructive</Tag>
          <Tag>Bar disappears on deselect</Tag>
        </div>
      </div>
    </Card>
  )
}

/* ─── Module 3: Drawer Edit ─── */
function DrawerEditModule() {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color="orange">03</Tag>
          <Bi en="Drawer Edit Module" cn="抽屉编辑模块" />
        </div>
      }
      style={{ borderRadius: 16 }}
    >
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Text strong>
            <Bi en="Fields <=6 → Modal" cn="字段数 <=6 → Modal" />
          </Text>
          <div
            style={{
              marginTop: 8,
              padding: 16,
              background: '#fafafa',
              borderRadius: 12,
              position: 'relative',
              minHeight: 200,
            }}
          >
            {/* Modal overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 12,
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #d9d9d9',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Edit Item
              </div>
              <div
                style={{
                  flex: 1,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Block
                    key={i}
                    w="100%"
                    h={24}
                    bg="#fff"
                    label={`Field ${i}`}
                    style={{ border: '1px solid #d9d9d9' }}
                  />
                ))}
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 8,
                }}
              >
                <FakeBtn text="Cancel" />
                <FakeBtn text="Save" primary />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <Text strong>
            <Bi en="Fields >6 → Drawer (footer fixed)" cn="字段数 >6 → Drawer（底部固定）" />
          </Text>
          <div
            style={{
              marginTop: 8,
              background: '#fafafa',
              borderRadius: 12,
              minHeight: 200,
              display: 'flex',
              overflow: 'hidden',
            }}
          >
            {/* Page behind */}
            <div style={{ flex: 1, padding: 12, opacity: 0.4 }}>
              <Block w="100%" h={24} bg="#e0e0e0" label="Page content" />
            </div>
            {/* Drawer */}
            <div
              style={{
                width: '60%',
                background: '#fff',
                borderLeft: '1px solid #d9d9d9',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Edit (Drawer)
              </div>
              <div
                style={{
                  flex: 1,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  overflowY: 'auto',
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Block
                    key={i}
                    w="100%"
                    h={22}
                    bg="#fff"
                    label={`Field ${i}`}
                    style={{ border: '1px solid #d9d9d9' }}
                  />
                ))}
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  borderTop: '1px solid #f0f0f0',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 8,
                  background: '#fff',
                }}
              >
                <FakeBtn text="Cancel" />
                <FakeBtn text="Save" primary />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

/* ─── Module 4: Permission Module ─── */
function PermissionModule() {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color="purple">04</Tag>
          <Bi en="Permission Module" cn="权限模块" />
        </div>
      }
      style={{ borderRadius: 16 }}
    >
      <Row gutter={16}>
        {/* Page-level */}
        <Col xs={24} lg={8}>
          <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
            <Text strong style={{ fontSize: 13 }}>
              <Bi en="Page-level" cn="页面级" />
            </Text>
            <div
              style={{
                marginTop: 8,
                padding: 24,
                background: '#fafafa',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <StopOutlined style={{ fontSize: 32, color: '#d9d9d9' }} />
              <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
                403 — No Permission
              </div>
              <Text type="secondary" style={{ fontSize: 11 }}>
                Empty state shown
              </Text>
            </div>
            <Tag style={{ marginTop: 8 }}>No permission = empty state</Tag>
          </Card>
        </Col>
        {/* Action-level */}
        <Col xs={24} lg={8}>
          <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
            <Text strong style={{ fontSize: 13 }}>
              <Bi en="Action-level" cn="操作级" />
            </Text>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FakeBtn text="Edit" primary />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  Enabled
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '4px 12px',
                    borderRadius: 6,
                    fontSize: 12,
                    background: '#f5f5f5',
                    color: '#bfbfbf',
                    border: '1px solid #d9d9d9',
                    cursor: 'not-allowed',
                  }}
                >
                  <LockOutlined /> Delete
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  Disabled + tooltip
                </Text>
              </div>
            </div>
            <Tag style={{ marginTop: 12 }}>Disabled + tooltip explains</Tag>
          </Card>
        </Col>
        {/* Data-level */}
        <Col xs={24} lg={8}>
          <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
            <Text strong style={{ fontSize: 13 }}>
              <Bi en="Data-level" cn="数据级" />
            </Text>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text>Revenue:</Text>
                <Text style={{ fontSize: 13 }}>$12,345.67</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text>SSN:</Text>
                <Text
                  style={{
                    fontSize: 13,
                    background: '#f0f0f0',
                    padding: '0 8px',
                    borderRadius: 4,
                    letterSpacing: 2,
                  }}
                >
                  <EyeInvisibleOutlined /> ***-**-6789
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Text>Email:</Text>
                <Text
                  style={{
                    fontSize: 13,
                    background: '#f0f0f0',
                    padding: '0 8px',
                    borderRadius: 4,
                  }}
                >
                  j***@email.com
                </Text>
              </div>
            </div>
            <Tag style={{ marginTop: 12 }}>Sensitive data masked</Tag>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}

/* ─── Module 5: Status Tags ─── */
function StatusTagsModule() {
  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color="cyan">05</Tag>
          <Bi en="Status Tags Module" cn="状态标签模块" />
        </div>
      }
      style={{ borderRadius: 16 }}
    >
      <BiBlock
        en="Use antd Tag presets for status. Always provide color + text for dual identification."
        cn="使用 antd Tag 预设状态。始终提供颜色+文字的双重标识。"
      />
      <Divider style={{ margin: '12px 0' }} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 8,
        }}
      >
        {TAG_PRESETS.map((t) => (
          <div
            key={t.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              background: '#fafafa',
              borderRadius: 8,
            }}
          >
            <Tag
              color={t.color}
              style={{ margin: 0, minWidth: 80, textAlign: 'center' }}
            >
              {t.label}
            </Tag>
            <div>
              <div style={{ fontSize: 12 }}>{t.usage}</div>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {t.cn}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ─── Main Component ─── */
export function BusinessModulesPage() {
  return (
    <div className="skill-ref-page">
      {/* Page Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          <Bi en="Business Modules" cn="业务模块" />
        </Title>
        <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
          5 reusable modules that compose into standard page patterns.
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          5 个可复用业务模块，组合构建标准页面模式。
        </Text>
      </div>

      <FilterTableModule />
      <BatchActionsModule />
      <DrawerEditModule />
      <PermissionModule />
      <StatusTagsModule />
    </div>
  )
}
