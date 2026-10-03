const fs = require('fs');
const files = [
  'src/App.css', 
  'src/index.css', 
  'src/components/Hero.tsx', 
  'src/components/PortfolioSections.tsx', 
  'src/components/Navbar.tsx', 
  'src/components/Contact.tsx', 
  'src/components/SectionAnimations.tsx', 
  'src/components/SkillsAnimation.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');

    // Rename variables
    content = content.replace(/--deep-navy/g, '--graphite');
    content = content.replace(/--royal-blue/g, '--cobalt');
    content = content.replace(/--electric-sky-blue/g, '--ice-blue');
    content = content.replace(/--off-white/g, '--light-bg');
    content = content.replace(/--soft-lavender/g, '--steel');
    
    // Hex code replacements if any exist inline (from old to new)
    content = content.replace(/#101827/gi, '#111318');
    content = content.replace(/#3157D5/gi, '#4169E1');
    content = content.replace(/#5B9CFF/gi, '#A9D6FF');
    content = content.replace(/#F4F6FA/gi, '#F5F7FA');
    content = content.replace(/#B9B7FF/gi, '#6F7785');

    // Specific updates for index.css
    if (f === 'src/index.css') {
      content = content.replace(
        /--graphite: #111318;/gi, 
        '--graphite: #111318;\n  --text-dark: #171A21;'
      );
    }
    
    // RGB replacements in App.css
    if (f === 'src/App.css') {
      // old deep navy
      content = content.replace(/16,\s*24,\s*39/g, '17, 19, 24'); // graphite
      
      // old electric sky blue
      content = content.replace(/91,\s*156,\s*255/g, '169, 214, 255'); // ice blue
      
      // old off white
      content = content.replace(/244,\s*246,\s*250/g, '245, 247, 250'); // light bg
      
      // old soft lavender
      content = content.replace(/185,\s*183,\s*255/g, '111, 119, 133'); // steel
      
      // Fix text colors for light backgrounds
      content = content.replace(/--text-main: var\(--graphite\);/g, '--text-main: var(--text-dark);');
      content = content.replace(/--text-heading: var\(--graphite\);/g, '--text-heading: var(--text-dark);');
      content = content.replace(/--text-meta: var\(--graphite\);/g, '--text-meta: var(--text-dark);');
    }

    fs.writeFileSync(f, content);
  }
});
console.log('Colors replaced successfully');
