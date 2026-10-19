import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { manifest } from '../manifest/manifest';
import { bound, pulled } from './galleys';

// THE BUNDLE IS KEPT BY BOOK. Sprint 112, on Doug's "We can't have an every build cost of 19 min": one
// galley bound three times — from nothing, with nothing changed, and with one chapter edited — and what
// the bundle line says each time. From nothing every book's chunk is built with the shared entries and
// the app; with nothing changed nothing is built; with one chapter edited that book's chunk is built, the
// rest kept, the shared kept, and the app built again since its index names the new chunk. The shell
// carries the import map before the app's script, every file a record names stands in the face, and a
// page's chunk is the one its book's record names.
describe('a bind of the test library that keeps its bundle', () => {
    const galley = pulled();
    afterAll(() => { galley.remove(); });

    it('builds every chunk, the shared entries and the app the first time, and nothing the second', () => {
        const first = bound(galley);
        expect(first).toMatch(/^bundle +(\d+) books built · 0 kept · the shared built · the app built/mu);
        const record = manifest.read(galley.binding);
        expect(Object.keys(record.chunks).length).toBeGreaterThan(0);
        for (const one of Object.values(record.chunks)) {
            expect(one.files).toContain(one.entry);
            for (const file of one.files) expect(existsSync(join(galley.face, file)), file).toBe(true);
            expect(Object.keys(one.bindings).some(name => name === 'react' || name === 'react/jsx-runtime')).toBe(true);
        }
        expect(record.shared?.map).toHaveProperty('react');
        expect(record.shared?.map).toHaveProperty('@dna-platform/chemistry');
        for (const file of record.shared?.files ?? []) expect(existsSync(join(galley.face, file)), file).toBe(true);
        const shell = readFileSync(join(galley.binding, '.shell.html'), 'utf8');
        expect(shell.indexOf('<script type="importmap">')).toBeGreaterThan(-1);
        expect(shell.indexOf('<script type="importmap">')).toBeLessThan(shell.indexOf('<script type="module"'));
        const second = bound(galley);
        expect(second).toMatch(/^bundle +0 books built · \d+ kept · the shared kept · the app kept/mu);
    });

    it('builds one chunk and the app when one chapter changed, and keeps the rest', () => {
        const before = manifest.read(galley.binding);
        const chapter = join(galley.library, 'paper', '1-the-argument.tsx');
        writeFileSync(chapter, readFileSync(chapter, 'utf8').replace('    </Chapter>', '        <Paragraph>One more sentence, said after the first bind.</Paragraph>\n    </Chapter>'));
        const third = bound(galley);
        expect(third).toMatch(/^bundle +1 book built · \d+ kept · the shared kept · the app built/mu);
        const after = manifest.read(galley.binding);
        expect(after.chunks.paper.entry).not.toBe(before.chunks.paper.entry);
        for (const folder of Object.keys(before.chunks).filter(one => one !== 'paper')) expect(after.chunks[folder].entry, folder).toBe(before.chunks[folder].entry);
        expect(after.shared?.digest).toBe(before.shared?.digest);
        expect(existsSync(join(galley.face, before.chunks.paper.entry))).toBe(false);
        expect(existsSync(join(galley.face, after.chunks.paper.entry))).toBe(true);
    });
});
