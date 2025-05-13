/**
 * Reference and path handling utilities
 * 
 * This module provides utility functions for working with paths and links
 * in the inexplicable-phenomena project. It handles transformations between
 * markdown files and HTML, as well as creating GitHub source links.
 */

const path = require('path');

// Global configuration
const CONFIG = {
  // Base directories
  SOURCE_DIR: 'library',
  PUBLIC_DIR: 'library/.public',
  
  // GitHub repository information
  GITHUB_REPO: 'DNA-Platform/inexplicable-phenomena',
  GITHUB_BRANCH: 'main',
  
  // Path separator for URLs (always forward slash)
  URL_SEP: '/'
};

/**
 * Transform a file or directory name to be web-friendly
 * Removes leading dots, numbers, and special characters
 * 
 * @param {string} name - The original file or directory name
 * @return {string} - Web-friendly version of the name
 */
function cleanNameForWeb(name) {
  if (!name) return '';
  
  return name
    // Remove literal dots from filenames (like .dictionary)
    .replace(/\./g, "")
    // Replace whitespace with a single "-"
    .replace(/\s+/g, "-")
    // Replace anything between a slash (/ or \) and a letter with just the letter
    // This will remove non-alphabetic characters after slashes
    .replace(/(?:\/|\\)[^a-zA-Z]*([a-zA-Z])/g, "/$1")
    // Remove leading numbers and hyphens (like "1-" prefix)
    .replace(/^[0-9]+-/, "")
    // Convert to lowercase for consistency
    .toLowerCase();
}

/**
 * Transform a markdown path to an HTML path
 *
 * @param {string} mdPath - The path to a markdown file
 * @param {boolean} isRelative - Whether the path is relative (default: true)
 * @return {string} - The corresponding HTML path
 */
function mdToHtmlPath(mdPath, isRelative = true) {
  if (!mdPath) return '';

  // Handle both Windows and Unix paths
  const normalizedPath = mdPath.replace(/\\/g, '/');

  // Remove leading ./ for web links
  let result = normalizedPath.replace(/^\.\//, '');

  // Split into directory and filename
  const dirName = path.dirname(result);
  const fileName = path.basename(result);

  // Handle different cases
  if (fileName.endsWith('.md')) {
    // Standard .md file - transform to .html
    const baseName = fileName.slice(0, -3); // Remove .md extension
    const cleanedName = cleanNameForWeb(baseName);

    // If it's just the root path, don't prepend with ./
    if (dirName === '.' && isRelative) {
      return cleanedName + '.html';
    }

    // Keep the directory structure (possibly clean it)
    const cleanDirPath = dirName === '.' ? '' :
      dirName.split('/').map(cleanNameForWeb).join('/') + '/';

    return cleanDirPath + cleanedName + '.html';
  } else if (!path.extname(result)) {
    // No extension - assume it's a directory or needs .html appended
    return cleanNameForWeb(result) + '.html';
  } else {
    // Has some other extension - leave it as is but clean the name
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);

    // Clean directory and base name
    const cleanDirPath = dirName === '.' ? '' :
      dirName.split('/').map(cleanNameForWeb).join('/') + '/';

    return cleanDirPath + cleanNameForWeb(baseName) + ext;
  }
}

/**
 * Convert an HTML path back to its original markdown path
 * This is approximate and assumes standard conventions
 * 
 * @param {string} htmlPath - The HTML file path
 * @return {string} - Best estimate of the original markdown path
 */
function htmlToMdPath(htmlPath) {
  if (!htmlPath) return '';
  
  // Handle both Windows and Unix paths
  const normalizedPath = htmlPath.replace(/\\/g, '/');
  
  // Replace HTML extension with MD
  let result = normalizedPath.replace(/\.html$/, '.md');
  
  // If path starts with public dir, convert to source dir
  if (result.startsWith(CONFIG.PUBLIC_DIR)) {
    result = result.replace(CONFIG.PUBLIC_DIR, CONFIG.SOURCE_DIR);
  }
  
  return result;
}

