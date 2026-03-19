import { Tag } from 'antd'
import { CodePreview } from '../CodePreview'
import './HeatmapCalendarDemo.css'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 24 }, (_, i) => i)

// Simulated conversion data: higher on evenings & weekends
function getData(): number[][] {
  const seed = [
    [0,0,1,0,0,1,0,0,1,2,3,4,5,5,4,4,5,5,6,5,5,4,3,2],
    [0,1,0,0,1,0,0,1,1,2,3,5,6,5,4,3,4,4,5,4,3,3,2,1],
    [0,0,0,1,0,1,0,0,2,2,3,4,5,4,3,3,4,5,4,3,3,2,1,0],
    [0,0,1,0,0,0,1,0,1,2,3,3,4,4,3,3,3,4,4,3,3,2,1,1],
    [0,0,0,1,0,1,0,1,2,3,4,5,6,6,5,5,5,6,7,8,7,6,4,3],
    [1,0,1,0,1,0,1,1,2,3,4,5,5,6,6,7,7,8,8,7,6,5,4,3],
    [0,1,0,1,0,0,1,0,1,2,3,3,4,4,3,3,3,4,4,3,2,2,1,1],
  ]
  return seed
}

const levels = ['#f0f5ff', '#d6e4ff', '#85a5ff', '#2f54eb', '#10239e']

function getLevel(v: number): string {
  if (v <= 0) return '#f8f9fa'
  if (v <= 2) return levels[0]
  if (v <= 4) return levels[1]
  if (v <= 6) return levels[2]
  if (v <= 7) return levels[3]
  return levels[4]
}

const codeString = `// Heatmap: CSS Grid + colored divs
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 24 }, (_, i) => i)
const levels = ['#f0f5ff', '#d6e4ff', '#85a5ff', '#2f54eb', '#10239e']

function getLevel(value: number): string {
  if (value <= 0) return '#f8f9fa'
  if (value <= 2) return levels[0]
  if (value <= 4) return levels[1]
  if (value <= 6) return levels[2]
  if (value <= 7) return levels[3]
  return levels[4]
}

<div className="heatmap-card">
  <div className="heatmap-header">
    <span>🕐</span>
    <h3>Best Time to Send Heatmap</h3>
    <Tag>Time Insights</Tag>
  </div>
  <p>Conversion rate by day of week & hour. Darker = higher conversion.</p>

  {/* Hour labels */}
  <div className="heatmap-hours">
    {[0,3,6,9,12,15,18,21].map(h => <span key={h}>{String(h).padStart(2,'0')}</span>)}
  </div>

  {/* Grid */}
  {days.map((day, di) => (
    <div className="heatmap-row" key={day}>
      <span className="heatmap-day">{day}</span>
      {hours.map(h => (
        <div key={h} className="heatmap-cell"
          style={{ background: getLevel(data[di][h]) }}
          title={\`\${day} \${h}:00 — conv: \${data[di][h]}%\`} />
      ))}
    </div>
  ))}

  {/* Legend */}
  <div className="heatmap-legend">
    <span>Low</span>
    {levels.map(c => <div key={c} style={{ background: c }} />)}
    <span>High</span>
  </div>
</div>`

export function HeatmapCalendarDemo() {
  const data = getData()

  return (
    <CodePreview
      title="HeatmapCalendar 热力图日历"
      description="7×24 网格 · 5 级蓝色 · 周/小时维度 · Legend · Peak 标注"
      code={codeString}
    >
      <div className="heatmap-card">
        <div className="heatmap-header">
          <span className="heatmap-icon">🕐</span>
          <h3 className="heatmap-title">Best Time to Send Heatmap</h3>
          <Tag className="heatmap-tag">Time Insights</Tag>
        </div>
        <p className="heatmap-desc">Conversion rate by day of week &amp; hour. Darker = higher conversion.</p>

        <div className="heatmap-grid">
          {/* Hour labels */}
          <div className="heatmap-row heatmap-row--header">
            <span className="heatmap-day" />
            {hours.map(h => (
              <span key={h} className={`heatmap-hour-label ${h % 3 === 0 ? '' : 'heatmap-hour-label--hidden'}`}>
                {String(h).padStart(2, '0')}
              </span>
            ))}
          </div>

          {days.map((day, di) => (
            <div className="heatmap-row" key={day}>
              <span className="heatmap-day">{day}</span>
              {hours.map(h => (
                <div
                  key={h}
                  className="heatmap-cell"
                  style={{ background: getLevel(data[di][h]) }}
                  title={`${day} ${String(h).padStart(2, '0')}:00 — ${data[di][h]}% conv.`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="heatmap-footer">
          <div className="heatmap-legend">
            <span className="heatmap-legend-label">Low</span>
            {levels.map(c => <div key={c} className="heatmap-legend-swatch" style={{ background: c }} />)}
            <span className="heatmap-legend-label">High</span>
          </div>
          <span className="heatmap-peak">Peak: Fri 20:00 — 6.8% conv.</span>
        </div>
      </div>
    </CodePreview>
  )
}
