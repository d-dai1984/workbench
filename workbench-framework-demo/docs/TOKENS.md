# Klook Bench Design Tokens

All custom tokens use the `--klook-bench-*` prefix to distinguish from AntD (`--ant-*`) and future C-end (`klook-app-*`).

## Where to change theme

| Purpose | File / location |
|--------|------------------|
| **Primary / accent colors, layout sizes** | `src/theme/klook-bench-tokens.css` |
| **AntD component theme (buttons, inputs, etc.)** | `src/theme/theme.ts` → `klookBenchTheme.token.colorPrimary` |
| **Dark mode** | `src/theme/theme.ts` → set `algorithm: darkAlgorithm` |

## Token list (CSS variables)

### Color – primary (nav highlight, buttons, links)
- `--klook-bench-color-primary`
- `--klook-bench-color-primary-hover`
- `--klook-bench-color-primary-active`
- `--klook-bench-color-primary-light`
- `--klook-bench-color-primary-border`
- `--klook-bench-color-primary-shadow`
- `--klook-bench-color-primary-shadow-strong`

### Color – accent (progress, emphasis)
- `--klook-bench-color-accent`

### Layout
- `--klook-bench-header-height`
- `--klook-bench-header-padding-x` / `--klook-bench-header-padding-left`
- `--klook-bench-sidebar-width` / `--klook-bench-sidebar-collapsed-width`
- `--klook-bench-content-padding`

### Surfaces & borders
- `--klook-bench-color-bg-*` (header, content, card, submenu, feedback-body)
- `--klook-bench-color-border` / `--klook-bench-color-border-light` / `--klook-bench-color-border-input`

### Text
- `--klook-bench-color-text` / `--klook-bench-color-text-secondary` / `--klook-bench-color-text-tertiary`
- `--klook-bench-color-text-heading` / `--klook-bench-color-text-muted`

### Radii & shadows
- `--klook-bench-radius-sm` through `--klook-bench-radius-pill`
- `--klook-bench-shadow-fab` / `--klook-bench-shadow-fab-hover` / `--klook-bench-shadow-panel`

## Relation to AntD

- AntD tokens (e.g. `colorPrimary`) control Ant Design components only.
- Klook Bench tokens control custom layout and overrides (header, sidebar, cards, feedback, etc.).
- Keep `theme.ts` `colorPrimary` in sync with `--klook-bench-color-primary` for a consistent primary color across AntD and custom UI.
