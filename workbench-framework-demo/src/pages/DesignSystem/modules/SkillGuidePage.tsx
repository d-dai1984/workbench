import { Card, Typography, Steps, Tag, Row, Col } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { WORKFLOW_STEPS, PAGE_PATTERNS, PRODUCT_LINES, PRINCIPLES, REFERENCE_FILES } from '../data/skillGuide'
import './SkillGuidePage.css'

const { Title, Text, Paragraph } = Typography

/* ─── Bilingual helper ─── */
function Bi({ en, cn }: { en: string; cn: string }) {
  return <>{en}<Text type="secondary" style={{ fontSize: '0.85em', marginLeft: 6 }}>{cn}</Text></>
}

function BiBlock({ en, cn }: { en: string; cn: string }) {
  return (
    <div>
      <div>{en}</div>
      <Text type="secondary" style={{ fontSize: 12 }}>{cn}</Text>
    </div>
  )
}

/* ─── Component ─── */

export function SkillGuidePage() {
  return (
    <div className="skill-ref-page">

      {/* Header */}
      <div className="skill-guide__header">
        <Title level={3} style={{ margin: 0 }}>
          Design System Skill Guide
          <Text type="secondary" style={{ fontSize: 16, fontWeight: 400, marginLeft: 8 }}>设计系统 Skill 指南</Text>
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          A controlled AI skill for Klook's 2B enterprise design system. It provides structured decision workflows
          for page design, component selection, and design review — working strictly within defined scope.
        </Paragraph>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          面向 Klook 2B 中后台的受控 AI Skill。提供结构化的页面设计、组件选型和设计评审决策流程，严格在已定义范围内工作。
        </Paragraph>
      </div>

      {/* What it does / does NOT */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 16, height: '100%' }} styles={{ body: { padding: 24 } }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <CheckCircleOutlined style={{ color: '#00B33C', fontSize: 18 }} />
              <Text strong style={{ fontSize: 15 }}><Bi en="What it does" cn="能做什么" /></Text>
            </div>
            <ul className="skill-guide__list">
              <li><BiBlock en="Match requirements to standard page patterns" cn="将需求匹配到标准页面模式" /></li>
              <li><BiBlock en="Guide component selection within constraints" cn="在约束内指导组件选型" /></li>
              <li><BiBlock en="Enforce state & feedback design for every page" cn="强制要求每个页面的状态与反馈设计" /></li>
              <li><BiBlock en="Review designs against established rules" cn="按已有规则评审设计方案" /></li>
              <li><BiBlock en="Flag out-of-scope requirements clearly" cn="明确标记超范围需求" /></li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card style={{ borderRadius: 16, height: '100%' }} styles={{ body: { padding: 24 } }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <CloseCircleOutlined style={{ color: '#FF4D4F', fontSize: 18 }} />
              <Text strong style={{ fontSize: 15 }}><Bi en="What it does NOT do" cn="不做什么" /></Text>
            </div>
            <ul className="skill-guide__list">
              <li><BiBlock en="Full Ant Design component encyclopedia" cn="Ant Design 全量组件百科" /></li>
              <li><BiBlock en="Marketing pages, C-end or mobile design" cn="营销页、C 端或移动端设计" /></li>
              <li><BiBlock en="Generic UI inspiration generation" cn="通用 UI 灵感生成" /></li>
              <li><BiBlock en="One-off exceptions packaged as standards" cn="把一次性需求包装成通用规范" /></li>
              <li><BiBlock en="New patterns without governance review" cn="未经治理评估的新模式" /></li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Product Lines */}
      <Card title={<Bi en="Coverage — Product Lines" cn="覆盖范围 — 产品线" />} style={{ borderRadius: 16 }}>
        <Row gutter={16}>
          {PRODUCT_LINES.map((pl) => (
            <Col xs={24} lg={8} key={pl.name}>
              <Card size="small" style={{ borderRadius: 12 }} styles={{ body: { padding: 16 } }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 15 }}><Bi en={pl.name} cn={pl.cn} /></Text>
                  <Tag color={pl.status === 'Active' ? 'green' : 'orange'}>{pl.cnStatus}</Tag>
                </div>
                <Text type="secondary">{pl.users}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{pl.cnUsers}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Page Patterns */}
      <Card title={<Bi en="Coverage — 5 Standard Page Patterns" cn="覆盖范围 — 五种标准页面模式" />} style={{ borderRadius: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PAGE_PATTERNS.map((p) => (
            <div key={p.name} className="skill-guide__pattern-row">
              <Tag color={p.color} style={{ margin: 0, minWidth: 100, textAlign: 'center' }}>
                {p.name}
              </Tag>
              <Text type="secondary" style={{ minWidth: 56 }}>{p.cn}</Text>
              <div style={{ flex: 1 }}>
                <div>{p.desc}</div>
                <Text type="secondary" style={{ fontSize: 12 }}>{p.cnDesc}</Text>
              </div>
              <Text type="secondary">{p.variants} variant{p.variants > 1 ? 's' : ''}</Text>
            </div>
          ))}
          <Text type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
            Total: 5 patterns, 8 variants. Every page must belong to one. See "Page Patterns" in sidebar for visual skeletons.
            <br />共 5 种模式、8 个变体。每个页面必须归属其中一种。可在左侧「Page Patterns」查看骨架预览。
          </Text>
        </div>
      </Card>

      {/* Workflow */}
      <Card title={<Bi en="Decision Workflow" cn="决策流程" />} style={{ borderRadius: 16 }}>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Every task follows this ordered pipeline. Reference files are loaded on-demand, not all at once.
          <br />
          <Text type="secondary" style={{ fontSize: 13 }}>每个任务按以下顺序执行，参考文件按需加载，不预加载全部。</Text>
        </Paragraph>
        <Steps
          direction="vertical"
          size="small"
          current={-1}
          items={WORKFLOW_STEPS.map((s, i) => ({
            title: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Text strong>{`${i + 1}. ${s.title}`}</Text>
                <Text type="secondary" style={{ fontSize: 13 }}>{s.cn}</Text>
                <Tag style={{ fontSize: 11 }}>{s.file}</Tag>
              </div>
            ),
            description: (
              <div>
                <Text type="secondary">{s.desc}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{s.cnDesc}</Text>
              </div>
            ),
          }))}
        />
      </Card>

      {/* Principles */}
      <Card title={<Bi en="Core Principles" cn="核心原则" />} style={{ borderRadius: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
              <Tag color="blue" style={{ flexShrink: 0, margin: 0 }}>{i + 1}</Tag>
              <div>
                <Text strong>{p.rule}</Text>
                <Text type="secondary" style={{ marginLeft: 6, fontSize: 13 }}>{p.cn}</Text>
                <br />
                <Text type="secondary">{p.desc}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{p.cnDesc}</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reference Files */}
      <Card title={<Bi en="Reference Files" cn="参考文件" />} style={{ borderRadius: 16 }}>
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          12 reference files loaded on-demand based on task type. / 12 个参考文件，按任务类型按需加载。
          <br />
          <Text code>skill/klook-2b-design-skill-3.27/references/</Text>
        </Paragraph>
        <Row gutter={[12, 12]}>
          {REFERENCE_FILES.map((r) => (
            <Col xs={24} lg={12} key={r.file}>
              <div className="skill-guide__ref-card">
                <Text code style={{ fontSize: 11 }}>{r.file}</Text>
                <div>
                  <Text strong style={{ fontSize: 13 }}>{r.topic}</Text>
                  <Text type="secondary" style={{ marginLeft: 6, fontSize: 12 }}>{r.cn}</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  When: {r.when} / {r.cnWhen}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Output Format */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card title={<Bi en="Design Output Format" cn="设计输出格式" />} style={{ borderRadius: 16, height: '100%' }}>
            <ol className="skill-guide__ol">
              <li><BiBlock en="Requirement classification" cn="需求归类（scope 内/外）" /></li>
              <li><BiBlock en="Page pattern match" cn="页面模式判断" /></li>
              <li><BiBlock en="Structure proposal" cn="结构方案" /></li>
              <li><BiBlock en="Component selection rationale" cn="组件选型依据" /></li>
              <li><BiBlock en="States & feedback design" cn="状态与反馈补充" /></li>
              <li><BiBlock en="Risks & boundaries" cn="风险与边界" /></li>
            </ol>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Bi en="Review Output Format" cn="评审输出格式" />} style={{ borderRadius: 16, height: '100%' }}>
            <ol className="skill-guide__ol">
              <li><BiBlock en="Pattern match result" cn="是否命中既有模式" /></li>
              <li><BiBlock en="Key issues found" cn="主要问题" /></li>
              <li><BiBlock en="Risk level" cn="风险等级" /></li>
              <li><BiBlock en="Fix recommendations" cn="修正建议" /></li>
              <li><BiBlock en="Out-of-scope flag" cn="是否属于 scope 外需求" /></li>
            </ol>
          </Card>
        </Col>
      </Row>

    </div>
  )
}
