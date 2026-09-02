import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { config } from './config.ts';
import { walk } from './walk.ts';
import { read } from './read.ts';
import { resolve } from './resolve.ts';
import type { Book, Library } from './library.ts';

const forward = (p: string): string => p.split(sep).join('/');

const specifier = (name: string): string => './' + name.replace(/\.tsx?$/, '');

const assemble = (book: Book, pack: string): string => {
    const parts = [book.cover, book.synopsis, ...book.chapters];
    const imports = [
        `import { $ } from '@dna-platform/chemistry';`,
        `import { Book, TableOfContents } from '${pack}';`,
        ...parts.map(file => `import { ${file.declares} } from '${specifier(file.name)}';`),
    ];
    const inside = [
        `${book.cover.declares}`,
        `$(<TableOfContents />)`,
        `${book.synopsis.declares}`,
        ...book.chapters.map(file => `${file.declares}`),
    ];
    return `${imports.join('\n')}\n\nexport const book = $(\n    <Book />,\n${inside.map(one => `    ${one}`).join(',\n')},\n);\n`;
};

const doors = (library: Library, pack: string): string => `import type { $Book } from '${pack}';

export const books: Record<string, () => Promise<{ book: $Book }>> = {
${library.books.map(book => `    ${JSON.stringify(book.route)}: () => import('./${book.path}/book'),`).join('\n')}
};
`;

const routed = (library: Library): string => `export const routes: string[] = [
${library.books.map(book => `    ${JSON.stringify(book.route)},`).join('\n')}
];
`;

const gather = (dir: string): string[] => {
    if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return [];
    return readdirSync(dir).flatMap(name => {
        const at = join(dir, name);
        return statSync(at).isDirectory() ? gather(at) : [forward(at)];
    });
};

export type Emitted = { carried: number; generated: number; removed: string[] };

export const emit = (library: Library, to: string, pack: string): Emitted => {
    const written = new Set<string>();
    const put = (at: string, text: string | Buffer): void => {
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, text);
        written.add(forward(at));
    };
    let carried = 0;
    for (const book of library.books) {
        for (const file of [book.cover, book.synopsis, ...book.chapters]) {
            put(join(to, book.path, file.name), readFileSync(join(library.root, book.path, file.name)));
            carried++;
        }
        put(join(to, book.path, 'book.tsx'), assemble(book, pack));
    }
    put(join(to, 'books.ts'), doors(library, pack));
    put(join(to, 'routes.ts'), routed(library));
    const stale = gather(to).filter(file => !written.has(file));
    for (const at of stale) rmSync(at);
    const prune = (dir: string): boolean => {
        if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return false;
        const left = readdirSync(dir).filter(name => !prune(join(dir, name)));
        if (left.length || dir === to) return false;
        rmSync(dir, { recursive: true });
        return true;
    };
    prune(to);
    return { carried, generated: library.books.length + 2, removed: stale.map(file => forward(relative(to, file))) };
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('emit.ts <corpus>');
        process.exit(1);
    }
    const bound = config(at);
    const walked = walk(bound.from);
    const library = resolve(read({ ...walked, entries: walked.entries.filter(entry => !`${walked.root}/${entry.path}/`.startsWith(bound.to + '/')) }));
    const emitted = emit(library, bound.to, bound.package);
    console.log(`EMIT ${emitted.carried} carried · ${emitted.generated} generated · → ${bound.to}`);
    for (const gone of emitted.removed) console.log(`  removed ${gone} — nothing in the corpus writes it`);
}
