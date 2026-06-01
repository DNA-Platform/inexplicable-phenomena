// Validate markdown links, book structure, and navigation chains in a folder recursively.
// Usage: npx tsx src/scripts/validate-links.ts <folder>

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, dirname, join, basename } from 'path';

const target = process.argv[2];
if (!target) {
  console.error('Usage: npx tsx src/scripts/validate-links.ts <folder>');
  process.exit(1);
}

const root = resolve(target);
let totalLinks = 0;
let brokenLinks = 0;
let checkedLinks = 0;
let warnings = 0;
let bookDirs = 0;

function decodeLink(href: string): string {
  try { return decodeURIComponent(href); } catch { return href; }
}

function isBookDir(dir: string): boolean {
  return existsSync(join(dir, '.cover.md'));
}

function validateFrontmatter(filePath: string, content: string): void {
  const relPath = filePath.replace(root, '').replace(/\\/g, '/');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    if (filePath.endsWith('.cover.md')) {
      console.log(`WARN    ${relPath}  Cover file missing frontmatter`);
      warnings++;
    }
    return;
  }

  const fm = fmMatch[1];
  if (filePath.endsWith('.cover.md')) {
    if (!fm.includes('title:')) {
      console.log(`WARN    ${relPath}  Cover frontmatter missing 'title'`);
      warnings++;
    }
    if (!fm.includes('summary:')) {
      console.log(`WARN    ${relPath}  Cover frontmatter missing 'summary'`);
      warnings++;
    }
  }
}

function checkImageRefs(filePath: string, content: string, fileDir: string): void {
  const relPath = filePath.replace(root, '').replace(/\\/g, '/');
  const imgPattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = imgPattern.exec(content)) !== null) {
    const [, alt, href] = match;
    if (href.startsWith('http')) continue;
    const decoded = decodeLink(href.split('#')[0]);
    const targetPath = resolve(fileDir, decoded);
    if (!existsSync(targetPath)) {
      console.log(`BROKEN  ${relPath}  ![${alt}](${href})  (image not found)`);
      brokenLinks++;
    }
    checkedLinks++;
    totalLinks++;
  }
}

function validateNavChain(dir: string): void {
  const entries = readdirSync(dir)
    .filter(e => e.endsWith('.md') && e !== '.cover.md')
    .sort();

  if (entries.length < 2) return;

  const relDir = dir.replace(root, '').replace(/\\/g, '/') || '/';

  for (let i = 0; i < entries.length; i++) {
    const filePath = join(dir, entries[i]);
    const content = readFileSync(filePath, 'utf-8');
    const fileName = entries[i];

    const hasNext = /\[Next:/.test(content);
    const hasPrev = /\[Previous:/.test(content);

    if (i === 0 && !hasNext && entries.length > 1) {
      console.log(`WARN    ${relDir}/${fileName}  First chapter missing [Next:] link`);
      warnings++;
    }
    if (i === entries.length - 1 && !hasPrev && entries.length > 1) {
      console.log(`WARN    ${relDir}/${fileName}  Last chapter missing [Previous:] link`);
      warnings++;
    }
    if (i > 0 && i < entries.length - 1) {
      if (!hasNext) {
        console.log(`WARN    ${relDir}/${fileName}  Middle chapter missing [Next:] link`);
        warnings++;
      }
      if (!hasPrev) {
        console.log(`WARN    ${relDir}/${fileName}  Middle chapter missing [Previous:] link`);
        warnings++;
      }
    }

    // Check that Next: target matches the actual next file
    if (hasNext && i < entries.length - 1) {
      const nextMatch = content.match(/\[Next:\s*\[([^\]]*)\]\(([^)]+)\)/);
      if (nextMatch) {
        const nextHref = nextMatch[2];
        const nextFile = basename(decodeLink(nextHref.split('#')[0]));
        const actualNext = entries[i + 1];
        if (nextFile !== actualNext) {
          console.log(`WARN    ${relDir}/${fileName}  [Next:] points to ${nextFile} but next chapter is ${actualNext}`);
          warnings++;
        }
      }
    }

    // Check that Previous: target matches the actual previous file
    if (hasPrev && i > 0) {
      const prevMatch = content.match(/\[Previous:\s*\[([^\]]*)\]\(([^)]+)\)/);
      if (prevMatch) {
        const prevHref = prevMatch[2];
        const prevFile = basename(decodeLink(prevHref.split('#')[0]));
        const actualPrev = entries[i - 1];
        if (prevFile !== actualPrev) {
          console.log(`WARN    ${relDir}/${fileName}  [Previous:] points to ${prevFile} but previous chapter is ${actualPrev}`);
          warnings++;
        }
      }
    }
  }
}

function validateToc(dir: string): void {
  const coverPath = join(dir, '.cover.md');
  if (!existsSync(coverPath)) return;

  const relDir = dir.replace(root, '').replace(/\\/g, '/') || '/';
  const content = readFileSync(coverPath, 'utf-8');
  const chapters = readdirSync(dir)
    .filter(e => e.endsWith('.md') && e !== '.cover.md')
    .sort();

  for (const chapter of chapters) {
    if (!content.includes(chapter)) {
      console.log(`WARN    ${relDir}/.cover.md  Chapter ${chapter} not listed in TOC`);
      warnings++;
    }
  }
}

function walkDir(dir: string): void {
  const entries = readdirSync(dir);

  if (isBookDir(dir)) {
    bookDirs++;
    validateNavChain(dir);
    validateToc(dir);
  }

  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walkDir(full);
    } else if (entry.endsWith('.md')) {
      checkFile(full);
    }
  }
}

function checkFile(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const fileDir = dirname(filePath);
  const relPath = filePath.replace(root, '').replace(/\\/g, '/');

  validateFrontmatter(filePath, content);
  checkImageRefs(filePath, content, fileDir);

  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;

  for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = linkPattern.exec(lines[i])) !== null) {
      const [fullMatch, text, href] = match;
      if (fullMatch.startsWith('!')) continue;
      totalLinks++;

      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) continue;

      checkedLinks++;
      const decoded = decodeLink(href.split('#')[0]);
      const targetPath = resolve(fileDir, decoded);

      if (!existsSync(targetPath)) {
        brokenLinks++;
        console.log(`BROKEN  ${relPath}:${i + 1}  [${text}](${href})`);
      }
    }
  }
}

console.log(`Validating: ${root}\n`);
walkDir(root);

console.log(`\n--- Summary ---`);
console.log(`Books found: ${bookDirs}`);
console.log(`Links checked: ${checkedLinks} (${totalLinks - checkedLinks} external/anchor skipped)`);
console.log(`Broken: ${brokenLinks}`);
console.log(`Warnings: ${warnings}`);

if (brokenLinks > 0 || warnings > 0) {
  process.exit(1);
}
