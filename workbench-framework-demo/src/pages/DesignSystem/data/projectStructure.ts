export interface TreeNode {
  name: string
  desc: string
  descCn: string
  isDir: boolean
  indent: number
}

export const DIR_TREE: TreeNode[] = [
  { name: 'core/', desc: 'Core config + theme (aligned with downstream UmiJS)', descCn: '核心配置 + 主题（对齐下游 UmiJS）', isDir: true, indent: 0 },
  { name: 'config/', desc: 'Business line definitions, nav configs, registry', descCn: '业务线定义、导航配置、注册中心', isDir: true, indent: 1 },
  { name: 'modules/', desc: 'Per-business-line nav JSON files', descCn: '各业务线导航 JSON 配置', isDir: true, indent: 2 },
  { name: 'theme/', desc: 'Single source of truth for colors, tokens, themes', descCn: '颜色 / Token / 主题的唯一来源', isDir: true, indent: 1 },
  { name: 'components/', desc: 'Shared components (layout + shared + icons)', descCn: '通用组件（布局 + 共享 + 图标）', isDir: true, indent: 0 },
  { name: 'layout/', desc: 'Shell components: Header, Sidebar, Content, Nav', descCn: '框架组件：Header / Sidebar / Content / Nav', isDir: true, indent: 1 },
  { name: 'shared/', desc: 'Cross-page business components (≥2 pages)', descCn: '跨页面业务组件（≥2 个页面使用）', isDir: true, indent: 1 },
  { name: 'icons/', desc: 'Icon components', descCn: '图标组件', isDir: true, indent: 1 },
  { name: 'pages/', desc: 'Page components (PascalCase per business line)', descCn: '页面组件（按业务线 PascalCase 分目录）', isDir: true, indent: 0 },
  { name: 'Workbench/', desc: 'Dashboard pages', descCn: '工作台页面', isDir: true, indent: 1 },
  { name: 'Campaign/', desc: 'Campaign business pages', descCn: 'Campaign 业务页面', isDir: true, indent: 1 },
  { name: 'Finance/', desc: 'Finance business pages', descCn: 'Finance 业务页面', isDir: true, indent: 1 },
  { name: 'DesignSystem/', desc: 'Design System showcase + Skill visualization', descCn: 'Design System 展示 + Skill 可视化', isDir: true, indent: 1 },
  { name: 'hooks/', desc: 'Shared custom hooks (≥2 pages)', descCn: '共享自定义 Hooks（≥2 个页面使用）', isDir: true, indent: 0 },
  { name: 'services/api/', desc: 'API service layer', descCn: 'API 服务层', isDir: true, indent: 0 },
  { name: 'types/', desc: 'Shared TypeScript types', descCn: '全局 TypeScript 类型', isDir: true, indent: 0 },
]

export const CORE_RULES = [
  {
    num: 1,
    en: 'Page-private components cannot be cross-referenced',
    cn: '页面私有组件不可跨引用',
    detail: 'Components inside a page directory are private. Cross-import → promote to components/shared/.',
    detailCn: '页面目录内的组件仅限该页面使用。需跨引用时提升到 components/shared/。',
  },
  {
    num: 2,
    en: 'core/theme/ is the single source for colors and spacing',
    cn: 'core/theme/ 是颜色和间距的唯一来源',
    detail: 'Use CSS variables (--klook-bench-*) or antd tokens. No hardcoded hex values outside theme.',
    detailCn: '使用 CSS 变量或 antd token，主题目录外不可硬编码颜色值。',
  },
  {
    num: 3,
    en: 'Promote to shared when 2+ pages use it',
    cn: '2 个以上页面使用时提升为共享',
    detail: 'Move component from page-private to components/shared/ when a second page needs it.',
    detailCn: '当第二个页面需要某组件时，将其从页面私有移至 components/shared/。',
  },
  {
    num: 4,
    en: 'Steps form: each step as a separate file',
    cn: '分步表单：每步一个独立文件',
    detail: 'Multi-step forms split each step into steps/ directory. Shared state in hooks/.',
    detailCn: '多步表单将每一步拆分到 steps/ 目录，共享状态放 hooks/。',
  },
  {
    num: 5,
    en: 'Routing via App.tsx renderContent()',
    cn: '路由通过 App.tsx renderContent() 管理',
    detail: 'No React Router. Add conditional branches in renderContent(selectedKey, selectedSubKey).',
    detailCn: '不使用 React Router，在 renderContent() 中添加条件分支。',
  },
]

export const NAMING_DATA = [
  { key: '1', type: 'Page top-level dir', convention: 'PascalCase', example: 'Campaign/, Finance/', typeCn: '页面顶层目录' },
  { key: '2', type: 'Sub-page dir', convention: 'PascalCase', example: 'ActivityCreatePage/', typeCn: '子页面目录' },
  { key: '3', type: 'Components', convention: 'PascalCase.tsx', example: 'CampaignBuilderPage.tsx', typeCn: '组件' },
  { key: '4', type: 'Hooks', convention: 'camelCase with use prefix', example: 'useActivityForm.ts', typeCn: 'Hooks' },
  { key: '5', type: 'Type files', convention: 'types.ts', example: 'types.ts', typeCn: '类型文件' },
  { key: '6', type: 'Nav config', convention: 'kebab-case.nav.json', example: 'campaign.nav.json', typeCn: '导航配置' },
  { key: '7', type: 'Style files', convention: 'PascalCase.css (same as component)', example: 'ActivityCreatePage.css', typeCn: '样式文件' },
  { key: '8', type: 'Barrel export', convention: 'index.ts', example: 'index.ts', typeCn: 'barrel 导出' },
]

export const ROUTES = [
  { line: 'BD Bench', dir: 'pages/Workbench/', nav: 'bdbench.nav.json', cn: 'BD Bench' },
  { line: 'Merchant Account', dir: 'pages/Workbench/', nav: 'ma.nav.json', cn: '商户账号' },
  { line: 'Campaign', dir: 'pages/Campaign/', nav: 'campaign.nav.json', cn: '活动管理' },
  { line: 'Finance', dir: 'pages/Finance/', nav: 'finance.nav.json', cn: '财务' },
  { line: 'Design System', dir: 'pages/DesignSystem/', nav: 'designsystem.nav.json', cn: '设计系统' },
]

export const CHECKLIST = [
  { step: '1', action: 'Create page file', detail: 'pages/[BizLine]/[PageName].tsx or pages/[BizLine]/[PageName]/index.tsx', actionCn: '创建页面文件' },
  { step: '2', action: 'Add nav config', detail: 'core/config/modules/[bizline].nav.json — add menu item', actionCn: '添加导航配置' },
  { step: '3', action: 'Register route', detail: 'App.tsx renderContent() — add conditional branch', actionCn: '注册路由分支' },
  { step: '4', action: 'Barrel export', detail: 'pages/[BizLine]/index.ts — add export', actionCn: '添加 barrel 导出' },
  { step: '5', action: 'Types (if complex)', detail: 'pages/[BizLine]/[PageName]/types.ts', actionCn: '类型定义（复杂页面）' },
  { step: '6', action: 'Verify', detail: 'All components use AntD + CSS vars, no hardcoded colors', actionCn: '验证：使用 AntD 组件 + CSS 变量' },
]
