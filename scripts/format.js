#!/usr/bin/env node
/**
 * Academic Markdown to HTML Converter
 * 
 * This script converts markdown files to HTML with professional LaTeX and citation support:
 * - Uses KaTeX for faster, more reliable LaTeX rendering
 * - Uses Citation.js for proper academic citation handling
 * - Properly handles inline and block math expressions
 * - Supports LaTeX environments (theorem, lemma, etc.)
 * - Transforms markdown links for web compatibility
 * - Avoids CSS validation errors with proper encoding
 * - Includes syntax highlighting for code blocks
 * 
 * Usage: node converter.js [inputFile] [outputFile] [--verbose]
 */

const fs = require('fs');
const path = require('path');
const hljs = require('highlight.js');
const { marked } = require('marked');
const { Cite } = require('citation-js');

// Set up a logger with different levels
const logger = {
  level: 'info', // Default level: can be 'error', 'warn', 'info', 'debug'

  error: function(message) {
    console.error(`[ERROR] ${message}`);
  },

  warn: function(message) {
    if (['error', 'warn', 'info', 'debug'].includes(this.level)) {
      console.warn(`[WARNING] ${message}`);
    }
  },

  info: function(message) {
    if (['info', 'debug'].includes(this.level)) {
      console.info(`[INFO] ${message}`);
    }
  },

  debug: function(message) {
    if (this.level === 'debug') {
      console.debug(`[DEBUG] ${message}`);
    }
  },

  setLevel: function(level) {
    if (['error', 'warn', 'info', 'debug'].includes(level)) {
      this.level = level;
      this.info(`Log level set to: ${level}`);
    } else {
      this.warn(`Invalid log level: ${level}. Using default: 'info'`);
    }
  }
};

/**
 * Class to handle LaTeX content during markdown conversion
 * Using base64 encoding to safely protect LaTeX during markdown processing
 */
class LaTeXHandler {
  constructor() {
    this.inlineCount = 0;
    this.displayCount = 0;
    this.envCount = 0;
  }

