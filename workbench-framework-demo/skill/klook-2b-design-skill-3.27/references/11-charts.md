# 图表规范
> 基于 @ant-design/charts v2.6.5。面向 AI 的决策参考，重点在"选哪个图表、何时用"，不是完整 API 文档。

---

## 一、安装与引入

```bash
npm install @ant-design/charts --save
```

```tsx
// 统计图表（推荐从 plots 子包按需引入）
import { Line, Column, Bar, Pie } from '@ant-design/plots';

// 关系图
import { OrganizationChart, FlowGraph } from '@ant-design/graphs';

// 或从主包统一引入
import { Line, OrganizationChart } from '@ant-design/charts';
```

**包结构：**

| 主包 | 子包 | 内容 |
|------|------|------|
| `@ant-design/charts` | `@ant-design/plots` | 统计图表（折线、柱状、饼图等） |
| | `@ant-design/graphs` | 关系图（流程图、组织架构图等） |

---

## 二、图表选型决策

> 选图表的起点是「我要表达什么数据关系」，而不是「图表长什么样」。

### 按数据功能分类

| 分类 | 适用场景 | 推荐图表 |
|------|---------|---------|
| **比较类** | 多个分类/维度的数量对比 | Column、Bar、BidirectionalBar、Bullet、DualAxes |
| **趋势类** | 数据随时间/序列的变化 | Line、Area、DualAxes |
| **占比类** | 部分与整体的比例关系 | Pie、Rose、Treemap、Sunburst、Liquid |
| **分布类** | 数据的分布形态 | Histogram、Heatmap、Box、Scatter |
| **流程类** | 阶段转化、流程步骤 | Funnel、FlowGraph、FlowDirectionGraph、Sankey |
| **关系类** | 节点之间的连接/层级关系 | NetworkGraph、Dendrogram、Fishbone、MindMap |
| **区间类** | 目标与实际的范围对比 | Gauge、Bullet |
| **迷你图** | 卡片/表格内的趋势概览 | Tiny（TinyLine、TinyColumn、TinyArea） |

---

## 三、统计图表速查

### 高频图表（2B 中后台最常用）

| 组件 | 中文 | 典型使用场景 |
|------|------|------------|
| `Line` | 折线图 | 时间趋势、指标变化 |
| `Column` | 柱状图 | 分类比较、排名 |
| `Bar` | 条形图 | 横向比较，标签较长时优于柱状图 |
| `Area` | 面积图 | 趋势 + 量级感知，多系列堆叠 |
| `Pie` | 饼图 | 占比，分类 ≤6 个时适用 |
| `DualAxes` | 双轴图 | 两个量纲不同的指标同时展示 |
| `Funnel` | 漏斗图 | 转化率、阶段流失 |
| `Gauge` | 仪表盘 | 单指标完成率/进度 |

### 低频图表（特定场景使用）

| 组件 | 中文 | 适用场景 |
|------|------|---------|
| `Scatter` | 散点图 | 两变量相关性分析 |
| `Heatmap` | 热力图 | 二维矩阵密度分布 |
| `Treemap` | 矩阵树图 | 层级占比，如品类构成 |
| `Sankey` | 桑基图 | 多节点流量流向 |
| `Waterfall` | 瀑布图 | 正负变化累计，如财务增减 |
| `Histogram` | 直方图 | 数值区间频率分布 |
| `Radar` | 雷达图 | 多维度综合评分，≤8维 |
| `Rose` | 玫瑰图 | 周期性数据极坐标展示 |
| `Sunburst` | 旭日图 | 多层级占比结构 |
| `Bullet` | 子弹图 | 目标 vs 实际，带进度区间 |
| `Box` | 箱线图 | 数据统计分布（四分位） |
| `Liquid` | 水波图 | 单指标完成率，视觉感强 |
| `WordCloud` | 词云图 | 文本词频，关键词分布 |
| `BidirectionalBar` | 对称条形图 | 两组数据镜像对比 |
| `Stock` | 股票图 | K线，金融类数据 |
| `Venn` | 韦恩图 | 集合交叉关系 |
| `CirclePacking` | 捆绑图 | 层级嵌套，尺寸编码 |
| `Violin` | 小提琴图 | 统计分布形状 |
| `RadialBar` | 玉珏图 | 极坐标柱状，美观型 |
| `Tiny` | 迷你图 | 内嵌卡片/Table 的趋势概览 |

---

## 四、关系图速查

| 组件 | 中文 | 适用场景 |
|------|------|---------|
| `OrganizationChart` | 组织结构图 | 部门/角色层级 |
| `FlowGraph` | 流程图 | 业务流程、审批流 |
| `FlowDirectionGraph` | 流向图 | 带方向的数据流向 |
| `MindMap` | 思维导图 | 概念展开、知识结构 |
| `IndentedTree` | 缩进树图 | 文件/菜单树结构 |
| `Dendrogram` | 生态树图 | 分类树、聚类结构 |
| `NetworkGraph` | 网络图 | 多对多关系网络 |
| `Fishbone` | 鱼骨图 | 因果分析 |

---

## 五、基础用法

### 折线图（最常用模式）

