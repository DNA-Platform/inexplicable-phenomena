import { window } from './dom';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { resolution } from '../resolution/addresses';
import { page } from './page';
import { placeOf } from './place';
import { styles } from './styles';

const { createElement, act } = React;
const { createRoot } = ReactDOM;

export const draw = async (server: ViteDevServer): Promise<string[]> => {
    const binding = resolve(dirname(fileURLToPath(import.meta.url)), '..');
    const library = resolve(binding, '..');
    const chosen = configure(binding);
    const table = resolution(walk(library, chosen), chosen);
    const built = readFileSync(join(library, 'index.html'), 'utf8');
    const pages: string[] = [];

    for (const route of table.routes) {
        const { book } = (await server.ssrLoadModule(route.module)) as { book: unknown };
        const Opened = $(book as never);
        const container = window.document.createElement('div');
        window.document.body.appendChild(container);
        const root = createRoot(container as unknown as Element);
        await act(async () => { root.render(createElement(Opened)); });
        const markup = container.innerHTML;
        const sheet = styles(window.document);
        await act(async () => { root.unmount(); });
        container.remove();
        const at = placeOf(library, route);
        mkdirSync(dirname(at), { recursive: true });
        writeFileSync(at, page(built, markup, sheet, chosen.rendering.title), 'utf8');
        pages.push(relative(library, at).split('\\').join('/'));
    }
    return pages;
};
