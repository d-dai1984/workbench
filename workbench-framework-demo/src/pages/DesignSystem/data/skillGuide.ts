export const WORKFLOW_STEPS = [
  { title: 'Scope', cn: '范围判断', desc: 'Determine if the requirement falls within the 3 product lines and 5 page patterns.', cnDesc: '判断需求是否在三条产品线和五种页面模式范围内。', file: '01-scope.md' },
  { title: 'Layout', cn: '框架布局', desc: 'Apply framework-level specs: Header 56px, Sidebar 256px, Content area spacing.', cnDesc: '应用框架规范：Header 56px、Sidebar 256px、内容区间距。', file: '02-layout-framework.md' },
  { title: 'Page Pattern', cn: '页面模式', desc: 'Match requirement to a standard pattern (Dashboard / List / Detail / Form / Config).', cnDesc: '将需求匹配到标准页面模式（工作台/列表/详情/表单/配置）。', file: '03-page-patterns.md' },
  { title: 'Container Structure', cn: '容器结构', desc: 'Map page content to L1 Section / L2 Card / L3 Field Group hierarchy (max 3 levels). If structured PRD available, read hierarchy directly.', cnDesc: '将页面内容映射为 L1 区域 / L2 卡片 / L3 字段分组层级（最大 3 层）。有结构化 PRD 时直接读取层级信息。', file: '03b-container-structure.md' },
  { title: 'Business Modules', cn: '业务模块', desc: 'Identify reusable modules: filter table, batch actions, drawer edit, permissions.', cnDesc: '识别可复用模块：筛选表格、批量操作、抽屉编辑、权限状态。', file: '04-business-modules.md' },
  { title: 'Component Rules', cn: '组件规则', desc: 'Select components within whitelist constraints (Table, Card, Steps, Form, Modal...).', cnDesc: '在白名单约束内选择组件（Table、Card、Steps、Form、Modal…）。', file: '05-component-rules.md' },
  { title: 'Tokens & Theme', cn: '设计令牌', desc: 'Apply design tokens: colors, radius, spacing, shadows from brand theme.', cnDesc: '应用设计令牌：颜色、圆角、间距、阴影。', file: '06-tokens.md' },
  { title: 'States & Feedback', cn: '状态与反馈', desc: 'Define loading, empty, error, permission states and confirmation strategies.', cnDesc: '定义加载、空态、异常、权限状态和确认策略。', file: '07-states-feedback-permission.md' },
  { title: 'Content Guidelines', cn: '文案规则', desc: 'Button labels, placeholders, error messages, empty state copy.', cnDesc: '按钮命名、占位符、错误提示、空状态文案。', file: '08-content-guidelines.md' },
  { title: 'Review Checklist', cn: '输出自检', desc: 'Final self-check across scope, structure, components, states, tokens, and copy.', cnDesc: '最终检查：范围、结构、组件、状态、Token、文案。', file: '09-review-checklist.md' },
]

export const PAGE_PATTERNS = [
  { name: 'Dashboard', cn: '工作台', variants: 1, desc: 'Stats cards + charts + quick access', cnDesc: '统计卡片 + 图表 + 快捷入口', color: 'blue' as const },
  { name: 'List Page', cn: '列表页', variants: 2, desc: 'Standard Table or Card List with filters', cnDesc: '标准表格或卡片列表，含筛选区', color: 'cyan' as const },
  { name: 'Detail Page', cn: '详情页', variants: 2, desc: 'Info sections + related data + optional audit', cnDesc: '信息分区 + 关联数据 + 可选审核模式', color: 'green' as const },
  { name: 'Form Page', cn: '表单页', variants: 2, desc: 'Single page or multi-step wizard', cnDesc: '单页表单或多步骤向导', color: 'orange' as const },
  { name: 'Config Page', cn: '配置页', variants: 1, desc: 'Anchor nav + grouped settings', cnDesc: '锚点导航 + 分组配置', color: 'purple' as const },
]

