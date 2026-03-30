import { Typography, Divider, Space, Tag, theme } from 'antd'
import './DesignSystemOverview.css'

const { Title, Text, Paragraph } = Typography

const themeConfig: Record<string, {
  name: string
  subtitle: string
  primaryColors: { hex: string; label: string; isPrimary?: boolean }[]
  semanticColors: { hex: string; label: string }[]
}> = {
  klook: {
    name: 'Klook Bench 2026 - Orange',
    subtitle: 'B 端 Workbench 设计规范 · 基于 Ant Design 5.x · 主题色：Klook 品牌橙',
    primaryColors: [
      { hex: '#FFF2E8', label: 'Primary BG' },
      { hex: '#FFD8BF', label: 'BG Hover' },
      { hex: '#FFBB96', label: 'Border' },
      { hex: '#FF8C4D', label: 'Border Hover' },
      { hex: '#FF7A45', label: 'Hover' },
      { hex: '#FF5B00', label: 'Primary', isPrimary: true },
      { hex: '#D4380D', label: 'Active' },
    ],
    semanticColors: [
      { hex: '#00B33C', label: 'Success' },
      { hex: '#FFB800', label: 'Warning' },
      { hex: '#FF4D4F', label: 'Error' },
      { hex: '#1E90FF', label: 'Info' },
    ],
  },
  bench: {
    name: 'Klook Bench 2026 - Blue',
    subtitle: 'B 端 Workbench 设计规范 · 基于 Ant Design 5.x · 主题色：Klook Bench 蓝',
    primaryColors: [
      { hex: '#E6F4FF', label: 'Primary BG' },
      { hex: '#BAE0FF', label: 'BG Hover' },
      { hex: '#91CAFF', label: 'Border' },
      { hex: '#69B1FF', label: 'Border Hover' },
      { hex: '#4096FF', label: 'Hover' },
      { hex: '#1677FF', label: 'Primary', isPrimary: true },
      { hex: '#0958D9', label: 'Active' },
    ],
    semanticColors: [
      { hex: '#52C41A', label: 'Success' },
      { hex: '#FAAD14', label: 'Warning' },
      { hex: '#FF4D4F', label: 'Error' },
      { hex: '#1677FF', label: 'Info' },
    ],
  },
  antd: {
    name: 'AntD Default',
    subtitle: 'Ant Design 5.x 默认主题 · 标准蓝色主题色',
    primaryColors: [
      { hex: '#E6F4FF', label: 'Primary BG' },
      { hex: '#BAE0FF', label: 'BG Hover' },
      { hex: '#91CAFF', label: 'Border' },
      { hex: '#69B1FF', label: 'Border Hover' },
      { hex: '#4096FF', label: 'Hover' },
      { hex: '#1677FF', label: 'Primary', isPrimary: true },
      { hex: '#0958D9', label: 'Active' },
    ],
    semanticColors: [
      { hex: '#52C41A', label: 'Success' },
      { hex: '#FAAD14', label: 'Warning' },
      { hex: '#FF4D4F', label: 'Error' },
      { hex: '#1677FF', label: 'Info' },
    ],
  },
}

interface Props {
  activeTheme?: string
}