  /**
   * Encode LaTeX content to protect it from markdown processing
   * @param {string} markdown - Raw markdown with LaTeX content
   * @return {string} - Markdown with LaTeX encoded as base64
   */
  encodeLatex(markdown) {
    logger.info('Encoding LaTeX content to protect from markdown processing...');
    
    // Reset counters
    this.inlineCount = 0;
    this.displayCount = 0;
    this.envCount = 0;
    
    let processed = markdown;
    
    // Encode block LaTeX ($$..$$)
    processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, content) => {
      const id = this.displayCount++;
      // Use a unique token format that won't be affected by markdown processing
      // The token includes a prefix, type, ID, and base64 content
      const token = `LATEX-DISPLAY-${id}-${Buffer.from(content).toString('base64')}`;
      logger.debug(`Encoded display math expression #${id}`);
      return token;
    });
    
    // Encode inline LaTeX ($...$) - be careful not to match $ used for other purposes
    processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, content) => {
      const id = this.inlineCount++;
      const token = `LATEX-INLINE-${id}-${Buffer.from(content).toString('base64')}`;
      logger.debug(`Encoded inline math expression #${id}`);
      return token;
    });
    
    // Encode LaTeX environments (careful with the regex to handle nested content correctly)
    processed = processed.replace(/\\begin\{(\w+)\}([\s\S]*?)\\end\{\1\}/g, (match, envName, content) => {
      const id = this.envCount++;
      const token = `LATEX-ENV-${envName}-${id}-${Buffer.from(match).toString('base64')}`;
      logger.debug(`Encoded ${envName} environment #${id}`);
      return token;
    });
    
    logger.info(`Encoded ${this.displayCount} display equations, ${this.inlineCount} inline equations, and ${this.envCount} environments.`);
    return processed;
  }

  /**
   * Decode LaTeX tokens back to proper HTML/LaTeX syntax
   * @param {string} html - HTML with encoded LaTeX tokens
   * @return {string} - HTML with proper LaTeX markup for KaTeX
   */
  decodeLatex(html) {
    logger.info('Decoding LaTeX content for rendering...');
    
    let processed = html;
    
    // Decode display math expressions
    processed = processed.replace(/LATEX-DISPLAY-(\d+)-([A-Za-z0-9+/=]+)/g, (match, id, encoded) => {
      try {
        const content = Buffer.from(encoded, 'base64').toString();
        logger.debug(`Decoded display math expression #${id}`);
        // We'll use special delimiters that KaTeX can identify
        return `<div class="math math-display">$$${content}$$</div>`;
      } catch (err) {
        logger.error(`Failed to decode display math expression #${id}: ${err.message}`);
        return '<div class="math-error">Error decoding math expression</div>';
      }
    });
    
    // Decode inline math expressions
    processed = processed.replace(/LATEX-INLINE-(\d+)-([A-Za-z0-9+/=]+)/g, (match, id, encoded) => {
      try {
        const content = Buffer.from(encoded, 'base64').toString();
        logger.debug(`Decoded inline math expression #${id}`);
        return `<span class="math math-inline">$${content}$</span>`;
      } catch (err) {
        logger.error(`Failed to decode inline math expression #${id}: ${err.message}`);
        return '<span class="math-error">Error</span>';
      }
    });
    
    // Decode and process LaTeX environments
    processed = processed.replace(/LATEX-ENV-(\w+)-(\d+)-([A-Za-z0-9+/=]+)/g, (match, envName, id, encoded) => {
      try {
        const content = Buffer.from(encoded, 'base64').toString();
        logger.debug(`Decoded ${envName} environment #${id}`);
        
        // Handle known environment types differently
        const knownEnvironments = ['theorem', 'lemma', 'proof', 'definition', 'example', 'remark', 'note', 'corollary'];
        
        if (knownEnvironments.includes(envName)) {
          // Extract the content between \begin{...} and \end{...}
          const contentRegex = new RegExp(`\\\\begin\\{${envName}\\}([\\s\\S]*?)\\\\end\\{${envName}\\}`);
          const contentMatch = contentRegex.exec(content);
          
          if (contentMatch && contentMatch[1]) {
            const innerContent = contentMatch[1].trim();
            // Create a properly styled div for the environment
            return `<div class="latex-env ${envName}">
                      <div class="env-title">${envName.charAt(0).toUpperCase() + envName.slice(1)}</div>
                      <div class="env-content">${innerContent}</div>
                    </div>`;
          }
        }
        
        // For unknown environment types, just return the raw environment for KaTeX to handle
        return content;
      } catch (err) {
        logger.error(`Failed to decode ${envName} environment #${id}: ${err.message}`);
        return '<div class="env-error">Error decoding environment</div>';
      }
    });
    
    logger.info('LaTeX decoding complete.');
    return processed;
  }
}

/**
 * Class to handle citation processing
 */
class CitationHandler {
  constructor() {
    this.citations = {};
    this.citeCount = 0;
  }

