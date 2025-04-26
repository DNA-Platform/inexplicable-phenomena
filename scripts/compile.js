const fs = require('fs');
const path = require('path');
const { format } = require('./format.js');

function compileMarkdownFiles(dir, outputDir) {
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
        // Format the markdown content
        const formattedContent = format(content);
        
        // Write the formatted content to the output file
        const outputFilePath = path.join(outputDir, file);
        fs.writeFileSync(outputFilePath, formattedContent);
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
compileMarkdownFiles('.', releaseFolder);
