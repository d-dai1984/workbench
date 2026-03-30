interface ContentPlaceholderProps {
  title: string
  description?: string
}

/** Placeholder block for pages not yet implemented. */
export function ContentPlaceholder({ title, description }: ContentPlaceholderProps) {
  return (
    <div className="klook-bench-content-placeholder">
      <div className="klook-bench-content-placeholder-title">{title}</div>
      <div className="klook-bench-content-placeholder-desc">{description ?? 'This page can be implemented independently.'}</div>
    </div>
  )
}