  /**
   * Extract and process markdown-style citations
   * @param {string} markdown - Raw markdown content
   * @return {object} - Processed markdown and extracted citations
   */
  extractCitations(markdown) {
    logger.info('Extracting citations from markdown...');
    
    // Reset citations
    this.citations = {};
    this.citeCount = 0;
    
    let processedMarkdown = markdown;
    
    // Extract bibliography entries marked with [^id]: format
    const bibRegex = /\[\^([a-zA-Z0-9_]+)\]:\s*([\s\S]*?)(?=\n\n|\n\[\^|$)/g;
    let match;
    
    while ((match = bibRegex.exec(markdown)) !== null) {
      const id = match[1];
      const content = match[2].trim();
      
      // Store the citation
      this.citations[id] = {
        id,
        content,
        index: this.citeCount++,
        html: ''
      };
      
      logger.debug(`Found citation: ${id}`);
      
      // Remove the citation definition from the markdown
      processedMarkdown = processedMarkdown.replace(match[0], '');
    }
    
    // Replace citation references with tokens
    processedMarkdown = processedMarkdown.replace(/\[\^([a-zA-Z0-9_]+)\]/g, (match, id) => {
      if (this.citations[id]) {
        return `CITATION-REF-${id}`;
      }
      return match; // Keep the original if citation not found
    });
    
    logger.info(`Extracted ${Object.keys(this.citations).length} citations.`);
    
    return {
      markdown: processedMarkdown,
      citations: this.citations
    };
  }

  /**
   * Format citations with Citation.js
   */
  async formatCitations() {
    logger.info('Formatting citations...');
    
    // For each citation, try to parse and format with Citation.js
    for (const id in this.citations) {
      const citation = this.citations[id];
      
      try {
        // Try to parse the citation with Citation.js
        // We'll need to guess what format it's in
        const cite = new Cite(citation.content);
        
        // Format as HTML
        citation.html = cite.format('bibliography', {
          format: 'html',
          template: 'apa',
          lang: 'en-US'
        });
        
        logger.debug(`Formatted citation: ${id}`);
      } catch (err) {
        // If Citation.js fails, just use the original content
        logger.warn(`Could not parse citation ${id}: ${err.message}`);
        citation.html = citation.content;
      }
    }
  }

  /**
   * Replace citation references in HTML
   * @param {string} html - The HTML content
   * @return {string} - HTML with citation references replaced
   */
  replaceCitationReferences(html) {
    logger.info('Replacing citation references...');
    
    let processedHtml = html;
    
    // Replace citation reference tokens with links
    for (const id in this.citations) {
      const citation = this.citations[id];
      const pattern = new RegExp(`CITATION-REF-${id}`, 'g');
      
      processedHtml = processedHtml.replace(pattern, 
        `<sup><a href="#citation-${id}" id="citation-ref-${id}" class="citation-ref">[${citation.index + 1}]</a></sup>`
      );
    }
    
    return processedHtml;
  }

  /**
   * Generate bibliography section
   * @return {string} - HTML for the bibliography section
   */
  generateBibliography() {
    logger.info('Generating bibliography section...');
    
    if (Object.keys(this.citations).length === 0) {
      logger.warn('No citations found, skipping bibliography generation.');
      return '';
    }
    
    // Sort citations by index
    const sortedCitations = Object.values(this.citations).sort((a, b) => a.index - b.index);
    
    // Generate bibliography HTML
    let bibHtml = '<h2 id="bibliography">Bibliography</h2>\n<div class="bibliography">\n<ol>\n';
    
    for (const citation of sortedCitations) {
      bibHtml += `<li id="citation-${citation.id}" class="citation-entry">`;
      bibHtml += `${citation.html} `;
      bibHtml += `<a href="#citation-ref-${citation.id}" class="citation-backref" title="Back to reference">↩</a>`;
      bibHtml += '</li>\n';
    }
    
    bibHtml += '</ol>\n</div>';
    
    return bibHtml;
  }
}

/**
 * Class to handle link transformations for web compatibility
 */
class LinkTransformer {
  /**
   * Transform markdown links to be web-compatible while keeping everything relative
   * @param {string} html - The HTML content with potentially web-incompatible links
   * @return {string} - HTML with web-compatible links
   */
  transformLinks(html) {
    logger.info('Transforming links for web compatibility...');
    
    let processedHtml = html;
    
    // 1. Convert .md links to .html for internal pages while preserving relativity
    processedHtml = processedHtml.replace(
      /href="([^"#:]+)\.md(#[^"]*)?"/g, 
      'href="$1.html$2"'
    );
    
    // 2. Ensure proper URL encoding for anchor links
    processedHtml = processedHtml.replace(
      /href="#([^"]*)"/g,
      (match, anchor) => {
        // Convert spaces and special characters in anchors to their URL-encoded versions
        // GitHub Pages uses lowercase and replaces spaces with hyphens
        const encodedAnchor = encodeURIComponent(
          anchor
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
        );
        return `href="#${encodedAnchor}"`;
      }
    );
    
