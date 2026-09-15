import { window } from './dom';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import React from 'react';
import { Suspense } from 'react';
import ReactDOMServer from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { configure } from '../configuration/configuration';
import { around } from '../inventory/library';
import { page } from './page';
import { placeOf } from './place';
import { styles } from './styles';
import { shellOf } from './rendering';

const { createElement } = React;
const { renderToString } = ReactDOMServer;

type Route = { name: string; address: string; load: () => Promise<{ book: unknown }> };

// THE PAGE IS DRAWN THROUGH THE INDEX THE BINDER WROTE — the same routes, and the same loader, the
// reader's browser runs. One process per page, because a book registers its theme on the shared
// class when its module loads and a page must be drawn in its own book's.
export const draw = async (server: ViteDevServer, only?: string): Promise<string[]> => {
    const { binding, face } = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
    const chosen = configure(binding);
    const { routes } = (await server.ssrLoadModule(join(binding, 'application', 'routes.ts'))) as { routes: Route[] };
    const built = readFileSync(shellOf(binding), 'utf8');
    const pages: string[] = [];

    for (const route of routes.filter(one => only === undefined || one.name === only)) {
        const { book } = await route.load();
        const Opened = $(book as never);
        // The same boundary the entry hydrates inside, so the markers match.
        const markup = renderToString(createElement(Suspense, { fallback: null }, createElement(Opened)));
        const sheet = styles(window.document);
        const at = placeOf(face, route);
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, page(built, markup, sheet, chosen.rendering.title), 'utf8');
        pages.push(relative(face, at).split(sep).join('/'));
    }

    return pages;
};
