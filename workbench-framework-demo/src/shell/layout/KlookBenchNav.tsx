import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import type { NavConfig } from '../config/nav.types'
import { buildMenuItems } from '../config/buildMenuItems'

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
