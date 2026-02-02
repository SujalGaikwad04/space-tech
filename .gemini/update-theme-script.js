const fs = require('fs');
const path = require('path');

// Color mapping from hardcoded values to CSS variables
const colorMap = {
  // Backgrounds
  '#0a0e27': 'var(--bg-primary)',
  '#1a1f3a': 'var(--bg-secondary)',
  '#0d1b2a': 'var(--card-bg)',
  '#1b263b': 'var(--card-bg-hover)',
  '#000814': 'var(--footer-bg)',
  '#0a1929': 'var(--bg-primary)',
  '#1a2f4a': 'var(--bg-secondary)',
  '#0a1523': 'var(--card-bg)',
  'rgba(10, 25, 45, 0.85)': 'var(--card-bg)',
  'rgba(0, 0, 0, 0.8)': 'var(--card-bg)',
  'rgba(0, 0, 0, 0.4)': 'var(--card-bg)',
  
  // Text colors
  '#ffffff': 'var(--text-primary)',
  '#8cb4d8': 'var(--text-secondary)',
  '#6b7d94': 'var(--text-muted)',
  '#b8c5d6': 'var(--para-color)',
  '#e2e8f0': 'var(--text-primary)',
  '#cbd5e1': 'var(--text-secondary)',
  '#94a3b8': 'var(--text-secondary)',
  '#9be7ff': 'var(--text-secondary)',
  '#5c6b8f': 'var(--text-muted)',
  'white': 'var(--text-primary)',
  
  // Accent colors
  '#00d9ff': 'var(--accent-primary)',
  '#00a8cc': 'var(--accent-secondary)',
  '#0abde3': 'var(--accent-hover)',
  '#00ff88': 'var(--accent-success)',
  '#22d3ee': 'var(--accent-primary)',
  '#11c5f5': 'var(--accent-primary)',
  '#0da8d4': 'var(--accent-hover)',
  '#61dafb': 'var(--accent-primary)',
  
  // Danger colors
  '#ff4444': 'var(--danger-color)',
  '#ff6666': 'var(--danger-hover)',
  
  // Borders
  '#1b4965': 'var(--border-color-subtle)',
  '#1e2c40': 'var(--border-color-subtle)',
  'rgba(74, 158, 255, 0.3)': 'var(--border-color-subtle)',
  'rgba(74, 158, 255, 0.4)': 'var(--border-color-subtle)',
  'rgba(255, 255, 255, 0.1)': 'var(--border-color-subtle)',
  'rgba(255, 255, 255, 0.2)': 'var(--border-color-subtle)',
};

// Function to replace colors in content
function replaceColors(content) {
  let updatedContent = content;
  
  for (const [oldColor, newVar] of Object.entries(colorMap)) {
    const regex = new RegExp(oldColor.replace(/[()]/g, '\\$&'), 'gi');
    updatedContent = updatedContent.replace(regex, newVar);
  }
  
  return updatedContent;
}

// Function to recursively find all CSS files
function findCSSFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        findCSSFiles(filePath, fileList);
      }
    } else if (file.endsWith('.css')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main execution
const srcDir = path.join(__dirname, '..', 'src');
const cssFiles = findCSSFiles(srcDir);

console.log(`Found ${cssFiles.length} CSS files to update:\n`);

cssFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const updated = replaceColors(content);
    
    if (content !== updated) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`✅ Updated: ${path.relative(srcDir, file)}`);
    } else {
      console.log(`⏭️  Skipped: ${path.relative(srcDir, file)} (no changes needed)`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log('\n🎉 Theme conversion complete!');
