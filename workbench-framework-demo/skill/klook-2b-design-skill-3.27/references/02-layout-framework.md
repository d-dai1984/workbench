# 框架与布局规范
> 基于 Figma 实测数据（node-id: 97:3241，包含一级导航、二级导航展开、二级导航收起3个状态）。
> 本文件是 2B 中后台所有页面的骨架规范，优先级高于 03-page-patterns.md 中的布局描述。
> 最后更新：2026-03，基于完整导航状态机 Frame 实测。

---

## 一、整体框架结构

### 三种导航状态

```
状态 A：一级导航（默认）
┌────────────────────────────────────────────────────┐
│                Layout Header (56px)                 │
├──────────────┬─────────────────────────────────────┤
│  一级 Sidebar │         Content Area                │
│    (256px)   │  x=320, width=flex-1                │
└──────────────┴─────────────────────────────────────┘

状态 B：二级导航展开
┌────────────────────────────────────────────────────┐
│                Layout Header (56px)                 │
├────────┬─────────┬──────────────────────────────────┤
│ 一级   │  二级   │         Content Area              │
│(256px) │(248px)  │  x=600, width=flex-1              │
└────────┴─────────┴──────────────────────────────────┘

状态 C：一级导航折叠
┌────────────────────────────────────────────────────┐
│                Layout Header (56px)                 │
├────────┬───────────────────────────────────────────┤
│ 折叠   │         Content Area                       │
│(66px)  │  x=130, width=flex-1                      │
└────────┴───────────────────────────────────────────┘
```

**外层容器**：`p-32px`（四边统一），根节点背景 `#F5F5F5`（`colorBgLayout`）

---

## 二、Layout Header

| 属性 | 值 | 备注 |
|------|-----|------|
| 高度 | **56px** | Figma 实测，3个 Frame 一致 |
| 内边距 | `px-24px py-12px` | |
| 背景色 | `#FFFFFF`（`colorBgContainer`） | |
| 底部边框 | `1px solid #EEEFF1`（`colorSplit`） | |

### 三段式结构

```
[Logo + 产品线 Badge]  ←flex→  [搜索框 480px]  ←flex→  [用户信息]
```

#### Logo 区（左）
- 容器：`px-16px gap-8px`
- Logo 尺寸：`93.167 × 26px`
- 产品线 Badge：`h-24px px-12px border-radius:12px`，边框 + 文字均为 `colorPrimary #1677FF`，字号 `10px`

#### 全局搜索框（中）
- 宽度：**480px**，高度：**36px**
- 样式：胶囊形 `border-radius:999px`
- 背景：`colorFillContent (rgba(0,0,0,0.06))`（注意：比 `colorFillTertiary` 略深）
- placeholder 颜色：`colorTextDescription (rgba(0,0,0,0.45))`

#### 用户信息区（右）
- 头像：`32×32px` 圆形
- 用户名：`14px / fontWeightStrong / colorText`
- `gap-8px`

---

## 三、Sidebar 规范

### 一级导航（展开，默认）

| 属性 | 值 |
|------|-----|
| 宽度 | **256px** |
| 外层容器 py | **16px**（`py-16px`，注意不是 32px） |
| Full 内容区 border-radius | **16px** |
| Full 内容区 py | **0**（由外层 py-16px 控制） |

```
外层 Sidebar 容器（x=32, w=256, py=16px）
└── Full（w=256, border-radius=16px）
    └── Function（gap=64px 两组之间）
        ├── Menu Group: MENU（gap-8px 组内）
        │   ├── Menu_Title（px-16px, 12px/SemiBold, rgba(0,0,0,0.25)）
        │   └── 菜单项 × N（h=46px each）
        └── Menu Group: GENERAL（gap-4px 组内）
            ├── Menu_Title
            └── 菜单项 × N（h=46px each）
```

### 菜单项规范

| 属性 | 选中态 | 默认态 |
|------|--------|--------|
| 高度 | **46px** | **46px** |
| 背景 | `#1677FF`（`colorPrimary`） | `transparent` |
| 文字色 | `#FFFFFF`（`colorTextLightSolid`） | `rgba(0,0,0,0.88)` |
| 圆角 | **999px**（pill） | **8px** |
| 内边距 | `px-16px` | `px-16px` |
| 图标尺寸 | **14px** | **14px** |
| 图标与文字间距 | **10px**（`iconMarginInlineEnd`） | **10px** |

