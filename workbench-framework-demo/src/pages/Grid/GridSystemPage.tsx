import { Row, Col, Button } from 'antd'
import { ArrowLeftOutlined, AppstoreOutlined } from '@ant-design/icons'

export interface GridSystemPageProps {
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

const LAYOUT_EXAMPLES: Array<{ name: string; cols: number[]; gutter: [number, number]; usage: string }> = [
  { name: 'Welcome', cols: [16, 8], gutter: [16, 16], usage: 'Col xs={24} lg={16} / Col xs={24} lg={8}' },
  { name: 'Top Overview', cols: [7, 10, 7], gutter: [20, 20], usage: 'Col xs={24} lg={7|10|7}' },
  { name: 'Todo split', cols: [16, 8], gutter: [16, 16], usage: 'Col xs={24} lg={16} / Col xs={24} lg={8}' },
]

const GUTTERS = [16, 20, 24] as const

export function GridSystemPage({ onBack }: GridSystemPageProps) {
  return (
    <div className="klook-bench-grid-system-page">
      <header className="klook-bench-grid-system-header">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} className="klook-bench-grid-system-back">
          Back
        </Button>
        <h1 className="klook-bench-grid-system-title">
          <AppstoreOutlined /> Grid System
        </h1>
        <p className="klook-bench-grid-system-desc">24-column grid, Ant Design breakpoints</p>
      </header>

      <section className="klook-bench-grid-system-section">
        <h2>Breakpoints</h2>
        <table className="klook-bench-grid-system-table">
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

      <section className="klook-bench-grid-system-section">
        <h2>24-column grid</h2>
        <Row gutter={[8, 8]} className="klook-bench-grid-system-24cols">
          {Array.from({ length: 24 }, (_, i) => (
            <Col key={i} span={1}>
              <div className="klook-bench-grid-system-cell">{i + 1}</div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="klook-bench-grid-system-section">
        <h2>Common layouts</h2>
        {LAYOUT_EXAMPLES.map((ex) => (
          <div key={ex.name} className="klook-bench-grid-system-layout-block">
            <div className="klook-bench-grid-system-layout-meta">
              <strong>{ex.name}</strong> — gutter {ex.gutter.join('×')}
              <code className="klook-bench-grid-system-code-inline">{ex.usage}</code>
            </div>
            <Row gutter={ex.gutter} className="klook-bench-grid-system-layout-row">
              {ex.cols.map((span, idx) => (
                <Col key={idx} xs={24} lg={span}>
                  <div className="klook-bench-grid-system-layout-cell">{span} cols</div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </section>

      <section className="klook-bench-grid-system-section">
        <h2>Gutter comparison</h2>
        <div className="klook-bench-grid-system-gutters">
          {GUTTERS.map((g) => (
            <div key={g} className="klook-bench-grid-system-gutter-block">
              <div className="klook-bench-grid-system-gutter-label">gutter [{g}, {g}]</div>
              <Row gutter={[g, g]}>
                <Col span={12}><div className="klook-bench-grid-system-gutter-cell">12</div></Col>
                <Col span={12}><div className="klook-bench-grid-system-gutter-cell">12</div></Col>
              </Row>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
