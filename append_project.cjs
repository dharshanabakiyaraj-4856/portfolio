const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf8');

const projectInteractions = `
.project-card:hover .project-hover-path { opacity: 0.6 !important; }
.project-card:hover .tag-list li { color: var(--dusty-mauve); border-color: var(--dusty-mauve); background: rgba(158, 116, 118, 0.05); }
.project-card-title { transition: transform 0.3s ease; }
.project-card:hover .project-card-title { transform: translateY(-4px) !important; }
.project-content { position: relative; z-index: 2; }
`;

fs.writeFileSync('src/App.css', css + '\n' + projectInteractions);
console.log('Appended CSS');
