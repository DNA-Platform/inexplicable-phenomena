import { describe, it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { dotsOf, bare, roleOf, routeOf, ordering, walk } from '../stages/walk.ts';

describe('dots rank, and they rank nothing but folders', () => {
    it('counts only a leading run', () => {
        expect(dotsOf('.physics')).toBe(1);
        expect(dotsOf('..the-library')).toBe(2);
        expect(dotsOf('the-team')).toBe(0);
        expect(dotsOf('a.b.c')).toBe(0);
    });

    it('strips them to leave the label a reader sees', () => {
        expect(bare('..the-library')).toBe('the-library');
        expect(bare('the-team')).toBe('the-team');
    });
});

describe('a dot on a FILE says only that it is not a chapter', () => {
    it('names the two it can be', () => {
        expect(roleOf('.cover.tsx')).toBe('cover');
        expect(roleOf('.synopsis.tsx')).toBe('synopsis');
    });

    it('and anything undotted is a chapter, however it is spelled', () => {
        expect(roleOf('symmetry.tsx')).toBe('chapter');
        expect(roleOf('what-physics-is.tsx')).toBe('chapter');
    });

    it('a dotted file the convention does not know is a chapter, not an error', () => {
        expect(roleOf('.notes.tsx')).toBe('chapter');
    });
});

describe('a route is not a folder path, and the difference is deliberate', () => {
    it('drops the dots, because they are an authoring mark and not an address', () => {
        expect(routeOf('.physics', false)).toBe('/physics');
        expect(routeOf('.physics/the-standard-model', false)).toBe('/physics/the-standard-model');
    });

    it('collapses a folder that SPEAKS for its container onto that container', () => {
        expect(routeOf('.physics/.subject', true)).toBe('/physics');
        expect(routeOf('..the-library', true)).toBe('/');
    });
});

describe('order is the arrangement a person made, and unlisted names fall to the end', () => {
    it('keeps listed entries in the order they were listed', () => {
        const by = ordering(['b.tsx', 'a.tsx']);
        expect(['a.tsx', 'b.tsx'].sort(by)).toEqual(['b.tsx', 'a.tsx']);
    });

    it('puts anything unlisted after everything listed', () => {
        const by = ordering(['b.tsx']);
        expect(['a.tsx', 'b.tsx'].sort(by)).toEqual(['b.tsx', 'a.tsx']);
    });

    it('and sorts the unlisted among themselves alphabetically', () => {
        const by = ordering([]);
        expect(['c.tsx', 'a.tsx', 'b.tsx'].sort(by)).toEqual(['a.tsx', 'b.tsx', 'c.tsx']);
    });
});

// that stops firing is traced to one rule rather than to "the fixture".
const tree = (build: (at: string) => void): string => {
    const at = mkdtempSync(join(tmpdir(), 'walk-unit-'));
    build(at);
    return at;
};

const folder = (root: string, path: string, files: string[] = []): void => {
    mkdirSync(join(root, path), { recursive: true });
    for (const name of files) writeFileSync(join(root, path, name), 'export const x = 1;\n');
};

describe('position decides a kind and the dots only rank', () => {
    it('a folder that speaks for its container is that container BOOK, never a subject', () => {
        const at = tree(root => {
            folder(root, '..own', ['.cover.tsx']);
            folder(root, '.physics/.subject', ['.cover.tsx']);
            folder(root, '.physics/gauge', ['.cover.tsx']);
        });
        const read = walk(at, at);
        const of = (p: string) => read.entries.find(e => e.path === p);
        expect(of('.physics')?.kind).toBe('subject');
        expect(of('.physics/.subject')?.kind).toBe('book');
        expect(of('.physics/gauge')?.kind).toBe('book');
        rmSync(at, { recursive: true, force: true });
    });

    it('a dotted folder holding nothing is INVALID as a subject rather than excused as a book', () => {
        const at = tree(root => {
            folder(root, '..own', ['.cover.tsx']);
            folder(root, '.empty');
        });
        const read = walk(at, at);
        expect(read.diagnostics.some(c => c.at === '.empty' && c.says.includes('holds nothing'))).toBe(true);
        rmSync(at, { recursive: true, force: true });
    });

    it('a container with two equal claimants has nobody speaking for it, and says so', () => {
        const at = tree(root => {
            folder(root, '..own', ['.cover.tsx']);
            folder(root, '.geology/.one', ['.cover.tsx']);
            folder(root, '.geology/.two', ['.cover.tsx']);
        });
        const read = walk(at, at);
        expect(read.diagnostics.some(c => c.at === '.geology' && c.says.includes('no single folder speaks'))).toBe(true);
        rmSync(at, { recursive: true, force: true });
    });

    it('EVERY fault travels in one pass, because a build reporting one at a time is run many times', () => {
        const at = tree(root => {
            folder(root, '.empty');
            folder(root, 'nocover', ['chapter.tsx']);
            folder(root, 'nothing');
        });
        const read = walk(at, at);
        expect(read.diagnostics.length).toBeGreaterThanOrEqual(3);
        rmSync(at, { recursive: true, force: true });
    });
});
