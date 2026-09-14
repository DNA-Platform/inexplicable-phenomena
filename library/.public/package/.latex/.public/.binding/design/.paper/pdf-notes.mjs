import fs from 'node:fs';
import { getDocument } from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const [file, out = 'pnp-notes.json'] = process.argv.slice(2);
const data = new Uint8Array(fs.readFileSync(file));
const pdf = await getDocument({ data, disableWorker: true }).promise;
const notes = [];
const marks = [];
let sizes = new Map();
for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    const items = content.items.filter(item => item.str.trim() !== '');
    for (const item of items) { const h = Math.round(item.height); sizes.set(h, (sizes.get(h) ?? 0) + item.str.length); }
    const body = [...sizes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 11;
    let current = null;
    const recent = [];
    for (const item of items) {
        const h = Math.round(item.height);
        const y = item.transform[5];
        const small = h < body - 1;
        const superscript = /^\d{1,3}$/u.test(item.str.trim()) && h <= body - 3;
        if (superscript && y < 130 && current === null) { current = { number: Number(item.str.trim()), page: n, text: '' }; continue; }
        if (superscript && y < 130 && current !== null) { notes.push(current); current = { number: Number(item.str.trim()), page: n, text: '' }; continue; }
        if (current !== null && small && y < 130) { current.text += item.str + (item.hasEOL ? ' ' : ''); continue; }
        if (superscript && y >= 130) marks.push({ number: Number(item.str.trim()), page: n, before: recent.slice(-8).join(' ') });
        if (!small) { recent.push(item.str.trim()); if (recent.length > 12) recent.shift(); }
    }
    if (current !== null) notes.push(current);
}
for (const note of notes) note.text = note.text.replace(/\s+/gu, ' ').trim();
const numbered = new Set(notes.map(note => note.number));
const placed = marks.filter(mark => numbered.has(mark.number) && /[\w.,;:)”’]$/u.test(mark.before));
fs.writeFileSync(out, JSON.stringify({ notes, marks: placed }, null, 1));
console.log(`pages ${pdf.numPages}: notes ${notes.length} (numbers ${notes[0]?.number}..${notes[notes.length - 1]?.number}), marks in text ${marks.length}, placed ${placed.length}`);
console.log(placed.slice(0, 3).map(mark => `${mark.number} (p${mark.page}) after: …${mark.before.slice(-60)}`).join('\n'));
console.log(notes.slice(0, 3).map(note => `${note.number} (p${note.page}): ${note.text.slice(0, 90)}`).join('\n'));
