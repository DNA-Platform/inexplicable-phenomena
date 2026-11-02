import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { closure, graph, imports } from '../manifest/graph';
import type { Book } from '../inventory/library';

// A BOOK'S DIGEST IS WHAT IT IMPORTS. Sprint 117, D1, on Doug's "You can't edit anything on the pages
// without a 40 minute run?": every book's digest had held one hash of every code file in the library, so
// any code change staled all of them. Now a book's digest takes the files its own files reach by their
// imports, followed as Vite follows them, so a change to a file reaches only the books that import it.
describe('a book whose digest is the closure of its imports', () => {
    const root = mkdtempSync(join(tmpdir(), 'imports-'));
    afterAll(() => { rmSync(root, { recursive: true, force: true }); });
    const write = (file: string, text: string): string => { const at = join(root, file); mkdirSync(join(at, '..'), { recursive: true }); writeFileSync(at, text); return at; };

    const manual = write('manual/.book.tsx', "export * from './1-the-word~code.tsx';\nexport default class $Manual {}\n");
    const word = write('manual/1-the-word~code.tsx', "import { $Word } from '@dna-platform/public';\nimport { helper } from './2-the-helper~code.tsx';\nimport type { Aside } from './3-aside~code.tsx';\nexport class $Said extends $Word {}\n");
    const helper = write('manual/2-the-helper~code.tsx', "export const helper = 1;\n");
    const aside = write('manual/3-aside~code.tsx', "export const aside = 1;\n");
    const bookFile = write('a-book/.book.tsx', "import { $Manual } from '../manual/.book';\nimport cover from './.cover.tsx';\nexport default class $ABook extends $Manual {}\n");
    write('a-book/.cover.tsx', "import { $Said } from '../manual/1-the-word~code.tsx';\nexport default () => null;\n");
    write('other/.book.tsx', "export default class $Other {}\n");

    const book: Book = { folder: 'a-book', path: join(root, 'a-book'), files: ['.cover.tsx'], resources: new Map(), unaccounted: [], clashing: [], module: '' };

    it('reads the sources a file imports, relative and bare alike', () => {
        expect(imports(word)).toEqual(['@dna-platform/public', './2-the-helper~code.tsx']);
        expect(imports(manual)).toEqual(['./1-the-word~code.tsx']);
    });

    it('follows relative imports to the files they resolve to, a folder\'s .book among them, and never a package', () => {
        const reached = closure(bookFile);
        expect(reached).toContain(manual);
        expect(reached).toContain(word);
        expect(reached).toContain(helper);
        expect(reached).not.toContain(aside);
        expect([...reached].some(file => file.includes('@dna-platform'))).toBe(false);
    });

    it('changes the digest when an imported file changes, and holds it when an unrelated one does', () => {
        const before = graph.digest(book, ['packages']);
        write('manual/3-aside~code.tsx', "export const aside = 2;\n");
        write('other/.book.tsx', "export default class $Other { changed = true }\n");
        expect(graph.digest(book, ['packages'])).toBe(before);
        write('manual/2-the-helper~code.tsx', "export const helper = 2;\n");
        expect(graph.digest(book, ['packages'])).not.toBe(before);
        const after = graph.digest(book, ['packages']);
        write('manual/.book.tsx', "export * from './1-the-word~code.tsx';\nexport default class $Manual { changed = true }\n");
        expect(graph.digest(book, ['packages'])).not.toBe(after);
    });
});
