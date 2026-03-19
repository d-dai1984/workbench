# Klook Workbench Framework — 工程介绍文档

> 版本：0.1.0 · 最后更新：2026-03-18

---

## 一、项目概述

**Klook Workbench Framework** 是 Klook B 端运营后台的前端框架层，提供统一的 Shell（顶部导航 + 侧边栏 + 内容区域）、主题系统、业务模块注册机制，以及完整的原子/模块级 Design System 规范。

各业务线（BD Bench / MA / Campaign / Finance / Design System 等）通过 **JSON 配置** 接入框架，实现统一外观、独立交付。

---

## 二、技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| **框架** | React | 19.2 |
| **UI 库** | Ant Design | 6.3 |
| **构建** | Vite | 7.3 |
| **语言** | TypeScript | 5.9 |
| **图表** | @ant-design/charts | 2.6 |
| **Lint** | ESLint + typescript-eslint | 9.x |

---

## 三、目录结构

```
workbench-framework-demo/
│
├── public/                        # 静态资源（Logo / Icon SVG 等）
│   └── merchant-role-icons/       # 业务线图标
│
├── docs/                          # 工程文档
│   └── PROJECT-GUIDE.md           # ← 本文件
│
├── .agents/                       # AI Agent 配置
│   └── skills/klook-theme/        # Klook-2026 Theme Skill
│       ├── SKILL.md               # 风格化约束说明
│       └── resources/
│           ├── design-tokens.json # 设计 token 数据
│           └── component-patterns.md
│
└── src/
    ├── main.tsx                   # 入口
    ├── App.tsx                    # 根组件 + 路由逻辑
    ├── App.css                    # 全局框架样式
    ├── index.css                  # CSS Reset
    │
    ├── shell/                     # 🔧 框架层（全业务共用）
    │   ├── layout/                #   布局组件
    │   │   ├── KlookBenchLayout.tsx    # 顶层 Layout 编排
    │   │   ├── KlookBenchHeader.tsx    # 顶部导航 + Merchant 切换
    │   │   ├── KlookBenchSidebar.tsx   # 左侧侧边栏（展开/收起）
    │   │   ├── KlookBenchNav.tsx       # 导航菜单渲染
    │   │   └── KlookBenchContent.tsx   # 右侧内容区域 + Grid Overlay
    │   ├── config/                #   配置层
    │   │   ├── merchantRoles.ts        # 业务线定义 + BUSINESS_LINE_KEYS
    │   │   ├── nav.types.ts            # NavConfig 类型定义
    │   │   ├── nav.config.json         # 默认导航配置
    │   │   └── buildMenuItems.tsx      # JSON → AntD MenuItem 转换
    │   ├── theme/                 #   主题系统
    │   │   ├── klook-bench-tokens.css  # CSS Custom Properties（色值/间距等）
    │   │   └── index.ts                # AntD ConfigProvider theme 配置
    │   ├── shared/                #   通用业务组件
    │   └── icons/                 #   图标组件
    │
    ├── modules/                   # 📦 业务模块（按业务线分目录）
    │   ├── registry.ts            #   模块注册中心
    │   ├── bdbench/               #   BD Bench
    │   │   └── nav.config.json
    │   ├── ma/                    #   MA
    │   │   └── nav.config.json
    │   ├── campaign/              #   Campaign
    │   │   ├── nav.config.json
    │   │   ├── pages/             #     页面组件
    │   │   ├── components/        #     业务组件
    │   │   └── styles/            #     样式
    │   ├── finance/               #   Finance
    │   │   └── nav.config.json
    │   └── designsystem/          #   Design System
    │       ├── nav.config.json         # DS 侧边栏配置
    │       ├── DesignSystemRouter.tsx   # Section 路由
    │       ├── DesignSystemOverview.tsx # Overview 总览页
    │       └── DesignSystemOverview.css
    │
    ├── demo/                      # 🎨 展示 / Showcase
    │   ├── dashboard/             #   Dashboard Demo
    │   ├── grid/                  #   Grid 栅格系统 Demo
    │   └── design-system/         #   原子 + 模块组件 Demo
    │       ├── DesignSystemPage.tsx     # 全量原子组件
    │       ├── CodePreview.tsx         # 代码预览组件
    │       └── modules/               # 模块级组件 Demo
    │           ├── CampaignTableDemo.tsx
    │           ├── TemplateCardDemo.tsx
    │           ├── HeatmapCalendarDemo.tsx
    │           └── StepFormSectionDemo.tsx
    │
    └── theme/                     # 主题同步（CSS var ↔ AntD token）
        ├── index.ts
        └── ThemeSync.tsx
```

