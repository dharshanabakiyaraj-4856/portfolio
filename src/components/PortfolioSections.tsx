import { portfolioData, newCertificates } from '../data/portfolioData'
import { useState } from 'react'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { SkillsAnimation } from './SkillsAnimation'
import { AboutAnimation, ProjectsAnimation, TimelineAnimation } from './SectionAnimations'

function CertificationCard({ certification }: { certification: (typeof portfolioData.certifications)[number] }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <motion.article 
      className="certification-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <button className="certificate-image-button" type="button" onClick={() => setIsPreviewOpen(true)} aria-label="Open certificate preview">
        <img src={certification.imageUrl} alt={`${certification.name} certificate`} />
      </button>
      <div className="certification-details">
        <div className="certification-heading">
          <span className="certificate-icon" aria-hidden="true">✦</span>
          <div>
            <h3>{certification.name}</h3>
            <p>{certification.issuer}</p>
          </div>
        </div>
        <div className="certificate-result" aria-label={`Certificate result: ${certification.status}, ${certification.percentage}`}>
          <span>{certification.status}</span>
          <strong>{certification.percentage}</strong>
        </div>
        {certification.certificateUrl && (
          <a className="certificate-link" href={certification.certificateUrl} target="_blank" rel="noreferrer">
            View Certificate <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      {isPreviewOpen && (
        <div className="certificate-modal" role="dialog" aria-modal="true" aria-label="Certificate preview" onClick={() => setIsPreviewOpen(false)}>
          <div className="certificate-modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="certificate-modal-close" type="button" onClick={() => setIsPreviewOpen(false)} aria-label="Close certificate preview">×</button>
            <img src={certification.imageUrl} alt={`${certification.name} certificate enlarged`} />
          </div>
        </div>
      )}
    </motion.article>
  )
}

function AchievementCard({ achievement, index }: { achievement: (typeof portfolioData.achievements)[number], index: number }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article 
      className="achievement-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ position: 'relative' }}
    >
      {!shouldReduceMotion && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: '100%', opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: index * 0.15 }}
          style={{ position: 'absolute', left: '-1px', top: 0, width: '1px', background: 'var(--accent-color)' }}
        />
      )}
      <div className={`achievement-icon achievement-icon-${achievement.icon}`} aria-hidden="true">
        {achievement.icon === 'award' ? '★' : '▤'}
      </div>
      <div className="achievement-content">
        <div className="achievement-meta">
          <span>{achievement.event}</span>
          <span>{achievement.date}</span>
        </div>
        <h3>{achievement.title}</h3>
        <p className="achievement-organization">{achievement.organization}</p>
        <p>{achievement.description}</p>
        
      </div>
    </motion.article>
  )
}

