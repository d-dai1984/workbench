# 09 · 输出前自检清单

每次输出前必须过一遍此清单。有任何一项不满足，先补齐再输出。

---

## 范围自检

- [ ] 需求已确认在 `01-scope.md` 范围内，或已标记为「scope 外需求」
- [ ] 页面已归属一种标准模式（工作台 / 列表页 / 详情页 / 表单页 / 配置页），列表页已判断形态（标准列表 Table / 卡片列表 Card List）
- [ ] 没有使用 scope 外的组件或页面模式

---

## 结构自检

- [ ] 输出包含：页面类型 · 页面结构 · 业务模块 · 组件选型 · 状态与反馈 · Token 约束 · 风险与边界
- [ ] 页面结构清晰，没有用零散组件堆砌替代页面模式
- [ ] 面包屑：仅三级及以上页面显示

---

## 组件自检

- [ ] Table `rowKey` 使用稳定唯一值（`id`，非 `index`）
- [ ] Table 操作列 `fixed: 'right'`，行内操作全部平铺
- [ ] 筛选区在表格上方，形态已选定（平铺式 / 收起式），未内嵌进 Table header
- [ ] Select remote 模式已设 `filterOption={false}` + `onSearch`
- [ ] Upload 已定义错误和重试路径
- [ ] 静态方法（`message` / `Modal` / `notification`）根节点已用 `<App>` 包裹
- [ ] 未在新页面使用 `List` 组件（v6 已标记 deprecated，仍可用但 v7 将删除）
- [ ] `Tabs` 已使用 `tabPlacement`（非旧版 `tabPosition`）
- [ ] `Steps` 已使用 `titlePlacement`（非旧版 `labelPlacement`）

---

## 状态与反馈自检

- [ ] 列表页已定义完整状态集合（状态名 · 颜色 · 可操作项）
- [ ] 所有操作都有成功/失败反馈
- [ ] 高风险操作（删除/批量/不可逆）已定义确认策略
- [ ] 空状态已定义，并提供下一步操作入口
- [ ] 加载状态已定义（`Spin delay={300}` 或 `Skeleton`）
- [ ] 异常情况已定义恢复路径

---

## Token / 视觉自检

- [ ] 颜色、圆角、阴影全部来自 `brandTheme`，无自造值
- [ ] 圆角未引入 `3px` / `10px` / `14px` 等未定义值
- [ ] 无额外阴影
- [ ] 菜单项圆角为胶囊形（`9999px`），未泛化到其他组件
- [ ] 图标按需导入，未使用 `import * from '@ant-design/icons'`

---

## 文案自检

- [ ] 按钮文案使用动词 + 名词，未用 `OK` / `Confirm` 代替有语义操作
- [ ] 字段标签为名词，未出现 "Please enter XXX" / "Please select XXX"
- [ ] Placeholder 写的是示例值，非标签重复
- [ ] 空状态提供了下一步操作入口
- [ ] 确认弹窗标题用动词 + 对象，说明了影响范围
- [ ] 错误提示说明了原因，有解决路径

---

## 图标自检

- [ ] 图标按需导入（`import { SearchOutlined } from '@ant-design/icons'`），未 `import *`
- [ ] 菜单图标尺寸由 `Menu.iconSize: 14` token 控制，无单独 `fontSize` 设置

