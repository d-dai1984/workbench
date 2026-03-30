import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { NavConfig } from '../../core/config/nav.types'
import { buildMenuItems } from '../../core/config/buildMenuItems'

export interface KlookBenchNavProps {
  config: NavConfig
  selectedKey: string
  onMenuClick: MenuProps['onClick']
}

/** Primary sidebar menu only. Secondary panel is rendered by KlookBenchSidebar. */
export function KlookBenchNav({ config, selectedKey, onMenuClick }: KlookBenchNavProps) {
  const menuItems = buildMenuItems(config)
  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      className="klook-bench-sidebar-menu"
      onClick={onMenuClick}
    />
  )
}
