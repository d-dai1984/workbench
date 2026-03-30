/**
 * SectionLayout — L1/L2/L3 容器原语组件
 *
 * 遵循 section-to-code 规范：
 *   L1 Section:  标题在容器外部，Heading/3，sticky，内容区白底 + colorSplit 边框 + 16px 圆角 + 32px 内边距
 *   L2 Card:     标题在容器内部，Heading/5，带边框 + 折叠 + meta 信息
 *   L3 FieldGroup: Bold 文字标题，无容器，纯间距分隔
 *   FunctionalContainer: 轻量边框容器，用于可交互子列表
 *   IndentChild:  缩进 + 左竖线，用于纯展示子内容
 *   PageLayout:   包裹所有 L1 Section，gap: 32
 */
import { useState, useCallback } from 'react'
import { Typography, theme } from 'antd'
import { DownOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons'
import type { FC, ReactNode } from 'react'

const { Title, Text } = Typography
const { useToken } = theme

// ─── CollapseToggle ──────────────────────────────────────────────────────────

const CollapseToggle: FC<{ collapsed: boolean; onChange: (v: boolean) => void }> = ({
  collapsed,
  onChange,
}) => (
  <span
    onClick={() => onChange(!collapsed)}
    style={{ cursor: 'pointer', fontSize: 12, color: 'rgba(0,0,0,0.45)', userSelect: 'none' }}
  >
    {collapsed ? <RightOutlined /> : <DownOutlined />}
  </span>
)

// ─── L1 Section ──────────────────────────────────────────────────────────────

export interface SectionProps {
  title: string
  collapsible?: boolean
  defaultCollapsed?: boolean
  extra?: ReactNode
  children: ReactNode
}

export const Section: FC<SectionProps> = ({
  title,
  collapsible = true,
  defaultCollapsed = false,
  extra,
  children,
}) => {
  const { token } = useToken()
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div>
      {/* L1: 标题在容器外部 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: token.colorBgLayout,
          padding: '8px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {collapsible && <CollapseToggle collapsed={collapsed} onChange={setCollapsed} />}
          <Title level={3} style={{ margin: 0 }}>{title}</Title>
        </div>
        {extra}
      </div>

      {/* L1: 内容容器 */}
      {!collapsed && (
        <div
          style={{
            backgroundColor: token.colorBgBase,
            border: `1px solid ${token.colorSplit}`,
            borderRadius: 16,
            padding: 32,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// ─── L2 SectionCard ──────────────────────────────────────────────────────────

export interface SectionCardProps {
  title: string
  meta?: ReactNode
  collapsible?: boolean
  defaultCollapsed?: boolean
  onDelete?: () => void
  dragHandle?: ReactNode
  children: ReactNode
}

export const SectionCard: FC<SectionCardProps> = ({
  title,
  meta,
  collapsible = true,
  defaultCollapsed = false,
  onDelete,
  dragHandle,
  children,
}) => {
  const { token } = useToken()
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  return (
    <div
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      {/* L2: 标题在容器内部 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          borderBottom: collapsed ? 'none' : `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        {dragHandle}
        {collapsible && <CollapseToggle collapsed={collapsed} onChange={setCollapsed} />}
        <Title level={5} style={{ margin: 0, flex: 1 }}>{title}</Title>
        {meta}
        {onDelete && (
          <DeleteOutlined
            onClick={onDelete}
            style={{ color: token.colorTextTertiary, cursor: 'pointer' }}
          />
        )}
      </div>

      {!collapsed && (
        <div style={{ padding: 16 }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ─── L3 FieldGroup ───────────────────────────────────────────────────────────

export interface FieldGroupProps {
  title: string
  children: ReactNode
}

export const FieldGroup: FC<FieldGroupProps> = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    {/* L3: Bold 文字标题，无容器 */}
    <Text strong style={{ display: 'block', marginBottom: 12 }}>
      {title}
    </Text>
    {children}
  </div>
)

// ─── Functional Container ────────────────────────────────────────────────────

export interface FunctionalContainerProps {
  title?: string
  children: ReactNode
}

export const FunctionalContainer: FC<FunctionalContainerProps> = ({ title, children }) => {
  const { token } = useToken()
  return (
    <div style={{ marginTop: 12 }}>
      {title && (
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      )}
      <div
        style={{
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadius,
          padding: 12,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── Indent + Vertical Line ──────────────────────────────────────────────────

export interface IndentChildProps {
  title?: string
  children: ReactNode
}

export const IndentChild: FC<IndentChildProps> = ({ title, children }) => {
  const { token } = useToken()
  return (
    <div
      style={{
        marginTop: 12,
        marginLeft: 20,
        paddingLeft: 16,
        borderLeft: `2px solid ${token.colorBorderSecondary}`,
      }}
    >
      {title && (
        <div style={{ fontSize: 13, fontWeight: 400, marginBottom: 8 }}>{title}</div>
      )}
      {children}
    </div>
  )
}

// ─── PageLayout ──────────────────────────────────────────────────────────────

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
    {children}
  </div>
)
