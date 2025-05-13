#!/usr/bin/env node
/**
 * Markdown to LaTeX Compiler (Object Model Version)
 * 
 * Enhanced algorithm:
 * 1. Parse document into an object model (DocumentNode)
 * 2. Document contains Sections
 * 3. Sections contain Paragraphs
 * 4. Paragraphs may have annotations (comments) above/below
 * 5. Process nodes recursively to generate LaTeX
 */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const ref = require('./ref');

// LaTeX document template
const TEMPLATE = `\\documentclass[runningheads]{llncs}
\\usepackage[T1]{fontenc}
\\usepackage{graphicx}
\\usepackage{xcolor}
\\usepackage{soul}
\\usepackage{etoolbox}
\\usepackage{xspace}
\\usepackage[hyphens]{url}
\\usepackage[hidelinks]{hyperref}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\hbadness=10000

% Custom commands for library links
\\newcommand{\\lib}[2]{\\href{https://dna-platform.github.io/inexplicable-phenomena#1}{#2}\\xspace}

\\begin{document}

%%CONTENT%%

\\end{document}`;

/**
 * Base class for all nodes in the document tree
 */
class Node {
  constructor() {
    this.annotations = { 
      pre: '',  // Comments/annotations before the node
      post: ''  // Comments/annotations after the node
    };
  }

  /**
   * Convert node to LaTeX representation
   * @returns {string} LaTeX representation
   */
  toLatex() {
    return '';
  }

  /**
   * Add annotations to the node
   * @param {string} pre - Content to add before
   * @param {string} post - Content to add after
   */
  setAnnotations(pre, post) {
    this.annotations.pre = pre || '';
    this.annotations.post = post || '';
  }

  /**
   * Wraps content with annotations if they exist
   * @param {string} content - Content to wrap
   * @returns {string} Content with annotations
   */
  wrapWithAnnotations(content) {
    const pre = this.annotations.pre ? `${this.annotations.pre}\n` : '';
    const post = this.annotations.post ? `\n${this.annotations.post}` : '';
    return pre + content + post;
  }
}

/**
 * Document node (root of the parse tree)
 */
class DocumentNode extends Node {
  constructor(options = {}) {
    super();
    this.options = {
      baseUrl: "https://dna-platform.github.io/inexplicable-phenomena/",
      debug: true,
      ...options
    };
    this.metadata = {};
    this.titleSection = null;
    this.sections = [];
    this.latexProcessor = new LatexProcessor(options);
  }

  /**
   * Log a message if debug mode is enabled
   * @param {string} message - Message to log
   */
  log(message) {
    if (this.options.debug) {
      console.log(`[DEBUG] ${message}`);
    }
  }

