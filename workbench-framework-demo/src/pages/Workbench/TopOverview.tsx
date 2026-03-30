import { Row, Col, Progress } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { ModuleCard } from '../../components/shared/ModuleCard'
import { productStateCards, whyToDoItems } from './dashboardData'

export interface TopOverviewProps {
  taskProgressPercent: number
}

export function TopOverview({ taskProgressPercent }: TopOverviewProps) {
  return (
    <ModuleCard title="Top Overview" className="klook-bench-overview-module-card" bodyClassName="klook-bench-overview-module-body">
      <Row gutter={[20, 20]} className="klook-bench-overview-grid">
        <Col xs={24} lg={7}>
          <div className="klook-bench-overview-card klook-bench-overview-card--progress">
            <div className="klook-bench-overview-card-title-row">
              <div className="klook-bench-overview-card-title">Task progress</div>
              <InfoCircleOutlined className="klook-bench-overview-card-info-icon" />
            </div>
            <div className="klook-bench-overview-progress-wrap">
              <div className="klook-bench-overview-progress-gauge">
                <Progress
                  type="circle"
                  percent={Math.round(taskProgressPercent * 100)}
                  size={148}
                  strokeWidth={10}
                  strokeColor="var(--klook-bench-color-accent)"
                  railColor="var(--klook-bench-color-border-light)"
                  format={(percent) => `${percent ?? 0}%`}
                />
              </div>
              <div className="klook-bench-overview-progress-main">22 tasks to do</div>
              <div className="klook-bench-overview-progress-sub">Complete it can increase sales</div>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={10}>
          <div className="klook-bench-overview-card klook-bench-overview-card--product">
            <div className="klook-bench-overview-card-title-row">
              <div className="klook-bench-overview-card-title">Product state</div>
              <InfoCircleOutlined className="klook-bench-overview-card-info-icon" />
            </div>
            <div className="klook-bench-overview-product-grid">
              {productStateCards.map((item) => (
                <div key={item.title} className={`klook-bench-overview-product-item klook-bench-overview-product-item--${item.tone}`}>
                  <div className={`klook-bench-overview-product-bar klook-bench-overview-product-bar--${item.tone}`} />
                  <div className="klook-bench-overview-product-content">
                    <div className="klook-bench-overview-product-item-title">{item.title}</div>
                    <div className="klook-bench-overview-product-item-value">{item.value}</div>
                    <div className="klook-bench-overview-product-item-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={24} lg={7}>
          <div className="klook-bench-overview-card klook-bench-overview-card--why">
            <div className="klook-bench-overview-card-title-row">
              <div className="klook-bench-overview-card-title">Why to do</div>
            </div>
            <div className="klook-bench-overview-why-list">
              {whyToDoItems.map((item, idx) => (
                <div key={item.title} className="klook-bench-overview-why-item">
                  <div className="klook-bench-overview-why-title">{item.title}</div>
                  <div className="klook-bench-overview-why-desc">{item.desc}</div>
                  {idx < whyToDoItems.length - 1 && <div className="klook-bench-overview-why-divider" />}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </ModuleCard>
  )
}
