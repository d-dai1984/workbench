import { Row, Col, Button } from 'antd'
import { ArrowLeftOutlined, AppstoreOutlined } from '@ant-design/icons'

export interface GridPageProps {
  onBack?: () => void
}

const BREAKPOINTS = [
  { key: 'xs', min: 0, max: 575, desc: '<576px' },
  { key: 'sm', min: 576, max: 767, desc: '≥576px' },
  { key: 'md', min: 768, max: 991, desc: '≥768px' },
  { key: 'lg', min: 992, max: 1199, desc: '≥992px' },
  { key: 'xl', min: 1200, max: 1599, desc: '≥1200px' },
  { key: 'xxl', min: 1600, max: null, desc: '≥1600px' },
] as const

const GUTTER: [number, number] = [16, 16]

const LAYOUTS = [
  {
    name: '一栏',
    cols: [24],
    desc: '全宽单栏',
    usage: 'Col xs={24} lg={24}',
  },
  {
    name: '两栏（左大右小）',
    cols: [16, 8],
    desc: '16:8 比例，主内容 + 侧边',
    usage: 'Col xs={24} lg={16} / Col xs={24} lg={8}',
  },
  {
    name: '三栏',
    cols: [8, 8, 8],
    desc: '8:8:8 均分',
    usage: 'Col xs={24} lg={8} × 3',
  },
  {
    name: '四栏',
    cols: [6, 6, 6, 6],
    desc: '6:6:6:6 均分',
    usage: 'Col xs={24} lg={6} × 4',
  },
] as const

const GUTTERS = [16, 20, 24] as const

export function GridPage({ onBack }: GridPageProps) {
  return (
    <div className="klook-bench-grid-page">
      <header className="klook-bench-grid-page-header">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} className="klook-bench-grid-page-back">
          Back
        </Button>
        <h1 className="klook-bench-grid-page-title">
          <AppstoreOutlined /> 24 栅格系统 & 布局演示
        </h1>
        <p className="klook-bench-grid-page-desc">24-column grid · AntD breakpoints · min-width 1200px 模拟真实页面</p>
      </header>

      {/* ── Breakpoints ── */}
      <section className="klook-bench-grid-page-section">
        <h2>Breakpoints</h2>
        <table className="klook-bench-grid-page-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Min (px)</th>
              <th>Max (px)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {BREAKPOINTS.map((bp) => (
              <tr key={bp.key}>
                <td><code>{bp.key}</code></td>
                <td>{bp.min}</td>
                <td>{bp.max ?? '∞'}</td>
                <td>{bp.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── 24-column grid ── */}
      <section className="klook-bench-grid-page-section">
        <h2>24-column grid</h2>
        <Row gutter={GUTTER} className="klook-bench-grid-page-24cols">
          {Array.from({ length: 24 }, (_, i) => (
            <Col key={i} span={1}>
              <div className="klook-bench-grid-page-cell">{i + 1}</div>
            </Col>
          ))}
        </Row>
      </section>

      {/* ── Layout 分栏方案 ── */}
      <section className="klook-bench-grid-page-section">
        <h2>分栏方案</h2>
        <table className="klook-bench-grid-page-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>布局</th>
              <th>Col 配置</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {LAYOUTS.map((layout) => (
              <tr key={layout.name}>
                <td><strong>{layout.name}</strong></td>
                <td><code>{layout.usage}</code></td>
                <td>{layout.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {LAYOUTS.map((layout) => (
          <div key={layout.name} className="klook-bench-grid-page-layout-block">
            <div className="klook-bench-grid-page-layout-title">{layout.name}</div>
            <Row gutter={GUTTER} className="klook-bench-grid-page-layout-row">
              {layout.cols.map((span, idx) => (
                <Col key={idx} xs={24} lg={span}>
                  <div className="klook-bench-grid-page-layout-cell">{span} cols</div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </section>

      {/* ── Gutter comparison ── */}
      <section className="klook-bench-grid-page-section">
        <h2>Gutter 间距对比</h2>
        <div className="klook-bench-grid-page-gutters">
          {GUTTERS.map((g) => (
            <div key={g} className="klook-bench-grid-page-gutter-block">
              <div className="klook-bench-grid-page-gutter-label">gutter [{g}, {g}]</div>
              <Row gutter={[g, g]}>
                <Col span={12}><div className="klook-bench-grid-page-gutter-cell">12</div></Col>
                <Col span={12}><div className="klook-bench-grid-page-gutter-cell">12</div></Col>
              </Row>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
