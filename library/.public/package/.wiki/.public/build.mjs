import { cp, rm, readdir, writeFile } from 'node:fs/promises';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = dirname(fileURLToPath(import.meta.url));
const library = resolve(out, '..');

if (basename(out) !== '.public' || basename(library) !== '.wiki')
    throw new Error(`the build stands in .wiki/.public and this one stands in ${library}/${basename(out)}`);

const setup = new Set(['index.html', 'main.tsx', 'vite.config.ts', 'build.mjs']);
const mine = (name) => setup.has(name);
const book = (name) => name !== '.public' && name !== 'node_modules'
    && name !== 'tsconfig.json' && !name.startsWith('.vite');

for (const entry of await readdir(out, { withFileTypes: true }))
    if (!mine(entry.name)) await rm(join(out, entry.name), { recursive: true, force: true });

const lifted = [];
const books = [];
for (const entry of await readdir(library, { withFileTypes: true })) {
    if (!book(entry.name)) continue;
    await cp(join(library, entry.name), join(out, entry.name), { recursive: true });
    lifted.push(entry.name);
    if (entry.isDirectory()) books.push(entry.name);
}

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

    const lines = [
        `import { $ } from '@dna-platform/chemistry';`,
        `import $Book from './.book';`,
        ...opening.map(([name, file]) => `import ${name} from './${file}';`),
        ...chapters.map(one => `import ${local(one)} from './${named(one)}';`),
        ``,
        `const Book = $($Book);`,
        ``,
        `export const book = $<$Book>(`,
        `    <Book />,`,
        ...opening.map(([name]) => `    ${name},`),
        ...chapters.map(one => `    ${local(one)},`),
        `);`,
        ``,
    ];
    await writeFile(join(out, where, 'book.tsx'), lines.join('\n'), 'utf8');
    return chapters.length;
};

for (const name of books) {
    const bound = await bind(name);
    if (bound !== undefined) console.log(`bound ${name}/book.tsx — ${bound} chapters`);
}
