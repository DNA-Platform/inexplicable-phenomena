import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { catalogue } from '../catalogue/catalogue';
import { placeOf } from '../rendering/place';
import { bound, pulled } from './galleys';

// CHILDREN AT ONCE DRAW THE SAME PAGES AS CHILDREN IN TURN. Each stage says in .pubconfig how many of
// its children run at once, one unless the library says more — 2026-10-16, on a machine with fourteen
// cores whose bind ran its nine render children one after another. One galley is bound twice: in turn,
// with nothing said, and then at once, every book read in a process of its own and every page drawn in
// a child of its own, three at a time, its records struck first so everything is read and drawn again;
// each stage says how many children ran and how many at once, each says the most a child held, and
// every page comes out the same but for the names styled-components numbers per process.
//
// THOSE NAMES ARE THE BATCHING'S. Every styled id on a bound page is an `sc-` one, which styled-components
// hashes from a count of the component's display name in the process that made it, though chemistry's
// styled wrapper fixes a `chem-` id hashed from what a class declares against exactly this; so a book drawn
// after others in one child wears other names than the same book drawn alone, the sheet those names are
// written to is named by its content, and the rules are the same under other names. Seen 2026-10-16, with
// no warning at hydration; B42 of the binder's condition, the substrate's. The promise masks them.
const unnumbered = (page: string): string => page.replace(/\bsc-[A-Za-z]+ [A-Za-z]+\b/gu, 'sc-… …').replace(/sheets\/[0-9a-f]{12}\.css/gu, 'sheets/….css');

describe('a bind whose children run at once', () => {
    const galley = pulled();
    afterAll(() => { galley.remove(); });
    const chosen = configure(galley.binding);
    const table = catalogue(walk(galley.library, chosen), chosen).table;
    const pageOf = (name: string): string => readFileSync(placeOf(galley.face, table.routes.find(route => route.name === name)!), 'utf8');

    it('reads and draws in children at once, says so, and the pages are the same as in turn', () => {
        const inTurn = bound(galley);
        expect(inTurn).toMatch(/^specify +\d+ books read in 1 child · 0 unchanged · .* · peak \d+ MB in a child/mu);
        expect(inTurn).toMatch(/^render +\d+ pages drawn in 1 child · 0 kept · \d+ pictures? · peak \d+ MB in a child/mu);
        const pages = table.routes.map(route => [route.name, pageOf(route.name)] as const);

        const settings = JSON.parse(readFileSync(join(galley.binding, '.pubconfig'), 'utf8')) as Record<string, Record<string, unknown>>;
        const atOnce = { ...settings, specification: { batch: 1, parallel: 3 }, rendering: { ...settings.rendering, budget: 0.0001, parallel: 3 } };
        writeFileSync(join(galley.binding, '.pubconfig'), `${JSON.stringify(atOnce, null, 2)}\n`);
        for (const record of ['.graph.json', '.manifest.json']) rmSync(join(galley.binding, record), { force: true });
        const books = table.routes.length;
        const again = bound(galley);
        expect(again).toMatch(new RegExp(`^specify +${books} books read in ${books} children, 3 at once · 0 unchanged`, 'mu'));
        expect(again).toMatch(new RegExp(`^render +${books} pages drawn in ${books} children, 3 at once · 0 kept`, 'mu'));
        for (const [name, page] of pages) expect(unnumbered(pageOf(name)), name).toBe(unnumbered(page));
    });
});
