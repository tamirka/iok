const fs = require('fs');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function processFile(filePath, arrayName) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find the array definition
  const regex = new RegExp(`(export\\s+const\\s+${arrayName}\\s*=\\s*\\[)([\\s\\S]*?)(\\];)`);
  const match = content.match(regex);
  
  if (match) {
    let arrayContent = match[2];
    
    // We can use a regex to find name: "..." and insert slug: "..." after it
    arrayContent = arrayContent.replace(/name:\s*"([^"]+)",/g, (match, name) => {
      return `${match}\n    slug: "${slugify(name)}",`;
    });
    
    content = content.replace(regex, `$1${arrayContent}$3`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Array ${arrayName} not found in ${filePath}`);
  }
}

processFile('src/pages/Tools.tsx', 'toolsData');
processFile('src/pages/Templates.tsx', 'templatesData');
