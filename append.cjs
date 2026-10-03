const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');
css = css.replace(/\x00/g, ''); // Strip null bytes if it's UTF-16 corrupted

const microInteractions = `
/* ========================================= */
/* MICRO-INTERACTIONS & HOVER EFFECTS        */
/* ========================================= */

.button { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease; }
.button:hover { transform: scale(1.02); }
.button span { display: inline-block; transition: transform 0.3s ease; }
.button:hover span { transform: translate(3px, -3px); }
.button-quiet:hover span { transform: translateY(3px); }

.project-card { position: relative; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
.project-card:hover { transform: translateY(-4px); }
.project-card .project-image img { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.project-card:hover .project-image img { transform: scale(1.03); }
.project-card .project-content h3 { transition: transform 0.3s ease; }
.project-card:hover .project-content h3 { transform: translateX(4px); }
.project-card .project-link span { display: inline-block; transition: transform 0.3s ease; }
.project-card:hover .project-link span { transform: translate(3px, -3px); }

.project-card::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;
  background: linear-gradient(135deg, rgba(27, 44, 54, 0) 0%, rgba(132, 147, 152, 0.05) 100%);
  opacity: 0; transition: opacity 0.4s ease; z-index: 5;
}
.project-card:hover::after { opacity: 1; }

.skill-category { transition: transform 0.3s ease, border-color 0.3s ease; }
.skill-category:hover { transform: translateY(-2px); border-color: var(--dusty-mauve); }
.skill-category:hover h3 { color: var(--dusty-mauve); }
.skill-category ul li { position: relative; transition: color 0.2s ease, transform 0.2s ease; }
.skill-category ul li:hover { color: var(--dusty-mauve); transform: translateX(3px); }
.skill-category ul li:hover::before { content: '→'; position: absolute; left: -15px; color: var(--dusty-mauve); font-size: 0.8rem; opacity: 0.6; }

.math-detail { position: absolute; font-family: var(--mono); font-style: italic; font-size: 14px; color: var(--muted-blue-grey); opacity: 0.1; pointer-events: none; z-index: 0; }
`;

fs.writeFileSync('src/App.css', css + '\n' + microInteractions);
console.log('Appended CSS');
