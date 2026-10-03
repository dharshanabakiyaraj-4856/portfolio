const fs = require('fs');
let code = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');

const replacement = `<div className="project-details">
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
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted-blue-grey)', letterSpacing: '1px', marginBottom: '8px' }}>Project Context</h4>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>{project.description}</p>
                
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted-blue-grey)', letterSpacing: '1px', marginBottom: '8px' }}>Key Contributions & Approach</h4>
                <ul className="feature-list" style={{ marginBottom: '16px', fontSize: '14px' }}>
                  {project.features.map((feature) => <li key={feature} style={{ fontSize: '14px' }}>{feature}</li>)}
                </ul>

                {project.metric && (
                  <>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--muted-blue-grey)', letterSpacing: '1px', marginBottom: '8px' }}>Result / Outcome</h4>
                    <p style={{ fontSize: '14px', color: 'var(--dusty-mauve)', fontWeight: 600 }}>{project.metric}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button className="details-toggle" type="button" aria-expanded={isOpen} onClick={onToggle} style={{ marginTop: '10px' }}>
          {isOpen ? 'Hide details −' : 'View details +'}
        </button>
      </div>`;

code = code.replace(/<div className="project-details">[\s\S]*?<\/button>\s*<\/div>/, replacement);

if (!code.includes('AnimatePresence')) {
  code = code.replace(/import { motion, useReducedMotion } from 'framer-motion'/, "import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'");
}

fs.writeFileSync('src/components/PortfolioSections.tsx', code);
console.log('ProjectCard expanded updated');
