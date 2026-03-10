/**
 * Nav config types. Delivery format for replacing primary + secondary menu content.
 */

export interface NavConfigChild {
  key: string
  label: string
}

export interface NavConfigItem {
  key: string
  label: string
  /** Filename without extension (resolved to /klook-bench/nav-icons/{icon}.svg) or absolute path e.g. /custom/foo.svg */
  icon?: string
  children?: NavConfigChild[]
}

export interface NavConfigGroup {
  groupLabel: string
  items: NavConfigItem[]
}

export interface NavConfig {
  groups: NavConfigGroup[]
}
