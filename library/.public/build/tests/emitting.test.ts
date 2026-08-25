import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spaced, emit } from '../stages/emit.ts';
import { identifier } from '../stages/catalogue.ts';
import { root } from '../utilities/where.ts';
import type { Book, File, Library } from '../library.ts';

describe('a display name must be SPLIT, and it is forced rather than chosen', () => {
    it('because an alias is an identifier and can never hold a space', () => {
        expect(spaced('ATestLibrary')).toBe('A Test Library');
        expect(spaced('TheStandardModel')).toBe('The Standard Model');
        expect(spaced('Physics')).toBe('Physics');
    });

    it('and a run of capitals stays together until a word begins', () => {
        expect(spaced('DNAPlatform')).toBe('DNA Platform');
    });
});

describe('a card needs an identifier a module can import, and the route already names it', () => {
    it('spends the separators', () => {
        expect(identifier('/physics/the-standard-model')).toBe('physicsTheStandardModel');
        expect(identifier('/the-team')).toBe('theTeam');
    });

    it('and the root is the library itself', () => {
        expect(identifier('/')).toBe('library');
    });
});

describe('the workspace is CLIMBED for, never written down', () => {
    it('finds the repository from inside the compiler', () => {
        expect(existsSync(join(root(), '.vscode', 'sort-order.json'))).toBe(true);
    });

    it('and answers the same thing asked from somewhere else in the tree', () => {
        expect(root(join(root(), 'library', '.public', 'app'))).toBe(root());
    });
});

// A LIBRARY OF ONE BOOK, on disk, because emitting reads source and ts-morph
// opens files by path. Two files is enough to promise carrying and sweeping.
const corpus = (): { at: string; resolved: Library } => {
    const at = mkdtempSync(join(tmpdir(), 'emit-unit-'));
    mkdirSync(join(at, 'alone'), { recursive: true });
    writeFileSync(join(at, 'alone', '.cover.tsx'),
        `import { $Cover, Section, Title, Author, Subject } from '@dna-platform/lib';\nexport class $C extends $Cover {}\nexport const Cover = $C;\n`);
    writeFileSync(join(at, 'alone', '.synopsis.tsx'), `export const Synopsis = 1;\n`);
    writeFileSync(join(at, 'alone', 'one.tsx'), `export const One = 1;\n`);

    const f = (name: string, role: File['role'], declares: string, order: number): File => ({ name, role, order, declares });
    const book: Book = {
        path: 'alone',
        route: '/alone',
        at: 'alone',
        cover: f('.cover.tsx', 'cover', 'Cover', 0),
        synopsis: f('.synopsis.tsx', 'synopsis', 'Synopsis', 1),
        chapters: [f('one.tsx', 'chapter', 'One', 2)],
        entries: [],
    };
    return { at, resolved: { root: at, speaks: '', entries: [], books: [book], diagnostics: [] } };
};

describe('emitting carries the writing and generates the one line a folder cannot say', () => {
    it('carries a chapter BYTE FOR BYTE — the compiler has no opinion about prose', () => {
        const { at, resolved } = corpus();
        const into = mkdtempSync(join(tmpdir(), 'emit-out-'));
        emit(resolved, into);
        expect(readFileSync(join(into, 'alone', 'one.tsx'), 'utf-8'))
            .toBe(readFileSync(join(at, 'alone', 'one.tsx'), 'utf-8'));
        rmSync(at, { recursive: true, force: true });
        rmSync(into, { recursive: true, force: true });
    });

    it('generates a module composing the cover, the contents, then the writing', () => {
        const { at, resolved } = corpus();
        const into = mkdtempSync(join(tmpdir(), 'emit-out-'));
        emit(resolved, into);
        const module = readFileSync(join(into, 'alone', 'book.tsx'), 'utf-8');
        expect(module.indexOf('<Cover />')).toBeLessThan(module.indexOf('<TableOfContents />'));
        expect(module.indexOf('<TableOfContents />')).toBeLessThan(module.indexOf('<Synopsis />'));
        expect(module.indexOf('<Synopsis />')).toBeLessThan(module.indexOf('<One />'));
        rmSync(at, { recursive: true, force: true });
        rmSync(into, { recursive: true, force: true });
    });

    it('and a book that catalogues nothing declares no entries', () => {
        const { at, resolved } = corpus();
        const into = mkdtempSync(join(tmpdir(), 'emit-out-'));
        emit(resolved, into);
        expect(readFileSync(join(into, 'alone', 'book.tsx'), 'utf-8')).not.toContain('export const entries');
        rmSync(at, { recursive: true, force: true });
        rmSync(into, { recursive: true, force: true });
    });

    it('A FILE THE RUN DID NOT WRITE IS REMOVED, which is what makes the output regenerated', () => {
        const { at, resolved } = corpus();
        const into = mkdtempSync(join(tmpdir(), 'emit-out-'));
        emit(resolved, into);
        const stray = join(into, 'alone', 'left-behind.tsx');
        writeFileSync(stray, 'export const x = 1;\n');
        const again = emit(resolved, into);
        expect(existsSync(stray)).toBe(false);
        expect(again.removed).toContain('alone/left-behind.tsx');
        rmSync(at, { recursive: true, force: true });
        rmSync(into, { recursive: true, force: true });
    });
});
