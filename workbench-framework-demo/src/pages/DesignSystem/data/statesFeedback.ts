export const STATUS_DEFINITION = [
  {
    status: 'Draft',
    cn: '草稿',
    color: 'default',
    ops: 'Edit, Submit, Delete',
    cnOps: '编辑、提交、删除',
    flow: 'Created → (Submit) → Pending',
  },
  {
    status: 'Pending',
    cn: '待审核',
    color: 'processing',
    ops: 'View, Approve, Reject',
    cnOps: '查看、通过、拒绝',
    flow: 'Submitted → (Approve) → Active',
  },
  {
    status: 'Active',
    cn: '活跃',
    color: 'success',
    ops: 'View, Pause, Edit',
    cnOps: '查看、暂停、编辑',
    flow: 'Approved → (Pause) → Paused',
  },
  {
    status: 'Paused',
    cn: '已暂停',
    color: 'warning',
    ops: 'Resume, Delete',
    cnOps: '恢复、删除',
    flow: 'Active → (Pause) → Paused',
  },
  {
    status: 'Rejected',
    cn: '已拒绝',
    color: 'error',
    ops: 'View, Re-edit, Delete',
    cnOps: '查看、重新编辑、删除',
    flow: 'Pending → (Reject) → Rejected',
  },
]

export const FEEDBACK_RULES = [
  {
    type: 'Message',
    cn: '消息提示',
    usage: 'Lightweight operations (save, copy, toggle)',
    cnUsage: '轻量操作（保存、复制、切换）',
    duration: '3s auto-dismiss',
    example: 'message.success("Saved")',
  },
  {
    type: 'Notification',
    cn: '通知提醒',
    usage: 'Persistent results needing acknowledgment',
    cnUsage: '需要确认的持久结果',
    duration: '4.5s or manual close',
    example: 'notification.info({ message, description })',
  },
  {
    type: 'Alert',
    cn: '警告提示',
    usage: 'Inline contextual warnings in a section',
    cnUsage: '区块内行内上下文警告',
    duration: 'Persistent (in page)',
    example: '<Alert type="warning" message="..." />',
  },
  {
    type: 'Form Error',
    cn: '表单错误',
    usage: 'Field-level validation errors',
    cnUsage: '字段级校验错误',
    duration: 'Until corrected',
    example: 'rules={[{ required: true }]}',
  },
]

export const CONFIRM_STRATEGIES = [
  {
    level: 'Low',
    cn: '低',
    color: '#52c41a',
    method: 'Popconfirm',
    cnMethod: 'Popconfirm 气泡确认',
    example: 'Toggle status, remove tag',
    cnExample: '切换状态、移除标签',
  },
  {
    level: 'Medium',
    cn: '中',
    color: '#faad14',
    method: 'Modal.confirm',
    cnMethod: 'Modal.confirm 对话确认',
    example: 'Batch disable, export data',
    cnExample: '批量停用、导出数据',
  },
  {
    level: 'High',
    cn: '高',
    color: '#ff4d4f',
    method: 'Modal.confirm + danger',
    cnMethod: 'Modal.confirm + danger 按钮',
    example: 'Delete records, cancel order',
    cnExample: '删除记录、取消订单',
  },
]

export const ERROR_HANDLING = [
  { scenario: 'Request Timeout', cn: '请求超时', action: 'Show retry option with message', cnAction: '显示重试选项和提示信息' },
  { scenario: 'Form Submit Fail', cn: '表单提交失败', action: 'Keep form data, highlight failed fields, show error message', cnAction: '保留表单数据、高亮失败字段、显示错误消息' },
  { scenario: 'Page Load Fail', cn: '页面加载失败', action: 'Show error state with retry button', cnAction: '显示错误状态和重试按钮' },
  { scenario: '404 Not Found', cn: '页面未找到', action: 'Show 404 illustration + back to home link', cnAction: '显示 404 插图 + 返回首页链接' },
  { scenario: '500 Server Error', cn: '服务端异常', action: 'Show 500 illustration + contact support info', cnAction: '显示 500 插图 + 联系技术支持信息' },
]
