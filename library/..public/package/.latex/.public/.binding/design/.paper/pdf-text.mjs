import fs from 'node:fs';
import { getDocument } from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const [file, from = '102', to = '118', out = 'pnp-references.txt'] = process.argv.slice(2);
const data = new Uint8Array(fs.readFileSync(file));
const pdf = await getDocument({ data, disableWorker: true }).promise;
const lines = [];
for (let n = Number(from); n <= Math.min(Number(to), pdf.numPages); n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    let line = '';
    let lastY = null;
    for (const item of content.items) {
        const y = Math.round(item.transform[5]);
        if (lastY !== null && Math.abs(y - lastY) > 2) { lines.push(line.trim()); line = ''; }
        line += item.str + (item.hasEOL ? '' : '');
        lastY = y;
    }
    if (line.trim()) lines.push(line.trim());
    lines.push(`<<page ${n}>>`);
}
fs.writeFileSync(out, lines.join('\n'));
console.log(`pages ${from}-${to} of ${pdf.numPages}: ${lines.length} lines -> ${out}`);
