import { ProjectsSection } from '../components/PortfolioSections'
import { PageTransition } from './PageTransition'

export function Projects() {
  return (
    <PageTransition>
      <div style={{ paddingTop: '100px' }}>
        <ProjectsSection featuredOnly={false} />
      </div>
    </PageTransition>
  )
}