---

## 四、架构设计

### 4.1 三层分离

```
┌────────────────────────────────────────────────┐
│                   App.tsx                       │  路由 + 状态
├────────────────────────────────────────────────┤
│                  shell/                         │  框架层（Header / Sidebar / Content）
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Header   │  │ Sidebar  │  │   Content    │  │
│  │ Merchant ▼│  │ Nav JSON │  │  children()  │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
├────────────────────────────────────────────────┤
│                  modules/                       │  业务层（各业务线独立目录）
│  bdbench/ │ ma/ │ campaign/ │ finance/ │ ds/   │
└────────────────────────────────────────────────┘
```

### 4.2 业务线接入流程

1. 在 `modules/` 下创建业务目录（如 `modules/newbiz/`）
2. 编写 `nav.config.json`（定义 Sidebar 菜单结构）
3. 在 `merchantRoles.ts` 的 `BUSINESS_LINE_KEYS` 中添加 key
4. 在 `registry.ts` 中导入并注册该 nav config
5. 在 `App.tsx` 的 `renderContent()` 中添加页面路由

### 4.3 导航配置格式

```json
{
  "groups": [
    {
      "groupLabel": "GROUP NAME",
      "items": [
        { "key": "my-page", "label": "My Page", "icon": "dashboard" },
        {
          "key": "parent",
          "label": "Parent Menu",
          "icon": "settings",
          "children": [
            { "key": "child-1", "label": "Child Page 1" },
            { "key": "child-2", "label": "Child Page 2" }
          ]
        }
      ]
    }
  ]
}
```

---

## 五、Design System

### 5.1 设计原则

| 原则 | 说明 |
|------|------|
| 🔍 清晰 | 信息层级分明，操作路径明确 |
| ⚡ 高效 | 减少认知负担，常用操作一步到位 |
| 🔗 一致 | 所有页面使用相同组件、间距、色值 |
| 💼 专业 | B 端工具感，克制使用装饰元素 |

### 5.2 主题色

| Token | 值 | 用途 |
|-------|------|------|
| `--klook-bench-color-primary` | `#FF5B00` | 品牌主色 |
| Success | `#00B33C` | 成功状态 |
| Warning | `#FFB800` | 警告状态 |
| Error | `#FF4D4F` | 错误状态 |
| Info | `#1E90FF` | 信息提示 |

### 5.3 间距规范

基于 **8px Grid**，所有间距为 4 的倍数：

| Token | 值 | 场景 |
|-------|------|------|
| xs | 4px | 紧凑间距 |
| sm | 8px | 元素间紧凑间距 |
| md | 16px | 默认间距 |
| lg | 24px | 区块间距 |
| xl | 32px | 较大区块间距 |
| xxl | 48px | Section 间距 |

### 5.4 组件分层

| 层级 | 说明 | 示例 |
|------|------|------|
| **原子组件** | AntD 基础组件 + Klook 主题 | Button / Input / Tag / Badge |
| **模块组件** | 多原子组件组合的业务区块 | CampaignTable / TemplateCard / HeatmapCalendar / StepForm |
| **页面组件** | 完整页面布局 | Dashboard / PromotionCreativePage |

### 5.5 查看方式

