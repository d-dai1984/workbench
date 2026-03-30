import { Card, Typography, Row, Col, Table, Tag } from 'antd'
import { SIZE_DATA, SELECTION_RULES } from '../data/icons'
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  BellOutlined,
  DownloadOutlined,
  UploadOutlined,
  FilterOutlined,
  ExportOutlined,
  EditFilled,
  CheckCircleFilled,
  SettingFilled,
  HomeFilled,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

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

const SIZE_COLUMNS = [
  {
    title: 'Context',
    dataIndex: 'context',
    key: 'context',
    render: (text: string, record: (typeof SIZE_DATA)[number]) => (
      <div>
        <div>{text}</div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {record.contextCn}
        </Text>
      </div>
    ),
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    render: (text: string) => <Tag color="blue">{text}</Tag>,
  },
]

/* ─── Icon showcase helper ─── */
function IconBox({
  icon,
  name,
  size = 20,
}: {
  icon: React.ReactNode
  name: string
  size?: number
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 8px',
        borderRadius: 8,
        background: 'rgba(0, 0, 0, 0.02)',
        minWidth: 80,
      }}
    >
      <span style={{ fontSize: size, lineHeight: 1 }}>{icon}</span>
      <Text type="secondary" style={{ fontSize: 10, textAlign: 'center' }}>
        {name}
      </Text>
    </div>
  )
}

/* ─── Component ─── */

