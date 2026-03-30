import { Row, Col, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

export interface GridLayoutDemoPageProps {
  onBack?: () => void
}

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

export function GridLayoutDemoPage({ onBack }: GridLayoutDemoPageProps) {
  return (
    <div className="klook-bench-grid-layout-demo">
      <header className="klook-bench-grid-layout-demo-header">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={onBack} className="klook-bench-grid-layout-demo-back">
          Back
        </Button>
        <h1 className="klook-bench-grid-layout-demo-title">24 栅格分栏演示</h1>
        <p className="klook-bench-grid-layout-demo-desc">一栏 / 两栏(左大右小) / 三栏 / 四栏均分</p>
      </header>

      <section className="klook-bench-grid-layout-demo-scheme">
        <h2>栅格方案</h2>
        <table className="klook-bench-grid-layout-demo-table">
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
      </section>

      <section className="klook-bench-grid-layout-demo-preview">
        <h2>布局预览</h2>
        {LAYOUTS.map((layout) => (
          <div key={layout.name} className="klook-bench-grid-layout-demo-block">
            <div className="klook-bench-grid-layout-demo-block-title">{layout.name}</div>
            <Row gutter={GUTTER} className="klook-bench-grid-layout-demo-row">
              {layout.cols.map((span, idx) => (
                <Col key={idx} xs={24} lg={span}>
                  <div className="klook-bench-grid-layout-demo-cell">
                    {span} cols
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </section>
    </div>
  )
}
