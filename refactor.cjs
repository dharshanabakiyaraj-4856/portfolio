const fs = require('fs');

const orig = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');

// I will extract the parts.
const projectCardRegex = /function ProjectCard\(\{[\s\S]*?^}/m;
const certCardRegex = /function CertificationCard\(\{[\s\S]*?^}/m;

// Better yet, I'll just rewrite PortfolioSections.tsx to export each section.
let newContent = orig.replace('export function PortfolioSections() {', 'export function PortfolioSections() { return null; }\n\nexport function AboutSection() {');
newContent = newContent.replace(/<section className="section" id="skills">/, '  </>\n  )\n}\n\nexport function SkillsSection() {\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n<section className="section" id="skills">');
newContent = newContent.replace(/<section className="section" id="projects">/, '  </>\n  )\n}\n\nexport function ProjectsSection({ featuredOnly = false }: { featuredOnly?: boolean }) {\n  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);\n  const projects = featuredOnly ? portfolioData.projects.slice(0, 1) : portfolioData.projects;\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n<section className="section" id="projects">');
newContent = newContent.replace(/portfolioData\.projects\.map/, 'projects.map');
newContent = newContent.replace(/<section className="section" id="experience">/, '  </>\n  )\n}\n\nexport function ExperienceSection() {\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n<section className="section" id="experience">');
newContent = newContent.replace(/<section className="section" id="achievements">/, '  </>\n  )\n}\n\nexport function AchievementsSection() {\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n<section className="section" id="achievements">');
newContent = newContent.replace(/<section className="section" id="education">/, '  </>\n  )\n}\n\nexport function EducationSection() {\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n<section className="section" id="education">');
newContent = newContent.replace(/<section className="section" id="certifications">/, '  </>\n  )\n}\n\nexport function CertificationsSection() {\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n<section className="section" id="certifications">');

// We also need to fix `const shouldReduceMotion = useReducedMotion()` and state in the original PortfolioSections function block that got left behind.
newContent = newContent.replace(/export function PortfolioSections\(\) \{\n\s*const \[expandedProjectIndex, setExpandedProjectIndex\] = useState<number \| null>\(null\);\n\s*const shouldReduceMotion = useReducedMotion\(\)\n\n\s*return \(\n\s*<>\n/, 'export function PortfolioSections() { return null; }\n\nexport function AboutSection() {\n  const shouldReduceMotion = useReducedMotion()\n  return (\n    <>\n');

fs.writeFileSync('src/components/PortfolioSections.tsx', newContent);
console.log('Refactored PortfolioSections.tsx');
