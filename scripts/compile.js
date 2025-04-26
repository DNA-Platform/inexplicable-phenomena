const fs = require('fs');
const path = require('path');
const path = require('path');
const { format } = require('./format.js');

function compileMarkdownFiles(dir, outputDir, callback) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all files and directories in the current directory
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // Skip directories that begin with "."
    if (stats.isDirectory() && !file.startsWith('.')) {
      // Recursively compile markdown files in subdirectories
      compileMarkdownFiles(filePath, path.join(outputDir, file));
    } else if (stats.isFile() && path.extname(file).toLowerCase() === '.md') {
      // Read the markdown file
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if the file is a draft
      const lines = content.split('\n');
      const firstLine = lines[0].trim().toLowerCase();
      if (firstLine !== '[draft]') {
        // Construct input and output file paths
        const inputFile = filePath;
        const outputFile = path.join(outputDir, file.replace(/\.md$/, '.html'));
        
        // Call the callback function with input and output file paths
        callback(inputFile, outputFile);
      }
    }
  });
}

// Clear the release folder
const releaseFolder = './release';
if (fs.existsSync(releaseFolder)) {
  fs.rmSync(releaseFolder, { recursive: true });
}

// Compile markdown files
compileMarkdownFiles('.', releaseFolder, (inputFile, outputFile) => {
  // Convert markdown to HTML using format function
  const markdown = fs.readFileSync(inputFile, 'utf8');
  const html = format(markdown);
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputFile);
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Write the HTML file
  fs.writeFileSync(outputFile, html, 'utf8');
  
  console.log(`Successfully converted ${inputFile} to ${outputFile}`);
});
