/**
 * KbrDetailPage — Finance / KBR Overview (Step 1 of 6)
 *
 * Implements the kbr-detail-p1 reference design using AntD components
 * within the Klook Bench workbench layout conventions.
 *
 * Layout sections (top → bottom):
 *  1. Breadcrumb
 *  2. Identity bar     — merchant · period · KBR ref + tags
 *  3. Steps bar        — 6-step progress tracker
 *  4. Global actions   — Deduction / Attachments toggles
 *  5. Contextual panel — Deduction form or Attachments list
 *  6. Content          — title, Merchant Info, Stats row, Tx table + right panels
 */
import { useState } from 'react'
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Steps,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import '../styles/KbrDetailPage.css'

const { Text, Title } = Typography

// ─── Types ───────────────────────────────────────────────────────────────────

type TxRow = {
  key: string
  bookingNo: string
  klookRef: string
  txType: 'Fulfillment' | 'Return' | 'Compensation'
  txNo: string
  merchantBK: string
  bookingTime: string
  confirmTime: string
  settleCond: string
  settleTime: string
  postingTime: string
  productNo: string
  productName: string
  variantNo: string
  variantName: string
  subVoucher: string
  unitFullCost: number
  unitCost: number
  fee: number
  feeDetails: string
  numUnits: number
  discount: number
  discountDetails: string
  cancelFee: number
  adjAmount: number
  adjAccount: string
  adjReason: string
  settleAmt: number
  commission: number
  customInfo: string
}

// ─── Static data ─────────────────────────────────────────────────────────────