export const PRODUCT_LINES = [
  { name: 'Admin', cn: '管理后台', users: 'Klook internal ops', cnUsers: 'Klook 内部运营/管理', status: 'Active', cnStatus: '主力在用' },
  { name: 'Merchant', cn: '商户端', users: 'External partners', cnUsers: '外部商户合作伙伴', status: 'Active', cnStatus: '主力在用' },
  { name: 'Workbench', cn: '工作台', users: 'Klook internal staff', cnUsers: 'Klook 内部员工', status: 'Exploring', cnStatus: '探索阶段' },
]

export const PRINCIPLES = [
  { rule: 'Pattern first, then components', cn: '先定模式，再选组件', desc: 'Identify the page pattern before picking any component.', cnDesc: '先确定页面模式，再讨论组件选型。' },
  { rule: 'Reuse over creation', cn: '复用优先，不默认创造', desc: 'Prefer existing patterns. Do not invent new structures by default.', cnDesc: '优先复用现有模式，不默认创造新结构。' },
  { rule: 'Components are means, not goals', cn: '组件是手段，不是目的', desc: 'Components serve the pattern, not the other way around.', cnDesc: '组件服务于页面模式，而不是反过来。' },
  { rule: 'States are mandatory', cn: '状态设计不可缺失', desc: 'Every page must define loading, empty, error, and permission states.', cnDesc: '每个页面必须定义加载、空态、异常和权限状态。' },
  { rule: 'Out-of-scope needs flagging', cn: '超范围需标记', desc: 'Requirements outside existing patterns are flagged, not forced.', cnDesc: '无法映射到现有模式的需求标记为 scope 外，不强行输出。' },
]

export const REFERENCE_FILES = [
  { file: '01-scope.md', topic: 'Scope & Boundaries', cn: '范围与边界', when: 'Every task (first step)', cnWhen: '每次任务（第一步）' },
  { file: '02-layout-framework.md', topic: 'Layout & Dimensions', cn: '框架与尺寸', when: 'Page structure / layout', cnWhen: '页面结构/布局任务' },
  { file: '03-page-patterns.md', topic: 'Page Patterns', cn: '页面模式', when: 'Page design / review', cnWhen: '页面设计/评审' },
  { file: '03b-container-structure.md', topic: 'Container Structure (L1/L2/L3)', cn: '容器结构', when: 'Section layout / card nesting / field grouping', cnWhen: '内容分区/卡片嵌套/字段分组' },
  { file: '04-business-modules.md', topic: 'Business Modules', cn: '业务模块', when: 'Section-level design', cnWhen: '区块级设计' },
  { file: '05-component-rules.md', topic: 'Component Rules', cn: '组件规则', when: 'Component selection', cnWhen: '组件选型' },
  { file: '06-tokens.md', topic: 'Tokens & Theme', cn: '设计令牌', when: 'Visual / theme tasks', cnWhen: '视觉/主题任务' },
  { file: '07-states-feedback-permission.md', topic: 'States & Feedback', cn: '状态与反馈', when: 'State / error handling', cnWhen: '状态/异常处理' },
  { file: '08-content-guidelines.md', topic: 'Content & Copy', cn: '文案规则', when: 'Labels / messages', cnWhen: '按钮/提示/文案' },
  { file: '09-review-checklist.md', topic: 'Review Checklist', cn: '输出自检', when: 'Before output (last)', cnWhen: '输出前（最后一步）' },
  { file: '10-icons.md', topic: 'Icon Usage', cn: '图标规范', when: 'Icon selection', cnWhen: '图标选用' },
  { file: '11-charts.md', topic: 'Chart Specs', cn: '图表规范', when: 'Data visualization', cnWhen: '数据可视化' },
  { file: '12-project-structure.md', topic: 'Project Structure', cn: '项目结构', when: 'New page / file', cnWhen: '新建页面/文件' },
]
