# 10 · 图标规范
> 来源：`@ant-design/icons` v6（与 antd@^6 配套，**必须同步升级**）
> 图标浏览：https://ant.design/components/icon-cn/#list-of-icons

---

## 版本绑定

```bash
npm install @ant-design/icons@^6
```

`@ant-design/icons@6` 与 `antd@5` 不兼容，升级 antd 时必须同步升级图标包。

---

## 主题选型规则

| 主题 | 后缀 | 何时用 |
|------|------|--------|
| Outlined | `Outlined` | **默认**，所有通用场景 |
| Filled | `Filled` | 选中态、激活态、重要提示 |
| TwoTone | `TwoTone` | 需要双色表达时，较少用 |

不混用同一语义图标的不同主题（如同一操作同时出现 `EditOutlined` 和 `EditFilled`）。

---

## 尺寸规范

| 场景 | 尺寸 |
|------|------|
| 正文行内 / 按钮（middle） | `14px` |
| 按钮（large）/ 表格行内操作 | `16px` |
| 菜单图标 | `14px`（`Menu.iconSize` 已统一配置） |
| 空状态展示图标 | `32px`+ |

颜色默认继承父级文字色（`currentColor`），不单独指定颜色；需要强调时使用 `colorPrimary: #1677FF`。

统计卡片图标背景：用 `colorPrimaryBg (#E6F4FF)` 做浅色圆形背景，不使用自定义色。

---

## Klook 业务图标

Klook 自定义图标维护在 Figma 设计库（Ant x Klook library）：
> https://www.figma.com/design/n72R5lEBMi3wVlKWzJ77EA（node-id=73-1）

命名约定遵循 antd `Outlined` 后缀：`HotelOutlined`、`ActivityOutlined`、`VoucherOutlined` 等。

代码中通过 `@ant-design/icons` 的 `Icon` 组件包裹 SVG 使用，统一放在 `/src/assets/icons/`。

---

## 选图标规则

1. 先查官方列表确认图标存在，**不造假图标名**
2. 命名规则：语义名 + 主题后缀（`SearchOutlined`、`DeleteOutlined`、`EditOutlined`）
3. antd 没有的业务图标，从 Klook Figma 图标库取，不从第三方库混入
4. 禁止全量导入：`import * as Icons from '@ant-design/icons'`（打包体积极大）
