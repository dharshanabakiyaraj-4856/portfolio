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
    content = content.replace(/--deep-slate/g, '--deep-navy');
    content = content.replace(/--soft-blush/g, '--off-white');
    content = content.replace(/--muted-blue-grey/g, '--soft-lavender');
    // dusty-mauve was used for data curves, ML clustering, hover paths, etc.
    // It maps perfectly to electric-sky-blue as per "ML/data visualizations, Animation curves, Data points"
    content = content.replace(/--dusty-mauve/g, '--electric-sky-blue');
    
    // Hex code replacements if any exist inline (from old to new)
    content = content.replace(/#1B2C36/gi, '#101827');
    content = content.replace(/#9E7476/gi, '#5B9CFF');
    content = content.replace(/#D3B5B3/gi, '#F4F6FA');
    content = content.replace(/#849398/gi, '#B9B7FF');
    
    // Specific updates for App.css
    if (f === 'src/App.css') {
      // 1. Royal blue buttons
      content = content.replace(
        /\.button-primary \{ background: var\(--text-main\); color: var\(--bg-color\) !important; border-color: var\(--text-main\); \}/,
        '.button-primary { background: var(--royal-blue); color: var(--off-white) !important; border-color: var(--royal-blue); }'
      );
      content = content.replace(
        /\.button-primary:hover \{ background: transparent; color: var\(--text-main\) !important; \}/,
        '.button-primary:hover { background: transparent; color: var(--royal-blue) !important; }'
      );
      content = content.replace(
        /\.button-quiet:hover \{ background: var\(--text-main\); color: var\(--bg-color\) !important; \}/,
        '.button-quiet:hover { background: var(--royal-blue); color: var(--off-white) !important; }'
      );

      // 2. Nav links active state -> Royal Blue
      content = content.replace(
        /\.nav-links a\.active \{ color: var\(--dusty-mauve\);/,
        '.nav-links a.active { color: var(--royal-blue);'
      );
      content = content.replace(
        /\.nav-links a\.active \{ color: var\(--electric-sky-blue\);/, // In case the regex already matched dusty-mauve
        '.nav-links a.active { color: var(--royal-blue);'
      );

      // 3. Links -> Royal blue
      content = content.replace(
        /\.social-links a:hover, \.text-link:hover, \.card-links a:hover \{ opacity: 1; \}/,
        '.social-links a:hover, .text-link:hover, .card-links a:hover { opacity: 1; color: var(--royal-blue); }'
      );
    }
    
    // Specific updates for index.css
    if (f === 'src/index.css') {
      content = content.replace(/#1B2C36/gi, '#101827'); // ensure
      content = content.replace(
        /--deep-navy: #1B2C36;/gi, 
        '--deep-navy: #101827;'
      );
      content = content.replace(
        /--electric-sky-blue: #9E7476;/gi,
        '--royal-blue: #3157D5;\n  --electric-sky-blue: #5B9CFF;'
      );
      content = content.replace(
        /--off-white: #D3B5B3;/gi,
        '--off-white: #F4F6FA;'
      );
      content = content.replace(
        /--soft-lavender: #849398;/gi,
        '--soft-lavender: #B9B7FF;'
      );
      
      // Fix accent color fallback if needed
      content = content.replace(/--accent-color: var\(--electric-sky-blue\);/g, '--accent-color: var(--royal-blue);');
    }

    fs.writeFileSync(f, content);
  }
});
console.log('Colors replaced successfully');
