#!/usr/bin/env node
/**
 * Academic Markdown to HTML Converter
 * 
 * This script converts markdown files to HTML with professional LaTeX and citation support:
 * - Uses KaTeX for faster, more reliable LaTeX rendering
 * - Uses Citation.js for proper academic citation handling
 * - Properly handles inline and block math expressions
 * - Supports LaTeX environments (theorem, lemma, etc.)
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
const ref = require('./ref');

/**
 * Class to parse markdown metadata from the header and footer
 */
class MarkdownParser {
  constructor(inputFilePath = null) {
    this.inputFilePath = inputFilePath;
    this.metadata = {
      title: null,
      book: null,
      subject: null,
      previous: null,
      next: null,
      related: [],
      thoughts: []
    };
  }

  /**
   * Parse header and footer metadata from markdown content
   * @param {string} markdown - Raw markdown content
   * @return {object} - Extracted metadata and cleaned markdown
   */
  parseMetadata(markdown) {
    logger.info('Parsing markdown metadata...');

    // Split the content by lines
    const lines = markdown.split('\n');
    let inHeader = false;
    let inFooter = false;
    let inThoughts = false;
    let inRelated = false;
    let headerEndIndex = -1;
    let footerStartIndex = -1;
    let nextSectionStartIndex = -1;

    // Find the header and footer sections
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Detect header start - match both "# Header" and variations with different casing or whitespace
      if (/^#\s*header$/i.test(line)) {
        logger.debug(`Found header section at line ${i}: "${line}"`);
        inHeader = true;
        headerEndIndex = i;
        continue;
      }

      // Detect the next section after header (usually starts with ## or #)
      if (inHeader && !inFooter && line.startsWith('#') && !/^#\s*header$/i.test(line)) {
        logger.debug(`Found next section after header at line ${i}: "${line}"`);
        nextSectionStartIndex = i;
        inHeader = false; // End of header section
      }

      // Detect footer start - match both "# Footer", "## Footer" and variations
      if (/^#{1,2}\s*footer$/i.test(line)) {
        logger.debug(`Found footer section at line ${i}: "${line}"`);
        inFooter = true;
        footerStartIndex = i;
        continue;
      }

      // Detect 'related:' line in footer to start capturing related concepts
      if (inFooter && line === '- related:') {
        logger.debug(`Found related section marker at line ${i}`);
        inRelated = true;
        inThoughts = false;
        continue;
      }

      // Detect thoughts section in footer
      if (inFooter && line === '### Thoughts') {
        logger.debug(`Found thoughts section at line ${i}`);
        inThoughts = true;
        inRelated = false;
        continue;
      }

      // Parse header metadata
      if (inHeader && line.startsWith('- ')) {
        const metadataLine = line.substring(2).trim();

        if (metadataLine.startsWith('title:')) {
          const titleMatch = metadataLine.match(/title:\s*\[(.*?)\]\((.*?)\)/);
          if (titleMatch) {
            this.metadata.title = {
              text: titleMatch[1],
              link: titleMatch[2]
            };
            logger.debug(`Found title: ${titleMatch[1]} -> ${titleMatch[2]}`);
          }
        } else if (metadataLine.startsWith('book:')) {
          const bookMatch = metadataLine.match(/book:\s*\[(.*?)\]\((.*?)\)/);
          if (bookMatch) {
            this.metadata.book = {
              text: bookMatch[1],
              link: bookMatch[2]
            };
            logger.debug(`Found book: ${bookMatch[1]} -> ${bookMatch[2]}`);

            // Check if this is .dictionary or similar special case
            if (bookMatch[2].includes('.dictionary') || bookMatch[2].includes('dictionary.md')) {
              // Use book name as subject
              this.metadata.subject = {
                text: bookMatch[1],
                link: bookMatch[2]
              };
              logger.debug(`Set subject from book: ${bookMatch[1]}`);
            }
          }
        } else if (metadataLine.startsWith('subject:')) {
          const subjectMatch = metadataLine.match(/subject:\s*\[(.*?)\]\((.*?)\)/);
          if (subjectMatch) {
            this.metadata.subject = {
              text: subjectMatch[1],
              link: subjectMatch[2]
            };
            logger.debug(`Found subject: ${subjectMatch[1]} -> ${subjectMatch[2]}`);
          }
        } else if (metadataLine.startsWith('previous:')) {
          const previousMatch = metadataLine.match(/previous:\s*\[(.*?)\]\((.*?)\)/);
          if (previousMatch) {
            this.metadata.previous = {
              text: previousMatch[1],
              link: previousMatch[2]
            };
            logger.debug(`Found previous: ${previousMatch[1]} -> ${previousMatch[2]}`);
          }
        } else if (metadataLine.startsWith('next:')) {
          const nextMatch = metadataLine.match(/next:\s*\[(.*?)\]\((.*?)\)/);
          if (nextMatch) {
            this.metadata.next = {
              text: nextMatch[1],
              link: nextMatch[2]
            };
            logger.debug(`Found next: ${nextMatch[1]} -> ${nextMatch[2]}`);
          }
        }
      }

      // Parse footer related links - handle multiple indentation styles
      if (inFooter && inRelated && !inThoughts) {
        logger.debug(`Checking line for related links: "${line}"`);

        // Support two-space indentation (standard format)
        if (line.startsWith('  - ')) {
          const relatedMatch = line.match(/\[(.*?)\]\((.*?)\)/);
          if (relatedMatch) {
            this.metadata.related.push({
              text: relatedMatch[1],
              link: relatedMatch[2]
            });
            logger.info(`Found related link (2-space): ${relatedMatch[1]} -> ${relatedMatch[2]}`);
          }
        }
        // Support single-space indentation
        else if (line.startsWith(' - ')) {
          const relatedMatch = line.match(/\[(.*?)\]\((.*?)\)/);
          if (relatedMatch) {
            this.metadata.related.push({
              text: relatedMatch[1],
              link: relatedMatch[2]
            });
            logger.info(`Found related link (1-space): ${relatedMatch[1]} -> ${relatedMatch[2]}`);
          }
        }
        // Support unindented items if directly under related:
        else if (line.startsWith('- ') && !line.startsWith('- related:')) {
          const relatedMatch = line.match(/\[(.*?)\]\((.*?)\)/);
          if (relatedMatch) {
            this.metadata.related.push({
              text: relatedMatch[1],
              link: relatedMatch[2]
            });
            logger.info(`Found related link (unindented): ${relatedMatch[1]} -> ${relatedMatch[2]}`);
          }
        }
      }

      // Parse thoughts
      if (inFooter && inThoughts && (line.startsWith('  - ') || line.startsWith(' - '))) {
        const thought = line.replace(/^[ ]+- /, '').trim();
        this.metadata.thoughts.push(thought);
        logger.debug(`Found thought: ${thought}`);
      }
    }