const TX_DATA: TxRow[] = [
  { key: '1', bookingNo: 'TYO123450', klookRef: 'KL-2411-003450-1', txType: 'Fulfillment',   txNo: 'TXN-20241103-0001', merchantBK: 'TST-BK-2411-0001', bookingTime: '2024-10-15 14:23', confirmTime: '2024-10-15 14:25', settleCond: 'Used',      settleTime: '2024-11-03 09:00', postingTime: '2024-11-03 10:30', productNo: 'PRD-TST-001', productName: 'Tokyo Skytree General Admission', variantNo: 'VAR-001', variantName: 'Adult',          subVoucher: 'SVC-001234', unitFullCost: 1200, unitCost: 1200, fee: 0,   feeDetails: '—', numUnits: 1, discount: 0,   discountDetails: '—',               cancelFee: 0, adjAmount: 0,   adjAccount: '—',                    adjReason: '—',                                      settleAmt: 1200, commission: 0, customInfo: '—' },
  { key: '2', bookingNo: 'TYO123450', klookRef: 'KL-2411-003450-2', txType: 'Compensation', txNo: 'TXN-20241104-0002', merchantBK: 'TST-BK-2411-0001', bookingTime: '2024-10-15 14:23', confirmTime: '2024-10-15 14:25', settleCond: 'Used',      settleTime: '2024-11-04 09:00', postingTime: '2024-11-04 11:15', productNo: 'PRD-TST-001', productName: 'Tokyo Skytree General Admission', variantNo: 'VAR-001', variantName: 'Adult',          subVoucher: '—',          unitFullCost: 450,  unitCost: 450,  fee: 0,   feeDetails: '—', numUnits: 1, discount: 0,   discountDetails: '—',               cancelFee: 0, adjAmount: 450,  adjAccount: 'Merchant Compensation', adjReason: 'Customer complaint — delayed entry',    settleAmt: 450,  commission: 0, customInfo: '—' },
  { key: '3', bookingNo: 'TYO123451', klookRef: 'KL-2411-003451-1', txType: 'Fulfillment',   txNo: 'TXN-20241105-0003', merchantBK: 'TST-BK-2411-0002', bookingTime: '2024-10-18 09:11', confirmTime: '2024-10-18 09:13', settleCond: 'Used',      settleTime: '2024-11-05 09:00', postingTime: '2024-11-05 10:45', productNo: 'PRD-TST-002', productName: 'Tokyo Skytree Premium Lounge',       variantNo: 'VAR-002', variantName: 'Adult (Premium)', subVoucher: 'SVC-001235', unitFullCost: 3400, unitCost: 3400, fee: 0,   feeDetails: '—', numUnits: 1, discount: 0,   discountDetails: '—',               cancelFee: 0, adjAmount: 0,   adjAccount: '—',                    adjReason: '—',                                      settleAmt: 3400, commission: 0, customInfo: '—' },
  { key: '4', bookingNo: 'TYO123452', klookRef: 'KL-2411-003452-1', txType: 'Return',        txNo: 'TXN-20241107-0004', merchantBK: 'TST-BK-2411-0003', bookingTime: '2024-10-20 16:55', confirmTime: '2024-10-20 16:57', settleCond: 'Cancelled', settleTime: '2024-11-07 09:00', postingTime: '2024-11-07 09:30', productNo: 'PRD-TST-001', productName: 'Tokyo Skytree General Admission', variantNo: 'VAR-001', variantName: 'Adult',          subVoucher: 'SVC-001236', unitFullCost: 1200, unitCost: 1200, fee: 0,   feeDetails: '—', numUnits: 1, discount: 310, discountDetails: 'Early bird discount', cancelFee: 0, adjAmount: 0,   adjAccount: '—',                    adjReason: '—',                                      settleAmt: -890, commission: 0, customInfo: '—' },
  { key: '5', bookingNo: 'TYO123453', klookRef: 'KL-2411-003453-1', txType: 'Fulfillment',   txNo: 'TXN-20241110-0005', merchantBK: 'TST-BK-2411-0004', bookingTime: '2024-10-25 10:30', confirmTime: '2024-10-25 10:31', settleCond: 'Used',      settleTime: '2024-11-10 09:00', postingTime: '2024-11-10 11:00', productNo: 'PRD-TST-003', productName: 'Skytree + Sumida Aquarium Combo',    variantNo: 'VAR-003', variantName: 'Child',          subVoucher: 'SVC-001237', unitFullCost: 2400, unitCost: 2100, fee: 300, feeDetails: 'Booking handling fee', numUnits: 1, discount: 0, discountDetails: '—', cancelFee: 0, adjAmount: 0, adjAccount: '—', adjReason: '—', settleAmt: 2100, commission: 0, customInfo: 'Group ref: GRP-2024-1025' },
  { key: '6', bookingNo: 'TYO123454', klookRef: 'KL-2411-003454-1', txType: 'Fulfillment',   txNo: 'TXN-20241112-0006', merchantBK: 'TST-BK-2411-0005', bookingTime: '2024-10-28 18:44', confirmTime: '2024-10-28 18:45', settleCond: 'Used',      settleTime: '2024-11-12 09:00', postingTime: '2024-11-12 10:15', productNo: 'PRD-TST-001', productName: 'Tokyo Skytree General Admission', variantNo: 'VAR-004', variantName: 'Senior',         subVoucher: 'SVC-001238', unitFullCost: 980,  unitCost: 780,  fee: 200, feeDetails: 'Processing fee',       numUnits: 1, discount: 0, discountDetails: '—', cancelFee: 0, adjAmount: 0, adjAccount: '—', adjReason: '—', settleAmt: 780,  commission: 0, customInfo: '—' },
]

