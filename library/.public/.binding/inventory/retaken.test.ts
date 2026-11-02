import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { createServer } from 'vite';
import { directory } from '../catalogue/catalogue';
import { handedPlaces } from '../children';
import { read } from '../.test/galleys';
import { transforming } from '../reference/transform';
import { configuration } from '../vite.config';
import { handed } from './retaken';

// A CHILD OF A BIND IS HANDED WHERE EVERYTHING STANDS, AND OPENS NO WATCHER — Sprint 112, U1 and U2.
// Doug, 2026-10-17, of the bind that took 714.7 s: "Then we are in trouble for a LOT!" Measured the same
// evening: every child watched every file of his library, about 15 s a child, since the null each child
// passed for its watcher was skipped by Vite's merge; and every child walked and parsed the library again
// for a catalogue its parent had built seconds before. These promise the two costs gone and nothing else
// changed: a child's server keeps no watcher, and what it reads from the hand-off answers exactly what
// the catalogue answers, so every chapter compiles to the same text.

const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chosen, found, card } = read();
const where = mkdtempSync(join(tmpdir(), 'binder-places-'));
const file = join(where, '.places.json');
writeFileSync(file, JSON.stringify(card.places), 'utf8');
afterAll(() => rmSync(where, { recursive: true, force: true }));

describe('a child of a bind', () => {
    it('opens a server that keeps no watcher, since its configuration says so where Vite reads it', async () => {
        process.env[handedPlaces] = file;
        const server = await createServer({
            configFile: join(binding, 'vite.config.ts'),
            logLevel: 'error',
            server: { middlewareMode: true, hmr: false, ws: false },
            appType: 'custom',
        });
        try {
            expect(server.config.server.watch).toBeNull();
            expect(server.watcher.getWatched()).toEqual({});
            // AND NO DEPENDENCY OPTIMIZER, though the React plugin adds React to its list: two children
            // rebuilding one stale cache at once was an EPERM on Windows, 2026-10-18.
            expect(server.environments.client.depsOptimizer).toBeUndefined();
        } finally {
            delete process.env[handedPlaces];
            await server.close();
        }
    }, 60_000);

    it('leaves the workbench its watcher, since nobody hands the workbench anything', () => {
        expect(process.env[handedPlaces]).toBeUndefined();
        expect(configuration({ isPreview: false }).server?.watch).toBeUndefined();
    });

    it('reads where everything stands from its parent\'s file, and answers every key and every scope as the catalogue does', () => {
        const child = handed(binding, chosen, file).directory();
        expect(child.keys()).toEqual(card.keys());
        for (const key of card.keys()) expect(child.where(key), key).toBe(card.where(key));
        for (const book of found.books)
            for (const one of book.files) {
                const path = join(book.path, one);
                expect(child.scope(path), path).toBe(card.scope(path));
            }
        expect(child.table).toEqual(card.table);
    });

    it('holds no catalogue of its own, and says so when one is asked of it', () => {
        expect(() => handed(binding, chosen, file).catalogue()).toThrow(/holds no catalogue/u);
    });

    it('writes every chapter of the test library to the same text the catalogue writes it to', () => {
        const fromFile = directory(JSON.parse(readFileSync(file, 'utf8')));
        let compared = 0;
        for (const book of found.books)
            for (const one of book.files.filter(name => name.endsWith('.tsx'))) {
                const path = join(book.path, one);
                const code = readFileSync(path, 'utf8');
                expect(transforming(code, path, fromFile, book), path).toEqual(transforming(code, path, card, book));
                compared += 1;
            }
        expect(compared).toBeGreaterThan(found.books.length);
    });
});
