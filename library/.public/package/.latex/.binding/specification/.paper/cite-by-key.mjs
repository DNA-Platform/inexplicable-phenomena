import fs from 'node:fs';
const root = 'C:/Source/dna-platform/inexplicable-phenomena/library/.public/package';
let total = 0;
for (const dir of ['.latex/.public/aaronson', '.latex/aaronson']) {
    for (const file of ['1-introduction.tsx', '3-beliefs.tsx', '6-progress.tsx']) {
        const path = `${root}/${dir}/${file}`;
        const text = fs.readFileSync(path, 'utf8');
        let count = 0;
        const out = text.replace(/<Citation>\[\d+\]\(([\w-]+)\)<\/Citation>/g, (whole, key) => { count++; return `<Citation>${key}</Citation>`; });
        fs.writeFileSync(path, out);
        total += count;
        console.log(`${dir}/${file}: ${count}`);
    }
    fs.copyFileSync(`${root}/.latex/.public/aaronson/references.tsx`, `${root}/${dir}/references.tsx`);
}
console.log(`rewritten: ${total}`);