/**
 * Convert a file system path to a relative path for use in links
 * 
 * @param {string} fullPath - Absolute or relative file system path
 * @param {string} basePath - The base path to make it relative to
 * @return {string} - Path formatted for HTML links
 */
function fsPathToLinkPath(fullPath, basePath = null) {
  if (!fullPath) return '';
  
  // Handle both Windows and Unix paths
  const normalizedPath = fullPath.replace(/\\/g, '/');
  
  // If a base path is provided, make the path relative to it
  if (basePath) {
    const normalizedBase = basePath.replace(/\\/g, '/');
    if (normalizedPath.startsWith(normalizedBase)) {
      return normalizedPath.slice(normalizedBase.length).replace(/^\//, '');
    }
  }
  
  // Extract from source directory if present
  const sourceIndex = normalizedPath.indexOf(CONFIG.SOURCE_DIR);
  if (sourceIndex !== -1) {
    const relativePath = normalizedPath.substring(sourceIndex + CONFIG.SOURCE_DIR.length + 1);
    return relativePath;
  }
  
  // If we can't make it relative, return as is
  return normalizedPath;
}

/**
 * Create a GitHub source URL from an input file path
 * 
 * @param {string} inputFilePath - Path to the file
 * @return {string} - GitHub repository URL for the file
 */
function createGitHubSourceUrl(inputFilePath) {
  const baseGitHubUrl = `https://github.com/${CONFIG.GITHUB_REPO}/blob/${CONFIG.GITHUB_BRANCH}/`;
  
  if (!inputFilePath) {
    return baseGitHubUrl;
  }
  
  // Handle both Windows and Unix paths
  const normalizedPath = inputFilePath.replace(/\\/g, '/');
  
  // Extract the portion from 'library/' onwards
  const libraryIndex = normalizedPath.indexOf(`${CONFIG.SOURCE_DIR}/`);
  if (libraryIndex !== -1) {
    // Get the path starting from the source directory
    const relativePath = normalizedPath.substring(libraryIndex);
    return baseGitHubUrl + relativePath;
  }
  
  // If source dir not found in path, check if it looks like a relative path
  if (!normalizedPath.startsWith('/') && !normalizedPath.includes(':')) {
    return baseGitHubUrl + CONFIG.SOURCE_DIR + '/' + normalizedPath;
  }
  
  // If unable to determine a path, return the base URL
  return baseGitHubUrl;
}

/**
 * Normalize an anchor ID to match GitHub's anchor ID generation rules
 *
 * @param {string} anchor - The original anchor text (without the # symbol)
 * @return {string} - Normalized anchor ID for use in HTML
 */
function normalizeAnchorId(anchor) {
  if (!anchor) return '';

  return anchor
    .toLowerCase()
    // Convert double-dash to single-dash (common in markdown anchors)
    .replace(/--+/g, '-')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Convert underscores to hyphens (for consistency)
    .replace(/_+/g, '-')
    // Remove any remaining invalid characters
    .replace(/[^\w-]/g, '');
}

/**
 * Transform HTML content to ensure all internal links are properly formatted
 *
 * @param {string} html - The HTML content with potentially problematic links
 * @return {string} - HTML with correctly formatted links
 */
function transformLinks(html) {
  if (!html) return '';

  let processedHtml = html;

  // 1. Convert .md links to .html for internal pages
  processedHtml = processedHtml.replace(
    /href="([^"#:]+)\.md(#[^"]*)?"/g,
    (match, p1, p2) => {
      const htmlPath = mdToHtmlPath(p1 + '.md');
      const anchor = p2 || '';
      return `href="${htmlPath}${anchor}"`;
    }
  );

  // 2. Ensure proper URL encoding for anchor links - handles both standalone anchors and anchors after paths
  processedHtml = processedHtml.replace(
    /href="([^"]*)(#[^"]*)"/g,
    (match, path, anchor) => {
      // Skip if there's no anchor
      if (!anchor) return match;

      // Parse the anchor part (removing the # character)
      const anchorText = anchor.substring(1);

      // Normalize the anchor using our dedicated function
      const encodedAnchor = normalizeAnchorId(anchorText);

      return `href="${path}#${encodedAnchor}"`;
    }
  );

  // 3. Ensure relative links without file extensions get .html
  processedHtml = processedHtml.replace(
    /href="([^"#:]+(?!\.[a-zA-Z0-9]+))"/g,
    (match, path) => {
      // Skip URLs with protocol (http://, https://, etc)
      if (path.match(/^[a-zA-Z]+:\/\//)) {
        return match;
      }

      // Skip absolute URLs starting with //
      if (path.startsWith('//')) {
        return match;
      }

      // Strip leading slash to ensure relative paths
      const relativePath = path.replace(/^\//, "");

      // If the path doesn't end with a file extension, add .html
      if (!relativePath.match(/\.[a-zA-Z0-9]+$/)) {
        return `href="${relativePath}.html"`;
      }
      return `href="${relativePath}"`;
    }
  );

  return processedHtml;
}

/**
 * Convert a path from the source directory structure to the public directory structure
 *
 * @param {string} sourcePath - Path in the source directory
 * @return {string} - Equivalent path in the public directory
 */
function sourceToPublicPath(sourcePath) {
  if (!sourcePath) return '';

  // Normalize to forward slashes
  const normalizedPath = sourcePath.replace(/\\/g, '/');
  // Remove leading ./ for consistency
  const cleanPath = normalizedPath.replace(/^\.\//, '');

  // Get directory and filename
  const dirName = path.dirname(cleanPath);
  const fileName = path.basename(cleanPath);

  // Handle markdown files (convert to html)
  if (fileName.endsWith('.md')) {
    const baseName = path.basename(fileName, '.md');
    const cleanedBaseName = cleanNameForWeb(baseName);

    // Handle paths that start with the source directory
    if (cleanPath.startsWith(CONFIG.SOURCE_DIR)) {
      // Replace the source dir with public dir
      const sourceRelPath = cleanPath.substring(CONFIG.SOURCE_DIR.length);

      // Split path into segments to transform each part
      const segments = sourceRelPath.split('/').filter(s => s);

      // Handle the case where we're already at a filename
      if (segments.length === 0) {
        return `${CONFIG.PUBLIC_DIR}/${cleanedBaseName}.html`;
      }

      // Clean all path segments except the last one (which we've already handled)
      const cleanSegments = segments.slice(0, -1).map(cleanNameForWeb);

      // Reassemble the path with the clean segments
      return `${CONFIG.PUBLIC_DIR}/${cleanSegments.join('/')}/${cleanedBaseName}.html`;
    }

    // For paths that don't include the source directory
    if (dirName === '.') {
      // Just the filename, no directory
      return `${CONFIG.PUBLIC_DIR}/${cleanedBaseName}.html`;
    } else {
      // Clean the directory segments
      const cleanDirSegments = dirName.split('/').map(cleanNameForWeb);
      return `${CONFIG.PUBLIC_DIR}/${cleanDirSegments.join('/')}/${cleanedBaseName}.html`;
    }
  }

  // Handle directories or non-markdown files
  if (!fileName.includes('.')) {
    // This is likely a directory
    const cleanDirSegments = cleanPath.split('/').map(cleanNameForWeb);
    return `${CONFIG.PUBLIC_DIR}/${cleanDirSegments.join('/')}`;
  } else {
    // This is a non-markdown file, keep its extension but clean the name
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    const cleanDirSegments = dirName === '.' ? [] : dirName.split('/').map(cleanNameForWeb);

    return `${CONFIG.PUBLIC_DIR}/${cleanDirSegments.join('/')}/${cleanNameForWeb(baseName)}${ext}`;
  }
}

/**
 * Convert a path from the public directory structure to the source directory structure
 *
 * @param {string} publicPath - Path in the public directory
 * @return {string} - Best estimate of the equivalent path in the source directory
 */
function publicToSourcePath(publicPath) {
  if (!publicPath) return '';

  // Normalize to forward slashes
  const normalizedPath = publicPath.replace(/\\/g, '/');

  // Replace public dir with source dir
  if (normalizedPath.startsWith(CONFIG.PUBLIC_DIR)) {
    const relativePath = normalizedPath.substring(CONFIG.PUBLIC_DIR.length + 1);

    // Handle file extension: HTML back to MD
    if (relativePath.endsWith('.html')) {
      const dirName = path.dirname(relativePath);
      const baseName = path.basename(relativePath, '.html');

      // Special cases for known dot-files
      const specialDotFiles = [
        'dictionary', 'encyclopedia', 'godel-and-the-human-brain',
        'articles', 'books', 'index'
      ];

      // Some files might be special index or dotted files
      // Check directory name or special names for dotted files
      const needsDotPrefix =
        specialDotFiles.some(name => dirName.endsWith(name)) ||
        specialDotFiles.includes(baseName);

      // For directories we know have dot files or special names
      if (needsDotPrefix) {
        return `${CONFIG.SOURCE_DIR}/${dirName}/.${baseName}.md`;
      }

      // Regular case: no dot prefix
      return `${CONFIG.SOURCE_DIR}/${dirName}/${baseName}.md`;
    }

    return `${CONFIG.SOURCE_DIR}/${relativePath}`;
  }

  // If the path doesn't match the PUBLIC_DIR pattern but ends with .html
  if (normalizedPath.endsWith('.html')) {
    const dirName = path.dirname(normalizedPath);
    const baseName = path.basename(normalizedPath, '.html');

    // If it's a path like library/dictionary/example.html
    if (normalizedPath.includes('/')) {
      // Extract the directory structure
      const pathSegments = normalizedPath.split('/');
      const fileName = pathSegments.pop();

      // Keep the directory structure but swap public -> source if needed
      let newPath = pathSegments.join('/');
      if (newPath.includes(CONFIG.PUBLIC_DIR)) {
        newPath = newPath.replace(CONFIG.PUBLIC_DIR, CONFIG.SOURCE_DIR);
      }

      return `${newPath}/${baseName}.md`;
    }

    // Simple case, just a filename
    return `${baseName}.md`;
  }

  return normalizedPath;
}

module.exports = {
  CONFIG,
  cleanNameForWeb,
  mdToHtmlPath,
  htmlToMdPath,
  fsPathToLinkPath,
  createGitHubSourceUrl,
  normalizeAnchorId,
  transformLinks,
  sourceToPublicPath,
  publicToSourcePath
};

// #!/usr/bin/env node
// /**
//  * Comprehensive test suite for reference and path handling utilities
//  * 
//  * ========================================================================
//  * Understanding the Reference System and Its Philosophical Context
//  * ========================================================================
//  * 
//  * A reference system like this transforms conceptual links (paths) through various
//  * forms and contexts - much like the library/articles/inexplicable-phenomena.md 
//  * explores how our perception of conscious experience is a process of transformation 
//  * and transduction across different semantic reference frames.
//  * 
//  * Just as SRT (Semantic Reference Theory) explains how constants obtain meaning through 
//  * systems of reference, our file paths gain "meaning" by how they're interpreted in 
//  * different contexts (markdown source, HTML output, GitHub URLs, etc).
//  * 
//  * The ontological structure of a filesystem (.md files in library/) is transformed 
//  * into another representation (.html files in library/.public/) through a well-defined 
//  * transduction process, preserving semantic relationships while changing form.
//  *
//  * ========================================================================
//  * The Core Complexities of Path and Reference Handling
//  * ========================================================================
//  * 
//  * 1. MULTI-CONTEXT TRANSFORMATION:
//  *    Each file path exists simultaneously across different contexts:
//  *    - As filesystem paths (absolute/relative)
//  *    - As source repository locations (GitHub URLs)
//  *    - As web-accessible resources (HTML links)
//  *    - As markdown references (relative links between .md files)
//  *    Each context has different rules and expectations.
//  *
//  * 2. ASYMMETRIC MAPPING:
//  *    - Multiple source files might map to the same destination (e.g., both 
//  *      .special.md and special.md could map to special.html)
//  *    - Makes bi-directional mapping challenging
//  *
//  * 3. RELATIVE PATH HANDLING:
//  *    - Markdown uses relative links that shift meaning depending on file location
//  *    - "../" references need careful handling when files reorganize in the output
//  *    - Must preserve semantics across structure changes
//  *
//  * 4. DOT FILE CONVENTIONS:
//  *    - Dotfiles like ".dictionary.md" being transformed to directory/dictionary.html
//  *    - Special handling for dots in paths vs dots in extensions
//  *
//  * 5. ANCHOR TRANSFORMATIONS:
//  *    - Anchors (section IDs) follow different rules in markdown vs HTML
//  *    - Double dashes, underscores, spaces all need consistent transformation
//  *    - Needs to match how GitHub processes markdown headers into HTML IDs
//  *
//  * 6. NAME NORMALIZATION:
//  *    - Removing numbers ("1-Introduction" → "introduction")
//  *    - Handling spaces/special chars ("Title with spaces" → "title-with-spaces")
//  *    - Preserving semantics while making web-friendly URLs
//  *
//  * 7. THE DOT PUBLIC DIRECTORY:
//  *    - The ".public" part of the path is invisible to web users but crucial for linking
//  *    - Must handle correctly in source → public and public → source transformations
//  *
//  * 8. PRESERVING EXTERNAL REFERENCES:
//  *    - Must distinguish between internal links (to be transformed) and external 
//  *      references (to be preserved untouched)
//  *    
//  * ========================================================================
//  * Critical Link Cases That Must Be Handled Correctly
//  * ========================================================================
//  * 
//  * 1. RELATIVE MARKDOWN LINKS:
//  *    - Link within same directory: [Domain](domain.md)
//  *    - Link to parent directory: [Parent](../parent.md)
//  *    - Link to dot file: [Dictionary](.dictionary.md)
//  *    - Nested relative path: [Example](dictionary/example.md)
//  *
//  * 2. ABSOLUTE INTERNAL LINKS:
//  *    - Absolute from project root: [Root](/library/index.md)
//  *    - Link with multiple path segments: [Deep](/library/books/book.md)
//  *
//  * 3. GITHUB SOURCE LINKS:
//  *    - Source code references: [Source](https://github.com/org/repo/blob/main/path/file.md)
//  *    - Need to transform local files to their GitHub equivalent
//  *
//  * 4. EXTERNAL URLS:
//  *    - External website: [External](https://example.com)
//  *    - Must not be modified by the transformation system
//  *
//  * 5. SECTION ANCHORS:
//  *    - Simple: [Section](#section)
//  *    - With spaces: [Spaces](#section with spaces)
//  *    - With double-dashes: [Dashes](#section--with--dashes)
//  *    - With underscores: [Underscores](#section_with_underscores)
//  *    - Combined with path: [Path and Anchor](file.md#section)
//  *    - Combined with relative path: [Relative and Anchor](../file.md#section)
//  *
//  * 6. SPECIAL CASES:
//  *    - Number prefixes: [Numbered](1-example.md)
//  *    - Path with spaces: [Spaces Path](a path with spaces.md)
//  *    - Windows-style paths: [Windows](path\\to\\file.md)
//  *    - Path with dot directory: [Hidden](.dir/file.md)
//  *    - Complex combination cases
//  */

// const { 
//   CONFIG,
//   cleanNameForWeb,
//   mdToHtmlPath,
//   htmlToMdPath,
//   fsPathToLinkPath,
//   createGitHubSourceUrl,
//   normalizeAnchorId,
//   transformLinks,
//   sourceToPublicPath,
//   publicToSourcePath
// } = require('./ref');

// /**
//  * Test suite for reference transformations
//  * 
//  * This comprehensive test validates the reference system's ability to handle
//  * a wide variety of path transformations across different contexts and
//  * with different edge cases.
//  */
// function runReferenceTests() {
//   console.log('========================================================================');
//   console.log('REFERENCE SYSTEM TEST SUITE');
//   console.log('========================================================================');
//   console.log('Configuration:', CONFIG);
//   console.log('\n');
  
//   // ========================================================================
//   // TEST 1: Basic Path Transformations
//   // ========================================================================
//   console.log('TEST 1: BASIC PATH TRANSFORMATIONS');
//   console.log('----------------------------------');
  
//   const basicPaths = [
//     'library/dictionary/domain.md',                      // Basic file path
//     'library/dictionary/.dictionary.md',                 // Dot file
//     'library/dictionary/1-example.md',                   // Number prefix
//     'library/articles/a novel perspective on vision.md', // Spaces in name
//     'referent.md',                                       // Simple relative path
//     './library/index.md',                                // Explicit relative path
//     '/library/index.md',                                 // Absolute path
//     'library/books/godel-and-the-human-brain/.godel-and-the-human-brain.md', // Nested dot file
//   ];
  
//   basicPaths.forEach(path => {
//     console.log(`\nOriginal path: ${path}`);
//     console.log(`  ➜ HTML path:      ${mdToHtmlPath(path)}`);
//     console.log(`  ➜ Public path:    ${sourceToPublicPath(path)}`);
//     console.log(`  ➜ GitHub URL:     ${createGitHubSourceUrl(path)}`);
//   });
  
//   // ========================================================================
//   // TEST 2: Handling of Relative Paths
//   // ========================================================================
//   console.log('\n\nTEST 2: HANDLING OF RELATIVE PATHS');
//   console.log('----------------------------------');
  
//   // Setup: Simulated "current file" context for relative paths
//   const currentFile = 'library/dictionary/property.md';
//   console.log(`Current file context: ${currentFile}`);
  
//   const relativePaths = [
//     'domain.md',              // Same directory
//     './domain.md',            // Explicit same directory
//     '../index.md',            // Parent directory
//     '../articles/a-novel-perspective-on-vision.md', // Parent + different directory
//     '../../library/index.md', // Multiple parent traversal
//   ];
  
//   relativePaths.forEach(relPath => {
//     // Resolve relative to current context (simplified implementation)
//     const currentDir = currentFile.substring(0, currentFile.lastIndexOf('/'));
//     const resolvedPath = resolveRelativePath(currentDir, relPath);
    
//     console.log(`\nRelative path: ${relPath}`);
//     console.log(`  ➜ Resolved path:  ${resolvedPath}`);
//     console.log(`  ➜ HTML path:      ${mdToHtmlPath(resolvedPath)}`);
//     console.log(`  ➜ Public path:    ${sourceToPublicPath(resolvedPath)}`);
//   });
  
//   // ========================================================================
//   // TEST 3: Anchor ID Normalization
//   // ========================================================================
//   console.log('\n\nTEST 3: ANCHOR ID NORMALIZATION');
//   console.log('----------------------------------');
  
//   const anchorCases = [
//     'Section Name',                   // Simple with spaces
//     'section--with--double--dashes',  // Double dashes
//     'section_with_underscores',       // Underscores
//     'UPPER-and-lower-case',           // Mixed case
//     'section.with.dots',              // Dots
//     'section-123-numbers',            // Numbers
//     'section with spaces and--dashes_and_underscores', // Combined cases
//     '______lots_of_underscores____',  // Edge case: many underscores
//     '123-section-starts-with-number', // Number prefix
//     'special@#$%^&*chars',            // Special characters
//   ];
  
//   anchorCases.forEach(anchor => {
//     console.log(`Original: "${anchor}"`);
//     console.log(`  ➜ Normalized: "#${normalizeAnchorId(anchor)}"`);
//   });
  
//   // ========================================================================
//   // TEST 4: Link Transformations in HTML
//   // ========================================================================
//   console.log('\n\nTEST 4: LINK TRANSFORMATIONS IN HTML');
//   console.log('----------------------------------');
  
//   // Create a variety of HTML links to test transformations
//   const testHtml = `
//     <!-- Basic markdown links -->
//     <a href="domain.md">Domain</a>
//     <a href="./domain.md">Domain (explicit relative)</a>
//     <a href="../dictionary/domain.md">Domain (parent relative)</a>
    
//     <!-- Dot files -->
//     <a href=".dictionary.md">Dictionary dot file</a>
//     <a href="./library/dictionary/.dictionary.md">Dictionary File (path)</a>
    
//     <!-- Special cases -->
//     <a href="library/dictionary/1-example.md">Numbered Example</a>
//     <a href="library/articles/a novel perspective on vision.md">Spaces in filename</a>
//     <a href="path\\to\\windows\\style.md">Windows backslashes</a>
    
//     <!-- Non-md files & directories -->
//     <a href="library/dictionary">Directory link</a>
//     <a href="library/dictionary/">Directory with trailing slash</a>
//     <a href="library/images/diagram.png">Image file</a>
    
//     <!-- External links to preserve -->
//     <a href="https://example.com/external">External link</a>
//     <a href="http://example.org">HTTP link</a>
//     <a href="//example.net">Protocol-relative link</a>
//     <a href="mailto:user@example.com">Mailto link</a>
    
//     <!-- Anchor links -->
//     <a href="#section-name">Anchor only</a>
//     <a href="#section with spaces">Anchor with spaces</a>
//     <a href="#section--with--double--dashes">Double dashes in anchor</a>
//     <a href="#section_with_underscores">Underscores in anchor</a>
    
//     <!-- Combined path and anchor -->
//     <a href="domain.md#section-name">File with anchor</a>
//     <a href="../path/file.md#section with spaces">Relative path with spaced anchor</a>
//     <a href="domain.md#section--with--dashes">File with dashed anchor</a>
//     <a href="domain.md#section_with_underscores">File with underscored anchor</a>
    
//     <!-- GitHub URLs (should be preserved) -->
//     <a href="https://github.com/DNA-Platform/inexplicable-phenomena/blob/main/library/dictionary/domain.md">GitHub source</a>
//   `;
  
//   console.log('Original HTML:');
//   console.log(testHtml);
  
//   console.log('\nTransformed HTML:');
//   console.log(transformLinks(testHtml));
  
//   // ========================================================================
//   // TEST 5: Bidirectional Transformations
//   // ========================================================================
//   console.log('\n\nTEST 5: BIDIRECTIONAL TRANSFORMATIONS');
//   console.log('----------------------------------');
  
//   // Test round-trip conversions (source → public → source)
//   const bidirectionalTests = [
//     'library/dictionary/domain.md',
//     'library/dictionary/.dictionary.md',
//     'library/articles/a novel perspective on vision.md',
//     'library/books/godel-and-the-human-brain/.godel-and-the-human-brain.md',
//   ];
  
//   bidirectionalTests.forEach(path => {
//     console.log(`\nOriginal source path: ${path}`);
    
//     // Forward transformation
//     const publicPath = sourceToPublicPath(path);
//     console.log(`  ➜ To public path:     ${publicPath}`);
    
//     // Reverse transformation
//     const sourcePath = publicToSourcePath(publicPath);
//     console.log(`  ➜ Back to source path: ${sourcePath}`);
    
//     // Check if we recovered the original
//     if (sourcePath === path) {
//       console.log('  ✓ MATCH: Round-trip transformation preserved the path');
//     } else {
//       console.log('  ✗ MISMATCH: Round-trip transformation changed the path');
//       console.log(`    Original: ${path}`);
//       console.log(`    Recovered: ${sourcePath}`);
//     }
//   });
  
//   // ========================================================================
//   // TEST 6: Edge Cases & Special Situations
//   // ========================================================================
//   console.log('\n\nTEST 6: EDGE CASES & SPECIAL SITUATIONS');
//   console.log('----------------------------------');
  
//   const edgeCases = [
//     // Empty/null paths
//     {
//       name: 'Empty path',
//       test: () => {
//         const result = mdToHtmlPath('');
//         console.log(`mdToHtmlPath(''): "${result}"`);
//         return result === '';
//       }
//     },
    
//     // Multiple dots in filename
//     {
//       name: 'Multiple dots in filename',
//       test: () => {
//         const path = 'library/files/document.version.1.2.md';
//         const result = mdToHtmlPath(path);
//         console.log(`mdToHtmlPath('${path}'): "${result}"`);
//         return result.endsWith('.html');
//       }
//     },
    
//     // Path with encoded characters
//     {
//       name: 'Path with encoded characters',
//       test: () => {
//         const path = 'library/special/%20spaces%20and%20special%20chars.md';
//         const result = mdToHtmlPath(path);
//         console.log(`mdToHtmlPath('${path}'): "${result}"`);
//         return result.includes('spaces-and-special-chars.html');
//       }
//     },
    
//     // Case sensitivity
//     {
//       name: 'Case sensitivity',
//       test: () => {
//         const path = 'library/MixedCase/CamelCase.md';
//         const result = mdToHtmlPath(path);
//         console.log(`mdToHtmlPath('${path}'): "${result}"`);
//         return result.toLowerCase() === result;
//       }
//     },
    
//     // Double dot in filename (not relative path)
//     {
//       name: 'Double dot in filename',
//       test: () => {
//         const path = 'library/weird..filename.md';
//         const result = mdToHtmlPath(path);
//         console.log(`mdToHtmlPath('${path}'): "${result}"`);
//         return result.includes('filename.html');
//       }
//     }
//   ];
  
//   edgeCases.forEach(testCase => {
//     console.log(`\nTest: ${testCase.name}`);
//     const passed = testCase.test();
//     console.log(`  ${passed ? '✓ PASS' : '✗ FAIL'}`);
//   });
// }

// /**
//  * Helper function to resolve a relative path against a base path
//  */
// function resolveRelativePath(basePath, relativePath) {
//   // Strip leading ./ 
//   const cleanRelative = relativePath.replace(/^\.\//, '');
  
//   // If already absolute or no parent references, just return
//   if (relativePath.startsWith('/') || !relativePath.includes('../')) {
//     // If it's a simple relative path, just prepend the base directory
//     if (!relativePath.startsWith('/') && !relativePath.startsWith('../')) {
//       return `${basePath}/${cleanRelative}`;
//     }
//     return relativePath;
//   }
  
//   // Split paths into segments
//   const baseSegments = basePath.split('/');
//   let relativeSegments = cleanRelative.split('/');
  
//   // Count and remove "../" segments
//   let parentRefs = 0;
//   while (relativeSegments[0] === '..') {
//     parentRefs++;
//     relativeSegments.shift();
//   }
  
//   // Remove appropriate number of segments from base path
//   const remainingBaseSegments = baseSegments.slice(0, baseSegments.length - parentRefs);
  
//   // Combine the paths
//   return [...remainingBaseSegments, ...relativeSegments].join('/');
// }

// /**
//  * Entry point - run all tests
//  */
// if (require.main === module) {
//   runReferenceTests();
// }

// module.exports = { runReferenceTests };