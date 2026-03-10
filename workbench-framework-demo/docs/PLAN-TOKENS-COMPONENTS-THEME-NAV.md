# Workbench 设计系统改造：规划与交付说明

## 一、整体规划与交付物

### 1. Token 统一（klook-bench 与 AntD 区分）

| 项 | 说明 |
|----|------|
| **命名** | 自定义 token 一律以 `--klook-bench-*` 为前缀，与 AntD 原生 `--ant-*` 区分。 |
| **范围** | 仅对你在 App.css 里**覆盖或自定义**的样式做 token 化（颜色、间距、圆角、阴影等）。 |
| **交付** | `src/theme/klook-bench-tokens.css`：定义所有 `--klook-bench-*` 变量；`App.css` 改为引用这些变量，不再写死色值。 |
| **文档** | 在 `docs/TOKENS.md` 中列出 klook-bench token 清单及与 AntD 的对应关系（如有覆盖）。 |

### 2. 组件化设计

| 层级 | 组件 | 职责 |
|------|------|------|
| 布局壳 | `KlookBenchLayout` | Header + Sidebar + Content 整体布局，接收 nav 配置与 content 渲染方式。 |
| 顶栏 | `KlookBenchHeader` | Logo、Merchant 切换、搜索、右侧快捷操作、用户头像与下拉。 |
| 侧栏 | `KlookBenchSidebar` | 折叠状态、折叠按钮；内部用 `KlookBenchNav` 根据配置渲染主导航 + 二级菜单。 |
| 导航 | `KlookBenchNav` | 纯展示：根据「导航配置」渲染 Menu，icon 来自配置中的 key 解析到约定目录。 |
| 内容区 | `KlookBenchContent` | 渲染 children 或根据 selectedKey 渲染业务页面。 |
| 仪表盘 | `DashboardPage` | 当前 My Bench 内容：TopOverview、TodoList、DashboardCharts、QuickAccess 等拆成子组件。 |
| 通用 | `ModuleCard` | 已有 ModuleContainer 抽成统一卡片组件。 |

**交付**：`src/components/` 下按上述结构拆分，`App.tsx` 只做组装与路由/状态；现有逻辑迁移到对应组件内。

### 3. 主题封装

| 项 | 说明 |
|----|------|
| **入口** | 使用 AntD `ConfigProvider` + 自定义 theme 对象；klook-bench 的 CSS 变量在同一处注入。 |
| **文件** | `src/theme/theme.ts`（或 `theme.config.ts`）：导出 `themeConfig`（含 AntD token 覆盖 + 可选暗色 algorithm）；`src/theme/klook-bench-tokens.css` 在根或 Layout 内引入。 |
| **交付** | 换主题色/明暗只改 theme 配置 + tokens 文件，不改组件内部。 |

---

## 二、导航可配置：思路与 Icon 约定

### 思路

- **固定框架**：`KlookBenchSidebar` + `KlookBenchNav` 的布局、折叠、二级面板动画等不变。
- **内容可配置**：主导航与二级菜单的「分组、文案、key、icon」全部来自一份**导航配置**（见下节交付格式）。
- **数据流**：配置 → `KlookBenchNav` → 转成 AntD `Menu` 的 `items`；选中的 key 回传 Layout，再决定 Content 渲染哪一页。

### Icon 从哪里来、放在哪里

| 问题 | 约定 |
|------|------|
| **从哪里来** | 与现在一致：**本地上传的 SVG**，不依赖 Figma 在线或代码生成。 |
| **放在哪里** | 统一目录：`public/klook-bench/nav-icons/`。 |
| **如何引用** | 配置里只写 **文件名（不含 .svg）**，例如 `icon: 'dashboard'` → 运行时解析为 `/klook-bench/nav-icons/dashboard.svg`。若配置为完整路径（如 `icon: '/custom/path/foo.svg'`），则直接使用该路径，便于特殊业务。 |
| **占位** | 若某 key 对应 SVG 缺失，可显示占位图或首字母，避免报错。 |

这样：**你配置导航时，只需把 SVG 放到 `public/klook-bench/nav-icons/`，配置里写文件名即可。**

---

## 三、你提的三个细节

### 1. 样式命名：klook-bench 前缀

- 所有**自定义**样式类名统一改为以 **`klook-bench-`** 开头（例如 `workbench-header` → `klook-bench-header`）。
- 与未来 C 端 `klook-app-*` 区分清晰；AntD 自带的类名不改。

### 2. 导航配置时 Icon 的来源与位置（已在上节说明）

- **来源**：本地上传的 SVG。  
- **位置**：`public/klook-bench/nav-icons/`，配置中写文件名（如 `dashboard`）或完整路径。

### 3. 主题颜色在哪里改（导航高亮、按钮高亮等）

- **AntD 部分**（按钮、输入框、Tab 等组件的高亮色）：  
  - 在 **`src/theme/theme.ts`**（或你命名的 theme 配置文件）里，通过 `ConfigProvider` 的 `theme.token.colorPrimary` 修改；暗色可用 `theme.algorithm` 切换为 `darkAlgorithm`。
