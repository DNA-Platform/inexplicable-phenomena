// Fold a sketch's sheet and switch into a print.
//   node assemble-sketch.mjs <print.html> <sketch.css> <sketch.js> <out.html> "<title>"
import { readFileSync, writeFileSync } from 'node:fs';

const [print, css, js, out, title] = process.argv.slice(2);
let html = readFileSync(print, 'utf8');
const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />';
html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`).replace('</head>', `${fonts}\n</head>`);
html = html.replace('</body>', `<style id="sk-sheet">\n${readFileSync(css, 'utf8')}</style>\n<script>\n${readFileSync(js, 'utf8')}</script>\n</body>`);
writeFileSync(out, html);
console.log(`sketch: ${out} (${html.length} bytes)`);
