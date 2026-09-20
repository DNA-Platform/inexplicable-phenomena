import { createElement, lazy, Suspense, useEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import './stylesheets';
import { routes, root } from './routes';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const path = location.pathname.slice(base.length).replace(/\/+$/, '') || '/';

const probes = import.meta.glob('../specification/probe/*.tsx');
const probing = import.meta.env.DEV && location.search.includes('probe') && Object.keys(probes).length > 0;

const route = routes.find(one => one.address === path) ?? root;
if (!probing && !route) throw new Error(`no book stands at ${path}, and no book stands at the root`);

// NO TOP-LEVEL AWAIT HERE. The book arrives as a chunk that imports its shared code from this
// entry; an entry that awaits that chunk never finishes evaluating, the chunk never can either,
// and nothing is thrown — the page simply stays as it was served.
const loading: Promise<{ book?: unknown; probe?: unknown }> = probing
    ? probes[Object.keys(probes)[0]]() as Promise<{ probe: unknown }>
    : route!.load();

// HYDRATE BEFORE THE BOOK ARRIVES. The prerender shows its controls at once, and a click
// before React listens is lost — measured 2026-09-14 at a 4.4s window on localhost. So the
// root is hydrated now, with the book behind a Suspense boundary the server also wrote: React
// keeps the served markup, listens from this moment, and replays a click it could not yet
// answer once the boundary hydrates. The book's chunk is what the boundary waits for.
const Opened = lazy(() => loading.then(loaded => ({ default: $((probing ? loaded.probe : loaded.book) as never) })));
const mount = document.getElementById('root');
if (!mount) throw new Error('no #root element');
// Mounted beside the book, after it: its effect runs once the book's handlers are attached,
// and hands the page's kept clicks back to them. Draws nothing, so the server markup is the same.
const Landed = (): null => { useEffect(() => { (window as unknown as { __replayKept?: () => void }).__replayKept?.(); }, []); return null; };
const app = createElement(Suspense, { fallback: null }, createElement(Opened), createElement(Landed));
if (mount.hasChildNodes()) hydrateRoot(mount, app, {
    onRecoverableError: error => console.error('hydration recovered by re-rendering:', error instanceof Error ? error.message : String(error)),
});
else createRoot(mount).render(app);