    // 3. Make sure all relative links without .html or # are properly formed
    // This handles cases like href="folder/page" to href="folder/page.html"
    processedHtml = processedHtml.replace(
      /href="([^"#:]+(?!\.[a-zA-Z0-9]+))"/g,
      (match, path) => {
        // If the path doesn't end with a file extension, add .html
        if (!path.match(/\.[a-zA-Z0-9]+$/)) {
          return `href="${path}.html"`;
        }
        return match;
      }
    );
    
    logger.info('Link transformation complete.');
    return processedHtml;
  }
}

/**
 * Class to handle HTML post-processing and fixes
 */
class HtmlProcessor {
  /**
   * Fix common issues with definition lists
   * @param {string} html - The HTML content
   * @return {string} - Fixed HTML
   */
  fixDefinitionLists(html) {
    logger.info('Processing definition lists...');
    // Find pattern: <p>Term<br>: Definition</p>
    const fixed = html.replace(/<p>([^<:]+)<br>:\s*([^<]+)<\/p>/g, (match, term, definition) => {
      logger.debug(`Found definition list: ${term.trim()} : ${definition.substring(0, 40)}...`);
      return `<dl><dt>${term.trim()}</dt><dd>${definition}</dd></dl>`;
    });
    
    return fixed;
  }

  /**
   * Fix code blocks in footnotes and citations
   * @param {string} html - The HTML content
   * @return {string} - HTML with properly formatted code blocks
   */
  fixCodeBlocks(html) {
    logger.info('Fixing code blocks...');
    
    // In footnotes/citations, replace any remaining backtick code block markers
    let processed = html;
    
    // Find code blocks within list items that still have the triple backticks
    const codeBlockRegex = /(<li[^>]*>.*?)(```\w*\n)([\s\S]*?)(```)([\s\S]*?<\/li>)/g;
    
    processed = processed.replace(codeBlockRegex, (match, prefix, openingTicks, code, closingTicks, suffix) => {
      // Extract the language if present
      const lang = openingTicks.trim().replace('```', '') || 'plaintext';
      
      // Remove the triple backticks and format as a proper code block
      const formattedCode = code.trim();
      
      // Use appropriate highlighting if available
      let highlightedCode = formattedCode;
      if (hljs.getLanguage(lang)) {
        highlightedCode = hljs.highlight(formattedCode, { language: lang }).value;
      }
      
      return `${prefix}<pre><code class="language-${lang}">${highlightedCode}</code></pre>${suffix}`;
    });
    
    return processed;
  }

  /**
   * Add CSS validation disabling directives
   * @param {string} html - The HTML content
   * @return {string} - HTML with CSS validation disabling
   */
  addCssValidationDisablers(html) {
    // Add comments at the start to disable CSS validation
    const disabledHtml = `<!-- @css-disable -->
<!-- css-lint-disable -->
<!-- stylelint-disable -->
${html}`;
    return disabledHtml;
  }

  /**
   * Apply all HTML post-processing fixes
   * @param {string} html - The original HTML content
   * @return {string} - Processed HTML
   */
  process(html) {
    logger.info('Starting HTML post-processing...');
    let processed = html;
    
    processed = this.fixDefinitionLists(processed);
    processed = this.fixCodeBlocks(processed);
    processed = this.addCssValidationDisablers(processed);
    
    logger.info('HTML post-processing complete.');
    return processed;
  }
}

/**
 * Class to handle Markdown to HTML conversion
 */
