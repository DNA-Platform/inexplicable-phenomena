import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Configuration } from '../configuration/configuration';
import type { Page } from '../manifest/manifest';
import { atOnce, lastLine, opened } from '../children';

// A TEMPLATE IS AN INPUT AND A PAGE IS AN OUTPUT, AND THEY WERE THE SAME FILE. The bundle writes the
// shell to the face's index.html, and the ROOT book's page is written there too — so every page
// drawn after the root was built from the root's own page, and the injection kept it silently,
// because it matches an EMPTY `<div id="root"></div>` and there was none left to match. Measured
// 2026-09-15: five books, four identical pages, none holding its own book. The shell is taken aside
// once, before any page is drawn, and every child reads that instead.
export const shellOf = (binding: string): string => join(binding, '.shell.html');

// WHAT STANDS AT `/`, WHICH IS NOT A BOOK. Every book is addressed by what it is — the root book
// included — so nothing occupies `/` by being named in a configuration file, and `/` is free to be
// what it always was: where a reader arrives. Doug, 2026-09-18: "We can have the default point
// there", and then "that better work right in all cases".
//
// ALL CASES IS THE POINT, so this is a redirect rather than a copy. Writing the root book's page
// here as well would put one book at two addresses, which is the same collision a catalogue exists
// to prevent, one floor up. A redirect has one canonical page and one door to it, and it is honest
// in a static host that has no server to ask: the refresh carries a reader who has script, the
// canonical link carries a reader who does not, and the anchor carries anything that reads neither.
const landing = (address: string, title: string): string => [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    `    <meta http-equiv="refresh" content="0; url=${address}" />`,
    `    <link rel="canonical" href="${address}" />`,
    `    <title>${title}</title>`,
    '  </head>',
    `  <body><a href="${address}">${title}</a></body>`,
    '</html>',
    '',
].join('\n');

// WHAT A CHILD HANDS BACK FOR EACH PAGE IT DREW: the page's path in the face, the markup it was drawn
// with, kept under `.pages/`, and the sheet it links — the three the manifest keeps so the page need
// not be drawn again.
export type Drawn = { address: string; page: string; markup: string; sheet: string };

// A PAGE TO DRAW, WITH THE BYTES OF ITS BOOK'S SOURCE, which is what a child's budget is spent on.
export type Drawing = { address: string; bytes: number };

// A PAGE TO KEEP: its address and what the last bind kept of it.
export type Kept = { address: string; kept: Page };

// WHAT A CHILD IS TOLD TO DO, written to a file beside the binding since a thousand kept pages do not
// fit an argument list: the pages to draw, and the pages to write again from their kept markup. Every
// order is in the one file, written before any child opens, and a child is told which is its own,
// since children run at once and a file each child rewrote would be read by the wrong one.
export type Order = { draw: string[]; keep: Kept[] };
export type Done = { drawn: Drawn[]; kept: string[] };
// AND WHAT IT COST: the child's peak resident set in megabytes, said in its last line.
type Answered = Done & { peak: number };
export const orderOf = (binding: string): string => join(binding, '.render.json');

// THE PAGES A CHILD DRAWS, by the budget: pages are taken in order until their books' source would pass
// it, and a book alone larger than the budget is a batch of its own. One child drew every page until
// 2026-10-14, when one project of twenty conversations ran it out of a 4 GB heap: a child keeps every
// chemical it makes, as a specifying child does, so what one holds is bounded by what it is given.
const batched = (drawings: Drawing[], budget: number): Drawing[][] => {
    const batches: Drawing[][] = [];
    let batch: Drawing[] = [];
    let spent = 0;
    for (const drawing of drawings) {
        if (batch.length > 0 && spent + drawing.bytes > budget) {
            batches.push(batch);
            batch = [];
            spent = 0;
        }
        batch.push(drawing);
        spent += drawing.bytes;
    }
    if (batch.length > 0) batches.push(batch);

    return batches;
};

// EACH ORDER IN ONE CHILD, which starts one server and transforms the module graph once. The pages
// come back in the order the addresses were given, because the manifest and the proof read this list
// and a list that reorders itself is a diff on every build. A KEPT PAGE IS WRITTEN BY THE CHILD TOO,
// onto the new shell from the markup the last bind kept, because the page's template carries the
// arrival's script as the text of a function, and a function's text is its transpiler's: written by the
// parent under tsx it differed from the child's under vite, and a kept page was not its drawn self.
const done = async (binding: string, entry: string, index: number): Promise<Answered> => {
    // THE PRERENDER IS A PRODUCTION ARTIFACT: the specification ran in the specify task and runs
    // nowhere here, so the child renders the way a reader's browser will.
    const { status, out } = await opened(binding, [entry, orderOf(binding), String(index)], { NODE_ENV: 'production' });
    if (status !== 0) throw new Error(`rendering failed (exit ${status ?? 'signal'})`);

    return JSON.parse(lastLine(out)) as Answered;
};

// WHAT THE RENDER SAYS OF ITSELF: the pages, the ones drawn, how many children drew them and how many
// ran at once, and the most a child held.
export type Rendered = { pages: string[]; drawn: Drawn[]; batches: number; atOnce: number; peak: number };

export const rendering = async (
    binding: string,
    chosen: Configuration,
    stale: Drawing[],
    kept: Kept[],
    root?: { address: string; name: string },
): Promise<Rendered> => {
    const entry = join(binding, 'rendering', 'render.mjs');
    const face = join(binding, '..');
    copyFileSync(join(face, 'index.html'), shellOf(binding));

    // THE KEPT PAGES RIDE WITH THE FIRST CHILD, or with a child of their own when nothing is drawn.
    const batches = batched(stale, chosen.rendering.budget * 1048576);
    const orders: Order[] = batches.map((batch, index) => ({ draw: batch.map(drawing => drawing.address), keep: index === 0 ? kept : [] }));
    if (orders.length === 0 && kept.length > 0) orders.push({ draw: [], keep: kept });
    writeFileSync(orderOf(binding), JSON.stringify(orders), 'utf8');
    const answered = await atOnce(orders.map((_, index) => index), chosen.rendering.parallel, index => done(binding, entry, index));
    const drawnPages = answered.flatMap(one => one.drawn);
    const keptPages = answered.flatMap(one => one.kept);
    const pages = [...drawnPages.map(one => one.page), ...keptPages];
    if (root !== undefined) {
        const at = join(face, 'index.html');
        // THE ADDRESS IS THE CATALOGUE'S, WRITTEN FROM THE DOMAIN FORWARD. An earlier writing
        // stripped the leading slash to make it relative — and a relative address on the landing
        // page is read from whatever folder the page is served in, so `/some/where/` would send a
        // reader to `/some/where/dougs-library/`. `proof` names it: "addresses dougs-library/, which
        // is read from whatever folder the page is served in."
        writeFileSync(at, landing(root.address, root.name), 'utf8');
        pages.push('index.html');
    }

    return { pages, drawn: drawnPages, batches: batches.length, atOnce: Math.min(chosen.rendering.parallel, orders.length), peak: Math.max(0, ...answered.map(one => one.peak)) };
};

// WHETHER A KEPT PAGE CAN STILL BE WRITTEN FROM WHAT WAS KEPT: its markup must still stand.
export const keepable = (binding: string, kept: Page): boolean => existsSync(join(binding, kept.markup));
