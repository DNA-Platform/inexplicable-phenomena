import fs from 'node:fs';
import path from 'node:path';
const [mode = 'report', tree = '.latex/.public/aaronson'] = process.argv.slice(2);
const keys = [...fs.readFileSync(path.join(tree, 'references.tsx'), 'utf8').matchAll(/<Entry>\{"([\w-]+):/gu)].map(m => m[1]);
const files = fs.readdirSync(tree).filter(f => /^\d+-.*\.tsx$/u.test(f));
let mapped = 0; const unmapped = []; const lists = [];
for (const file of files) {
    const at = path.join(tree, file);
    const source = fs.readFileSync(at, 'utf8');
    const out = source.replace(/\[(\d+(?:,\s*\d+)*)\]/gu, (whole, inner) => {
        const numbers = inner.split(',').map(n => Number(n.trim()));
        if (numbers.some(n => n < 1 || n > keys.length)) { unmapped.push(`${file}: ${whole}`); return whole; }
        const named = numbers.map(n => keys[n - 1]);
        mapped++; if (named.length > 1) lists.push(`${file}: ${whole} -> ${named.join(', ')}`);
        return `<Citation>${named.join(', ')}</Citation>`;
    });
    if (mode === 'apply' && out !== source) fs.writeFileSync(at, out);
}
console.log(`keys ${keys.length} · marks mapped ${mapped} · unmapped ${unmapped.length} ${unmapped.join(' | ')} · lists ${lists.length}`);
for (const list of lists) console.log('  ' + list);
