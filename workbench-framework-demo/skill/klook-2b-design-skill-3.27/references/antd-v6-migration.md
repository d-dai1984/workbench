# v5 → v6 迁移：破坏性变更速查
> AI 生成代码时必须对照此表，避免输出已废弃的 v5 写法。
> 发布时间：v6.0.0 = 2025-11-22，当前最新 v6.3.4

---

## 一、必须立即修改的 Breaking Changes

### 已废弃组件
| v5 写法 | v6 替代方案 | 说明 |
|---------|------------|------|
| `<List>` | 自定义 `<Flex>` / `<Grid>` + `<Card>` | v6 标记 deprecated，仍可用，v7 删除 |

### API 重命名

| 组件 | v5 prop | v6 prop | 说明 |
|------|---------|---------|------|
| `Tabs` | `tabPosition="left/right"` | `tabPlacement="start/end"` | 语义化重命名 |
| `Steps` | `labelPlacement` | `titlePlacement` | 统一命名风格 |
| `Radio` | 内部 `-inner` DOM | 已移除 | Semantic Structure 重构 |
| `Select` | 单选模式有 `-content-value` div | 已移除 | 优化语义结构 |

### 默认行为变化

| 功能 | v5 默认 | v6 默认 | 影响 |
|------|---------|---------|------|
| CSS Variables | 关闭 | **开启** | 样式变量格式变化 |
| Modal mask blur | 开启 | **关闭** | 视觉变化（更清晰） |
| Drawer mask blur | 开启 | **关闭** | 同上 |
| Spin DOM 结构 | 旧结构 | 重构（full semantic） | CSS 定制路径变化 |

---

## 二、核心新特性（v6 可用，v5 没有）

### Semantic Structure（语义化结构）
所有组件开始支持 `classNames` / `styles` prop，对应组件各内部区域：

```typescript
// v5 做法（不推荐，v6 仍可用但不建议）
// 通过 CSS 选择器覆盖
.ant-table-thead { background: red; }  // ❌

// v6 推荐做法
<Table
  classNames={{ header: 'custom-header' }}
  styles={{ header: { background: 'red' } }}
/>  // ✅
```

### Zero Runtime 模式
```typescript
// v6 新增，v5 不支持
<ConfigProvider theme={{ zeroRuntime: true }}>
```

### Component Token Algorithm
```typescript
// v6 新增：component token 可参与算法推导
components: {
  Button: { algorithm: true }
}
```

### CSS Variables 默认开启
```typescript
// v6 中 CSS 变量格式
// 之前: 无
// 现在: --ant-color-primary, --ant-font-size, ...

// useToken 现在也可导出 CSS 变量
import { theme } from 'antd';
const { token, cssVar } = theme.useToken();
// cssVar.colorPrimary → '--ant-color-primary'
```

---

## 三、静态方法问题（v5/v6 共有，v6 更推荐解决）

### 问题
```typescript
// message/Modal/notification 静态方法不受 ConfigProvider 管控
// 导致主题 Token 不生效
message.success('操作成功'); // ❌ 可能不使用品牌主题
```

### v6 推荐解决方案
```typescript
// 方案一：使用 App 组件包裹（推荐）
import { App } from 'antd';

function MyComponent() {
  const { message, modal, notification } = App.useApp();
  
  const handleClick = () => {
    message.success('操作成功'); // ✅ 受 ConfigProvider 管控
  };
}

// 根节点
<ConfigProvider theme={brandTheme}>
  <App>
    <YourApp />
  </App>
</ConfigProvider>
```

---

## 四、v6.1 ~ v6.3 增量变更（截至 v6.3.4）

### v6.3.x
- `Modal` / `Image` / `Drawer`：修复 `colorBgMask` token 不生效问题
- `Tooltip` / `Popover`：修复 popup 动画起始位置偏左问题
- `Spin`：DOM 结构重构，对齐所有场景的 Semantic Structure
- `Switch`：新增 `indicator` semantic 支持
- `ConfigProvider`：默认未配置 `theme.hashed` 时为 `true`（避免多版本冲突）
- `Select`：单选模式移除冗余 DOM 节点

### v6.2.x
- `[占位]` 持续更新中，重大变更在此补充

### v6.1.x
- `[占位]` 持续更新中，重大变更在此补充

---

## 五、迁移检查清单

从 v5 迁移到 v6 时逐项确认：

- [ ] `List` 组件：已替换为自定义方案
- [ ] `Tabs`：`tabPosition` → `tabPlacement`，`left/right` → `start/end`
- [ ] `Steps`：`labelPlacement` → `titlePlacement`
- [ ] CSS 覆盖：`.ant-*` 全局样式 → 改用 `classNames`/`styles` prop
- [ ] 静态方法：`message.xxx` / `Modal.xxx` → 用 `<App>` 包裹或改 hooks
- [ ] SSR：添加 `StyleProvider` + `hashed` 冲突检查
- [ ] `zeroRuntime`：如启用，确认已引入静态样式（`antd/dist/reset.css` 或用 `@ant-design/static-style-extract` 生成）
- [ ] Modal/Drawer mask：如需 blur 效果，需手动配置
- [ ] 主题 Token：使用 `references/brand.md` 中的品牌配置

---

## 六、官方迁移文档

- 完整迁移指南：`https://ant.design/docs/react/migration-v6-cn`
- Changelog：`https://ant.design/changelog-cn`
- 语义化设计博客：`https://ant.design/docs/blog/semantic-beauty-cn`
