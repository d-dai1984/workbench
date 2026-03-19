import { Layout } from 'antd'
import type { ReactNode } from 'react'

const { Content } = Layout

export interface KlookBenchContentProps {
  children: ReactNode
  className?: string
  gridOverlayVisible?: boolean
}

export function KlookBenchContent({ children, className, gridOverlayVisible }: KlookBenchContentProps) {
  return (
    <Content className={`klook-bench-content ${className ?? ''}`.trim()} style={{ position: 'relative' }}>
      {children}
      {gridOverlayVisible && (
        <div className="klook-bench-grid-overlay" aria-hidden>
          <div className="klook-bench-grid-overlay-cols">
            {Array.from({ length: 24 }, (_, i) => (
              <span key={i} className="klook-bench-grid-overlay-col" />
            ))}
          </div>
        </div>
      )}
    </Content>
  )
}
