export interface CheckItem {
  en: string
  cn: string
}

export interface CheckCategory {
  title: string
  titleCn: string
  color: string
  items: CheckItem[]
}

export const CATEGORIES: CheckCategory[] = [
  {
    title: 'Scope',
    titleCn: '范围',
    color: '#1677FF',
    items: [
      {
        en: 'In-scope confirmed: requirement belongs to the 3 product lines',
        cn: '范围确认：需求属于 3 条产品线之一',
      },
      {
        en: 'Page pattern assigned: matched to one of the 5 standard patterns',
        cn: '页面模式已分配：匹配到 5 种标准模式之一',
      },
      {
        en: 'No out-of-scope components introduced without flagging',
        cn: '未引入超范围组件（除非已标记）',
      },
    ],
  },
  {
    title: 'Structure',
    titleCn: '结构',
    color: '#722ED1',
    items: [
      {
        en: 'Output includes all required sections per the page pattern',
        cn: '输出包含页面模式要求的所有区块',
      },
      {
        en: 'Clear structure: sections logically grouped and labeled',
        cn: '结构清晰：区块按逻辑分组并标注',
      },
      {
        en: 'Breadcrumb rule applied: all nested pages have breadcrumb navigation',
        cn: '面包屑规则已应用：所有嵌套页面有面包屑导航',
      },
    ],
  },
  {
    title: 'Components',
    titleCn: '组件',
    color: '#13C2C2',
    items: [
      {
        en: 'Table: rowKey is set and unique',
        cn: 'Table：rowKey 已设置且唯一',
      },
      {
        en: 'Table: action column fixed to the right',
        cn: 'Table：操作列固定在右侧',
      },
      {
        en: 'Filter: placement follows page pattern convention',
        cn: '筛选器：位置遵循页面模式约定',
      },
      {
        en: 'Select: remote search enabled for large datasets',
        cn: 'Select：大数据量启用远程搜索',
      },
      {
        en: 'Upload: file type, size limit, and count constraints defined',
        cn: 'Upload：文件类型、大小限制和数量约束已定义',
      },
      {
        en: 'No static methods (message.xxx, notification.xxx) — use hooks instead',
        cn: '不使用静态方法（message.xxx、notification.xxx）— 使用 hooks',
      },
      {
        en: 'No List component — use Table or custom Card grid',
        cn: '不使用 List 组件 — 用 Table 或自定义卡片网格',
      },
      {
        en: 'Tabs: tabPosition follows convention (top for main nav)',
        cn: 'Tabs：tabPosition 遵循约定（主导航用 top）',
      },
      {
        en: 'Steps: titlePlacement follows convention',
        cn: 'Steps：titlePlacement 遵循约定',
      },
    ],
  },
  {
    title: 'States & Feedback',
    titleCn: '状态与反馈',
    color: '#FA8C16',
    items: [
      {
        en: 'Status set defined: all possible statuses listed with semantic colors',
        cn: '状态集已定义：所有可能状态已列出并配语义色',
      },
      {
        en: 'All operations have user feedback (success/error notification)',
        cn: '所有操作有用户反馈（成功/错误通知）',
      },
      {
        en: 'High-risk actions have confirmation dialogs',
        cn: '高风险操作有确认弹窗',
      },
      {
        en: 'Empty states: all scenarios covered (no data, no result, no permission)',
        cn: '空状态：覆盖所有场景（无数据、无结果、无权限）',
      },
      {
        en: 'Loading states: skeleton or spinner for all async sections',
        cn: '加载状态：所有异步区块有骨架屏或旋转器',
      },
      {
        en: 'Error recovery: retry or fallback provided for failed requests',
        cn: '错误恢复：请求失败提供重试或降级方案',
      },
    ],
  },
  {
    title: 'Tokens / Visual',
    titleCn: '令牌 / 视觉',
    color: '#EB2F96',
    items: [
      {
        en: 'Colors: all from brandTheme — no hardcoded hex outside tokens',
        cn: '颜色：全部来自 brandTheme — 不硬编码令牌外的 hex 值',
      },
      {
        en: 'Border radius: no undefined radius values (use 6px components, 4px elements)',
        cn: '圆角：不使用未定义的圆角值（组件 6px、元素 4px）',
      },
      {
        en: 'Shadows: no custom shadows — use only token-defined shadows',
        cn: '阴影：不使用自定义阴影 — 仅使用令牌定义的阴影',
      },
      {
        en: 'Pill shape (borderRadius 999) only for status/menu items',
        cn: 'Pill 形状（borderRadius 999）仅用于状态/菜单项',
      },
      {
        en: 'Icons: tree-shaken imports — no wildcard import of icon library',
        cn: '图标：按需引入 — 不整包导入图标库',
      },
    ],
  },
  {
    title: 'Content / Copy',
    titleCn: '文案',
    color: '#52C41A',
    items: [
      {
        en: 'Button labels: verb + noun format for all actions',
        cn: '按钮标签：所有操作使用动词+名词格式',
      },
      {
        en: 'Field labels: nouns only, no verbs',
        cn: '字段标签：仅名词，不使用动词',
      },
      {
        en: 'Placeholders: show example values, not label repeats',
        cn: '占位符：显示示例值，不重复标签',
      },
      {
        en: 'Empty state: action text provided for next steps',
        cn: '空状态：提供下一步操作文案',
      },
      {
        en: 'Confirm dialog title: verb + object format',
        cn: '确认弹窗标题：动词+宾语格式',
      },
      {
        en: 'Error messages: explain cause and provide solution path',
        cn: '错误提示：解释原因并提供解决路径',
      },
    ],
  },
]
