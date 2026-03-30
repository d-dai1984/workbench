export const NAV_RULES = [
  {
    component: 'Menu',
    rules: [
      { en: 'Sidebar width: 256px expanded, 66px collapsed', cn: '侧边栏宽度：展开 256px，收起 66px', tag: '256/66px' },
      { en: 'Menu item height: 46px, selected pill radius 999px', cn: '菜单项高度：46px，选中态圆角 999px' },
    ],
  },
  {
    component: 'Breadcrumb',
    rules: [
      { en: 'Collapse when >5 levels (show first, last, and ellipsis)', cn: '超过 5 层时折叠（显示首尾和省略号）', tag: '>5 collapse', tagColor: 'orange' },
      { en: 'Always show current page as non-link', cn: '当前页面始终显示为非链接' },
    ],
  },
  {
    component: 'Tabs',
    rules: [
      { en: 'Use tabPlacement (NOT tabPosition) in v6', cn: 'v6 中使用 tabPlacement（非 tabPosition）', tag: 'v6 API', tagColor: 'red' },
      { en: 'Max visible tabs depends on container width; overflow uses dropdown', cn: '可见标签数取决于容器宽度；溢出使用下拉' },
    ],
  },
  {
    component: 'Steps',
    rules: [
      { en: 'Use titlePlacement (NOT labelPlacement) in v6', cn: 'v6 中使用 titlePlacement（非 labelPlacement）', tag: 'v6 API', tagColor: 'red' },
      { en: 'Keep step count 3-7 for usability', cn: '为保证可用性，步骤数保持 3-7 个' },
    ],
  },
]

export const DATA_DISPLAY_RULES = [
  {
    component: 'Table',
    rules: [
      { en: 'Always set rowKey="id" (or unique field)', cn: '始终设置 rowKey="id"（或唯一字段）', tag: 'required', tagColor: 'red' },
      { en: 'Action column: fixed="right"', cn: '操作列：fixed="right"', tag: 'fixed right' },
      { en: 'Enable virtual scrolling when >5000 rows', cn: '超过 5000 行时启用虚拟滚动', tag: '>5000 virtual', tagColor: 'orange' },
      { en: 'Max 8 columns visible; additional via expandable row or drawer', cn: '最多显示 8 列；超出使用展开行或抽屉' },
    ],
  },
  {
    component: 'Card',
    rules: [
      { en: 'Border radius: 16px, padding: 24px', cn: '圆角：16px，内边距：24px', tag: '16px radius' },
      { en: 'No shadow (flat design philosophy)', cn: '无阴影（扁平设计理念）' },
      { en: 'No border by default', cn: '默认无边框' },
    ],
  },
  {
    component: 'Descriptions',
    rules: [
      { en: 'Always wrap in Card container', cn: '始终包裹在 Card 容器中' },
      { en: 'Use bordered style for detail pages', cn: '详情页使用带边框样式' },
    ],
  },
  {
    component: 'Tag',
    rules: [
      { en: 'Use preset colors only (success, error, warning, processing, default)', cn: '仅使用预设颜色（success、error、warning、processing、default）' },
      { en: 'Border radius: 4px', cn: '圆角：4px', tag: '4px radius' },
    ],
  },
]

export const DATA_ENTRY_RULES = [
  {
    component: 'Form',
    rules: [
      { en: '<=6 fields → single column, Modal', cn: '<=6 个字段 → 单列，Modal', tag: '<=6 Modal' },
      { en: '7-12 fields → two columns, Drawer or page section', cn: '7-12 个字段 → 双列，Drawer 或页面分区', tag: '7-12 Drawer', tagColor: 'blue' },
      { en: '>12 fields → multi-step form (Steps)', cn: '>12 个字段 → 多步骤表单（Steps）', tag: '>12 Steps', tagColor: 'purple' },
      { en: 'Label placement: top (not left-aligned) for CJK text', cn: '标签位置：顶部（非左对齐），适配中日韩文字' },
    ],
  },
  {
    component: 'Input / Select / DatePicker',
    rules: [
      { en: 'Border radius: 6px for all form controls', cn: '所有表单控件圆角：6px', tag: '6px radius' },
      { en: 'Consistent height: 32px (default) or 40px (large)', cn: '统一高度：32px（默认）或 40px（大号）' },
    ],
  },
  {
    component: 'Upload',
    rules: [
      { en: 'Always show file size limit and accepted formats', cn: '始终显示文件大小限制和接受的格式' },
      { en: 'Use drag-and-drop area for batch uploads', cn: '批量上传使用拖拽区域' },
    ],
  },
]

export const FEEDBACK_RULES = [
  {
    component: 'Modal',
    rules: [
      { en: 'Border radius: 12px', cn: '圆角：12px', tag: '12px radius' },
      { en: 'Use only when field count <=6', cn: '仅在字段数 <=6 时使用' },
      { en: 'Confirmation dialogs: use Modal.confirm() method', cn: '确认对话框：使用 Modal.confirm() 方法' },
    ],
  },
  {
    component: 'Drawer',
    rules: [
      { en: 'Use when field count >6', cn: '字段数 >6 时使用', tag: '>6 fields', tagColor: 'blue' },
      { en: 'Footer always fixed at bottom', cn: '底部操作栏始终固定' },
      { en: 'Default width: 520px (medium), 720px (large)', cn: '默认宽度：520px（中）、720px（大）' },
    ],
  },
  {
    component: 'Message / Notification / Alert',
    rules: [
      { en: 'Message: lightweight operations (save, copy, toggle)', cn: 'Message：轻量操作（保存、复制、切换）' },
      { en: 'Notification: persistent results needing acknowledgment', cn: 'Notification：需要确认的持久结果' },
      { en: 'Alert: inline contextual warnings within a section', cn: 'Alert：区块内的行内上下文警告' },
    ],
  },
  {
    component: 'Spin',
    rules: [
      { en: 'Always set delay={300} to avoid flash', cn: '始终设置 delay={300} 避免闪烁', tag: 'delay 300', tagColor: 'orange' },
    ],
  },
  {
    component: 'Skeleton',
    rules: [
      { en: 'Use for first-load only (not subsequent loading)', cn: '仅用于首次加载（非后续加载）' },
      { en: 'Match the shape of actual content being loaded', cn: '匹配正在加载的实际内容形状' },
    ],
  },
]

export const DEPRECATIONS = [
  {
    deprecated: 'List',
    replacement: 'Table or custom Card grid',
    cn: 'Table 或自定义 Card 栅格',
    reason: 'List component deprecated in v6',
  },
  {
    deprecated: 'Dropdown.Button',
    replacement: 'Space.Compact + Button + Dropdown',
    cn: 'Space.Compact + Button + Dropdown',
    reason: 'Better composition pattern',
  },
  {
    deprecated: 'tabPosition (Tabs)',
    replacement: 'tabPlacement',
    cn: 'tabPlacement',
    reason: 'Renamed in v6',
  },
  {
    deprecated: 'labelPlacement (Steps)',
    replacement: 'titlePlacement',
    cn: 'titlePlacement',
    reason: 'Renamed in v6',
  },
]
