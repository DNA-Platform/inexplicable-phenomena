#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  pass: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  fail: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bold}${colors.cyan}${msg}${colors.reset}`),
  subsection: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`)
};

const libraryPath = '/home/doug/repos/eirians-library/inexplicable-phenomena/library';
const publicPath = path.join(libraryPath, '.public');

// Track all issues found
let issues = [];
let passes = 0;

function addIssue(type, file, message) {
  issues.push({ type, file, message });
}

function addPass() {
  passes++;
}

// Helper to read file safely
function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

// Helper to check if file exists
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

// Extract GitHub source link from HTML
function extractGitHubSource(htmlContent) {
  const match = htmlContent.match(/href="(https:\/\/github\.com\/[^"]+)"/);
  return match ? match[1] : null;
}

// Extract markdown web link from markdown header
function extractWebLink(markdownContent) {
  const match = markdownContent.match(/^# \[([^\]]+)\]\(([^)]+)\)/m);
  return match ? { title: match[1], url: match[2] } : null;
}

// Extract book/subject reference from markdown
function extractBookReference(markdownContent) {
  const bookMatch = markdownContent.match(/^- (?:book|Book): \[([^\]]+)\]\(([^)]+)\)/m);
  const subjectMatch = markdownContent.match(/^- (?:subject|Subject): \[([^\]]+)\]\(([^)]+)\)/m);
  
  if (bookMatch) return { type: 'book', title: bookMatch[1], path: bookMatch[2] };
  if (subjectMatch) return { type: 'subject', title: subjectMatch[1], path: subjectMatch[2] };
  return null;
}

// Extract book/subject reference from HTML header
function extractHTMLBookReference(htmlContent) {
  // Look for book-link in header
  const bookMatch = htmlContent.match(/<a href="([^"]+)" class="book-link">([^<]+)<\/a>/);
  if (!bookMatch) return null;
  
  // Determine if it's book or subject based on the label
  const isSubject = htmlContent.includes('<span class="book-label">Subject</span>');
  
  return {
    type: isSubject ? 'subject' : 'book',
    title: bookMatch[2],
    path: bookMatch[1]
  };
}

// Check compilation duality for a specific file pair
function checkCompilationDuality(mdPath, htmlPath) {
  const relativeMdPath = path.relative(libraryPath, mdPath);
  const relativeHtmlPath = path.relative(publicPath, htmlPath);
  
  log.subsection(`Checking: ${relativeMdPath} ↔ ${relativeHtmlPath}`);
  
  const mdContent = readFileSafe(mdPath);
  const htmlContent = readFileSafe(htmlPath);
  
  if (!mdContent) {
    addIssue('missing', mdPath, 'Markdown file not found');
    return;
  }
  
  if (!htmlContent) {
    addIssue('missing', htmlPath, 'HTML file not found');
    return;
  }
  
  // Check 1: Markdown title should point to web version
  const webLink = extractWebLink(mdContent);
  if (webLink) {
    // Convert relative HTML path to expected web URL
    const expectedWebUrl = `https://dna-platform.github.io/inexplicable-phenomena/${relativeHtmlPath}`;
    
    if (webLink.url === expectedWebUrl) {
      log.pass(`Markdown title points to correct web URL: ${webLink.url}`);
      addPass();
    } else {
      addIssue('mismatch', mdPath, 
        `Markdown title URL mismatch: expected "${expectedWebUrl}", got "${webLink.url}"`);
    }
  } else {
    addIssue('format', mdPath, 'Markdown missing proper title link format');
  }
  
  // Check 2: HTML title should point to GitHub source
  const githubSource = extractGitHubSource(htmlContent);
  if (githubSource) {
    const expectedGithubUrl = `https://github.com/DNA-Platform/inexplicable-phenomena/blob/main/${relativeMdPath}`;
    
    if (githubSource === expectedGithubUrl) {
      log.pass(`HTML title points to correct GitHub source: ${githubSource}`);
      addPass();
    } else {
      addIssue('mismatch', htmlPath,
        `HTML GitHub source mismatch: expected "${expectedGithubUrl}", got "${githubSource}"`);
    }
  } else {
    addIssue('format', htmlPath, 'HTML missing GitHub source link');
  }
  
  // Check 3: Book/Subject references should match
  const mdBookRef = extractBookReference(mdContent);
  const htmlBookRef = extractHTMLBookReference(htmlContent);
  
  if (mdBookRef && htmlBookRef) {
    if (mdBookRef.type === htmlBookRef.type && mdBookRef.title === htmlBookRef.title) {
      log.pass(`Book/Subject reference matches: ${mdBookRef.type} "${mdBookRef.title}"`);
      addPass();
      
      // Check that paths are equivalent (accounting for relative vs absolute)
      const mdRefPath = path.resolve(path.dirname(mdPath), mdBookRef.path);
      const htmlRefPath = htmlBookRef.path.startsWith('/') ? 
        path.join(publicPath, htmlBookRef.path) :
        path.resolve(path.dirname(htmlPath), htmlBookRef.path);
      
      // Convert both to relative paths from their respective roots for comparison
      const mdRelRef = path.relative(libraryPath, mdRefPath);
      const htmlRelRef = path.relative(publicPath, htmlRefPath);
      
      // Expected: .md in markdown should correspond to .html in HTML, but handle special cases
      let expectedHtmlRef = mdRelRef.replace(/\.md$/, '.html');
      
      // Special case: .dictionary.md should map to dictionary/dictionary.html
      if (expectedHtmlRef === 'dictionary/.dictionary.html') {
        expectedHtmlRef = 'dictionary/dictionary.html';
      }
      if (expectedHtmlRef === 'encyclopedia/.encyclopedia.html') {
        expectedHtmlRef = 'encyclopedia/encyclopedia.html';
      }
      
      if (htmlRelRef === expectedHtmlRef) {
        log.pass(`Book/Subject reference paths match correctly`);
        addPass();
      } else {
        addIssue('mismatch', htmlPath,
          `Book/Subject reference path mismatch: expected "${expectedHtmlRef}", got "${htmlRelRef}"`);
      }
    } else {
      addIssue('mismatch', htmlPath,
        `Book/Subject reference mismatch: MD has ${mdBookRef.type} "${mdBookRef.title}", HTML has ${htmlBookRef.type} "${htmlBookRef.title}"`);
    }
  } else if (mdBookRef && !htmlBookRef) {
    addIssue('missing', htmlPath, `HTML missing book/subject reference found in markdown`);
  } else if (!mdBookRef && htmlBookRef) {
    addIssue('extra', htmlPath, `HTML has book/subject reference not found in markdown`);
  }
  // If neither has book reference, that's okay - not all files need them
}

