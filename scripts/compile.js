const fs = require('fs');
const path = require('path');
const { format, transformToWebFriendlyName } = require('./format');

// Configuration - Easy to modify
const SKIP_DIRECTORIES = ['node_modules', 'release', '.release']; // Directories to skip by name
const SKIP_FILES = ['README.md']; // Files to skip by name
const SOURCE_DIR = 'research'; // Only look for markdown in this directory

// Function to recursively remove empty directories
function removeEmptyDirectories(directory) {
  // Skip if directory doesn't exist
  if (!fs.existsSync(directory)) {
    console.log(`Directory does not exist, skipping: ${directory}`);
    return;
  }

  console.log(`Checking directory for emptiness: ${directory}`);
  
  // Get all items in the directory
  let items = fs.readdirSync(directory);
  console.log(`Directory ${directory} has ${items.length} items`);
  
  // Process all subdirectories first
  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
      console.log(`Found subdirectory: ${fullPath}`);
      removeEmptyDirectories(fullPath);
    }
  }
  
  // Check if directory is now empty (after processing subdirectories)
  items = fs.readdirSync(directory);
  if (items.length === 0) {
    console.log(`Removing empty directory: ${directory}`);
    fs.rmdirSync(directory);
  } else {
    console.log(`Directory not empty, keeping: ${directory} (${items.length} items)`);
  }
}

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
        console.log(`Found non-draft file: ${filePath}`);
        return true; // Found a non-draft markdown file
      } else {
        console.log(`Skipping draft file: ${filePath}`);
      }
    }
  }
  
  console.log(`No non-draft markdown files found in: ${dir}`);
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

    // Directory handling with filter patterns
    if (stats.isDirectory()) {
      // Skip directories in the skip list
      if (!SKIP_DIRECTORIES.includes(file)) {
        // Transform the directory name to be web-friendly
        const webFriendlyDirName = transformToWebFriendlyName(file);
        
        // Recursively compile markdown files in non-skipped subdirectories
        await compileMarkdownFiles(filePath, path.join(outputDir, webFriendlyDirName), callback);
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
      console.log(`Checking if file is draft: ${filePath}, first line: "${firstLine}"`);
      if (firstLine !== '[draft]') {
        // Construct input and output file paths
        const inputFile = filePath;
        
        // Transform the filename to be web-friendly
        const baseName = path.basename(file, '.md');
        const webFriendlyBaseName = transformToWebFriendlyName(baseName);
        const outputFile = path.join(outputDir, webFriendlyBaseName + '.html');
        
        console.log(`Processing non-draft file: ${inputFile} -> ${outputFile}`);
        // Call the callback function with input and output file paths
        await callback(inputFile, outputFile);
      } else {
        console.log(`Skipping draft file: ${filePath}`);
      }
    }
  }));
}

// Function to transform paths from research to release
function transformPath(inputPath) {
  // Replace 'research' with 'release' in the path
  let outputPath = inputPath.replace(/^research/, 'release');
  
  // Split the path into segments
  const segments = outputPath.split(path.sep);
  
  // Process each segment to make it web-friendly
  const processedSegments = segments.map(segment => {
    // Skip the 'release' segment itself
    if (segment === 'release') return segment;
    
    // If it's a file with extension, process the basename and keep the extension
    if (segment.includes('.')) {
      const ext = path.extname(segment);
      const base = path.basename(segment, ext);
      return transformToWebFriendlyName(base) + ext;
    }
    
    // Otherwise just transform the segment
    return transformToWebFriendlyName(segment);
  });
  
  // Rejoin the segments
  return processedSegments.join(path.sep);
}

// Main function to run everything
async function main() {
  try {
    // Define release folders
    const releaseFolder = './release';
    const tempReleaseFolder = './.release';
    
    // Check if source directory exists
    if (!fs.existsSync(SOURCE_DIR)) {
      console.log(`Source directory '${SOURCE_DIR}' does not exist. Creating it...`);
      fs.mkdirSync(SOURCE_DIR, { recursive: true });
    }
    
    // Clear the temp release folder if it exists
    if (fs.existsSync(tempReleaseFolder)) {
      fs.rmSync(tempReleaseFolder, { recursive: true });
    }
    
    // Create the temporary release folder
    fs.mkdirSync(tempReleaseFolder, { recursive: true });
    console.log(`Created temporary directory: ${tempReleaseFolder}`);

    // Compile markdown files to the temporary directory - only from the research folder
    await compileMarkdownFiles(SOURCE_DIR, tempReleaseFolder, async (inputFile, outputFile) => {
      // Transform the output path
      const transformedOutputFile = transformPath(outputFile);
      console.log(`Processing: ${inputFile} → ${transformedOutputFile}`);
      
      // Ensure the directory for the output file exists
      const outputDir = path.dirname(transformedOutputFile);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Use the format function directly with input and output file paths
      await format(inputFile, transformedOutputFile);
      
      console.log(`Successfully converted ${inputFile} to ${transformedOutputFile}`);
    });
    
    // If we get here, compilation was successful
    console.log('All files processed successfully');
    
    // Debug: List all files in the temporary release folder
    console.log('Files in temporary release folder:');
    function listFilesRecursively(dir, indent = '') {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
          console.log(`${indent}Directory: ${fullPath}`);
          listFilesRecursively(fullPath, indent + '  ');
        } else {
          console.log(`${indent}File: ${fullPath}`);
        }
      }
    }
    listFilesRecursively(tempReleaseFolder);
    
    // Remove empty directories from the temporary release folder
    console.log('Removing empty directories from temporary release folder...');
    // Make sure we're only removing empty directories within the temp folder, not the folder itself
    const tempItems = fs.readdirSync(tempReleaseFolder);
    for (const item of tempItems) {
      const fullPath = path.join(tempReleaseFolder, item);
      if (fs.statSync(fullPath).isDirectory()) {
        // Check if this is the scripts directory
        if (item === 'scripts') {
          console.log(`Checking scripts directory: ${fullPath}`);
          // If it's empty, remove it directly
          const scriptItems = fs.readdirSync(fullPath);
          if (scriptItems.length === 0) {
            console.log(`Removing empty scripts directory: ${fullPath}`);
            fs.rmdirSync(fullPath);
          }
        } else {
          removeEmptyDirectories(fullPath);
        }
      }
    }
    
    // COMMENTED OUT: Replace the old release folder with the new one
    // if (fs.existsSync(releaseFolder)) {
    //   console.log('Removing old release folder...');
    //   fs.rmSync(releaseFolder, { recursive: true });
    // }
    
    console.log('SKIPPING: Moving temporary release folder to final location...');
    // fs.renameSync(tempReleaseFolder, releaseFolder);
    console.log('Keeping temporary release folder for inspection at: ' + tempReleaseFolder);
    
    // Verify the release folder contents
    console.log('Files in final release folder:');
    listFilesRecursively(releaseFolder);
    
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
