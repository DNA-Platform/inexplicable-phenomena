import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
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

loading.then(loaded => {
    const opened = probing ? loaded.probe : loaded.book;
    const Opened = $(opened as never);
    const mount = document.getElementById('root');
    if (!mount) throw new Error('no #root element');
    // Chemistry does not hydrate yet (Sprint 70): the prerendered page served the reader until this
    // script arrived, and the client draws fresh over it rather than attaching to it.
    mount.replaceChildren();
    createRoot(mount).render(createElement(Opened));
});
