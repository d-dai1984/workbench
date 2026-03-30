# 08 · 文案规则

适用于按钮命名、字段标签、提示语、空状态说明、错误消息和确认文案。

---

## 总原则

- 用业务语言，不用技术语言
- 用主动语态，不用被动语态
- 说清楚下一步，不说废话
- B 端界面优先精确，不追求生动

---

## 按钮命名

| 场景 | 推荐 | 避免 |
|------|------|------|
| 创建操作 | Create · Add · New | Submit · OK · Confirm |
| 保存操作 | Save · Save Draft | OK · Done |
| 提交操作 | Submit · Publish · Go Live | OK · Confirm |
| 删除操作 | Delete · Remove | Clear · Cancel |
| 确认弹窗主操作 | 用动词（Delete · Disable · Export） | OK · Yes · Confirm |
| 取消弹窗 | Cancel | No · Close |

规则：
- 按钮文案用「动词 + 名词」，如 `Create Activity`、`Export Report`、`Disable Account`
- 主操作按钮不超过 20 个字符
- 危险操作用 `danger` 样式，按钮文案仍用明确动词
- 不用 `OK` / `Confirm` 代替有语义的操作动词

---

## 字段标签

- 标签用名词，不加 "Please enter" / "Please select"
- 必填标注放在标签后（`*`），不放在 placeholder 里
- 标签长度控制在 3 个单词以内，超出考虑拆分字段或换描述方式

示例：

| 推荐 | 避免 |
|------|------|
| Activity Name | Please enter activity name |
| Start Date | Please select start date |
| Owner | Owner Name |

---

## Placeholder

- 写示例值，不重复字段标签
- 格式提示放 placeholder，不放 tooltip
- 不超过 40 个字符

示例：

| 字段 | Placeholder |
|------|-------------|
| Activity Name | e.g. Summer Flash Sale 2024 |
| Phone | 11-digit phone number |
| Amount | 0.00 |

---

## 提示语与说明文字

- 说明文字紧跟字段，不悬浮在远处
- 用一句话说清规则，不用列表
- 字号使用 `12px`（辅助说明），颜色 `colorTextTertiary`（`#8C8C8C`）

示例：

| 推荐 | 避免 |
|------|------|
| Maximum 5 tags allowed | Note: The number of tags has a limit, please do not exceed the system limit |
| Changes will take effect the next day | This field will be synced in the next system update cycle |

---

## 空状态文案

| 场景 | 主文案 | 副文案 / 操作 |
|------|--------|--------------|
| 列表无数据 | No data yet | Create one to get started |
| 搜索无结果 | No results found | Clear filters |
| 无权限 | Access denied | Contact your admin |
| 网络错误 | Failed to load | Retry |

规则：
- 主文案简洁，不超过 5 个单词
- 副文案说明原因或提供下一步，不留死路
- 不用 "There is currently no content available" 这类冗长写法

---

## 确认弹窗文案

结构：**标题（一句话）+ 说明（影响范围）+ 操作按钮**

示例：

```
Title:       Delete Activity
Description: This action cannot be undone. All associated vouchers will also be deactivated.
Buttons:     Cancel  /  Delete
```

规则：
- 标题用「动词 + 对象」，不用 "Are you sure?" / "Confirm?"
- 说明写清楚影响范围，尤其是不可逆操作
- 主操作按钮用操作动词，不用 "OK" / "Confirm"

---

## 错误提示

| 场景 | 写法 |
|------|------|
| 表单字段错误 | Invalid email format. Please check and try again. |
| 提交失败（业务错误） | Activity time conflicts with an existing activity. Please adjust and retry. |
| 系统错误 | Something went wrong. Please try again later. |
| 权限不足 | You don't have permission to perform this action. Contact your admin. |

规则：
- 错误提示必须说明原因，不只写 "Operation failed"
- 有解决路径的，附上具体指引
- 系统级错误不暴露技术细节

---

## 状态文案

- 状态名称用业务语言，不用技术术语
- 状态文案简洁，不超过 3 个单词
- 颜色 + 文字双重标识，不单用颜色区分

示例：

| 状态 | 推荐文案 | 避免 |
|------|---------|------|
| 已上线 | Published · Active | 1 · true |
| 待审核 | Pending Review | Pending · 0 |
| 已关闭 | Closed · Inactive | Disabled · false |
