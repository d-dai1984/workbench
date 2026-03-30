import { Card, Typography, Row, Col, Checkbox } from 'antd'
import { CATEGORIES } from '../data/reviewChecklist'

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

/* ─── Component ─── */

export function ReviewChecklistPage() {
  return (
    <div className="skill-ref-page">
      {/* Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          Review Checklist
          <Text
            type="secondary"
            style={{ fontSize: 16, fontWeight: 400, marginLeft: 8 }}
          >
            输出自检清单
          </Text>
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          A comprehensive checklist to review before finalizing any page design
          output. Covers 6 categories with 32 items total.
        </Paragraph>
        <Paragraph
          type="secondary"
          style={{ marginBottom: 0, fontSize: 13 }}
        >
          在最终交付页面设计前的全面自检清单。覆盖 6 个类别，共 32 项检查。
        </Paragraph>
      </div>

      {/* Category summary */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              background: `${cat.color}10`,
              border: `1px solid ${cat.color}30`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: cat.color,
              }}
            />
            <Text strong style={{ fontSize: 13 }}>
              {cat.title}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {cat.titleCn}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              ({cat.items.length})
            </Text>
          </div>
        ))}
      </div>

      {/* Checklist cards */}
      <Row gutter={[16, 16]}>
        {CATEGORIES.map((cat) => (
          <Col xs={24} lg={12} key={cat.title}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 4,
                      height: 20,
                      borderRadius: 2,
                      background: cat.color,
                    }}
                  />
                  <Bi en={cat.title} cn={cat.titleCn} />
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginLeft: 'auto' }}
                  >
                    {cat.items.length} items
                  </Text>
                </div>
              }
              style={{ borderRadius: 16, height: '100%' }}
              styles={{ body: { padding: '12px 24px 20px' } }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {cat.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Checkbox
                      disabled
                      style={{ marginTop: 2 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, lineHeight: 1.5 }}>{item.en}</div>
                      <Text
                        type="secondary"
                        style={{ fontSize: 12 }}
                      >
                        {item.cn}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
