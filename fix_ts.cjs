const fs = require('fs');
let code = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');

if (!code.includes('AnimatePresence')) {
  code = code.replace(/import \{ motion, useReducedMotion \} from 'framer-motion'/, "import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'");
}

code = code.replace(/const shouldReduceMotion = useReducedMotion\(\)\n\s*return \(/g, 'return (');
code = code.replace(/const \[expandedProjectIndex, setExpandedProjectIndex\] = useState<number \| null>\(null\);/g, '');

fs.writeFileSync('src/components/PortfolioSections.tsx', code);

let pt = fs.readFileSync('src/pages/PageTransition.tsx', 'utf8');
pt = pt.replace(/import \{ ReactNode \} from 'react'/, "import type { ReactNode } from 'react'");
fs.writeFileSync('src/pages/PageTransition.tsx', pt);
console.log('Fixed TS Errors');
