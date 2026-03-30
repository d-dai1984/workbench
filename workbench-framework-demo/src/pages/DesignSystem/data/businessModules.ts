export const TAG_PRESETS: Array<{
  color: string
  label: string
  cn: string
  usage: string
}> = [
  { color: 'success', label: 'Active', cn: '活跃', usage: 'Positive / completed' },
  { color: 'processing', label: 'Processing', cn: '处理中', usage: 'In progress' },
  { color: 'warning', label: 'Pending', cn: '待处理', usage: 'Needs attention' },
  { color: 'error', label: 'Failed', cn: '失败', usage: 'Error / rejected' },
  { color: 'default', label: 'Draft', cn: '草稿', usage: 'Inactive / default' },
  { color: 'blue', label: 'Scheduled', cn: '已排期', usage: 'Planned' },
  { color: 'cyan', label: 'In Review', cn: '审核中', usage: 'Under review' },
  { color: 'purple', label: 'VIP', cn: 'VIP', usage: 'Special category' },
  { color: 'magenta', label: 'Expired', cn: '已过期', usage: 'Time-sensitive' },
  { color: 'orange', label: 'Paused', cn: '已暂停', usage: 'Temporarily stopped' },
]