```tsx
import { Line } from '@ant-design/plots';

const config = {
  data,
  height: 300,
  xField: 'date',       // X 轴字段名
  yField: 'value',      // Y 轴字段名
  colorField: 'type',   // 分组字段（多系列时使用）
  style: { lineWidth: 2 },
};

<Line {...config} />
```

### 柱状图

```tsx
import { Column } from '@ant-design/plots';

const config = {
  data,
  height: 300,
  xField: 'category',
  yField: 'value',
  colorField: 'category',  // 按分类着色
  stack: true,             // 堆叠柱状图
};

<Column {...config} />
```

### 饼图

```tsx
import { Pie } from '@ant-design/plots';

const config = {
  data,
  height: 300,
  angleField: 'value',   // 角度字段（决定扇形大小）
  colorField: 'type',    // 分类字段
  innerRadius: 0.6,      // 设为 >0 时变为环形图（Donut）
  label: { text: 'type', position: 'outside' },
};

<Pie {...config} />
```

### 迷你折线图（嵌入卡片/表格）

```tsx
import { TinyLine } from '@ant-design/plots';

const config = {
  data: [3, 5, 4, 7, 9, 6, 8],  // 仅需数值数组
  height: 32,
  smooth: true,
};

<TinyLine {...config} />
```

### 双轴图（两个量纲）

```tsx
import { DualAxes } from '@ant-design/plots';

const config = {
  data,
  height: 300,
  xField: 'date',
  children: [
    { type: 'line', yField: 'revenue' },    // 左轴折线
    { type: 'column', yField: 'count' },    // 右轴柱状
  ],
};

<DualAxes {...config} />
```

---

## 六、与品牌 Token 对齐

### 主色配置

```tsx
// 与 brandTheme.token.colorPrimary 保持一致
const chartTheme = {
  color: ['#1677FF', '#69B1FF', '#BAE0FF', '#52C41A', '#FAAD14', '#FF4D4F'],
};

<Line theme={chartTheme} {...config} />
```

### 全局主题（ChartProvider）

```tsx
import { ChartProvider } from '@ant-design/charts';

<ChartProvider theme={{ color: ['#1677FF', ...] }}>
  <YourCharts />
</ChartProvider>
```

---

## 七、2B 中后台使用规范

### 尺寸规范

| 场景 | 推荐高度 | 说明 |
|------|---------|------|
| 统计卡片内迷你图 | `32px` | TinyLine / TinyColumn |
| 卡片内中等图表 | `240px` | 概览 Dashboard |
| 独立图表卡片 | `320~400px` | 数据分析页 |
| 全屏/大屏 | 按容器 | 使用 `autoFit: true` |

### 颜色使用原则

- 单系列图表 → 使用 `colorPrimary #1677FF`
- 多系列图表 → 使用品牌色序列，不超过 6 色
- 语义色（成功/警告/错误）→ 沿用 `colorSuccess / colorWarning / colorError`
- 不用 Klook 品牌橙（`#FF5B00`）作为图表主色（与 Ant Design 体系冲突）

### 选型禁止事项

- **禁止用饼图展示 >6 个分类** → 改用柱状图或 Treemap
- **禁止用折线图展示无序分类** → 改用柱状图
- **禁止在表格中嵌入完整大图** → 只用 Tiny 系列迷你图
- **禁止用雷达图展示 >8 个维度** → 维度过多时改用平行坐标或表格
- **禁止用 3D 图表** → 库不支持，且认知负担高

### 空数据状态

```tsx
// 图表数据为空时，直接传空数组，库会渲染内置空态
<Line data={[]} {...config} />

// 需要自定义空态文案时
<Line
  data={[]}
  emptyConfig={{ description: 'No data available' }}
  {...config}
/>
```

---

## 八、常见 props 速查

| prop | 说明 | 示例 |
|------|------|------|
| `data` | 数据源（数组） | `[{ x: '1月', y: 100 }]` |
| `xField` | X 轴字段名 | `'date'` |
| `yField` | Y 轴字段名 | `'value'` |
| `colorField` | 颜色分组字段 | `'type'` |
| `height` | 图表高度（px） | `300` |
| `autoFit` | 宽度自适应容器 | `true`（默认） |
| `smooth` | 折线/面积平滑曲线 | `true` |
| `stack` | 堆叠模式 | `true` |
| `innerRadius` | 环形图内径（0~1） | `0.6` |
| `theme` | 主题配置 | `{ color: [...] }` |
| `style` | 图形样式 | `{ lineWidth: 2 }` |
| `label` | 数据标签配置 | `{ text: 'value' }` |
| `tooltip` | 提示框配置 | `{ title: 'date' }` |
| `legend` | 图例配置 | `{ position: 'bottom' }` |
| `axis` | 坐标轴配置 | `{ x: { title: '月份' } }` |

---

## 九、官方文档

- 图表组件列表：https://ant-design-charts.antgroup.com/components/overview
- 图表示例：https://ant-design-charts.antgroup.com/examples
- 配置项文档：https://ant-design-charts.antgroup.com/options/plots/title
- 当前版本：2.6.5
