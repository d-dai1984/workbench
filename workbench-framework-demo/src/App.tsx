import { useState } from 'react'
import { ConfigProvider } from 'antd'
import { Button, Input, Modal, message } from 'antd'
import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { klookBenchTheme } from './theme'
import { KlookBenchLayout } from './components/layout'
import { defaultNavConfig, defaultMerchantRoleItems } from './config'
import type { NavConfig } from './config'
import { getSubmenuItems } from './config/buildMenuItems'
import { ModuleCard } from './components/ModuleCard'
import { DashboardPage, ContentPlaceholder } from './components/dashboard'
import './App.css'

const LAYOUT_MODE_STORAGE_KEY = 'klook-bench.dashboard.layout.mode'
const NAV_CONFIG_STORAGE_KEY = 'klook-bench.nav-config'
type LayoutMode = 'single' | 'split-16-8'

type FeedbackMessage = { id: string; role: 'agent' | 'user'; text: string }

function App() {
  const [messageApi, contextHolder] = message.useMessage()
  const [navConfig, setNavConfig] = useState<NavConfig>(() => {
    if (typeof window === 'undefined') return defaultNavConfig
    try {
      const raw = window.localStorage.getItem(NAV_CONFIG_STORAGE_KEY)
      if (!raw) return defaultNavConfig
      const parsed = JSON.parse(raw) as NavConfig
      if (!parsed || !Array.isArray(parsed.groups)) return defaultNavConfig
      return parsed
    } catch {
      return defaultNavConfig
    }
  })
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isManagerViewModalOpen, setIsManagerViewModalOpen] = useState(false)
  const [isCustomPageModalOpen, setIsCustomPageModalOpen] = useState(false)
  const [layoutModeDraft, setLayoutModeDraft] = useState<LayoutMode>('single')
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [feedbackDraft, setFeedbackDraft] = useState('')
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([
    { id: 'feedback-welcome', role: 'agent', text: 'Hi! Please share your feedback about this page.' },
  ])
  const [isNavSettingOpen, setIsNavSettingOpen] = useState(false)
  const [navConfigDraft, setNavConfigDraft] = useState('')

  const openCustomPageModal = () => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(LAYOUT_MODE_STORAGE_KEY) : null
    setLayoutModeDraft(saved === 'split-16-8' ? 'split-16-8' : 'single')
    setIsCustomPageModalOpen(true)
  }

  const saveLayoutMode = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LAYOUT_MODE_STORAGE_KEY, layoutModeDraft)
    }
    setIsCustomPageModalOpen(false)
    messageApi.success('布局样式已保存，请刷新页面查看效果')
  }

  const handleSendFeedback = () => {
    const text = feedbackDraft.trim()
    if (!text) return
    setFeedbackMessages((prev) => [
      ...prev,
      { id: `feedback-user-${Date.now()}`, role: 'user', text },
      { id: `feedback-agent-${Date.now() + 1}`, role: 'agent', text: 'Thanks! Your feedback has been captured for review.' },
    ])
    setFeedbackDraft('')
  }

  const openNavSettings = () => {
    setNavConfigDraft(JSON.stringify(navConfig, null, 2))
    setIsNavSettingOpen(true)
  }

  const applyNavConfig = () => {
    try {
      const raw = JSON.parse(navConfigDraft) as any
      let parsed: NavConfig

      if (raw && Array.isArray(raw.groups)) {
        // 已经是 NavConfig 结构
        parsed = raw as NavConfig
      } else {
        // 兼容 navigation_schema/menu_structure 或直接数组/items 结构，自动转换为 NavConfig
        const menu =
          (raw && Array.isArray(raw.menu_structure) && raw.menu_structure) ||
          (Array.isArray(raw) && raw) ||
          (raw && Array.isArray(raw.items) && raw.items)

        if (!Array.isArray(menu)) {
          messageApi.error('JSON 结构不合法：需要 groups 或 menu_structure/items 数组')
          return
        }

        parsed = {
          groups: [
            {
              groupLabel: 'MENU',
              items: menu.map((item: any) => ({
                key: item.key,
                label: item.label,
                icon: typeof item.icon === 'string' ? item.icon : undefined,
                children: Array.isArray(item.children)
                  ? item.children.map((child: any) => ({
                      key: child.key,
                      label: child.label,
                    }))
                  : undefined,
              })),
            },
          ],
        }
      }

      setNavConfig(parsed)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(NAV_CONFIG_STORAGE_KEY, JSON.stringify(parsed, null, 2))
      }
      messageApi.success('导航配置已更新')
      setIsNavSettingOpen(false)
    } catch {
      messageApi.error('JSON 解析失败，请检查格式')
    }
  }

  const resetNavConfig = () => {
    setNavConfig(defaultNavConfig)
    setNavConfigDraft(JSON.stringify(defaultNavConfig, null, 2))
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(NAV_CONFIG_STORAGE_KEY)
    }
    messageApi.success('导航已重置为默认配置')
  }

  const renderContent = (selectedKey: string, selectedSubKey: string) => {
    if (selectedKey === 'My Bench' || selectedKey === 'dashboard') {
      return (
        <DashboardPage
          onManagerViewClick={() => setIsManagerViewModalOpen(true)}
          onCustomPageClick={openCustomPageModal}
        />
      )
    }
    if (selectedKey === 'account-acquisition') {
      const subItems = getSubmenuItems(navConfig, selectedKey)
      const currentLabel = subItems?.find((i) => i.key === selectedSubKey)?.label ?? 'Prospective Customers'
      return (
        <div className="klook-bench-dashboard-container">
          <ModuleCard title="Account Acquisition" action={<Button type="link">See all</Button>} className="klook-bench-account-acquisition-module-card">
            <ContentPlaceholder title={currentLabel} description="This is a dedicated right-side page for Account Acquisition." />
          </ModuleCard>
        </div>
      )
    }
    return (
      <div className="klook-bench-dashboard-container">
        <ModuleCard title="Page Preview">
          <ContentPlaceholder title={`Current: ${selectedKey}`} description="This page is separated from Dashboard and can be implemented independently." />
        </ModuleCard>
      </div>
    )
  }

  return (
    <ConfigProvider theme={klookBenchTheme}>
      {contextHolder}
      <KlookBenchLayout
        navConfig={navConfig}
        merchantRoleItems={defaultMerchantRoleItems}
        onSearchClick={() => setIsSearchModalOpen(true)}
        onOpenNavSettings={openNavSettings}
      >
        {renderContent}
      </KlookBenchLayout>

      <Modal title="Search" open={isSearchModalOpen} onCancel={() => setIsSearchModalOpen(false)} footer={null}>
        <Input.Search placeholder="Search..." size="large" autoFocus />
        <div style={{ marginTop: 24, color: 'var(--klook-bench-color-text-secondary)' }}>Recent searches will appear here.</div>
      </Modal>

      <Modal
        title="Manager View"
        open={isManagerViewModalOpen}
        onCancel={() => setIsManagerViewModalOpen(false)}
        onOk={() => setIsManagerViewModalOpen(false)}
        okText="Apply"
        cancelText="Cancel"
      >
        <p>Manager View modal scaffold is ready.</p>
        <p>Role switching options will be implemented here.</p>
      </Modal>

      <Modal
        title="Custom Page"
        open={isCustomPageModalOpen}
        onCancel={() => setIsCustomPageModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsCustomPageModalOpen(false)}>Cancel</Button>,
          <Button key="save" type="primary" onClick={saveLayoutMode}>Save</Button>,
        ]}
      >
        <div className="klook-bench-layout-style-picker">
          <div className="klook-bench-layout-style-title">布局样式</div>
          <div className="klook-bench-layout-style-thumbnail-grid">
            <button
              type="button"
              className={`klook-bench-layout-style-thumbnail ${layoutModeDraft === 'single' ? 'is-active' : ''}`}
              onClick={() => setLayoutModeDraft('single')}
            >
              <span className="klook-bench-layout-style-thumbnail-preview klook-bench-layout-style-thumbnail-preview--single">
                <span />
              </span>
            </button>
            <button
              type="button"
              className={`klook-bench-layout-style-thumbnail ${layoutModeDraft === 'split-16-8' ? 'is-active' : ''}`}
              onClick={() => setLayoutModeDraft('split-16-8')}
            >
              <span className="klook-bench-layout-style-thumbnail-preview klook-bench-layout-style-thumbnail-preview--split">
                <span className="layout-col-left" />
                <span className="layout-col-right" />
              </span>
            </button>
          </div>
          <div className="klook-bench-layout-style-hint">Save 后刷新页面，即可查看所选布局。</div>
        </div>
      </Modal>

      <Modal
        title="Navigation Settings"
        open={isNavSettingOpen}
        onCancel={() => setIsNavSettingOpen(false)}
        onOk={applyNavConfig}
        okText="Apply"
        cancelText="Cancel"
      >
        <Input.TextArea
          rows={14}
          value={navConfigDraft}
          onChange={(e) => setNavConfigDraft(e.target.value)}
          placeholder="Paste NavConfig JSON here"
        />
        <div style={{ marginTop: 8, textAlign: 'right' }}>
          <Button size="small" onClick={resetNavConfig}>
            Reset to default
          </Button>
        </div>
      </Modal>

      <button type="button" className="klook-bench-feedback-fab" onClick={() => setIsFeedbackOpen((prev) => !prev)} aria-label="Open feedback">
        <MessageOutlined />
      </button>

      {isFeedbackOpen && (
        <div className="klook-bench-feedback-panel" role="dialog" aria-label="Feedback panel">
          <div className="klook-bench-feedback-panel-header">
            <div className="klook-bench-feedback-panel-title">Feedback</div>
            <button type="button" className="klook-bench-feedback-panel-close" onClick={() => setIsFeedbackOpen(false)} aria-label="Close feedback">
              <CloseOutlined />
            </button>
          </div>
          <div className="klook-bench-feedback-panel-body">
            {feedbackMessages.map((msg) => (
              <div key={msg.id} className={`klook-bench-feedback-bubble ${msg.role === 'user' ? 'klook-bench-feedback-bubble--user' : 'klook-bench-feedback-bubble--agent'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="klook-bench-feedback-panel-footer">
            <Input value={feedbackDraft} onChange={(e) => setFeedbackDraft(e.target.value)} onPressEnter={handleSendFeedback} placeholder="Type your feedback..." className="klook-bench-feedback-input" />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSendFeedback} />
          </div>
        </div>
      )}
    </ConfigProvider>
  )
}

export default App