// Find all markdown-HTML pairs to check
function findFilePairs() {
  const pairs = [];
  
  // Manual pairs based on known structure
  const knownPairs = [
    ['index.md', '.public/index.html'],
    ['dictionary/.dictionary.md', '.public/dictionary/dictionary.html'],
    ['encyclopedia/.encyclopedia.md', '.public/encyclopedia/encyclopedia.html'],
    ['articles/.articles.md', '.public/articles/articles.html'],
    ['notebook/.notebook.md', '.public/notebook/notebook.html']
  ];
  
  for (const [mdRel, htmlRel] of knownPairs) {
    pairs.push([
      path.join(libraryPath, mdRel),
      path.join(libraryPath, htmlRel)
    ]);
  }
  
  // Find dictionary entries
  const dictPath = path.join(libraryPath, 'dictionary');
  const dictPublicPath = path.join(publicPath, 'dictionary');
  
  try {
    const dictFiles = fs.readdirSync(dictPath).filter(f => f.endsWith('.md') && f !== '.dictionary.md');
    for (const mdFile of dictFiles) {
      const htmlFile = mdFile.replace('.md', '.html');
      pairs.push([
        path.join(dictPath, mdFile),
        path.join(dictPublicPath, htmlFile)
      ]);
    }
  } catch (error) {
    log.warn(`Could not read dictionary directory: ${error.message}`);
  }
  
  // Find encyclopedia entries
  const encycPath = path.join(libraryPath, 'encyclopedia');
  const encycPublicPath = path.join(publicPath, 'encyclopedia');
  
  try {
    const encycFiles = fs.readdirSync(encycPath).filter(f => f.endsWith('.md') && f !== '.encyclopedia.md');
    for (const mdFile of encycFiles) {
      const htmlFile = mdFile.replace('.md', '.html');
      pairs.push([
        path.join(encycPath, mdFile),
        path.join(encycPublicPath, htmlFile)
      ]);
    }
  } catch (error) {
    log.warn(`Could not read encyclopedia directory: ${error.message}`);
  }
  
  return pairs;
}