function ProjectCard({ project, index, isOpen, onToggle }: { project: (typeof portfolioData.projects)[number], index: number, isOpen: boolean, onToggle: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article 
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
    >
      {!shouldReduceMotion && (
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
          style={{ height: '1px', background: 'var(--accent-color)', position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <div className="project-card-top" style={{ position: 'relative', zIndex: 2 }}>
        <span>0{index + 1}</span>
        <span className="project-status">{project.type}</span>
      </div>
      <motion.h3
        transition={{ duration: 0.2 }}
        className="project-card-title"
        whileHover={shouldReduceMotion ? {} : { x: 4 }}
      >
        {project.title}
      </motion.h3>
      <p style={{ marginBottom: '20px' }}>{project.description}</p>
      
      <svg className="project-hover-path" viewBox="0 0 100 2" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '2px', margin: '20px 0', opacity: 0, transition: 'opacity 0.3s ease', flexShrink: 0 }}>
         <path d="M 0 1 L 100 1" stroke="var(--pale-mint)" strokeWidth="1" strokeDasharray="4 4" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>

      {project.metric && (
        <div className="project-metric">
          <span>Key metric</span>
          <strong>{project.metric}</strong>
        </div>
      )}
      <ul className="tag-list">
        {project.technologies.map((technology, i) => (
          <motion.li 
            key={technology}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
          >
            {technology}
          </motion.li>
        ))}
      </ul>
      <div className="project-details">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--warm-grey)', letterSpacing: '1px', marginBottom: '8px' }}>Project Context</h4>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>{project.description}</p>
                
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--warm-grey)', letterSpacing: '1px', marginBottom: '8px' }}>Key Contributions & Approach</h4>
                <ul className="feature-list" style={{ marginBottom: '16px', fontSize: '14px' }}>
                  {project.features.map((feature) => <li key={feature} style={{ fontSize: '14px' }}>{feature}</li>)}
                </ul>

                {project.metric && (
                  <>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--warm-grey)', letterSpacing: '1px', marginBottom: '8px' }}>Result / Outcome</h4>
                    <p style={{ fontSize: '14px', color: 'var(--pale-mint)', fontWeight: 600 }}>{project.metric}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button className="details-toggle" type="button" aria-expanded={isOpen} onClick={onToggle} style={{ marginTop: '10px' }}>
          {isOpen ? 'Hide details −' : 'View details +'}
        </button>
      </div>
      <div className="card-links">
        {project.githubUrl && (
          <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub <motion.span whileHover={shouldReduceMotion ? {} : { x: 2 }} className="link-arrow" aria-hidden="true">↗</motion.span>
          </a>
        )}
        {project.liveUrl && (
          <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">
            Live demo <motion.span whileHover={shouldReduceMotion ? {} : { x: 2 }} className="link-arrow" aria-hidden="true">↗</motion.span>
          </a>
        )}
      </div>
    </motion.article>
  )
}

export function PortfolioSections() {
  return null; 
}

export function AboutSection() {
  return (
    <>
      <section className="section" id="about" style={{ position: 'relative' }}>
        <span className="math-detail" style={{ top: '10%', left: '5%' }}>x₁</span>
        <span className="math-detail" style={{ top: '80%', right: '10%' }}>Σ</span>
        <div className="container about-grid">
          <div className="section-heading">
            <span className="section-number">01</span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              About me
            </motion.h2>
          </div>
          <AboutAnimation>
            <div className="about-content">
              <motion.p 
                className="lead"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                I am an Artificial Intelligence and Machine Learning student who enjoys turning curious questions into useful, well-crafted digital experiences.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                My interests sit at the intersection of intelligent systems and software development. I am building a practical foundation across programming, web technologies, and data-led problem solving while staying open to learning what each project demands.
              </motion.p>
              <motion.a 
                className="text-link" href="#contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Let's connect <span aria-hidden="true">↗</span>
              </motion.a>
            </div>
          </AboutAnimation>
        </div>
      </section>

        </>
  )
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
<section className="section" id="skills">
        <div className="container">
          <div className="section-heading section-heading-wide">
            <span className="section-number">02</span>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.2 }}>Skills &amp; tools</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}>A growing toolkit, grounded in fundamentals and practical use.</motion.p>
          </div>
          <SkillsAnimation>
            <div className="skills-grid">
              {portfolioData.skills.map((group, groupIndex) => (
                <motion.article 
                  className="skill-group" 
                  key={group.category}
                  whileHover={shouldReduceMotion ? {} : { y: -3, borderColor: 'var(--accent-color)' }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: groupIndex * 0.1 }}
                  >
                    {group.category}
                  </motion.h3>
                  <ul>
                    {group.items.map((skill, index) => (
                      <motion.li 
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: groupIndex * 0.1 + index * 0.05 }}
                        style={{ position: 'relative' }}
                        whileHover={shouldReduceMotion ? {} : { color: 'var(--accent-color)' }}
                      >
                        {!shouldReduceMotion && (
                          <motion.span 
                            initial={{ scale: 0 }} 
                            whileInView={{ scale: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                            style={{ position: 'absolute', left: '-12px', top: '50%', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-color)', transform: 'translateY(-50%)' }} 
                          />
                        )}
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </SkillsAnimation>
        </div>
      </section>

        </>
  )
}

export function ProjectsSection({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  
  const projects = featuredOnly ? portfolioData.projects.slice(0, 1) : portfolioData.projects;
  return (
    <>
<section className="section" id="projects">
        <div className="container">
          <div className="section-heading section-heading-wide">
            <span className="section-number">03</span>
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.2 }}>Projects</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}>Applied learning through machine learning and full-stack development.</motion.p>
          </div>
          <ProjectsAnimation>
            <div className="project-grid">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} isOpen={expandedProjectIndex === index} onToggle={() => setExpandedProjectIndex(expandedProjectIndex === index ? null : index)} />
              ))}
            </div>
          </ProjectsAnimation>
              
