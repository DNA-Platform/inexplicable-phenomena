import type { Configuration } from '../configuration/configuration';
import type { Library } from '../inventory/library';
import { resolution, type Table } from '../resolution/addresses';
import { reflection } from '@dna-platform/public';
import { forward } from '../manifest/origin';
import { tidy } from './language';
import { structure as compiled, type Structure } from './structure';

// THE CARD CATALOGUE, ANSWERING ONE QUESTION: what URL does this key stand at.
//
// `catalogue.ts` is a PROXY NAME, flagged for Doug.
//
// A KEY IS A NAME AND A URL IS A PLACE, and the whole of this file is the one step between them.
// Doug, 2026-09-18: "they are given a url! A reference to writing. They use it to make the link" —
// so nothing here builds a link and nothing here draws. It answers an address and hands it over.
//
// IT REFUSES BY NON-MEMBERSHIP ALONE. A key the library does not hold gets nothing back: there is
// no fallback, no nearest match, and no filesystem asked. That is the whole integrity story, and it
// is the reason `#${slug(name)}` has to go — a guess is what a table answers with when it would
// rather not say no.
//
// NOTHING IS LOADED. The names come from `catalogue/structure.ts`, which reads a book's source, and
// the addresses from `resolution/addresses.ts`, which never opened a book. Put together they are the
// catalogue a page used to ask at draw time, answered before a page exists.

export type Catalogue = {
    readonly table: Table;
    // THE ONE READING OF THE LIBRARY, held so nothing reads it a second time — the validator and
    // the catalogue answer off the same structure, or they disagree.
    readonly structure: Structure;
    where(key: string): string | undefined;
    // WHICH BOOK'S PAGE A FILE IS PART OF, which is the one thing a reference needs that is not in
    // the key: whether the address it resolved to is the page it is standing on.
    //
    // A LINK THAT LEADS WHERE YOU ALREADY ARE IS NOT A LINK — the branch settled that in Sprint 73
    // (a23a3b9) and it is the same rule one floor up. A title's key is always its own book, so a
    // title that lowered to `[copy](url)` would link a cover to itself: "that Doug self link is
    // awful and ruins the flow."
    standing(file: string): string | undefined;
    // AND WHICH BOOK'S NAME SCOPES A REFERENCE WRITTEN IN IT. `$[ > The Sheet ]` means the chapter
    // of the book it stands in, and the scope is the one thing a reference cannot carry.
    scope(file: string): string | undefined;
    // AND WHETHER A FILE IS DRAWN ON MORE PAGES THAN ITS OWN. A resource beside a chapter — the
    // masthead every book of Doug's library wears — is compiled once and drawn everywhere, so a
    // mention in it of the book it lives in is not "here" on the pages that share it.
    shared(file: string): boolean;
    keys(): string[];
};

