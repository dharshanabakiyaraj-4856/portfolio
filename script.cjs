const fs = require('fs');

let ts = fs.readFileSync('src/data/portfolioData.ts', 'utf8');
ts = ts.replace(/export interface ExperienceItem \{/g, 'export interface ExperienceItem {\n  imageUrl?: string\n');
ts = ts.replace(/company: 'Litz Tech', description: undefined, responsibilities:/g, "company: 'Litz Tech', imageUrl: certInternship, description: undefined, responsibilities:");
fs.writeFileSync('src/data/portfolioData.ts', ts);

let pSec = fs.readFileSync('src/components/PortfolioSections.tsx', 'utf8');
pSec = pSec.replace(/\{item\.technologies && \(/g, '{item.imageUrl && (\n                    <div style={{marginTop: "15px", marginBottom: "15px"}}>\n                      <img src={item.imageUrl} alt="Certificate" style={{maxWidth:"100%", height:"auto", borderRadius:"4px", border:"1px solid var(--line-color)", marginBottom:"10px"}} />\n                      <br/><a href={item.imageUrl} target="_blank" className="button button-quiet">View Certificate ?</a>\n                    </div>\n                  )}\n                  {item.technologies && (');
fs.writeFileSync('src/components/PortfolioSections.tsx', pSec);
