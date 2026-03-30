import { Card, Typography, Tag, Row, Col, Divider, Skeleton, Spin, Empty } from 'antd'
import {
  LoadingOutlined,
  InboxOutlined,
  SearchOutlined,
  LockOutlined,
  WifiOutlined,
  WarningOutlined,
  FileUnknownOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { STATUS_DEFINITION, FEEDBACK_RULES, CONFIRM_STRATEGIES, ERROR_HANDLING } from '../data/statesFeedback'

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

/* ─── Skeleton primitives ─── */
function Block({
  w = '100%',
  h = 14,
  bg = '#f0f0f0',
  label,
  style,
}: {
  w?: string | number
  h?: number
  bg?: string
  label?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        width: w,
        height: h,
        background: bg,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        color: '#666',
        flexShrink: 0,
        ...style,
      }}
    >
      {label}
    </div>
  )
}

const EMPTY_STATES = [
  { icon: <InboxOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />, label: 'No Data', cn: '暂无数据', desc: 'List/table has no records', cnDesc: '列表/表格无记录' },
  { icon: <SearchOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />, label: 'No Results', cn: '未找到结果', desc: 'Search/filter returns empty', cnDesc: '搜索/筛选无结果' },
  { icon: <LockOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />, label: '403 Forbidden', cn: '无权限', desc: 'No permission to view', cnDesc: '无权查看此页面' },
  { icon: <WifiOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />, label: 'Network Error', cn: '网络异常', desc: 'Connection lost or timeout', cnDesc: '连接中断或超时' },
  { icon: <WarningOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />, label: '500 Server Error', cn: '服务器错误', desc: 'Internal server failure', cnDesc: '服务器内部错误' },
  { icon: <FileUnknownOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />, label: '404 Not Found', cn: '页面不存在', desc: 'Page does not exist', cnDesc: '请求的页面不存在' },
]

const PERMISSION_RULES = [
  {
    level: 'Page-level',
    cn: '页面级',
    behavior: 'No permission → show empty state / 403 page',
    cnBehavior: '无权限 → 显示空状态 / 403 页面',
    icon: <StopOutlined style={{ color: '#ff4d4f' }} />,
  },
  {
    level: 'Action-level',
    cn: '操作级',
    behavior: 'No permission → button disabled + tooltip explains',
    cnBehavior: '无权限 → 按钮禁用 + tooltip 说明',
    icon: <LockOutlined style={{ color: '#faad14' }} />,
  },
  {
    level: 'Data-level',
    cn: '数据级',
    behavior: 'No permission → sensitive data masked (***)',
    cnBehavior: '无权限 → 敏感数据脱敏（***）',
    icon: <ExclamationCircleOutlined style={{ color: '#1677FF' }} />,
  },
]

