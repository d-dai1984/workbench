
import { Table, Tag, Button, Space, Progress } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined, CaretRightOutlined, CalendarOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { CodePreview } from '../CodePreview'
import './CampaignTableDemo.css'

/* ---- Mini Sparkline SVG ---- */
function Sparkline({ data, color = '#999' }: { data: number[]; color?: string }) {
  const w = 80, h = 28, pad = 2
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => `${pad + (i / (data.length - 1)) * (w - pad * 2)},${pad + (1 - (v - min) / range) * (h - pad * 2)}`)
    .join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="sparkline-svg">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  )
}

/* ---- Status dot + text ---- */
const statusColors: Record<string, string> = {
  Active: '#00B33C', Finished: '#00B33C', Live: '#00B33C', Running: '#00B33C',
  'Ready to Run': '#FFB800', Draft: '#999', Expired: '#999',
}

function StatusCell({ status }: { status: string }) {
  return (
    <span className="ct-status">
      <span className="ct-status-dot" style={{ background: statusColors[status] || '#999' }} />
      <span style={{ color: statusColors[status] || '#999' }}>{status}</span>
    </span>
  )
}

/* ---- Data types ---- */
interface TaskRow {
  key: string
  name: string
  date?: string
  tags?: string[]
  status: string
  reach?: string
  reached?: string | number
  opened?: string | number
  trend?: number[]
  trendColor?: string
}

interface PhaseRow {
  key: string
  name: string
  tags?: string[]
  status: string
  reach?: string
  reached?: string | number
  opened?: string | number
  trend?: number[]
  trendColor?: string
  children?: TaskRow[]
}

interface CampaignRow {
  key: string
  name: string
  tags: string[]
  status: string
  progress?: number
  budget?: string
  updatedBy?: string
  children?: PhaseRow[]
}

/* ---- Sample data ---- */
const campaignData: CampaignRow[] = [
  {
    key: 'c1',
    name: '2026 Cherry Blossom Festival',
    tags: ['APAC', 'Seasonal', 'Q1'],
    status: 'Active',
    progress: 65,
    budget: '$8,125 / $12,500',
    updatedBy: 'Updated by Kelsey Jiang · 2 hours ago',
    children: [
      {
        key: 'p1',
        name: 'Pre-heating Phase',
        tags: ['Blast'],
        status: 'Finished',
        reach: '92.3%',
        reached: '27,400',
        opened: '9,590',
        trend: [20, 45, 60, 58, 72, 68, 75, 70],
        trendColor: '#1E90FF',
        children: [],
      },
      {
        key: 'p2',
        name: 'Launch Phase',
        tags: ['Blast'],
        status: 'Live',
        reach: '88.7%',
        reached: '31,000',
        opened: '8,680',
        trend: [10, 25, 42, 50, 55, 60, 58, 62],
        trendColor: '#1E90FF',
        children: [
          { key: 't1', name: 'JP Market Push Blast', date: 'Mar 01, 11:00 AM', status: 'Running', reach: '91.2%', reached: '22,100', opened: '6,410', trend: [15,30,42,48,55,52,58,55], trendColor: '#999' },
          { key: 't2', name: 'KR Market SMS Campaign', date: 'Mar 05, 10:00 AM', status: 'Ready to Run' },
          { key: 't3', name: 'Re-engagement Flow', date: 'Mar 01, 02:00 PM', status: 'Running', reach: '83.4%', reached: '8,900', opened: '2,270', trend: [5,12,20,28,35,32,38,36], trendColor: '#999' },
        ],
      },
      {
        key: 'p3',
        name: 'Post-event Wrap-up',
        tags: ['Journey'],
        status: 'Draft',
      },
    ],
  },
  {
    key: 'c2',
    name: '2026 Summer Travel Promotion',
    tags: ['Global', 'Summer', 'Q2'],
    status: 'Active',
    children: [],
  },
]

