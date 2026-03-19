import { useState } from 'react'
import {
  Button, Input, InputNumber, Select, Switch, Checkbox, Radio,
  Tag, Badge, Avatar, Divider, Space, Typography,
  Alert, Progress, Slider, Rate, DatePicker, TimePicker,
  Tabs, Steps, Breadcrumb, Pagination, Segmented,
  Card, Table, Empty, Spin, Skeleton, Result,
} from 'antd'
import {
  SearchOutlined, PlusOutlined, DownloadOutlined, DeleteOutlined,
  EditOutlined, CheckCircleOutlined, CloseCircleOutlined,
  ExclamationCircleOutlined, InfoCircleOutlined,
  UserOutlined, SettingOutlined, HomeOutlined,
  HeartOutlined, CopyOutlined,
  EyeOutlined, UploadOutlined,
} from '@ant-design/icons'
import { CodePreview } from './CodePreview'
import { CampaignTableDemo } from './modules/CampaignTableDemo'
import { TemplateCardDemo } from './modules/TemplateCardDemo'
import { HeatmapCalendarDemo } from './modules/HeatmapCalendarDemo'
import { StepFormSectionDemo } from './modules/StepFormSectionDemo'
import './DesignSystemPage.css'

const { Title, Text, Paragraph, Link } = Typography
const { TextArea } = Input

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="ds-section">
      <div className="ds-section-header">
        <h2 className="ds-section-title">{title}</h2>
        {desc && <p className="ds-section-desc">{desc}</p>}
      </div>
      <div className="ds-section-body">{children}</div>
    </div>
  )
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ds-subsection">
      <div className="ds-subsection-label">{label}</div>
      <div className="ds-subsection-content">{children}</div>
    </div>
  )
}

// Map sidebar keys to section IDs
const SECTION_MAP: Record<string, string> = {
  'ds-overview': 'all',
  'ds-color': 'color',
  'ds-typography': 'typography',
  'ds-button': 'button',
  'ds-input': 'input',
  'ds-select': 'select',
  'ds-controls': 'controls',
  'ds-tag-badge': 'tag-badge',
  'ds-avatar': 'avatar',
  'ds-feedback': 'feedback',
  'ds-nav': 'nav',
  'ds-data': 'data',
  'ds-states': 'states',
  'ds-campaign-table': 'campaign-table',
  'ds-template-card': 'template-card',
  'ds-heatmap': 'heatmap',
  'ds-step-form': 'step-form',
}

interface DesignSystemPageProps {
  activeSection?: string
}

