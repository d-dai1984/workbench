import { Layout } from 'antd'
import type { ReactNode } from 'react'

const { Content } = Layout

export interface KlookBenchContentProps {
  children: ReactNode
  className?: string
}

export function KlookBenchContent({ children, className }: KlookBenchContentProps) {
  return <Content className={`klook-bench-content ${className ?? ''}`.trim()}>{children}</Content>
}
