import navConfigJson from './nav.config.json'
import type { NavConfig } from './nav.types'

export const defaultNavConfig = navConfigJson as NavConfig
export { buildMenuItems, getSubmenuItems, KLOOK_BENCH_NAV_ICONS_BASE } from './buildMenuItems'
export { defaultMerchantRoleItems } from './merchantRoles'
export type { NavConfig, NavConfigGroup, NavConfigItem, NavConfigChild } from './nav.types'
