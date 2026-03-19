import { Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { Line, Bar, Pie } from '@ant-design/charts'
import { ModuleCard } from '../../shell/shared/ModuleCard'
import { takeRateData, merchantAcquisitionData, merchantFundPromoData } from './dashboardData'

const takeRateConfig = {
  data: takeRateData,
  autoFit: true,
  xField: 'day',
  yField: 'value',
  seriesField: 'type',
  smooth: true,
  color: ['#2f8ef3', '#49c368'],
  legend: { position: 'bottom' as const, itemLabelFill: 'rgba(0,0,0,0.45)', itemLabelFontSize: 10, itemMarkerSize: 6, itemSpacing: 12 },
  point: false,
  style: { lineWidth: 1.5 },
  tooltip: false,
  axis: {
    x: { title: false, labelFontSize: 10, labelFill: 'rgba(0,0,0,0.45)', tick: false, line: false, tickCount: 6 },
    y: {
      title: false,
      labelFontSize: 10,
      labelFill: 'rgba(0,0,0,0.45)',
      gridStroke: '#f0f0f0',
      tickCount: 6,
      labelFormatter: (v: string | number) => `${Math.round(Number(v) / 100) / 10}k`,
    },
  },
  padding: [10, 12, 42, 26] as [number, number, number, number],
  scale: { x: { range: [0, 1] as [number, number] }, y: { nice: true } },
}

const merchantAcquisitionConfig = {
  data: merchantAcquisitionData,
  xField: 'value',
  yField: 'channel',
  color: '#4ea1f0',
  legend: { position: 'bottom' as const, itemLabelFill: 'rgba(0,0,0,0.45)', itemLabelFontSize: 10, itemMarkerSize: 6 },
  label: false,
  style: { radiusTopLeft: 0, radiusTopRight: 0, radiusBottomRight: 0, radiusBottomLeft: 0 },
  axis: {
    y: { title: false, labelFontSize: 10, labelFill: 'rgba(0,0,0,0.45)' },
    x: { title: false, labelFontSize: 10, labelFill: 'rgba(0,0,0,0.45)', gridStroke: '#f0f0f0' },
  },
  padding: [8, 8, 28, 24] as [number, number, number, number],
}

const merchantFundPromoConfig = {
  data: merchantFundPromoData,
  angleField: 'value',
  colorField: 'type',
  color: ['#4d65a6', '#5f87e6', '#8b55d9', '#f06f97', '#f1cf47', '#5ac27d', '#35c2ce', '#4ca8ff'],
  legend: { color: { position: 'right' as const, itemLabelFill: 'rgba(0,0,0,0.45)', itemLabelFontSize: 10, itemMarkerSize: 6 } },
  label: false,
  innerRadius: 0,
  radius: 0.72,
  padding: [0, 8, 0, 8] as [number, number, number, number],
}

export function DashboardChartsCard() {
  return (
    <ModuleCard
      title="Dashboard"
      className="klook-bench-dashboard-module-card"
      bodyClassName="klook-bench-dashboard-module-body"
      action={
        <Button size="small" icon={<SettingOutlined />} className="klook-bench-dashboard-management-btn">
          Management
        </Button>
      }
    >
      <div className="klook-bench-dashboard-charts-row">
        <div className="klook-bench-dashboard-chart-card">
          <div className="klook-bench-chart-title klook-bench-chart-title--small-strong">Take rate</div>
          <div className="klook-bench-chart-content klook-bench-chart-content--take-rate">
            <Line {...takeRateConfig} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div className="klook-bench-dashboard-chart-card">
          <div className="klook-bench-chart-title klook-bench-chart-title--small-strong">Merchant Acquisition</div>
          <div className="klook-bench-chart-content">
            <Bar {...merchantAcquisitionConfig} />
          </div>
        </div>
        <div className="klook-bench-dashboard-chart-card">
          <div className="klook-bench-chart-title klook-bench-chart-title--small-strong">Merchant Fund Promo</div>
          <div className="klook-bench-chart-content">
            <Pie {...merchantFundPromoConfig} />
          </div>
        </div>
      </div>
    </ModuleCard>
  )
}