// Check DNA Rose navigation in HTML files
function checkDNARoseNavigation() {
  log.section('🌹 Checking DNA Rose Navigation');
  
  function checkHTMLFile(htmlPath) {
    const content = readFileSafe(htmlPath);
    if (!content) return;
    
    const relPath = path.relative(publicPath, htmlPath);
    
    // Check for DNA rose icon
    const hasDNARose = content.includes('dna-rose-icon') && 
                      content.includes('https://www.dna.love/images/icons/dna-rose-g1-icon.png?v=2');
    
    if (hasDNARose) {
      log.pass(`${relPath}: DNA rose navigation present`);
      addPass();
      
      // Check if it points to the right index
      const indexMatch = content.match(/href="([^"]*index\.html)"/);
      if (indexMatch) {
        const indexPath = indexMatch[1];
        // Calculate expected relative path to index.html
        const depth = relPath.split('/').length - 1;
        const expectedPath = depth > 0 ? '../'.repeat(depth) + 'index.html' : 'index.html';
        
        if (indexPath === expectedPath) {
          log.pass(`${relPath}: DNA rose points to correct index (${indexPath})`);
          addPass();
        } else {
          addIssue('mismatch', htmlPath, 
            `DNA rose index link incorrect: expected "${expectedPath}", got "${indexPath}"`);
        }
      } else {
        addIssue('format', htmlPath, 'DNA rose missing index link');
      }
    } else {
      addIssue('missing', htmlPath, 'Missing DNA rose navigation');
    }
  }
  
  // Check all HTML files in .public
  function walkDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          walkDirectory(fullPath);
        } else if (item.endsWith('.html')) {
          checkHTMLFile(fullPath);
        }
      }
    } catch (error) {
      log.warn(`Could not read directory ${dir}: ${error.message}`);
    }
  }
  
  walkDirectory(publicPath);
}

// Main execution
function main() {
  log.section('🔍 Library Compilation Duality Sanity Check');
  log.info('Verifying markdown ↔ HTML compilation duality throughout the library\n');
  
  // Check file pairs
  log.section('📋 Checking File Pairs');
  const pairs = findFilePairs();
  
  for (const [mdPath, htmlPath] of pairs) {
    checkCompilationDuality(mdPath, htmlPath);
  }
  
  // Check DNA Rose navigation
  checkDNARoseNavigation();
  
  // Summary
  log.section('📊 Summary');
  
  if (issues.length === 0) {
    log.pass(`All ${passes} checks passed! Compilation duality is properly maintained.`);
  } else {
    log.fail(`Found ${issues.length} issues (${passes} checks passed):`);
    
    // Group issues by type
    const groupedIssues = {};
    for (const issue of issues) {
      if (!groupedIssues[issue.type]) groupedIssues[issue.type] = [];
      groupedIssues[issue.type].push(issue);
    }
    
    for (const [type, typeIssues] of Object.entries(groupedIssues)) {
      log.subsection(`${type.toUpperCase()} (${typeIssues.length}):`);
      for (const issue of typeIssues) {
        const relPath = issue.file.startsWith(libraryPath) ? 
          path.relative(libraryPath, issue.file) : issue.file;
        console.log(`  • ${relPath}: ${issue.message}`);
      }
    }
  }
  
  // Exit with appropriate code
  process.exit(issues.length > 0 ? 1 : 0);
}

main();