/**
 * DesignSystemRouter: renders individual DS section pages
 * based on the sidebar key from the nav config.
 */
import { DesignSystemPage } from '../../demo/design-system'
import { DesignSystemOverview } from './DesignSystemOverview'
import { SkillGuidePage } from '../../demo/design-system/modules/SkillGuidePage'
import { LayoutFrameworkPage } from '../../demo/design-system/modules/LayoutFrameworkPage'
import { BusinessModulesPage } from '../../demo/design-system/modules/BusinessModulesPage'
import { ComponentRulesPage } from '../../demo/design-system/modules/ComponentRulesPage'
import { DesignTokensPage } from '../../demo/design-system/modules/DesignTokensPage'
import { StatesFeedbackPage } from '../../demo/design-system/modules/StatesFeedbackPage'
import { ContentGuidelinesPage } from '../../demo/design-system/modules/ContentGuidelinesPage'
import { ReviewChecklistPage } from '../../demo/design-system/modules/ReviewChecklistPage'
import { IconsPage } from '../../demo/design-system/modules/IconsPage'
import { ChartsPage } from '../../demo/design-system/modules/ChartsPage'
import { ProjectStructurePage } from '../../demo/design-system/modules/ProjectStructurePage'
import { ContainerStructurePage } from '../../demo/design-system/modules/ContainerStructurePage'

interface Props {
  sectionKey: string
  activeTheme?: string
}

const SKILL_PAGES: Record<string, React.FC> = {
  'ds-skill-guide': SkillGuidePage,
  'ds-layout-framework': LayoutFrameworkPage,
  'ds-business-modules': BusinessModulesPage,
  'ds-component-rules': ComponentRulesPage,
  'ds-design-tokens': DesignTokensPage,
  'ds-states-feedback': StatesFeedbackPage,
  'ds-content-guidelines': ContentGuidelinesPage,
  'ds-review-checklist': ReviewChecklistPage,
  'ds-icons': IconsPage,
  'ds-charts': ChartsPage,
  'ds-project-structure': ProjectStructurePage,
  'ds-container-structure': ContainerStructurePage,
}

export function DesignSystemRouter({ sectionKey, activeTheme }: Props) {
  // Default landing page → Skill Guide
  if (!sectionKey) {
    return <SkillGuidePage />
  }

  // Skill reference pages
  const SkillPage = SKILL_PAGES[sectionKey]
  if (SkillPage) {
    return <SkillPage />
  }

  if (sectionKey === 'ds-overview') {
    return <DesignSystemOverview activeTheme={activeTheme} />
  }

  // Atomic component sections
  return <DesignSystemPage activeSection={sectionKey} />
}
