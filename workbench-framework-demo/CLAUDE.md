# Workbench Framework Demo

B-end workbench framework for Klook internal tools. Supports multiple business lines with config-driven navigation and dual-layer theming.

## Tech Stack
- React 19 + TypeScript (strict mode)
- Ant Design 6.x (antd)
- Vite 7
- @ant-design/charts

## Architecture

### Directory Structure (aligned with downstream UmiJS project)
- `src/core/` — core config + theme (config/, theme/)
- `src/components/` — shared components (layout/, shared/, icons/)
- `src/pages/` — page components per business line (Workbench/, Campaign/, Finance/, DesignSystem/, Grid/)
- `src/hooks/` — custom hooks
- `src/services/api/` — API service layer
- `src/types/` — shared TypeScript types
- `src/access.ts` — permission definitions
- `config/` / `mock/` — build config and mock data (root level, reserved)

### Routing
No React Router. Content rendering is manual conditional blocks in `App.tsx → renderContent()`, driven by `businessLine` + `selectedKey` state.

### State Management
All state lifted in `App.tsx` via `useState`. No Redux/Zustand. Key states persisted to localStorage with `klook-bench.*` prefix.

### Navigation
JSON-driven via `NavConfig` type (groups → items → optional children). Each business line has its own nav config in `core/config/modules/*.nav.json`. Converted to AntD Menu items via `buildMenuItems()`.

### Dual-Layer Theme System
1. **AntD ConfigProvider** — 3 themes: `klook2026Theme` (orange #FF5B00), `klookBenchTheme` (blue #1677ff), `klookBench2026Theme` (blue variant)
2. **CSS Custom Properties** — prefix `--klook-bench-*`, synced from AntD tokens via `ThemeSync` component

### Layout
- Header: fixed top bar, 56px
- Sidebar: collapsible (256px / 104px), breakpoint at 992px (lg)
- Content: max-width 1200px, full-height scrollable

## Design Tokens
- Spacing: 8px grid (xs 4px, sm 8px, md 16px, lg 24px, xl 32px, xxl 48px)
- Border radius: 6px (components), 4px (elements)
- Colors: Primary orange #FF5B00 (Klook 2026), success #00B33C, warning #FFB800, error #FF4D4F
- Token files: `src/core/theme/klook-2026.ts`, CSS fallback in `klook-bench-tokens.css`
- Reference: [docs/TOKENS.md](docs/TOKENS.md)

## Active Business Lines
5 functional: `bdbench`, `ma`, `campaign`, `finance`, `designsystem` (of 12 total roles defined in `core/config/merchantRoles.ts`)

## Implemented Pages
- Campaign: `PromotionCreativePage`, `CampaignBuilderPage`
- Finance: `KbrDetailPage`
- Dashboard (shared)
- Design System showcase
- All other routes render placeholder `ModuleCard`

## Conventions
- Styling: AntD design tokens first → `classNames`/`styles` → CSS vars; avoid global CSS overrides
- One root `ConfigProvider` unless strict isolation needed
- CSS naming: BEM convention, no CSS modules
- File naming: PascalCase for components, camelCase for utils, kebab-case for CSS
- New business line: add nav config in `core/config/modules/`, page dir in `pages/`, register in `core/config/registry.ts`, add route case in `App.tsx`

## Skills
- [Ant Design Guide](skill/AntD-SKILL.md) — antd 6.x component selection, theming, and best practices
- [Klook 2B Design System](skill/klook-2b-design-skill-3.27/SKILL.md) — 2B 中后台设计系统规则，覆盖页面模式、业务模块、组件选型、状态反馈、设计评审。详细规则按需读取 `skill/klook-2b-design-skill-3.27/references/`

## Documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) — overall architecture (Chinese)
- [docs/PROJECT-GUIDE.md](docs/PROJECT-GUIDE.md) — comprehensive project guide (Chinese)
- [docs/TOKENS.md](docs/TOKENS.md) — design token reference
- [docs/NAV-OUTPUT-FORMAT-SPEC.md](docs/NAV-OUTPUT-FORMAT-SPEC.md) — NavConfig type spec