**注：选中态 `999px`（pill），非选中态 `8px`，两者不同，不能统一。**

### 菜单分组规范

| 属性 | 值 |
|------|-----|
| 分组标题字号 | `12px / SemiBold` |
| 分组标题颜色 | `rgba(0,0,0,0.25)`（`colorTextPlaceholder`） |
| 分组标题左 padding | `16px` |
| 两组间距 | **64px**（`gap-64px`） |
| MENU 组菜单项间距 | `8px` |
| GENERAL 组菜单项间距 | `4px` |

### 二级导航（展开）

| 属性 | 值 |
|------|-----|
| 宽度 | **248px** |
| 位置 | 紧靠一级导航右侧，间距 **32px**（gap） |
| 菜单项高度 | **48px**（比一级的 46px 高 2px） |
| 二级项起始 y | `24px`（顶部留白） |
| 总侧边栏宽（一级+gap+二级） | `256 + 32 + 248 = 536px` |

### 折叠态（一级导航收起）

| 属性 | 值 |
|------|-----|
| 宽度 | **66px** |
| 菜单项 | 仅显示图标（`32×32px` 图标区域，图标本身 `14px`） |
| 无文字 | `title-content` 隐藏 |

---

## 四、内容区（Content Area）

### 容器规范

**外层 `Layout Content` 统一 `p-32px`，内容区在 Sidebar 右侧 `flex:1`。**

```css
/* 内容区纵向间距 */
display: flex;
flex-direction: column;
gap: 32px;
padding-top: 32px;     /* 内容区顶部首个元素距离顶部 */
padding-bottom: 32px;
```

### 各状态下的内容区实际宽度

| 状态 | 内容区起始 x | 内容区宽度 |
|------|------------|-----------|
| 一级导航（展开） | `320px`（32+256+32） | `1605-320-32=1253px` |
| 二级导航（展开） | `600px`（32+256+32+248+32） | `1605-600-32=973px` |
| 一级导航（折叠） | `130px`（32+66+32） | `1605-130-32=1443px` |

### Page Header 区

```
Page Header（py-32px 内容区顶部）
├── Breadcrumb（面包屑）
│   ├── 分隔符间距：8px
│   ├── 非末项色：rgba(0,0,0,0.45)
│   └── 末项色：rgba(0,0,0,0.88)
└── 标题行
    ├── H1（38px line-height / Bold / #1F1F1F）
    └── 副文字（14px / #64748B）
```

---

## 五、卡片规范（Content Area 内）

| 属性 | 值 | 说明 |
|------|-----|------|
| 标准卡片圆角 | **16px** | Figma 实测统计卡片、任务列表卡片全部使用 16px |
| 卡片内 padding | **24px** | `p-24px` |
| 无描边 | `colorBorderSecondary: transparent` | 覆盖 antd 默认 `#f0f0f0` |
| 无阴影 | `boxShadowTertiary: none` | |
| 卡片间距 | **16px**（`gap-16px`） | 同行卡片之间 |
| 行间距 | **32px** | 内容块与内容块之间 |

**注：与 brandTheme 中的 `Card.borderRadiusLG: 12` 存在差异。**
Figma 中所有卡片均使用 `16px`，`12px` 对应较小的内嵌卡片或弹窗（Modal）。
建议将 `Card.borderRadiusLG` 更新为 `16`，Modal 单独保留 `12`。

### 特殊卡片：Quick Access 卡片
- 背景：`#E6F4FF`（`blue/1`）
- 圆角：**16px**（`borderRadiusXXL`）
- padding：**24px**
- 内部图标区：`46px × 46px`
- 文字：`14px / SemiBold / rgba(0,0,0,0.85)`

### 特殊卡片：Task 列表项
- 高度：**69px**
- 圆角：**10px**
- 背景：`#FAFAFA`（默认）/ `#FFF2F0`（failed 态）
- 内边距：`px-12px`，垂直居中

---

## 六、内容区栅格系统

> 基于一级导航展开态（内容区 1253px）

所有列之间 gutter 固定 **16px**。

