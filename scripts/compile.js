const fs = require('fs');
const path = require('path');
const { format } = require('./format.js');

function compileMarkdownFiles(dir, outputDir) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all files and directories in the current directory
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    // Skip directories that begin with "."
    if (stats.isDirectory() && !file.startsWith('.')) {
      // Recursively compile markdown files in subdirectories
      compileMarkdownFiles(filePath, path.join(outputDir, file));
    } else if (stats.isFile() && path.extname(file).toLowerCase() === '.md') {
      // Read the markdown file
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if the file is a draft
      const lines = content.split('\n');
      const firstLine = lines[0].trim().toLowerCase();
      if (firstLine !== '[draft]') {
        // Format the markdown content
        const formattedContent = format(content);
        
        // Write the formatted content to the output file
        const outputFilePath = path.join(outputDir, file);
        fs.writeFileSync(outputFilePath, formattedContent);
      }
    }
  });
}

// Clear the release folder
const releaseFolder = './release';
if (fs.existsSync(releaseFolder)) {
  fs.rmSync(releaseFolder, { recursive: true });
}

// Compile markdown files
compileMarkdownFiles('.', releaseFolder, (inputFile, outputFile) => {
  createPage(inputFile, outputFile);
});

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
  } catch (err) {
    logger.error(`Error converting markdown to HTML: ${err.message}`);
    if (err.stack) {
      logger.debug(`Stack trace: ${err.stack}`);
    }
  }
}
