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
import { configure } from '../configuration/configuration';
import { around } from '../inventory/library';
import { pageOf } from '../resolution/addresses';
import { page } from './page';
import { placeOf } from './place';
import { shellOf } from './rendering';

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

// THE PAGE IS DRAWN THROUGH THE INDEX THE BINDER WROTE — the same routes, and the same loader, the
// reader's browser runs. One page per address, a book's and each of its chapters', every one the
// book that answers it — drawn whole at each until the book reads which chapter the address opens.
const sheetOf = (face: string, css: string): string => {
    const named = `sheets/${createHash('sha256').update(css).digest('hex').slice(0, 12)}.css`;
    const at = join(face, named);
    if (!existsSync(at)) {
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, css, 'utf8');
    }
    return named;
};

export const draw = async (server: ViteDevServer, addresses: string[]): Promise<string[]> => {
    const { binding, face } = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
    const chosen = configure(binding);
    const { routes } = (await server.ssrLoadModule(join(binding, 'application', 'routes.ts'))) as { routes: Route[] };
    const built = readFileSync(shellOf(binding), 'utf8');
    const pages: string[] = [];

    for (const address of addresses) {
        const route = routes.find(one => one.address === address || one.chapters.some(chapter => chapter.address === address));
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
            writeFileSync(at, page(built, markup, `<link rel="stylesheet" href="${chosen.resolution.base}${sheetOf(face, sheet.instance.toString())}" />`, chosen.rendering.title), 'utf8');
            pages.push(relative(face, at).split(sep).join('/'));
        } finally {
            sheet.seal();
        }
    }

    return pages;
};