    // Find where to start the content - skip past all header metadata
    let contentStartIndex = headerEndIndex + 1;

    // If we found a next section marker, use that as the start
    if (nextSectionStartIndex > headerEndIndex) {
      contentStartIndex = nextSectionStartIndex;
    } else {
      // Otherwise, we need to skip past all the metadata items
      // Find the last metadata item in the header
      let lastMetadataLineIndex = headerEndIndex;
      for (let i = headerEndIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('- ')) {
          lastMetadataLineIndex = i;
        } else if (line === '' && i > lastMetadataLineIndex + 1) {
          // Found empty line after metadata
          contentStartIndex = i + 1;
          break;
        } else if (!line.startsWith('- ') && line !== '') {
          // Found non-metadata content
          contentStartIndex = i;
          break;
        }
      }
    }

    // Remove header and footer from markdown content
    let cleanedMarkdown = markdown;

    if (contentStartIndex >= 0) {
      // Start from the beginning of the actual content
      const endLine = footerStartIndex >= 0 ? footerStartIndex : lines.length;
      cleanedMarkdown = lines.slice(contentStartIndex, endLine).join('\n');
      logger.debug(`Extracted content from line ${contentStartIndex} to ${endLine}`);
    } else if (footerStartIndex >= 0) {
      // If only footer is present (no header)
      cleanedMarkdown = markdown.split('\n').slice(0, footerStartIndex).join('\n');
      logger.debug(`Extracted content up to footer at line ${footerStartIndex}`);
    }

    // Log the extracted metadata
    logger.info(`Metadata extraction complete. Found: title=${this.metadata.title ? 'yes' : 'no'}, book=${this.metadata.book ? 'yes' : 'no'}, previous=${this.metadata.previous ? 'yes' : 'no'}, next=${this.metadata.next ? 'yes' : 'no'}, related=${this.metadata.related.length}, thoughts=${this.metadata.thoughts.length}`);

    return {
      metadata: this.metadata,
      cleanedMarkdown: cleanedMarkdown
    };
  }

  /**
 * Create a GitHub source URL from the input file path
 * @param {string} inputFilePath - Path to the input markdown file
 * @return {string} - GitHub repository URL for the file
 */
  createGitHubSourceUrl(inputFilePath) {
    // Use the ref.js utility for consistent GitHub URL generation
    return ref.createGitHubSourceUrl(inputFilePath);
  }

  /**
  * Generate HTML for the header based on extracted metadata
  * @return {string} - HTML for the header section
  */
  generateHeaderHtml() {
    logger.info('Generating header HTML from metadata...');

    // Check if we have any metadata to display in the header
    const hasHeaderMetadata = this.metadata.book || this.metadata.subject ||
      this.metadata.previous || this.metadata.next ||
      (this.metadata.thoughts && this.metadata.thoughts.length > 0);

    if (!hasHeaderMetadata) {
      logger.info('No header metadata found, skipping header generation');
      return '';
    }

    // Determine what to use in the header (book or subject)
    let sourceInfo = null;
    let sourceLabel = '';

    if (this.metadata.book) {
      sourceInfo = this.metadata.book;
      sourceLabel = 'From';
    } else if (this.metadata.subject) {
      sourceInfo = this.metadata.subject;
      sourceLabel = 'Subject';
    }

    // Create GitHub source URL for the title
    const githubUrl = this.createGitHubSourceUrl(this.inputFilePath);
    const titleLinkHtml = this.metadata.title ?
      `<h1 class="entry-title"><a href="${githubUrl}" class="github-source-link">${this.metadata.title.text}</a></h1>` : '';

    let headerHtml = '<header class="academic-header">';

    // Add DNA rose icon linking to index
    headerHtml += `
  <div class="header-left">
    <a href="index.html" class="dna-rose-link" title="Return to Library Index">
      <img src="https://www.dna.love/images/icons/dna-rose-g1-icon.png?v=2" alt="DNA Rose" class="dna-rose-icon">
    </a>`;

    // Only add book/subject info if we have it
    if (sourceInfo) {
      // Use ref.js to transform the link path properly
      const sourceLink = sourceInfo.link;

      // Transform the markdown link to HTML using ref.js
      const transformedLink = sourceLink.endsWith('.md')
        ? ref.mdToHtmlPath(sourceLink)
        : sourceLink;

      headerHtml += `
    <div class="book-info">
      <span class="book-label">${sourceLabel}</span>
      <a href="${transformedLink}" class="book-link">${sourceInfo.text}</a>
    </div>`;
    } else {
      // Close the header-left div if no book info
      headerHtml += `
  </div>`;
    }

    headerHtml += `
  <div class="navigation-controls">`;

    if (this.metadata.previous) {
      // Use ref.js to transform the link path properly
      const prevLink = this.metadata.previous.link;

      // Transform the markdown link to HTML using ref.js
      const transformedPrevLink = prevLink.endsWith('.md')
        ? ref.mdToHtmlPath(prevLink)
        : prevLink;

      headerHtml += `
    <a href="${transformedPrevLink}" class="nav-link prev-link" title="${this.metadata.previous.text}">
      <span class="nav-arrow"></span>
      <span class="nav-text">Previous</span>
    </a>`;
    }

    if (this.metadata.next) {
      // Use ref.js to transform the link path properly
      const nextLink = this.metadata.next.link;

      // Transform the markdown link to HTML using ref.js
      const transformedNextLink = nextLink.endsWith('.md')
        ? ref.mdToHtmlPath(nextLink)
        : nextLink;

      headerHtml += `
    <a href="${transformedNextLink}" class="nav-link next-link" title="${this.metadata.next.text}">
      <span class="nav-text">Next</span>
      <span class="nav-arrow"></span>
    </a>`;
    }

    // Only show thoughts button if we have thoughts
    if (this.metadata.thoughts && this.metadata.thoughts.length > 0) {
      headerHtml += `
    <button type="button" class="thoughts-button" title="Show questions and thoughts" aria-label="Show thoughts">?</button>`;
      logger.info('Added thoughts button to header');
    }

    headerHtml += `
  </div>
</header>`;

    // Add title directly into the header - ensures it doesn't appear in the main content
    headerHtml += titleLinkHtml;

    // Add thoughts modal if thoughts exist
    if (this.metadata.thoughts && this.metadata.thoughts.length > 0) {
      headerHtml += `
<div class="thoughts-modal" id="thoughtsModal">
  <div class="thoughts-modal-content">
    <div class="thoughts-modal-header">
      <h3>Thoughts & Questions</h3>
      <button type="button" class="close-thoughts">&times;</button>
    </div>
    <div class="thoughts-modal-body">
      <ul>`;

      for (const thought of this.metadata.thoughts) {
        headerHtml += `
        <li>${thought}</li>`;
      }

      headerHtml += `
      </ul>
    </div>
  </div>
</div>`;
      logger.info('Added thoughts modal with ' + this.metadata.thoughts.length + ' thoughts');
    }

    return headerHtml;
  }

  /**
   * Generate HTML for the footer based on extracted metadata
   * @return {string} - HTML for the footer section
   */
  generateFooterHtml() {
    logger.info('Generating footer HTML from metadata...');
    logger.info(`Related concepts found: ${this.metadata.related ? this.metadata.related.length : 0}`);

    // Log all related concepts found for debugging
    if (this.metadata.related && this.metadata.related.length > 0) {
      this.metadata.related.forEach((item, index) => {
        logger.info(`Related concept ${index + 1}: ${item.text} -> ${item.link}`);
      });
    }

    // If no related concepts or thoughts, return empty footer
    if ((!this.metadata.related || this.metadata.related.length === 0) &&
      (!this.metadata.thoughts || this.metadata.thoughts.length === 0)) {
      logger.info('No related concepts or thoughts found, skipping footer');
      return '';
    }

    let footerHtml = `
<footer class="academic-footer">`;

    // Add related concepts section
    if (this.metadata.related && this.metadata.related.length > 0) {
      footerHtml += `
  <div class="footer-section">
    <h3 class="footer-heading">Related Concepts</h3>
    <div class="related-links">`;

      for (const related of this.metadata.related) {
        // Use ref.js to transform the link path properly
        const relatedLink = related.link;

        // Transform the markdown link to HTML using ref.js
        const transformedRelatedLink = relatedLink.endsWith('.md')
          ? ref.mdToHtmlPath(relatedLink)
          : relatedLink;

        footerHtml += `
      <a href="${transformedRelatedLink}" class="related-link">${related.text}</a>`;
      }

      footerHtml += `
    </div>
  </div>`;
    }

    // Add GitHub repo link
    footerHtml += `
  <div class="footer-section">
    <a href="https://github.com/DNA-Platform/inexplicable-phenomena" class="github-repo-link" target="_blank">
      <svg class="github-icon" height="16" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
      <span>View on GitHub</span>
    </a>
  </div>
</footer>`;

    logger.info('Footer HTML generated successfully');
    return footerHtml;
  }

  /**
  * Generate JavaScript for interactive elements
  * @return {string} - JavaScript code for header and footer interactions
  */
  generateInteractiveJs() {
    logger.info('Generating interactive JavaScript...');

    return `
<script>
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing interactive elements');
    
    // Thoughts modal functionality
    const thoughtsButton = document.querySelector('.thoughts-button');
    const thoughtsModal = document.getElementById('thoughtsModal');
    const closeThoughts = document.querySelector('.close-thoughts');
    
    console.log('Thoughts button found:', thoughtsButton ? 'yes' : 'no');
    console.log('Thoughts modal found:', thoughtsModal ? 'yes' : 'no');
    
    if (thoughtsButton && thoughtsModal) {
      thoughtsButton.addEventListener('click', function() {
        console.log('Thoughts button clicked');
        thoughtsModal.style.display = 'block';
      });
      
      if (closeThoughts) {
        closeThoughts.addEventListener('click', function() {
          thoughtsModal.style.display = 'none';
        });
      }
      
      window.addEventListener('click', function(event) {
        if (event.target === thoughtsModal) {
          thoughtsModal.style.display = 'none';
        }
      });
    }
    
    // Make sure related links don't have extra bullets
    const relatedLinks = document.querySelectorAll('.related-link');
    if (relatedLinks.length > 0) {
      const lastLink = relatedLinks[relatedLinks.length - 1];
      if (lastLink) {
        lastLink.classList.add('last-related');
      }
    }
    
    // Initialize KaTeX rendering if available
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ],
        throwOnError: false,
        errorColor: "#cc0000",
        strict: false
      });
    }
  });
</script>`;
  }
}

