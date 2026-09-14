import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative, sep } from 'node:path';
import type { Book } from '../inventory/library';

const named = (file: string): string => file.replace(/\.tsx$/, '');
const local = (file: string): string => named(file).replace(/^[\d.]+-/, '').replace(/-(\w)/g, (_, c: string) => c.toUpperCase());
const classed = (file: string): string => local(file).replace(/^\w/, c => c.toUpperCase());

export const assemble = (face: string, book: Book): string => {
    const opening = ([['cover', '.cover', book.cover], ['synopsis', '.synopsis', book.synopsis], ['contents', '.table', book.contents]] as const)
        .filter(([, , held]) => held);
    const chapters = book.chapters.map(one => one.file);
    const bound = [...opening.map(([name]) => classed(name)), ...chapters.map(classed)];
    const from = relative(dirname(book.module), book.path).split(sep).join('/');
    const lines = [
        `import { $ } from '@dna-platform/chemistry';`,
        `import $Book from '${from}/.book';`,
        ...opening.map(([name, file]) => `import $${classed(name)} from '${from}/${file}';`),
        ...chapters.map(one => `import $${classed(one)} from '${from}/${named(one)}';`),
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
    mkdirSync(dirname(book.module), { recursive: true });
    writeFileSync(book.module, lines.join('\n'), 'utf8');
    return relative(face, book.module).split('\\').join('/');
};
