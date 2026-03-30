# Brand 品牌规范
> Figma：https://www.figma.com/design/luJx0HJs80siOsHV3uxfhT
> Ant Design System V6 变量源文件：https://www.figma.com/design/GJ5DbiGAXJapMUSezNaa1y
> 最后核对：2026-03 | 所有值经 Figma 实测 + 人工逐一确认
> `brandTheme` 是唯一真相，文档说明仅用于辅助理解

---

## 总原则

生成 B 端界面时，品牌规范必须优先于默认视觉习惯。先查本文档，再写组件代码。

- 先使用 `brandTheme` token，再写组件代码
- 优先复用 antd token 和组件 token，不手写等价值
- 没有明确要求时，不新增自定义色、圆角、阴影和尺寸
- 页面保持克制、稳定、专业，不做营销化视觉强化

---

## 颜色

### 主色与交互色

| antd v6 token | 值 | 用途 |
|--------------|-----|------|
| `colorPrimary` | `#1677FF` | 主按钮、链接、选中态、关键交互反馈 |
| `colorLink` | `#1677FF` | 同上 |

限制：
- `#FF5B00` 仅用于 Logo 或品牌视觉物料，**不用于业务界面主交互**
- `#6056D6` 仅用于设计物料，**不用于常规业务组件**

### 文字色

| antd v6 token | 值 | 典型场景 |
|--------------|-----|---------| 
| `colorText` | `rgba(0,0,0,0.88)` | 标题、表单标签、表格内容 |
| `colorTextSecondary` | `rgba(0,0,0,0.65)` | 说明、副标题、Steps 非激活、辅助说明 |
| `colorTextTertiary` | `rgba(0,0,0,0.45)` | 面包屑非末项、placeholder |
| `colorTextQuaternary` | `rgba(0,0,0,0.25)` | 禁用态、菜单分组标签 |

### 背景色

| antd v6 token | 值 | 用途 |
|--------------|-----|------|
| `colorBgContainer` | `#FFFFFF` | 卡片、表格、Input 容器 |
| `colorBgLayout` | `#F5F5F5` | 页面底色 |
| `colorBgElevated` | `#FFFFFF` | Modal、Drawer、Dropdown 浮层 |
| `colorFillTertiary`（衍生值） | `#F5F5F5` | 一般填充背景 |
| `colorFillContent`（衍生值） | `rgba(0,0,0,0.06)` | 搜索框背景（Figma 实测），比 `colorFillTertiary` 略深 |
| `colorBgSidebar` | `#FBFBFB` | 侧边栏背景（Figma 实测） |

不要随意创建新的浅灰背景层级。

### 边框色

| antd v6 token | 值 | 用途 |
|--------------|-----|------|
| `colorBorder` | `#D9D9D9` | 控件边框（Input、Select） |
| `colorBorderSecondary` | `#EEEFF1` | 分隔线、Header 底线 |

### 功能色

| antd v6 token | 值 | 说明 |
|--------------|-----|------|
| `colorSuccess` | `#52C41A` | 仅用于语义反馈，不用于装饰 |
| `colorWarning` | `#FAAD14` | 同上 |
| `colorError` | `#FF4D4F` | 同上 |
| `colorInfo` | `#1677FF` | 同上 |

### Tag / Badge 状态色

优先使用 antd 内置 preset，不自定义 token。用法：`<Tag color="green">上线</Tag>`

| `color` prop | 语义 | 典型场景 |
|-------------|------|---------| 
| `default` | 通用 | 普通标签 |
| `blue` | 说明 / 规则 | 确认说明、规则提示 |
| `red` | 风险 / 限制 | 不可退、风险提示 |
| `green` | 成功 / 上线 | Active、Published |
| `orange` | 待处理 / 进行中 | Pending、Processing |
| `gray` | 已归档 / 已关闭 | Archived、Closed |

不要为普通状态标签新建自定义色，状态优先依赖 preset + 文案。

---

> 需要精确色阶值时（图表、品牌物料），参考 Figma 源文件：https://www.figma.com/design/GJ5DbiGAXJapMUSezNaa1y


## 间距（Spacing）

> 基于 4px 网格（`sizeUnit = 4`），所有间距为 4 的倍数。

