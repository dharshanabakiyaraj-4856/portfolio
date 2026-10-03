import { Hero } from '../components/Hero'
import { WhatIDoSection, ExperienceSection, InternshipSection, CertificationsSection, PaperPresentationSection, ConferenceParticipationSection, CompetitionsAchievementsSection, EducationSection } from '../components/PortfolioSections'
import { PageTransition } from './PageTransition'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <PageTransition>
      <Hero />
      <WhatIDoSection />
      <ExperienceSection />
      <InternshipSection />
      <CertificationsSection />
      <PaperPresentationSection />
      <ConferenceParticipationSection />
      <CompetitionsAchievementsSection />
      <EducationSection />
      <section className="section" style={{ textAlign: 'center', padding: '100px 20px', paddingBottom: '140px' }}>
        <h2 style={{ marginBottom: '30px', fontSize: 'clamp(32px, 5vw, 42px)' }}>Ready to explore?</h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/about" className="button button-quiet">
            <span>About Me ↗</span>
          </Link>
          <Link to="/contact" className="button button-primary">
            <span>Get in Touch ↗</span>
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
