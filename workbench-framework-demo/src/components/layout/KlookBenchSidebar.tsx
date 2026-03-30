import { useState } from 'react'
import { Layout, Button, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { KlookBenchNav } from './KlookBenchNav'
import { getSubmenuItems } from '../../core/config/buildMenuItems'
import type { NavConfig } from '../../core/config/nav.types'
import type { MenuProps } from 'antd'

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'klook-bench.sidebar.collapsed'

export interface KlookBenchSidebarProps {
  navConfig: NavConfig
  selectedKey: string
  selectedSubKey: string
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  onMenuClick: MenuProps['onClick']
  onSubMenuClick: (key: string) => void
}

export function KlookBenchSidebar({
  navConfig,
  selectedKey,
  selectedSubKey,
  collapsed,
  onCollapsedChange,
  onMenuClick,
  onSubMenuClick,
}: KlookBenchSidebarProps) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false)

  const handleToggle = () => {
    const next = !collapsed
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(next))
    }
    onCollapsedChange(next)
  }

  const effectiveCollapsed = isBelowBreakpoint || collapsed
  const subItems = getSubmenuItems(navConfig, selectedKey)

  return (
    <div className="klook-bench-sidebar-wrapper">
      <Layout.Sider
        className="klook-bench-sider klook-bench-sider--no-bg"
        width={256}
        collapsedWidth={104}
        collapsed={effectiveCollapsed}
        breakpoint="lg"
        trigger={null}
        onBreakpoint={setIsBelowBreakpoint}
      >
        <div className="klook-bench-sidebar-inner">
          <KlookBenchNav config={navConfig} selectedKey={selectedKey} onMenuClick={onMenuClick} />
          <div className="klook-bench-sidebar-toggle-wrap">
            <Button
              type="text"
              className="klook-bench-sidebar-toggle-btn"
              onClick={handleToggle}
              icon={effectiveCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </div>
        </div>
      </Layout.Sider>
      {subItems && subItems.length > 0 && (
        <aside key={selectedKey} className="klook-bench-submenu-panel">
          <Menu
            mode="inline"
            className="klook-bench-secondary-menu"
            selectedKeys={[selectedSubKey]}
            onClick={({ key }) => onSubMenuClick(key)}
            items={subItems.map(({ label, key: subKey }) => ({
              key: subKey,
              label: (
                <div className="klook-bench-submenu-item-content">
                  <span className="klook-bench-submenu-item-title">{label}</span>
                  <span className="klook-bench-submenu-item-arrow" />
                </div>
              ),
            }))}
          />
        </aside>
      )}
    </div>
  )
}
