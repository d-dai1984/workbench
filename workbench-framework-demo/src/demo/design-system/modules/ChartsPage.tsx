import { Card, Typography, Row, Col, Table, Tag } from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  DashboardOutlined,
  DotChartOutlined,
  HeatMapOutlined,
} from '@ant-design/icons'
import { CATEGORY_DATA, LOW_FREQ, RELATION_CHARTS, SIZE_SPECS, PROHIBITIONS } from '../data/charts'

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

const CATEGORY_COLUMNS = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text: string, record: (typeof CATEGORY_DATA)[number]) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 4, height: 20, borderRadius: 2, background: record.color }} />
        <div>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>{record.categoryCn}</Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Charts',
    dataIndex: 'charts',
    key: 'charts',
    render: (text: string) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {text.split(', ').map((c) => (
          <Tag key={c} style={{ margin: 0 }}>{c}</Tag>
        ))}
      </div>
    ),
  },
  {
    title: 'Usage',
    dataIndex: 'usage',
    key: 'usage',
    render: (text: string, record: (typeof CATEGORY_DATA)[number]) => (
      <div>
        <div style={{ fontSize: 13 }}>{text}</div>
        <Text type="secondary" style={{ fontSize: 12 }}>{record.usageCn}</Text>
      </div>
    ),
  },
]

const HIGH_FREQ = [
  { name: 'Line', cn: '折线图', desc: 'Time series trends, metric monitoring', descCn: '时序趋势、指标监控', icon: <LineChartOutlined /> },
  { name: 'Column', cn: '柱状图', desc: 'Category comparison, period comparison', descCn: '分类对比、周期对比', icon: <BarChartOutlined /> },
  { name: 'Bar', cn: '条形图', desc: 'Horizontal comparison, ranking display', descCn: '水平比较、排名展示', icon: <BarChartOutlined style={{ transform: 'rotate(90deg)' }} /> },
  { name: 'Area', cn: '面积图', desc: 'Stacked trends, cumulative values', descCn: '堆叠趋势、累计值', icon: <AreaChartOutlined /> },
  { name: 'Pie', cn: '饼图', desc: 'Proportion display (max 6 categories)', descCn: '占比展示（最多 6 个分类）', icon: <PieChartOutlined /> },
  { name: 'DualAxes', cn: '双轴图', desc: 'Two metrics with different scales', descCn: '两个不同量级的指标', icon: <FundOutlined /> },
  { name: 'Funnel', cn: '漏斗图', desc: 'Conversion stages, drop-off analysis', descCn: '转化阶段、流失分析', icon: <DotChartOutlined /> },
  { name: 'Gauge', cn: '仪表盘', desc: 'Single metric progress, KPI', descCn: '单指标进度、KPI', icon: <DashboardOutlined /> },
]

/* ─── Component ─── */

