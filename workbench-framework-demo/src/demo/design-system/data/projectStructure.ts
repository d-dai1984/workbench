export interface TreeNode {
  name: string
  desc: string
  descCn: string
  isDir: boolean
  indent: number
}

export const DIR_TREE: TreeNode[] = [
  { name: 'app/', desc: 'Route layer — page.tsx entry files', descCn: '路由层 — page.tsx 入口文件', isDir: true, indent: 0 },
  { name: 'pages/', desc: 'View layer — page-level components', descCn: '视图层 — 页面级组件', isDir: true, indent: 0 },
  { name: 'components/', desc: 'Shared components (promoted from pages)', descCn: '共享组件（从页面提升而来）', isDir: true, indent: 1 },
  { name: 'hooks/', desc: 'Shared hooks (promoted from pages)', descCn: '共享 hooks（从页面提升而来）', isDir: true, indent: 1 },
  { name: 'components/', desc: 'Shared layer — cross-page components', descCn: '共享层 — 跨页面组件', isDir: true, indent: 0 },
  { name: 'hooks/', desc: 'Shared custom hooks', descCn: '共享自定义 hooks', isDir: true, indent: 0 },
  { name: 'services/', desc: 'API service layer', descCn: 'API 服务层', isDir: true, indent: 0 },
  { name: 'store/', desc: 'Global state management', descCn: '全局状态管理', isDir: true, indent: 0 },
  { name: 'theme/', desc: 'Single source of truth for colors/spacing', descCn: '颜色/间距的唯一真实来源', isDir: true, indent: 0 },
  { name: 'types/', desc: 'Shared TypeScript types', descCn: '共享 TypeScript 类型', isDir: true, indent: 0 },
]

export const CORE_RULES = [
  {
    num: 1,
    en: 'Page-private components cannot be cross-referenced',
    cn: '页面私有组件不可跨引用',
    detail: 'Components inside a page directory are private to that page. Other pages cannot import them.',
    detailCn: '页面目录内的组件仅限该页面使用，其他页面不可导入。',
  },
  {
    num: 2,
    en: 'page.tsx only does import + export, no JSX',
    cn: 'page.tsx 只做 import + export，不写 JSX',
    detail: 'The route entry file is a thin passthrough. All rendering logic lives in the pages/ directory.',
    detailCn: '路由入口文件仅做透传。所有渲染逻辑在 pages/ 目录中。',
  },
  {
    num: 3,
    en: 'theme/ is the single source for colors and spacing',
    cn: 'theme/ 是颜色和间距的唯一来源',
    detail: 'No hardcoded color hex or spacing magic numbers outside the theme directory.',
    detailCn: '主题目录外不可硬编码颜色 hex 值或间距魔法数字。',
  },
  {
    num: 4,
    en: 'Promote to shared when 2+ pages use it',
    cn: '2 个以上页面使用时提升为共享',
    detail: 'Move a component from page-private to shared/components when a second page needs it.',
    detailCn: '当第二个页面需要某组件时，将其从页面私有移至 shared/components。',
  },
  {
    num: 5,
    en: 'Steps form: each step as a separate file',
    cn: '分步表单：每步一个独立文件',
    detail: 'Multi-step forms split each step into its own component file for clarity and testability.',
    detailCn: '多步表单将每一步拆分为独立组件文件，提升清晰度和可测试性。',
  },
]

export const NAMING_DATA = [
  { key: '1', type: 'Components', convention: 'PascalCase', example: 'CampaignTable.tsx', typeCn: '组件' },
  { key: '2', type: 'Hooks', convention: 'camelCase with use prefix', example: 'useCampaignList.ts', typeCn: 'Hooks' },
  { key: '3', type: 'Directories', convention: 'kebab-case', example: 'campaign-list/', typeCn: '目录' },
  { key: '4', type: 'Type files', convention: 'camelCase', example: 'types.ts', typeCn: '类型文件' },
  { key: '5', type: 'Utility files', convention: 'camelCase', example: 'formatDate.ts', typeCn: '工具文件' },
  { key: '6', type: 'CSS files', convention: 'kebab-case (BEM)', example: 'campaign-table.css', typeCn: 'CSS 文件' },
]

export const ROUTES = [
  { line: 'Merchant', path: '/merchant/*', cn: '商户端' },
  { line: 'Admin', path: '/admin/*', cn: '管理后台' },
  { line: 'Workbench', path: '/workbench/*', cn: '工作台' },
]

export const CHECKLIST = [
  { file: 'index.tsx', desc: 'Page root component', descCn: '页面根组件' },
  { file: 'components/', desc: 'Page-private components', descCn: '页面私有组件' },
  { file: 'hooks/', desc: 'Page-private hooks', descCn: '页面私有 hooks' },
  { file: 'types.ts', desc: 'Page type definitions', descCn: '页面类型定义' },
  { file: 'page.tsx', desc: 'Route entry (import + re-export only)', descCn: '路由入口（仅 import + re-export）' },
]
