import { Button, Tag, Space } from 'antd'
import { EyeOutlined, EditOutlined, CopyOutlined, ThunderboltOutlined, MailOutlined, ClockCircleOutlined, FileOutlined } from '@ant-design/icons'
import { CodePreview } from '../CodePreview'
import './TemplateCardDemo.css'

interface TemplateCardProps {
  title: string
  description: string
  languages: string[]
  timeAgo: string
  uses: number
  coverGradient?: string
}

function TemplateCard({ title, description, languages, timeAgo, uses, coverGradient }: TemplateCardProps) {
  return (
    <div className="tpl-card">
      <div className="tpl-card__cover" style={{ background: coverGradient || 'linear-gradient(180deg, #FFF2E8 0%, #FFFFFF 100%)' }}>
        <div className="tpl-card__cover-badge"><MailOutlined /></div>
        <div className="tpl-card__preview">
          <div className="tpl-card__preview-bar tpl-card__preview-bar--primary" />
          <div className="tpl-card__preview-line tpl-card__preview-line--long" />
          <div className="tpl-card__preview-line tpl-card__preview-line--medium" />
          <div className="tpl-card__preview-bar tpl-card__preview-bar--cta" />
        </div>
      </div>
      <div className="tpl-card__body">
        <h3 className="tpl-card__title">{title}</h3>
        <p className="tpl-card__desc">{description}</p>
        <Space className="tpl-card__tags">
          {languages.map(l => <Tag key={l} className="tpl-card__tag">{l}</Tag>)}
        </Space>
        <div className="tpl-card__meta">
          <span><ClockCircleOutlined /> {timeAgo}</span>
          <span><FileOutlined /> {uses} uses</span>
        </div>
      </div>
      <div className="tpl-card__footer">
        <Space className="tpl-card__actions-left">
          <Button type="text" size="small" icon={<EyeOutlined />} className="tpl-card__action-btn" />
          <Button type="text" size="small" icon={<EditOutlined />} className="tpl-card__action-btn" />
          <Button type="text" size="small" icon={<CopyOutlined />} className="tpl-card__action-btn" />
        </Space>
        <Button type="primary" shape="circle" size="small" icon={<ThunderboltOutlined />} className="tpl-card__primary-btn" />
      </div>
    </div>
  )
}

const codeString = `import { Button, Tag, Space } from 'antd'
import { EyeOutlined, EditOutlined, CopyOutlined, ThunderboltOutlined, MailOutlined } from '@ant-design/icons'

function TemplateCard({ title, description, languages, timeAgo, uses }) {
  return (
    <div className="tpl-card">
      {/* Cover: gradient background + email preview mockup */}
      <div className="tpl-card__cover"
        style={{ background: 'linear-gradient(180deg, #FFF2E8 0%, #FFF 100%)' }}>
        <div className="tpl-card__cover-badge"><MailOutlined /></div>
        <div className="tpl-card__preview">
          <div className="tpl-card__preview-bar--primary" />
          <div className="tpl-card__preview-line--long" />
          <div className="tpl-card__preview-line--medium" />
          <div className="tpl-card__preview-bar--cta" />
        </div>
      </div>

      {/* Body: title + description + language tags + meta */}
      <div className="tpl-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
        <Space>
          {languages.map(l => <Tag key={l}>{l}</Tag>)}
        </Space>
        <div className="tpl-card__meta">
          <span>🕐 {timeAgo}</span>
          <span>📋 {uses} uses</span>
        </div>
      </div>

      {/* Footer: icon actions + primary CTA */}
      <div className="tpl-card__footer">
        <Space>
          <Button type="text" size="small" icon={<EyeOutlined />} />
          <Button type="text" size="small" icon={<EditOutlined />} />
          <Button type="text" size="small" icon={<CopyOutlined />} />
        </Space>
        <Button type="primary" shape="circle" size="small"
          icon={<ThunderboltOutlined />} />
      </div>
    </div>
  )
}`

export function TemplateCardDemo() {
  return (
    <CodePreview
      title="TemplateCard 模板卡片"
      description="带封面图预览 · 标题/描述 · 语言标签 · 元信息 · 底部操作栏"
      code={codeString}
    >
      <Space size={24} wrap align="start">
        <TemplateCard
          title="Summer Flash Sale"
          description="Eye-catching summer promotion email with hero banner and CTA"
          languages={['EN', 'ZH', 'JA']}
          timeAgo="2 hours ago"
          uses={24}
        />
        <TemplateCard
          title="New User Welcome"
          description="Onboarding email with activation flow and rewards"
          languages={['EN', 'KO']}
          timeAgo="1 day ago"
          uses={156}
          coverGradient="linear-gradient(180deg, #E6F4FF 0%, #FFFFFF 100%)"
        />
        <TemplateCard
          title="Weekend Getaway"
          description="Travel deals email with destination cards"
          languages={['EN', 'ZH', 'JA', 'KO']}
          timeAgo="3 days ago"
          uses={89}
          coverGradient="linear-gradient(180deg, #E6FFFB 0%, #FFFFFF 100%)"
        />
      </Space>
    </CodePreview>
  )
}