/* ─── Main Component ─── */
export function StatesFeedbackPage() {
  return (
    <div className="skill-ref-page">
      {/* Page Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          <Bi en="States, Feedback & Permissions" cn="状态、反馈与权限" />
        </Title>
        <Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
          Status definitions, feedback rules, confirmation strategies, loading states, empty states, and permission handling.
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          状态定义、反馈规则、确认策略、加载态、空态和权限处理。
        </Text>
      </div>

      {/* ─── Status Definition Rules ─── */}
      <Card
        title={<Bi en="Status Definition Rules" cn="状态定义规则" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Each status must define: name + color + allowed operations + flow conditions."
          cn="每个状态必须定义：名称 + 颜色 + 允许操作 + 流转条件。"
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
                <th style={{ padding: '8px 12px' }}><Bi en="Status" cn="状态" /></th>
                <th style={{ padding: '8px 12px' }}><Bi en="Operations" cn="操作" /></th>
                <th style={{ padding: '8px 12px' }}><Bi en="Flow" cn="流转" /></th>
              </tr>
            </thead>
            <tbody>
              {STATUS_DEFINITION.map((s) => (
                <tr key={s.status} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <Tag color={s.color} style={{ margin: 0 }}>
                      {s.status}
                    </Tag>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>{s.cn}</Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <div style={{ fontSize: 12 }}>{s.ops}</div>
                    <Text type="secondary" style={{ fontSize: 11 }}>{s.cnOps}</Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Text style={{ fontFamily: 'monospace', fontSize: 11 }}>{s.flow}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ─── Feedback Rules ─── */}
      <Card
        title={<Bi en="Feedback Rules" cn="反馈规则" />}
        style={{ borderRadius: 16 }}
      >
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
                <th style={{ padding: '8px 12px' }}><Bi en="Type" cn="类型" /></th>
                <th style={{ padding: '8px 12px' }}><Bi en="Usage" cn="用途" /></th>
                <th style={{ padding: '8px 12px' }}><Bi en="Duration" cn="时长" /></th>
                <th style={{ padding: '8px 12px' }}><Bi en="Example" cn="示例" /></th>
              </tr>
            </thead>
            <tbody>
              {FEEDBACK_RULES.map((f) => (
                <tr key={f.type} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <Tag color="blue" style={{ margin: 0 }}>{f.type}</Tag>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>{f.cn}</Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <div style={{ fontSize: 12 }}>{f.usage}</div>
                    <Text type="secondary" style={{ fontSize: 11 }}>{f.cnUsage}</Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>{f.duration}</Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <Text style={{ fontFamily: 'monospace', fontSize: 11 }}>{f.example}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ─── Confirmation Strategy ─── */}
      <Card
        title={<Bi en="Confirmation Strategy" cn="确认策略" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Choose confirmation level based on operation risk."
          cn="根据操作风险级别选择确认方式。"
        />
        <Divider style={{ margin: '12px 0' }} />
        <Row gutter={16}>
          {CONFIRM_STRATEGIES.map((c) => (
            <Col xs={24} lg={8} key={c.level}>
              <Card
                size="small"
                style={{
                  borderRadius: 12,
                  borderTop: `3px solid ${c.color}`,
                  height: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      background: c.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {c.level[0]}
                  </div>
                  <Text strong>
                    <Bi en={`${c.level} Risk`} cn={`${c.cn}风险`} />
                  </Text>
                </div>
                <Tag color="blue" style={{ marginBottom: 8 }}>{c.method}</Tag>
                <div style={{ fontSize: 12 }}>{c.example}</div>
                <Text type="secondary" style={{ fontSize: 11 }}>{c.cnExample}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* ─── Loading States ─── */}
      <Card
        title={<Bi en="Loading States" cn="加载态" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={16}>
          {/* Skeleton */}
          <Col xs={24} lg={6}>
            <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
              <Text strong style={{ fontSize: 13 }}>
                <Bi en="Skeleton" cn="骨架屏" />
              </Text>
              <Tag color="blue" style={{ display: 'block', marginTop: 4, width: 'fit-content' }}>
                First load only
              </Tag>
              <div style={{ marginTop: 8 }}>
                <Skeleton active paragraph={{ rows: 3 }} title={{ width: '60%' }} />
              </div>
            </Card>
          </Col>
          {/* Spin */}
          <Col xs={24} lg={6}>
            <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
              <Text strong style={{ fontSize: 13 }}>
                <Bi en="Spin" cn="加载中" />
              </Text>
              <Tag color="orange" style={{ display: 'block', marginTop: 4, width: 'fit-content' }}>
                delay=300ms
              </Tag>
              <div
                style={{
                  marginTop: 8,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fafafa',
                  borderRadius: 8,
                }}
              >
                <Spin indicator={<LoadingOutlined spin />} />
              </div>
            </Card>
          </Col>
          {/* Table loading */}
          <Col xs={24} lg={6}>
            <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
              <Text strong style={{ fontSize: 13 }}>
                <Bi en="Table Loading" cn="表格加载" />
              </Text>
              <Tag style={{ display: 'block', marginTop: 4, width: 'fit-content' }}>
                Overlay spinner
              </Tag>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  position: 'relative',
                }}
              >
                <Block w="100%" h={28} bg="#e6f4ff" label="Header" />
                <Block w="100%" h={24} bg="#fff" label="Row" style={{ border: '1px solid #f0f0f0', opacity: 0.4 }} />
                <Block w="100%" h={24} bg="#fff" label="Row" style={{ border: '1px solid #f0f0f0', opacity: 0.4 }} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: 4,
                  }}
                >
                  <LoadingOutlined style={{ fontSize: 18, color: '#1677FF' }} />
                </div>
              </div>
            </Card>
          </Col>
          {/* Button loading */}
          <Col xs={24} lg={6}>
            <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
              <Text strong style={{ fontSize: 13 }}>
                <Bi en="Button Loading" cn="按钮加载" />
              </Text>
              <Tag style={{ display: 'block', marginTop: 4, width: 'fit-content' }}>
                Inline spinner
              </Tag>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '4px 16px',
                    background: '#1677FF',
                    color: '#fff',
                    borderRadius: 6,
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    opacity: 0.8,
                  }}
                >
                  <LoadingOutlined spin /> Submitting...
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* ─── Empty States ─── */}
      <Card
        title={<Bi en="Empty States" cn="空态" />}
        style={{ borderRadius: 16 }}
      >
        <BiBlock
          en="Each empty scenario has a specific illustration and message."
          cn="每种空状态场景有特定的插图和提示信息。"
        />
        <Divider style={{ margin: '12px 0' }} />
        <Row gutter={[16, 16]}>
          {EMPTY_STATES.map((e) => (
            <Col xs={12} lg={4} key={e.label}>
              <div
                style={{
                  padding: 16,
                  background: '#fafafa',
                  borderRadius: 12,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                {e.icon}
                <Text strong style={{ fontSize: 12 }}>
                  {e.label}
                </Text>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {e.cn}
                </Text>
                <Text type="secondary" style={{ fontSize: 10 }}>
                  {e.desc}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* ─── Permission Rules ─── */}
      <Card
        title={<Bi en="Permission Rules" cn="权限规则" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={16}>
          {PERMISSION_RULES.map((p) => (
            <Col xs={24} lg={8} key={p.level}>
              <Card size="small" style={{ borderRadius: 12, height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {p.icon}
                  <Text strong>
                    <Bi en={p.level} cn={p.cn} />
                  </Text>
                </div>
                <div style={{ fontSize: 13 }}>{p.behavior}</div>
                <Text type="secondary" style={{ fontSize: 11 }}>{p.cnBehavior}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* ─── Error Handling ─── */}
      <Card
        title={<Bi en="Error Handling" cn="错误处理" />}
        style={{ borderRadius: 16 }}
      >
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
                <th style={{ padding: '8px 12px', width: 160 }}>
                  <Bi en="Scenario" cn="场景" />
                </th>
                <th style={{ padding: '8px 12px' }}>
                  <Bi en="Action" cn="处理方式" />
                </th>
              </tr>
            </thead>
            <tbody>
              {ERROR_HANDLING.map((e) => (
                <tr key={e.scenario} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '8px 12px' }}>
                    <Text strong style={{ fontSize: 13 }}>{e.scenario}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>{e.cn}</Text>
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <div style={{ fontSize: 12 }}>{e.action}</div>
                    <Text type="secondary" style={{ fontSize: 11 }}>{e.cnAction}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
