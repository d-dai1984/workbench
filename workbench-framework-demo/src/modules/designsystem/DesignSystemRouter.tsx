/**
 * DesignSystemRouter: renders individual DS section pages
 * based on the sidebar key from the nav config.
 */
import { DesignSystemPage } from '../../demo/design-system'
import { DesignSystemOverview } from './DesignSystemOverview'

interface Props {
  sectionKey: string
}

export function DesignSystemRouter({ sectionKey }: Props) {
  // Overview → show the Skill / design guide page
  if (sectionKey === 'ds-overview' || !sectionKey) {
    return <DesignSystemOverview />
  }

  // All other keys → render the matching component section
  return <DesignSystemPage activeSection={sectionKey} />
}