- **自定义 CSS 部分**（当前 App.css 里所有 `#1677ff`、`#f44622`、`#91caff`、`#e6f4ff` 等）：  
  - 全部改为使用 **`--klook-bench-*`** 变量（见下）。
  - 修改主题色/明暗时：**只改两处**——  
    1）**`src/theme/klook-bench-tokens.css`**：改 `--klook-bench-color-primary` 等变量值；  
    2）**`src/theme/theme.ts`**：改 `colorPrimary` 与 algorithm（明暗）。

**当前 App.css 中与主题色相关的位置（改造后统一由 token 控制）**：

- 导航选中背景/文字：`#1677ff`、`#fff`
- Merchant 按钮边框/文字、箭头 SVG 描边：`#1677ff`
- 各类按钮边框/文字：`#1677ff`、`#91caff`、`#e6f4ff`
- 进度/强调色：`#f44622`
- Feedback FAB、反馈用户气泡：`#1677ff`、`#e6f4ff`、`#91caff`

这些在交付的 tokens 文件中会对应到例如：`--klook-bench-color-primary`、`--klook-bench-color-primary-light`、`--klook-bench-color-accent` 等。

---

## 四、左侧导航内容替换：交付格式约定

你**按下面格式提供一份配置文件**，即可一次性替换「主导航 + 二级菜单」的全部内容（分组、文案、key、icon、二级项）。

### 格式：JSON（推荐）或 YAML

**约定**：

- 一个文件描述**全部**主导航 + 二级菜单。
- 主导航每一项可有可无 `children`；有则渲染为二级菜单。
- `icon`：字符串。  
  - 若为**不含扩展名的文件名**（如 `dashboard`），则解析为 `/klook-bench/nav-icons/{icon}.svg`。  
  - 若为**以 `/` 开头的路径**（如 `/custom/icons/foo.svg`），则直接作为 img src 使用。

### JSON Schema 示例

```json
{
  "groups": [
    {
      "groupLabel": "MENU",
      "items": [
        {
          "key": "my-bench",
          "label": "My Bench",
          "icon": "dashboard"
        },
        {
          "key": "account-acquisition",
          "label": "Account Acquisition",
          "icon": "account-acquisition",
          "children": [
            { "key": "prospective", "label": "Prospective Customers" },
            { "key": "lead-management", "label": "Lead Management" },
            { "key": "conversion", "label": "Conversion Tracking" },
            { "key": "acquisition", "label": "Acquisition Analysis" }
          ]
        }
      ]
    },
    {
      "groupLabel": "GENERAL",
      "items": [
        { "key": "task", "label": "Task", "icon": "task", "children": [
          { "key": "my-tasks", "label": "My Tasks" },
          { "key": "team-tasks", "label": "Team Tasks" }
        ]},
        { "key": "notification", "label": "Notification", "icon": "notification" }
      ]
    }
  ]
}
```

### 你方交付物

- **一份** JSON（或 YAML）文件，包含上述结构的 `groups`。
- **一组** SVG 文件，放入 `public/klook-bench/nav-icons/`，文件名与配置中的 `icon` 一致（如 `dashboard.svg`、`account-acquisition.svg`）。

### 我方实现

- 提供**默认配置**：`src/config/nav.config.json`（或 .ts 导出），内容即当前主导航+二级菜单。
- 提供**读取与解析**：从该配置生成 AntD Menu items；icon 按上面规则解析到 `/klook-bench/nav-icons/{icon}.svg` 或完整路径。
- **替换方式**：你替换 `nav.config.json`（或通过构建/环境变量指向另一文件）并更新 `public/klook-bench/nav-icons/` 中的 SVG，即可完成主导航+二级菜单的**全部内容替换**，无需改框架代码。

---

## 五、交付清单汇总

| # | 交付物 | 说明 |
|---|--------|------|
| 1 | `src/theme/klook-bench-tokens.css` | 所有 klook-bench 用到的 CSS 变量（与 AntD 区分） |
| 2 | `src/theme/theme.ts` | ConfigProvider + AntD token + 明暗色；主题色/明暗只改此处 + tokens |
| 3 | `docs/TOKENS.md` | klook-bench token 列表及与 AntD 对应关系 |
| 4 | `src/components/` | KlookBenchLayout / Header / Sidebar / Nav / Content；Dashboard 子组件；ModuleCard |
| 5 | 样式类名迁移 | App.css 等中自定义类名统一为 `klook-bench-*` |
| 6 | `public/klook-bench/nav-icons/` | 约定目录；你放 SVG，配置写文件名 |
| 7 | `src/config/nav.config.json`（或 .ts） | 默认导航配置；你按约定格式替换该文件即可全量换导航内容 |
| 8 | 导航配置解析与使用 | 从配置生成 Menu items，icon 解析规则见上 |

实现时按上述顺序：tokens → 主题封装 → 组件化（含导航配置）→ 文档与命名迁移。  
若你确认该规划与交付格式，我再按此方案在仓库中落地实现（先做 tokens + 主题 + 导航配置与组件化，再补 TOKENS.md 与类名迁移）。