export function IconsPage() {
  return (
    <div className="skill-ref-page">
      {/* Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          Icon Usage
          <Text
            type="secondary"
            style={{ fontSize: 16, fontWeight: 400, marginLeft: 8 }}
          >
            图标规范
          </Text>
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          Guidelines for icon usage across all B-end products: theme selection,
          sizing, color rules, and the Klook custom icon workflow.
        </Paragraph>
        <Paragraph
          type="secondary"
          style={{ marginBottom: 0, fontSize: 13 }}
        >
          覆盖所有 B 端产品的图标使用规范：主题选择、尺寸、颜色规则和 Klook 自定义图标流程。
        </Paragraph>
      </div>

      {/* Version Binding */}
      <Card
        title={<Bi en="Version Binding" cn="版本绑定" />}
        style={{ borderRadius: 16 }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(22, 119, 255, 0.06)',
            border: '1px solid rgba(22, 119, 255, 0.2)',
          }}
        >
          <Text strong>@ant-design/icons@^6</Text>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            required with
          </Text>
          <Text strong style={{ marginLeft: 4 }}>
            antd@^6
          </Text>
        </div>
        <Paragraph
          type="secondary"
          style={{ marginTop: 8, marginBottom: 0, fontSize: 13 }}
        >
          Always keep @ant-design/icons in sync with antd major version to
          avoid icon rendering issues.
          <br />
          始终保持 @ant-design/icons 与 antd 主版本号同步，避免图标渲染问题。
        </Paragraph>
      </Card>

      {/* Theme Selection */}
      <Card
        title={<Bi en="Theme Selection" cn="主题选择" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={[16, 16]}>
          {/* Outlined */}
          <Col xs={24} lg={8}>
            <Card
              size="small"
              style={{ borderRadius: 12, height: '100%' }}
              styles={{ body: { padding: 16 } }}
            >
              <div style={{ marginBottom: 12 }}>
                <Tag color="blue">Default</Tag>
                <Text strong>Outlined</Text>
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                  线框
                </Text>
              </div>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Used for most UI elements. The standard choice.
              </Text>
              <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                大多数 UI 元素的默认选择。
              </Text>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <IconBox icon={<SearchOutlined />} name="Search" />
                <IconBox icon={<EditOutlined />} name="Edit" />
                <IconBox icon={<DeleteOutlined />} name="Delete" />
                <IconBox icon={<SettingOutlined />} name="Setting" />
              </div>
            </Card>
          </Col>
          {/* Filled */}
          <Col xs={24} lg={8}>
            <Card
              size="small"
              style={{ borderRadius: 12, height: '100%' }}
              styles={{ body: { padding: 16 } }}
            >
              <div style={{ marginBottom: 12 }}>
                <Tag color="orange">Selected / Active</Tag>
                <Text strong>Filled</Text>
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                  实心
                </Text>
              </div>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Used for selected or active states. Adds visual weight.
              </Text>
              <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                用于选中/激活状态。增加视觉重量。
              </Text>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <IconBox icon={<EditFilled />} name="Edit" />
                <IconBox icon={<CheckCircleFilled />} name="CheckCircle" />
                <IconBox icon={<SettingFilled />} name="Setting" />
                <IconBox icon={<HomeFilled />} name="Home" />
              </div>
            </Card>
          </Col>
          {/* TwoTone */}
          <Col xs={24} lg={8}>
            <Card
              size="small"
              style={{ borderRadius: 12, height: '100%' }}
              styles={{ body: { padding: 16 } }}
            >
              <div style={{ marginBottom: 12 }}>
                <Tag color="default">Rare</Tag>
                <Text strong>TwoTone</Text>
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                  双色
                </Text>
              </div>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Used sparingly for status indicators or emphasis.
              </Text>
              <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                极少使用，用于状态指示或强调。
              </Text>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <IconBox icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} name="Success" />
                <IconBox icon={<CloseCircleTwoTone twoToneColor="#ff4d4f" />} name="Error" />
                <IconBox icon={<ExclamationCircleTwoTone twoToneColor="#faad14" />} name="Warning" />
                <IconBox icon={<InfoCircleTwoTone />} name="Info" />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Size Specs & Color Rules */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Size Specifications" cn="尺寸规范" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <Table
              dataSource={SIZE_DATA}
              columns={SIZE_COLUMNS}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Color Rules" cn="颜色规则" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <BiBlock
                en="Inherits currentColor by default — follows parent text color"
                cn="默认继承 currentColor — 跟随父元素文字颜色"
              />
              <BiBlock
                en="For emphasis, use colorPrimary: #1677FF"
                cn="强调时使用 colorPrimary：#1677FF"
              />
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  marginTop: 8,
                }}
              >
                <SearchOutlined style={{ fontSize: 16 }} />
                <Text type="secondary">Default (inherits)</Text>
                <SearchOutlined
                  style={{ fontSize: 16, color: '#1677FF', marginLeft: 16 }}
                />
                <Text style={{ color: '#1677FF' }}>Emphasis (primary)</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Stat Card Icon Pattern */}
      <Card
        title={<Bi en="Stat Card Icon Pattern" cn="统计卡片图标模式" />}
        style={{ borderRadius: 16 }}
      >
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Use colorPrimaryBg (#E6F4FF) circle background for stat card icons.
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            统计卡片图标使用 colorPrimaryBg (#E6F4FF) 圆形背景。
          </Text>
        </Paragraph>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: <UserOutlined />, label: 'Users', cn: '用户数' },
            { icon: <BellOutlined />, label: 'Alerts', cn: '告警数' },
            { icon: <DownloadOutlined />, label: 'Downloads', cn: '下载量' },
            { icon: <ExportOutlined />, label: 'Exports', cn: '导出量' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 20px',
                borderRadius: 12,
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#E6F4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: '#1677FF',
                }}
              >
                {item.icon}
              </div>
              <div>
                <Text strong>{item.label}</Text>
                <Text
                  type="secondary"
                  style={{ fontSize: 12, display: 'block' }}
                >
                  {item.cn}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Klook Custom Icons */}
      <Card
        title={<Bi en="Klook Custom Icons" cn="Klook 自定义图标" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <BiBlock
            en="Custom icons sourced from Klook Figma library"
            cn="自定义图标来源于 Klook Figma 组件库"
          />
          <BiBlock
            en="Naming follows antd convention: SemanticName + ThemeSuffix"
            cn="命名遵循 antd 约定：语义名 + 主题后缀"
          />
          <BiBlock
            en='Example: KlookVoucherOutlined, KlookActivityFilled'
            cn="示例：KlookVoucherOutlined、KlookActivityFilled"
          />
        </div>
      </Card>

      {/* Selection Rules */}
      <Card
        title={<Bi en="Selection Rules" cn="选用规则" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SELECTION_RULES.map((rule) => (
            <div
              key={rule.step}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
                {rule.step}
              </Tag>
              <BiBlock en={rule.en} cn={rule.cn} />
            </div>
          ))}
        </div>
      </Card>

      {/* Common Icons Gallery */}
      <Card
        title={<Bi en="Common Icons Gallery" cn="常用图标一览" />}
        style={{ borderRadius: 16 }}
      >
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Frequently used icons in B-end products. Import individually for
          tree-shaking.
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            B 端产品中常用图标。单独导入以支持 tree-shaking。
          </Text>
        </Paragraph>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <IconBox icon={<SearchOutlined />} name="SearchOutlined" />
          <IconBox icon={<EditOutlined />} name="EditOutlined" />
          <IconBox icon={<DeleteOutlined />} name="DeleteOutlined" />
          <IconBox icon={<PlusOutlined />} name="PlusOutlined" />
          <IconBox
            icon={<CheckCircleOutlined />}
            name="CheckCircleOutlined"
          />
          <IconBox
            icon={<CloseCircleOutlined />}
            name="CloseCircleOutlined"
          />
          <IconBox icon={<SettingOutlined />} name="SettingOutlined" />
          <IconBox icon={<UserOutlined />} name="UserOutlined" />
          <IconBox icon={<HomeOutlined />} name="HomeOutlined" />
          <IconBox icon={<BellOutlined />} name="BellOutlined" />
          <IconBox icon={<DownloadOutlined />} name="DownloadOutlined" />
          <IconBox icon={<UploadOutlined />} name="UploadOutlined" />
          <IconBox icon={<FilterOutlined />} name="FilterOutlined" />
          <IconBox icon={<ExportOutlined />} name="ExportOutlined" />
        </div>
      </Card>
    </div>
  )
}
