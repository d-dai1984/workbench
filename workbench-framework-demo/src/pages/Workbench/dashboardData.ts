/**
 * Dashboard demo data. Replace or load from API for production.
 */

export interface TodoRow {
  key: string
  priority: string
  taskTitle: string
  taskSubtitle: string
  stage: string
  deadline: string
  risk: string
  status: string
  primaryAction: string
  secondaryAction: string
}

export const todoData: TodoRow[] = [
  {
    key: '1',
    priority: 'P0',
    taskTitle: 'Spring Campaign Resource Confirmation – 5 Merchants',
    taskSubtitle: 'Merchant Fund Promo $25K',
    stage: 'contracting',
    deadline: 'Mar 20',
    risk: 'High',
    status: 'Waiting Approval',
    primaryAction: 'Approve Contact',
    secondaryAction: 'View terms',
  },
  {
    key: '2',
    priority: 'P0',
    taskTitle: 'Spring Campaign Resource Confirmation – 5 Merchants',
    taskSubtitle: 'Merchant Fund Promo $25K',
    stage: 'Active',
    deadline: 'Mar 20',
    risk: 'High',
    status: 'Waiting Approval',
    primaryAction: 'Send Reminder',
    secondaryAction: 'Confirm Budget',
  },
  {
    key: '3',
    priority: 'P0',
    taskTitle: 'Spring Campaign Resource Confirmation – 5 Merchants',
    taskSubtitle: 'Merchant Fund Promo $25K',
    stage: 'Growth',
    deadline: 'Mar 20',
    risk: 'High',
    status: 'Waiting Approval',
    primaryAction: 'Review Assets',
    secondaryAction: 'Request Revision',
  },
]

export const takeRateData = [
  { day: '1', value: 1300, type: '目标值' },
  { day: '2', value: 1360, type: '目标值' },
  { day: '3', value: 1350, type: '目标值' },
  { day: '4', value: 1420, type: '目标值' },
  { day: '5', value: 1410, type: '目标值' },
  { day: '6', value: 1540, type: '目标值' },
  { day: '7', value: 1620, type: '目标值' },
  { day: '8', value: 1630, type: '目标值' },
  { day: '9', value: 1710, type: '目标值' },
  { day: '1', value: 1280, type: '实际值' },
  { day: '2', value: 1320, type: '实际值' },
  { day: '3', value: 1330, type: '实际值' },
  { day: '4', value: 1350, type: '实际值' },
  { day: '5', value: 1350, type: '实际值' },
  { day: '6', value: 1370, type: '实际值' },
  { day: '7', value: 1385, type: '实际值' },
  { day: '8', value: 1400, type: '实际值' },
  { day: '9', value: 1400, type: '实际值' },
]

export const merchantAcquisitionData = [
  { channel: '今天四', value: 18 },
  { channel: '今天三', value: 28 },
  { channel: '今天二', value: 52 },
  { channel: '今天一', value: 120 },
]

export const merchantFundPromoData = [
  { type: '分类一', value: 12 },
  { type: '分类二', value: 10 },
  { type: '分类三', value: 11 },
  { type: '分类四', value: 9 },
  { type: '分类五', value: 8 },
  { type: '分类六', value: 10 },
  { type: '分类七', value: 9 },
  { type: '分类八', value: 11 },
]

export const quickAccessItems = [
  { key: 'contract-approval', label: 'Contract Approval', icon: '/quick-access-icons/contract-approval.svg' },
  { key: 'pricing-tools', label: 'Pricing Tools', icon: '/quick-access-icons/pricing-tools.svg' },
  { key: 'company-okr', label: 'Company OKR', icon: '/quick-access-icons/company-okr.svg' },
  { key: 'create-new-merchant', label: 'Create New Merchant', icon: '/quick-access-icons/create-new-merchant.svg' },
]

export const productStateCards = [
  { title: 'High risk', value: '2', desc: 'Need immediate attention', tone: 'danger' },
  { title: 'Healthy', value: '2', desc: 'Good to sell', tone: 'success' },
  { title: 'Improvable', value: '1', desc: 'Opportunity to grow', tone: 'warning' },
  { title: 'Vertical rank', value: 'Under 50%', desc: 'in Theme Parks & Tours', tone: 'accent' },
] as const

export const whyToDoItems = [
  { title: 'Boost Bookings by XX%', desc: 'Activate proven, high-conversion settings.' },
  { title: 'Top-Seller Strategies', desc: 'Outpace competition with best-seller configurations.' },
  { title: '10-Minute Optimization', desc: 'Improve results effortlessly with quick, simple tasks.' },
]
