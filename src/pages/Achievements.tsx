import { AchievementsSection, CompetitionsAchievementsSection, CertificationsSection, PaperPresentationSection, ConferenceParticipationSection } from '../components/PortfolioSections'
import { PageTransition } from './PageTransition'

export function Achievements() {
  return (
    <PageTransition>
      <div style={{ paddingTop: '100px' }}>
        <AchievementsSection />
        <CertificationsSection />
        <PaperPresentationSection />
        <ConferenceParticipationSection />
        <CompetitionsAchievementsSection />
      </div>
    </PageTransition>
  )
}
