# 项目目录结构规范
> 适用于：React 19 + TypeScript + Ant Design 6.x + Vite 7，对齐下游 UmiJS 项目目录规范。
> AI 每次生成或修改文件前，必须先对照本文件确认路径和命名，不得自行创造目录层级。
> 最后更新：2026-03-30（v0.2.0 目录重构）

---

## 一、完整目录结构

```
workbench-framework-demo/
│
├── public/                        # 静态资源（Logo / Icon SVG）
├── docs/                          # 工程文档
├── config/                        # 构建/环境配置（预留）
├── mock/                          # Mock 数据（预留）
├── skill/                         # AI Agent Skill 资源
│
└── src/
    ├── main.tsx                   # 入口
    ├── App.tsx                    # 根组件 + 路由逻辑（renderContent）
    ├── App.css                    # 全局框架样式
    ├── index.css                  # CSS Reset
    ├── access.ts                  # 权限定义入口（预留）
    │
    ├── core/                      # 🔧 核心配置（对应下游 core/）
    │   ├── config/                #   配置层
    │   │   ├── merchantRoles.ts        # 业务线定义 + BUSINESS_LINE_KEYS
    │   │   ├── nav.types.ts            # NavConfig 类型定义
    │   │   ├── buildMenuItems.tsx      # JSON → AntD MenuItem 转换
    │   │   ├── registry.ts             # 业务线 NavConfig 注册中心
    │   │   ├── index.ts                # barrel 导出
    │   │   └── modules/                # 各业务线导航配置
    │   │       ├── bdbench.nav.json
    │   │       ├── campaign.nav.json
    │   │       ├── designsystem.nav.json
    │   │       ├── finance.nav.json
    │   │       └── ma.nav.json
    │   └── theme/                 #   主题系统（唯一真实来源）
    │       ├── klook-2026.ts           # Klook 2026 橙色主题
    │       ├── klook-bench-2026.ts     # Bench 2026 蓝色变体
    │       ├── theme.ts                # 基础蓝色主题
    │       ├── ThemeSync.tsx           # AntD token ↔ CSS var 同步
    │       ├── klook-bench-tokens.css  # CSS Custom Properties 回退
    │       └── index.ts                # barrel 导出
    │
    ├── components/                # 🧩 通用组件（对应下游 components/）
    │   ├── layout/                #   布局组件（Header / Sidebar / Content）
    │   │   ├── KlookBenchLayout.tsx
    │   │   ├── KlookBenchHeader.tsx
    │   │   ├── KlookBenchSidebar.tsx
    │   │   ├── KlookBenchNav.tsx
    │   │   ├── KlookBenchContent.tsx
    │   │   └── index.ts
    │   ├── shared/                #   通用业务组件（跨页复用）
    │   │   └── ModuleCard.tsx
    │   └── icons/                 #   图标组件
    │       └── SidebarIcons.tsx
    │
    ├── pages/                     # 📄 页面组件（按业务线 PascalCase 分目录）
    │   ├── Workbench/             #   工作台首页（Dashboard）
    │   ├── Campaign/              #   Campaign 业务页面
    │   │   ├── index.ts                # barrel 导出
    │   │   ├── PromotionCreativePage.tsx
    │   │   ├── CampaignBuilderPage.tsx
    │   │   ├── ActivityCreatePage/     # 多步表单（Steps 场景）
    │   │   │   ├── index.tsx           # Steps 容器 + 步骤切换
    │   │   │   ├── steps/              # 每步独立文件
    │   │   │   │   ├── Step1BasicInfo.tsx
    │   │   │   │   ├── Step2TargetRules.tsx
    │   │   │   │   ├── Step3Products.tsx
    │   │   │   │   └── Step4Review.tsx
    │   │   │   ├── hooks/
    │   │   │   │   └── useActivityForm.ts
    │   │   │   └── types.ts
    │   │   └── styles/
    │   ├── Finance/               #   Finance 业务页面
    │   ├── DesignSystem/          #   Design System Showcase
    │   │   ├── DesignSystemRouter.tsx
    │   │   ├── DesignSystemOverview.tsx
    │   │   ├── data/              #   展示数据（与 Skill 同步）
    │   │   └── modules/           #   Skill 可视化页面
    │   └── Grid/                  #   Grid 栅格演示
    │
    ├── hooks/                     # 🪝 自定义 Hooks（被 ≥2 个页面使用）
    ├── services/                  # 🔌 API 服务层
    │   └── api/
    └── types/                     # 📐 全局 TypeScript 类型
```

---

## 二、核心规则（AI 生成代码必须遵守）

### 规则 1：页面私有组件禁止跨页面引用

```ts
// ✅ 正确：只引用本页面的私有组件
import { FilterBar } from './components/FilterBar';

// ❌ 错误：跨页面引用私有组件
import { FilterBar } from '../Finance/components/FilterBar';
// → 应该将 FilterBar 提升到 src/components/shared/
```

### 规则 2：core/theme/ 是颜色和间距的唯一来源