export const catalogue = (found: Library, chosen: Configuration, given?: Structure): Catalogue => {
    const structure = given ?? compiled(found);
    const named = found.books.flatMap(book => {
        const name = structure.named.get(book.folder);

        return name === undefined ? [] : [{ folder: book.folder, name }];
    });
    const table = resolution(found, named, chosen);

    // A KEY ANSWERS WITH A URL, WRITTEN FROM THE DOMAIN FORWARD — the library's base and the book's
    // own address, ending in a slash because that is the page a reader lands on. GitHub Pages
    // answers `/turing` with a redirect to `/turing/`, so the address written here is the one a
    // reader arrives at rather than the one they are sent from.
    //
    // AND THE BOOK IS IN EVERY URL, not only in a book's own. Doug, 2026-09-18: "It gives the book
    // as part of the url, put it in the url for consistent urls everywhere." So a chapter's address
    // is its book's and then its own, and a reference to anything in this library says which book
    // it is in before it says anything else — which is the reference grammar written as a URL:
    //
    //     Book Code                 ->  /dougs-library/
    //     Book Code / Chapter Code  ->  /dougs-library/#the-sheet
    //
    // A CHAPTER IS A SECTION OF ITS BOOK'S PAGE, SO ITS ADDRESS IS THAT PAGE AND A FRAGMENT. The
    // first writing of this made it a FOLDER — `/dougs-library/the-sheet/` — and the binder writes
    // one page per book, so every chapter reference on the site led to a page that did not exist.
    // Doug, 2026-09-19: "Don't chapters have #ids right now? Wouldn't it append the hash." They do:
    // the page gives every chapter heading an id from the framework's own `slug`, and its table of
    // contents already links `#the-sheet`. The catalogue writes the same id with the same function,
    // so the address it hands out is the one the page already answers to.
    //
    // AND A CHAPTER WHOSE TITLE DOES NOT PRINT IS ADDRESSED AS ITS BOOK'S PAGE. The page draws no
    // heading for it and so no id, and the proof found the fragment leading nowhere. Doug,
    // 2026-09-19: "Shouldn't it just be the url? That solves the cover problem." A synopsis, a
    // table of contents, a lead with `print={false}` — a reference to any of them lands on the
    // page it is part of, which is where it is.
    //
    // A CHAPTER IS NAMED WITHIN ITS BOOK AND NOWHERE ELSE, so `Dougs Library > The Sheet` is the
    // WHOLE key and there is no bare one beside it.
    //
    // There was, briefly: a bare name offered wherever only one book in the library used it. Doug,
    // 2026-09-18: "Then maybe you can't have synonyms and there's no home?" — and he is right twice
    // over. It is a SYNONYM, two keys standing for one thing, which is the collision this catalogue
    // exists to make impossible. And it is offered on a condition that has nothing to do with the
    // chapter: name a chapter `The Sheet` in some other book and a key in this one stops existing.
    //
    // ONE KEY, ONE THING. Two books may both hold a `Table of Contents` and neither is wrong,
    // because the scope is what tells them apart — which is why the scope is IN the key rather than
    // inferred from what else happens to be in the library.
    const at = new Map<string, string>();
    const inside: { path: string; url: string; name: string; resources: string[] }[] = [];
    for (const route of table.routes) {
        const book = `${chosen.resolution.base}${route.address.replace(/^\//u, '')}/`;
        at.set(route.name, book);
        const held = found.books.find(one => one.folder === route.folder);
        if (held !== undefined) inside.push({ path: forward(held.path), url: book, name: route.name, resources: [...held.resources.values()].flat() });

        // AND ITS CHAPTERS, WHICH ARE SPOTS OF THE STRUCTURE RATHER THAN A SECOND READING — and its
        // anchors, which stand at a fragment the same way a printed chapter does.
        for (const spot of structure.spots.values()) {
            if (spot.kind === 'book' || spot.book !== route.folder) continue;
            const chapter = structure.named.get(spot.id);
            if (chapter !== undefined) at.set(`${route.name} / ${chapter}`, spot.prints ? `${book}#${reflection.slug(chapter)}` : book);
        }
    }

    // THE DEEPEST BOOK THAT HOLDS A FILE, because a library nests: `semantics-of-types` stands
    // inside `semantic-reference-theory`, which stands inside `claude-and-our-projects`. The
    // shallowest match would answer every chapter with the outermost book it happens to sit under.
    const deepest = (file: string): { path: string; url: string; name: string; resources: string[] } | undefined => {
        const held = forward(file);

        return inside.filter(one => held.startsWith(`${one.path}/`)).sort((one, two) => two.path.length - one.path.length)[0];
    };

    return {
        table,
        structure,
        where: (key: string): string | undefined => at.get(tidy(key)),
        standing: (file: string): string | undefined => deepest(file)?.url,
        scope: (file: string): string | undefined => deepest(file)?.name,
        shared: (file: string): boolean => deepest(file)?.resources.includes(forward(file).split('/').pop() ?? '') ?? false,
        keys: (): string[] => [...at.keys()].sort(),
    };
};
