#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getAllMarkdownFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      getAllMarkdownFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function getExpectedHtmlPath(mdPath) {
  // Convert markdown path to expected HTML path
  // /library/something.md -> /.public/something.html
  // /library/dictionary/.dictionary.md -> /.public/dictionary/dictionary.html
  
  const relativePath = path.relative(path.join(__dirname, '../library'), mdPath);
  const dir = path.dirname(relativePath);
  const filename = path.basename(relativePath, '.md');
  
  // Handle dot-prefixed files (like .dictionary.md -> dictionary.html)
  const htmlFilename = filename.startsWith('.') ? filename.substring(1) + '.html' : filename + '.html';
  
  const htmlPath = path.join(__dirname, '../library/.public', dir, htmlFilename);
  return htmlPath;
}

function checkLinkCompilationProtocol(mdPath, htmlPath) {
  const issues = [];
  
  try {
    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract the title link from markdown (first line)
    const mdLines = mdContent.split('\n');
    const titleLine = mdLines[0];
    
    if (titleLine.startsWith('# [')) {
      const titleMatch = titleLine.match(/# \[([^\]]+)\]\(([^)]+)\)/);
      if (titleMatch) {
        const [, title, link] = titleMatch;
        
        // Check if HTML has corresponding title link
        const htmlTitlePattern = new RegExp(`<h1[^>]*><a href="([^"]+)"[^>]*>${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</a></h1>`);
        const htmlMatch = htmlContent.match(htmlTitlePattern);
        
        if (!htmlMatch) {
          issues.push(`HTML missing title link for "${title}"`);
        } else {
          const htmlLink = htmlMatch[1];
          // Verify the link compilation protocol
          if (link !== htmlLink) {
            issues.push(`Link mismatch: MD="${link}" vs HTML="${htmlLink}"`);
          }
        }
      }
    }
    
    // Check for proper dot removal in internal links
    const dotLinkPattern = /\[([^\]]+)\]\(([^)]*\.[a-z]+\.md[^)]*)\)/g;
    let match;
    while ((match = dotLinkPattern.exec(mdContent)) !== null) {
      const [, linkText, linkPath] = match;
      issues.push(`Markdown contains dot-prefixed link that should be compiled: "${linkPath}"`);
    }
    
  } catch (error) {
    issues.push(`Error reading files: ${error.message}`);
  }
  
  return issues;
}

function main() {
  console.log('🔍 Scanning for MD-HTML pairs and link compilation protocol...\n');
  
  const libraryDir = path.join(__dirname, '../library');
  const markdownFiles = getAllMarkdownFiles(libraryDir);
  
  const results = {
    total: markdownFiles.length,
    withHtml: 0,
    missingHtml: [],
    linkIssues: [],
    verified: []
  };
  
  for (const mdPath of markdownFiles) {
    const expectedHtmlPath = getExpectedHtmlPath(mdPath);
    const relativeMdPath = path.relative(libraryDir, mdPath);
    const relativeHtmlPath = path.relative(path.join(libraryDir, '.public'), expectedHtmlPath);
    
    if (fs.existsSync(expectedHtmlPath)) {
      results.withHtml++;
      
      // Check link compilation protocol
      const linkIssues = checkLinkCompilationProtocol(mdPath, expectedHtmlPath);
      if (linkIssues.length > 0) {
        results.linkIssues.push({
          md: relativeMdPath,
          html: relativeHtmlPath,
          issues: linkIssues
        });
      } else {
        results.verified.push({
          md: relativeMdPath,
          html: relativeHtmlPath
        });
      }
    } else {
      results.missingHtml.push({
        md: relativeMdPath,
        expectedHtml: relativeHtmlPath
      });
    }
  }
  
  // Report results
  console.log(`📊 SCAN RESULTS:`);
  console.log(`   Total markdown files: ${results.total}`);
  console.log(`   With HTML equivalents: ${results.withHtml}`);
  console.log(`   Missing HTML: ${results.missingHtml.length}`);
  console.log(`   Link protocol verified: ${results.verified.length}`);
  console.log(`   Link protocol issues: ${results.linkIssues.length}\n`);
  
  if (results.missingHtml.length > 0) {
    console.log('❌ MISSING HTML FILES:');
    for (const missing of results.missingHtml) {
      console.log(`   ${missing.md} → ${missing.expectedHtml}`);
    }
    console.log();
  }
  
  if (results.linkIssues.length > 0) {
    console.log('⚠️  LINK COMPILATION ISSUES:');
    for (const issue of results.linkIssues) {
      console.log(`   ${issue.md}:`);
      for (const problem of issue.issues) {
        console.log(`     • ${problem}`);
      }
    }
    console.log();
  }
  
  if (results.verified.length > 0) {
    console.log('✅ VERIFIED MD-HTML PAIRS WITH CORRECT LINK PROTOCOL:');
    for (const verified of results.verified.slice(0, 10)) { // Show first 10
      console.log(`   ${verified.md} ↔ ${verified.html}`);
    }
    if (results.verified.length > 10) {
      console.log(`   ... and ${results.verified.length - 10} more`);
    }
    console.log();
  }
  
  // Special check for dot-prefixed files
  console.log('🔧 DOT-PREFIXED FILE COMPILATION CHECK:');
  const dotFiles = markdownFiles.filter(f => path.basename(f).startsWith('.'));
  for (const dotFile of dotFiles) {
    const expectedHtml = getExpectedHtmlPath(dotFile);
    const exists = fs.existsSync(expectedHtml);
    const baseName = path.basename(dotFile);
    const expectedBaseName = path.basename(expectedHtml);
    console.log(`   ${baseName} → ${expectedBaseName}: ${exists ? '✅' : '❌'}`);
  }
  
  console.log('\n🎯 SUMMARY:');
  if (results.missingHtml.length === 0 && results.linkIssues.length === 0) {
    console.log('   🎉 All markdown files have HTML equivalents with correct link compilation!');
  } else {
    console.log(`   📝 ${results.missingHtml.length} files need HTML compilation`);
    console.log(`   🔗 ${results.linkIssues.length} files have link protocol issues`);
  }
}

if (require.main === module) {
  main();
}