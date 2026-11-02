// THE RIGHT CHAPTER AT FIRST PAINT. A print knows the page's address and never its fragment, so a page
// is drawn with the book's default chapter open and the app moves to the fragment once the book listens
// — measured 2026-10-11: the wrong chapter showing for 1.1s on Doug's design book, 1.25s on his manual,
// 0.45s on his story. Doug: "when you go to a # chapter you see the latitude first. It is a bit jarring.
// Hard to feel like the links work." So every page carries this function in its head, as text, and runs
// it before the first paint: when the address names a fragment, the pages hold still until the document
// is parsed, then the chapter the fragment is in is opened — the chapter, the layer drawn around it, and
// its row in the contents — and the pages are shown. The app's own opening agrees with it when the book
// arrives; nothing here decides what is visible after that. One function, so the suite runs the text the
// page runs; it must stay self-contained, since its text is all the page gets.
export const arrive = (document: Document, hash: string): string | undefined => {
    const root = document.documentElement;
    const fragment = decodeURIComponent(hash.replace(/^#/u, ''));
    if (fragment === '') return undefined;
    root.classList.add('pa-arriving');
    const open = (): string | undefined => {
        root.classList.remove('pa-arriving');
        const target = document.getElementById(fragment);
        const chapter = target === null ? null : target.closest('.pd-pages .pa-page');
        if (chapter === null || chapter.classList.contains('pa-open')) return undefined;
        // The layers the Formats draw around a page, every container between it and the pages: a spread stands
        // one around its words column and one inside it, and each hides itself until it is open.
        const layersOf = (page: Element): Element[] => {
            const layers: Element[] = [];
            for (let above = page.parentElement; above !== null && !above.classList.contains('pd-pages'); above = above.parentElement)
                if (above.classList.contains('pd-container')) layers.push(above);
            return layers;
        };
        for (const was of Array.from(document.querySelectorAll('.pd-pages .pa-page.pa-open'))) {
            was.classList.remove('pa-open');
            for (const layer of layersOf(was)) layer.classList.remove('pa-open');
        }
        chapter.classList.add('pa-open');
        for (const layer of layersOf(chapter)) layer.classList.add('pa-open');
        const title = chapter.querySelector('.pd-title');
        const place = title === null || title.id === '' ? fragment : title.id;
        for (const row of Array.from(document.querySelectorAll('.pd-holds .pa-entry.pa-open'))) row.classList.remove('pa-open');
        const anchor = document.querySelector(`.pd-holds a[href$="#${place}"]`);
        const row = anchor === null ? null : anchor.querySelector('.pa-entry') ?? anchor.closest('.pa-entry');
        row?.classList.add('pa-open');
        // Where the book's own turn will leave the pages: the chapter scrolled into view, not the fragment's
        // element, which the browser scrolls to on its own at load and would put the chapter's layer out
        // of sight above; so the chapter is scrolled now and once more when the browser's move is done.
        const turned = (): void => { if (typeof chapter.scrollIntoView === 'function') chapter.scrollIntoView(); };
        turned();
        if (document.readyState !== 'complete') document.defaultView?.addEventListener('load', turned, { once: true });
        return place;
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { open(); });
        return undefined;
    }
    return open();
};

// What the page's head carries: the function as text, called at once, and the rule that holds the pages
// still while it waits for the document.
export const arrival = (): string =>
    `<style>.pa-arriving .pd-pages{visibility:hidden}</style><script>(${arrive.toString()})(document,location.hash);</script>`;