export function ChartsPage() {
  return (
    <div className="skill-ref-page">
      {/* Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          Chart Specifications
          <Text type="secondary" style={{ fontSize: 16, fontWeight: 400, marginLeft: 8 }}>
            图表规范
          </Text>
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          Standards for data visualization: chart selection, sizing, color
          rules, and usage constraints for @ant-design/charts.
        </Paragraph>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          数据可视化标准：图表选型、尺寸、颜色规则和 @ant-design/charts 使用约束。
        </Paragraph>
      </div>

      {/* Package Structure */}
      <Card
        title={<Bi en="Package Structure" cn="包结构" />}
        style={{ borderRadius: 16 }}
      >
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(22, 119, 255, 0.06)',
            fontFamily: 'monospace',
            fontSize: 13,
            lineHeight: 2,
          }}
        >
          <div>
            <Text strong>@ant-design/charts</Text>
            <Text type="secondary"> (umbrella package)</Text>
          </div>
          <div style={{ paddingLeft: 24 }}>
            <Text>@ant-design/plots</Text>
            <Text type="secondary"> — Line, Column, Bar, Pie, Area, Funnel, Gauge...</Text>
          </div>
          <div style={{ paddingLeft: 24 }}>
            <Text>@ant-design/graphs</Text>
            <Text type="secondary"> — NetworkGraph, MindMap, FlowGraph, OrganizationChart...</Text>
          </div>
        </div>
      </Card>

      {/* Selection Decision */}
      <Card
        title={<Bi en="Chart Selection Decision" cn="图表选型决策" />}
        style={{ borderRadius: 16 }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 10,
            background: 'rgba(22, 119, 255, 0.04)',
            border: '1px solid rgba(22, 119, 255, 0.15)',
            marginBottom: 16,
          }}
        >
          <Text strong style={{ fontSize: 15 }}>
            Ask: "What data relationship do I need to show?"
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: 13 }}>
            Not: "What chart looks cool?"
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            问：「我需要展示什么数据关系？」而不是「什么图表好看？」
          </Text>
        </div>
        <Table
          dataSource={CATEGORY_DATA}
          columns={CATEGORY_COLUMNS}
          pagination={false}
          size="small"
        />
      </Card>

      {/* High Frequency Charts */}
      <Card
        title={<Bi en="High Frequency Charts" cn="高频图表" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={[12, 12]}>
          {HIGH_FREQ.map((chart) => (
            <Col xs={24} lg={12} key={chart.name}>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#E6F4FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    color: '#1677FF',
                    flexShrink: 0,
                  }}
                >
                  {chart.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <Text strong>{chart.name}</Text>
                  <Text type="secondary" style={{ fontSize: 12, marginLeft: 6 }}>
                    {chart.cn}
                  </Text>
                  <div style={{ marginTop: 4 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {chart.desc}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {chart.descCn}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Low Frequency & Relation */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Low Frequency Charts" cn="低频图表" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LOW_FREQ.map((c) => (
                <div
                  key={c.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <div>
                    <Text strong style={{ fontSize: 13 }}>{c.name}</Text>
                    <Text type="secondary" style={{ fontSize: 12, marginLeft: 6 }}>
                      {c.cn}
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>{c.use}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>{c.useCn}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Relation Graphs" cn="关系图" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <Paragraph type="secondary" style={{ marginBottom: 12 }}>
              From @ant-design/graphs. For showing entity relationships and hierarchies.
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                来自 @ant-design/graphs。用于展示实体关系和层级结构。
              </Text>
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {RELATION_CHARTS.map((c) => (
                <div
                  key={c.name}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <HeatMapOutlined style={{ color: '#52C41A' }} />
                  <Text strong style={{ fontSize: 13 }}>{c.name}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{c.cn}</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Size Specs & Color Rules */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Size Specifications" cn="尺寸规范" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SIZE_SPECS.map((s) => (
                <div
                  key={s.context}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div>
                    <Text style={{ fontSize: 13 }}>{s.context}</Text>
                    <Text type="secondary" style={{ fontSize: 12, marginLeft: 6 }}>
                      {s.contextCn}
                    </Text>
                  </div>
                  <Tag color="blue">{s.height}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Color Rules" cn="颜色规则" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>1</Tag>
                <BiBlock
                  en="Single series: use brand primary #1677FF"
                  cn="单系列：使用品牌主色 #1677FF"
                />
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>2</Tag>
                <BiBlock
                  en="Multi-series: use brand palette, max 6 colors"
                  cn="多系列：使用品牌色板，最多 6 种颜色"
                />
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>3</Tag>
                <BiBlock
                  en="Semantic colors for status: success/warning/error"
                  cn="语义色用于状态：成功/警告/错误"
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {['#1677FF', '#13C2C2', '#722ED1', '#EB2F96', '#FA8C16', '#52C41A'].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: c,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: 2,
                    }}
                  >
                    <Text style={{ fontSize: 8, color: '#fff' }}>{c}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Prohibitions */}
      <Card
        title={<Bi en="Prohibitions" cn="禁止项" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROHIBITIONS.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(255, 77, 79, 0.04)',
                border: '1px solid rgba(255, 77, 79, 0.12)',
              }}
            >
              <CloseCircleOutlined style={{ color: '#FF4D4F', marginTop: 3 }} />
              <BiBlock en={p.en} cn={p.cn} />
            </div>
          ))}
        </div>
      </Card>

      {/* Brand Token Alignment */}
      <Card
        title={<Bi en="Brand Token Alignment" cn="品牌令牌对齐" />}
        style={{ borderRadius: 16 }}
      >
        <Paragraph type="secondary" style={{ marginBottom: 12 }}>
          Always align chart theme with the brand token system.
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            图表主题始终与品牌令牌系统对齐。
          </Text>
        </Paragraph>
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 10,
            background: 'rgba(0, 0, 0, 0.02)',
            fontFamily: 'monospace',
            fontSize: 13,
            lineHeight: 1.8,
            overflow: 'auto',
          }}
        >
          <div style={{ color: 'rgba(0,0,0,0.45)' }}>{'// Chart theme aligned with brand tokens'}</div>
          <div>{'const chartTheme = {'}</div>
          <div style={{ paddingLeft: 16 }}>{'color: token.colorPrimary,         // #1677FF'}</div>
          <div style={{ paddingLeft: 16 }}>{'colorPalette: ['}</div>
          <div style={{ paddingLeft: 32 }}>{"'#1677FF', '#13C2C2', '#722ED1',"}</div>
          <div style={{ paddingLeft: 32 }}>{"'#EB2F96', '#FA8C16', '#52C41A',"}</div>
          <div style={{ paddingLeft: 16 }}>{'],'}</div>
          <div style={{ paddingLeft: 16 }}>{'fontFamily: token.fontFamily,'}</div>
          <div style={{ paddingLeft: 16 }}>{'fontSize: token.fontSize,          // 14'}</div>
          <div style={{ paddingLeft: 16 }}>{'axisColor: token.colorTextTertiary,'}</div>
          <div>{'};'}</div>
        </div>
      </Card>
    </div>
  )
}
