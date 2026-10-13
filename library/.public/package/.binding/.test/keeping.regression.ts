import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { catalogue } from '../catalogue/catalogue';
import { placeOf } from '../rendering/place';
import { bound, pulled } from './galleys';

// A BIND KEEPS WHAT DID NOT CHANGE. Sprint 109, D11, on Doug's "If the binder doesn't work on ones most
// recently changed, how will it ever possibly work?": one galley bound three times — from nothing, with
// nothing changed, and with one chapter edited — and what the render line says each time. A kept page is
// written again onto the new shell from the markup the last bind kept, so with nothing changed every page
// comes out byte for byte the same; a chapter edited changes its book's digest, so its page alone is drawn.
describe('a bind of the test library that keeps its pages', () => {
    const galley = pulled();
    afterAll(() => { galley.remove(); });
    const chosen = configure(galley.binding);
    const table = catalogue(walk(galley.library, chosen), chosen).table;
    const pageOf = (name: string): string => readFileSync(placeOf(galley.face, table.routes.find(route => route.name === name)!), 'utf8');

    it('draws every page the first time, in children, and none the second, keeping every page byte for byte', () => {
        const first = bound(galley);
        expect(first).toMatch(/^render +\d+ pages drawn in \d+ child(ren)? · 0 kept/mu);
        const pages = table.routes.map(route => [route.name, pageOf(route.name)] as const);
        const second = bound(galley);
        expect(second).toMatch(/^render +0 pages drawn in 0 children · \d+ kept/mu);
        for (const [name, page] of pages) expect(pageOf(name), name).toBe(page);
    });

    it('reads one book and draws one page when one chapter changed, and keeps the rest', () => {
        const chapter = join(galley.library, 'paper', '1-the-argument.tsx');
        const sentence = '<Paragraph>One more sentence, said after the first bind.</Paragraph>';
        writeFileSync(chapter, readFileSync(chapter, 'utf8').replace('    </Chapter>', `        ${sentence}\n    </Chapter>`));
        const third = bound(galley);
        expect(third).toMatch(/^specify +1 book read/mu);
        expect(third).toMatch(/^render +1 page drawn in 1 child · \d+ kept/mu);
        expect(pageOf('A Paper')).toContain('One more sentence, said after the first bind.');
    });
});
