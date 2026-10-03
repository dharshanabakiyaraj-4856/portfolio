const fs = require('fs');
let code = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');

if (!code.includes('AnimatePresence')) {
  code = code.replace(/import \{ motion, useReducedMotion \} from 'framer-motion'/, "import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'");
}

const addMotion = (sectionName) => {
  const regex = new RegExp('export function ' + sectionName + '\\(\\)\\s*\\{', 'g');
  code = code.replace(regex, 'export function ' + sectionName + '() {\n  const shouldReduceMotion = useReducedMotion();');
};
addMotion('AboutSection');
addMotion('SkillsSection');
addMotion('ExperienceSection');
addMotion('AchievementsSection');
addMotion('EducationSection');
addMotion('CertificationsSection');
addMotion('PortfolioSections');

code = code.replace(/export function ProjectsSection\(\{ featuredOnly = false \}: \{ featuredOnly\?: boolean \}\) \{/, 'export function ProjectsSection({ featuredOnly = false }: { featuredOnly?: boolean }) {\n  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);\n  const shouldReduceMotion = useReducedMotion();');

code = code.replace(/function ProjectCard\(\{ project, index, isOpen, onToggle \}: \{ project: \(typeof portfolioData\.projects\)\[number\], index: number, isOpen: boolean, onToggle: \(\) => void \}\) \{/, 'function ProjectCard({ project, index, isOpen, onToggle }: { project: (typeof portfolioData.projects)[number], index: number, isOpen: boolean, onToggle: () => void }) {\n  const shouldReduceMotion = useReducedMotion();');
code = code.replace(/function CertificationCard\(\{ certification \}: \{ certification: \(typeof portfolioData\.certifications\)\[number\] \}\) \{/, 'function CertificationCard({ certification }: { certification: (typeof portfolioData.certifications)[number] }) {\n  const [isPreviewOpen, setIsPreviewOpen] = useState(false);\n  const shouldReduceMotion = useReducedMotion();');

fs.writeFileSync('src/components/PortfolioSections.tsx', code);
console.log('Fixed TS errors in PortfolioSections');