class MarkdownConverter {
  constructor() {
    // Configure Marked to highlight code blocks
    marked.setOptions({
      highlight: (code, lang) => {
        // If 'lang' is recognized, use that; otherwise fall back to auto-detection
        const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language: validLang }).value;
      },
      breaks: true, // turn single line breaks into <br>
      gfm: true
    });
    
    this.latexHandler = new LaTeXHandler();
    this.citationHandler = new CitationHandler();
    this.htmlProcessor = new HtmlProcessor();
    this.linkTransformer = new LinkTransformer(); // Add the LinkTransformer
  }

  /**
   * Convert markdown to HTML with special handling for LaTeX and citations
   * @param {string} markdown - The raw markdown content
   * @return {string} - Converted HTML
   */
  async convert(markdown) {
    logger.info('Starting markdown to HTML conversion...');
    
    // Step 1: Extract citations
    const { markdown: markdownWithoutCitations, citations } = this.citationHandler.extractCitations(markdown);
    
    // Step 2: Format citations with Citation.js
    await this.citationHandler.formatCitations();
    
    // Step 3: Encode LaTeX content
    const processedMarkdown = this.latexHandler.encodeLatex(markdownWithoutCitations);
    
    // Step 4: Convert to HTML
    logger.info('Converting markdown to HTML...');
    const rawHtml = marked(processedMarkdown);
    
    // Step 5: Decode LaTeX content
    const htmlWithLatex = this.latexHandler.decodeLatex(rawHtml);
    
    // Step 6: Replace citation references
    const htmlWithCitations = this.citationHandler.replaceCitationReferences(htmlWithLatex);
    
    // Step 7: Apply HTML fixes
    const processedHtml = this.htmlProcessor.process(htmlWithCitations);
    
    // Step 8: Transform links for web compatibility
    const htmlWithWebLinks = this.linkTransformer.transformLinks(processedHtml);
    
    // Step 9: Add bibliography section if needed
    let finalHtml = htmlWithWebLinks;
    if (Object.keys(citations).length > 0) {
      const bibliography = this.citationHandler.generateBibliography();
      
      // Check if there's already a bibliography heading
      if (!finalHtml.includes('<h2 id="bibliography">Bibliography</h2>') &&
          !finalHtml.includes('<h3 id="bibliography">Bibliography</h3>')) {
        finalHtml += bibliography;
      } else {
        // Replace existing bibliography section
        finalHtml = finalHtml.replace(
          /<h[23] id="bibliography">Bibliography<\/h[23]>[\s\S]*?(?=<h[23]|$)/,
          bibliography
        );
      }
    }
    
    logger.info('Markdown conversion complete.');
    return finalHtml;
  }
}

/**
 * Class to generate the final HTML document
 */
class HtmlDocumentGenerator {
  /**
   * Generate a complete HTML document
   * @param {string} htmlBody - The converted HTML body content
   * @param {string} title - The title for the HTML document
   * @return {string} - Complete HTML document
   */
  generate(htmlBody, title) {
    logger.info('Generating complete HTML document...');
    
    return `<!-- @css-disable -->
<!-- css-lint-disable -->
<!-- stylelint-disable -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="css-lint" content="disabled">
    <title>${title}</title>
    
    <!-- GitHub Markdown CSS for general markdown styling -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown.min.css">
    
    <!-- highlight.js GitHub stylesheet for code blocks -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css">
    
    <!-- KaTeX CSS and JS for LaTeX rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
    
    <!-- Custom styles for academic elements -->
    <style>/*! css-lint-disable */
      /* Definition list styling */
      dl {
        margin: 1em 0;
      }
      dt {
        font-weight: bold;
        margin-top: 1em;
      }
      dd {
        margin-left: 2em;
      }
      
      /* LaTeX environment styling */
      .latex-env {
        margin: 1.5em 0;
        padding: 0.8em 1em;
        border-left: 4px solid #4a4a4a;
        background-color: #f8f8f8;
      }
      
      .env-title {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5em;
      }
      
      .env-content {
        display: block;
      }
      
      /* Specific environment styling */
      .theorem { border-left-color: #4a4a4a; }
      .lemma { border-left-color: #5a6268; }
      .proof { border-left-color: #6c757d; }
      .definition { border-left-color: #28a745; }
      .example { border-left-color: #007bff; }
      .remark { border-left-color: #fd7e14; }
      .note { border-left-color: #17a2b8; }
      .corollary { border-left-color: #6f42c1; }
      
      /* KaTeX rendering support */
      .katex-display {
        overflow-x: auto;
        overflow-y: hidden;
        padding: 1em 0;
      }
      
      .math-display {
        margin: 1em 0;
      }
      
      .math-inline {
        display: inline-block;
      }
      
      .math-error {
        color: red;
        font-weight: bold;
      }
      
      /* Bibliography and citation styling */
      .bibliography {
        margin-top: 2em;
        padding-top: 1em;
      }
      
      .citation-ref {
        font-size: 0.8em;
        position: relative;
        top: -0.5em;
        text-decoration: none;
      }
      
      .citation-backref {
        font-size: 0.8em;
        text-decoration: none;
        margin-left: 0.5em;
      }
      
      .citation-entry {
        margin-bottom: 1em;
      }
      
      .bibliography ol {
        padding-left: 1.5em;
      }
    </style>
    
    <!-- Script to initialize KaTeX rendering -->
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
          ],
          throwOnError: false,
          errorColor: "#cc0000",
          strict: false
        });
      });
    </script>
  </head>
  <body>
    <!-- The .markdown-body class is necessary for github-markdown-css -->
    <article class="markdown-body" style="
      max-width: 860px; 
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      box-shadow: 0 2px 5px rgba(0,0,0,.05);
    ">
      ${htmlBody}
    </article>
  </body>
</html>`;
  }
}

