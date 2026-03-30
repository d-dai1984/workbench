/**
 * DesignSystemRouter: renders individual DS section pages
 * based on the sidebar key from the nav config.
 */
import { DesignSystemPage } from '.'
import { DesignSystemOverview } from './DesignSystemOverview'
import { SkillGuidePage } from './modules/SkillGuidePage'
import { LayoutFrameworkPage } from './modules/LayoutFrameworkPage'
import { BusinessModulesPage } from './modules/BusinessModulesPage'
import { ComponentRulesPage } from './modules/ComponentRulesPage'
import { DesignTokensPage } from './modules/DesignTokensPage'
import { StatesFeedbackPage } from './modules/StatesFeedbackPage'
import { ContentGuidelinesPage } from './modules/ContentGuidelinesPage'
import { ReviewChecklistPage } from './modules/ReviewChecklistPage'
import { IconsPage } from './modules/IconsPage'
import { ChartsPage } from './modules/ChartsPage'
import { ProjectStructurePage } from './modules/ProjectStructurePage'
import { ContainerStructurePage } from './modules/ContainerStructurePage'

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