  /**
   * Process a markdown document into nodes
   * @param {string} markdown - Raw markdown content
   */
  parse(markdown) {
    this.log('Parsing markdown document into node tree');
    
    // Process comments to LaTeX comments
    let processedMarkdown = this.latexProcessor.processComments(markdown);
    
    // Process citation references
    processedMarkdown = this.latexProcessor.processCitations(processedMarkdown);
    
    // Split document by section dividers ("---")
    const sections = processedMarkdown.split(/^---$/m);
    this.log(`Found ${sections.length} sections in document`);
    
    // Extract header (first section) - extract metadata but don't include in output
    const header = sections[0];
    this.extractMetadata(header);
    
    // Extract title section (second section)
    const titleSection = sections[1] || '';
    this.titleSection = new TitleSection(titleSection, this.metadata, this.options);
    
    // Process remaining content sections
    const contentSections = sections.slice(2);
    const keywordsSections = [];
    
    // First pass - identify all sections including keywords
    for (const sectionText of contentSections) {
      if (sectionText.trim().match(/^#+\s+Keywords/im)) {
        // Store keywords sections for later processing
        keywordsSections.push(sectionText);
        this.log('Found Keywords section');
      } else {
        // Create appropriate section based on content
        let section;
        
        if (sectionText.trim().match(/^#+\s+Abstract/im)) {
          section = new AbstractSection(sectionText, this.options);
          this.log('Found Abstract section');
        } else if (sectionText.trim().match(/^## Bibliography/m)) {
          section = new BibliographySection(sectionText, this.options);
        } else {
          section = new ContentSection(sectionText, this.options);
        }
        
        this.sections.push(section);
      }
    }
    
    // Process keywords and attach to abstract if found
    if (keywordsSections.length > 0) {
      const abstractIndex = this.sections.findIndex(s => s instanceof AbstractSection);
      
      if (abstractIndex !== -1) {
        // Create keyword nodes
        const keywordsNodes = keywordsSections.map(text => 
          new KeywordsSection(text, this.options)
        );
        
        // Attach keywords to abstract
        this.sections[abstractIndex].keywordsSections = keywordsNodes;
        this.log(`Attached ${keywordsNodes.length} keyword nodes to abstract`);
      }
    }
  }

  /**
   * Extract metadata from header section
   * @param {string} header - Raw header section markdown
   */
  extractMetadata(header) {
    this.log('Extracting metadata from header');
    
    // Look for metadata in list items
    const lines = header.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('- ')) {
        const match = line.match(/- ([^:]+):\s*(.+)/);
        if (match && match.length >= 3) {
          const key = match[1].trim();
          const value = match[2].trim();
          this.metadata[key] = value;
        }
      }
    }
  }

  /**
   * Convert document to LaTeX
   * @returns {string} Full LaTeX document
   */
  toLatex() {
    this.log('Converting document to LaTeX');
    
    // Log section info
    this.log(`Total sections: ${this.sections.length}`);
    this.sections.forEach((section, index) => {
      this.log(`Section ${index}: ${section.constructor.name}`);
      if (section instanceof AbstractSection) {
        this.log(`  Keywords attached: ${section.keywordsSections.length}`);
      }
    });
    
    // Convert title section
    const titleLatex = this.titleSection ? this.titleSection.toLatex() : '';
    
    // Convert all content sections
    const contentLatex = this.sections.map(section => section.toLatex()).join('\n\n');
    
    // Combine into the template
    const latex = TEMPLATE.replace('%%CONTENT%%', titleLatex + contentLatex);
    
    // Post-process the LaTeX to fix common issues
    return this.latexProcessor.postProcessLatex(latex);
  }
}

/**
 * Abstract base class for all sections
 */
class Section extends Node {
  constructor(rawContent, options = {}) {
    super();
    this.rawContent = rawContent.trim();
    this.options = options;
    this.paragraphs = [];
    this.processor = new LatexProcessor(options);
    this.parse();
  }

  /**
   * Parse section content into paragraphs
   */
  parse() {
    // Extract content without heading
    const content = this.removeHeading(this.rawContent);
    
    // Split into paragraphs and process them
    const paragraphData = this.processor.splitIntoParagraphs(content);
    
    // Create paragraph nodes
    for (const data of paragraphData) {
      let paragraph;
      const content = data.content;
      
      if (content.startsWith('>')) {
        paragraph = new BlockquoteParagraph(content, this.options);
      } else if (content.startsWith('- ') || content.match(/^\d+\. /)) {
        paragraph = new ListParagraph(content, this.options);
      } else {
        paragraph = new TextParagraph(content, this.options);
      }
      
      // Add annotations to the paragraph
      paragraph.setAnnotations(data.preComment, data.postComment);
      this.paragraphs.push(paragraph);
    }
  }

  /**
   * Remove section heading (to be implemented by subclasses)
   * @param {string} content - Raw section content with heading
   * @returns {string} - Content without heading
   */
  removeHeading(content) {
    return content;
  }
}

/**
 * Title section (special handling for document title)
 */
class TitleSection extends Section {
  constructor(rawContent, metadata = {}, options = {}) {
    super(rawContent, options);
    this.metadata = metadata;
  }