切换到 **Design System** 业务线（顶部 Merchant 菜单），左侧 Sidebar 提供 17 个组件分类导航，每个组件页包含：

- ✅ 实时预览
- ✅ 可复制代码块（`CodePreview` 组件）
- ✅ 多变体展示

---

## 六、布局规范

### 6.1 页面结构

```
┌─────────────────────────────────────────┐
│ Header (56px)                           │
├──────────┬──────────────────────────────┤
│ Sidebar  │ Content                      │
│ 256px /  │ max-width: 1200px            │
│ 104px    │ 24-column grid               │
│ (折叠)   │ 16px gutter                  │
│          │ padding: 32px                │
└──────────┴──────────────────────────────┘
```

### 6.2 响应式断点

| 断点 | Sidebar | Content |
|------|---------|---------|
| ≥ 992px (lg) | 展开 256px | 自适应 |
| < 992px | 自动折叠 104px | 自适应 |

### 6.3 滚动行为

- Header 固定在顶部
- Sidebar 独立滚动（`overflow-y: auto`）
- Content 独立滚动（`overflow-y: auto`）
- 两者高度锁定为 `calc(100vh - 56px)`

---

## 七、工程化交付标准

### 7.1 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `CampaignTableDemo.tsx` |
| 样式 | 同名 CSS | `CampaignTableDemo.css` |
| 配置 | kebab-case JSON | `nav.config.json` |
| 导出 | index.ts barrel | `index.ts` |

### 7.2 样式约定

```css
/* ✅ DO: 使用 CSS 变量 */
color: var(--klook-bench-color-primary);

/* ✅ DO: BEM 风格类名 */
.tpl-card__cover-badge { }
.sf-radio-card--selected { }

/* ❌ DON'T: 硬编码色值 */
color: #FF5B00;  /* 应改为 var(--klook-bench-color-primary) */
```

### 7.3 组件开发标准

```tsx
// ✅ 从 antd 统一导入
import { Button, Table, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

// ✅ 导入同名 CSS
import './MyComponent.css'

// ✅ 命名导出（非默认导出）
export function MyComponent() { ... }
```

### 7.4 业务模块交付 Checklist

- [ ] `modules/<biz>/nav.config.json` — 侧边栏导航配置
- [ ] `modules/<biz>/pages/` — 页面组件
- [ ] `modules/<biz>/components/` — 业务组件
- [ ] `modules/<biz>/styles/` — 样式文件
- [ ] `merchantRoles.ts` — 注册业务线 key
- [ ] `registry.ts` — 注册 nav config
- [ ] `App.tsx renderContent()` — 添加路由分支
- [ ] 所有组件使用 AntD 组件 + CSS 变量
- [ ] 间距遵循 8px Grid
- [ ] 响应式布局 max-width 1200px

### 7.5 构建命令

```bash
# 开发模式（HMR）
npm run dev

# 类型检查 + 生产构建
npm run build

# 代码检查
npm run lint

# 预览生产包
npm run preview
```

---

## 八、Skill 系统

项目集成了 AI Agent Skill 系统（`.agents/skills/`），目前包含：

### klook-theme Skill

| 文件 | 内容 |
|------|------|
| `SKILL.md` | 设计原则 / 色彩 / 字体 / 间距 / 圆角 / 阴影 / Do-Don't / Code Patterns |
| `design-tokens.json` | 可编程的 token 数据 |
| `component-patterns.md` | 组件组合模式速查表 |

Agent 在生成代码时会自动读取 SKILL.md，确保产出代码遵循 Klook 规范。

---

## 九、快速上手

```bash
# 1. 安装依赖
npm install

# 2. 启动开发环境
npm run dev

# 3. 打开浏览器
open http://localhost:5173

# 4. 切换业务线
#    点击顶部 Logo 右侧的 Merchant 按钮
#    选择 BD Bench / MA / Campaign / Finance / Design System
```

---

*Maintained by Klook Workbench Team · 2026*
