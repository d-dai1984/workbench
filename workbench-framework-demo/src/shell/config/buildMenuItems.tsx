import type { MenuProps } from 'antd'
import type { NavConfig } from './nav.types'

/** Base path for nav icons when icon is a filename (no leading slash). */
export const KLOOK_BENCH_NAV_ICONS_BASE = '/klook-bench/nav-icons'

function resolveIconSrc(icon: string): string {
  if (icon.startsWith('/')) return icon
  return `${KLOOK_BENCH_NAV_ICONS_BASE}/${icon}.svg`
}

function NavIcon({ icon }: { icon: string }) {
  const src = resolveIconSrc(icon)
  return (
    <div className="klook-bench-nav-icon" style={{ width: 32, height: 32, flexShrink: 0 }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
    </div>
  )
}

/**
 * Build AntD Menu items from nav config. Icon from config: filename -> /klook-bench/nav-icons/{name}.svg.
 */
export function buildMenuItems(config: NavConfig): MenuProps['items'] {
  return config.groups.map((group) => ({
    type: 'group',
    label: group.groupLabel,
    children: group.items.map((item) => ({
      key: item.key,
      label: item.label,
      icon: item.icon ? <NavIcon icon={item.icon} /> : undefined,
    })),
  }))
}

/**
 * Get secondary menu items for a given primary key. Returns undefined if no children.
 */
export function getSubmenuItems(config: NavConfig, primaryKey: string): { key: string; label: string }[] | undefined {
  for (const group of config.groups) {
    const found = group.items.find((i) => i.key === primaryKey)
    if (found?.children?.length) return found.children
  }
  return undefined
}
