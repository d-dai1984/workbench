import type { ThemeConfig } from 'antd'

/**
 * AntD theme config for Klook Bench.
 * - colorPrimary: sync with --klook-bench-color-primary for buttons, inputs, etc.
 * - algorithm: switch to darkAlgorithm for dark mode later.
 */
export const klookBenchTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff', // keep in sync with klook-bench-tokens.css
    borderRadius: 6,
  },
  // algorithm: darkAlgorithm, // enable for dark mode
}