```ts
// ✅ 正确：使用 CSS 变量或 antd token
style={{ color: 'var(--klook-bench-color-text-secondary)' }}

// ❌ 错误：硬编码颜色
style={{ color: '#64748B' }}
```

### 规则 3：什么时候从页面私有提升到全局共享

满足以下**任意一条**时，将组件/hook 移到 `src/components/shared/` 或 `src/hooks/`：

- 被 **≥2 个页面**实际引用
- 是框架骨架的一部分（Header / Sidebar / Content）
- 有**独立测试需求**

未达到以上条件时，保持在页面私有目录，不要提前抽象。

### 规则 4：Steps 表单页每个步骤独立文件

```
ActivityCreatePage/
  ├── index.tsx              # Steps 容器 + 步骤切换逻辑
  ├── steps/
  │   ├── Step1BasicInfo.tsx      ← 负责 Step 1 的人只动这个文件
  │   ├── Step2TargetRules.tsx    ← 负责 Step 2 的人只动这个文件
  │   └── Step3Products.tsx
  ├── hooks/
  │   └── useActivityForm.ts     # 跨步骤的 form 状态管理
  └── types.ts
```

跨步骤共享的 form 状态统一放在 `hooks/`，通过 props 或 context 向下传递，**不在 Step 文件之间直接引用**。

### 规则 5：路由通过 App.tsx renderContent() 管理

本项目不使用 React Router，路由逻辑在 `App.tsx` 的 `renderContent(selectedKey, selectedSubKey)` 中通过条件分支控制。新增页面时需在此函数中添加对应分支。

---

## 三、新建业务页面流程

每次新建一个业务页面，按以下顺序执行：

### 步骤 1：创建页面文件

```
src/pages/[BizLine]/[PageName].tsx          # 简单页面
src/pages/[BizLine]/[PageName]/index.tsx    # 复杂页面（含子组件）
```

### 步骤 2：添加导航配置

在 `src/core/config/modules/[bizline].nav.json` 中添加菜单项：

```json
{ "key": "new-page", "label": "New Page" }
```

### 步骤 3：注册路由

在 `App.tsx` 的 `renderContent()` 中添加条件分支：

```tsx
if (businessLine === 'campaign' && selectedKey === 'xxx' && selectedSubKey === 'new-page') {
  return <NewPage />
}
```

### 步骤 4：导出

在 `src/pages/[BizLine]/index.ts` 中添加 barrel 导出。

### Checklist

- [ ] 页面文件已创建在正确的业务线目录下
- [ ] nav.json 已添加菜单项
- [ ] App.tsx renderContent() 已添加路由分支
- [ ] index.ts barrel 已导出
- [ ] 复杂页面的 types.ts 已定义核心数据类型
- [ ] 所有组件使用 AntD 组件 + CSS 变量（无硬编码色值）

---

## 四、文件命名约定

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 页面顶层目录 | `PascalCase` | `Campaign/`, `Finance/` |
| 子页面目录 | `PascalCase` | `ActivityCreatePage/` |
| 组件文件 | `PascalCase.tsx` | `CampaignBuilderPage.tsx` |
| Hook 文件 | `camelCase.ts`，以 `use` 开头 | `useActivityForm.ts` |
| 类型文件 | `types.ts` | `types.ts` |
| 样式文件 | 同名 CSS | `ActivityCreatePage.css` |
| 导航配置 | `kebab-case.nav.json` | `campaign.nav.json` |
| barrel 导出 | `index.ts` | `index.ts` |

---

## 五、业务线与页面索引

> AI 生成新页面前，先查这张表确认归属的业务线目录。

| 业务线 | 目录 | 导航配置 |
|--------|------|---------|
| BD Bench | `pages/Workbench/` | `core/config/modules/bdbench.nav.json` |
| Merchant Account | `pages/Workbench/` | `core/config/modules/ma.nav.json` |
| Campaign | `pages/Campaign/` | `core/config/modules/campaign.nav.json` |
| Finance | `pages/Finance/` | `core/config/modules/finance.nav.json` |
| Design System | `pages/DesignSystem/` | `core/config/modules/designsystem.nav.json` |

**业务线接入完整流程：**

```
1. pages/NewBiz/ 创建页面目录
2. core/config/modules/newbiz.nav.json 编写导航配置
3. core/config/merchantRoles.ts 添加 BUSINESS_LINE_KEYS
4. core/config/registry.ts 导入并注册 nav config
5. App.tsx renderContent() 添加路由分支
```

---

## 六、多人协作边界说明

每人认领一个 `src/pages/[BizLine]/` 下的页面文件或子目录，**原则上只修改自己负责的文件**。

需要协作时的唯一合法路径：

```
需要跨页面共享组件
    ↓
提交 PR 将组件移动到 src/components/shared/
    ↓
其他页面从共享目录引用
```

禁止直接跨 `pages/` 子目录引用私有组件，避免隐式依赖和合并冲突。