| 布局 | 列宽 | 典型场景 |
|------|------|---------|
| **1 col** | 1253px（全宽） | 任务列表、全宽卡片 |
| **4 col 等宽** | 约 295px | 统计指标卡片 |
| **2 col（65/35）** | ~820 / ~433px | 主内容 + 侧边信息 |
| **2 col 等宽** | ~618 / ~619px | 并列内容 |
| **3 col** | 约 407px | 中等信息组 |

---

## 七、完整布局数值速查

| 区域 | 属性 | 值 |
|------|------|----|
| Header | 高度 | `56px` |
| Header | padding | `12px 24px` |
| Header | 搜索框宽度 | `480px` |
| Header | 搜索框高度 | `36px` |
| 外层容器 | padding（四边） | `32px` |
| 一级 Sidebar | 宽度 | `256px` |
| 一级 Sidebar | py | `16px` |
| 一级 Sidebar | 内容区圆角 | `16px` |
| 折叠 Sidebar | 宽度 | `66px` |
| 二级导航 | 宽度 | `248px` |
| 二级导航 | 与一级间距 | `32px` |
| 菜单项（一级） | 高度 | `46px` |
| 菜单项（二级） | 高度 | `48px` |
| 菜单项 | 选中圆角 | `999px`（pill） |
| 菜单项 | 默认圆角 | `8px` |
| 菜单项 | 图标尺寸 | `14px` |
| 菜单项 | 图标文字间距 | `10px` |
| 菜单分组 | 标题字号 | `12px / SemiBold` |
| 菜单分组 | 组间距 | `64px` |
| 内容区 | 块间距 | `32px` |
| 内容卡片 | 圆角 | `16px` |
| 内容卡片 | padding | `24px` |
| 内容卡片 | 描边 | 无（`transparent`） |
| 内容卡片 | 同行间距 | `16px` |
| Task 列表项 | 高度 | `69px` |
| Task 列表项 | 圆角 | `10px` |
| 根节点 | 背景色 | `#F5F5F5` |

---

## 八、React 布局骨架

```tsx
// AppLayout.tsx
const { Header, Sider, Content } = Layout;

export default function AppLayout({ children, secondaryMenu }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider theme={brandTheme} locale={enUS}>
      <Layout style={{ minHeight: '100vh', background: '#F5F5F5' }}>

        {/* Header - 56px */}
        <Header style={{
          height: 56,
          padding: '12px 24px',
          background: '#FFFFFF',
          borderBottom: '1px solid #EEEFF1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          lineHeight: 'normal',
        }}>
          <LogoArea />
          <GlobalSearch style={{ width: 480, height: 36 }} />
          <UserInfo />
        </Header>

        {/* 外层容器 - p-32px */}
        <Layout style={{ background: '#F5F5F5', padding: 32, gap: 32 }}>

          {/* 一级 Sidebar - 256px */}
          <Sider
            width={256}
            collapsedWidth={66}
            collapsed={collapsed}
            style={{ background: 'transparent' }}
          >
            <div style={{
              borderRadius: 16,
              height: '100%',
              paddingTop: 16,
              paddingBottom: 16,
            }}>
              <Menu mode="inline" style={{ border: 'none', background: 'transparent' }} />
            </div>
          </Sider>

          {/* 二级导航（条件渲染）- 248px */}
          {secondaryMenu && (
            <div style={{ width: 248, flexShrink: 0 }}>
              <Menu mode="inline" style={{ border: 'none', background: 'transparent' }} />
            </div>
          )}

          {/* 内容区 */}
          <Content style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            paddingTop: 32,
            paddingBottom: 32,
            minWidth: 0,
          }}>
            {children}
          </Content>

        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
```

---

## 九、与 brandTheme 的协调建议

| 项目 | 当前 brandTheme | Figma 实测 | 建议 |
|------|----------------|-----------|------|
| `Card.borderRadiusLG` | `12` | `16px` | 更新为 `16` |
| `Modal.borderRadiusLG` | `12` | 无实测 | 保持 `12` |
| `Card.colorBorderSecondary` | `transparent` | 无描边 | 保持 `transparent` ✅ |
| 搜索框背景 | `colorFillTertiary` | `colorFillContent (rgba(0,0,0,0.06))` | 更新 token 描述 |
