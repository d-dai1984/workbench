# Token 体系与主题定制
> 面向 AI 的决策参考，不是教程。重点在"如何选择"，不在"是什么"。

---

## 一、三层 Token 架构（决策用）

```
Seed Token（种子）
  ↓ 算法自动推导
Map Token（映射）
  ↓ 语义化映射
Alias Token（别名）
  ↓ 按需覆盖
Component Token（组件级）
```

### 何时用哪层

| 需求 | 用这层 | 示例 |
|------|--------|------|
| 换品牌色 | Seed | `colorPrimary: '#0066FF'` |
| 调全局圆角 / 字体 | Seed | `borderRadius: 4` |
| 精细控制某类颜色 | Alias | `colorBgContainer: '#fff'` |
| 定制单个组件 | Component | `Table: { headerBg: '...' }` |
| 局部区域换主题 | 嵌套 `ConfigProvider` | — |

**原则**：能用 Seed 解决的不用 Alias，能用 Alias 解决的不用 Component。

---

## 二、主题算法

### 内置算法

| 算法 | 用途 | 使用方式 |
|------|------|---------|
| `theme.defaultAlgorithm` | 亮色主题（默认） | `algorithm: theme.defaultAlgorithm` |
| `theme.darkAlgorithm` | 暗色主题 | `algorithm: theme.darkAlgorithm` |
| `theme.compactAlgorithm` | 紧凑主题（信息密度高） | `algorithm: theme.compactAlgorithm` |

### 算法组合（v6 支持）

```typescript
// 暗色 + 紧凑
algorithm: [theme.darkAlgorithm, theme.compactAlgorithm]

// 亮色 + 紧凑
algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm]
```

---

## 三、v6 运行时模式

### CSS-in-JS（默认）
- 运行时动态生成样式，支持完整 Token 定制
- 自动处理 CSS hash，无样式冲突
- 首屏有轻微运行时开销

### CSS Variables 模式（v6 默认开启）
```typescript
// v6 默认启用，无需额外配置
// CSS 变量格式: --ant-color-primary
```
- 支持通过 CSS 变量在运行时切换主题（如暗色模式）
- 性能略优于纯 CSS-in-JS

### Zero Runtime 模式（v6 新增，性能优先）
```typescript
// ConfigProvider 配置
<ConfigProvider theme={{ zeroRuntime: true }}>

// 必须手动引入样式（推荐用 static-style-extract 生成）
// import 'antd/dist/reset.css';
```
- 无运行时样式生成，性能最佳
- **限制**：样式固定，无法通过 Token 动态定制
- 适用场景：性能极敏感、主题固定的产品

---

## 四、局部主题（嵌套 ConfigProvider）

```typescript
// 某个区域使用不同主题（如 Admin 面板内嵌一个编辑器）
<ConfigProvider theme={{ token: { colorPrimary: '#52C41A' } }}>
  <SpecialSection />
</ConfigProvider>

// 规则：子主题未覆盖的 Token 自动继承父主题
```

---

## 五、获取当前 Token（代码中使用）

```typescript
// React 组件内
import { theme } from 'antd';
const { token } = theme.useToken();
// token.colorPrimary, token.borderRadius, ...

// React 生命周期外（工具函数）
import { theme } from 'antd';
const { getDesignToken } = theme;
const globalToken = getDesignToken(brandTheme);
```

---

## 六、Component Token 与 Semantic Structure（v6 核心变化）

### v6 Semantic classNames / styles

v6 为组件各区域提供了语义化 prop，替代 CSS 选择器覆盖：

```typescript
// 以 Table 为例
<Table
  classNames={{
    header: 'my-table-header',   // 表头区域
    body: 'my-table-body',       // 表格主体
    row: 'my-table-row',         // 每一行
    cell: 'my-table-cell',       // 每个单元格
  }}
  styles={{
    header: { background: '#F7F9FC' },
  }}
/>

// 以 Button 为例
<Button classNames={{ icon: 'my-icon' }}>...</Button>
```

**原则**：先查组件是否支持 `classNames` / `styles` prop，有则用，没有再考虑 Component Token，最后才考虑全局 CSS。

### Component Token 开启算法（v6 新增）

```typescript
// 默认 component token 不走算法推导（直接覆盖）
// v6 支持开启算法，让 component token 也参与推导：
components: {
  Button: {
    algorithm: true, // 开启，让 colorPrimary 影响 Button 的衍生色
  }
}
```

---

## 七、SSR 主题配置

```typescript
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

// 服务端
const cache = createCache();
const html = renderToString(
  <StyleProvider cache={cache}>
    <ConfigProvider theme={brandTheme}>
      <App />
    </ConfigProvider>
  </StyleProvider>
);
const styleText = extractStyle(cache);

// 注入 <head>: <style>${styleText}</style>
```

---

## 八、主题调试工具

- **官方主题编辑器**：`https://ant.design/theme-editor-cn`（可视化调整 Token，导出配置）
- **useToken Hook**：在组件内打印当前所有 Token 值
- **antd DevTools**（Chrome 插件）：检查组件使用的 Token

---

## 九、常见 Seed Token 速查

```typescript
// 颜色（最常用的 Seed）
colorPrimary      // 主色（品牌色）
colorSuccess      // 成功
colorWarning      // 警告
colorError        // 错误
colorInfo         // 信息

// 文字
colorText               // 主文字
colorTextSecondary      // 次要文字
colorTextTertiary       // 辅助文字
colorTextQuaternary     // 禁用/占位

// 背景
colorBgContainer        // 容器（白色）
colorBgLayout           // 页面底色（浅灰）
colorBgElevated         // 浮层（白色）

// 边框
colorBorder             // 主边框
colorBorderSecondary    // 分隔线

// 尺寸
borderRadius            // 全局圆角
borderRadiusLG          // 大圆角
borderRadiusSM          // 小圆角
fontSize                // 基础字号
fontFamily              // 字体栈

// 间距（基于 8px 网格，所有间距为 8 的倍数）
padding     paddingLG     paddingSM     paddingXS
margin      marginLG      marginSM      marginXS
```
