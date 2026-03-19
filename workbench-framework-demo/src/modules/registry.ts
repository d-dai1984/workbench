/**
 * Modules registry: maps business line keys to their nav configs.
 * Import nav configs statically so Vite can bundle them.
 */
import type { NavConfig } from '../shell/config/nav.types'
import type { BusinessLineKey } from '../shell/config/merchantRoles'

import bdbenchNav from './bdbench/nav.config.json'
import maNav from './ma/nav.config.json'
import campaignNav from './campaign/nav.config.json'
import financeNav from './finance/nav.config.json'
import designsystemNav from './designsystem/nav.config.json'

export const businessLineNavConfigs: Record<BusinessLineKey, NavConfig> = {
  bdbench: bdbenchNav as NavConfig,
  ma: maNav as NavConfig,
  campaign: campaignNav as NavConfig,
  finance: financeNav as NavConfig,
  designsystem: designsystemNav as NavConfig,
}
