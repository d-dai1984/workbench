# 项目目录结构规范
> 适用于：React + TypeScript，中型（10~30个页面），多人协作。
> AI 每次生成或修改文件前，必须先对照本文件确认路径和命名，不得自行创造目录层级。

---

## 一、完整目录结构

```
src/
│
├── app/                          # 【路由层】仅负责路由注册，禁止写业务逻辑
│   ├── layout.tsx                # 根布局：ConfigProvider + 全局主题 + locale
│   ├── merchant/
│   │   ├── layout.tsx            # Merchant 产品线布局（Header + Sidebar）
│   │   ├── workbench/
│   │   │   └── page.tsx          # ← 只写：import + export，不写 JSX
│   │   ├── product-list/
│   │   │   └── page.tsx
│   │   └── product-create/
│   │       └── page.tsx
│   └── admin/
│       ├── layout.tsx
│       └── dashboard/
│           └── page.tsx
│
├── pages/                        # 【视图层】每人负责自己的页面目录，互不干扰
│   │
│   ├── workbench/                # 工作台页（一个页面 = 一个目录）
│   │   ├── index.tsx             # 页面根组件，只负责组装
│   │   ├── components/           # ⚠️ 该页面私有，禁止其他页面引用
│   │   │   ├── StatCards.tsx
│   │   │   ├── TaskList.tsx
│   │   │   └── CampaignPanel.tsx
│   │   ├── hooks/
│   │   │   └── useWorkbenchData.ts
│   │   └── types.ts
│   │
│   ├── product-list/             # 列表页
│   │   ├── index.tsx
│   │   ├── components/
│   │   │   ├── FilterBar.tsx     # 筛选区（平铺式/收起式）
│   │   │   ├── ProductTable.tsx  # 表格主体
│   │   │   └── BatchActionBar.tsx
│   │   ├── hooks/
│   │   │   ├── useProductList.ts # 数据请求 + 分页
│   │   │   └── useTableSelection.ts
│   │   └── types.ts
│   │
│   ├── product-create/           # 步骤表单页（Steps 场景特殊处理）
│   │   ├── index.tsx             # Steps 容器 + 步骤切换逻辑
│   │   ├── steps/                # ⚠️ 每个 Step 独立文件，各人可独立编辑
│   │   │   ├── Step1SelectProduct.tsx
│   │   │   ├── Step2DisplayStrategy.tsx
│   │   │   ├── Step3OperationStrategy.tsx
│   │   │   └── Step4Review.tsx
│   │   ├── components/           # 多个 Step 共用的私有组件
│   │   │   └── ProductCard.tsx
│   │   ├── hooks/
│   │   │   └── useProductForm.ts # 跨步骤的 form 状态管理
│   │   └── types.ts
│   │
│   └── [page-name]/              # 新建页面的复制模板（见第三节）
│       ├── index.tsx
│       ├── components/
│       ├── hooks/
│       └── types.ts
│
├── components/                   # 【共享层】必须被 ≥2 个页面使用才放这里
│   │
│   ├── layout/                   # 框架组件（从 02-layout-framework.md 实现）
│   │   ├── AppHeader.tsx         # 顶部 Header（56px，三段式）
│   │   ├── AppSidebar.tsx        # 侧边栏（展开 256px / 折叠 64px）
│   │   └── PageContainer.tsx     # 内容区容器（统一 padding + 背景色）
│   │
│   ├── business/                 # 业务通用组件（有业务语义，跨页复用）
│   │   ├── StatusTag.tsx         # 状态 Tag（基于 07-states 规范）
│   │   ├── EmptyState.tsx        # 空状态（基于 07-states 规范）
│   │   ├── PermissionGuard.tsx   # 权限包裹组件
│   │   └── PageHeader.tsx        # 页面标题行（Breadcrumb + H1 + 操作区）
│   │
│   └── ui/                       # 纯 UI 封装（无业务语义，可跨产品线）
│       ├── SearchInput.tsx       # 全局搜索框（胶囊形）
│       └── ConfirmModal.tsx      # 危险操作确认弹窗
│
├── hooks/                        # 【全局 hooks】被 ≥2 个页面使用
│   ├── usePermission.ts          # 权限判断
│   ├── useTableFilter.ts         # 表格筛选通用逻辑
│   ├── usePageTitle.ts           # 页面标题设置
│   └── useRouteGuard.ts          # 路由守卫
│
├── services/                     # 【API 层】按业务域分文件，一域一文件
│   ├── product.ts
│   ├── workbench.ts
│   ├── user.ts
│   └── types/                    # API 请求/响应类型（与页面 types 分离）
│       ├── product.ts
│       └── common.ts             # PagedResult<T>、ApiResponse<T> 等
│
├── store/                        # 【全局状态】仅放真正全局的状态
│   ├── user.ts                   # 当前用户信息、权限列表
│   └── app.ts                    # 全局 loading、通知等
│
├── theme/                        # 【主题层】唯一真实来源，禁止在组件里硬编码颜色
│   ├── brand.ts                  # brandTheme（ConfigProvider 完整配置）
│   └── tokens.ts                 # 设计 token 常量（colorPrimary、spacing 等）
│
└── types/                        # 【全局类型】跨域公共类型
    ├── common.ts                 # 通用类型：ID、Status、Option 等
    └── permission.ts             # 权限相关类型
```

