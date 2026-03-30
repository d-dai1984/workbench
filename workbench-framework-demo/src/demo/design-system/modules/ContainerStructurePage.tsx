import { Card, Typography, Tag, Row, Col, Divider } from 'antd'
import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import {
  LEVELS, L1_CONDITIONS, L2_CONDITIONS, TITLE_RULES,
  SUBORDINATE_METHODS, DIVIDER_RULES, EXAMPLE_TREE, DECISION_PATHS,
} from '../data/containerStructure'

const { Title, Text, Paragraph } = Typography

function Bi({ en, cn }: { en: string; cn: string }) {
  return <>{en}<Text type="secondary" style={{ fontSize: '0.85em', marginLeft: 6 }}>{cn}</Text></>
}

/* ─── Skeleton diagram blocks ─── */

function SkeletonBlock({ w = '100%', h = 14, color = 'rgba(0,0,0,0.06)', r = 4 }: {
  w?: string | number; h?: number; color?: string; r?: number
}) {
  return <div style={{ width: w, height: h, borderRadius: r, background: color, flexShrink: 0 }} />
}

function SimpleSectionDiagram() {
  return (
    <div style={{ padding: 20, background: '#fafafa', borderRadius: 12 }}>
      {/* L1 title outside */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Tag color="blue">L1</Tag>
        <SkeletonBlock w={120} h={16} />
        <div style={{ marginLeft: 'auto' }}><Text type="secondary" style={{ fontSize: 11 }}>▲ collapse</Text></div>
      </div>
      {/* L1 container */}
      <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 24 }}>
        {/* L3 group 1 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
            <SkeletonBlock w={80} h={12} />
          </div>
          <Row gutter={12}>
            <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
            <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
          </Row>
        </div>
        {/* L3 group 2 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
            <SkeletonBlock w={90} h={12} />
          </div>
          <Row gutter={12}>
            <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
            <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
          </Row>
        </div>
      </div>
      <Text type="secondary" style={{ fontSize: 11, marginTop: 8, display: 'block' }}>
        Nesting: L1 → L3 (max 2 levels) / 嵌套：L1 → L3（最大 2 层）
      </Text>
    </div>
  )
}

function InstanceSectionDiagram() {
  return (
    <div style={{ padding: 20, background: '#fafafa', borderRadius: 12 }}>
      {/* L1 title outside */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Tag color="blue">L1</Tag>
        <SkeletonBlock w={140} h={16} />
        <div style={{ marginLeft: 'auto' }}><Text type="secondary" style={{ fontSize: 11 }}>▲ collapse</Text></div>
      </div>
      {/* L1 container */}
      <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* L2 card expanded */}
        <div style={{ border: '1px solid #e8e8e8', borderRadius: 12, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Tag color="green" style={{ fontSize: 10 }}>L2</Tag>
            <SkeletonBlock w={100} h={12} />
            <Text type="secondary" style={{ fontSize: 10, marginLeft: 4 }}>ID: 001 · Active</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
            <SkeletonBlock w={70} h={10} />
          </div>
          <Row gutter={12}>
            <Col span={12}><SkeletonBlock w="100%" h={28} color="rgba(0,0,0,0.03)" r={6} /></Col>
            <Col span={12}><SkeletonBlock w="100%" h={28} color="rgba(0,0,0,0.03)" r={6} /></Col>
          </Row>
        </div>
        {/* L2 card collapsed */}
        <div style={{ border: '1px solid #e8e8e8', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tag color="green" style={{ fontSize: 10 }}>L2</Tag>
          <SkeletonBlock w={100} h={12} />
          <Text type="secondary" style={{ fontSize: 10, marginLeft: 4 }}>ID: 002 · Draft</Text>
          <div style={{ marginLeft: 'auto' }}><Text type="secondary" style={{ fontSize: 11 }}>▼</Text></div>
        </div>
        {/* L2 card collapsed */}
        <div style={{ border: '1px solid #e8e8e8', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tag color="green" style={{ fontSize: 10 }}>L2</Tag>
          <SkeletonBlock w={100} h={12} />
          <Text type="secondary" style={{ fontSize: 10, marginLeft: 4 }}>ID: 003 · Draft</Text>
          <div style={{ marginLeft: 'auto' }}><Text type="secondary" style={{ fontSize: 11 }}>▼</Text></div>
        </div>
      </div>
      <Text type="secondary" style={{ fontSize: 11, marginTop: 8, display: 'block' }}>
        Nesting: L1 → L2 → L3 (max 3 levels) / 嵌套：L1 → L2 → L3（最大 3 层）
      </Text>
    </div>
  )
}

/* ─── Main ─── */

export function ContainerStructurePage() {
  return (
    <div className="skill-ref-page">

      <div>
        <Title level={3} style={{ margin: 0 }}>
          <Bi en="Container Structure (L1 / L2 / L3)" cn="页面内容容器结构" />
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          Three-level container hierarchy for page content. Max nesting depth: 3 layers.
        </Paragraph>
        <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 13 }}>
          页面内容区三级容器层级体系，最大嵌套不超过 3 层。容器的一致性是规则的一致性，不是外观的一致性。
        </Paragraph>
      </div>

      {/* Decision Paths */}
      <Card title={<Bi en="Pre-requisite: Decision Paths" cn="前置依赖：判断路径" />} style={{ borderRadius: 16 }}>
        <Row gutter={16}>
          {DECISION_PATHS.map((p) => (
            <Col xs={24} lg={12} key={p.path}>
              <div style={{
                padding: 16, borderRadius: 12, height: '100%',
                background: p.path === 'A' ? 'rgba(22,119,255,0.04)' : 'rgba(0,0,0,0.02)',
                border: p.path === 'A' ? '1px solid rgba(22,119,255,0.15)' : '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Tag color={p.path === 'A' ? 'blue' : 'default'}>Path {p.path}</Tag>
                  <Text strong>{p.name}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{p.cn}</Text>
                </div>
                <Text>{p.steps}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{p.stepsCn}</Text>
              </div>
            </Col>
          ))}
        </Row>
        <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
          Path A takes priority. When PRD conflicts with identification criteria, follow PRD but flag the conflict.
          <br />路径 A 优先。PRD 层级信息与识别条件冲突时，以 PRD 为准，但标注冲突点。
        </Paragraph>
      </Card>

      {/* Three Levels — rendered with real tokens */}
      <Card title={<Bi en="Three-Level Hierarchy" cn="三级容器层级" />} style={{ borderRadius: 16 }}>
        <Paragraph type="secondary" style={{ marginBottom: 20 }}>
          Live preview using actual design tokens. / 使用真实设计 Token 渲染的实时预览。
        </Paragraph>

        <div style={{ background: 'var(--klook-bench-color-bg-content, #F5F5F5)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* L1 Section — Simple (no cards) */}
          <div>
            {/* L1 title OUTSIDE container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Tag color="blue" style={{ fontWeight: 700, fontSize: 11 }}>L1</Tag>
              <Title level={5} style={{ margin: 0, fontSize: 20 }}>Display Strategy</Title>
              <Text type="secondary" style={{ fontSize: 12 }}>Heading/3 · title outside container / 标题在容器外</Text>
              <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 12, cursor: 'pointer' }}>▲</Text>
            </div>
            {/* L1 container: ColorBgBase, 1px colorSplit, borderRadiusLG 16px, padding 32px */}
            <div style={{
              background: 'var(--klook-bench-color-bg-card, #FFFFFF)',
              border: '1px solid var(--klook-bench-color-border-light, #EEEFF1)',
              borderRadius: 'var(--klook-bench-radius-lg, 16px)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>
              {/* L3 Field Group 1 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
                  <Text strong>Calendar Merge</Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>Base/Strong · no container / 无独立容器</Text>
                </div>
                <Row gutter={16}>
                  <Col span={12}><SkeletonBlock w="100%" h={36} color="rgba(0,0,0,0.03)" r={6} /></Col>
                  <Col span={12}><SkeletonBlock w="100%" h={36} color="rgba(0,0,0,0.03)" r={6} /></Col>
                </Row>
              </div>
              {/* L3 Field Group 2 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
                  <Text strong>Display Placement</Text>
                </div>
                <Row gutter={16}>
                  <Col span={12}><SkeletonBlock w="100%" h={36} color="rgba(0,0,0,0.03)" r={6} /></Col>
                  <Col span={12}><SkeletonBlock w="100%" h={36} color="rgba(0,0,0,0.03)" r={6} /></Col>
                </Row>
              </div>
            </div>
            <Text type="secondary" style={{ fontSize: 11, marginTop: 6, display: 'block' }}>
              L1 → L3 (max 2 levels) · padding 32px · gap 32px between sections
            </Text>
          </div>

          {/* L1 Section — With L2 Cards (instances) */}
          <div>
            {/* L1 title OUTSIDE container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Tag color="blue" style={{ fontWeight: 700, fontSize: 11 }}>L1</Tag>
              <Title level={5} style={{ margin: 0, fontSize: 20 }}>Selling & Fulfilment Strategy</Title>
              <Text type="secondary" style={{ fontSize: 12 }}>multi-instance / 多实例</Text>
              <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 12, cursor: 'pointer' }}>▲</Text>
            </div>
            {/* L1 container */}
            <div style={{
              background: 'var(--klook-bench-color-bg-card, #FFFFFF)',
              border: '1px solid var(--klook-bench-color-border-light, #EEEFF1)',
              borderRadius: 'var(--klook-bench-radius-lg, 16px)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              {/* L2 Card — expanded */}
              <div style={{
                border: '1px solid var(--klook-bench-color-border, #D9D9D9)',
                borderRadius: 12,
                padding: 20,
              }}>
                {/* L2 title INSIDE container */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <Tag color="green" style={{ fontWeight: 700, fontSize: 11 }}>L2</Tag>
                  <Text strong style={{ fontSize: 16 }}>Combo SKU #1</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Adult Ticket</Text>
                  <Tag style={{ marginLeft: 4 }}>ID: SKU-001</Tag>
                  <Tag color="green">Active</Tag>
                  <Text type="secondary" style={{ fontSize: 11 }}>Heading/5 · title inside / 标题在容器内</Text>
                  <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 12, cursor: 'pointer' }}>▲</Text>
                </div>
                {/* L3 inside L2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
                      <Text strong>Selling Strategy</Text>
                    </div>
                    <Row gutter={16}>
                      <Col span={8}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
                      <Col span={8}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
                      <Col span={8}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
                    </Row>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
                      <Text strong>Fulfilment Strategy</Text>
                    </div>
                    <Row gutter={16}>
                      <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
                      <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
                    </Row>
                  </div>
                </div>
              </div>

              {/* L2 Card — collapsed */}
              <div style={{
                border: '1px solid var(--klook-bench-color-border, #D9D9D9)',
                borderRadius: 12,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <Tag color="green" style={{ fontWeight: 700, fontSize: 11 }}>L2</Tag>
                <Text strong>Combo SKU #2</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>Child Ticket</Text>
                <Tag>ID: SKU-002</Tag>
                <Tag color="default">Draft</Tag>
                <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 12, cursor: 'pointer' }}>▼</Text>
              </div>

              {/* L2 Card — collapsed */}
              <div style={{
                border: '1px solid var(--klook-bench-color-border, #D9D9D9)',
                borderRadius: 12,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <Tag color="green" style={{ fontWeight: 700, fontSize: 11 }}>L2</Tag>
                <Text strong>Combo SKU #3</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>Senior Ticket</Text>
                <Tag>ID: SKU-003</Tag>
                <Tag color="default">Draft</Tag>
                <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 12, cursor: 'pointer' }}>▼</Text>
              </div>
            </div>
            <Text type="secondary" style={{ fontSize: 11, marginTop: 6, display: 'block' }}>
              L1 → L2 → L3 (max 3 levels) · L2 bordered with collapse · L3 bold text only
            </Text>
          </div>

        </div>

        {/* Token reference */}
        <Divider style={{ margin: '20px 0 12px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'L1 Container', tokens: 'ColorBgBase · 1px colorSplit · borderRadiusLG (16px) · padding 32px' },
            { label: 'L2 Card', tokens: '1px colorBorder · borderRadius 12px · padding 20px' },
            { label: 'L3 Field Group', tokens: 'No container · Base/Strong title · spacing only' },
          ].map((t) => (
            <div key={t.label} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.02)', fontSize: 12 }}>
              <Text strong style={{ fontSize: 12 }}>{t.label}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 11 }}>{t.tokens}</Text>
            </div>
          ))}
        </div>
      </Card>

      {/* L1 Identification */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card title={<Bi en="L1 Identification (any 2 of 4)" cn="L1 识别条件（满足任意两条）" />} style={{ borderRadius: 16, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {L1_CONDITIONS.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <CheckCircleOutlined style={{ color: '#1677FF', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <Text>{c.en}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{c.cn}</Text>
                  </div>
                </div>
              ))}
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <InfoCircleOutlined style={{ color: '#FAAD14', marginTop: 3 }} />
              <Text type="secondary" style={{ fontSize: 12 }}>
                PM shortcut: "If this content could be split into its own Tab without affecting the rest, it's a Section."
                <br />与 PM 沟通：如果这块内容将来可能单独拆成一个 Tab 页，那它就是一个 Section。
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<Bi en="L2 Identification (any 1 of 3)" cn="L2 识别条件（满足任意一条）" />} style={{ borderRadius: 16, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {L2_CONDITIONS.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <CheckCircleOutlined style={{ color: '#52C41A', flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <Text>{c.en}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{c.cn}</Text>
                  </div>
                </div>
              ))}
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <InfoCircleOutlined style={{ color: '#FAAD14', marginTop: 3 }} />
              <Text type="secondary" style={{ fontSize: 12 }}>
                PM shortcut: "If users see this as a card they can open/close, with dynamic info (status, count, ID) in the header — it needs L2."
                <br />与 PM 沟通：如果用户会把这块内容理解为一张可以翻开/合上的卡片，那就需要 L2。
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Skeleton Diagrams */}
      <Card title={<Bi en="Structure Diagrams" cn="结构骨架" />} style={{ borderRadius: 16 }}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Text strong>Simple Section (L1 → L3)</Text>
            <Text type="secondary" style={{ marginLeft: 6, fontSize: 12 }}>简单 Section，不包卡片</Text>
            <div style={{ marginTop: 12 }}>
              <SimpleSectionDiagram />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <Text strong>Instance Section (L1 → L2 → L3)</Text>
            <Text type="secondary" style={{ marginLeft: 6, fontSize: 12 }}>实例 Section，包卡片</Text>
            <div style={{ marginTop: 12 }}>
              <InstanceSectionDiagram />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Subordinate Methods */}
      <Card title={<Bi en="L3 Subordinate Relationship" cn="L3 从属关系表达" />} style={{ borderRadius: 16 }}>
        <Row gutter={16}>
          {SUBORDINATE_METHODS.map((m) => (
            <Col xs={24} lg={12} key={m.method}>
              <div style={{ padding: 16, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Tag color={m.method === 'A' ? 'blue' : 'default'}>Method {m.method}</Tag>
                  <Text strong>{m.name}</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>{m.cn}</Text>
                </div>
                <div style={{ marginBottom: 6 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>When / 适用：</Text>
                  <br />
                  <Text style={{ fontSize: 13 }}>{m.when}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{m.whenCn}</Text>
                </div>
                <div>
                  <Text type="secondary" style={{ fontSize: 12 }}>Style / 样式：</Text>
                  <br />
                  <Text style={{ fontSize: 13 }}>{m.style}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>{m.styleCn}</Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Title Rules — real rendered styles */}
      <Card title={<Bi en="Title Hierarchy" cn="标题规则" />} style={{ borderRadius: 16 }}>
        <Paragraph type="secondary" style={{ marginBottom: 20, fontSize: 12 }}>
          All titles have no icons. Differentiated by font size only. / 所有层级标题不带 Icon，通过字号层级区分。
        </Paragraph>

        <div style={{ background: 'var(--klook-bench-color-bg-content, #F5F5F5)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* L1: Heading/3 — outside container, with collapse */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Tag color="blue" style={{ fontSize: 10 }}>L1</Tag>
              <Text type="secondary" style={{ fontSize: 11 }}>Heading/3 · 20px · SemiBold · outside container</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Title level={5} style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Selling & Fulfilment Strategy</Title>
              <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 14, cursor: 'pointer' }}>▲</Text>
            </div>
            <div style={{
              background: 'var(--klook-bench-color-bg-card, #fff)',
              border: '1px solid var(--klook-bench-color-border-light, #EEEFF1)',
              borderRadius: 'var(--klook-bench-radius-lg, 16px)',
              padding: '16px 24px',
            }}>
              <SkeletonBlock w="60%" h={12} />
            </div>
          </div>

          {/* L2: Heading/5 — inside container, with meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Tag color="green" style={{ fontSize: 10 }}>L2</Tag>
              <Text type="secondary" style={{ fontSize: 11 }}>Heading/5 · 16px · SemiBold · inside container · with ID + Status</Text>
            </div>
            <div style={{
              border: '1px solid var(--klook-bench-color-border, #D9D9D9)',
              borderRadius: 12,
              padding: 20,
              background: 'var(--klook-bench-color-bg-card, #fff)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Text strong style={{ fontSize: 16 }}>Combo SKU #1</Text>
                <Text type="secondary" style={{ fontSize: 13 }}>Adult Ticket</Text>
                <Tag>ID: SKU-001</Tag>
                <Tag color="green">Active</Tag>
                <Text type="secondary" style={{ marginLeft: 'auto', fontSize: 14, cursor: 'pointer' }}>▲</Text>
              </div>
              <SkeletonBlock w="50%" h={12} />
            </div>
          </div>

          {/* L3: Base/Strong — no container, bold text only */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Tag color="gold" style={{ fontSize: 10 }}>L3</Tag>
              <Text type="secondary" style={{ fontSize: 11 }}>Base/Strong · 14px · Bold · no container · spacing only</Text>
            </div>
            <div style={{
              background: 'var(--klook-bench-color-bg-card, #fff)',
              borderRadius: 12,
              padding: '16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
              <Text strong style={{ fontSize: 14 }}>Fulfilment Strategy</Text>
              <Row gutter={16}>
                <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
                <Col span={12}><SkeletonBlock w="100%" h={32} color="rgba(0,0,0,0.03)" r={6} /></Col>
              </Row>
            </div>
          </div>

        </div>

        {/* Token spec summary */}
        <Divider style={{ margin: '20px 0 12px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { level: 'L1 Section', style: 'Heading/3 · 20px · SemiBold', position: 'Outside container / 容器外部' },
            { level: 'L2 Card', style: 'Heading/5 · 16px · SemiBold', position: 'Inside container / 容器内部' },
            { level: 'L3 Field Group', style: 'Base/Strong · 14px · Bold', position: 'No container / 无独立容器' },
          ].map((t) => (
            <div key={t.level} style={{ padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.02)', fontSize: 12 }}>
              <Text strong style={{ fontSize: 12 }}>{t.level}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 11 }}>{t.style}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 11 }}>{t.position}</Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Divider Rules */}
      <Card title={<Bi en="Divider Rules" cn="分隔线使用原则" />} style={{ borderRadius: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DIVIDER_RULES.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <Tag color={d.scenario === 'use' ? 'green' : 'red'} style={{ flexShrink: 0 }}>
                {d.scenario === 'use' ? 'Use' : 'Skip'}
              </Tag>
              <div>
                <Text>{d.en}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>{d.cn}</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Application Example */}
      <Card title={<Bi en="Example: Combo Product Config" cn="应用示例：Combo 产品策略配置" />} style={{ borderRadius: 16 }}>
        <div style={{ fontFamily: 'SFMono-Regular, Consolas, monospace', fontSize: 13, lineHeight: 2 }}>
          {EXAMPLE_TREE.map((node, i) => {
            const levelColor = node.meta.startsWith('L1') ? '#1677FF' : node.meta.startsWith('L2') ? '#52C41A' : '#FAAD14'
            return (
              <div key={i} style={{ paddingLeft: node.indent * 24, display: 'flex', alignItems: 'center', gap: 8 }}>
                {node.indent > 0 && <span style={{ color: 'rgba(0,0,0,0.2)' }}>├──</span>}
                <Text strong={node.indent === 0}>{node.text}</Text>
                <Tag color={levelColor} style={{ fontSize: 10 }}>{node.meta}</Tag>
                <Text type="secondary" style={{ fontSize: 10 }}>{node.metaCn}</Text>
              </div>
            )
          })}
        </div>
      </Card>

    </div>
  )
}
