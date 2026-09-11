import { cp, rm, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, basename, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = dirname(fileURLToPath(import.meta.url));
const library = resolve(out, '..');

if (basename(out) !== '.public')
    throw new Error(`the compiler stands in a book library's .public and this one stands in ${out}`);

const tooling = new Set(['build.mjs', 'main.tsx', 'index.html', 'vite.config.ts', 'tsconfig.json', 'node_modules', '.public']);
const skipped = (name) => tooling.has(name) || name.startsWith('.vite') || /^verify-.+\.mjs$/.test(name);
const manifest = join(out, '.synced.json');

const walk = async (root, at = '') => {
    const found = [];
    for (const entry of await readdir(join(root, at), { withFileTypes: true })) {
        if (at === '' && skipped(entry.name)) continue;
        if (at !== '' && entry.name === 'book.tsx') continue;
        const path = at === '' ? entry.name : `${at}/${entry.name}`;
        if (entry.isDirectory()) found.push(...await walk(root, path));
        else found.push(path);
    }
    return found;
};

const previous = await readFile(manifest, 'utf8').then(JSON.parse).catch(() => ({ synced: [], generated: [] }));
const synced = await walk(library);
for (const path of synced) await cp(join(library, path), join(out, path));

const at = (name) => name.split('-')[0].split('.').map(Number);
const before = (one, two) => {
    const a = at(one), b = at(two);
    for (let i = 0; i < Math.max(a.length, b.length); i++)
        if ((a[i] ?? -1) !== (b[i] ?? -1)) return (a[i] ?? -1) - (b[i] ?? -1);
    return 0;
};

const bind = async (where) => {
    const held = (await readdir(join(out, where))).filter(one => one.endsWith('.tsx'));
    if (!held.includes('.book.tsx')) return undefined;
    const chapters = held.filter(one => /^\d/.test(one)).sort(before);
    const named = (one) => one.replace(/\.tsx$/, '');
    const local = (one) => named(one).replace(/^[\d.]+-/, '').replace(/-(\w)/g, (_, c) => c.toUpperCase());
    const opening = [['cover', '.cover'], ['synopsis', '.synopsis'], ['contents', '.table']]
        .filter(([, file]) => held.includes(`${file}.tsx`));
    const classed = (one) => local(one).replace(/^\w/, c => c.toUpperCase());
    const bound = [...opening.map(([name]) => classed(name)), ...chapters.map(classed)];
    const lines = [
        `import { $ } from '@dna-platform/chemistry';`,
        `import $Book from './.book';`,
        ...opening.map(([name, file]) => `import $${classed(name)} from './${file}';`),
        ...chapters.map(one => `import $${classed(one)} from './${named(one)}';`),
        ``,
        `const Book = $($Book);`,
        ...bound.map(name => `const ${name} = $($${name});`),
        ``,
        `export const book = $<$Book>(`,
        `    <Book>`,
        ...bound.map(name => `        <${name} />`),
        `    </Book>`,
        `);`,
        ``,
    ];
    await writeFile(join(out, where, 'book.tsx'), lines.join('\n'), 'utf8');
    return { chapters: chapters.length, path: `${where}/book.tsx` };
};

const generated = [];
for (const entry of await readdir(library, { withFileTypes: true })) {
    if (!entry.isDirectory() || skipped(entry.name)) continue;
    const bound = await bind(entry.name);
    if (bound === undefined) continue;
    generated.push(bound.path);
    console.log(`bound ${bound.path} — ${bound.chapters} chapters`);
}

const gone = previous.synced.filter(path => !synced.includes(path) && !generated.includes(path));
for (const path of gone) await rm(join(out, path), { force: true });

await writeFile(manifest, JSON.stringify({ synced, generated }, null, 1), 'utf8');
console.log(`synced ${synced.length} files from ${relative(out, library) || '.'}${sep} · removed ${gone.length} that left the source · ${generated.length} books bound · what the served tree alone carries is untouched`);
