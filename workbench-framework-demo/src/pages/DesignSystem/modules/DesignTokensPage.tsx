import {
  Card,
  Typography,
  Tag,
  Row,
  Col,
  Divider,
  Button,
  Input,
  Badge,
} from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import {
  PRIMARY_COLOR,
  TEXT_COLORS,
  BG_COLORS,
  BORDER_COLORS,
  FUNCTIONAL_COLORS,
  SPACINGS,
  RADII,
  FONT_SIZES,
  COMPONENT_TOKENS,
} from '../data/designTokens'

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

/* ─── Color swatch component ─── */
function ColorSwatch({
  color,
  label,
  cn,
  hex,
}: {
  color: string
  label: string
  cn?: string
  hex?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '6px 12px',
        background: '#fafafa',
        borderRadius: 8,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: color,
          flexShrink: 0,
          border: color === '#FFFFFF' || color === '#ffffff' ? '1px solid #d9d9d9' : undefined,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
        {cn && (
          <Text type="secondary" style={{ fontSize: 11 }}>
            {cn}
          </Text>
        )}
      </div>
      <Text
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#999',
        }}
      >
        {hex || color}
      </Text>
    </div>
  )
}

/* ─── Spacing visual block ─── */
function SpacingBlock({ size, label }: { size: number; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Text
        style={{
          width: 48,
          textAlign: 'right',
          fontFamily: 'monospace',
          fontSize: 12,
        }}
      >
        {label}
      </Text>
      <div
        style={{
          width: size,
          height: 24,
          background: '#1677FF',
          borderRadius: 3,
          opacity: 0.7,
          flexShrink: 0,
        }}
      />
      <Text type="secondary" style={{ fontSize: 12 }}>
        {size}px
      </Text>
    </div>
  )
}

/* ─── Radius visual block ─── */
function RadiusBlock({ radius, label }: { radius: number; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: radius,
          border: '2px solid #1677FF',
          background: '#e6f4ff',
        }}
      />
      <Text style={{ fontFamily: 'monospace', fontSize: 11 }}>{label}</Text>
      <Text type="secondary" style={{ fontSize: 10 }}>
        {radius}px
      </Text>
    </div>
  )
}

