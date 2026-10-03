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
    content = content.replace(/--graphite/g, '--ink-black');
    content = content.replace(/--text-dark/g, '--dark-text');
    content = content.replace(/--cobalt/g, '--burnt-saffron');
    content = content.replace(/--ice-blue/g, '--pale-mint');
    content = content.replace(/--light-bg/g, '--bone');
    content = content.replace(/--steel/g, '--warm-grey');
    
    // Hex code replacements if any exist inline (from old to new)
    content = content.replace(/#111318/gi, '#171716');
    content = content.replace(/#171A21/gi, '#242321');
    content = content.replace(/#4169E1/gi, '#C96F3B');
    content = content.replace(/#A9D6FF/gi, '#B8D8C8');
    content = content.replace(/#F5F7FA/gi, '#EEE9DF');
    content = content.replace(/#6F7785/gi, '#817C72');

    // Specific updates for App.css RGB
    if (f === 'src/App.css') {
      // old graphite rgb(17, 19, 24) -> ink black rgb(23, 23, 22)
      content = content.replace(/17,\s*19,\s*24/g, '23, 23, 22'); 
      
      // old ice blue rgb(169, 214, 255) -> pale mint rgb(184, 216, 200)
      content = content.replace(/169,\s*214,\s*255/g, '184, 216, 200'); 
      
      // old light bg rgb(245, 247, 250) -> bone rgb(238, 233, 223)
      content = content.replace(/245,\s*247,\s*250/g, '238, 233, 223'); 
      
      // old steel rgb(111, 119, 133) -> warm grey rgb(129, 124, 114)
      content = content.replace(/111,\s*119,\s*133/g, '129, 124, 114'); 
    }

    fs.writeFileSync(f, content);
  }
});
console.log('Colors replaced successfully');
