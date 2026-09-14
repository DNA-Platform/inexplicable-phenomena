import { window } from './dom';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import React from 'react';
import { Suspense } from 'react';
import ReactDOMServer from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { resolution } from '../resolution/addresses';
import { page } from './page';
import { placeOf } from './place';
import { styles } from './styles';

const { createElement } = React;
const { renderToString } = ReactDOMServer;

export const draw = async (server: ViteDevServer, only?: string): Promise<string[]> => {
    const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    const face = resolve(binding, '..');
    const library = resolve(face, '..');
    const chosen = configure(binding);
    const table = resolution(walk(library, chosen), chosen);
    const built = readFileSync(join(face, 'index.html'), 'utf8');
    const pages: string[] = [];

    for (const route of table.routes.filter(one => only === undefined || one.name === only)) {
        const { book } = (await server.ssrLoadModule(route.module)) as { book: unknown };
        const Opened = $(book as never);
        // The same boundary the entry hydrates inside, so the markers match.
        const markup = renderToString(createElement(Suspense, { fallback: null }, createElement(Opened)));
        const sheet = styles(window.document);
        const at = placeOf(face, route);
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, page(built, markup, sheet, chosen.rendering.title), 'utf8');
        pages.push(relative(face, at).split('\\').join('/'));
    }
    return pages;
};