// Set up a logger with different levels
const logger = {
  level: 'info', // Default level: can be 'error', 'warn', 'info', 'debug'

  error: function (message) {
    console.error(`[ERROR] ${message}`);
  },

  warn: function (message) {
    if (['error', 'warn', 'info', 'debug'].includes(this.level)) {
      console.warn(`[WARNING] ${message}`);
    }
  },

  info: function (message) {
    if (['info', 'debug'].includes(this.level)) {
      console.info(`[INFO] ${message}`);
    }
  },

  debug: function (message) {
    if (this.level === 'debug') {
      console.debug(`[DEBUG] ${message}`);
    }
  },

  setLevel: function (level) {
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
   * Fix absolute links to encyclopedia to use relative paths
   * @param {string} html - The HTML content
   * @return {string} - HTML with fixed encyclopedia links
   */
  fixEncyclopediaLinks(html) {
    logger.info('Fixing encyclopedia links to use relative paths...');
    return html.replace(
      `<a href="/encyclopedia/semantic-reference-theory.html" class="book-link">Meaning</a>`,
      `<a href="../encyclopedia/semantic-reference-theory.html" class="book-link">Meaning</a>`
    );
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
    processed = this.fixEncyclopediaLinks(processed);
    processed = this.addCssValidationDisablers(processed);

    logger.info('HTML post-processing complete.');
    return processed;
  }
}

/**
 * Class to handle Markdown to HTML conversion
 */
class MarkdownConverter {
  constructor(inputFilePath) {
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
    this.linkTransformer = new LinkTransformer();
    this.markdownParser = new MarkdownParser(inputFilePath);
  }

  /**
   * Convert markdown to HTML with special handling for LaTeX and citations
   * @param {string} markdown - The raw markdown content
   * @return {object} - Converted HTML and metadata
   */
  async convert(markdown) {
    logger.info('Starting markdown to HTML conversion...');

    // Step 1: Parse metadata from header and footer
    const { metadata, cleanedMarkdown } = this.markdownParser.parseMetadata(markdown);

    // Step 2: Extract citations
    const { markdown: markdownWithoutCitations, citations } = this.citationHandler.extractCitations(cleanedMarkdown);

    // Step 3: Format citations with Citation.js
    await this.citationHandler.formatCitations();

    // Step 4: Encode LaTeX content
    const processedMarkdown = this.latexHandler.encodeLatex(markdownWithoutCitations);

    // Step 5: Convert to HTML
    logger.info('Converting markdown to HTML...');
    const rawHtml = marked(processedMarkdown);

    // Step 6: Decode LaTeX content
    const htmlWithLatex = this.latexHandler.decodeLatex(rawHtml);

    // Step 7: Replace citation references
    const htmlWithCitations = this.citationHandler.replaceCitationReferences(htmlWithLatex);

    // Step 8: Apply HTML fixes
    const processedHtml = this.htmlProcessor.process(htmlWithCitations);

    // Step 9: Transform links for web compatibility
    const htmlWithWebLinks = this.linkTransformer.transformLinks(processedHtml);

    // Step 10: Add bibliography section if needed
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
    return {
      html: finalHtml,
      metadata: metadata
    };
  }
}

/**
 * Class to generate the final HTML document with academic styling
 */
class HtmlDocumentGenerator {
  /**
   * Generate a complete HTML document with academic styling
   * @param {string} htmlBody - The converted HTML body content
   * @param {string} title - The title for the HTML document
   * @param {object} parser - MarkdownParser instance with metadata
   * @return {string} - Complete HTML document
   */
  generate(htmlBody, title, parser) {
    logger.info('Generating complete HTML document with academic styling...');

    // Generate header and footer HTML from metadata
    const headerHtml = parser ? parser.generateHeaderHtml() : '';
    const footerHtml = parser ? parser.generateFooterHtml() : '';
    const interactiveJs = parser ? parser.generateInteractiveJs() : '';

    // Get CSS styles from file
    const cssPath = path.join(__dirname, 'html', 'templates', 'styles.css');
    let cssStyles = '';
    try {
      cssStyles = fs.readFileSync(cssPath, 'utf8');
      logger.info('Loaded custom CSS from styles.css');
    } catch (err) {
      logger.warn(`Could not load styles.css: ${err.message}. Using default styles.`);
      cssStyles = `:root {
        --primary-color: #2c3e50;
        --secondary-color: #3498db;
        --border-color: #e0e0e0;
        --text-color: #333;
        --background-color: #fff;
        --link-color: #0645ad;
        --link-hover-color: #0b0080;
        --header-bg: #f8f9fa;
        --footer-bg: #f8f9fa;
        --nav-hover-bg: #eaecf0;
        --code-bg: #f6f8fa;
        --quote-border: #dfe2e5;
        --modal-overlay: rgba(27, 31, 35, 0.5);
      }`;
    }

    return `<!-- @css-disable -->
<!-- css-lint-disable -->
<!-- stylelint-disable -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="css-lint" content="disabled">
    <title>${title} | Inexplicable Phenomena</title>

    <!-- GitHub Markdown CSS for general markdown styling -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown.min.css">

    <!-- highlight.js GitHub stylesheet for code blocks -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.7.0/styles/github.min.css">

    <!-- KaTeX CSS and JS for LaTeX rendering -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>

    <!-- Google Fonts - Academic look -->
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">

    <!-- Custom styles for academic elements -->
    <style>/*! css-lint-disable */
${cssStyles}
    </style>

    <!-- Script to initialize KaTeX rendering -->
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
          delimiters: [
            {left: "$", right: "$", display: true},
            {left: "$", right: "$", display: false}
          ],
          throwOnError: false,
          errorColor: "#cc0000",
          strict: false
        });
      });
    </script>

    ${interactiveJs}
  </head>
  <body>
    <div class="container">
      ${headerHtml}

      <div class="article-container">
        <!-- The .markdown-body class is necessary for github-markdown-css -->
        <article class="markdown-body">
          ${htmlBody}
        </article>
      </div>

      ${footerHtml}
    </div>
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
async function format(inputFile, outputFile) {
  try {
    logger.info(`Starting conversion of: ${inputFile}`);

    // Read the markdown file
    logger.info(`Reading markdown file: ${inputFile}`);
    const markdown = fs.readFileSync(inputFile, 'utf8');
    logger.info(`Successfully read ${markdown.length} characters from the input file.`);

    // Convert markdown to HTML with metadata parsing
    const converter = new MarkdownConverter(inputFile);
    const { html: htmlBody, metadata } = await converter.convert(markdown);

    // Generate complete HTML document
    const htmlGenerator = new HtmlDocumentGenerator();
    const title = metadata && metadata.title && metadata.title.text
      ? metadata.title.text
      : path.basename(inputFile, '.md');
    const htmlDocument = htmlGenerator.generate(htmlBody, title, converter.markdownParser);

    // Ensure output directory exists
    const outputDir = path.dirname(outputFile);
    logger.info(`Ensuring output directory exists: ${outputDir}`);
    fs.mkdirSync(outputDir, { recursive: true });

    // Write the HTML file
    logger.info(`Writing HTML file: ${outputFile}`);
    fs.writeFileSync(outputFile, htmlDocument, 'utf8');

    logger.info(`Successfully converted ${inputFile} to ${outputFile}`);
    console.log(`\nSuccessfully wrote ${outputFile}`);

    return Promise.resolve(); // Explicitly return a resolved promise
  } catch (err) {
    logger.error(`Error converting markdown to HTML: ${err.message}`);
    console.error(`\nError: ${err.message}`);
    if (err.stack) {
      logger.debug(`Stack trace: ${err.stack}`);
    }
    return Promise.reject(err); // Return a rejected promise on error
  }
}

/**
 * Transform a file or directory name to be web-friendly
 * @param {string} name - The original file or directory name
 * @return {string} - Web-friendly version of the name
 */
function transformToWebFriendlyName(name) {
  // Use the ref.js utility for consistent name cleaning
  return ref.cleanNameForWeb(name);
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

    // Use the ref.js utility for consistent link transformations
    const processedHtml = ref.transformLinks(html);

    logger.info('Link transformation complete.');
    return processedHtml;
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

  if (args.inputFile) {
    // Use command line arguments if provided
    inputFile = args.inputFile;

    // Generate default output file name if not provided
    if (args.outputFile) {
      outputFile = args.outputFile;
    } else {
      // Convert .md to .html
      const parsedPath = path.parse(inputFile);
      outputFile = path.join(parsedPath.dir, parsedPath.name + '.html');

      // Special handling for library articles/dictionary/encyclopedia
      if (inputFile.includes('/library/')) {
        // For library content, place the HTML file in a .public directory
        const relativePath = inputFile.split('/library/')[1];
        const publicDir = path.join(path.dirname(inputFile).split('/library/')[0], '/library/.public/');
        outputFile = path.join(publicDir, relativePath.replace('.md', '.html'));

        // Ensure the public directory exists
        const outputDirPath = path.dirname(outputFile);
        fs.mkdirSync(outputDirPath, { recursive: true });
        logger.info(`Created public directory: ${outputDirPath}`);
      }
    }

    logger.info(`Using input file: ${inputFile}`);
    logger.info(`Using output file: ${outputFile}`);
  } else {
    // No input file specified, show error
    logger.error('No input file specified. Please provide a markdown file to convert.');
    console.error('\nError: No input file specified. Usage: node compile-html.js <input.md> [output.html] [--verbose]');
    process.exit(1);
  }

  await format(inputFile, outputFile);
}

if (require.main === module) {
  main();
} else {
  module.exports = { format, transformToWebFriendlyName };
}