  /**
   * Parse title from content or metadata
   */
  parse() {
    // Extract the title text (might be a link)
    let titleMatch = this.rawContent.match(/## \[(.*?)\]\((.*?)\)/) || 
                     this.rawContent.match(/## (.+)$/m);
    
    // If no title in section, try to get from metadata
    if (!titleMatch && this.metadata && this.metadata.title) {
      const metaTitleMatch = this.metadata.title.match(/\[(.*?)\]\((.*?)\)/) || 
                           [null, this.metadata.title];
      
      if (metaTitleMatch && metaTitleMatch.length >= 2) {
        titleMatch = metaTitleMatch;
      }
    }
    
    if (!titleMatch) {
      this.titleText = '';
      this.titleLink = '';
      return;
    }
    
    if (titleMatch.length >= 3 && titleMatch[2]) {
      // Title with link
      this.titleText = titleMatch[1];
      const rawLink = titleMatch[2];
      
      // Process link if it's a markdown link
      if (rawLink.endsWith('.md')) {
        try {
          const htmlPath = ref.mdToHtmlPath(rawLink);
          this.titleLink = `${this.options.baseUrl}${htmlPath}`;
        } catch (e) {
          console.log(`Error processing title link: ${e.message}`);
          this.titleLink = rawLink;
        }
      } else {
        this.titleLink = rawLink;
      }
    } else {
      // Plain title
      this.titleText = titleMatch[1];
      this.titleLink = '';
    }
  }

  /**
   * Generate LaTeX for title
   */
  toLatex() {
    if (!this.titleText) {
      return '';
    }
    
    const processor = new LatexProcessor(this.options);
    const escapedTitle = processor.escapeLatex(this.titleText);
    
    if (this.titleLink) {
      return `\\begin{center}
    {\\Large\\bfseries\\boldmath
        \\href{${this.titleLink}}{${escapedTitle}}
        \\par}
    \\vskip 0.8cm
\\end{center}\n\n`;
    } else {
      return `\\begin{center}
    {\\Large\\bfseries\\boldmath
        ${escapedTitle}
        \\par}
    \\vskip 0.8cm
\\end{center}\n\n`;
    }
  }

  /**
   * No heading removal needed for title
   */
  removeHeading(content) {
    return content;
  }
}

/**
 * Abstract section (generates LaTeX abstract environment)
 */
class AbstractSection extends Section {
  constructor(rawContent, options = {}) {
    super(rawContent, options);
    this.keywordsSections = []; // Will hold any keywords sections
  }

  removeHeading(content) {
    return content.replace(/^#+\s+Abstract\s*\n/im, '').trim();
  }

  toLatex() {
    // Convert paragraphs to LaTeX
    const paragraphLatex = this.paragraphs.map(p => p.toLatex()).join('\n\n');
    
    // Add keywords to the abstract if they exist
    let keywordsLatex = '';
    if (this.keywordsSections && this.keywordsSections.length > 0) {
      keywordsLatex = '\n\n' + this.keywordsSections.map(k => k.toLatex()).join('\n');
    }
    
    // Create the abstract environment with keywords inside
    return `\\begin{abstract}\n${paragraphLatex}${keywordsLatex}\n\\end{abstract}\n\n`;
  }
}

/**
 * Keywords section (special handling for keywords)
 */
class KeywordsSection extends Node {  // Not extending Section to avoid paragraph parsing
  constructor(rawContent, options = {}) {
    super();
    this.rawContent = rawContent.trim();
    this.options = options;
    this.keywords = [];
    this.processor = new LatexProcessor(options);
    this.parse();
  }

  removeHeading(content) {
    // Handle any heading level for keywords
    return content.replace(/^#+\s+Keywords\s*\n/im, '').trim();
  }

  parse() {
    // Extract keywords from list items
    this.keywords = this.rawContent
      .split('\n')
      .filter(line => line.trim().startsWith('- '))
      .map(line => line.replace(/^- /, '').trim());

    // Extract annotations (comments)
    const contentWithoutHeading = this.removeHeading(this.rawContent);
    const paragraphData = this.processor.splitIntoParagraphs(contentWithoutHeading);

    if (paragraphData.length > 0) {
      this.annotations.pre = paragraphData[0].preComment;
      this.annotations.post = paragraphData[0].postComment;
    }
  }

  toLatex() {
    // Format keywords
    const keywordsStr = this.keywords.join(' \\and ');
    
    // Include annotations if they exist
    return this.wrapWithAnnotations(`\\keywords{${keywordsStr}.}`);
  }
}

/**
 * Bibliography section (special handling for citations)
 */
class BibliographySection extends Section {
  removeHeading(content) {
    return content.replace(/## Bibliography\s*\n/, '').trim();
  }

  parse() {
    // Extract citation definitions
    this.bibItems = [];
    const regex = /\[\^([a-zA-Z0-9_-]+)\]:([\s\S]*?)(?=\[\^|$)/g;

    let match;
    const content = this.rawContent;

    while ((match = regex.exec(content))) {
      const key = match[1];
      const text = match[2].trim();
      // Skip "end" markers
      if (key !== 'end') {
        this.bibItems.push({ key, text });
      }
    }
  }

  toLatex() {
    // Create bibliography environment
    let bibLatex = `\\begin{thebibliography}{99}\n\n`;
    const processor = new LatexProcessor(this.options);

    for (const item of this.bibItems) {
      const processedText = processor.processFormattedText(item.text);
      bibLatex += `\\bibitem{${item.key}} ${processedText}\n\n`;
    }

    bibLatex += `\\end{thebibliography}\n\n`;

    return bibLatex;
  }
}

/**
 * Regular content section (generates LaTeX sections)
 */
class ContentSection extends Section {
  parse() {
    // Call parent parse method
    super.parse();
    
    // Identify section level and title - look for any heading level
    if (this.rawContent.match(/^## (.+)$/m)) {
      this.level = 'section';
      this.title = this.rawContent.match(/^## (.+)$/m)[1];
    } else if (this.rawContent.match(/^### (.+)$/m)) {
      this.level = 'subsection';
      this.title = this.rawContent.match(/^### (.+)$/m)[1];
    } else if (this.rawContent.match(/^#### (.+)$/m)) {
      this.level = 'subsubsection';
      this.title = this.rawContent.match(/^#### (.+)$/m)[1];
    } else {
      // Try to match any heading style if none of the above matched
      const headingMatch = this.rawContent.match(/^(#+)\s+(.+)$/m);
      if (headingMatch) {
        // Determine level based on number of # characters
        const hashCount = headingMatch[1].length;
        if (hashCount === 1) {
          this.level = 'chapter';
        } else if (hashCount === 2) {
          this.level = 'section';
        } else if (hashCount === 3) {
          this.level = 'subsection';
        } else {
          this.level = 'subsubsection';
        }
        this.title = headingMatch[2];
      } else {
        this.level = null;
        this.title = null;
      }
    }
  }

  removeHeading(content) {
    // Remove section heading based on level
    if (content.match(/^## .+$/m)) {
      return content.replace(/^## .+$/m, '').trim();
    } else if (content.match(/^### .+$/m)) {
      return content.replace(/^### .+$/m, '').trim();
    } else if (content.match(/^#### .+$/m)) {
      return content.replace(/^#### .+$/m, '').trim();
    }
    
    // Try to match any heading style if none of the above matched
    const headingMatch = content.match(/^(#+)\s+.+$/m);
    if (headingMatch) {
      const pattern = new RegExp(`^${headingMatch[1]}\\s+.+$`, 'm');
      return content.replace(pattern, '').trim();
    }
    
    return content;
  }

  toLatex() {
    const processor = new LatexProcessor(this.options);
    let sectionLatex = '';

    // Add section title if there is one
    if (this.level && this.title) {
      // Process formatting in the title instead of just escaping
      const processedTitle = processor.processFormattedText(this.title);
      sectionLatex = `\\${this.level}{${processedTitle}}\n\n`;
    }

    // Add paragraph content
    const paragraphLatex = this.paragraphs.map(p => p.toLatex()).join('\n\n');

    return sectionLatex + paragraphLatex + '\n\n';
  }
}

/**
 * Base class for paragraph nodes
 */
class Paragraph extends Node {
  constructor(content, options = {}) {
    super();
    this.content = content;
    this.options = options;
    this.processor = new LatexProcessor(options);
  }
}

/**
 * Regular text paragraph
 */
class TextParagraph extends Paragraph {
  toLatex() {
    const processedText = this.processor.processFormattedText(this.content);
    return this.wrapWithAnnotations(processedText);
  }
}

/**
 * Blockquote paragraph
 */
class BlockquoteParagraph extends Paragraph {
  toLatex() {
    // Extract the content without the blockquote markers
    const quoteLines = this.content
      .split('\n')
      .map(line => line.replace(/^>\s*/, '').trim())
      .filter(line => line.length > 0);
    
    const quoteText = quoteLines.join('\n');
    
    // Process the content as regular text
    const processedText = this.processor.processFormattedText(quoteText);
    
    // Wrap in quote environment
    const quote = `\\begin{quote}\n${processedText}\n\\end{quote}`;
    
    return this.wrapWithAnnotations(quote);
  }
}

/**
 * List paragraph (ordered or unordered)
 */
class ListParagraph extends Paragraph {
  toLatex() {
    const lines = this.content.split('\n').filter(line => line.trim() !== '');
    const isOrdered = lines[0].match(/^\d+\. /);
    
    // Process list items
    const items = lines.map(line => {
      let itemContent;
      
      if (isOrdered) {
        itemContent = line.replace(/^\d+\.\s+/, '');
      } else {
        itemContent = line.replace(/^-\s+/, '');
      }
      
      return `\\item ${this.processor.processFormattedText(itemContent)}`;
    });
    
    // Create list environment
    const environment = isOrdered ? 'enumerate' : 'itemize';
    const list = `\\begin{${environment}}\n${items.join('\n')}\n\\end{${environment}}`;
    
    return this.wrapWithAnnotations(list);
  }
}

/**
 * Utility class for LaTeX processing operations
 */
class LatexProcessor {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Process HTML comments to LaTeX comments
   * @param {string} markdown - Raw markdown with HTML comments
   * @returns {string} - Markdown with converted comments
   */
  processComments(markdown) {
    return markdown.replace(/<!--([\s\S]*?)-->/g, (_, content) => 
      `% ${content.replace(/\n/g, '\n% ')}`
    );
  }

  /**
   * Convert citation references to LaTeX \cite commands
   * @param {string} markdown - Markdown with citation references
   * @returns {string} - Markdown with LaTeX citations
   */
  processCitations(markdown) {
    // Get bibliography entries to extract valid citation keys
    const bibEntries = [];
    const bibRegex = /\[\^([^\]]+)\]:/g;
    let bibMatch;
    let processed = markdown;

    // Extract all bibliography keys from the bibliography section
    while ((bibMatch = bibRegex.exec(markdown)) !== null) {
      bibEntries.push(bibMatch[1]);
    }

    // Replace citation references that match bibliography entries
    for (const entry of bibEntries) {
      // Escape special characters in the entry for use in regex
      const entryEscaped = entry.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\[\\^${entryEscaped}\\](?!:)`, 'g');
      processed = processed.replace(regex, `\\cite{${entry}}`);
    }

    // Handle any remaining standard citation references
    processed = processed.replace(/\[\^([a-zA-Z0-9_-]+)\](?!:)/g, '\\cite{$1}');

    return processed;
  }

  /**
   * Split content into paragraphs
   * @param {string} content - Raw content
   * @returns {Array} - Array of paragraph blocks with comment context
   */
  splitIntoParagraphs(content) {
    // Split by double newlines
    const parts = content.split(/\n\n+/);
    const paragraphs = [];
    
    for (const part of parts) {
      if (part.trim() === '') continue;
      
      // Extract comments and paragraph content
      let preComment = '';
      let postComment = '';
      let paragraphContent = part.trim();
      
      // Look for comments at start of paragraph
      if (paragraphContent.startsWith('%')) {
        const lines = paragraphContent.split('\n');
        const commentLines = [];
        
        // Collect comment lines at the start
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim().startsWith('%')) {
            commentLines.push(lines[i]);
          } else {
            break;
          }
        }
        
        // Extract comments
        if (commentLines.length > 0) {
          preComment = commentLines.join('\n');
          paragraphContent = paragraphContent.substring(preComment.length).trim();
        }
      }
      
      // Look for comments at the end
      if (paragraphContent.includes('\n%')) {
        const lastCommentIndex = paragraphContent.lastIndexOf('\n%');
        postComment = paragraphContent.substring(lastCommentIndex + 1);
        paragraphContent = paragraphContent.substring(0, lastCommentIndex).trim();
      }
      
      paragraphs.push({
        preComment,
        content: paragraphContent,
        postComment
      });
    }
    
    return paragraphs;
  }

  /**
   * Process formatted text with markdown syntax
   * @param {string} text - Raw markdown text
   * @returns {string} - Processed LaTeX text
   */
  processFormattedText(text) {
    if (!text) return '';

    let processed = text;

    // Ampersands are handled in escapeLatex function only, to avoid double escaping

    // Handle inline code - preserve exactly as is within \texttt
    processed = processed.replace(/`([^`]+)`/g, (_, code) => {
      return `$\\texttt{${code}}$`;
    });

    // Process bold text
    processed = processed.replace(/\*\*([^*]+)\*\*/g, (_, bold) => {
      // First process any markdown formatting inside the bold text
      const processedBold = this.processInlineFormattingOnly(bold);
      return `\\textbf{${processedBold}}`;
    });

    // Process italic text
    processed = processed.replace(/\*([^*]+)\*/g, (_, italic) => {
      // First process any markdown formatting inside the italic text
      const processedItalic = this.processInlineFormattingOnly(italic);
      return `\\emph{${processedItalic}}`;
    });
    
    // Process links
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, href) => {
      // First process any markdown formatting inside the link text
      const processedLinkText = this.processInlineFormattingOnly(linkText);
      
      // Handle markdown links
      if (href.endsWith('.md')) {
        try {
          const htmlPath = ref.mdToHtmlPath(href);
          
          // Handle relative paths
          if (href.startsWith('../../')) {
            const pathParts = htmlPath.split('/');
            const cleanPath = '/' + pathParts.slice(pathParts.length - 2).join('/');
            return `\\lib{${cleanPath}}{${processedLinkText}}`;
          } else if (href.startsWith('./')) {
            return `\\lib{/${htmlPath}}{${processedLinkText}}`;
          } else {
            return `\\href{${this.options.baseUrl}${htmlPath}}{${processedLinkText}}\\xspace`;
          }
        } catch (e) {
          console.log(`Error processing link: ${e.message}`);
          return `\\href{${href}}{${processedLinkText}}\\xspace`;
        }
      } else {
        // Regular URL
        return `\\href{${href}}{${processedLinkText}}\\xspace`;
      }
    });
    
    return processed;
  }

  /**
   * Process only inline formatting (bold, italic, code) without other transformations
   * @param {string} text - Raw text with formatting
   * @returns {string} - Text with formatting processed
   */
  processInlineFormattingOnly(text) {
    if (!text) return '';
    
    let processed = text;
    
    // Process nested inline code
    processed = processed.replace(/`([^`]+)`/g, (_, code) => {
      return `$\\texttt{${code}}$`;
    });
    
    // Process nested bold
    processed = processed.replace(/\*\*([^*]+)\*\*/g, (_, bold) => {
      return `\\textbf{${bold}}`;
    });
    
    // Process nested italic
    processed = processed.replace(/\*([^*]+)\*/g, (_, italic) => {
      return `\\emph{${italic}}`;
    });
    
    return processed;
  }

  /**
   * Escape LaTeX special characters
   * @param {string} text - Raw text
   * @returns {string} - Escaped text
   */
  escapeLatex(text) {
    if (!text || typeof text !== 'string') return text;
    
    // Skip if text already contains LaTeX commands
    if (text.includes('\\emph{') || 
        text.includes('\\textbf{') || 
        text.includes('\\texttt{') ||
        text.includes('\\lib{') ||
        text.includes('\\href{') ||
        text.includes('\\cite{')) {
      return text;
    }
    
    return text
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\$/g, '\\$')
      .replace(/&/g, '\\&') // Keep this for any ampersands missed by early processing
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/%(?![^\n]*\n)/g, '\\%') // Don't escape % at end of line (comment)
      .replace(/~/g, '\\textasciitilde{}')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/\|/g, '\\textbar{}');
  }

  /**
   * Post-process LaTeX to fix common issues
   * @param {string} latex - Processed LaTeX
   * @returns {string} - Final LaTeX with fixes applied
   */
  postProcessLatex(latex) {
    let processed = latex;

    // Fix common formatting issues
    processed = processed
      // Fix \begin{quote}\n\begin{quote} (nested quotes)
      .replace(/\\begin{quote}\s*\\begin{quote}/g, '\\begin{quote}')
      .replace(/\\end{quote}\s*\\end{quote}/g, '\\end{quote}')

      // Fix \textbackslash{}\{...\} issues
      .replace(/\\textbackslash\{\}\\{([^}]*)\\}/g, '\\textbackslash{}\\{$1\\}')

      // Post-processing step 1: Fix standalone ampersands with proper spacing
      .replace(/ & /g, ' \\& ') // Fix ampersands with space on both sides
      .replace(/([a-zA-Z0-9]})\s+&\s+([a-zA-Z0-9])/g, '$1 \\& $2') // Fix ampersands between words/numbers

      // Post-processing step 2: Fix ampersands in bibliography items
      .replace(/\\bibitem\{.*?\}(.*?)(?=\\bibitem|\\end\{thebibliography\})/gs,
        match => match.replace(/ & /g, ' \\& ').replace(/([a-zA-Z])\s*&\s*([a-zA-Z])/g, '$1 \\& $2'))

      // Post-processing step 3: Normalize line breaks - limit to at most one empty line between sections
      .replace(/\n{3,}/g, '\n\n')

      // Post-processing step 4: Remove empty lines between section headers and comments
      .replace(/(\\section(?:\*)?{[^}]*})\n\n(%)/g, '$1\n$2')

      // Post-processing step 5: Transform specific href to lib command
      .replace(/\\href\{https:\/\/dna-platform\.github\.io\/inexplicable-phenomena\/inexplicable-phenomena\.html\}\{([^}]*)\}/g,
               '\\lib{/articles/inexplicable-phenomena/inexplicable-phenomena.html}{On the Formal Inexplicability of Self-Evident Metaphysical Phenomena and Related Systems}');

    return processed;
  }
}

/**
 * Check LaTeX packages are installed
 * @returns {Promise<boolean>} - Success status
 */
async function checkLatexPackages() {
  return new Promise(resolve => {
    console.log('Checking for required LaTeX packages...');
    
    // List of required packages to check
    const requiredPackages = [
      'graphicx', 'xcolor', 'soul', 'etoolbox', 
      'xspace', 'url', 'hyperref', 'amsmath', 'amssymb'
    ];
    
    // Use kpsewhich to check for package availability
    const cmd = `kpsewhich ${requiredPackages.map(pkg => pkg + '.sty').join(' ')}`;
    
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error('Error checking LaTeX packages:', error.message);
        console.log('Make sure you have a complete LaTeX distribution installed.');
        resolve(false);
        return;
      }
      
      // Count how many packages were found
      const foundPackages = stdout.trim().split('\n').filter(line => line.trim() !== '');
      const missingPackages = requiredPackages.length - foundPackages.length;
      
      if (missingPackages === 0) {
        console.log('✓ All required LaTeX packages are installed.');
        resolve(true);
      } else {
        console.error(`✗ Missing ${missingPackages} required LaTeX packages.`);
        console.log('The following packages are required:');
        console.log(requiredPackages.join(', '));
        console.log('Please install a complete LaTeX distribution like TeX Live or MiKTeX.');
        resolve(false);
      }
    });
  });
}

/**
 * Compile LaTeX to PDF
 * @param {string} texFile - Path to LaTeX file
 * @returns {Promise<boolean>} - Success status
 */
async function compilePDF(texFile) {
  return new Promise(resolve => {
    const dir = path.dirname(texFile);
    const filename = path.basename(texFile);
    
    console.log(`Compiling ${texFile} to PDF...`);
    
    // Run pdflatex twice to resolve references
    const cmd = `cd "${dir}" && pdflatex -interaction=nonstopmode "${filename}" && pdflatex -interaction=nonstopmode "${filename}"`;
    
    exec(cmd, (error, stdout, stderr) => {
      // Check for PDF generation in the output
      if (stdout.includes('Output written on') && stdout.includes('.pdf')) {
        console.log(`Successfully generated ${texFile.replace(/\.tex$/, '.pdf')}`);
        resolve(true);
      } else {
        console.error(`PDF compilation failed.`);
        
        // Print limited output to avoid overwhelming the console
        const outputLines = stdout.split('\n');
        if (outputLines.length > 20) {
          console.log("First 10 lines of output:");
          console.log(outputLines.slice(0, 10).join('\n'));
          console.log("...");
          console.log("Last 10 lines of output:");
          console.log(outputLines.slice(-10).join('\n'));
        } else {
          console.log(stdout);
        }
        
        if (stderr) {
          console.error("Error output:");
          console.error(stderr);
        }
        
        resolve(false);
      }
    });
  });
}

/**
 * Clean auxiliary LaTeX files
 * @param {string} texFile - Path to LaTeX file
 * @returns {Promise<boolean>} - Success status
 */
async function cleanFiles(texFile) {
  return new Promise(resolve => {
    const dir = path.dirname(texFile);
    const baseName = path.basename(texFile, '.tex');
    const extensions = ['.aux', '.log', '.out'];
    
    console.log(`Cleaning auxiliary files for ${texFile}...`);

    // Create a list of files to remove
    const filesToRemove = extensions.map(ext => `${dir}/${baseName}${ext}`);

    // Remove each file
    let removedCount = 0;
    filesToRemove.forEach(file => {
      try {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
          console.log(`Removed: ${file}`);
          removedCount++;
        }
      } catch (err) {
        console.error(`Error removing ${file}: ${err.message}`);
      }
    });

    if (removedCount > 0) {
      console.log(`Cleaned ${removedCount} auxiliary files`);
    } else {
      console.log('No auxiliary files found to clean');
    }

    resolve(true);
  });
}

/**
 * Convert markdown to LaTeX
 * @param {string} inputFile - Path to markdown file
 * @param {string} outputFile - Path to output LaTeX file
 * @param {object} options - Processing options
 * @returns {Promise<boolean>} - Success status
 */
async function convert(inputFile, outputFile, options = {}) {
  try {
    console.log(`Converting ${inputFile} to ${outputFile}...`);
    
    // Read markdown file
    const markdown = fs.readFileSync(inputFile, 'utf8');
    
    // Create document and parse
    const document = new DocumentNode({
      ...options,
      debug: options.debug || false
    });
    
    document.parse(markdown);
    const latex = document.toLatex();
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write output file
    fs.writeFileSync(outputFile, latex);
    
    console.log(`Successfully converted ${inputFile} to ${outputFile}`);
    return true;
  } catch (error) {
    console.error(`Error converting file: ${error.message}`);
    if (options.debug) {
      console.error(error.stack);
    }
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: node compile-tex-2.js <input.md> [output.tex] [--pdf] [--clean] [--debug] [--check-packages]');
    process.exit(1);
  }

  // Extract flags and non-flag arguments
  const flags = args.filter(arg => arg.startsWith('--'));
  const nonFlagArgs = args.filter(arg => !arg.startsWith('--'));

  // Handle package check
  if (flags.includes('--check-packages')) {
    const packagesOk = await checkLatexPackages();
    process.exit(packagesOk ? 0 : 1);
    return;
  }

  const inputFile = nonFlagArgs[0];
  if (!inputFile) {
    console.log('Error: Input file is required');
    process.exit(1);
  }

  const outputFile = nonFlagArgs[1] || inputFile.replace(/\.md$/, '.tex');
  const shouldCompile = flags.includes('--pdf');
  const shouldClean = flags.includes('--clean');
  const debug = flags.includes('--debug');

  if (shouldClean) {
    await cleanFiles(outputFile);
  }

  const options = { debug };
  if (await convert(inputFile, outputFile, options)) {
    if (shouldCompile) {
      // Check if packages are installed before compiling
      const packagesOk = await checkLatexPackages();
      if (!packagesOk) {
        console.log('Required LaTeX packages missing. PDF compilation skipped.');
        process.exit(1);
      }
      
      if (await compilePDF(outputFile)) {
        console.log('PDF compilation successful');
      } else {
        console.log('PDF compilation failed');
        process.exit(1);
      }
    }
  } else {
    console.log('Conversion failed');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
} else {
  module.exports = { convert, compilePDF, cleanFiles, checkLatexPackages, DocumentNode };
}