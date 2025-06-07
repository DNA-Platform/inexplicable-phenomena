#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      getAllHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function getExpectedMdPath(htmlPath) {
  // Convert HTML path back to expected MD path
  // .public/dictionary/dictionary.html -> dictionary/.dictionary.md
  // .public/notebook/formalism/description.html -> notebook/formalism/1-description.md
  
  const relativePath = path.relative(path.join(__dirname, '../library/.public'), htmlPath);
  const dir = path.dirname(relativePath);
  const filename = path.basename(relativePath, '.html');
  
  // Handle special naming conventions
  let mdFilename;
  
  // Check if this is a main section file (dictionary.html -> .dictionary.md)
  if (['dictionary', 'encyclopedia', 'articles', 'notebook', 'notes', 'journal', 'books'].includes(filename)) {
    mdFilename = `.${filename}.md`;
  }
  // Check if this is in formalism folder and needs number prefix
  else if (dir.includes('formalism') && ['description', 'expression', 'provability', 'reflection'].includes(filename)) {
    const numberMap = {
      'description': '1-description',
      'expression': '2-expression', 
      'provability': '3-provability',
      'reflection': '4-reflection'
    };
    mdFilename = numberMap[filename] + '.md';
  }
  // Check if this is a synopsis file (.synopsis.md)
  else if (filename === 'synopsis') {
    mdFilename = '.synopsis.md';
  }
  // Regular files
  else {
    mdFilename = filename + '.md';
  }
  
  const expectedMdPath = path.join(__dirname, '../library', dir, mdFilename);
  return expectedMdPath;
}

function checkHtmlTemplate(htmlPath) {
  const issues = [];
  
  try {
    const content = fs.readFileSync(htmlPath, 'utf8');
    
    // Check for required template elements
    const requiredElements = [
      { name: 'DNA Rose Icon', pattern: /dna-rose-icon/ },
      { name: 'Academic Header', pattern: /<header class="academic-header">/ },
      { name: 'Container Structure', pattern: /<div class="container">/ },
      { name: 'Article Container', pattern: /<div class="article-container">/ },
      { name: 'Markdown Body', pattern: /<article class="markdown-body">/ },
      { name: 'GitHub Source Link', pattern: /github-source-link/ }
    ];
    
    for (const element of requiredElements) {
      if (!element.pattern.test(content)) {
        issues.push(`Missing ${element.name}`);
      }
    }
    
    // Extract GitHub source link
    const githubLinkMatch = content.match(/<h1 class="entry-title"><a href="([^"]+)" class="github-source-link">/);
    if (githubLinkMatch) {
      const githubUrl = githubLinkMatch[1];
      
      // Verify it points to the correct MD file
      const expectedMdPath = getExpectedMdPath(htmlPath);
      const expectedGithubUrl = githubUrl.replace(/\/[^\/]+\.md$/, '/' + path.basename(expectedMdPath));
      
      if (!githubUrl.includes(path.basename(expectedMdPath))) {
        issues.push(`GitHub link points to wrong file: ${githubUrl}, expected to include: ${path.basename(expectedMdPath)}`);
      }
      
      // Check if the referenced MD file exists
      if (!fs.existsSync(expectedMdPath)) {
        issues.push(`Referenced MD file does not exist: ${expectedMdPath}`);
      }
    } else {
      issues.push('No GitHub source link found in entry title');
    }
    
    // Check for title structure
    const titleMatch = content.match(/<title>([^<]+) \| Inexplicable Phenomena<\/title>/);
    if (!titleMatch) {
      issues.push('Missing or malformed page title');
    }
    
    // Check for proper navigation structure
    if (!content.includes('class="navigation-controls"')) {
      issues.push('Missing navigation controls');
    }
    
  } catch (error) {
    issues.push(`Error reading file: ${error.message}`);
  }
  
  return issues;
}

function main() {
  console.log('🔍 Comprehensive HTML Template and Link Verification\n');
  
  const publicDir = path.join(__dirname, '../library/.public');
  const htmlFiles = getAllHtmlFiles(publicDir);
  
  const results = {
    total: htmlFiles.length,
    passed: 0,
    failed: 0,
    issues: []
  };
  
  console.log(`📊 Found ${htmlFiles.length} HTML files to check\n`);
  
  for (const htmlPath of htmlFiles) {
    const relativePath = path.relative(publicDir, htmlPath);
    const issues = checkHtmlTemplate(htmlPath);
    
    if (issues.length === 0) {
      results.passed++;
      console.log(`✅ ${relativePath}`);
    } else {
      results.failed++;
      console.log(`❌ ${relativePath}:`);
      for (const issue of issues) {
        console.log(`   • ${issue}`);
      }
      
      results.issues.push({
        file: relativePath,
        problems: issues
      });
    }
  }
  
  console.log(`\n📊 VERIFICATION SUMMARY:`);
  console.log(`   Total files checked: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  
  if (results.failed > 0) {
    console.log(`\n🔧 FILES NEEDING ATTENTION:`);
    for (const issue of results.issues) {
      console.log(`   ${issue.file}: ${issue.problems.length} issue(s)`);
    }
  }
  
  // Check for specific naming convention compliance
  console.log(`\n🔧 NAMING CONVENTION CHECK:`);
  
  const specialCases = [
    { html: 'dictionary/dictionary.html', md: '.dictionary.md' },
    { html: 'encyclopedia/encyclopedia.html', md: '.encyclopedia.md' },
    { html: 'notebook/formalism/description.html', md: '1-description.md' },
    { html: 'notebook/formalism/expression.html', md: '2-expression.md' },
    { html: 'notebook/formalism/provability.html', md: '3-provability.md' },
    { html: 'notebook/formalism/reflection.html', md: '4-reflection.md' }
  ];
  
  for (const spec of specialCases) {
    const htmlPath = path.join(publicDir, spec.html);
    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath, 'utf8');
      const githubLinkMatch = content.match(/github\.com\/[^\/]+\/[^\/]+\/blob\/main\/library\/([^"]+)/);
      if (githubLinkMatch) {
        const linkedPath = githubLinkMatch[1];
        if (linkedPath.endsWith(spec.md)) {
          console.log(`   ✅ ${spec.html} → ${spec.md}`);
        } else {
          console.log(`   ❌ ${spec.html} → ${linkedPath} (expected ${spec.md})`);
        }
      } else {
        console.log(`   ❌ ${spec.html} → No GitHub link found`);
      }
    } else {
      console.log(`   ❌ ${spec.html} → File not found`);
    }
  }
  
  console.log(`\n🎯 TEMPLATE CONSISTENCY: ${results.failed === 0 ? 'PASS' : 'FAIL'}`);
  if (results.failed === 0) {
    console.log('   🎉 All HTML files have consistent templates and correct links!');
  } else {
    console.log(`   📝 ${results.failed} files need template fixes`);
  }
}

if (require.main === module) {
  main();
}