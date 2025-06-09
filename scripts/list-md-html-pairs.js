/**
 * This script finds all Markdown files in the library directory and their
 * corresponding HTML files in the .public directory.
 * 
 * It helps verify compiler duality by showing:
 * 1. MD files that don't have HTML counterparts
 * 2. HTML files that don't have MD counterparts
 * 3. Paired files that may need verification
 */

const fs = require('fs');
const path = require('path');

// Path to the library directory
const LIBRARY_DIR = path.join(__dirname, '..', 'library');
const PUBLIC_DIR = path.join(LIBRARY_DIR, '.public');

// Function to clean names for web (based on protocol)
function cleanNameForWeb(name) {
  // Remove leading periods
  if (name.startsWith('.')) {
    name = name.substring(1);
  }

  // Remove leading numbers and hyphens (like "1 - " or "2.3 - ")
  name = name.replace(/^(\d+(\.\d+)?\s*-\s*)/i, '');

  // Replace ampersands
  name = name.replace(/&/g, 'and');

  // Remove spaces around hyphens
  name = name.replace(/\s*-\s*/g, '-');

  // Replace remaining spaces with hyphens
  name = name.replace(/\s+/g, '-');

  return name.toLowerCase();
}

// Function to convert MD path to HTML path
function mdToHtmlPath(mdPath) {
  // Get relative path from library
  const relPath = path.relative(LIBRARY_DIR, mdPath);
  
  // Split into directory and filename
  const dir = path.dirname(relPath);
  const file = path.basename(relPath);
  
  // Apply transformations
  let htmlFile = cleanNameForWeb(file);
  
  // Change extension to .html
  if (htmlFile.endsWith('.md')) {
    htmlFile = htmlFile.slice(0, -3) + '.html';
  } else {
    htmlFile = htmlFile + '.html';
  }
  
  // Apply transformations to directory parts
  const dirParts = dir.split(path.sep);
  const cleanedDirParts = dirParts.map(part => cleanNameForWeb(part));
  
  // Recombine
  const htmlRelPath = path.join(...cleanedDirParts, htmlFile);
  
  // Create full path in .public
  return path.join(PUBLIC_DIR, htmlRelPath);
}

// Function to recursively find all MD files
function findMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip .public directory
      if (file !== '.public') {
        findMdFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to check if HTML files exist without MD counterparts
function findOrphanedHtmlFiles(dir, mdFiles, orphanList = []) {
  // Skip if dir doesn't exist
  if (!fs.existsSync(dir)) return orphanList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findOrphanedHtmlFiles(filePath, mdFiles, orphanList);
    } else if (file.endsWith('.html')) {
      // Check if this HTML file has an MD counterpart
      const relPath = path.relative(PUBLIC_DIR, filePath);
      
      // Try to find MD file that would map to this HTML
      const hasMdFile = mdFiles.some(mdFile => {
        const expectedHtmlPath = mdToHtmlPath(mdFile);
        return expectedHtmlPath === filePath;
      });
      
      if (!hasMdFile) {
        orphanList.push(filePath);
      }
    }
  });
  
  return orphanList;
}

// Main execution
try {
  console.log('Analyzing MD-HTML file pairs...\n');
  
  // Find all MD files
  const mdFiles = findMdFiles(LIBRARY_DIR);
  console.log(`Found ${mdFiles.length} Markdown files\n`);
  
  // Check each MD file for HTML counterpart
  const pairs = [];
  const missingHtml = [];
  
  mdFiles.forEach(mdFile => {
    const expectedHtmlPath = mdToHtmlPath(mdFile);
    
    if (fs.existsSync(expectedHtmlPath)) {
      pairs.push({ md: mdFile, html: expectedHtmlPath });
    } else {
      missingHtml.push({ md: mdFile, expected: expectedHtmlPath });
    }
  });
  
  // Find orphaned HTML files
  const orphanedHtml = findOrphanedHtmlFiles(PUBLIC_DIR, mdFiles);
  
  // Report results
  console.log('====== SUMMARY ======');
  console.log(`Total MD files: ${mdFiles.length}`);
  console.log(`MD-HTML pairs: ${pairs.length}`);
  console.log(`MD files without HTML: ${missingHtml.length}`);
  console.log(`HTML files without MD: ${orphanedHtml.length}\n`);
  
  if (missingHtml.length > 0) {
    console.log('====== MD FILES WITHOUT HTML ======');
    missingHtml.forEach(item => {
      console.log(`MD: ${path.relative(LIBRARY_DIR, item.md)}`);
      console.log(`Expected HTML: ${path.relative(PUBLIC_DIR, item.expected)}`);
      console.log('---');
    });
    console.log('\n');
  }
  
  if (orphanedHtml.length > 0) {
    console.log('====== HTML FILES WITHOUT MD ======');
    orphanedHtml.forEach(htmlFile => {
      console.log(`HTML: ${path.relative(PUBLIC_DIR, htmlFile)}`);
      console.log('---');
    });
    console.log('\n');
  }
  
  console.log('====== PAIRED FILES ======');
  pairs.forEach(pair => {
    console.log(`MD: ${path.relative(LIBRARY_DIR, pair.md)}`);
    console.log(`HTML: ${path.relative(PUBLIC_DIR, pair.html)}`);
    console.log('---');
  });
  
} catch (error) {
  console.error('Error analyzing files:', error);
}