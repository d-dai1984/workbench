import type { ReactNode } from 'react'

export interface ModuleCardProps {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}

/**
 * Reusable card with header (title + optional action) and body. Use for dashboard modules.
 */
export function ModuleCard({ title, action, children, className, bodyClassName }: ModuleCardProps) {
  return (
    <div className={`klook-bench-module-card ${className ?? ''}`.trim()}>
      <div className="klook-bench-module-card-header">
        <div className="klook-bench-module-card-title">{title}</div>
        {action}
      </div>
      <div className={`klook-bench-module-card-body ${bodyClassName ?? ''}`.trim()}>{children}</div>
    </div>
  )
}
