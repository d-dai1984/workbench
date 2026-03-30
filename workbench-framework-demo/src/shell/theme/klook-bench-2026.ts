import type { ThemeConfig } from 'antd'

/**
 * Klook Bench 2026 Theme
 * Based on Ant Design v5 default seed tokens — ready for customization.
 *
 * Seed token reference:
 * https://ant.design/docs/react/customize-theme#seedtoken
 */
export const klookBench2026Theme: ThemeConfig = {
  token: {
    // ─── Brand Color ───────────────────────────────────────────────
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',

    // ─── Text ──────────────────────────────────────────────────────
    colorTextBase: '#000000',

    // ─── Background ────────────────────────────────────────────────
    colorBgBase: '#ffffff',

    // ─── Typography ────────────────────────────────────────────────
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    fontSize: 14,
    lineHeight: 1.5714285714285714,
    lineHeightHeading1: 1.2105263157894737,
    lineHeightHeading2: 1.2666666666666666,
    lineHeightHeading3: 1.3333333333333333,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontWeightStrong: 600,

    // ─── Border ────────────────────────────────────────────────────
    borderRadius: 6,
    borderRadiusXS: 2,
    borderRadiusSM: 4,
    borderRadiusLG: 16,
    borderRadiusOuter: 4,
    lineWidth: 1,
    lineType: 'solid',

    // ─── Size & Spacing ────────────────────────────────────────────
    sizeUnit: 4,
    sizeStep: 4,
    sizePopupArrow: 16,
    controlHeight: 32,
    controlHeightXS: 24,
    controlHeightSM: 24,
    controlHeightLG: 40,

    // ─── Padding ───────────────────────────────────────────────────
    padding: 16,
    paddingXS: 8,
    paddingSM: 12,
    paddingLG: 24,
    paddingXL: 32,
    paddingXXS: 4,
    paddingContentHorizontal: 16,
    paddingContentHorizontalLG: 24,
    paddingContentHorizontalSM: 8,
    paddingContentVertical: 12,
    paddingContentVerticalLG: 16,
    paddingContentVerticalSM: 8,

    // ─── Margin ────────────────────────────────────────────────────
    margin: 16,
    marginXS: 8,
    marginSM: 12,
    marginLG: 24,
    marginXL: 32,
    marginXXL: 48,
    marginXXS: 4,

    // ─── Motion ────────────────────────────────────────────────────
    motion: true,
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
    motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
    motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
    motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',

    // ─── Shadow ────────────────────────────────────────────────────
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',

    // ─── Z-Index ───────────────────────────────────────────────────
    zIndexBase: 0,
    zIndexPopupBase: 1000,

    // ─── Misc ──────────────────────────────────────────────────────
    opacityImage: 1,
    wireframe: false,
    screenXS: 480,
    screenSM: 576,
    screenMD: 768,
    screenLG: 992,
    screenXL: 1200,
    screenXXL: 1600,
  },
  components: {
    Card: {
      bodyPaddingSM: 24,
      headerPaddingSM: 24,
      headerHeightSM: 56,
      borderRadiusLG: 16,
    },
  },
}
