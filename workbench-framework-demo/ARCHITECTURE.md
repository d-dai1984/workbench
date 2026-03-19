# Workbench 项目架构说明

> 本文档面向前端工程师，说明项目目录结构、业务线划分和开发规范。

## 1. 整体架构

```
Merchant ▼ 菜单 ─→ 切换业务线 ─→ 加载对应 Sidebar 导航 + Content 页面
┌─────────────────────────────────────────────┐
│       Header（全局共享，含 Merchant 切换）      │
├──────────┬──────────────────────────────────┤
│  Sidebar │          Content                 │
│  (按业务线│     （按业务线加载不同页面）         │
│   不同)   │                                  │
└──────────┴──────────────────────────────────┘
```

## 2. 目录结构

```
src/
├── App.tsx                 # 应用入口：业务线状态 + 路由分发
├── App.css                 # 全局样式
├── main.tsx                # Vite 入口
│
├── shell/                  # 🔷 全局框架 Shell（公共代码，所有业务线共享）
│   ├── layout/             #   页面骨架组件
│   │   ├── KlookBenchLayout.tsx      # 主布局壳
│   │   ├── KlookBenchHeader.tsx      # 顶部导航栏
│   │   ├── KlookBenchSidebar.tsx     # 左侧 Sidebar（展开/收起态）
│   │   ├── KlookBenchNav.tsx         # 一级导航菜单
│   │   ├── KlookBenchContent.tsx     # 右侧内容区
│   │   └── index.ts
│   ├── theme/              #   主题系统
│   │   ├── klook-2026.ts             # Klook-2026 橙色主题
│   │   ├── theme.ts                  # 默认蓝色主题
│   │   ├── ThemeSync.tsx             # AntD token → CSS 变量同步桥接
│   │   ├── klook-bench-tokens.css    # CSS 变量定义（fallback）
│   │   └── index.ts
│   ├── config/             #   导航 & 全局配置
│   │   ├── nav.config.json           # 默认导航（fallback）
│   │   ├── nav.types.ts              # NavConfig 类型定义
│   │   ├── buildMenuItems.tsx        # 导航项构建工具
│   │   ├── merchantRoles.ts          # Merchant 角色列表 + BusinessLineKey 定义
│   │   └── index.ts
│   ├── icons/              #   全局图标
│   │   └── SidebarIcons.tsx
│   └── shared/             #   全局通用组件
│       └── ModuleCard.tsx
│
├── modules/                # 🟢 业务模块（按业务线分目录）
│   ├── registry.ts         #   业务线注册表（key → nav config 映射）
│   │
│   ├── bdbench/            #   BD Bench 业务线
│   │   ├── nav.config.json #     该业务线的 Sidebar 导航
│   │   ├── pages/          #     页面组件
│   │   ├── components/     #     业务专属组件
│   │   └── index.ts
│   │
│   ├── ma/                 #   MA (Merchant Account) 业务线
│   │   ├── nav.config.json
│   │   ├── pages/
│   │   ├── components/
│   │   └── index.ts
│   │
│   ├── campaign/           #   Campaign 业务线
│   │   ├── nav.config.json
│   │   ├── pages/
│   │   │   └── PromotionCreativePage.tsx  ← 已实现
│   │   ├── styles/
│   │   │   └── PromotionCreativePage.css
│   │   ├── components/
│   │   └── index.ts
│   │
│   └── finance/            #   Finance 业务线
│       ├── nav.config.json
│       ├── pages/
│       ├── components/
│       └── index.ts
│
├── demo/                   # 🟡 Demo 示例页面（可删除，不影响生产代码）
│   ├── dashboard/          #   Dashboard 示例
│   │   ├── DashboardPage.tsx
│   │   └── ...
│   └── grid/               #   Grid 栅格系统示例
│       └── GridPage.tsx
│
└── assets/
    └── react.svg
```

## 3. 业务线切换机制

### 切换入口
顶部 Header 的 **Merchant ▼** 下拉菜单。

### 前 4 个角色卡片对应业务线

| 角色卡片 | key | 业务线 |
|---------|-----|--------|
| BD Bench | `bdbench` | BD / Expansion 工作台 |
| MA | `ma` | Merchant Account 管理 |
| Campaign | `campaign` | 活动促销 |
| Finance | `finance` | 财务结算 |

> 其余角色卡片保留展示，点击暂无业务线切换效果。

### 切换流程
1. 用户点击 Merchant 角色卡片
2. `App.tsx` 中 `businessLine` 状态更新
3. `modules/registry.ts` 返回对应的 `nav.config.json`
4. `KlookBenchLayout` 接收新的 `navConfig`，Sidebar 导航自动更新
5. Content 区域根据新的 `selectedKey + selectedSubKey` 渲染对应页面

## 4. 如何新增业务页面

### 步骤

1. **在对应业务目录下创建页面**
   ```bash
   # 例：在 Campaign 下新增「Promotion List」页面
   touch src/modules/campaign/pages/PromotionListPage.tsx
   ```

2. **从 barrel 导出**
   ```ts
   // src/modules/campaign/index.ts
   export { PromotionListPage } from './pages/PromotionListPage'
   ```

3. **在 `App.tsx` 的 `renderContent` 中注册路由**
   ```tsx
   if (businessLine === 'campaign' && selectedKey === 'promotion' && selectedSubKey === 'promotion-list') {
     return <PromotionListPage />
   }
   ```

4. **确保 `nav.config.json` 中有对应的菜单项**（已在 `modules/campaign/nav.config.json` 中配置）

### 关键约定

- **页面文件**放 `pages/` 目录，业务专属子组件放 `components/`
- **样式文件**放 `styles/` 目录
- **每个 module** 都有 `index.ts` barrel export
- **组件命名** PascalCase，文件名与组件名一致

## 5. 主题系统

项目使用 **双层主题**：

| 层 | 控制范围 | 文件 |
|---|---------|------|
| AntD ConfigProvider | 所有 AntD 组件（Button、Input、Modal...） | `shell/theme/klook-2026.ts` |
| CSS 变量 | Sidebar、Header 等自定义组件 | `shell/theme/klook-bench-tokens.css` |
| ThemeSync 桥接 | 自动从 AntD token 同步到 CSS 变量 | `shell/theme/ThemeSync.tsx` |

切换主题只需在 `App.tsx` 中替换 `<ConfigProvider theme={...}>` 的 theme prop。

## 6. 开发指南

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev        # → http://localhost:5173

# TypeScript 类型检查
npx tsc --noEmit
```

### 交付须知

- 交付某个业务线时，只需提供 `src/modules/{业务线}/` 目录
- `src/shell/` 是公共框架，所有业务线共享
- `src/demo/` 是示例代码，生产环境可删除
