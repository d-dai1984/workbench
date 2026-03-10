import { useState } from 'react'
import { Layout, Input, Avatar, Typography, Popover, Dropdown } from 'antd'
import {
  BellOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  DownOutlined,
  FileDoneOutlined,
  SearchOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header } = Layout
const { Text } = Typography

const userMenuItems: MenuProps['items'] = [
  { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
  { key: 'super-admin', label: 'Super Admin', icon: <SafetyCertificateOutlined /> },
  { key: 'settings', label: 'System Settings', icon: <SettingOutlined /> },
  { key: 'nav-settings', label: 'Setting Navigation', icon: <SettingOutlined /> },
  { key: 'logout', label: 'Log out', icon: <LogoutOutlined /> },
]

export interface MerchantRoleItem {
  key: string
  title: string
  desc: string
  icon: string
  tone: string
}

export interface KlookBenchHeaderProps {
  onSearchClick?: () => void
  merchantRoleItems?: MerchantRoleItem[]
  userDisplayName?: string
  userAvatarSrc?: string
  onOpenNavSettings?: () => void
}

export function KlookBenchHeader({
  onSearchClick,
  merchantRoleItems = [],
  userDisplayName = 'Alex Kelly',
  userAvatarSrc = '/images/avatar.svg',
  onOpenNavSettings,
}: KlookBenchHeaderProps) {
  const [merchantOpen, setMerchantOpen] = useState(false)

  const merchantContent = (
    <div className="klook-bench-merchant-popover-content">
      <div className="klook-bench-merchant-popover-header">
        <div className="klook-bench-merchant-popover-title">Switch Workbench</div>
        <button
          type="button"
          className="klook-bench-merchant-popover-close"
          onClick={() => setMerchantOpen(false)}
          aria-label="Close"
        >
          <CloseOutlined />
        </button>
      </div>
      <div className="klook-bench-merchant-popover-search">
        <Input placeholder="Search for a role..." prefix={<SearchOutlined />} className="klook-bench-merchant-search-input" />
      </div>
      <div className="klook-bench-merchant-popover-grid">
        {merchantRoleItems.map((item) => (
          <button key={item.key} type="button" className="klook-bench-merchant-role-item">
            <span className={`klook-bench-merchant-role-icon klook-bench-merchant-role-icon--${item.tone}`}>
              <img src={item.icon} alt="" />
            </span>
            <span className="klook-bench-merchant-role-content">
              <span className="klook-bench-merchant-role-title">{item.title}</span>
              <span className="klook-bench-merchant-role-desc">{item.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Header className="klook-bench-header">
      <div className="klook-bench-header-left">
        <div className="klook-bench-logo">
          <img src="/images/logomark.svg" alt="logo" className="klook-bench-logo-mark" />
          <img src="/images/logotext.svg" alt="klook" className="klook-bench-logo-text" />
        </div>
        <Popover
          open={merchantOpen}
          onOpenChange={setMerchantOpen}
          trigger="click"
          placement="bottomLeft"
          arrow={false}
          overlayClassName="klook-bench-merchant-popover"
          content={merchantContent}
        >
          <div className="klook-bench-merchant-btn">
            Merchant <span className="klook-bench-merchant-arrow" />
          </div>
        </Popover>
      </div>
      <div className="klook-bench-header-center">
        <div className="klook-bench-search-bar" onClick={onSearchClick} role="button" tabIndex={0}>
          <span className="klook-bench-search-placeholder">Search</span>
          <div className="klook-bench-search-icon" />
        </div>
      </div>
      <div className="klook-bench-header-right">
        <div className="klook-bench-header-quick-actions">
          <button type="button" className="klook-bench-header-icon-btn" aria-label="Message Center">
            <BellOutlined />
          </button>
          <button type="button" className="klook-bench-header-icon-btn" aria-label="Process Approval">
            <FileDoneOutlined />
          </button>
          <button type="button" className="klook-bench-header-icon-btn" aria-label="Task Management">
            <CheckSquareOutlined />
          </button>
        </div>
        <Avatar src={userAvatarSrc} size={32} />
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: ({ key }) => {
              if (key === 'nav-settings') onOpenNavSettings?.()
            },
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <button type="button" className="klook-bench-user-trigger">
            <Text className="klook-bench-username">{userDisplayName}</Text>
            <DownOutlined className="klook-bench-user-trigger-arrow" />
          </button>
        </Dropdown>
      </div>
    </Header>
  )
}
