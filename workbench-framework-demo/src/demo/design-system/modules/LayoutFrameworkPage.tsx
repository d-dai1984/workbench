import { Card, Typography, Tag, Row, Col, Divider } from 'antd'
import { DIMENSION_TABLE, GRID_COLS } from '../data/layoutFramework'

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

/* ─── Shared box style helpers ─── */
const dimBox = (
  w: string | number,
  h: string | number,
  bg: string,
  label: string,
  extra?: React.CSSProperties,
): React.ReactNode => (
  <div
    style={{
      width: w,
      height: h,
      background: bg,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      color: '#fff',
      fontWeight: 600,
      flexShrink: 0,
      ...extra,
    }}
  >
    {label}
  </div>
)

/* ─── Navigation State Diagram ─── */
function NavStateDiagram({
  label,
  cn,
  sidebarW,
  secondaryW,
  collapsed,
}: {
  label: string
  cn: string
  sidebarW: number
  secondaryW?: number
  collapsed?: boolean
}) {
  return (
    <div style={{ flex: 1, minWidth: 180 }}>
      <Text strong style={{ fontSize: 13 }}>
        <Bi en={label} cn={cn} />
      </Text>
      <div
        style={{
          marginTop: 8,
          border: '1px solid #e8e8e8',
          borderRadius: 8,
          overflow: 'hidden',
          height: 160,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            height: 28,
            background: '#f5f5f5',
            borderBottom: '1px solid #e8e8e8',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 8,
            fontSize: 10,
            color: '#999',
          }}
        >
          Header 56px
        </div>
        {/* Body */}
        <div style={{ flex: 1, display: 'flex' }}>
          {/* Sidebar */}
          <div
            style={{
              width: collapsed ? 33 : sidebarW / 4,
              background: '#1677FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              color: '#fff',
              fontWeight: 600,
              borderRight: '1px solid #e8e8e8',
              flexShrink: 0,
            }}
          >
            {sidebarW}px
          </div>
          {/* Secondary sidebar */}
          {secondaryW && (
            <div
              style={{
                width: secondaryW / 4,
                background: '#4096FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                color: '#fff',
                fontWeight: 600,
                borderRight: '1px solid #e8e8e8',
                flexShrink: 0,
              }}
            >
              {secondaryW}px
            </div>
          )}
          {/* Content */}
          <div
            style={{
              flex: 1,
              background: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: '#999',
            }}
          >
            Content (flex-1)
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export function LayoutFrameworkPage() {
  return (
    <div className="skill-ref-page">
      {/* Page Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          <Bi en="Layout Framework" cn="框架布局" />
        </Title>
        <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
          Structural specs for the workbench shell: header, sidebar, content area, and grid system.
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          工作台框架结构规范：顶栏、侧边栏、内容区和栅格系统。
        </Text>
      </div>

      {/* ─── Navigation States ─── */}
      <Card
        title={<Bi en="Three Navigation States" cn="三种导航状态" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <NavStateDiagram label="State A: Default" cn="默认态" sidebarW={256} />
          <NavStateDiagram
            label="State B: + Secondary"
            cn="含二级侧边栏"
            sidebarW={256}
            secondaryW={248}
          />
          <NavStateDiagram
            label="State C: Collapsed"
            cn="收起态"
            sidebarW={66}
            collapsed
          />
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag color="blue">Sidebar: 256px (default)</Tag>
          <Tag color="cyan">Secondary: 248px</Tag>
          <Tag color="geekblue">Collapsed: 66px</Tag>
        </div>
      </Card>

      {/* ─── Header Specs ─── */}
      <Card
        title={<Bi en="Header Specifications" cn="顶栏规范" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Fixed top bar — height 56px, three-section layout"
          cn="固定顶栏 — 高度 56px，三段式布局"
        />
        <div
          style={{
            marginTop: 16,
            height: 56,
            background: '#fafafa',
            border: '1px solid #e8e8e8',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 120,
              height: '100%',
              background: '#1677FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            Logo
          </div>
          {/* Search */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              padding: '0 16px',
            }}
          >
            <div
              style={{
                width: 480,
                maxWidth: '100%',
                height: 32,
                background: '#f0f0f0',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#999',
              }}
            >
              Search — 480px max
            </div>
          </div>
          {/* User */}
          <div
            style={{
              width: 120,
              height: '100%',
              background: '#e6f4ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: '#1677FF',
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            User Area
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tag>Height: 56px</Tag>
          <Tag color="blue">Search: 480px</Tag>
          <Tag>Three sections: Logo | Search | User</Tag>
        </div>
      </Card>

      {/* ─── Sidebar & Menu Specs ─── */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Sidebar Menu Specs" cn="侧边栏菜单规范" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            {/* Menu item demo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Normal item */}
              <div
                style={{
                  height: 46,
                  borderRadius: 8,
                  background: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16,
                  fontSize: 13,
                  color: '#666',
                }}
              >
                Default item — h: 46px, radius: 8px
              </div>
              {/* Selected item */}
              <div
                style={{
                  height: 46,
                  borderRadius: 999,
                  background: '#e6f4ff',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16,
                  fontSize: 13,
                  color: '#1677FF',
                  fontWeight: 600,
                  border: '1px solid #91caff',
                }}
              >
                Selected item — h: 46px, radius: 999px
              </div>
              {/* Normal item */}
              <div
                style={{
                  height: 46,
                  borderRadius: 8,
                  background: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16,
                  fontSize: 13,
                  color: '#666',
                }}
              >
                Default item — h: 46px, radius: 8px
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag>Item height: 46px</Tag>
              <Tag color="blue">Selected: pill 999px</Tag>
              <Tag>Default: 8px radius</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Content Area" cn="内容区规范" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div
              style={{
                border: '2px dashed #d9d9d9',
                borderRadius: 12,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                background: '#fafafa',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: '#999',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: -24,
                    left: -24,
                    fontSize: 10,
                    color: '#1677FF',
                  }}
                >
                  p-32px
                </span>
              </div>
              {dimBox('100%', 60, '#e6f4ff', 'Card (radius: 16px, p: 24px)', {
                color: '#1677FF',
                border: '1px solid #91caff',
              })}
              <div
                style={{
                  fontSize: 10,
                  color: '#1677FF',
                  textAlign: 'center',
                  margin: '-20px 0 -20px',
                }}
              >
                gap: 32px
              </div>
              {dimBox('100%', 60, '#e6f4ff', 'Card (flex-1)', {
                color: '#1677FF',
                border: '1px solid #91caff',
              })}
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag>Padding: 32px</Tag>
              <Tag>Gap: 32px</Tag>
              <Tag color="blue">flex-1 fills remaining</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Card Specs ─── */}
      <Card
        title={<Bi en="Card Specifications" cn="卡片规范" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={16}>
          <Col xs={24} lg={8}>
            <div
              style={{
                borderRadius: 16,
                padding: 24,
                background: '#fff',
                border: '2px dashed #1677FF',
                textAlign: 'center',
              }}
            >
              <Text strong style={{ color: '#1677FF' }}>
                radius: 16px
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                圆角 16px
              </Text>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div
              style={{
                borderRadius: 16,
                padding: 24,
                background: '#fafafa',
                border: '2px dashed #52c41a',
                textAlign: 'center',
              }}
            >
              <Text strong style={{ color: '#52c41a' }}>
                padding: 24px
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                内边距 24px
              </Text>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div
              style={{
                borderRadius: 16,
                padding: 24,
                background: '#fafafa',
                border: '2px dashed #faad14',
                textAlign: 'center',
              }}
            >
              <Text strong style={{ color: '#faad14' }}>
                No border, No shadow
              </Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                无边框、无阴影
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* ─── Grid System ─── */}
      <Card
        title={<Bi en="Grid System — 24 Columns, Gutter 16px" cn="栅格系统 — 24 列，间距 16px" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Based on antd Row/Col. 24 columns with 16px gutter. Common column spans shown below."
          cn="基于 antd Row/Col。24 列制，16px 间距。以下为常用列宽。"
        />
        <Divider style={{ margin: '16px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {GRID_COLS.map((span) => (
            <div key={span} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Text
                style={{
                  width: 80,
                  textAlign: 'right',
                  fontSize: 12,
                  fontFamily: 'monospace',
                }}
              >
                span={span}
              </Text>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    width: `${(span / 24) * 100}%`,
                    height: 28,
                    background:
                      span <= 4
                        ? '#bae0ff'
                        : span <= 8
                          ? '#91caff'
                          : span <= 12
                            ? '#69b1ff'
                            : '#4096ff',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: span > 8 ? '#fff' : '#1677FF',
                    fontWeight: 500,
                  }}
                >
                  {((span / 24) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ─── Quick Reference Table ─── */}
      <Card
        title={<Bi en="Quick Reference — All Dimensions" cn="速查表 — 全部尺寸" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '2px solid #f0f0f0',
                  textAlign: 'left',
                }}
              >
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Token" cn="令牌" />
                </th>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Value" cn="值" />
                </th>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Visual" cn="示意" />
                </th>
              </tr>
            </thead>
            <tbody>
              {DIMENSION_TABLE.map((row) => (
                <tr
                  key={row.token}
                  style={{
                    borderBottom: '1px solid #f5f5f5',
                  }}
                >
                  <td style={{ padding: '8px 12px' }}>
                    <Bi en={row.token} cn={row.cn} />
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Tag
                      color="blue"
                      style={{ fontFamily: 'monospace', margin: 0 }}
                    >
                      {row.value}
                    </Tag>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <div
                      style={{
                        width: Math.min(parseInt(row.value) || 16, 120),
                        height: 12,
                        background: '#e6f4ff',
                        borderRadius: 3,
                        border: '1px solid #91caff',
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