export function DesignSystemOverview({ activeTheme = 'klook' }: Props) {
  const { token } = theme.useToken()
  const config = themeConfig[activeTheme] ?? themeConfig.klook
  const { name, subtitle, primaryColors, semanticColors } = config

  return (
    <div className="dso-page">
      <div className="dso-hero">
        <h1
          className="dso-hero-title"
          style={{
            fontSize: token.fontSizeHeading1,
            fontWeight: token.fontWeightStrong,
            color: token.colorPrimary,
          }}
        >
          {name} Design System
        </h1>
        <p className="dso-hero-subtitle">{subtitle}</p>
      </div>

      {/* Design Principles */}
      <section className="dso-section">
        <Title level={4}>Design Principles</Title>
        <div className="dso-principles">
          {[
            { emoji: '🔍', title: '清晰', desc: '信息层级分明，操作路径明确' },
            { emoji: '⚡', title: '高效', desc: '减少认知负担，常用操作一步到位' },
            { emoji: '🔗', title: '一致', desc: '所有页面使用相同组件、间距、色值' },
            { emoji: '💼', title: '专业', desc: 'B 端工具感，克制使用装饰元素' },
          ].map(p => (
            <div key={p.title} className="dso-principle-card">
              <span className="dso-principle-emoji">{p.emoji}</span>
              <strong>{p.title}</strong>
              <Text type="secondary">{p.desc}</Text>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Color System */}
      <section className="dso-section">
        <Title level={4}>Color System</Title>
        <Paragraph type="secondary">主题色基于 Klook 品牌橙，语义色用于状态反馈。所有颜色通过 CSS 变量或 AntD token 引用。</Paragraph>

        <Text strong style={{ display: 'block', marginBottom: 12 }}>Primary 色阶</Text>
        <div className="dso-color-row">
          {primaryColors.map(c => (
            <div key={c.hex} className={`dso-swatch ${c.isPrimary ? 'dso-swatch--primary' : ''}`}
              style={{ background: c.hex, color: ['#FFF2E8', '#FFD8BF', '#FFBB96'].includes(c.hex) ? '#666' : '#fff' }}>
              <span className="dso-swatch-label">{c.label}</span>
              <span className="dso-swatch-hex">{c.hex}</span>
            </div>
          ))}
        </div>

        <Text strong style={{ display: 'block', margin: '20px 0 12px' }}>Semantic 语义色</Text>
        <div className="dso-color-row">
          {semanticColors.map(c => (
            <div key={c.hex} className="dso-swatch" style={{ background: c.hex, color: '#fff' }}>
              <span className="dso-swatch-label">{c.label}</span>
              <span className="dso-swatch-hex">{c.hex}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Typography */}
      <section className="dso-section">
        <Title level={4}>Typography</Title>
        <div className="dso-token-table">
          <div className="dso-token-row dso-token-row--header">
            <span>场景</span><span>组件</span><span>尺寸</span><span>字重</span>
          </div>
          {[
            ['页面标题', 'Title level={2}', '30px', '700'],
            ['区块标题', 'Title level={4}', '20px', '600'],
            ['卡片标题', 'Title level={5}', '16px', '600'],
            ['正文', 'Text', '14px', '400'],
            ['辅助文字', 'Text type="secondary"', '13-14px', '400'],
            ['标签/注释', 'custom', '12px', '400'],
          ].map(([scene, comp, size, weight]) => (
            <div key={scene} className="dso-token-row">
              <span>{scene}</span><Tag>{comp}</Tag><span>{size}</span><span>{weight}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Spacing & Layout */}
      <section className="dso-section">
        <Title level={4}>Spacing & Layout</Title>
        <Paragraph type="secondary">基于 <strong>8px grid</strong>，所有间距必须是 4 的倍数。</Paragraph>
        <div className="dso-spacing-row">
          {[
            { name: 'xs', val: 4 }, { name: 'sm', val: 8 }, { name: 'md', val: 16 },
            { name: 'lg', val: 24 }, { name: 'xl', val: 32 }, { name: 'xxl', val: 48 },
          ].map(s => (
            <div key={s.name} className="dso-spacing-item">
              <div className="dso-spacing-bar" style={{ width: s.val * 2, height: s.val * 2 }} />
              <Text strong>{s.name}</Text>
              <Text type="secondary">{s.val}px</Text>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Border & Radius */}
      <section className="dso-section">
        <Title level={4}>Border & Radius</Title>
        <Space size={16} wrap>
          {[
            { label: 'Tag', r: 4 }, { label: 'Button / Input', r: 6 }, { label: 'Card / Modal', r: 8 },
          ].map(b => (
            <div key={b.label} className="dso-radius-demo" style={{ borderRadius: b.r }}>
              <Text strong>{b.r}px</Text>
              <Text type="secondary">{b.label}</Text>
            </div>
          ))}
        </Space>
      </section>

      <Divider />

      {/* Component Rules: Do / Don't */}
      <section className="dso-section">
        <Title level={4}>Do / Don't</Title>
        <div className="dso-dodont">
          <div className="dso-do">
            <div className="dso-dodont-header dso-dodont-header--do">✅ Do</div>
            <ul>
              <li>用 AntD 组件，不自己写原生控件</li>
              <li>用 CSS 变量引用颜色</li>
              <li>遵循 8px grid 间距</li>
              <li>用 <code>Space</code> 组件排列元素</li>
              <li>状态文字 + 圆点表示状态</li>
              <li>表单 Label 带帮助文字</li>
              <li>加载态用 Skeleton</li>
            </ul>
          </div>
          <div className="dso-dont">
            <div className="dso-dodont-header dso-dodont-header--dont">❌ Don't</div>
            <ul>
              <li>自己写原生 HTML 控件</li>
              <li>硬编码 hex 色值</li>
              <li>随意使用 margin / padding</li>
              <li>手动设 margin 排列元素</li>
              <li>全色背景 Tag 表示状态</li>
              <li>仅用 placeholder 说明字段</li>
              <li>白屏等待无加载态</li>
            </ul>
          </div>
        </div>
      </section>

      <Divider />

      {/* Code Patterns */}
      <section className="dso-section">
        <Title level={4}>Code Patterns</Title>
        <div className="dso-code-block">
          <div className="dso-code-label">Import 约定</div>
          <pre><code>{`// ✅ 从 antd 统一导入
import { Button, Input, Select, Table } from 'antd'

// ✅ 图标从 @ant-design/icons 导入
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

// ✅ 主题从 shell/theme 导入
import { klook2026Theme, klookBench2026Theme, ThemeSync } from '@/shell/theme'`}</code></pre>
        </div>
        <div className="dso-code-block">
          <div className="dso-code-label">样式约定</div>
          <pre><code>{`// ✅ 使用 CSS 变量
color: var(--klook-bench-color-primary);
background: var(--klook-bench-color-bg-layout);

// ✅ 使用 AntD token
const { token } = theme.useToken()
<div style={{ color: token.colorPrimary }}>`}</code></pre>
        </div>
      </section>

      <div className="dso-footer">
        <Text type="secondary">点击左侧导航查看各组件的具体 Demo 和可复制代码</Text>
      </div>
    </div>
  )
}
