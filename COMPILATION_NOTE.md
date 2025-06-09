# HTML Compilation Standards

This document outlines the standardized approach for compiling Markdown files to HTML in this repository.

## Header Metadata Handling

### Book and Subject References

Both `Book:` and `Subject:` annotations in Markdown files should be treated identically in the HTML output:

```html
<div class="book-info">
  <a href="path-to-book.html" class="book-link">Book Name</a>
</div>
```

Important notes:
1. The `<span class="book-label">Subject</span>` or `<span class="book-label">Book</span>` element should NOT be included in the HTML
2. The label text should NOT appear in the output, only the link itself
3. Any `- Subject:` or `- Book:` lines from the Markdown source should NOT be included in the article body HTML

### Metadata Consistency

All types of entries should follow the same pattern:
- Dictionary entries should link to dictionary.html
- Encyclopedia entries should link to encyclopedia.html
- Article entries should link to their respective synopsis.html
- Synopsis entries should link to articles.html

## Link Transformation

When converting Markdown to HTML:
1. All internal links to .md files should be transformed to .html
2. Files with period prefixes (e.g., .synopsis.md) should be rendered without the period in HTML (e.g., synopsis.html)
3. Links should maintain the correct relative paths based on the file's location

## Template Structure

All HTML files should follow the standard template structure with:
- Consistent CSS styling
- Navigation controls
- Thoughts modal (where applicable)
- Footer with related links
- GitHub repository link

## Compilation Process

The compilation process should:
1. Read the source Markdown file
2. Parse metadata for title, book/subject references, and navigation links
3. Apply the HTML template
4. Transform all internal links to HTML format
5. Remove any metadata lines from the article content
6. Write the resulting HTML to the correct output location

This standardized approach ensures consistency across all sections of the library, regardless of whether entries are in the dictionary, encyclopedia, or articles section.