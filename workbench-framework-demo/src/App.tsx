import { useState } from 'react'
import { ConfigProvider } from 'antd'
import { Button, Input, Modal, message } from 'antd'
import { CloseOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { klook2026Theme, klookBenchTheme, klookBench2026Theme, ThemeSync } from './core/theme'

type ActiveTheme = 'klook' | 'antd' | 'bench'
const THEME_STORAGE_KEY = 'klook-bench.theme'

const themeMap = {
  klook: klook2026Theme,
  antd: klookBenchTheme,
  bench: klookBench2026Theme,
}
import { KlookBenchLayout } from './components/layout'
import { defaultMerchantRoleItems, BUSINESS_LINE_KEYS } from './core/config'
import type { BusinessLineKey } from './core/config'
import { getSubmenuItems } from './core/config/buildMenuItems'
import { ModuleCard } from './components/shared/ModuleCard'
import { DashboardPage, ContentPlaceholder } from './pages/Workbench'
import { GridPage } from './pages/Grid/GridPage'
import { DesignSystemRouter } from './pages/DesignSystem/DesignSystemRouter'
import { PromotionCreativePage, CampaignBuilderPage, CampaignBuilderPageAntD, ActivityCreatePage } from './pages/Campaign'
import { KbrDetailPage, KbrDetailPageSkeleton } from './pages/Finance'
import { businessLineNavConfigs } from './core/config/registry'
import './App.css'

const BIZ_LINE_STORAGE_KEY = 'klook-bench.business-line'

type FeedbackMessage = { id: string; role: 'agent' | 'user'; text: string }

function App() {
  const [messageApi, contextHolder] = message.useMessage()

  // ---- Business line state ----
  const [businessLine, setBusinessLine] = useState<BusinessLineKey>(() => {
    if (typeof window === 'undefined') return 'bdbench'
    const saved = window.localStorage.getItem(BIZ_LINE_STORAGE_KEY)
    if (saved && BUSINESS_LINE_KEYS.includes(saved as BusinessLineKey)) return saved as BusinessLineKey
    return 'bdbench'
  })

  const defaultNavConfig = businessLineNavConfigs[businessLine]
  const [navConfigOverride, setNavConfigOverride] = useState<Record<string, unknown> | null>(null)
  const navConfig = (navConfigOverride as unknown as import('./shell/config/nav.types').NavConfig) ?? defaultNavConfig

  const handleBusinessLineChange = (key: string) => {
    if (BUSINESS_LINE_KEYS.includes(key as BusinessLineKey)) {
      const bizKey = key as BusinessLineKey
      setBusinessLine(bizKey)
      setNavConfigOverride(null) // reset override when switching business line
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(BIZ_LINE_STORAGE_KEY, bizKey)
      }
      messageApi.success(`Switched to ${defaultMerchantRoleItems.find(i => i.key === bizKey)?.title ?? bizKey}`)
    }
  }

  // ---- Theme state ----
  const [activeTheme, setActiveTheme] = useState<ActiveTheme>(() => {
    if (typeof window === 'undefined') return 'klook'
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    return (saved === 'antd' || saved === 'bench') ? saved as ActiveTheme : 'klook'
  })

  const handleThemeChange = (key: string) => {
    if (key === 'klook' || key === 'antd' || key === 'bench') {
      setActiveTheme(key)
      if (typeof window !== 'undefined') window.localStorage.setItem(THEME_STORAGE_KEY, key)
    }
  }

  // ---- UI state ----
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isNavSettingOpen, setIsNavSettingOpen] = useState(false)
  const [navConfigDraft, setNavConfigDraft] = useState('')
  const [showGridPage, setShowGridPage] = useState(false)
  const [gridOverlayVisible, setGridOverlayVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('klook-bench.grid-overlay') === 'true'
  })

  // ---- Feedback ----
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [feedbackDraft, setFeedbackDraft] = useState('')
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([
    { id: 'feedback-welcome', role: 'agent', text: 'Hi! Please share your feedback about this page.' },
  ])

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

  // ---- Nav settings modal ----
  const openNavSettings = () => {
    setNavConfigDraft(JSON.stringify(navConfig, null, 2))
    setIsNavSettingOpen(true)
  }

  const applyNavConfig = () => {
    try {
      const parsed = JSON.parse(navConfigDraft)
      setNavConfigOverride(parsed)
      messageApi.success('Nav config applied successfully')
      setIsNavSettingOpen(false)
    } catch {
      messageApi.error('JSON parse error, please check format')
    }
  }

  const resetNavConfig = () => {
    setNavConfigOverride(null)
    setNavConfigDraft(JSON.stringify(defaultNavConfig, null, 2))
    messageApi.success('Nav config reset to default')
  }

  // ---- Content routing ----
  const renderContent = (selectedKey: string, selectedSubKey: string) => {
    if (selectedKey === 'My Bench' || selectedKey === 'dashboard') {
      return (
        <DashboardPage
          onManagerViewClick={() => {}}
          onCustomPageClick={() => {}}
        />
      )
    }

    // Design System pages
    if (businessLine === 'designsystem') {
      return <DesignSystemRouter sectionKey={selectedKey} activeTheme={activeTheme} />
    }

    // Campaign module pages
    if (businessLine === 'campaign' && selectedKey === 'promotion' && selectedSubKey === 'create-promotion') {
      return <PromotionCreativePage />
    }
    if (businessLine === 'campaign' && selectedKey === 'campaign' && selectedSubKey === 'create-campaign') {
      return <CampaignBuilderPage />
    }
    if (businessLine === 'campaign' && selectedKey === 'campaign' && selectedSubKey === 'create-campaign-antd') {
      return <CampaignBuilderPageAntD />
    }
    if (businessLine === 'campaign' && selectedKey === 'campaign-deal' && selectedSubKey === 'create-deal') {
      return <ActivityCreatePage />
    }

    // Finance module pages
    if (businessLine === 'finance' && selectedKey === 'kbr' && selectedSubKey === 'kbr-detail') {
      return <KbrDetailPage />
    }
    if (businessLine === 'finance' && selectedKey === 'kbr' && selectedSubKey === 'kbr-skeleton') {
      return <KbrDetailPageSkeleton />
    }

    // Generic placeholder for all other routes
    const subItems = getSubmenuItems(navConfig, selectedKey)
    const currentLabel = subItems?.find((i) => i.key === selectedSubKey)?.label ?? selectedKey
    return (
      <div className="klook-bench-dashboard-container">
        <ModuleCard title={`${defaultMerchantRoleItems.find(i => i.key === businessLine)?.title ?? businessLine} / ${selectedKey}`}>
          <ContentPlaceholder title={currentLabel} description={`Business line: ${businessLine} | Module: ${selectedKey} | Page: ${selectedSubKey || 'index'}`} />
        </ModuleCard>
      </div>
    )
  }

  return (
    <ConfigProvider theme={themeMap[activeTheme]}>
      <ThemeSync />
      {contextHolder}
      <KlookBenchLayout
        navConfig={navConfig}
        merchantRoleItems={defaultMerchantRoleItems}
        onSearchClick={() => setIsSearchModalOpen(true)}
        onOpenNavSettings={openNavSettings}
        onGridPageClick={() => setShowGridPage(true)}
        gridOverlayVisible={gridOverlayVisible}
        onGridOverlayChange={(v) => {
          setGridOverlayVisible(v)
          if (typeof window !== 'undefined') window.localStorage.setItem('klook-bench.grid-overlay', String(v))
        }}
        onBusinessLineChange={handleBusinessLineChange}
        activeTheme={activeTheme}
        onThemeChange={handleThemeChange}
      >
        {(selectedKey, selectedSubKey) =>
          showGridPage ? (
            <GridPage onBack={() => setShowGridPage(false)} />
          ) : (
            renderContent(selectedKey, selectedSubKey)
          )
        }
      </KlookBenchLayout>

      <Modal title="Search" open={isSearchModalOpen} onCancel={() => setIsSearchModalOpen(false)} footer={null}>
        <Input.Search placeholder="Search..." size="large" autoFocus />
        <div style={{ marginTop: 24, color: 'var(--klook-bench-color-text-secondary)' }}>Recent searches will appear here.</div>
      </Modal>

      <Modal
        title="Navigation Settings"
        open={isNavSettingOpen}
        onCancel={() => setIsNavSettingOpen(false)}
        footer={[
          <Button key="reset" onClick={resetNavConfig} danger>Reset to Default</Button>,
          <Button key="cancel" onClick={() => setIsNavSettingOpen(false)}>Cancel</Button>,
          <Button key="apply" type="primary" onClick={applyNavConfig}>Apply</Button>,
        ]}
      >
        <Input.TextArea
          rows={14}
          value={navConfigDraft}
          onChange={(e) => setNavConfigDraft(e.target.value)}
          placeholder="Paste NavConfig JSON here"
        />
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
