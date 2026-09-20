import fs from 'node:fs';
import path from 'node:path';
const [mode = 'report', tree = '.latex/.public/aaronson'] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/u, '$1'));
const { notes, marks } = JSON.parse(fs.readFileSync(path.join(here, 'pnp-notes.json'), 'utf8'));
const pages = new Map(notes.map(note => [note.number, note.page]));
const files = fs.readdirSync(tree).filter(f => /^\d+-.*\.tsx$/u.test(f));
const sources = new Map(files.map(f => [f, fs.readFileSync(path.join(tree, f), 'utf8')]));
const escape = word => word.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&').replace(/["“”]/gu, '["“”]').replace(/['‘’]/gu, "['‘’]");
const pattern = words => new RegExp(words.map(escape).join('\\s+'), 'gu');
const placed = [], unplaced = [], seen = new Set();
for (const mark of marks) {
    if (seen.has(mark.number) || pages.get(mark.number) !== mark.page) continue;
    const words = mark.before.replace(/¨ ?/gu, '').replace(/ﬁ/gu, 'fi').replace(/ﬂ/gu, 'fl').split(/\s+/u).filter(Boolean);
    let done = false;
    for (let take = Math.min(6, words.length); take >= 3 && !done; take--) {
        const needle = pattern(words.slice(-take));
        const hits = [];
        for (const [f, src] of sources) for (const m of src.matchAll(needle)) hits.push({ f, at: m.index + m[0].length });
        if (hits.length !== 1) continue;
        const { f, at } = hits[0];
        const src = sources.get(f);
        if (src.slice(at, at + 12).includes('<Footnote>')) { done = true; break; }
        sources.set(f, src.slice(0, at) + `<Footnote>note${mark.number}</Footnote>` + src.slice(at));
        placed.push(`${mark.number} in ${f} after "…${words.slice(-take).join(' ').slice(-50)}"`);
        seen.add(mark.number);
        done = true;
    }
    if (!done) unplaced.push(mark.number);
}
if (mode === 'apply') for (const [f, src] of sources) fs.writeFileSync(path.join(tree, f), src);
console.log(`notes ${notes.length} · marks ${marks.length} · on their page ${marks.filter(m => pages.get(m.number) === m.page).length} · placed ${placed.length} · unplaced ${[...new Set(unplaced)].length}`);
for (const p of placed) console.log('  ' + p);
