import './dom';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import React from 'react';
import { Suspense, type ReactElement, type ReactNode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { $ } from '@dna-platform/chemistry';
import { Book } from '@dna-platform/public';
import { configure, type Configuration } from '../configuration/configuration';
import { around } from '../inventory/library';
import { pageOf } from '../resolution/addresses';
import { page } from './page';
import { placeOf } from './place';
import { shellOf, type Done, type Drawn, type Kept, type Order } from './rendering';

const { createElement } = React;
const { renderToString } = ReactDOMServer;

type Route = { name: string; address: string; chapters: { name: string; address: string }[]; load: () => Promise<{ book: () => ReactElement }> };

// A BOUNDARY THAT ERRORED IS NOT A PAGE. `renderToString` takes no `onError`, so a book that throws
// is caught by the Suspense boundary above it, written into the markup as this marker, and handed
// back as an ordinary string the binder would save without complaint — a green build standing over
// a page with nothing on it. The marker is the whole of React's report, so it is read.
const erroredBoundary = '<!--$!-->';

// AND WHAT THREW IS FETCHED BY DRAWING IT AGAIN WITH NOTHING ABOVE IT TO CATCH ANYTHING, which is
// the only way to hear a cause React kept to itself. Only ever reached on the way to failing, so
// the second render costs a build that was already over.
const causeOfTheFailure = (unguarded: ReactNode): string => {
    try {
        renderToString(unguarded);
    } catch (thrown) {
        return thrown instanceof Error ? thrown.stack ?? thrown.message : String(thrown);
    }

    return 'the boundary errored and the same book drawn again raised nothing';
};

const sheetOf = (face: string, css: string): string => {
    const named = `sheets/${createHash('sha256').update(css).digest('hex').slice(0, 12)}.css`;
    const at = join(face, named);
    if (!existsSync(at)) {
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, css, 'utf8');
    }
    return named;
};

// WHERE A PAGE'S MARKUP IS KEPT, beside the binding and named by the page's address, so the next bind
// can write the page again without drawing the book. Sprint 109, D11.
const markupOf = (binding: string, address: string): string =>
    join(binding, '.pages', `${address.replace(/^\/|\/$/gu, '').split('/').join('__') || 'root'}.html`);

const stylesLink = (chosen: Configuration, sheet: string): string => `<link rel="stylesheet" href="${chosen.resolution.base}${sheet}" />`;

// A KEPT PAGE IS WRITTEN AGAIN ONTO THE NEW SHELL from the markup the last bind kept, since the shell
// carries the bundle's names and those change with every bundle; nothing of the book is drawn. Done
// here, in the child, so the template is the same text the drawn pages got.
const written = (binding: string, face: string, built: string, chosen: Configuration, one: Kept): string => {
    const markup = readFileSync(join(binding, one.kept.markup), 'utf8');
    const at = placeOf(face, { address: one.address });
    mkdirSync(dirname(at), { recursive: true });
    writeFileSync(at, page(built, markup, stylesLink(chosen, one.kept.sheet), chosen.rendering.title), 'utf8');

    return relative(face, at).split(sep).join('/');
};

// THE PAGE IS DRAWN THROUGH THE INDEX THE BINDER WROTE — the same routes, and the same loader, the
// reader's browser runs. One page per book, drawn whole at the book's address with its cover open and
// every chapter in its print, each a fragment of it that the book's own app opens — Sprint 95, D1.
export const draw = async (server: ViteDevServer, order: Order): Promise<Done> => {
    const { binding, face } = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
    const chosen = configure(binding);
    const { routes } = (await server.ssrLoadModule(join(binding, 'application', 'routes.ts'))) as { routes: Route[] };
    const built = readFileSync(shellOf(binding), 'utf8');
    const drawn: Drawn[] = [];

    for (const address of order.draw) {
        const route = routes.find(one => one.address === address);
        if (route === undefined) throw new Error(`no book stands at ${address}, so there is no page to draw there`);
        const loaded = await route.load();
        // THE PAGE IS OPEN AT ITS ADDRESS, AND THE BOOK IS BUILT KNOWING IT: the book's function gives
        // its element, the element its instance, and the instance is told its bookmark — the url the
        // catalogue wrote into that chapter's title, so the two meet by equality and nothing is read —
        // before it is drawn, as the app does, so the page's first paint has its routing intact.
        const book = $(loaded.book(), Book);
        book.$bookmark = pageOf(chosen.resolution.base, address);
        const Drawn = $(book);
        // Each page collects its own styles in a sheet of its own, so every page drawn in this one
        // process carries what its book styles and nothing another book did.
        const sheet = new ServerStyleSheet();
        try {
            // The same boundary the entry hydrates inside, so the markers match.
            const markup = renderToString(sheet.collectStyles(createElement(Suspense, { fallback: null }, createElement(Drawn))));
            if (markup.includes(erroredBoundary)) throw new Error(`${route.name} does not draw — ${causeOfTheFailure(createElement(Drawn))}`);
            const at = placeOf(face, { address });
            mkdirSync(dirname(at), { recursive: true });
            // THE SHEET IS A FILE NAMED BY ITS CONTENT, written once and linked from every page that collected the
            // same styles, so the pages of a book share one file the browser caches and a page carries no styles
            // of its own. Sprint 95, U8 — the inlined tag was the server-side habit of styled-components and nothing more.
            const sheetName = sheetOf(face, sheet.instance.toString());
            writeFileSync(at, page(built, markup, stylesLink(chosen, sheetName), chosen.rendering.title), 'utf8');
            const markupAt = markupOf(binding, address);
            mkdirSync(dirname(markupAt), { recursive: true });
            writeFileSync(markupAt, markup, 'utf8');
            drawn.push({
                address,
                page: relative(face, at).split(sep).join('/'),
                markup: relative(binding, markupAt).split(sep).join('/'),
                sheet: sheetName,
            });
        } finally {
            sheet.seal();
        }
    }
    const kept = order.keep.map(one => written(binding, face, built, chosen, one));

    return { drawn, kept };
};
