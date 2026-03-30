export const PRIMARY_COLOR = '#1677FF'

export const TEXT_COLORS = [
  { label: 'Primary Text', cn: '主文本', color: 'rgba(0, 0, 0, 0.88)', hex: 'rgba(0,0,0,0.88)' },
  { label: 'Secondary Text', cn: '次级文本', color: 'rgba(0, 0, 0, 0.65)', hex: 'rgba(0,0,0,0.65)' },
  { label: 'Tertiary Text', cn: '三级文本', color: 'rgba(0, 0, 0, 0.45)', hex: 'rgba(0,0,0,0.45)' },
  { label: 'Disabled Text', cn: '禁用文本', color: 'rgba(0, 0, 0, 0.25)', hex: 'rgba(0,0,0,0.25)' },
]

export const BG_COLORS = [
  { label: 'Page Background', cn: '页面背景', color: '#F5F5F5', hex: '#F5F5F5' },
  { label: 'Container', cn: '容器', color: '#FFFFFF', hex: '#FFFFFF' },
  { label: 'Hover', cn: '悬停', color: '#FAFAFA', hex: '#FAFAFA' },
]

export const BORDER_COLORS = [
  { label: 'Border', cn: '边框', color: '#D9D9D9', hex: '#D9D9D9' },
  { label: 'Divider', cn: '分割线', color: '#F0F0F0', hex: '#F0F0F0' },
]

export const FUNCTIONAL_COLORS = [
  { label: 'Success', cn: '成功', color: '#52C41A', hex: '#52C41A' },
  { label: 'Warning', cn: '警告', color: '#FAAD14', hex: '#FAAD14' },
  { label: 'Error', cn: '错误', color: '#FF4D4F', hex: '#FF4D4F' },
  { label: 'Info', cn: '信息', color: '#1677FF', hex: '#1677FF' },
]

export const SPACINGS = [
  { size: 4, label: '4px' },
  { size: 8, label: '8px' },
  { size: 12, label: '12px' },
  { size: 16, label: '16px' },
  { size: 20, label: '20px' },
  { size: 24, label: '24px' },
  { size: 32, label: '32px' },
]

export const RADII = [
  { radius: 0, label: '0' },
  { radius: 2, label: '2px' },
  { radius: 4, label: '4px' },
  { radius: 6, label: '6px' },
  { radius: 12, label: '12px' },
  { radius: 16, label: '16px' },
  { radius: 9999, label: '9999px' },
]

export const FONT_SIZES = [
  { size: 12, label: '12px', usage: 'Caption / help text', cn: '标注 / 帮助文字' },
  { size: 14, label: '14px', usage: 'Body text (default)', cn: '正文（默认）' },
  { size: 16, label: '16px', usage: 'Subtitle / section title', cn: '副标题 / 区块标题' },
  { size: 20, label: '20px', usage: 'Page title (h4)', cn: '页面标题（h4）' },
  { size: 24, label: '24px', usage: 'Major heading (h3)', cn: '主标题（h3）' },
  { size: 30, label: '30px', usage: 'Display heading (h2)', cn: '展示标题（h2）' },
]

export const COMPONENT_TOKENS = [
  { component: 'Table', tokens: 'headerBg: #fafafa, borderColor: #f0f0f0, rowHoverBg: #fafafa', cn: '表头背景、边框色、行悬停背景' },
  { component: 'Menu', tokens: 'itemHeight: 46, itemBorderRadius: 8, itemSelectedBg: #e6f4ff', cn: '菜单项高度、圆角、选中背景' },
  { component: 'Card', tokens: 'borderRadiusLG: 16, paddingLG: 24, boxShadow: none', cn: '大圆角、大内边距、无阴影' },
  { component: 'Modal', tokens: 'borderRadius: 12, padding: 24', cn: '圆角、内边距' },
  { component: 'Form', tokens: 'itemMarginBottom: 24, labelFontSize: 14', cn: '表单项间距、标签字号' },
  { component: 'Breadcrumb', tokens: 'separatorMargin: 8, fontSize: 14', cn: '分隔符间距、字号' },
  { component: 'Tabs', tokens: 'horizontalMargin: 0 0 16px 0, cardBorderRadius: 8', cn: '水平间距、卡片圆角' },
  { component: 'Pagination', tokens: 'itemSize: 32, borderRadius: 6', cn: '项尺寸、圆角' },
]
