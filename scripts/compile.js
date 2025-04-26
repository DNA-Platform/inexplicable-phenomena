const fs = require('fs');
const path = require('path');
const { format } = require('./format');

// Configuration - Easy to modify
const SKIP_DIRECTORIES = ['node_modules', 'release']; // Directories to skip by name
const SKIP_FILES = ['README.md']; // Files to skip by name
const DOT_REGEX = /^\./; // Regex to match files/directories starting with a dot

// Define async compile function
async function compileMarkdownFiles(dir, outputDir, callback) {
  // Validate input
  if (!dir || !outputDir) {
    throw new Error('Both input and output directories must be specified');
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all files and directories in the current directory
  const files = fs.readdirSync(dir);

  // Process files with Promise.all for concurrent handling
  await Promise.all(files.map(async (file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // Skip files and directories that start with a dot
    if (DOT_REGEX.test(file)) {
      return; // Skip this file/directory
    }

    // Directory handling with filter patterns
    if (stats.isDirectory()) {
      // Skip directories in the skip list
      if (!SKIP_DIRECTORIES.includes(file)) {
        // Recursively compile markdown files in non-skipped subdirectories
        await compileMarkdownFiles(filePath, path.join(outputDir, file), callback);
      }
    } else if (stats.isFile() && path.extname(file).toLowerCase() === '.md') {
      // Skip specific files by name
      if (SKIP_FILES.includes(file)) {
        return; // Skip this file
      }
      
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
        await callback(inputFile, outputFile);
      }
    }
  }));
}

// Main function to run everything
async function main() {
  try {
    // Define release folder
    const releaseFolder = './release';
    
    // Clear the release folder if it exists
    if (fs.existsSync(releaseFolder)) {
      fs.rmSync(releaseFolder, { recursive: true });
    }

    // Compile markdown files
    await compileMarkdownFiles('.', releaseFolder, async (inputFile, outputFile) => {
      console.log(`Processing: ${inputFile} → ${outputFile}`);
      
      // Use the format function directly with input and output file paths
      await format(inputFile, outputFile);
      
      console.log(`Successfully converted ${inputFile} to ${outputFile}`);
    });
    
    console.log('All files processed successfully');
  } catch (error) {
    console.error('Error during compilation:', error);
    process.exit(1);
  }
}

// Call main only if this script is being run directly
if (require.main === module) {
  main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

// Export for use as a module
module.exports = { compileMarkdownFiles };