</div></section>

        </>
  )
}

export function ExperienceSection() {
  return (
    <>
<section className="section" id="experience">
        <div className="container split-layout">
          <div className="section-heading">
            <span className="section-number">04</span>
            <h2>Experience</h2>
          </div>
          <div className="timeline-list" style={{ position: 'relative' }}>
            <TimelineAnimation direction="vertical">
              {portfolioData.experience.map((item, index) => (
                <motion.article 
                  className="timeline-item" 
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                >
                  <div className="timeline-meta">
                    <span>{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  {item.company && <p className="experience-company">{item.company}</p>}
                  {item.description && <p>{item.description}</p>}
                  {item.responsibilities && (
                    <ul className="experience-list">
                      {item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                    </ul>
                  )}
                  {item.imageUrl && (
                    <div style={{marginTop: "15px", marginBottom: "15px"}}>
                      <img src={item.imageUrl} alt="Certificate" style={{maxWidth:"100%", height:"auto", borderRadius:"4px", border:"1px solid var(--line-color)", marginBottom:"10px"}} />
                      <br/><a href={item.imageUrl} target="_blank" className="button button-quiet">View Certificate ?</a>
                    </div>
                  )}
                  {item.technologies && (
                    <ul className="tag-list experience-tags">
                      {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                    </ul>
                  )}
                </motion.article>
              ))}
            </TimelineAnimation>
          </div>
        </div>
      </section>

        </>
  )
}

export function AchievementsSection() {
  return (
    <>
<section className="section" id="achievements">
        <div className="container">
          <div className="section-heading section-heading-wide">
            <span className="section-number">05</span>
            <h2>Achievements</h2>
            <p>Recognition for building, presenting, and learning through technology.</p>
          </div>
          <TimelineAnimation direction="vertical">
            <div className="achievement-grid">
              {portfolioData.achievements.map((achievement, index) => (
                <AchievementCard key={achievement.title} achievement={achievement} index={index} />
              ))}
            </div>
          </TimelineAnimation>
        </div>
      </section>

        </>
  )
}

export function EducationSection() {
  return (
    <>
<section className="section" id="education">
        <div className="container split-layout">
          <div className="section-heading">
            <span className="section-number">06</span>
            <h2>Education</h2>
          </div>
          <div className="education-content" style={{ position: 'relative' }}>
            <TimelineAnimation direction="horizontal">
              <motion.span 
                className="education-kicker"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.4 }}
                style={{ display: 'block', marginBottom: '10px' }}
              >
                Undergraduate degree
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.6 }}
              >
                {portfolioData.education.degree}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.8 }}
              >
                {portfolioData.education.institution}
              </motion.p>
              <motion.p 
                className="muted"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 1.0 }}
              >
                {portfolioData.education.details}
              </motion.p>
            </TimelineAnimation>
          </div>
        </div>
      </section>

        </>
  )
}

