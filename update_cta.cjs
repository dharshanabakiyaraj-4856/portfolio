const fs = require('fs');
let code = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');

if (!code.includes('import { Link } from')) {
  code = code.replace(
    /import \{ useState \} from 'react'/,
    "import { useState } from 'react'\nimport { Link } from 'react-router-dom'"
  );
}

const ctaHtml = `
              {featuredOnly && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: 0.3 }}
                  style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
                >
                  <Link to="/projects" className="button button-primary">
                    <span>View All Projects ↗</span>
                  </Link>
                </motion.div>
              )}
`;

code = code.replace(
  /<\/ProjectsAnimation>\s*<\/div>\s*<\/section>/,
  '</ProjectsAnimation>' + ctaHtml + '</div></section>'
);

fs.writeFileSync('src/components/PortfolioSections.tsx', code);