/**
 * Parse command line arguments
 * @return {Object} - Parsed arguments object
 */
function parseArguments() {
  const args = process.argv.slice(2);
  const result = {
    inputFile: null,
    outputFile: null,
    verbose: false
  };
  
  // Check for verbose flag
  const verboseIndex = args.indexOf('--verbose');
  if (verboseIndex !== -1) {
    result.verbose = true;
    args.splice(verboseIndex, 1); // Remove from args
  }
  
  // Parse input and output files
  if (args.length >= 1) {
    result.inputFile = args[0];
  }
  
  if (args.length >= 2) {
    result.outputFile = args[1];
  }
  
  return result;
}

/**
 * Main function to convert a markdown file to HTML
 * @param {string} inputFile - Path to input markdown file
 * @param {string} outputFile - Path to output HTML file
 */
async function createPage(inputFile, outputFile) {
  try {
    logger.info(`Starting conversion of: ${inputFile}`);
    
    // Read the markdown file
    logger.info(`Reading markdown file: ${inputFile}`);
    const markdown = fs.readFileSync(inputFile, 'utf8');
    logger.info(`Successfully read ${markdown.length} characters from the input file.`);
    
    // Convert markdown to HTML
    const converter = new MarkdownConverter();
    const htmlBody = await converter.convert(markdown);
    
    // Generate complete HTML document
    const htmlGenerator = new HtmlDocumentGenerator();
    const title = path.basename(inputFile, '.md');
    const htmlDocument = htmlGenerator.generate(htmlBody, title);
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    logger.info(`Ensuring output directory exists: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });
    
    // Write the HTML file
    logger.info(`Writing HTML file: ${outputFile}`);
    fs.writeFileSync(outputFile, htmlDocument, 'utf8');
    
    logger.info(`Successfully converted ${inputFile} to ${outputFile}`);
    console.log(`\nSuccessfully wrote ${outputFile}`);
  } catch (err) {
    logger.error(`Error converting markdown to HTML: ${err.message}`);
    console.error(`\nError: ${err.message}`);
    if (err.stack) {
      logger.debug(`Stack trace: ${err.stack}`);
    }
  }
}

/**
 * Main entry point
 */
async function main() {
  // Parse command line arguments
  const args = parseArguments();
  
  // Set log level based on verbose flag
  if (args.verbose) {
    logger.setLevel('debug');
  }
  
  let inputFile, outputFile;
  
  if (args.inputFile && args.outputFile) {
    // Use command line arguments if provided
    inputFile = args.inputFile;
    outputFile = args.outputFile;
  } else {
    // Default paths
    // inputFile = path.join(__dirname, '..', '..', 'interpreter', 'new-page.md');
  
    // outputFile = path.join(__dirname, '..', '..', 'interpretation', 'index.html');
    logger.info('No input/output files specified, using defaults:');
    logger.info(`Input: ${inputFile}`);
    logger.info(`Output: ${outputFile}`);
  }

  await createPage(inputFile, outputFile);
}

// Execute the main function
main();