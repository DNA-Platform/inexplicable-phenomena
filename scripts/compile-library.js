#!/usr/bin/env node
/**
 * Minimal Markdown to HTML Compiler script using ref.js utilities
 *
 * Script to convert all markdown files in the library directory to HTML files
 * in the library/.public directory, preserving the directory structure.
 */

const fs = require('fs');
const path = require('path');
const { format } = require('./compile-html'); // Use the existing format.js module
const ref = require('./ref'); // Use ref.js for consistent link handling

// Configuration (from ref.js)
const SOURCE_DIR = ref.CONFIG.SOURCE_DIR;
const TARGET_DIR = ref.CONFIG.PUBLIC_DIR;

// Function to find all markdown files in the library
function findMarkdownFiles(dir, files = []) {
  // Skip the target directory (public)
  if (dir.includes(TARGET_DIR)) {
    return files;
  }

  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // Recursively process subdirectories - ensure journal and notes are included
      findMarkdownFiles(fullPath, files);
    } else if (stats.isFile() && fullPath.endsWith('.md')) {
      // Check if this is a draft
      const content = fs.readFileSync(fullPath, 'utf8');
      const firstLine = content.split('\n')[0].trim().toLowerCase();
      
      if (firstLine !== '[draft]') {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

// Convert a markdown file to HTML
async function convertFile(mdFile) {
  // Generate the HTML output path using ref.js
  const htmlPath = ref.sourceToPublicPath(mdFile);
  
  console.log(`Converting: ${mdFile} → ${htmlPath}`);
  
  // Create directory if it doesn't exist
  const htmlDir = path.dirname(htmlPath);
  if (!fs.existsSync(htmlDir)) {
    fs.mkdirSync(htmlDir, { recursive: true });
  }
  
  // Use the format function to convert markdown to HTML
  await format(mdFile, htmlPath);
  
  if (fs.existsSync(htmlPath)) {
    console.log(`  Success: ${htmlPath}`);
    return true;
  } else {
    console.error(`  Failed: ${htmlPath}`);
    return false;
  }
}

// Main function
async function main() {
  try {
    console.log(`Starting conversion from ${SOURCE_DIR} to ${TARGET_DIR}`);
    
    // Find all markdown files
    const mdFiles = findMarkdownFiles(SOURCE_DIR);
    console.log(`Found ${mdFiles.length} markdown files to process`);
    
    // Process each file
    let successCount = 0;
    for (const mdFile of mdFiles) {
      const result = await convertFile(mdFile);
      if (result) successCount++;
    }
    
    console.log(`Conversion complete. Successfully converted ${successCount}/${mdFiles.length} files.`);
  } catch (error) {
    console.error(`Error during compilation: ${error.message}`);
    process.exit(1);
  }
}

// Only run the main function if this script is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(`Fatal error: ${error.message}`);
    process.exit(1);
  });
}