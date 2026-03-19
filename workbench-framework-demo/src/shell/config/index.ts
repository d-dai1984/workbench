import navConfigJson from './nav.config.json'
import type { NavConfig } from './nav.types'

export const defaultNavConfig = navConfigJson as NavConfig
export { buildMenuItems, getSubmenuItems, KLOOK_BENCH_NAV_ICONS_BASE } from './buildMenuItems'
export { defaultMerchantRoleItems, BUSINESS_LINE_KEYS } from './merchantRoles'
export type { BusinessLineKey } from './merchantRoles'
export type { NavConfig, NavConfigGroup, NavConfigItem, NavConfigChild } from './nav.types'
