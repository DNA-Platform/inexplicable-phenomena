import fs from 'node:fs';

const here = 'C:/Users/dougl/AppData/Local/Temp/claude/c--Source-dna-platform-inexplicable-phenomena/824c833b-11c1-4076-956e-ce488e24abd4/scratchpad';
const root = 'C:/Source/dna-platform/inexplicable-phenomena/library/.public/package';
const raw = fs.readFileSync(`${here}/references.txt`, 'utf8');

const combining = { '¨': '̈', '´': '́', '`': '̀', '˚': '̊', '˘': '̆', 'ˆ': '̂', 'ˇ': '̌', '˜': '̃' };
const typeset = text => text
    .replace(/\/˜/gu, '/~')
    .replace(/([¨´`˚˘ˆˇ˜])([A-Za-zı])/gu, (whole, accent, letter) => (letter + combining[accent]).normalize('NFC'))
    .replace(/E\. Tardos\. (.*?) ´ /u, 'É. Tardos. $1 ')
    .replace(/̸=/gu, '≠')
    .replace(/quantph\//gu, 'quant-ph/')
    .replace(/AC0 \./gu, 'AC⁰.').replace(/AC0 circuits/gu, 'AC⁰ circuits').replace(/from AC0/gu, 'from AC⁰')
    .replace(/Σ1 1 -formulae/u, 'Σ¹₁-formulae')
    .replace(/A 2n 2 − log\(n\) − 1/u, 'A 2n² − log(n) − 1')
    .replace(/P A ≠ NP A ≠ coNP A/u, 'Pᴬ ≠ NPᴬ ≠ coNPᴬ')
    .replace(/GLn\(C\)/u, 'GLₙ(ℂ)')
    .replace(/nxn chess/u, 'n×n chess');

const chunks = raw.split(/\n(?=\[\d+\] )/u);
const entries = [];
for (const chunk of chunks) {
    const lines = chunk.split(/\r?\n/u);
    const kept = [];
    for (const line of lines) {
        if (/^\d{3}[A-Za-z]/u.test(line)) break;
        if (/^\d{2,3}$/u.test(line.trim())) continue;
        kept.push(line.trim());
    }
    const joined = typeset(kept.join(' ').replace(/\s+/gu, ' ').trim());
    const numbered = /^\[(\d+)\]\s*(.*)$/u.exec(joined);
    if (!numbered) continue;
    entries.push({ number: Number(numbered[1]), text: numbered[2] });
}

const fold = s => s.normalize('NFD').replace(/[\u0300-\u036f]/gu, '').replace(/[˚¨´`˜]/gu, '').toLowerCase().replace(/[^a-z]/gu, '');
const surname = text => {
    let rest = text;
    rest = rest.replace(/^(?:[A-Z](?:-[A-Z])?\.(?:-[A-Z]\.)?\s*)+/u, '');
    const named = /^((?:(?:van|de|Le|von|der)\s)?[A-Z][A-Za-z\u00C0-\u024F'`´˚¨˜-]+(?:\s[A-Z][A-Za-z\u00C0-\u024F'`´˚¨˜-]+)*)/u.exec(rest);
    return named ? named[1].replace(/\s+et$/u, '') : 'entry';
};
const year = text => { const m = /(?<!\d)(?:19|20)\d\d(?!\d)/u.exec(text); return m ? m[0] : ''; };

const seen = new Map();
for (const entry of entries) {
    const base = fold(surname(entry.text)) + year(entry.text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    entry.key = count === 0 ? base : base + String.fromCharCode(97 + count);
}

const lines = entries.map(entry => `                    <Entry>{${JSON.stringify(`${entry.key}: ${entry.text}`)}}</Entry>`).join('\n');
const file = `import { $ } from '@dna-platform/chemistry';
import { $Chapter, Entry, Heading, References, Section } from '@dna-platform/public';

export default class $References extends $Chapter {
    print() {
        return (
            <References>
                <Section>
                    <Heading>References</Heading>
${lines}
                </Section>
            </References>
        );
    }
}
`;
for (const dir of ['.latex/.public/aaronson', '.latex/aaronson']) fs.writeFileSync(`${root}/${dir}/references.tsx`, file);

const wanted = { cook: 76, hartmanis: 122, baker: 38, razborov: 223, algebrization: 10, williams: 280, gct: 197 };
const mapping = Object.fromEntries(Object.entries(wanted).map(([old, number]) => [old, entries.find(e => e.number === number)?.key]));
let cited = 0;
for (const dir of ['.latex/.public/aaronson', '.latex/aaronson']) {
    for (const name of ['1-introduction.tsx', '3-beliefs.tsx', '6-progress.tsx']) {
        const path = `${root}/${dir}/${name}`;
        const text = fs.readFileSync(path, 'utf8');
        const out = text.replace(/<Citation>([\w-]+)<\/Citation>/gu, (whole, key) => { if (!mapping[key]) return whole; cited++; return `<Citation>${mapping[key]}</Citation>`; });
        fs.writeFileSync(path, out);
    }
}
console.log(`entries: ${entries.length} (first ${entries[0].number}, last ${entries[entries.length - 1].number})`);
console.log('mapping:', JSON.stringify(mapping));
console.log(`citations rewritten: ${cited}`);
console.log('collisions with letters:', entries.filter(e => /[a-z]\d{4}[b-z]$/u.test(e.key)).length);
console.log('sample keys:', entries.slice(0, 12).map(e => e.key).join(' '));