const MERCHANT_FIELDS = [
  [
    { label: 'Merchant ID',           value: <code>JP-00341</code> },
    { label: 'Merchant Name',         value: 'Tokyo Skytree Tours' },
    { label: 'Payment Info Status',   value: <span style={{ color: '#fa8c16', fontWeight: 600 }}>⚠ Unverified</span> },
    { label: 'Settlement Rule',       value: <Space size={4}><Tag color="blue">Later Settlement</Tag><Tag color="purple">Based on Merchant</Tag></Space> },
  ],
  [
    { label: 'Settlement Currency',   value: 'JPY' },
    { label: 'Payment Currency',      value: 'JPY' },
    { label: 'Settlement Period',     value: <code style={{ fontSize: 12 }}>2024-11-01 00:00:00 ~ 2024-11-30 23:59:59</code>, span: 2 },
  ],
  [
    { label: 'Contracting Subsidiary', value: 'Klook Asia Pacific Limited' },
    { label: 'Assignee (AP)',          value: <span style={{ color: '#1677ff', fontWeight: 600 }}>Hannah Ji</span> },
    { label: 'Payment Due Date',       value: <span style={{ color: '#ff4d4f', fontWeight: 600 }}>2025-03-20</span> },
    { label: 'Additional Notes',       value: <span style={{ color: '#bfbfbf', fontStyle: 'italic' }}>—</span> },
  ],
] as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderAmt(v: number | string) {
  if (v === 0)   return <span style={{ color: '#bfbfbf' }}>0</span>
  if (v === '—') return <span style={{ color: '#bfbfbf' }}>—</span>
  if (typeof v === 'number') {
    return (
      <span style={{ color: v < 0 ? '#ff4d4f' : '#141414', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
        {v < 0 ? '-' : ''}{Math.abs(v).toLocaleString()}
      </span>
    )
  }
  return v
}

function renderStr(v: string) {
  return v === '—' ? <span style={{ color: '#bfbfbf' }}>—</span> : v
}

// ─── Table columns ────────────────────────────────────────────────────────────

const TX_COLS: ColumnsType<TxRow> = [
  { title: 'Booking No.',      dataIndex: 'bookingNo',       key: 'bk',   fixed: 'left', width: 120, render: v => <code style={{ fontSize: 11, fontWeight: 600 }}>{v}</code> },
  { title: 'Klook Ref.',       dataIndex: 'klookRef',        key: 'kref', width: 170,   render: v => <code style={{ fontSize: 11 }}>{v}</code> },
  { title: 'Type',             dataIndex: 'txType',          key: 'type', width: 130,
    render: (v: TxRow['txType']) => {
      const color = v === 'Fulfillment' ? 'success' : v === 'Return' ? 'error' : 'processing'
      return <Tag color={color}>{v}</Tag>
    },
  },
  { title: 'Transaction No.',  dataIndex: 'txNo',            key: 'txno', width: 180,   render: v => <code style={{ fontSize: 11 }}>{v}</code> },
  { title: 'Merchant Booking', dataIndex: 'merchantBK',      key: 'mbk',  width: 170,   render: v => <code style={{ fontSize: 11 }}>{v}</code> },
  { title: 'Booking Time',     dataIndex: 'bookingTime',     key: 'bt',   width: 145,   render: v => <span style={{ fontSize: 11, color: '#595959' }}>{v}</span> },
  { title: 'Confirm Time',     dataIndex: 'confirmTime',     key: 'ct',   width: 145,   render: v => <span style={{ fontSize: 11, color: '#595959' }}>{v}</span> },
  { title: 'Settle Condition', dataIndex: 'settleCond',      key: 'sc',   width: 130 },
  { title: 'Settlement Time',  dataIndex: 'settleTime',      key: 'st',   width: 145,   render: v => <span style={{ fontSize: 11, color: '#595959' }}>{v}</span> },
  { title: 'Posting Time',     dataIndex: 'postingTime',     key: 'pt',   width: 145,   render: v => <span style={{ fontSize: 11, color: '#595959' }}>{v}</span> },
  { title: 'Product No.',      dataIndex: 'productNo',       key: 'pno',  width: 120,   render: v => <code style={{ fontSize: 11 }}>{v}</code> },
  { title: 'Product Name',     dataIndex: 'productName',     key: 'pn',   width: 240, ellipsis: true, render: v => <Tooltip title={v}>{v}</Tooltip> },
  { title: 'Variant No.',      dataIndex: 'variantNo',       key: 'vno',  width: 100,   render: v => <code style={{ fontSize: 11 }}>{v}</code> },
  { title: 'Variant Name',     dataIndex: 'variantName',     key: 'vn',   width: 140 },
  { title: 'Sub Voucher',      dataIndex: 'subVoucher',      key: 'sv',   width: 120,   render: renderStr },
  { title: 'Unit Full Cost',   dataIndex: 'unitFullCost',    key: 'ufc',  width: 120, align: 'right', render: renderAmt },
  { title: 'Unit Cost',        dataIndex: 'unitCost',        key: 'uc',   width: 100, align: 'right', render: renderAmt },
  { title: 'Fee',              dataIndex: 'fee',             key: 'fee',  width: 80,  align: 'right', render: renderAmt },
  { title: 'Fee Details',      dataIndex: 'feeDetails',      key: 'fd',   width: 150,   render: renderStr },
  { title: '# Units',          dataIndex: 'numUnits',        key: 'nu',   width: 80,  align: 'right', render: renderAmt },
  { title: 'Discount',         dataIndex: 'discount',        key: 'disc', width: 90,  align: 'right', render: renderAmt },
  { title: 'Discount Details', dataIndex: 'discountDetails', key: 'dd',   width: 160,   render: renderStr },
  { title: 'Cancel Fee',       dataIndex: 'cancelFee',       key: 'cf',   width: 100, align: 'right', render: renderAmt },
  { title: 'Adj. Amount',      dataIndex: 'adjAmount',       key: 'adj',  width: 110, align: 'right', render: renderAmt },
  { title: 'Adj. Account',     dataIndex: 'adjAccount',      key: 'aa',   width: 160,   render: renderStr },
  { title: 'Adj. Reason',      dataIndex: 'adjReason',       key: 'ar',   width: 200, ellipsis: true },
  { title: 'Settlement Amt',   dataIndex: 'settleAmt',       key: 'sa',   width: 120, align: 'right', render: renderAmt },
  { title: 'Commission',       dataIndex: 'commission',      key: 'comm', width: 100, align: 'right', render: renderAmt },
  { title: 'Custom Info',      dataIndex: 'customInfo',      key: 'ci',   width: 200, ellipsis: true },
]

// ─── Component ────────────────────────────────────────────────────────────────

type GlobalPanel = 'deduction' | 'attachments' | null

export function KbrDetailPage() {
  const [merchantOpen, setMerchantOpen] = useState(false)
  const [globalPanel,  setGlobalPanel]  = useState<GlobalPanel>(null)
  const [dedReason,    setDedReason]    = useState('')
  const [dedAmount,    setDedAmount]    = useState('')
  const [txSearch,     setTxSearch]     = useState('')
  const [txType,       setTxType]       = useState<string | undefined>(undefined)

  const togglePanel = (p: GlobalPanel) => setGlobalPanel(prev => prev === p ? null : p)

  const dedActive = Boolean(dedReason && dedAmount)
  const dedLabel  = dedActive
    ? `−¥${Number(dedAmount.replace(/,/g, '') || 0).toLocaleString()}`
    : null

  const displayTx = TX_DATA.filter(row => {
    if (txSearch && !row.bookingNo.toLowerCase().includes(txSearch.toLowerCase())) return false
    if (txType  && row.txType !== txType) return false
    return true
  })

  return (
    <div className="kbr-detail-page">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <Breadcrumb
        className="kbr-breadcrumb"
        items={[{ title: <span style={{ fontSize: 13 }}>← KBR List</span> }]}
      />

      {/* ── Identity bar ───────────────────────────────────────────────── */}
      <div className="kbr-identity-bar">
        <Space size={8}>
          <span className="kbr-merchant-name">Tokyo Skytree Tours</span>
          <span className="kbr-sep">·</span>
          <span className="kbr-period">2024-11-01 00:00:00 ~ 2024-11-30 23:59:59</span>
          <span className="kbr-sep">·</span>
          <code style={{ fontSize: 12, color: '#595959' }}>KBR2411088001</code>
        </Space>
        <Space size={6}>
          <Tag color="blue">Later Settlement</Tag>
          <Tag color="purple">Based on Merchant</Tag>
        </Space>
      </div>

      {/* ── Steps bar ──────────────────────────────────────────────────── */}
      <div className="kbr-steps-bar">
        <Steps
          current={0}
          size="small"
          labelPlacement="vertical"
          items={[
            { title: 'Overview' },
            { title: 'Reconciliation' },
            { title: 'Issue Resolution' },
            { title: 'Review & Submit' },
            { title: 'Approval' },
            { title: 'Payment' },
          ]}
        />
      </div>

      {/* ── Global actions bar ─────────────────────────────────────────── */}
      <div className="kbr-global-bar">
        <span className="kbr-global-label">Global</span>

        <Button
          size="small"
          type={dedActive ? 'primary' : 'default'}
          ghost={dedActive}
          onClick={() => togglePanel('deduction')}
        >
          − Deduction
          {dedLabel && (
            <Tag color="blue" style={{ margin: '0 0 0 4px', fontSize: 10, lineHeight: '16px' }}>
              {dedLabel}
            </Tag>
          )}
        </Button>

        <Button
          size="small"
          onClick={() => togglePanel('attachments')}
        >
          📎 Attachments{' '}
          <Tag color="green" style={{ margin: '0 0 0 4px', fontSize: 10, lineHeight: '16px' }}>1/3</Tag>
        </Button>
      </div>

      {/* ── Deduction panel ────────────────────────────────────────────── */}
      {globalPanel === 'deduction' && (
        <div className="kbr-panel">
          <Space size={12} wrap>
            <span className="kbr-panel-label">Reason</span>
            <Select
              size="small"
              style={{ width: 200 }}
              placeholder="— No deduction —"
              value={dedReason || undefined}
              onChange={v => setDedReason(v ?? '')}
              allowClear
              options={[
                { value: 'deposit', label: 'Deposit Offset' },
                { value: 'ar',      label: 'Historical AR Offset' },
              ]}
            />
            <span className="kbr-panel-label">Amount (JPY)</span>
            <Input
              size="small"
              style={{ width: 130 }}
              placeholder="0"
              value={dedAmount}
              onChange={e => setDedAmount(e.target.value)}
            />
            {dedActive && <Tag color="success">✓ Saved</Tag>}
          </Space>
        </div>
      )}

      {/* ── Attachments panel ──────────────────────────────────────────── */}
      {globalPanel === 'attachments' && (
        <div className="kbr-panel">
          <Space size={8} wrap>
            <Tag color="success"  style={{ padding: '4px 10px', fontSize: 12 }}>✓ Merchant Statement</Tag>
            <Tag color="warning"  style={{ padding: '4px 10px', fontSize: 12 }}>⚠ Invoice — not uploaded</Tag>
            <Tag                  style={{ padding: '4px 10px', fontSize: 12, color: '#8c8c8c' }}>Recon Draft — N/A until Step 4</Tag>
            <Button size="small" type="dashed">+ Upload file</Button>
          </Space>
        </div>
      )}

      {/* ── Page content ───────────────────────────────────────────────── */}
      <div className="kbr-content">

        <Title level={4} style={{ marginBottom: 4, color: '#141414' }}>Booking Report Overview</Title>
        <Text type="secondary" style={{ fontSize: 13, display: 'block', marginBottom: 16 }}>
          Review Klook-side transaction data before beginning reconciliation.
        </Text>

        {/* ── Merchant Info Card ───────────────────────────────────────── */}
        <Card
          size="small"
          style={{ marginBottom: 16 }}
          styles={{ body: { padding: 0 } }}
        >
          {/* Custom collapsible header */}
          <div
            className={`kbr-merchant-header ${merchantOpen ? 'kbr-merchant-header--open' : ''}`}
            onClick={() => setMerchantOpen(o => !o)}
          >
            <Space>
              <span style={{ fontWeight: 700, fontSize: 13 }}>Merchant Info</span>
              <span style={{ fontSize: 11, color: '#8c8c8c' }}>JP-00341 · Tokyo Skytree Tours · JPY</span>
            </Space>
            <Space>
              <Tag color="warning">⚠ Payment info unverified</Tag>
              <span style={{ fontSize: 11, color: '#8c8c8c' }}>
                {merchantOpen ? 'Hide details ▴' : 'Show details ▾'}
              </span>
            </Space>
          </div>

          {merchantOpen && (
            <div style={{ padding: '14px 16px' }}>
              {MERCHANT_FIELDS.map((group, gi) => (
                <div key={gi}>
                  {gi > 0 && <Divider style={{ margin: '10px 0' }} />}
                  <Row gutter={[20, 10]}>
                    {group.map((f, fi) => (
                      <Col key={fi} xs={24} sm={12} md={'span' in f && f.span === 2 ? 12 : 6}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <span style={{ fontSize: 11, color: '#8c8c8c', fontWeight: 500 }}>{f.label}</span>
                          <span style={{ fontSize: 13 }}>{f.value}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <Row gutter={[14, 14]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title={<span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.04em' }}>Total Transactions</span>}
                value={156}
                valueStyle={{ fontSize: 24, fontWeight: 700 }}
                suffix={<span style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}> / 128 bookings</span>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title={<span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.04em' }}>KBR Amount</span>}
                value={234500}
                valueStyle={{ fontSize: 24, fontWeight: 700 }}
                prefix="¥"
              />
              <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>Gross settlement amount</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <div style={{ fontSize: 11, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>Settlement Period</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Nov 01 – Nov 30</div>
              <div style={{ fontSize: 11, color: '#8c8c8c', fontFamily: 'monospace' }}>2024-11-01 ~ 2024-11-30</div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <div style={{ fontSize: 11, color: '#8c8c8c', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 8 }}>Reconciliation Status</div>
              <Tag color="warning" style={{ fontSize: 13, padding: '3px 10px', fontWeight: 600 }}>Not Started</Tag>
              <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 6 }}>No statement uploaded yet</div>
            </Card>
          </Col>
        </Row>

        {/* ── Body layout ──────────────────────────────────────────────── */}
        <Row gutter={16} align="top">

          {/* Left: Transaction table */}
          <Col flex="1" style={{ minWidth: 0 }}>
            <div className="kbr-tx-header">
              <span style={{ fontSize: 15, fontWeight: 700 }}>Transaction Details</span>
              <span style={{ fontSize: 12, color: '#8c8c8c' }}>Data as of 2024-12-01 · Transaction granularity</span>
            </div>

            <Space style={{ marginBottom: 10 }} wrap>
              <Button size="small">↓ Export KBR Details (Excel)</Button>
              <Button size="small">✉ Send to Merchant</Button>
              <Input
                size="small"
                placeholder="Search by Booking No."
                style={{ width: 200 }}
                value={txSearch}
                onChange={e => setTxSearch(e.target.value)}
                allowClear
              />
              <Select
                size="small"
                placeholder="All Types"
                style={{ width: 140 }}
                value={txType}
                onChange={v => setTxType(v)}
                allowClear
                options={[
                  { value: 'Fulfillment',  label: 'Fulfillment' },
                  { value: 'Return',       label: 'Return' },
                  { value: 'Compensation', label: 'Compensation' },
                ]}
              />
            </Space>

            <Card styles={{ body: { padding: 0 } }}>
              <Table<TxRow>
                dataSource={displayTx}
                columns={TX_COLS}
                rowKey="key"
                size="small"
                scroll={{ x: 3400 }}
                pagination={{
                  pageSize: 6,
                  size: 'small',
                  showTotal: (t, r) => `Showing ${r[0]}–${r[1]} of ${t} transactions`,
                }}
                rowClassName={row =>
                  row.txType === 'Fulfillment' ? 'kbr-tx-fulfillment'
                  : row.txType === 'Return'    ? 'kbr-tx-return'
                  : 'kbr-tx-comp'
                }
                footer={() => (
                  <span style={{ fontSize: 12, color: '#8c8c8c', fontStyle: 'italic' }}>
                    Reconciliation will compare against merchant statement at Booking No. level (transactions aggregated per booking).
                  </span>
                )}
              />
            </Card>
          </Col>

          {/* Right: side panels */}
          <Col className="kbr-right-col">
            <Space direction="vertical" style={{ width: '100%' }} size={12}>

              {/* System Issues */}
              <Card
                size="small"
                className="kbr-issues-card"
                styles={{ header: { background: '#fffbe6' } }}
                title={
                  <Space>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>⚠ System-Detected Issues</span>
                    <Tag color="error">1</Tag>
                  </Space>
                }
              >
                <Space align="start" size={10}>
                  <span style={{ color: '#fa8c16', fontSize: 16, flexShrink: 0 }}>⚠</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>
                      Merchant Payment Info Unverified
                    </div>
                    <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.5, marginBottom: 6 }}>
                      Bank account not submitted for approval. Will auto-resolve when merchant completes verification.
                    </div>
                    <Button type="link" size="small" style={{ padding: 0, fontSize: 12 }}>
                      Send Reminder to BD →
                    </Button>
                  </div>
                </Space>
                <div style={{ fontSize: 11, color: '#8c8c8c', fontStyle: 'italic', marginTop: 8 }}>
                  No direct AP action needed at this stage — monitoring only.
                </div>
              </Card>

              {/* Next Step */}
              <Card size="small" styles={{ body: { padding: 14 } }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Next Step</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Start Reconciliation</div>
                <div style={{ fontSize: 12, color: '#595959', lineHeight: 1.5, marginBottom: 12 }}>
                  When you have the merchant's statement, proceed to Step 2 to upload and reconcile against this KBR.
                </div>
                <Button type="primary" block>
                  Proceed to Reconciliation →
                </Button>
                <Divider style={{ margin: '10px 0' }} />
                <Button type="link" block style={{ fontSize: 12, color: '#595959' }}>
                  Record proactive adjustment in Step 3 →
                </Button>
              </Card>

            </Space>
          </Col>
        </Row>
      </div>
    </div>
  )
}