export function CertificationsSection() {
  return (
    <>
<section className="section" id="certifications">
        <div className="container certifications-row">
          <div className="section-heading">
            <span className="section-number">07</span>
            <h2>Certifications</h2>
          </div>
          <div className="certification-list">
            {portfolioData.certifications.map((certification) => (
              <CertificationCard key={certification.name} certification={certification} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}export function WhatIDoSection() {
  const services = [
    { id: '01', title: 'AI & Machine Learning', desc: 'Building and exploring intelligent systems and machine learning solutions.' },
    { id: '02', title: 'Software Development', desc: 'Developing practical software solutions using programming and modern development technologies.' },
    { id: '03', title: 'Web Development', desc: 'Building clean, responsive web interfaces using the technologies already present in my portfolio.' },
    { id: '04', title: 'Data & Analysis', desc: 'Working with data, analysis, preprocessing and machine learning workflows.' }
  ];
  return (
    <section className="section" id="what-i-do">
      <div className="container split-layout">
        <div className="section-heading">
          <span className="section-number">02</span>
          <h2>What I Do</h2>
        </div>
        <div className="services-list" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {services.map((svc, i) => (
            <motion.div 
              key={svc.id} 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ borderBottom: '1px solid var(--line-color)', paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                <span style={{ fontSize: '12px', color: 'var(--burnt-saffron)', fontWeight: 'bold' }}>{svc.id}</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{svc.title}</h3>
              </div>
              <p style={{ margin: 0, color: 'var(--text-meta)', paddingLeft: '28px', fontSize: '15px' }}>{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export function InternshipSection() {
  return (
    <section className="section" id="internships">
      <div className="container split-layout">
        <div className="section-heading">
          <span className="section-number">05</span>
          <h2>Internship</h2>
        </div>
        <div className="timeline-list">
          {newCertificates.internships.map((item, index) => (
            <motion.article key={index} className="timeline-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}>
              <div className="timeline-meta"><span>{item.date}</span></div>
              <h3>{item.title}</h3>
              <p className="experience-company">{item.organization}</p>
              <p>{item.description}</p>
              <a href={item.imageUrl} target="_blank" className="button button-quiet" style={{marginTop: '15px'}}>View Certificate ?</a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PaperPresentationSection() {
  return (
    <section className="section" id="paper-presentation">
      <div className="container split-layout">
        <div className="section-heading">
          <span className="section-number">08</span>
          <h2>Paper Presentation</h2>
        </div>
        <div className="timeline-list">
          {newCertificates.paperPresentations.map((item, index) => (
            <motion.article key={index} className="timeline-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}>
              <div className="timeline-meta"><span>{item.date}</span></div>
              <h3>{item.title}</h3>
              <p className="experience-company">{item.event} � {item.organization}</p>
              <a href={item.imageUrl} target="_blank" className="button button-quiet" style={{marginTop: '15px'}}>View Certificate ?</a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ConferenceParticipationSection() {
  return (
    <section className="section" id="conferences">
      <div className="container split-layout">
        <div className="section-heading">
          <span className="section-number">09</span>
          <h2>Conference Participation</h2>
        </div>
        <div className="timeline-list">
          {newCertificates.conferences.map((item, index) => (
            <motion.article key={index} className="timeline-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}>
              <div className="timeline-meta"><span>{item.date}</span></div>
              <h3>{item.title}</h3>
              <p className="experience-company">{item.organization}</p>
              <p>Type: {item.participationType}</p>
              <a href={item.imageUrl} target="_blank" className="button button-quiet" style={{marginTop: '15px'}}>View Certificate ?</a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CompetitionsAchievementsSection() {
  return (
    <section className="section" id="competitions">
      <div className="container split-layout">
        <div className="section-heading">
          <span className="section-number">10</span>
          <h2>Competitions & Achievements</h2>
        </div>
        <div className="timeline-list">
          {newCertificates.achievements.map((item, index) => (
            <motion.article key={index} className="timeline-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }}>
              <div className="timeline-meta"><span>{item.date}</span></div>
              <h3>{item.title}</h3>
              <p className="experience-company">{item.event} � {item.organization}</p>
              <p>Prize: {item.prize}</p>
              <a href={item.imageUrl} target="_blank" className="button button-quiet" style={{marginTop: '15px'}}>View Certificate ?</a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
