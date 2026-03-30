import { useState } from 'react'
import { Tooltip, message } from 'antd'
import { CodeOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons'
import './CodePreview.css'

interface CodePreviewProps {
  title: string
  description?: string
  code: string
  children: React.ReactNode
}

export function CodePreview({ title, description, code, children }: CodePreviewProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      message.success('Copied!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      message.error('Copy failed')
    }
  }

  return (
    <div className="code-preview">
      <div className="code-preview__header">
        <span className="code-preview__title">{title}</span>
        {description && <span className="code-preview__desc">{description}</span>}
      </div>
      <div className="code-preview__demo">{children}</div>
      <div className="code-preview__actions">
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <button type="button" className="code-preview__action-btn" onClick={handleCopy}>
            {copied ? <CheckOutlined style={{ color: '#00B33C' }} /> : <CopyOutlined />}
          </button>
        </Tooltip>
        <Tooltip title={showCode ? 'Hide code' : 'Show code'}>
          <button
            type="button"
            className={`code-preview__action-btn ${showCode ? 'code-preview__action-btn--active' : ''}`}
            onClick={() => setShowCode(!showCode)}
          >
            <CodeOutlined />
          </button>
        </Tooltip>
      </div>
      {showCode && (
        <div className="code-preview__code">
          <pre><code>{code}</code></pre>
        </div>
      )}
    </div>
  )
}
