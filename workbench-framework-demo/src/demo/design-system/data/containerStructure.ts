export const LEVELS = [
  {
    level: 'L1',
    name: 'Section',
    cn: '区域',
    role: 'Top-level content partition, represents an independent business domain',
    roleCn: '页面一级内容分区，代表一个独立的业务域',
    titlePosition: 'Outside container',
    titlePositionCn: '容器外部',
    titleStyle: 'Heading/3',
    color: '#1677FF',
  },
  {
    level: 'L2',
    name: 'Card',
    cn: '卡片',
    role: 'Repeatable sub-instance within a Section',
    roleCn: 'Section 内部的可重复子实例',
    titlePosition: 'Inside container',
    titlePositionCn: '容器内部',
    titleStyle: 'Heading/5 + meta info',
    color: '#52C41A',
  },
  {
    level: 'L3',
    name: 'Field Group',
    cn: '字段分组',
    role: 'Logical field grouping within Card or Section',
    roleCn: 'Card 或 Section 内容区内的逻辑字段分组',
    titlePosition: 'No container, bold text only',
    titlePositionCn: '无独立容器，仅加粗标题',
    titleStyle: 'Base/Strong',
    color: '#FAAD14',
  },
]

export const L1_CONDITIONS = [
  { en: 'Maps to an independent data entity or API endpoint', cn: '映射了一个独立的数据实体或 API 接口' },
  { en: 'Has independent read/write permissions', cn: '拥有独立的读写权限' },
  { en: 'Can independently show complete / incomplete state', cn: '可以独立地呈现完成/未完成状态' },
  { en: 'May appear or disappear entirely in different scenarios', cn: '在不同业务场景下可能整体出现或消失' },
]

export const L2_CONDITIONS = [
  { en: 'Section has multiple same-type sub-instances (e.g. SKUs, rule groups)', cn: 'Section 内有多个同类子实例（如 SKU、规则组）' },
  { en: 'Sub-instances can be independently collapsed / expanded', cn: '子实例可以被独立折叠/展开' },
  { en: 'Sub-instances can be added / deleted / reordered by drag', cn: '子实例可以被增加/删除/拖拽重排' },
]

export const TITLE_RULES = [
  { level: 'L1 Section', token: 'Heading/3', desc: 'Page-level partition title, with collapse control', descCn: '页面一级分区标题，搭配折叠控件' },
  { level: 'L2 Card', token: 'Heading/5', desc: 'Instance card title, with ID / status metadata', descCn: '实例卡片标题，搭配 ID、状态等元信息' },
  { level: 'L3 Field Group', token: 'Base/Strong', desc: 'Field group title, bold text only', descCn: '字段分组标题，仅加粗文本' },
]

export const SUBORDINATE_METHODS = [
  {
    method: 'A',
    name: 'Functional Container',
    cn: '功能性容器',
    when: 'Sub-list has interactive behavior (drag, batch select/delete)',
    whenCn: '子列表有交互行为（拖拽、批量选择/删除）',
    style: '1px border-tertiary, same radius as L2, inner title 13px bold',
    styleCn: '1px border-tertiary 边框，圆角与 L2 一致，内标题 13px 加粗',
  },
  {
    method: 'B',
    name: 'Indent + Left Border',
    cn: '缩进 + 左侧竖线',
    when: 'Sub-list is display-only, no interactive behavior',
    whenCn: '子列表为纯展示，无整体性交互行为',
    style: 'Left indent 20px, 2px left border in border-tertiary color',
    styleCn: '左缩进 20px，左侧 2px 竖线 border-tertiary 颜色',
  },
]

export const DIVIDER_RULES = [
  { scenario: 'use', en: 'Between untitled same-type repeating items', cn: '无标题的同类重复项之间' },
  { scenario: 'use', en: 'Single entry with multi-line/multi-type info needs clear boundary', cn: '单条目含多行多类型信息，需明确边界' },
  { scenario: 'no', en: 'Adjacent blocks each have their own L3 title — spacing is the separator', cn: '相邻内容块各有 L3 标题时，间距即分隔' },
]

export const EXAMPLE_TREE = [
  { indent: 0, text: 'Display strategy', meta: 'L1, fixed content, no cards', metaCn: 'L1，固定内容，不包卡片' },
  { indent: 1, text: 'Calendar merge', meta: 'L3', metaCn: 'L3' },
  { indent: 1, text: 'Display placement', meta: 'L3', metaCn: 'L3' },
  { indent: 0, text: 'Operation & Fencing strategy', meta: 'L1, fixed content, no cards', metaCn: 'L1，固定内容，不包卡片' },
  { indent: 1, text: 'Responsible BD', meta: 'L3', metaCn: 'L3' },
  { indent: 1, text: 'Auto publish/unpublish', meta: 'L3', metaCn: 'L3' },
  { indent: 1, text: 'Fencing setting', meta: 'L3', metaCn: 'L3' },
  { indent: 0, text: 'Selling & Fulfilment strategy', meta: 'L1, multi-instance, with cards', metaCn: 'L1，多实例，包卡片' },
  { indent: 1, text: 'Combo SKU #1 Adult ticket', meta: 'L2 Card', metaCn: 'L2 卡片' },
  { indent: 2, text: 'Selling strategy', meta: 'L3', metaCn: 'L3' },
  { indent: 2, text: 'Fulfilment strategy', meta: 'L3', metaCn: 'L3' },
  { indent: 3, text: 'Fulfilment sequence', meta: 'L3 subordinate list', metaCn: 'L3 从属子列表' },
  { indent: 1, text: 'Combo SKU #2 Child ticket', meta: 'L2 Card (collapsed)', metaCn: 'L2 卡片（折叠态）' },
  { indent: 1, text: 'Combo SKU #3 Senior ticket', meta: 'L2 Card (collapsed)', metaCn: 'L2 卡片（折叠态）' },
]

export const DECISION_PATHS = [
  {
    path: 'A',
    name: 'With Structured PRD',
    cn: '有结构化 PRD',
    steps: 'Read PRD hierarchy → Map to L1/L2/L3 → Output structure suggestion',
    stepsCn: '读取 PRD 层级信息 → 映射为 L1/L2/L3 → 输出结构建议',
  },
  {
    path: 'B',
    name: 'Without Structured PRD',
    cn: '无结构化 PRD',
    steps: 'Use identification criteria → Self-judge hierarchy → Output suggestion + flag uncertain items',
    stepsCn: '使用识别条件自行判断 → 输出结构建议 + 标记不确定项',
  },
]
