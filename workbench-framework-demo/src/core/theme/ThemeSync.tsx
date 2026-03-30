import { useEffect } from 'react'
import { theme } from 'antd'

/**
 * Bridge component: syncs AntD theme tokens → CSS custom properties.
 * Place inside <ConfigProvider> so useToken() reads the active theme.
 * When the theme changes, CSS vars update automatically.
 */
export function ThemeSync() {
  const { token } = theme.useToken()

  useEffect(() => {
    const root = document.documentElement

    // Primary
    root.style.setProperty('--klook-bench-color-primary', token.colorPrimary)
    root.style.setProperty('--klook-bench-color-primary-hover', token.colorPrimaryBgHover)
    root.style.setProperty('--klook-bench-color-primary-active', token.colorPrimaryActive)
    root.style.setProperty('--klook-bench-color-primary-light', token.colorPrimaryBg)
    root.style.setProperty('--klook-bench-color-primary-border', token.colorPrimaryBorder)
    root.style.setProperty('--klook-bench-color-primary-shadow', `${token.colorPrimary}1a`)
    root.style.setProperty('--klook-bench-color-primary-shadow-strong', `${token.colorPrimary}47`)

    // Surfaces
    root.style.setProperty('--klook-bench-color-bg-content', token.colorBgLayout)
    root.style.setProperty('--klook-bench-color-bg-card', token.colorBgContainer)
    root.style.setProperty('--klook-bench-color-bg-header', token.colorBgContainer)

    // Borders
    root.style.setProperty('--klook-bench-color-border', token.colorBorder)
    root.style.setProperty('--klook-bench-color-border-light', token.colorBorderSecondary)

    // Text
    root.style.setProperty('--klook-bench-color-text', token.colorText)
    root.style.setProperty('--klook-bench-color-text-secondary', token.colorTextSecondary)
    root.style.setProperty('--klook-bench-color-text-tertiary', token.colorTextTertiary)

    // Radii
    root.style.setProperty('--klook-bench-radius-sm', `${token.borderRadiusSM}px`)
    root.style.setProperty('--klook-bench-radius-md', `${token.borderRadius}px`)
    root.style.setProperty('--klook-bench-radius-lg', `${token.borderRadiusLG}px`)

    // Shadows
    root.style.setProperty('--klook-bench-shadow-fab', `0 8px 24px ${token.colorPrimary}47`)
    root.style.setProperty('--klook-bench-shadow-fab-hover', `0 10px 28px ${token.colorPrimary}57`)
  }, [token])

  return null
}
