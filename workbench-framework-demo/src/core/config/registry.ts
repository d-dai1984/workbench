/**
 * Modules registry: maps business line keys to their nav configs.
 * Import nav configs statically so Vite can bundle them.
 */
import type { NavConfig } from './nav.types'
import type { BusinessLineKey } from './merchantRoles'

import bdbenchNav from './modules/bdbench.nav.json'
import maNav from './modules/ma.nav.json'
import campaignNav from './modules/campaign.nav.json'
import financeNav from './modules/finance.nav.json'
import designsystemNav from './modules/designsystem.nav.json'

export const businessLineNavConfigs: Record<BusinessLineKey, NavConfig> = {
  bdbench: bdbenchNav as NavConfig,
  ma: maNav as NavConfig,
  campaign: campaignNav as NavConfig,
  finance: financeNav as NavConfig,
  designsystem: designsystemNav as NavConfig,
}
