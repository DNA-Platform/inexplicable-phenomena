import './dom';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import React from 'react';
import { Suspense, type ReactNode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { configure } from '../configuration/configuration';
import { around } from '../inventory/library';
import { page } from './page';
import { placeOf } from './place';
import { shellOf } from './rendering';

const { createElement } = React;
const { renderToString } = ReactDOMServer;

type Route = { name: string; address: string; chapters: { name: string; address: string }[]; load: () => Promise<{ book: () => ReactNode }> };

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
export const draw = async (server: ViteDevServer, addresses: string[]): Promise<string[]> => {
    const { binding, face } = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
    const chosen = configure(binding);
    const { routes } = (await server.ssrLoadModule(join(binding, 'application', 'routes.ts'))) as { routes: Route[] };
    const built = readFileSync(shellOf(binding), 'utf8');
    const pages: string[] = [];

    for (const address of addresses) {
        const route = routes.find(one => one.address === address || one.chapters.some(chapter => chapter.address === address));
        if (route === undefined) throw new Error(`no book stands at ${address}, so there is no page to draw there`);
        const { book } = await route.load();
        // Each page collects its own styles in a sheet of its own, so every page drawn in this one
        // process carries what its book styles and nothing another book did.
        const sheet = new ServerStyleSheet();
        try {
            // The same boundary the entry hydrates inside, so the markers match; the book is a
            // function, and drawing it calls it.
            const markup = renderToString(sheet.collectStyles(createElement(Suspense, { fallback: null }, createElement(book))));
            if (markup.includes(erroredBoundary)) throw new Error(`${route.name} does not draw — ${causeOfTheFailure(createElement(book))}`);
            const at = placeOf(face, { address });
            mkdirSync(dirname(at), { recursive: true });
            writeFileSync(at, page(built, markup, sheet.getStyleTags(), chosen.rendering.title), 'utf8');
            pages.push(relative(face, at).split(sep).join('/'));
        } finally {
            sheet.seal();
        }
    }

    return pages;
};
