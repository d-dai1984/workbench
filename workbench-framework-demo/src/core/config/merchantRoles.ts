import type { MerchantRoleItem } from '../../components/layout/KlookBenchHeader'

export const defaultMerchantRoleItems: MerchantRoleItem[] = [
  { key: 'bdbench', title: 'BD Bench', desc: 'Control and connect merchants and products.', icon: '/merchant-role-icons/bd-expansion.svg', tone: 'purple' },
  { key: 'ma', title: 'MA', desc: 'Merchant Account management.', icon: '/merchant-role-icons/ceg-service.svg', tone: 'blue' },
  { key: 'campaign', title: 'Campaign', desc: 'Campaign and promotion management.', icon: '/merchant-role-icons/pic-warehouse.svg', tone: 'indigo' },
  { key: 'finance', title: 'Finance', desc: 'Financial settlement and supervision.', icon: '/merchant-role-icons/mkt-market.svg', tone: 'pink' },
  { key: 'designsystem', title: 'Design System', desc: 'Atomic & module component specifications.', icon: '/merchant-role-icons/platform.svg', tone: 'orange' },
  { key: 'ops-operations', title: 'OPS / Operations', desc: 'Content maintenance and user conversion.', icon: '/merchant-role-icons/ops-operations.svg', tone: 'orange' },
  { key: 'fis-finance', title: 'FIS / Finance', desc: 'Financial security and supervision.', icon: '/merchant-role-icons/fis-finance.svg', tone: 'green' },
  { key: 'risk-control', title: 'Risk Control', desc: 'Full-link risk control, anti-corruption.', icon: '/merchant-role-icons/risk-control.svg', tone: 'red' },
  { key: 'gds-distribution', title: 'GDS / Distribution', desc: 'Management of different distribution channels.', icon: '/merchant-role-icons/gds-distribution.svg', tone: 'cyan' },
  { key: 'data', title: 'Data', desc: 'Data collection, cleaning, visualization.', icon: '/merchant-role-icons/data.svg', tone: 'teal' },
  { key: 'admin', title: 'Admin', desc: 'Ensure normal workbench operation.', icon: '/merchant-role-icons/admin.svg', tone: 'gray' },
  { key: 'platform', title: 'Platform', desc: 'Manage platform content and tools.', icon: '/merchant-role-icons/platform.svg', tone: 'slate' },
  { key: 'manager-boss', title: 'Manager / Boss', desc: 'Focus on overall data and control.', icon: '/merchant-role-icons/manager-boss.svg', tone: 'yellow' },
]

/** Keys that correspond to switchable business lines */
export const BUSINESS_LINE_KEYS = ['bdbench', 'ma', 'campaign', 'finance', 'designsystem'] as const
export type BusinessLineKey = typeof BUSINESS_LINE_KEYS[number]