---

## 二、核心规则（AI 生成代码必须遵守）

### 规则 1：页面私有组件禁止跨页面引用

```ts
// ✅ 正确：只引用本页面的私有组件
import { FilterBar } from './components/FilterBar';

// ❌ 错误：跨页面引用私有组件
import { FilterBar } from '../product-list/components/FilterBar';
// → 应该将 FilterBar 提升到 src/components/business/
```

### 规则 2：page.tsx 只做导入，不写 JSX

```tsx
// ✅ src/app/merchant/product-list/page.tsx
import ProductListPage from '@/pages/product-list';
export default ProductListPage;

// ❌ 错误：在 page.tsx 里写业务逻辑或 JSX
export default function Page() {
  const [data, setData] = useState(...); // 不允许
  return <Table ... />;                  // 不允许
}
```

### 规则 3：theme/ 是颜色和间距的唯一来源

```ts
// ✅ 正确
import { tokens } from '@/theme/tokens';
style={{ color: tokens.colorTextSecondary }}

// ❌ 错误：硬编码颜色
style={{ color: '#64748B' }}
style={{ color: '#faad14' }}
```

### 规则 4：什么时候从页面私有提升到全局共享

满足以下**任意一条**时，将组件/hook 移到 `src/components/` 或 `src/hooks/`：

- 被 **≥2 个页面**实际引用
- 是框架骨架的一部分（Header/Sidebar/PageContainer）
- 有**独立测试需求**

未达到以上条件时，保持在页面私有目录，不要提前抽象。

### 规则 5：Steps 表单页每个步骤独立文件

```
steps/
  Step1SelectProduct.tsx    ← 负责 Step 1 的人只动这个文件
  Step2DisplayStrategy.tsx  ← 负责 Step 2 的人只动这个文件
  Step3Review.tsx
```

跨步骤共享的 form 状态统一放在 `hooks/useProductForm.ts`，通过 props 或 context 向下传递，**不在 Step 文件之间直接引用**。

---

## 三、新建页面 Checklist

每次 AI 新建一个页面时，必须同时创建以下文件：

```
src/pages/[page-name]/
  ├── index.tsx        # 必须：页面根组件
  ├── components/      # 必须：即使暂时为空也建目录
  ├── hooks/           # 必须：即使暂时为空也建目录
  └── types.ts         # 必须：页面专属类型定义

src/app/[product-line]/[page-name]/
  └── page.tsx         # 必须：路由入口（仅 import + export）
```

同时确认：
- [ ] `types.ts` 已定义页面核心数据类型
- [ ] `services/` 已有对应的 API 文件（没有则新建）
- [ ] 页面标题已使用 `components/business/PageHeader.tsx`
- [ ] 空状态已使用 `components/business/EmptyState.tsx`

---

## 四、文件命名约定

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 组件文件 | `PascalCase.tsx` | `ProductTable.tsx` |
| Hook 文件 | `camelCase.ts`，以 `use` 开头 | `useProductList.ts` |
| 类型文件 | `camelCase.ts` 或 `types.ts` | `types.ts` |
| 目录名 | `kebab-case` | `product-create/` |
| 页面目录 | 与路由路径一致 | `product-list/` → `/merchant/product-list` |
| Service 文件 | 业务域名，`camelCase.ts` | `product.ts`, `workbench.ts` |

---

## 五、产品线与页面索引

> AI 生成新页面前，先查这张表确认归属的产品线和路由路径。

| 产品线 | 路由前缀 | Layout 文件 |
|--------|---------|------------|
| Merchant | `/merchant/` | `src/app/merchant/layout.tsx` |
| Admin | `/admin/` | `src/app/admin/layout.tsx` |
| Workbench | `/workbench/` | `src/app/workbench/layout.tsx` |

**页面路由 → 目录映射规则：**

```
路由：/merchant/product-list
目录：src/pages/product-list/
入口：src/app/merchant/product-list/page.tsx
```

---

## 六、多人协作边界说明

每人认领一个 `src/pages/[page-name]/` 目录，**原则上只修改自己的目录**。

需要协作时的唯一合法路径：

```
需要跨页面共享组件
    ↓
提交 PR 将组件移动到 src/components/business/ 或 src/components/ui/
    ↓
其他页面从共享目录引用
```

禁止直接跨 pages/ 子目录引用，避免隐式依赖和合并冲突。
