---
name: Klook-2026 Theme Guidelines
description: Klook Workbench B端设计规范和编码约束，确保所有页面遵循统一的视觉风格
---

# Klook-2026 Theme Guidelines

适用于 Klook Workbench 所有 B 端页面开发。基于 Ant Design 5.x + 自定义 Klook-2026 橙色主题。

## 1. Design Principles

| 原则 | 说明 |
|------|------|
| **清晰** | 信息层级分明，操作路径明确 |
| **高效** | 减少认知负担，常用操作一步到位 |
| **一致** | 所有页面使用相同组件、间距、色值 |
| **专业** | B 端工具感，克制使用装饰元素 |

## 2. Color System

### Primary — 橙色体系
- **Primary**: `#FF5B00` — 主操作按钮、链接、选中态
- **Primary Hover**: `#FF7A45`
- **Primary Active**: `#D4380D`
- **Primary BG**: `#FFF2E8` — 轻量背景、选中行
- **Primary Border**: `#FFBB96`

### Semantic
- **Success**: `#00B33C` — 成功、完成、上线态
- **Warning**: `#FFB800` — 警告、待处理
- **Error**: `#FF4D4F` — 错误、删除、危险操作
- **Info**: `#1E90FF` — 提示、链接

### Neutral
- **Text Primary**: `rgba(38,38,38,0.88)` — 标题、正文
- **Text Secondary**: `rgba(38,38,38,0.45)` — 辅助文字、描述
- **Border**: `#F0F0F0` — 卡片、分割线
- **Background**: `#FAFAFA` — 页面底色
- **White**: `#FFFFFF` — 卡片、模块背景

### 使用规则
- ❌ 不要硬编码颜色值，使用 CSS 变量 `var(--klook-bench-color-primary)` 或 AntD token
- ❌ 不要自创语义色，所有语义色必须从上述列表选取
- ✅ 状态标签用 AntD Tag 的 `color` prop（`success/warning/error/processing`）
- ✅ 需要自定义状态色时，用圆点 + 彩色文字（参考 CampaignTable demo）

## 3. Typography

### 字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### 层级规范
| 场景 | 组件 | 尺寸 | 字重 |
|------|------|------|------|
| 页面标题 | `Title level={2}` | 30px | 700 |
| 区块标题 | `Title level={4}` | 20px | 600 |
| 卡片标题 | `Title level={5}` | 16px | 600 |
| 正文 | `Text` | 14px | 400 |
| 辅助文字 | `Text type="secondary"` | 13-14px | 400 |
| 标签/注释 | `Text` + custom | 12px | 400 |

### 规则
- ✅ 使用 AntD `Typography` 组件，不要用裸 `<h1>`
- ✅ 页面只有一个 `level={2}` 标题
- ❌ 不要使用 `level={1}`（38px 过大，仅 Design System 展示用）

## 4. Spacing & Layout

基于 **8px grid**。

| Token | 值 | 用途 |
|-------|-----|------|
| `xs` | 4px | 紧凑间距 |
| `sm` | 8px | 表单内元素间距 |
| `md` | 16px | 卡片内 padding |
| `lg` | 24px | 区块间距、卡片间距 |
| `xl` | 32px | 大区块间距 |
| `xxl` | 48px | 页面顶部/底部 margin |

### 规则
- ✅ 卡片内 padding: `24px`
- ✅ 卡片间距: `24px`
- ✅ 表单 FormItem 间距: `24px`（AntD 默认）
- ❌ 不要使用奇数间距（如 15px, 7px）

## 5. Border & Radius

| 场景 | 值 |
|------|-----|
| 按钮、输入框 | `6px` |
| 卡片 | `8px` |
| Tag | `4px` |
| 圆形按钮 | `50%` |
| 弹窗 Modal | `8px` |

### 边框
- 卡片/分割线: `1px solid #F0F0F0`
- Hover 态: `1px solid var(--klook-bench-color-primary)`
- 虚线框（添加按钮）: `1px dashed #D9D9D9`

## 6. Shadow

| 级别 | 值 | 用途 |
|------|-----|------|
| 无 | `none` | 默认卡片（用 border 代替） |
| 轻 | `0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02)` | hover 态 |
| 中 | `0 6px 16px rgba(0,0,0,0.08)` | 下拉菜单、弹出层 |
| 重 | `0 12px 40px rgba(0,0,0,0.12)` | Modal |

## 7. Component Rules

### Button
- Primary 用于**主操作**（一个页面最多 1-2 个 Primary）
- 次要操作用 Default
- 危险操作用 `danger` 属性
- 表格行操作用 `type="link" size="small"`

### Table
- 默认用 `size="middle"`，紧凑数据用 `size="small"`
- 操作列放最右，固定宽度
- 状态列用 Badge 圆点 + 文字（不用 Tag）

### Form
- Label 在上方（vertical layout）
- 必填字段标红色星号
- 帮助文字放在 Label 下方，控件上方
- Radio Card 用自定义样式（border 卡片 + icon）

### Card
- 标准卡片用 `border` 不用 `shadow`
- hover 态加 `box-shadow` + `translateY(-2px)`

## 8. Do / Don't

| ✅ Do | ❌ Don't |
|-------|---------|
| 用 AntD 组件 | 自己写原生 HTML 控件 |
| 用 CSS 变量引用颜色 | 硬编码 hex 值 |
| 遵循 8px grid | 随意使用 margin/padding |
| 用 `Space` 组件排列 | 手动设 margin 排列 |
| 状态文字 + 圆点 | 全色背景 Tag 表示状态 |
| 表单 Label 带帮助文字 | 仅用 placeholder 说明 |
| 加载态用 Skeleton | 白屏等待 |

## 9. Code Patterns

### Import 约定
```tsx
// ✅ 从 antd 统一导入
import { Button, Input, Select, Table } from 'antd'

// ✅ 图标从 @ant-design/icons 导入
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

// ✅ 主题从 shell/theme 导入
import { klook2026Theme, ThemeSync } from '@/shell/theme'
```

### 样式约定
```tsx
// ✅ 使用 CSS 变量
color: var(--klook-bench-color-primary);
background: var(--klook-bench-color-bg-layout);

// ✅ 使用 AntD token（组件内）
const { token } = theme.useToken()
<div style={{ color: token.colorPrimary }}>
```

### 组件封装约定
```tsx
// ✅ 每个模块组件导出 Props 类型
export interface CampaignTableProps { ... }
export function CampaignTable({ ... }: CampaignTableProps) { ... }

// ✅ 样式文件与组件同名
// CampaignTable.tsx + CampaignTable.css
```
