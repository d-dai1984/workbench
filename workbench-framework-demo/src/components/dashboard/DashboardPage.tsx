import { useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import { UserSwitchOutlined, SettingTwoTone } from '@ant-design/icons'
import { TopOverview } from './TopOverview'
import { TodoListCard } from './TodoListCard'
import { DashboardChartsCard } from './DashboardChartsCard'
import { QuickAccessCard } from './QuickAccessCard'

const LAYOUT_MODE_STORAGE_KEY = 'klook-bench.dashboard.layout.mode'
type LayoutMode = 'single' | 'split-16-8'

export interface DashboardPageProps {
  onManagerViewClick?: () => void
  onCustomPageClick?: () => void
}

export function DashboardPage({ onManagerViewClick, onCustomPageClick }: DashboardPageProps) {
  const [taskProgressPercent, setTaskProgressPercent] = useState(0)
  const [layoutMode] = useState<LayoutMode>(() => {
    if (typeof window === 'undefined') return 'single'
    const saved = window.localStorage.getItem(LAYOUT_MODE_STORAGE_KEY)
    return saved === 'split-16-8' ? 'split-16-8' : 'single'
  })

  useEffect(() => {
    const target = 0.3
    const duration = 900
    const start = performance.now()
    let rafId = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setTaskProgressPercent(target * eased)
      if (t < 1) rafId = window.requestAnimationFrame(tick)
    }
    rafId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className="klook-bench-dashboard-container">
      <div className="klook-bench-dashboard-welcome">
        <Row className="klook-bench-dashboard-welcome-grid" align="middle" justify="space-between" gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <div className="klook-bench-dashboard-welcome-left">
              <div className="klook-bench-dashboard-title">Hi, Alex Kelly</div>
              <div className="klook-bench-dashboard-subtitle">Today's focus & key objectives</div>
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className="klook-bench-dashboard-welcome-right">
              <Button
                type="primary"
                icon={<UserSwitchOutlined />}
                className="klook-bench-dashboard-action-btn klook-bench-dashboard-action-btn-primary"
                onClick={onManagerViewClick}
              >
                Manager View
              </Button>
              <Button
                type="text"
                icon={<SettingTwoTone twoToneColor="var(--klook-bench-color-primary)" />}
                className="klook-bench-dashboard-action-btn klook-bench-dashboard-action-btn-text"
                onClick={onCustomPageClick}
              >
                Custom Page
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="klook-bench-dashboard-section">
        <TopOverview taskProgressPercent={taskProgressPercent} />
      </div>

      <div className="klook-bench-dashboard-section">
        {layoutMode === 'split-16-8' ? (
          <Row gutter={[24, 24]} className="klook-bench-dashboard-layout-row">
            <Col xs={24} lg={16}>
              <TodoListCard />
            </Col>
            <Col xs={24} lg={8}>
              <div className="klook-bench-dashboard-side-card">
                <div className="klook-bench-dashboard-side-card-title">Right Container</div>
                <div className="klook-bench-dashboard-side-card-desc">This placeholder follows the 16+8 grid layout.</div>
              </div>
            </Col>
          </Row>
        ) : (
          <TodoListCard />
        )}
      </div>

      <div className="klook-bench-dashboard-section">
        <DashboardChartsCard />
      </div>

      <div className="klook-bench-dashboard-section">
        <QuickAccessCard />
      </div>
    </div>
  )
}
