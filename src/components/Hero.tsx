import { portfolioData } from '../data/portfolioData'
import profilePhoto from '../assets/professtional.jpeg'
import { MathAnimation } from './MathAnimation'

export function Hero() {
  return <section className="hero" id="home">
    <div className="hero-container">
      <MathAnimation>
        <div className="hero-copy">
          <p className="eyebrow">{portfolioData.title}</p>
          <h1>{portfolioData.name}<br /><span className="hero-subtitle">AI &amp; ML / SOFTWARE DEVELOPER</span></h1>
          <p className="hero-intro">{portfolioData.introduction} Based in {portfolioData.location}.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
            <a className="button button-primary" href={portfolioData.resumeUrl} target="_blank" rel="noreferrer">View resume <span aria-hidden="true">↓</span></a>
          </div>
          <div className="social-links" aria-label="Social links">
            <a href={portfolioData.githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href={portfolioData.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </MathAnimation>
      <div className="hero-simple-portrait" aria-label="Profile image">
        <img className="simple-portrait-photo" src={profilePhoto} alt="Professional profile portrait" />
      </div>
    </div>
  </section>
}