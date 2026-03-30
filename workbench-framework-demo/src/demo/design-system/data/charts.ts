export const CATEGORY_DATA = [
  { key: '1', category: 'Compare', categoryCn: '比较', charts: 'Column, Bar', usage: 'Compare values across categories', usageCn: '跨类别比较数值', color: '#1677FF' },
  { key: '2', category: 'Trend', categoryCn: '趋势', charts: 'Line, Area', usage: 'Show change over time', usageCn: '展示随时间变化趋势', color: '#13C2C2' },
  { key: '3', category: 'Proportion', categoryCn: '占比', charts: 'Pie, Treemap', usage: 'Show part-to-whole relationships', usageCn: '展示部分与整体关系', color: '#722ED1' },
  { key: '4', category: 'Distribution', categoryCn: '分布', charts: 'Heatmap, Scatter', usage: 'Show data distribution patterns', usageCn: '展示数据分布模式', color: '#EB2F96' },
  { key: '5', category: 'Flow', categoryCn: '流程', charts: 'Funnel, Sankey', usage: 'Show sequential stages or flows', usageCn: '展示阶段或流向', color: '#FA8C16' },
  { key: '6', category: 'Relation', categoryCn: '关系', charts: 'NetworkGraph, MindMap', usage: 'Show connections between entities', usageCn: '展示实体间关联', color: '#52C41A' },
  { key: '7', category: 'Range', categoryCn: '范围', charts: 'Gauge, Bullet', usage: 'Show value within a range', usageCn: '展示范围内的值', color: '#2F54EB' },
  { key: '8', category: 'Mini', categoryCn: '迷你', charts: 'Tiny series', usage: 'Inline micro-charts for cards/tables', usageCn: '卡片/表格内嵌迷你图', color: '#8C8C8C' },
]

export const LOW_FREQ = [
  { name: 'Heatmap', cn: '热力图', use: 'Time-activity density', useCn: '时间-活动密度' },
  { name: 'Scatter', cn: '散点图', use: 'Correlation analysis', useCn: '相关性分析' },
  { name: 'Treemap', cn: '矩形树图', use: 'Hierarchical proportion', useCn: '层级占比' },
  { name: 'Sankey', cn: '桑基图', use: 'Flow/path analysis', useCn: '流向/路径分析' },
  { name: 'Bullet', cn: '子弹图', use: 'Target vs actual', useCn: '目标 vs 实际' },
  { name: 'Radar', cn: '雷达图', use: 'Multi-dimensional comparison (max 8 dims)', useCn: '多维对比（最多 8 维）' },
  { name: 'Waterfall', cn: '瀑布图', use: 'Cumulative effect breakdown', useCn: '累计效应分解' },
]

export const RELATION_CHARTS = [
  { name: 'OrganizationChart', cn: '组织架构图' },
  { name: 'FlowGraph', cn: '流程图' },
  { name: 'MindMap', cn: '思维导图' },
  { name: 'NetworkGraph', cn: '网络关系图' },
]

export const SIZE_SPECS = [
  { context: 'Tiny (inline)', contextCn: '迷你（行内）', height: '32px' },
  { context: 'Card chart', contextCn: '卡片内图表', height: '240px' },
  { context: 'Standalone chart', contextCn: '独立图表', height: '320-400px' },
  { context: 'Fullscreen / page', contextCn: '全屏/页面', height: 'autoFit' },
]

export const PROHIBITIONS = [
  { en: 'Pie chart with more than 6 categories', cn: '饼图超过 6 个分类' },
  { en: 'Line chart for unordered categorical data', cn: '折线图用于无序分类数据' },
  { en: 'Full chart embedded inside table cells', cn: '表格单元格内嵌入完整图表' },
  { en: 'Radar chart with more than 8 dimensions', cn: '雷达图超过 8 个维度' },
  { en: '3D charts of any kind', cn: '任何形式的 3D 图表' },
]
