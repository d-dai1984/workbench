import { Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { ModuleCard } from '../../components/shared/ModuleCard'
import { quickAccessItems } from './dashboardData'

export function QuickAccessCard() {
  return (
    <ModuleCard
      title="Quick Access"
      className="klook-bench-quick-access-module-card"
      bodyClassName="klook-bench-quick-access-module-body"
      action={
        <Button size="small" icon={<SettingOutlined />} className="klook-bench-dashboard-management-btn">
          Management
        </Button>
      }
    >
      <div className="klook-bench-quick-access-grid">
        {quickAccessItems.map((item) => (
          <div key={item.key} className="klook-bench-quick-access-entry">
            <div className="klook-bench-quick-access-entry-icon">
              <img src={item.icon} alt="" />
            </div>
            <div className="klook-bench-quick-access-entry-label">{item.label}</div>
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}
