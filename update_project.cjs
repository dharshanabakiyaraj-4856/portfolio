const fs = require('fs');
let code = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');

code = code.replace(
  /function ProjectCard\(\{ project, index \}: \{ project: \(typeof portfolioData.projects\)\[number\], index: number \}\) \{\s*const \[isDetailsOpen, setIsDetailsOpen\] = useState\(false\)\s*const shouldReduceMotion = useReducedMotion\(\)/,
  `function ProjectCard({ project, index, isOpen, onToggle }: { project: (typeof portfolioData.projects)[number], index: number, isOpen: boolean, onToggle: () => void }) {\n  const shouldReduceMotion = useReducedMotion()`
);

code = code.replace(
  /<button className="details-toggle" type="button" aria-expanded=\{isDetailsOpen\} onClick=\{[^}]+\}>/,
  '<button className="details-toggle" type="button" aria-expanded={isOpen} onClick={onToggle}>'
);

code = code.replace(
  /\{isDetailsOpen \? 'Hide details' : 'View details'\} <span aria-hidden="true">\{isDetailsOpen \? '−' : '\+'\}<\/span>/,
  '{isOpen ? \'Hide details −\' : \'View details +\'}'
);

code = code.replace(
  /\{isDetailsOpen && \(/,
  '{isOpen && ('
);

code = code.replace(
  /export function PortfolioSections\(\) \{/,
  'export function PortfolioSections() {\n  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);'
);

code = code.replace(
  /<ProjectCard key=\{project\.title\} project=\{project\} index=\{index\} \/>/,
  '<ProjectCard key={project.title} project={project} index={index} isOpen={expandedProjectIndex === index} onToggle={() => setExpandedProjectIndex(expandedProjectIndex === index ? null : index)} />'
);

fs.writeFileSync('src/components/PortfolioSections.tsx', code);
console.log('updated');
