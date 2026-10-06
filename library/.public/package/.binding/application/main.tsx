import { createElement, lazy, Suspense, useEffect, type ComponentType, type ElementType, type ReactElement } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import { Book, type $Book } from '@dna-platform/public';
import './stylesheets';
import { routes, root } from './routes';
import { opened } from './opened';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// WHERE A URL STANDS IN THE ROUTE TABLE: its pathname without the base and without its trailing slash.
const addressOf = (pathname: string): string => pathname.slice(base.length).replace(/\/+$/, '') || '/';
const path = addressOf(location.pathname);

const probes = import.meta.glob('../specification/probe/*.tsx');
const probing = import.meta.env.DEV && location.search.includes('probe') && Object.keys(probes).length > 0;

// A ROUTE IS A BOOK, AND EVERY CHAPTER OF IT IS A FRAGMENT OF ITS ADDRESS — one app, one page, drawn
// with whichever chapter the fragment names open. Sprint 95, D1.
const route = routes.find(one => one.address === path) ?? root;
if (!probing && !route) throw new Error(`no book stands at ${path}, and no book stands at the root`);

// THE BOOKMARK IS THE PLACE THE PAGE IS OPEN AT — the url the compiler wrote into a chapter's title,
// `/book/#chapter` since Sprint 95's D1, so the book finds the chapter by equality and turns to it; a
// fragment naming a mention or a heading, which no chapter's title means, leaves the book where it is;
// the router scrolls nothing — since Sprint 101's U9 the book goes where the bookmark says after it has
// drawn, in whatever way it shows chapters. Doug, 2026-09-26: "it is the place where the user is (recently was)
// and it is a record of him being there."
const bookmarkOf = (url: { pathname: string; hash: string }): string => `${url.pathname.replace(/\/+$/u, '')}/${url.hash}`;

// THE BOOK IS BUILT ONCE AND HELD, its bookmark set on the instance before it is drawn and again on
// every move — never handed as a prop, since a prop is a render, and a bookmark moved must not paint.
// Doug, 2026-09-27: "the thing can't render without intact routing that would be nonsensical. And we
// should have still been on our first paint."
//
// ITS FIRST DRAW IS THE PAGE AS PRINTED. A served page is hydrated, and hydration keeps the printed
// markup wherever the first draw disagrees with it; a print knows the page's address and never its
// fragment, so the book is first drawn at the address, and the fragment is a move the router makes
// once the book listens. Found 2026-09-29 by the manual's explorer, whose spread a fragment opens:
// loaded at a file's own address, the page kept the printed chapter and never showed the file.
let book: $Book | undefined;
const building = (make: () => ReactElement, place = bookmarkOf(location)): $Book => {
    book = $(make(), Book);
    book.$bookmark = place;
    return book;
};

// NO TOP-LEVEL AWAIT HERE. The book arrives as a chunk that imports its shared code from this
// entry; an entry that awaits that chunk never finishes evaluating, the chunk never can either,
// and nothing is thrown — the page simply stays as it was served.
const loading: Promise<{ book?: () => ReactElement; probe?: unknown }> = probing
    ? probes[Object.keys(probes)[0]]() as Promise<{ probe: unknown }>
    : route!.load();

// HYDRATE BEFORE THE BOOK ARRIVES. The prerender shows its controls at once, and a click
// before React listens is lost — measured 2026-09-14 at a 4.4s window on localhost. So the
// root is hydrated now, with the book behind a Suspense boundary the server also wrote: React
// keeps the served markup, listens from this moment, and replays a click it could not yet
// answer once the boundary hydrates. The book's chunk is what the boundary waits for.
const Opened = lazy(() => loading.then(loaded => ({
    default: probing ? $(loaded.probe as never) as ComponentType : $(building(loaded.book!, bookmarkOf({ pathname: location.pathname, hash: '' }))),
})));
const mount = document.getElementById('root');
if (!mount) throw new Error('no #root element');
// Mounted beside the book, after it: its effect runs once the book's handlers are attached, moves
// the book to the fragment the print could not know, and hands the page's kept clicks back to them.
// Draws nothing, so the server markup is the same.
const Landed = (): null => { useEffect(() => { visit(); (window as unknown as { __replayKept?: () => void }).__replayKept?.(); }, []); return null; };
const drawn = (Component: ElementType) => createElement(Suspense, { fallback: null }, createElement(Component), createElement(Landed));
const served = mount.hasChildNodes();
const drawing = served ? hydrateRoot(mount, drawn(Opened), {
    onRecoverableError: error => console.error('hydration recovered by re-rendering:', error instanceof Error ? error.message : String(error)),
}) : createRoot(mount);
if (!served) drawing.render(drawn(Opened));

// THE ROUTER. Doug, 2026-09-26: "Everything needs to go through the router"; "Long distance urls to
// that which was mentioned also must work." A link within the book is a move the app takes in place:
// the book's bookmark is set, which paints nothing — the book turns to the chapter once it has drawn,
// and the router lands nowhere. Since Sprint 95's D1 every chapter is a fragment of the one page, so a link
// to one is the browser's own move, taken up on `popstate`; a link to the book's own address is pushed
// here. A link to another book, or anywhere else, is left to the browser, which loads that page, whose
// own router completes the landing — the URL is the only thing that passes between pages. Back and
// forward are the same move the other way. Nothing here decides what is visible: the book's layout
// reads the bookmark.
const within = (url: URL): boolean =>
    url.origin === location.origin && route !== undefined && route.address === addressOf(url.pathname);
const visit = (): void => {
    if (book === undefined || bookmarkOf(location) === book.$bookmark) return;
    book.$bookmark = bookmarkOf(location);
};
mount.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!(anchor instanceof HTMLAnchorElement) || anchor.target !== '') return;
    const url = new URL(anchor.href);
    if (!within(url) || (url.pathname === location.pathname && url.hash !== '')) return;
    event.preventDefault();
    history.pushState(null, '', url);
    visit();
});
window.addEventListener('popstate', visit);

// AND A BOOK EDITED WHILE THIS PAGE IS OPEN IS DRAWN AGAIN, RATHER THAN THE PAGE BEING REPLACED.
//
// THE ROOT IS KEPT FOR THIS AND FOR NOTHING ELSE. A book module takes its own hot update and hands
// the new book through `opened`; without a root to draw it into, the only thing vite could do with a
// chapter that changed was reload the whole page, which is a network round trip for every module and
// loses whatever the reader had open.
//
// IT IS A NEW BOOK EACH TIME AND THAT REMOUNTS IT. React keeps a component only while its TYPE is
// the same, and a re-run module's `book` makes a different instance — so the tree is rebuilt rather
// than patched. That is the part React Fast Refresh would normally do and cannot here, and it is the
// seam where the substrate would have to keep a chemical's identity across an update. FLAGGED FOR
// DOUG rather than reached for.
opened.drawn(next => { drawing.render(drawn($(building(next as () => ReactElement)))); });