| antd token | 值 | 典型用途 |
|-----------|----|---------| 
| `paddingXXS` | `4px` | 图标与文字间距、inline tag 内边距 |
| `paddingXS` | `8px` | 紧凑行内间距 |
| `paddingSM` | `12px` | 表格单元格 padding、列表项竖向 |
| `padding` | `16px` | 标准内容区内边距 |
| `paddingMD` | `20px` | 卡片内容区（较少用） |
| `paddingLG` | `24px` | 卡片标准 padding（`Card.paddingLG`） |
| `paddingXL` | `32px` | 页面内容区顶部间距 |

**常用组合规则：**
- 卡片内边距：`24px`（`paddingLG`）
- 筛选区与表格间距：`16px`
- 表单字段竖向间距：`16px`（`Form.itemMarginBottom`）
- 工具栏操作按钮间距：`8px`（`paddingXS`）
- 段落内文字与图标间距：`4px` 或 `8px`

---

## 圆角

### 分级

| 值 | antd v6 token | 使用场景 |
|----|--------------|---------| 
| `0px` | antd 默认，不覆盖 | 贴边结构——侧边栏本体、Drawer |
| `2px` | `Checkbox.borderRadiusSM` | 极小控件——Checkbox |
| `4px` | `Tag.borderRadiusSM` | 轻量状态元素——Tag |
| `6px` | `borderRadius`（antd 默认，**不覆盖**） | 系统默认——Input · Select · Button · DatePicker |
| `12px` | `Modal.borderRadiusLG` | 标准浮层——Modal、Drawer |
| `16px` | `Card.borderRadiusLG` | 内容卡片、模块容器——Figma 实测统一 16px |
| `9999px` | `Menu.itemBorderRadius` | pill 形态——侧边菜单项 |

### 规则

- 普通交互控件默认 `6px`，优先复用 antd token，不随意手写圆角
- 普通表单控件 → `6px`；小型勾选和轻量标签 → `2px / 4px`
- 内容卡片 → `16px`；弹窗（Modal）→ `12px`
- 贴边结构 → `0px`；胶囊形态才 → `9999px`
- 不新增 `3px`、`10px`、`14px` 等未定义圆角值
- 不把 `16px` 用于普通 Input / Button / Select
- 不把 `9999px` 泛化为通用圆角
- 不在同一页面混用过多圆角等级

### 实现优先级

1. 组件 token（`components.Button.borderRadius` 等）
2. 全局 token（`token.borderRadius`）
3. 最后才允许局部 `ConfigProvider` 或 CSS 覆盖

---

## 阴影

| antd v6 token | 值 |
|--------------|-----|
| `boxShadow` | `none` |
| `boxShadowSecondary` | `none` |
| `Button.primaryShadow` | `none` |
| `Button.defaultShadow` | `none` |
| `Card.boxShadowTertiary` | `none` |
| `Card.colorBorderSecondary` | `transparent`（无描边，覆盖 antd 默认 `#f0f0f0`） |

设计倾向：扁平、极简、克制。用留白、边框、背景层级表达结构，不依赖阴影制造高级感。

禁止：
- 不给按钮加发光阴影
- 不给卡片、表单、浮层额外叠加阴影

---

## 动效

| antd v6 token | 值 | 说明 |
|--------------|-----|------|
| `motionDurationMid` | `0.15s` | 短、轻、克制 |

- 不加入夸张位移、弹跳、缩放动效
- B 端界面以响应确定性优先，不追求表演型动画

**Ant Design V6 动效缓动曲线参考（来自 Seed Token）：**