export function DesignSystemPage({ activeSection }: DesignSystemPageProps) {
  const [switchVal, setSwitchVal] = useState(true)
  const [sliderVal, setSliderVal] = useState(40)
  const [segVal, setSegVal] = useState<string | number>('Daily')

  const section = SECTION_MAP[activeSection || ''] || 'all'
  const show = (id: string) => section === 'all' || section === id

  return (
    <div className="ds-page">

      {/* ========== 1. Color System ========== */}
      {show('color') && <Section title="Color System" desc="主题色板 · 基于 Klook-2026 橙色主题">
        <SubSection label="Primary">
          <div className="ds-color-row">
            <div className="ds-color-swatch" style={{ background: '#FFF2E8' }}><span>#FFF2E8</span></div>
            <div className="ds-color-swatch" style={{ background: '#FFD8BF' }}><span>#FFD8BF</span></div>
            <div className="ds-color-swatch" style={{ background: '#FFBB96' }}><span>#FFBB96</span></div>
            <div className="ds-color-swatch" style={{ background: '#FF8C4D', color: '#fff' }}><span>#FF8C4D</span></div>
            <div className="ds-color-swatch" style={{ background: '#FF7A45', color: '#fff' }}><span>#FF7A45</span></div>
            <div className="ds-color-swatch ds-color-swatch--primary" style={{ background: '#FF5B00', color: '#fff' }}><span>Primary<br/>#FF5B00</span></div>
            <div className="ds-color-swatch" style={{ background: '#D4380D', color: '#fff' }}><span>#D4380D</span></div>
          </div>
        </SubSection>
        <SubSection label="Semantic">
          <div className="ds-color-row">
            <div className="ds-color-swatch" style={{ background: '#00B33C', color: '#fff' }}><span>Success<br/>#00B33C</span></div>
            <div className="ds-color-swatch" style={{ background: '#FFB800', color: '#fff' }}><span>Warning<br/>#FFB800</span></div>
            <div className="ds-color-swatch" style={{ background: '#FF4D4F', color: '#fff' }}><span>Error<br/>#FF4D4F</span></div>
            <div className="ds-color-swatch" style={{ background: '#1E90FF', color: '#fff' }}><span>Info<br/>#1E90FF</span></div>
          </div>
        </SubSection>
        <SubSection label="Neutral">
          <div className="ds-color-row">
            <div className="ds-color-swatch" style={{ background: '#FFFFFF', border: '1px solid #f0f0f0' }}><span>#FFFFFF</span></div>
            <div className="ds-color-swatch" style={{ background: '#FAFAFA' }}><span>#FAFAFA</span></div>
            <div className="ds-color-swatch" style={{ background: '#F5F5F5' }}><span>#F5F5F5</span></div>
            <div className="ds-color-swatch" style={{ background: '#F0F0F0' }}><span>#F0F0F0</span></div>
            <div className="ds-color-swatch" style={{ background: '#D9D9D9' }}><span>#D9D9D9</span></div>
            <div className="ds-color-swatch" style={{ background: 'rgba(38,38,38,0.45)', color: '#fff' }}><span>Secondary</span></div>
            <div className="ds-color-swatch" style={{ background: 'rgba(38,38,38,0.88)', color: '#fff' }}><span>Primary</span></div>
          </div>
        </SubSection>
      </Section>}

      {/* ========== 2. Typography ========== */}
      {show('typography') && <Section title="Typography" desc="文字排版规范 · import { Typography } from 'antd'">
        <CodePreview
          title="Heading 标题"
          description="h1 - h5 五级标题"
          code={`import { Typography } from 'antd'
const { Title } = Typography

<Title level={1}>h1. Heading (38px Bold)</Title>
<Title level={2}>h2. Heading (30px Bold)</Title>
<Title level={3}>h3. Heading (24px Bold)</Title>
<Title level={4}>h4. Heading (20px Bold)</Title>
<Title level={5}>h5. Heading (16px Bold)</Title>`}
        >
          <Title level={1}>h1. Heading (38px Bold)</Title>
          <Title level={2}>h2. Heading (30px Bold)</Title>
          <Title level={3}>h3. Heading (24px Bold)</Title>
          <Title level={4}>h4. Heading (20px Bold)</Title>
          <Title level={5}>h5. Heading (16px Bold)</Title>
        </CodePreview>

        <CodePreview
          title="Text 文本"
          description="不同语义和样式的行内文本"
          code={`import { Typography } from 'antd'
const { Text, Link, Paragraph } = Typography

<Text>Body Regular (14px)</Text>
<Text strong>Body Bold (14px)</Text>
<Text type="secondary">Text Secondary</Text>
<Text type="success">Text Success</Text>
<Text type="warning">Text Warning</Text>
<Text type="danger">Text Danger</Text>
<Text disabled>Text Disabled</Text>
<Link href="#">Link Text</Link>
<Text code>Code Inline</Text>
<Text keyboard>⌘ + S</Text>
<Paragraph ellipsis={{ rows: 2 }}>Long text...</Paragraph>`}
        >
          <Space direction="vertical">
            <Text>Body Regular (14px)</Text>
            <Text strong>Body Bold (14px)</Text>
            <Text type="secondary">Text Secondary</Text>
            <Text type="success">Text Success</Text>
            <Text type="warning">Text Warning</Text>
            <Text type="danger">Text Danger</Text>
            <Text disabled>Text Disabled</Text>
            <Link href="#">Link Text</Link>
            <Text code>Code Inline</Text>
            <Text keyboard>⌘ + S</Text>
            <Paragraph ellipsis={{ rows: 2 }} style={{ maxWidth: 400, margin: 0 }}>
              Long paragraph for ellipsis demo. Ant Design, a design language for background applications,
              is refined by Ant UED Team. This text should be truncated after two rows.
            </Paragraph>
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 3. Button ========== */}
      {show('button') && <Section title="Button" desc="按钮组件 · import { Button } from 'antd'">
        <CodePreview
          title="按钮类型"
          description="Primary / Default / Dashed / Text / Link 五种类型"
          code={`import { Button } from 'antd'

<Button type="primary">Primary</Button>
<Button>Default</Button>
<Button type="dashed">Dashed</Button>
<Button type="text">Text</Button>
<Button type="link">Link</Button>`}
        >
          <Space wrap>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </Space>
        </CodePreview>

        <CodePreview
          title="按钮尺寸"
          description="Large / Default / Small 三种尺寸"
          code={`<Button type="primary" size="large">Large</Button>
<Button type="primary">Default</Button>
<Button type="primary" size="small">Small</Button>`}
        >
          <Space wrap>
            <Button type="primary" size="large">Large</Button>
            <Button type="primary">Default</Button>
            <Button type="primary" size="small">Small</Button>
          </Space>
        </CodePreview>

        <CodePreview
          title="图标按钮"
          description="带图标的按钮 + 圆形按钮 + 圆角按钮"
          code={`import { PlusOutlined, SearchOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons'

<Button type="primary" icon={<PlusOutlined />}>New</Button>
<Button icon={<SearchOutlined />}>Search</Button>
<Button icon={<DownloadOutlined />} />
<Button type="primary" icon={<UploadOutlined />} shape="round">Upload</Button>
<Button type="primary" shape="circle" icon={<PlusOutlined />} />`}
        >
          <Space wrap>
            <Button type="primary" icon={<PlusOutlined />}>New</Button>
            <Button icon={<SearchOutlined />}>Search</Button>
            <Button icon={<DownloadOutlined />} />
            <Button type="primary" icon={<UploadOutlined />} shape="round">Upload</Button>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
          </Space>
        </CodePreview>

        <CodePreview
          title="按钮状态"
          description="Loading / Disabled / Danger"
          code={`<Button type="primary" loading>Loading</Button>
<Button type="primary" disabled>Disabled</Button>
<Button type="primary" danger>Danger</Button>
<Button danger>Danger Default</Button>
<Button type="dashed" danger>Danger Dashed</Button>`}
        >
          <Space wrap>
            <Button type="primary" loading>Loading</Button>
            <Button type="primary" disabled>Disabled</Button>
            <Button type="primary" danger>Danger</Button>
            <Button danger>Danger Default</Button>
            <Button type="dashed" danger>Danger Dashed</Button>
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 4. Input ========== */}
      {show('input') && <Section title="Input" desc="输入框组件 · import { Input, InputNumber } from 'antd'">
        <CodePreview
          title="基础输入框"
          description="不同前缀、后缀、附加组件的 Input"
          code={`import { Input } from 'antd'
import { SearchOutlined, EditOutlined } from '@ant-design/icons'

<Input placeholder="Basic input" />
<Input prefix={<SearchOutlined />} placeholder="With prefix icon" />
<Input suffix={<EditOutlined />} placeholder="With suffix icon" />
<Input addonBefore="https://" addonAfter=".com" placeholder="domain" />
<Input.Password placeholder="Password input" />
<Input disabled placeholder="Disabled" />
<Input status="error" placeholder="Error state" />
<Input status="warning" placeholder="Warning state" />`}
        >
          <Space direction="vertical" style={{ width: '100%', maxWidth: 400 }}>
            <Input placeholder="Basic input" />
            <Input prefix={<SearchOutlined />} placeholder="With prefix icon" />
            <Input suffix={<EditOutlined />} placeholder="With suffix icon" />
            <Input addonBefore="https://" addonAfter=".com" placeholder="domain" />
            <Input.Password placeholder="Password input" />
            <Input disabled placeholder="Disabled" />
            <Input status="error" placeholder="Error state" />
            <Input status="warning" placeholder="Warning state" />
          </Space>
        </CodePreview>

        <CodePreview
          title="输入框尺寸"
          description="Large / Default / Small"
          code={`<Input size="large" placeholder="Large" />
<Input placeholder="Default" />
<Input size="small" placeholder="Small" />`}
        >
          <Space direction="vertical" style={{ width: '100%', maxWidth: 400 }}>
            <Input size="large" placeholder="Large" />
            <Input placeholder="Default" />
            <Input size="small" placeholder="Small" />
          </Space>
        </CodePreview>

        <CodePreview
          title="TextArea & InputNumber"
          description="多行文本 + 数字输入"
          code={`import { Input, InputNumber } from 'antd'
const { TextArea } = Input

<TextArea rows={3} placeholder="TextArea" showCount maxLength={200} />

<InputNumber min={0} max={100} defaultValue={10} />
<InputNumber min={0} max={100} defaultValue={10} addonAfter="%" />
<InputNumber min={0} defaultValue={0} addonAfter="HKD" style={{ width: 160 }} />
<InputNumber disabled defaultValue={999} />`}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <TextArea rows={3} placeholder="TextArea" showCount maxLength={200} style={{ maxWidth: 400 }} />
            <Space wrap>
              <InputNumber min={0} max={100} defaultValue={10} />
              <InputNumber min={0} max={100} defaultValue={10} addonAfter="%" />
              <InputNumber min={0} defaultValue={0} addonAfter="HKD" style={{ width: 160 }} />
              <InputNumber disabled defaultValue={999} />
            </Space>
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 5. Select & Picker ========== */}
      {show('select') && <Section title="Select & Picker" desc="选择器 · import { Select, DatePicker, TimePicker } from 'antd'">
        <CodePreview
          title="Select 选择器"
          description="单选 / 多选 / 禁用 / 错误态"
          code={`import { Select } from 'antd'

<Select defaultValue="option1" style={{ width: 200 }} options={[
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]} />

<Select mode="multiple" placeholder="Multiple select" style={{ width: 300 }} options={[
  { value: 'app', label: 'App' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
]} />

<Select disabled defaultValue="disabled" style={{ width: 160 }} />
<Select status="error" defaultValue="error" style={{ width: 160 }} />`}
        >
          <Space wrap>
            <Select defaultValue="option1" style={{ width: 200 }} options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
              { value: 'option3', label: 'Option 3' },
            ]} />
            <Select mode="multiple" placeholder="Multiple select" style={{ width: 300 }} options={[
              { value: 'app', label: 'App' },
              { value: 'desktop', label: 'Desktop' },
              { value: 'mobile', label: 'Mobile' },
            ]} />
            <Select disabled defaultValue="disabled" style={{ width: 160 }} />
            <Select status="error" defaultValue="error" style={{ width: 160 }} />
          </Space>
        </CodePreview>

        <CodePreview
          title="DatePicker & TimePicker"
          description="日期 / 时间选择"
          code={`import { DatePicker, TimePicker } from 'antd'

<DatePicker placeholder="Select date" />
<DatePicker.RangePicker />
<TimePicker placeholder="Select time" />
<TimePicker.RangePicker />`}
        >
          <Space wrap>
            <DatePicker placeholder="Select date" />
            <DatePicker.RangePicker />
            <TimePicker placeholder="Select time" />
            <TimePicker.RangePicker />
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 6. Radio / Checkbox / Switch ========== */}
      {show('controls') && <Section title="Radio / Checkbox / Switch" desc="选择控件 · import { Radio, Checkbox, Switch, Segmented } from 'antd'">
        <CodePreview
          title="Radio 单选"
          description="基础单选 + 按钮式单选"
          code={`import { Radio } from 'antd'

// 基础单选
<Radio.Group defaultValue="a">
  <Radio value="a">Option A</Radio>
  <Radio value="b">Option B</Radio>
  <Radio value="c" disabled>Disabled</Radio>
</Radio.Group>

// 按钮式单选
<Radio.Group defaultValue="a" optionType="button" buttonStyle="solid">
  <Radio.Button value="a">Beijing</Radio.Button>
  <Radio.Button value="b">Shanghai</Radio.Button>
  <Radio.Button value="c">Guangzhou</Radio.Button>
</Radio.Group>`}
        >
          <Space direction="vertical" size={16}>
            <Radio.Group defaultValue="a">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c" disabled>Disabled</Radio>
            </Radio.Group>
            <Radio.Group defaultValue="a" optionType="button" buttonStyle="solid">
              <Radio.Button value="a">Beijing</Radio.Button>
              <Radio.Button value="b">Shanghai</Radio.Button>
              <Radio.Button value="c">Guangzhou</Radio.Button>
            </Radio.Group>
          </Space>
        </CodePreview>

        <CodePreview
          title="Checkbox 多选"
          description="多选框组"
          code={`import { Checkbox } from 'antd'

<Checkbox.Group defaultValue={['app']}>
  <Checkbox value="app">App</Checkbox>
  <Checkbox value="desktop">Desktop</Checkbox>
  <Checkbox value="mobile">Mobile</Checkbox>
  <Checkbox value="api" disabled>API (disabled)</Checkbox>
</Checkbox.Group>`}
        >
          <Checkbox.Group defaultValue={['app']}>
            <Checkbox value="app">App</Checkbox>
            <Checkbox value="desktop">Desktop</Checkbox>
            <Checkbox value="mobile">Mobile</Checkbox>
            <Checkbox value="api" disabled>API (disabled)</Checkbox>
          </Checkbox.Group>
        </CodePreview>

        <CodePreview
          title="Switch 开关"
          description="不同尺寸和文案的开关"
          code={`import { Switch } from 'antd'

<Switch defaultChecked />
<Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
<Switch disabled />
<Switch size="small" defaultChecked />`}
        >
          <Space>
            <Switch checked={switchVal} onChange={setSwitchVal} />
            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
            <Switch disabled />
            <Switch size="small" defaultChecked />
          </Space>
        </CodePreview>

        <CodePreview
          title="Segmented 分段控制器"
          description="类似 iOS UISegmentedControl"
          code={`import { Segmented } from 'antd'

const [value, setValue] = useState('Daily')

<Segmented
  options={['Daily', 'Weekly', 'Monthly', 'Quarterly']}
  value={value}
  onChange={setValue}
/>`}
        >
          <Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly']} value={segVal} onChange={setSegVal} />
        </CodePreview>
      </Section>}

      {/* ========== 7. Tag & Badge ========== */}
      {show('tag-badge') && <Section title="Tag & Badge" desc="标签 · 徽标 · import { Tag, Badge } from 'antd'">
        <CodePreview
          title="Tag 标签"
          description="状态标签 + 图标标签 + 可关闭标签"
          code={`import { Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

<Tag>Default</Tag>
<Tag color="processing">Processing</Tag>
<Tag color="success">Success</Tag>
<Tag color="warning">Warning</Tag>
<Tag color="error">Error</Tag>
<Tag icon={<CheckCircleOutlined />} color="success">Done</Tag>
<Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>
<Tag icon={<ExclamationCircleOutlined />} color="warning">Wait</Tag>
<Tag icon={<InfoCircleOutlined />} color="processing">Info</Tag>
<Tag closable>Closable</Tag>`}
        >
          <Space wrap>
            <Tag>Default</Tag>
            <Tag color="processing">Processing</Tag>
            <Tag color="success">Success</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="error">Error</Tag>
            <Tag icon={<CheckCircleOutlined />} color="success">Done</Tag>
            <Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>
            <Tag icon={<ExclamationCircleOutlined />} color="warning">Wait</Tag>
            <Tag icon={<InfoCircleOutlined />} color="processing">Info</Tag>
            <Tag closable>Closable</Tag>
          </Space>
        </CodePreview>

        <CodePreview
          title="Color Tags 彩色标签"
          description="内置 11 种颜色主题"
          code={`<Tag color="magenta">magenta</Tag>
<Tag color="red">red</Tag>
<Tag color="volcano">volcano</Tag>
<Tag color="orange">orange</Tag>
<Tag color="gold">gold</Tag>
<Tag color="lime">lime</Tag>
<Tag color="green">green</Tag>
<Tag color="cyan">cyan</Tag>
<Tag color="blue">blue</Tag>
<Tag color="geekblue">geekblue</Tag>
<Tag color="purple">purple</Tag>`}
        >
          <Space wrap>
            {['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'].map(c => (
              <Tag key={c} color={c}>{c}</Tag>
            ))}
          </Space>
        </CodePreview>

        <CodePreview
          title="Badge 徽标"
          description="数字徽标 + 圆点 + 状态"
          code={`import { Badge, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

<Badge count={5}><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
<Badge count={0} showZero><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
<Badge dot><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
<Badge count={100} overflowCount={99}><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>

<Badge status="success" text="Success" />
<Badge status="error" text="Error" />
<Badge status="warning" text="Warning" />
<Badge status="processing" text="Processing" />`}
        >
          <Space size={24} wrap>
            <Badge count={5}><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
            <Badge count={0} showZero><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
            <Badge dot><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
            <Badge count={100} overflowCount={99}><Avatar shape="square" icon={<UserOutlined />} size={40} /></Badge>
            <Badge status="success" text="Success" />
            <Badge status="error" text="Error" />
            <Badge status="warning" text="Warning" />
            <Badge status="processing" text="Processing" />
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 8. Avatar ========== */}
      {show('avatar') && <Section title="Avatar" desc="头像 · import { Avatar } from 'antd'">
        <CodePreview
          title="Avatar 类型与尺寸"
          description="图标 / 文字 / 图片 / 方形"
          code={`import { Avatar } from 'antd'
import { UserOutlined, SettingOutlined } from '@ant-design/icons'

<Avatar size={64} icon={<UserOutlined />} />
<Avatar size={48} style={{ background: '#FF5B00' }}>U</Avatar>
<Avatar size={40}>AK</Avatar>
<Avatar size={32} src="/images/avatar.svg" />
<Avatar shape="square" size={40} icon={<SettingOutlined />} />`}
        >
          <Space size={16}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Avatar size={48} style={{ background: '#FF5B00' }}>U</Avatar>
            <Avatar size={40}>AK</Avatar>
            <Avatar size={32} src="/images/avatar.svg" />
            <Avatar shape="square" size={40} icon={<SettingOutlined />} />
          </Space>
        </CodePreview>

        <CodePreview
          title="Avatar.Group 头像组"
          description="超出 maxCount 自动折叠"
          code={`<Avatar.Group maxCount={4}>
  <Avatar style={{ background: '#f56a00' }}>K</Avatar>
  <Avatar style={{ background: '#7265e6' }}>L</Avatar>
  <Avatar style={{ background: '#ffbf00' }}>O</Avatar>
  <Avatar style={{ background: '#00a2ae' }}>O</Avatar>
  <Avatar style={{ background: '#1677ff' }}>K</Avatar>
</Avatar.Group>`}
        >
          <Avatar.Group maxCount={4}>
            <Avatar style={{ background: '#f56a00' }}>K</Avatar>
            <Avatar style={{ background: '#7265e6' }}>L</Avatar>
            <Avatar style={{ background: '#ffbf00' }}>O</Avatar>
            <Avatar style={{ background: '#00a2ae' }}>O</Avatar>
            <Avatar style={{ background: '#1677ff' }}>K</Avatar>
          </Avatar.Group>
        </CodePreview>
      </Section>}

      {/* ========== 9. Alert & Progress ========== */}
      {show('feedback') && <Section title="Alert & Progress" desc="反馈组件 · import { Alert, Progress, Slider, Rate } from 'antd'">
        <CodePreview
          title="Alert 警告提示"
          description="四种类型 + 可关闭 + 带描述"
          code={`import { Alert } from 'antd'

<Alert message="Info alert" type="info" showIcon />
<Alert message="Success alert" type="success" showIcon />
<Alert message="Warning alert" type="warning" showIcon closable />
<Alert
  message="Error alert"
  description="Detailed description of the error."
  type="error"
  showIcon
/>`}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Alert message="Info alert" type="info" showIcon />
            <Alert message="Success alert" type="success" showIcon />
            <Alert message="Warning alert" type="warning" showIcon closable />
            <Alert message="Error alert" description="Detailed description of the error." type="error" showIcon />
          </Space>
        </CodePreview>

        <CodePreview
          title="Progress 进度条"
          description="线性 / 环形 / 仪表盘"
          code={`import { Progress } from 'antd'

// 线性进度条
<Progress percent={30} />
<Progress percent={70} status="active" />
<Progress percent={100} />
<Progress percent={50} status="exception" />

// 环形进度条
<Progress type="circle" percent={75} size={80} />
<Progress type="circle" percent={100} size={80} />
<Progress type="circle" percent={30} status="exception" size={80} />
<Progress type="dashboard" percent={40} size={80} />`}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Progress percent={30} />
            <Progress percent={70} status="active" />
            <Progress percent={100} />
            <Progress percent={50} status="exception" />
            <Space>
              <Progress type="circle" percent={75} size={80} />
              <Progress type="circle" percent={100} size={80} />
              <Progress type="circle" percent={30} status="exception" size={80} />
              <Progress type="dashboard" percent={sliderVal} size={80} />
            </Space>
          </Space>
        </CodePreview>

        <CodePreview
          title="Slider & Rate"
          description="滑块 + 评分"
          code={`import { Slider, Rate } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

const [value, setValue] = useState(40)
<Slider value={value} onChange={setValue} />

<Rate defaultValue={3} />
<Rate character={<HeartOutlined />} defaultValue={3} style={{ color: '#FF4D4F' }} />`}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Slider value={sliderVal} onChange={setSliderVal} />
            <Space>
              <Rate defaultValue={3} />
              <Rate character={<HeartOutlined />} defaultValue={3} style={{ color: '#FF4D4F' }} />
            </Space>
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 10. Navigation ========== */}
      {show('nav') && <Section title="Navigation" desc="导航组件 · Breadcrumb / Steps / Tabs / Pagination">
        <CodePreview
          title="Breadcrumb 面包屑"
          code={`import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

<Breadcrumb items={[
  { title: <><HomeOutlined /> Home</> },
  { title: 'Campaign' },
  { title: 'Create Promotion' },
]} />`}
        >
          <Breadcrumb items={[
            { title: <><HomeOutlined /> Home</> },
            { title: 'Campaign' },
            { title: 'Create Promotion' },
          ]} />
        </CodePreview>

        <CodePreview
          title="Steps 步骤条"
          description="当前步骤高亮 + 描述"
          code={`import { Steps } from 'antd'

<Steps current={1} items={[
  { title: 'Promo Settings', description: 'Configure promotion' },
  { title: 'Select Products', description: 'Choose items' },
  { title: 'Review & Publish', description: 'Confirm details' },
]} />`}
        >
          <Steps current={1} items={[
            { title: 'Promo Settings', description: 'Configure promotion' },
            { title: 'Select Products', description: 'Choose items' },
            { title: 'Review & Publish', description: 'Confirm details' },
          ]} />
        </CodePreview>

        <CodePreview
          title="Tabs 标签页"
          code={`import { Tabs } from 'antd'

<Tabs defaultActiveKey="1" items={[
  { key: '1', label: 'Overview', children: 'Tab content 1' },
  { key: '2', label: 'Details', children: 'Tab content 2' },
  { key: '3', label: 'Settings', children: 'Tab content 3', disabled: true },
]} />`}
        >
          <Tabs defaultActiveKey="1" items={[
            { key: '1', label: 'Overview', children: 'Tab content 1' },
            { key: '2', label: 'Details', children: 'Tab content 2' },
            { key: '3', label: 'Settings', children: 'Tab content 3', disabled: true },
          ]} />
        </CodePreview>

        <CodePreview
          title="Pagination 分页"
          code={`import { Pagination } from 'antd'

<Pagination defaultCurrent={1} total={250} showSizeChanger showQuickJumper />`}
        >
          <Pagination defaultCurrent={1} total={250} showSizeChanger showQuickJumper />
        </CodePreview>
      </Section>}

      {/* ========== 11. Data Display ========== */}
      {show('data') && <Section title="Table & Card" desc="数据展示 · import { Table, Card } from 'antd'">
        <CodePreview
          title="Table 表格"
          description="带操作列和状态标签的数据表格"
          code={`import { Table, Tag, Button, Space } from 'antd'
import { EyeOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Discount', dataIndex: 'discount', key: 'discount' },
  { title: 'Status', dataIndex: 'status', key: 'status',
    render: (s: string) => (
      <Tag color={s === 'Active' ? 'success' : s === 'Draft' ? 'processing' : 'default'}>{s}</Tag>
    )
  },
  { title: 'Action', key: 'action',
    render: () => (
      <Space>
        <Button type="link" size="small" icon={<EyeOutlined />}>View</Button>
        <Button type="link" size="small" icon={<CopyOutlined />}>Copy</Button>
        <Button type="link" size="small" danger icon={<DeleteOutlined />}>Delete</Button>
      </Space>
    )
  },
]

const data = [
  { key: '1', name: 'Summer Sale', type: 'Percentage', discount: '15%', status: 'Active' },
  { key: '2', name: 'New User Promo', type: 'Value', discount: 'HKD 50', status: 'Draft' },
  { key: '3', name: 'Flash Deal', type: 'Percentage', discount: '25%', status: 'Expired' },
]

<Table columns={columns} dataSource={data} size="small" pagination={false} />`}
        >
          <Table
            size="small"
            pagination={false}
            dataSource={[
              { key: '1', name: 'Summer Sale', type: 'Percentage', discount: '15%', status: 'Active' },
              { key: '2', name: 'New User Promo', type: 'Value', discount: 'HKD 50', status: 'Draft' },
              { key: '3', name: 'Flash Deal', type: 'Percentage', discount: '25%', status: 'Expired' },
            ]}
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Type', dataIndex: 'type', key: 'type' },
              { title: 'Discount', dataIndex: 'discount', key: 'discount' },
              { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => (
                <Tag color={s === 'Active' ? 'success' : s === 'Draft' ? 'processing' : 'default'}>{s}</Tag>
              )},
              { title: 'Action', key: 'action', render: () => (
                <Space>
                  <Button type="link" size="small" icon={<EyeOutlined />}>View</Button>
                  <Button type="link" size="small" icon={<CopyOutlined />}>Copy</Button>
                  <Button type="link" size="small" danger icon={<DeleteOutlined />}>Delete</Button>
                </Space>
              )},
            ]}
          />
        </CodePreview>

        <CodePreview
          title="Card 卡片"
          description="基础卡片 + hoverable 带封面卡片"
          code={`import { Card } from 'antd'

<Card title="Card Title" extra={<a href="#">More</a>} style={{ width: 280 }}>
  <p>Card content</p>
  <p>Card content</p>
</Card>

<Card hoverable style={{ width: 280 }}
  cover={<div style={{ height: 120, background: 'linear-gradient(135deg, #FF5B00, #FF7A45)', borderRadius: '6px 6px 0 0' }} />}
>
  <Card.Meta title="Promotion Card" description="Hover effect enabled" />
</Card>`}
        >
          <Space wrap>
            <Card title="Card Title" extra={<a href="#">More</a>} style={{ width: 280 }}>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card hoverable style={{ width: 280 }} cover={<div style={{ height: 120, background: 'linear-gradient(135deg, #FF5B00 0%, #FF7A45 100%)', borderRadius: '6px 6px 0 0' }} />}>
              <Card.Meta title="Promotion Card" description="Hover effect enabled" />
            </Card>
          </Space>
        </CodePreview>
      </Section>}

      {/* ========== 12. States ========== */}
      {show('states') && <Section title="States" desc="空状态 · 加载 · 骨架屏 · 结果页">
        <CodePreview
          title="Empty & Spin & Skeleton"
          description="空数据 / 加载中 / 骨架屏"
          code={`import { Empty, Spin, Skeleton } from 'antd'

<Empty description="No data" />

<Spin size="large" />

<Skeleton active paragraph={{ rows: 3 }} />`}
        >
          <Space size={32} align="start" wrap>
            <Empty description="No data" style={{ width: 200 }} />
            <div style={{ width: 200, textAlign: 'center', padding: 24 }}>
              <Spin size="large" />
              <div style={{ marginTop: 8, color: 'rgba(0,0,0,0.45)' }}>Loading...</div>
            </div>
            <div style={{ width: 300 }}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          </Space>
        </CodePreview>

        <CodePreview
          title="Result 结果页"
          description="操作反馈结果"
          code={`import { Result } from 'antd'

<Result status="success" title="Success" subTitle="Operation completed" />
<Result status="error" title="Failed" subTitle="Please try again" />`}
        >
          <Space size={32} wrap>
            <Result status="success" title="Success" subTitle="Operation completed" style={{ padding: '12px 24px' }} />
            <Result status="error" title="Failed" subTitle="Please try again" style={{ padding: '12px 24px' }} />
          </Space>
        </CodePreview>
      </Section>}

      {show('all') && <Divider style={{ margin: '48px 0 32px' }}>
        <span style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg, #FF5B00, #FF7A45)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Module Components 模块组件</span>
      </Divider>}

      {/* ========== Module 1: CampaignTable ========== */}
      {show('campaign-table') && <Section title="CampaignTable 嵌套树表格" desc="可展开多层行 · 状态圆点 · 标签 · 进度条 · 迷你折线图">
        <CampaignTableDemo />
      </Section>}

      {/* ========== Module 2: TemplateCard ========== */}
      {show('template-card') && <Section title="TemplateCard 模板卡片" desc="带图片封面 · 标题描述 · 语言标签 · 操作栏">
        <TemplateCardDemo />
      </Section>}

      {/* ========== Module 3: HeatmapCalendar ========== */}
      {show('heatmap') && <Section title="HeatmapCalendar 热力图" desc="按周/小时维度的转化率热力图">
        <HeatmapCalendarDemo />
      </Section>}

      {/* ========== Module 4: StepFormSection ========== */}
      {show('step-form') && <Section title="StepFormSection 分步表单" desc="编号区块头 · 计划卡片 · Radio Card · 虚线添加">
        <StepFormSectionDemo />
      </Section>}

      <Divider />
      <div className="ds-page-footer">
        <Text type="secondary">Klook Workbench · Atomic Design System + Module Components · Built with Ant Design 5.x + Klook-2026 Theme</Text>
      </div>
    </div>
  )
}
