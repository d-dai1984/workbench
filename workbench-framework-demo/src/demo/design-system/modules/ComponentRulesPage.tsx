import { Card, Typography, Tag, Row, Col, Divider, Collapse } from 'antd'
import {
  MenuOutlined,
  TableOutlined,
  FormOutlined,
  MessageOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { NAV_RULES, DATA_DISPLAY_RULES, DATA_ENTRY_RULES, FEEDBACK_RULES, DEPRECATIONS } from '../data/componentRules'

const { Title, Text } = Typography

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

/* ─── Rule row component ─── */
function RuleRow({
  component,
  rules,
}: {
  component: string
  rules: Array<{ en: string; cn: string; tag?: string; tagColor?: string }>
}) {
  return (
    <div
      style={{
        padding: '10px 16px',
        background: '#fafafa',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Text strong style={{ fontSize: 14, color: '#1677FF' }}>
        {component}
      </Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {rules.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                background: '#1677FF',
                marginTop: 7,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13 }}>{r.en}</div>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {r.cn}
              </Text>
            </div>
            {r.tag && (
              <Tag color={r.tagColor || 'default'} style={{ margin: 0, flexShrink: 0 }}>
                {r.tag}
              </Tag>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Section Icon Map ─── */
const sectionIcon = (key: string) => {
  const map: Record<string, React.ReactNode> = {
    nav: <MenuOutlined style={{ color: '#1677FF' }} />,
    display: <TableOutlined style={{ color: '#52c41a' }} />,
    entry: <FormOutlined style={{ color: '#fa8c16' }} />,
    feedback: <MessageOutlined style={{ color: '#722ed1' }} />,
  }
  return map[key] || null
}

/* ─── Main Component ─── */
export function ComponentRulesPage() {
  const collapseItems = [
    {
      key: 'nav',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sectionIcon('nav')}
          <Bi en="Navigation Components" cn="导航组件" />
        </div>
      ),
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NAV_RULES.map((item) => (
            <RuleRow key={item.component} component={item.component} rules={item.rules} />
          ))}
        </div>
      ),
    },
    {
      key: 'display',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sectionIcon('display')}
          <Bi en="Data Display Components" cn="数据展示组件" />
        </div>
      ),
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DATA_DISPLAY_RULES.map((item) => (
            <RuleRow key={item.component} component={item.component} rules={item.rules} />
          ))}
        </div>
      ),
    },
    {
      key: 'entry',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sectionIcon('entry')}
          <Bi en="Data Entry Components" cn="数据录入组件" />
        </div>
      ),
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DATA_ENTRY_RULES.map((item) => (
            <RuleRow key={item.component} component={item.component} rules={item.rules} />
          ))}
        </div>
      ),
    },
    {
      key: 'feedback',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sectionIcon('feedback')}
          <Bi en="Feedback Components" cn="反馈组件" />
        </div>
      ),
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {FEEDBACK_RULES.map((item) => (
            <RuleRow key={item.component} component={item.component} rules={item.rules} />
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="skill-ref-page">
      {/* Page Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          <Bi en="Component Rules" cn="组件规则" />
        </Title>
        <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
          Component constraints organized by category: navigation, data display, data entry, and feedback.
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          按类别组织的组件约束：导航、数据展示、数据录入和反馈。
        </Text>
      </div>

      {/* ─── Component Rules by Category ─── */}
      <Collapse
        defaultActiveKey={['nav', 'display', 'entry', 'feedback']}
        items={collapseItems}
        style={{ borderRadius: 12 }}
      />

      {/* ─── v6 Deprecations ─── */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WarningOutlined style={{ color: '#faad14' }} />
            <Bi en="v6 Deprecations" cn="v6 废弃项" />
          </div>
        }
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Components and APIs deprecated or renamed in Ant Design v6. Update your code accordingly."
          cn="Ant Design v6 中废弃或重命名的组件和 API。请相应更新代码。"
        />
        <Divider style={{ margin: '12px 0' }} />
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 13,
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Deprecated" cn="废弃" />
                </th>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Replacement" cn="替代" />
                </th>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Reason" cn="原因" />
                </th>
              </tr>
            </thead>
            <tbody>
              {DEPRECATIONS.map((d) => (
                <tr
                  key={d.deprecated}
                  style={{ borderBottom: '1px solid #f5f5f5' }}
                >
                  <td style={{ padding: '8px 12px' }}>
                    <Tag color="red" style={{ margin: 0 }}>
                      {d.deprecated}
                    </Tag>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Tag color="green" style={{ margin: 0 }}>
                      {d.replacement}
                    </Tag>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {d.cn}
                    </Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {d.reason}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ─── Quick Decision Guide ─── */}
      <Card
        title={<Bi en="Quick Decision Guide" cn="快速决策指南" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
              <Text strong>
                <Bi en="Fields <=6" cn="字段 <=6" />
              </Text>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Tag color="blue">Form</Tag>
                <span>+</span>
                <Tag color="blue">Modal (12px radius)</Tag>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
              <Text strong>
                <Bi en="Fields >6" cn="字段 >6" />
              </Text>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Tag color="purple">Form</Tag>
                <span>+</span>
                <Tag color="purple">Drawer (footer fixed)</Tag>
              </div>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: 12 }}>
          <Row gutter={16}>
            <Col xs={24} lg={8}>
              <Card size="small" style={{ borderRadius: 12, marginTop: 8 }}>
                <Text strong>
                  <Bi en="Fields >12" cn="字段 >12" />
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color="orange">Multi-step Form (Steps)</Tag>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card size="small" style={{ borderRadius: 12, marginTop: 8 }}>
                <Text strong>
                  <Bi en="Rows >5000" cn="行数 >5000" />
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color="red">Table virtual scroll</Tag>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card size="small" style={{ borderRadius: 12, marginTop: 8 }}>
                <Text strong>
                  <Bi en="Breadcrumb >5" cn="面包屑 >5 层" />
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color="orange">Collapse with ellipsis</Tag>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  )
}
