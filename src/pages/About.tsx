import { AboutSection, SkillsSection, ExperienceSection, EducationSection } from '../components/PortfolioSections'
import { PageTransition } from './PageTransition'

export function About() {
  return (
    <PageTransition>
      <div style={{ paddingTop: '100px' }}>
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
      </div>
    </PageTransition>
  )
}