/* ---- Columns ---- */
const columns: ColumnsType<CampaignRow | PhaseRow | TaskRow> = [
  {
    title: 'NAME',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    render: (name: string, record: any) => (
      <div>
        <Space>
          <span className="ct-name">{name}</span>
          {record.tags?.map((t: string) => (
            <Tag key={t} className="ct-tag" color={t === 'Blast' ? 'blue' : t === 'Journey' ? 'purple' : undefined}>
              {t}
            </Tag>
          ))}
        </Space>
        {record.date && <div className="ct-date"><CalendarOutlined /> {record.date}</div>}
        {record.progress !== undefined && (
          <div className="ct-progress-row">
            <Progress percent={record.progress} size="small" strokeColor="#00B33C" showInfo={false} className="ct-progress" />
            <span className="ct-progress-text">{record.progress}%</span>
            <span className="ct-budget">{record.budget}</span>
          </div>
        )}
        {record.updatedBy && <div className="ct-updated">{record.updatedBy}</div>}
      </div>
    ),
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (s: string) => <StatusCell status={s} />,
  },
  { title: 'REACH %', dataIndex: 'reach', key: 'reach', width: 100, render: (v: string) => v || '—' },
  { title: 'REACHED', dataIndex: 'reached', key: 'reached', width: 100, render: (v: any) => v || '—' },
  { title: 'OPENED', dataIndex: 'opened', key: 'opened', width: 100, render: (v: any) => v || '—' },
  {
    title: 'TREND',
    dataIndex: 'trend',
    key: 'trend',
    width: 100,
    render: (data: number[], record: any) => data ? <Sparkline data={data} color={record.trendColor} /> : '—',
  },
  {
    title: 'ACTIONS',
    key: 'actions',
    width: 160,
    align: 'right',
    render: (_: any, record: any) => (
      <Space>
        {record.status === 'Ready to Run' ? (
          <>
            <Button size="small" icon={<EditOutlined />}>Edit</Button>
            <Button size="small" type="primary" ghost icon={<SendOutlined />}>Publish</Button>
          </>
        ) : (
          <>
            <Button size="small" icon={<EditOutlined />}>Edit</Button>
            {(record.progress !== undefined || record.tags) && (
              <Button size="small" type="text" icon={<DeleteOutlined />} danger />
            )}
          </>
        )}
      </Space>
    ),
  },
]

const codeString = `import { Table, Tag, Button, Space, Progress, Badge } from 'antd'
import { EditOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons'

// Status dot component
function StatusCell({ status }) {
  const colors = { Active: '#00B33C', Running: '#00B33C', Draft: '#999', ... }
  return (
    <span>
      <Badge status="default" color={colors[status]} />
      <span style={{ color: colors[status] }}>{status}</span>
    </span>
  )
}

// SVG Sparkline
function Sparkline({ data, color }) {
  const points = data.map((v, i) => \`\${x},\${y}\`).join(' ')
  return <svg><polyline points={points} stroke={color} /></svg>
}

const columns = [
  { title: 'NAME', dataIndex: 'name', width: 300,
    render: (name, record) => (
      <div>
        <Space>
          <span>{name}</span>
          {record.tags?.map(t => <Tag key={t}>{t}</Tag>)}
        </Space>
        {record.progress && <Progress percent={record.progress} size="small" />}
        {record.updatedBy && <div className="meta">{record.updatedBy}</div>}
      </div>
    )
  },
  { title: 'STATUS', render: s => <StatusCell status={s} /> },
  { title: 'REACH %', dataIndex: 'reach' },
  { title: 'REACHED', dataIndex: 'reached' },
  { title: 'TREND', render: data => <Sparkline data={data} /> },
  { title: 'ACTIONS', render: (_, record) => (
    <Space>
      <Button size="small" icon={<EditOutlined />}>Edit</Button>
      {record.status === 'Ready to Run' &&
        <Button size="small" type="primary" ghost icon={<SendOutlined />}>Publish</Button>}
    </Space>
  )},
]

<Table
  columns={columns}
  dataSource={campaignData}
  expandable={{ defaultExpandedRowKeys: ['c1', 'p2'] }}
  pagination={false}
  size="middle"
/>`

export function CampaignTableDemo() {
  return (
    <CodePreview
      title="CampaignTable 嵌套树表格"
      description="可展开多层级行 · 状态圆点 · 业务标签 · 进度条 · SVG 迷你折线图 · 操作按钮"
      code={codeString}
    >
      <Table
        className="campaign-table"
        columns={columns as any}
        dataSource={campaignData as any}
        expandable={{
          defaultExpandedRowKeys: ['c1', 'p2'],
          expandIcon: ({ expanded, onExpand, record }) =>
            (record as any).children?.length > 0 ? (
              <CaretRightOutlined
                className={`ct-expand-icon ${expanded ? 'ct-expand-icon--open' : ''}`}
                onClick={(e) => onExpand(record, e)}
              />
            ) : <span className="ct-expand-spacer" />,
        }}
        pagination={false}
        size="middle"
      />
    </CodePreview>
  )
}
