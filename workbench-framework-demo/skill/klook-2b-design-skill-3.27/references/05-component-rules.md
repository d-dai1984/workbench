# 05 · 核心组件规则

只列出本 Skill 范围内的组件约束。未列出的组件使用前先确认是否在 scope 内。

---

## 导航类

### Menu（侧边导航）
- 侧边栏展开 `256px`，折叠 `66px`
- 二级菜单以浮出层呈现（`248px`），不内嵌展开
- 面包屑在三级及以上页面显示

### Breadcrumb
- 超 5 级折叠，始终保留首层和末层
- `itemColor: rgba(0,0,0,0.45)`，末项 `rgba(0,0,0,0.88)`（antd 默认值，见 `06-tokens.md`）

### Tabs
- 同一页面内平级内容切换用 Tabs
- 不用 Tabs 模拟路由跳转
- v6 breaking：`tabPosition` → `tabPlacement`

### Steps
- 线性流程用 Steps，非线性不用
- v6 breaking：`labelPlacement` → `titlePlacement`

---

## 数据展示类

### Table
- `rowKey` 必须稳定唯一（用 `id`，不用 `index`）
- 操作列 `fixed: 'right'`，行内操作全部平铺
- 筛选区在表格上方，有平铺式和收起式两种形态（见 `04-business-modules.md`）
- 排序/筛选/分页统一走 `onChange`
- `> 5000` 行启用 `virtual`

### Card
- 所有内容卡片 `borderRadiusLG: 16`（Figma 实测，见 `06-tokens.md`）
- Modal 保持 `borderRadiusLG: 12`，与卡片区分
- 不加阴影，`colorBorderSecondary: transparent`（无描边）

### Descriptions
- 用于只读信息的结构化展示，不限于详情页
- 配合 Card 使用，不裸露放在页面上

### Tag
- 状态色优先用 antd preset
- 圆角 `4px`（`Tag.borderRadiusSM`）
- 颜色 + 文字双重标识状态

---

## 数据录入类

### Form
- 字段 ≤ 6：单列；7–12：两列或分组；> 12：Card 分组
- 校验走 Form inline，不用全局 message
- `placeholder` 写示例值，不写「请输入 XXX」
- 必填标记统一在 label 后

### Input / Select / DatePicker
- 圆角继承全局 `6px`，不覆盖
- Select remote 模式：`filterOption={false}` + `onSearch`
- Upload 使用场景：商品图片、文件附件、头像；明确 controlled/uncontrolled，有失败重试路径

---

## 反馈类

### Modal
- `borderRadiusLG: 12`
- 简单操作（字段 ≤ 6）用 Modal，复杂用 Drawer
- 确认按钮用明确动词（「保存」「提交」），不用默认「确定」
- 破坏性操作：`okButtonProps={{ danger: true }}`

### Drawer
- 复杂编辑（字段 > 6）或详情查看
- `placement="right"`，`inline=false`（默认）
- 底部操作区固定（`footer` prop）
- 无圆角，贴边

### Message / Notification / Alert
- 轻量操作结果 → `message`（顶部，自动消失）
- 需持续关注 → `notification`（右上角）
- 页面内状态 / 表单错误 → `Alert` inline
- 静态方法需用 `<App>` 包裹根节点

### Modal.confirm
- 确认策略（风险等级 / 组件选型 / 规格）见 `07-states-feedback-permission.md`

### Spin / Skeleton
- 操作等待用局部 `Spin`，`delay={300}` 避免闪烁
- 首屏加载用 `Skeleton`

---

## v6 组件状态说明

- `List`：v6 已标记 deprecated，文档已移除，仍可使用但将在 v7 删除。新页面避免使用，改用 `Flex` / `Grid` + `Card` 自定义实现；存量代码可暂时保留，迁移时替换。
- `Dropdown.Button`：v6 已废弃，改用 `Space.Compact` + `Dropdown` + `Button` 组合。