/* ─── Main Component ─── */
export function DesignTokensPage() {
  return (
    <div className="skill-ref-page">
      {/* Page Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          <Bi en="Design Tokens" cn="设计令牌" />
        </Title>
        <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
          Brand token visual reference: colors, spacing, radius, typography, and component tokens.
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          品牌令牌可视化参考：颜色、间距、圆角、排版和组件令牌。
        </Text>
      </div>

      {/* ─── Colors ─── */}
      <Card
        title={<Bi en="Colors" cn="颜色" />}
        style={{ borderRadius: 16 }}
      >
        {/* Primary */}
        <Text strong style={{ fontSize: 14 }}>
          <Bi en="Primary" cn="主色" />
        </Text>
        <div
          style={{
            marginTop: 8,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              background: PRIMARY_COLOR,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            #1677FF
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Primary Blue</div>
            <Text type="secondary">
              Brand primary — used for links, active states, and primary actions
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              品牌主色 — 用于链接、激活态和主要操作
            </Text>
          </div>
        </div>

        <Divider style={{ margin: '16px 0' }} />

        {/* Text Colors */}
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Text strong>
              <Bi en="Text Colors (4 levels)" cn="文本颜色（4 层级）" />
            </Text>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {TEXT_COLORS.map((c) => (
                <ColorSwatch key={c.label} {...c} />
              ))}
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <Text strong>
              <Bi en="Background Colors" cn="背景颜色" />
            </Text>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {BG_COLORS.map((c) => (
                <ColorSwatch key={c.label} {...c} />
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <Text strong>
                <Bi en="Border Colors" cn="边框颜色" />
              </Text>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                {BORDER_COLORS.map((c) => (
                  <ColorSwatch key={c.label} {...c} />
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Divider style={{ margin: '16px 0' }} />

        {/* Functional Colors */}
        <Text strong>
          <Bi en="Functional Colors" cn="功能颜色" />
        </Text>
        <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
          {FUNCTIONAL_COLORS.map((c) => (
            <Col xs={12} lg={6} key={c.label}>
              <ColorSwatch {...c} />
            </Col>
          ))}
        </Row>

        <Divider style={{ margin: '16px 0' }} />

        {/* Tag / Badge Presets */}
        <Text strong>
          <Bi en="Tag & Badge Live Examples" cn="Tag 和 Badge 实例" />
        </Text>
        <div
          style={{
            marginTop: 8,
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Success
          </Tag>
          <Tag color="processing">Processing</Tag>
          <Tag color="warning" icon={<ExclamationCircleOutlined />}>
            Warning
          </Tag>
          <Tag color="error" icon={<CloseCircleOutlined />}>
            Error
          </Tag>
          <Tag color="default">Default</Tag>
          <Tag color="blue">Blue</Tag>
          <Tag color="cyan">Cyan</Tag>
          <Tag color="purple">Purple</Tag>
          <Tag color="magenta">Magenta</Tag>
          <Tag color="orange">Orange</Tag>
          <Divider type="vertical" />
          <Badge status="success" text="Success" />
          <Badge status="processing" text="Processing" />
          <Badge status="warning" text="Warning" />
          <Badge status="error" text="Error" />
          <Badge status="default" text="Default" />
        </div>
      </Card>

      {/* ─── Spacing ─── */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Spacing — 4px Grid" cn="间距 — 4px 栅格" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <BiBlock
              en="All spacing values follow a 4px grid system."
              cn="所有间距值遵循 4px 栅格系统。"
            />
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {SPACINGS.map((s) => (
                <SpacingBlock key={s.size} {...s} />
              ))}
            </div>
          </Card>
        </Col>

        {/* ─── Border Radius ─── */}
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Border Radius Scale" cn="圆角比例尺" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <BiBlock
              en="From sharp (0) to pill (9999px). Visual scale of all radii tokens."
              cn="从直角（0）到胶囊（9999px）。所有圆角令牌的可视比例尺。"
            />
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {RADII.map((r) => (
                <RadiusBlock key={r.label} {...r} />
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Shadow ─── */}
      <Card
        title={<Bi en="Shadow — Flat Design" cn="阴影 — 扁平设计" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} lg={12}>
            <BiBlock
              en="All shadows are set to none. This is a deliberate flat design philosophy."
              cn="所有阴影设置为 none。这是刻意的扁平设计理念。"
            />
            <div style={{ marginTop: 8 }}>
              <Tag color="blue" style={{ fontSize: 14, padding: '4px 16px' }}>
                boxShadow: none
              </Tag>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  background: '#fff',
                  border: '2px solid #52c41a',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  color: '#52c41a',
                }}
              >
                <CheckCircleOutlined style={{ fontSize: 20 }} />
                No shadow
              </div>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  background: '#fff',
                  border: '2px solid #ff4d4f',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  color: '#ff4d4f',
                  textDecoration: 'line-through',
                }}
              >
                <CloseCircleOutlined style={{ fontSize: 20 }} />
                Shadow
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* ─── Typography ─── */}
      <Card
        title={<Bi en="Typography" cn="排版" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <Text strong>
              <Bi en="Font Sizes" cn="字号" />
            </Text>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {FONT_SIZES.map((f) => (
                <div
                  key={f.size}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 16,
                    padding: '4px 12px',
                    background: '#fafafa',
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      width: 48,
                      fontFamily: 'monospace',
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    {f.label}
                  </Text>
                  <div style={{ fontSize: f.size, fontWeight: 400, flex: 1 }}>
                    {f.usage}
                  </div>
                  <Text type="secondary" style={{ fontSize: 11, flexShrink: 0 }}>
                    {f.cn}
                  </Text>
                </div>
              ))}
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <Text strong>
              <Bi en="Font Weights" cn="字重" />
            </Text>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div
                style={{
                  padding: 16,
                  background: '#fafafa',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 400 }}>Regular</div>
                <Tag style={{ marginTop: 4 }}>font-weight: 400</Tag>
                <br />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  Body text, descriptions
                </Text>
              </div>
              <div
                style={{
                  padding: 16,
                  background: '#fafafa',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 600 }}>Semibold</div>
                <Tag color="blue" style={{ marginTop: 4 }}>
                  font-weight: 600
                </Tag>
                <br />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  Titles, labels, emphasis
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* ─── Live Component Examples ─── */}
      <Card
        title={<Bi en="Live Token Examples" cn="令牌实际效果" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card size="small" style={{ borderRadius: 12 }}>
              <Text strong>Button</Text>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                }}
              >
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button danger>Danger</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card size="small" style={{ borderRadius: 12 }}>
              <Text strong>Input</Text>
              <div style={{ marginTop: 8 }}>
                <Input placeholder="Search..." style={{ borderRadius: 6 }} />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card size="small" style={{ borderRadius: 12 }}>
              <Text strong>
                <Bi en="Functional Icons" cn="功能图标" />
              </Text>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  gap: 16,
                }}
              >
                <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                <InfoCircleOutlined style={{ fontSize: 24, color: '#1677FF' }} />
                <ExclamationCircleOutlined style={{ fontSize: 24, color: '#faad14' }} />
                <CloseCircleOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* ─── Component Tokens Table ─── */}
      <Card
        title={<Bi en="Component Tokens" cn="组件令牌" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Component-level token overrides for key components."
          cn="关键组件的组件级令牌覆盖。"
        />
        <Divider style={{ margin: '12px 0' }} />
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
                <th style={{ padding: '8px 12px', width: 120 }}>
                  <Bi en="Component" cn="组件" />
                </th>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Key Tokens" cn="关键令牌" />
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPONENT_TOKENS.map((row) => (
                <tr
                  key={row.component}
                  style={{ borderBottom: '1px solid #f5f5f5' }}
                >
                  <td style={{ padding: '8px 12px' }}>
                    <Tag color="blue" style={{ margin: 0 }}>
                      {row.component}
                    </Tag>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Text
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 12,
                      }}
                    >
                      {row.tokens}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {row.cn}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ─── Token Priority Flow ─── */}
      <Card
        title={<Bi en="Token Priority Decision Flow" cn="令牌优先级决策流" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="When resolving a design token value, the system follows this priority chain:"
          cn="解析设计令牌值时，系统遵循以下优先级链："
        />
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Seed Token', 'Alias Token', 'Component Token', 'ConfigProvider', 'CSS Override'].map(
            (step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    padding: '8px 16px',
                    background: i === 0 ? '#e6f4ff' : i === 4 ? '#fff1f0' : '#fafafa',
                    border: `1px solid ${i === 0 ? '#91caff' : i === 4 ? '#ffa39e' : '#e8e8e8'}`,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  {step}
                </div>
                {i < 4 && (
                  <span style={{ color: '#999', fontSize: 16 }}>→</span>
                )}
              </div>
            ),
          )}
        </div>
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Left = highest priority (base), Right = last resort override
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: 11 }}>
            左侧 = 最高优先级（基础），右侧 = 最后手段覆盖
          </Text>
        </div>
      </Card>
    </div>
  )
}
