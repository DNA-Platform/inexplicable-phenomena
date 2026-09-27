import { createElement, lazy, Suspense, useEffect, type ComponentType, type ElementType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { $ } from '@dna-platform/chemistry';
import './stylesheets';
import { routes, root } from './routes';
import { opened } from './opened';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// WHERE A URL STANDS IN THE ROUTE TABLE: its pathname without the base and without its trailing slash.
const addressOf = (pathname: string): string => pathname.slice(base.length).replace(/\/+$/, '') || '/';
const path = addressOf(location.pathname);

const probes = import.meta.glob('../specification/probe/*.tsx');
const probing = import.meta.env.DEV && location.search.includes('probe') && Object.keys(probes).length > 0;

// A ROUTE IS A BOOK, AND A BOOK ANSWERS ITS CHAPTERS' ADDRESSES AS WELL AS ITS OWN — one app, drawn
// with whichever chapter the address names open.
const route = routes.find(one => one.address === path || one.chapters.some(chapter => chapter.address === path)) ?? root;
if (!probing && !route) throw new Error(`no book stands at ${path}, and no book stands at the root`);

// THE BOOKMARK IS THE PLACE THE PAGE IS OPEN AT — the url the compiler wrote into a chapter's title, so
// the book finds the chapter by equality and turns to it; with a fragment, the mentioned place itself,
// which no chapter's title means, so the book stays and the landing below is the router's. Doug,
// 2026-09-26: "it is the place where the user is (recently was) and it is a record of him being there."
const bookmarkOf = (url: { pathname: string; hash: string }): string => `${url.pathname.replace(/\/+$/u, '')}/${url.hash}`;

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
// THE BOOK IS A FUNCTION, SO IT IS WHAT IS DRAWN: rendering it calls it, and it calls its chapters.
const Opened = lazy(() => loading.then(loaded => ({ default: probing ? $(loaded.probe as never) : loaded.book as ComponentType })));
const mount = document.getElementById('root');
if (!mount) throw new Error('no #root element');
// Mounted beside the book, after it. Its first effect runs once the book's handlers are attached and
// hands the page's kept clicks back to them; its second lands on the fragment each time the bookmark
// moves, after the book has drawn at the new address. Draws nothing, so the server markup is the same.
const Landed = (props: { bookmark: string }): null => {
    useEffect(() => { (window as unknown as { __replayKept?: () => void }).__replayKept?.(); }, []);
    useEffect(() => { if (location.hash !== '') document.getElementById(location.hash.slice(1))?.scrollIntoView(); }, [props.bookmark]);
    return null;
};
const drawn = (Book: ElementType, bookmark: string) => createElement(Suspense, { fallback: null }, createElement(Book, probing ? null : { bookmark }), createElement(Landed, { bookmark }));
let Book: ElementType = Opened;
let bookmark = bookmarkOf(location);
const served = mount.hasChildNodes();
const drawing = served ? hydrateRoot(mount, drawn(Book, bookmark), {
    onRecoverableError: error => console.error('hydration recovered by re-rendering:', error instanceof Error ? error.message : String(error)),
}) : createRoot(mount);
if (!served) drawing.render(drawn(Book, bookmark));

// THE ROUTER. Doug, 2026-09-26: "Everything needs to go through the router"; "Long distance urls to
// that which was mentioned also must work." A link within the book is a route the app takes in place:
// the address is pushed and the book is drawn again with the new bookmark, which is one paint. A link
// to another book, or anywhere else, is left to the browser, which loads that page, whose own router
// completes the landing — the URL is the only thing that passes between pages. Back and forward are
// the same route the other way, and a link to a fragment of the page already open is the browser's
// own move. Nothing here decides what is visible: the book's layout reads the bookmark.
const within = (url: URL): boolean =>
    url.origin === location.origin && route !== undefined
    && (route.address === addressOf(url.pathname) || route.chapters.some(chapter => chapter.address === addressOf(url.pathname)));
const visit = (): void => {
    if (bookmarkOf(location) === bookmark) return;
    bookmark = bookmarkOf(location);
    drawing.render(drawn(Book, bookmark));
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
// THE ROOT IS KEPT FOR THIS AND FOR THE ROUTER, and for nothing else. A book module takes its own hot
// update and hands the new book through `opened`; without a root to draw it into, the only thing vite
// could do with a chapter that changed was reload the whole page, which is a network round trip for
// every module and loses whatever the reader had open.
//
// IT IS A NEW COMPONENT EACH TIME AND THAT REMOUNTS THE BOOK. React keeps a component only while
// its TYPE is the same, and a re-run module's `book` is a different function — so the tree is
// rebuilt rather than patched. That is the part React Fast Refresh would normally do and cannot
// here, and it is the seam where the substrate would have to keep a chemical's identity across an
// update. FLAGGED FOR DOUG rather than reached for.
opened.drawn(book => {
    Book = book as ElementType;
    drawing.render(drawn(Book, bookmark));
});