| 用途 | 缓动曲线 |
|------|---------|
| 标准进出 | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| 标准出场 | `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| 圆形出场 | `cubic-bezier(0.08, 0.82, 0.17, 1)` |
| 五次方出场 | `cubic-bezier(0.23, 1, 0.32, 1)` |

---

## 字体

遵循 Ant Design 官方字体规范，不引入自定义展示字体。

### 字体族（Font Family）

```css
/* antd 默认字体族，跟随系统，无需额外设置 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```

- 不全局设置 `fontFamily`，antd 控件跟随浏览器系统字体栈
- 数字列展示使用 `font-variant-numeric: tabular-nums`，保证数字对齐
- 代码类内容使用 `SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace`

### 字号与行高（Font Scale）

antd 推荐基础字号为 14px，对应行高 22px。设计系统中字号等级建议控制在 3–5 种，保持克制。

| antd token | 字号 | 行高 | 典型场景 |
|-----------|------|------|---------| 
| `fontSizeHeading1` | 30px | 38px | 页面大标题（较少使用） |
| `fontSizeHeading2` | 24px | 32px | 页面 H1 标题 |
| `fontSizeHeading3` | 20px | 28px | 区块标题 |
| `fontSizeHeading4` | 16px | 24px | 次级标题 |
| `fontSizeLG` | 16px | 24px | 大号正文 |
| `fontSize`（基准） | 14px | 22px | 正文、表单、表格内容 |
| `fontSizeSM` | 12px | 20px | 辅助说明、注释、Tag 文字 |

### 字重（Font Weight）

| 用途 | 字重 | 说明 |
|------|------|------|
| 正文 | 400（Regular） | 默认 |
| 标题 / 强调 | 600（SemiBold） | 页面标题、卡片标题 |

- 不使用 700 及以上字重，避免过重
- 不用字重替代颜色层级表达信息重要性

### 原则

- 同一页面字号等级控制在 3–5 种，避免随意增加字号
- 少即是多：不用大量字号、颜色、字重来强调对比关系

---

## 组件级 Token 扩展

> 以下为 `brandTheme.components` 中各组件的完整 token 规范，含来源说明。

### Table

| Component Token | 值 | 说明 |
|----------------|----|----|
| `headerBg` | `#FAFAFA` | 表头背景，略深于容器 |
| `headerColor` | `rgba(0,0,0,0.88)` | 表头文字，与正文同色 |
| `rowHoverBg` | `#FAFAFA` | 行 hover 背景，轻微提示 |
| `borderColor` | `#F0F0F0` | 表格内部分隔线 |
| `cellPaddingBlock` | `12px` | 行高对应的上下 padding |
| `cellPaddingInline` | `16px` | 单元格左右 padding |

行高规则：
- 默认行：`cellPaddingBlock: 12px`，内容区高度 ~44px
- 紧凑行：通过 `size="small"` 或 `compactAlgorithm` 切换，不单独覆盖

### Menu（侧边导航）

| Component Token | 值 | 说明 |
|----------------|----|----|
| `itemHeight` | `46px` | Figma 实测，覆盖 antd 默认 40px |
| `itemBorderRadius` | `9999px` | pill 形态选中项 |
| `itemSelectedBg` | `#1677FF` | 选中背景 = 主色 |
| `itemSelectedColor` | `#FFFFFF` | 选中文字 = 白色 |
| `itemColor` | `rgba(0,0,0,0.88)` | 默认文字 |
| `itemHoverBg` | `#F5F5F5` | hover 背景 |
| `subMenuItemBg` | `transparent` | 子菜单背景透明 |
| `groupTitleColor` | `#BFBFBF` | 分组标签颜色 = 四级文字 |
| `groupTitleFontSize` | `11px` | 分组标签字号（较小，辅助性） |
| `iconSize` | `14px` | 菜单图标尺寸 |
| `iconMarginInlineEnd` | `10px` | 图标与文字间距 |

### Card

| Component Token | 值 | 说明 |
|----------------|----|----|
| `borderRadiusLG` | `16px` | Figma 实测：所有内容卡片 16px |
| `paddingLG` | `24px` | 卡片内容区标准内边距 |
| `boxShadowTertiary` | `none` | 无阴影 |
| `colorBorderSecondary` | `transparent` | 无描边（覆盖 antd 默认 #f0f0f0） |

### Modal

| Component Token | 值 | 说明 |
|----------------|----|----|
| `borderRadiusLG` | `12px` | 弹窗保持 12px，与卡片圆角区分 |
| `paddingContentHorizontalLG` | `24px` | 内容区左右 padding |
| `paddingMD` | `20px` | 标题区 padding |

### Form

| Component Token | 值 | 说明 |
|----------------|----|----|
| `labelColor` | `rgba(0,0,0,0.88)` | 表单标签颜色 = 主文字色 |
| `verticalLabelPadding` | `0 0 6px` | 竖排标签下方间距 |
| `itemMarginBottom` | `16px` | 表单项竖向间距 |

### Breadcrumb

| Component Token | 值 | 说明 |
|----------------|----|----|
| `itemColor` | `#8C8C8C` | 非末项颜色 = 三级文字 |
| `lastItemColor` | `rgba(0,0,0,0.88)` | 末项颜色 = 主文字 |
| `linkColor` | `#8C8C8C` | 可点击项颜色 |
| `linkHoverColor` | `rgba(0,0,0,0.88)` | hover 颜色 |
| `separatorMargin` | `8px` | 分隔符左右间距 |

### Tag / Checkbox（细节控件）

| 组件 | Component Token | 值 |
|------|-----------------|----|
| `Tag` | `borderRadiusSM` | `4px` |
| `Checkbox` | `borderRadiusSM` | `2px` |

### Tabs

| Component Token | 值 | 说明 |
|----------------|----|----|
| `inkBarColor` | `#1677FF` | 下划线颜色 = 主色 |
| `itemActiveColor` | `#1677FF` | 激活 tab 文字 |
| `itemSelectedColor` | `#1677FF` | 选中 tab 文字 |
| `itemHoverColor` | `#4096ff` | hover 文字（blue/5） |
| `cardBg` | `#FAFAFA` | 卡片型 Tabs 背景 |

### Pagination

| Component Token | 值 | 说明 |
|----------------|----|----|
| `itemBg` | `transparent` | 页码项背景 |
| `itemActiveBg` | `#1677FF` | 当前页背景 = 主色 |
| `itemSize` | `32px` | 页码项尺寸 |

---

## brandTheme 配置代码

> 此代码是唯一真相，直接复制到 `theme/brand.ts` 使用。

```typescript
// theme/brand.ts
import type { ThemeConfig } from 'antd';

export const brandTheme: ThemeConfig = {
  token: {
    // 主色
    colorPrimary:         '#1677FF',
    colorLink:            '#1677FF',

    // 文字（4 层）—— antd v6 默认值，不覆盖
    // colorText:            rgba(0,0,0,0.88)
    // colorTextSecondary:   rgba(0,0,0,0.65)
    // colorTextTertiary:    rgba(0,0,0,0.45)
    // colorTextQuaternary:  rgba(0,0,0,0.25)

    // 背景
    colorBgContainer:     '#FFFFFF',
    colorBgLayout:        '#F5F5F5',
    colorBgElevated:      '#FFFFFF',

    // 边框
    colorBorder:          '#D9D9D9',
    colorBorderSecondary: '#EEEFF1',

    // 功能色（显式声明防版本漂移）
    colorSuccess:         '#52C41A',
    colorWarning:         '#FAAD14',
    colorError:           '#FF4D4F',
    colorInfo:            '#1677FF',

    // 阴影全部关闭
    boxShadow:            'none',
    boxShadowSecondary:   'none',

    // 动效
    motionDurationMid:    '0.15s',

    // 圆角：全局基准 6px = antd 默认，不覆盖
    // 字体：不设置 fontFamily，跟随系统字体栈

    // 字号覆盖（覆盖 antd 默认值）
    fontSizeHeading1: 30,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,

    // 间距（显式声明基准，防版本漂移）
    paddingXXS:  4,
    paddingXS:   8,
    paddingSM:   12,
    padding:     16,
    paddingLG:   24,
    paddingXL:   32,
  },

  components: {
    Button: {
      // 圆角继承全局 6px，不覆盖
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow:  'none',
    },

    Card: {
      borderRadiusLG:       16,  // Figma 实测：所有内容卡片均为 16px
      paddingLG:             24,
      boxShadowTertiary:    'none',
      colorBorderSecondary: 'transparent', // 设计稿无描边，覆盖 antd 默认 #f0f0f0
    },

    Modal: {
      borderRadiusLG:             12,  // 弹窗保持 12px，与卡片区分
      paddingContentHorizontalLG: 24,
      paddingMD:                  20,
    },

    // Drawer：贴边，无圆角，antd 默认不覆盖

    Menu: {
      itemHeight:          46,
      itemBorderRadius:    9999,
      itemSelectedBg:      '#1677FF',
      itemSelectedColor:   '#FFFFFF',
      itemColor:           'rgba(0,0,0,0.88)',
      itemHoverBg:         '#F5F5F5',
      subMenuItemBg:       'transparent',
      groupTitleColor:     '#BFBFBF',
      groupTitleFontSize:  11,
      iconSize:            14,
      iconMarginInlineEnd: 10,
    },

    Table: {
      headerBg:          '#FAFAFA',
      headerColor:       'rgba(0,0,0,0.88)',
      rowHoverBg:        '#FAFAFA',
      borderColor:       '#F0F0F0',
      cellPaddingBlock:  12,
      cellPaddingInline: 16,
    },

    Tabs: {
      inkBarColor:       '#1677FF',
      itemActiveColor:   '#1677FF',
      itemSelectedColor: '#1677FF',
      itemHoverColor:    '#4096ff',
      cardBg:            '#FAFAFA',
    },

    Pagination: {
      itemBg:       'transparent',
      itemActiveBg: '#1677FF',
      itemSize:     32,
    },

    Tag: {
      borderRadiusSM: 4,
    },

    Checkbox: {
      borderRadiusSM: 2,
    },

    Form: {
      labelColor:           'rgba(0,0,0,0.88)',
      verticalLabelPadding: '0 0 6px',
      itemMarginBottom:     16,
    },

    Breadcrumb: {
      itemColor:       '#8C8C8C',
      lastItemColor:   'rgba(0,0,0,0.88)',
      separatorMargin: 8,
      linkColor:       '#8C8C8C',
      linkHoverColor:  'rgba(0,0,0,0.88)',
    },
  },
};
```

### 根节点接入

```tsx
// App.tsx
import { ConfigProvider, App as AntdApp } from 'antd';
import enUS from 'antd/locale/en_US';
import { brandTheme } from './theme/brand';

export default function Root() {
  return (
    <ConfigProvider theme={brandTheme} locale={enUS}>
      <AntdApp>
        <YourApp />
      </AntdApp>
    </ConfigProvider>
  );
}
```

### 局部主题覆盖（嵌套 ConfigProvider）

```tsx
// 仅在特定区域覆盖（如品牌展示区、图表容器）
<ConfigProvider theme={{ token: { colorPrimary: '#FF5B00' } }}>
  <BrandHeroSection />
</ConfigProvider>
```

---

## 布局尺寸

> 详见 `02-layout-framework.md`，本文件不重复维护。

---

## Token 选用决策优先级

```
Seed Token（colorPrimary、borderRadius 等）
  ↓ 优先
Alias Token（colorBgContainer、colorBorderSecondary 等）
  ↓ 次之
Component Token（Table.headerBg、Menu.itemHeight 等）
  ↓ 再次
嵌套 ConfigProvider（局部区域临时覆盖）
  ↓ 最后
局部 CSS / classNames / styles prop（组件语义化样式）
```

**原则**：能用 Seed 解决的不用 Alias，能用 Alias 解决的不用 Component，能用 Component 解决的不写 CSS。

---

## 禁止事项

- 不新增未定义品牌主色
- 不把 `#FF5B00` 或 `#6056D6` 用于常规业务交互
- 不新增 `3px`、`10px`、`14px` 等未定义圆角值
- 不增加额外阴影制造层级
- 不为了"更现代"随意增大控件圆角
- 不在同一页面混用过多颜色、圆角、背景层级
- 不偏离 antd token 体系进行大面积手写样式
- 不直接引用色板阶梯值（如 `blue/6`）用于业务组件，应使用语义 token

---

## AI 执行句

先遵循 `brandTheme`，不自造品牌规则。主交互统一 `#1677FF`，文字/背景/边框/功能色按既定 token 使用；默认控件圆角 `6px`，内容卡片 `16px`，弹窗 `12px`，阴影全部关闭，间距基于 4px 网格，布局尺寸保持稳定，只在规范明确允许时做局部覆盖。需要精确色阶值时查 Figma 源文件。

---

## 设计决策备忘

> 此章供人类回溯，AI 执行时跳过。

| 决策 | 说明 |
|------|------|
| 文字色遵循 antd 默认值 | colorText 4 层均使用 antd v6 默认 rgba 值，不做品牌覆盖 |
| Button 圆角不覆盖 | antd 默认 6px 即为设计意图 |
| 字体遵循 antd 官方规范 | 使用系统字体族，不引入自定义展示字体；字号/行高/字重均按 antd token 体系 |
| 侧边栏去圆角 | 贴边语义，圆角归属模块容器层级 |
| 菜单项全胶囊 | 选中/未选中统一 pill，Figma 实测 |
| 卡片圆角 16px | Figma 实测统一 16px；Modal 单独保持 12px |
| Header 56px | Figma 实测 56px，以实测为准 |
| 菜单项 46px | Figma 实测确认，覆盖 antd 默认 40px |
| 间距基于 4px 网格 | sizeUnit=4，所有间距为 4 的倍数，显式声明防版本漂移 |
| Tabs / Pagination token 补全 | 高频组件补充语义覆盖，减少单页面手写样式 |
| Tag 状态色补全 orange/gray | 补充业务常见的「待处理」「已归档」语义，与 antd preset 对齐 |
| 色板章节新增 | 供图表、品牌物料精确引用阶梯值，业务代码仍优先用语义 token |
