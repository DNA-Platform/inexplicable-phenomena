const fs = require('fs');
const path = require('path');
const { format } = require('./format');

// Configuration - Easy to modify
const SKIP_DIRECTORIES = ['node_modules', 'release']; // Directories to skip by name
const SKIP_FILES = ['README.md']; // Files to skip by name
const DOT_REGEX = /^\./; // Regex to match files/directories starting with a dot

// Helper function to check if a directory contains any non-draft markdown files
async function directoryHasNonDraftFiles(dir) {
  // Skip if directory doesn't exist or is in skip list
  if (!fs.existsSync(dir) || SKIP_DIRECTORIES.includes(path.basename(dir))) {
    return false;
  }

  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    // Skip files and directories that start with a dot
    if (DOT_REGEX.test(file)) {
      continue;
    }
    
    // Check subdirectories recursively
    if (stats.isDirectory()) {
      if (!SKIP_DIRECTORIES.includes(file)) {
        if (await directoryHasNonDraftFiles(filePath)) {
          return true;
        }
      }
    } else if (stats.isFile() && path.extname(file).toLowerCase() === '.md') {
      // Skip specific files by name
      if (SKIP_FILES.includes(file)) {
        continue;
      }
      
      // Read the markdown file
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if the file is a draft
      const lines = content.split('\n');
      const firstLine = lines[0].trim().toLowerCase();
      if (firstLine !== '[draft]') {
        return true; // Found a non-draft markdown file
      }
    }
  }
  
  return false; // No non-draft markdown files found
}

// Define async compile function
async function compileMarkdownFiles(dir, outputDir, callback) {
  // Validate input
  if (!dir || !outputDir) {
    throw new Error('Both input and output directories must be specified');
  }

  // Check if this directory contains any non-draft markdown files
  // (either directly or in subdirectories)
  const hasNonDraftFiles = await directoryHasNonDraftFiles(dir);
  
  // Only create output directory if there are non-draft files to process
  if (hasNonDraftFiles && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  } else if (!hasNonDraftFiles) {
    return; // Skip this directory entirely if it has no non-draft files
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
    // Define release folders
    const releaseFolder = './release';
    const tempReleaseFolder = './.release';
    
    // Clear the temp release folder if it exists
    if (fs.existsSync(tempReleaseFolder)) {
      fs.rmSync(tempReleaseFolder, { recursive: true });
    }

    // Compile markdown files to the temporary directory
    await compileMarkdownFiles('.', tempReleaseFolder, async (inputFile, outputFile) => {
      console.log(`Processing: ${inputFile} → ${outputFile}`);
      
      // Use the format function directly with input and output file paths
      await format(inputFile, outputFile);
      
      console.log(`Successfully converted ${inputFile} to ${outputFile}`);
    });
    
    // If we get here, compilation was successful
    console.log('All files processed successfully');
    
    // Replace the old release folder with the new one
    if (fs.existsSync(releaseFolder)) {
      console.log('Removing old release folder...');
      fs.rmSync(releaseFolder, { recursive: true });
    }
    
    console.log('Moving temporary release folder to final location...');
    fs.renameSync(tempReleaseFolder, releaseFolder);
    
    console.log('Release completed successfully');
  } catch (error) {
    console.error('Error during compilation:', error);
    
    // Clean up temp directory on error
    const tempReleaseFolder = './.release';
    if (fs.existsSync(tempReleaseFolder)) {
      console.log('Cleaning up temporary release folder due to error...');
      fs.rmSync(tempReleaseFolder, { recursive: true });
    }
    
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
