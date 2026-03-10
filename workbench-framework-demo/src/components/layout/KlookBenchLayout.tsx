import { useState } from 'react'
import { Layout } from 'antd'
import { getSubmenuItems } from '../../config/buildMenuItems'
import { KlookBenchHeader } from './KlookBenchHeader'
import { KlookBenchSidebar } from './KlookBenchSidebar'
import { KlookBenchContent } from './KlookBenchContent'
import type { NavConfig } from '../../config/nav.types'
import type { MenuProps } from 'antd'
import type { MerchantRoleItem } from './KlookBenchHeader'

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'klook-bench.sidebar.collapsed'

export interface KlookBenchLayoutProps {
  navConfig: NavConfig
  defaultSelectedKey?: string
  onMenuClick?: MenuProps['onClick']
  merchantRoleItems?: MerchantRoleItem[]
  onSearchClick?: () => void
  onOpenNavSettings?: () => void
  /** Content renderer: (selectedKey, selectedSubKey) => ReactNode */
  children: (selectedKey: string, selectedSubKey: string) => React.ReactNode
}

export function KlookBenchLayout({
  navConfig,
  defaultSelectedKey,
  onMenuClick: onMenuClickProp,
  merchantRoleItems,
  onSearchClick,
  onOpenNavSettings,
  children,
}: KlookBenchLayoutProps) {
  const firstNavKey = navConfig.groups[0]?.items[0]?.key ?? 'My Bench'
  const initialSubKey = (() => {
    const subs = getSubmenuItems(navConfig, firstNavKey)
    return subs?.[0]?.key ?? ''
  })()

  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey ?? firstNavKey)
  const [selectedSubKey, setSelectedSubKey] = useState(initialSubKey)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true'
  })

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKey(key)
    const subs = getSubmenuItems(navConfig, key)
    setSelectedSubKey(subs?.[0]?.key ?? '')

    const isDashboard = key === 'My Bench' || key === 'dashboard'
    const hasSubmenu = !!subs && subs.length > 0
    const shouldCollapse = hasSubmenu ? !isDashboard : false
    setCollapsed(shouldCollapse)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(shouldCollapse))
    }
    onMenuClickProp?.({ key, keyPath: [], domEvent: {} as React.MouseEvent<HTMLElement>, item: null } as unknown as Parameters<NonNullable<MenuProps['onClick']>>[0])
  }

  const handleCollapsedChange = (next: boolean) => {
    setCollapsed(next)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <KlookBenchHeader
        merchantRoleItems={merchantRoleItems}
        onSearchClick={onSearchClick}
        onOpenNavSettings={onOpenNavSettings}
      />
      <Layout>
        <KlookBenchSidebar
          navConfig={navConfig}
          selectedKey={selectedKey}
          selectedSubKey={selectedSubKey}
          collapsed={collapsed}
          onCollapsedChange={handleCollapsedChange}
          onMenuClick={onMenuClick}
          onSubMenuClick={setSelectedSubKey}
        />
        <KlookBenchContent>{children(selectedKey, selectedSubKey)}</KlookBenchContent>
      </Layout>
    </Layout>
  )
}
