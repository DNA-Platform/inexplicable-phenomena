import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Diagnostic } from '../inventory/library';

// A PROOF IS THE SHEET YOU PULL BEFORE THE RUN. Everything before this task reads the SOURCE — the
// books load, each writing is put to its specification, the names resolve. Nothing read what came
// out the other end, so a page could specify perfectly and still be markup no browser will build.
//
// Doug, 2026-09-15: "this is supposed to be a compiler. When those things fail, we should get build
// errors and no development should proceed." And: ".public is the library specification. If it's
// not a library we don't move forward." A page whose links cannot be pressed is not a library, and
// the binder is the only thing standing between that page and a reader.
//
// WHAT IT COST TO LEARN THIS. Measured 2026-09-15: every printed synopsis rendered as
// `<p class="pd-paragraph"><article class="pd-synopsis">`. The HTML parser closes an open paragraph
// the instant a block-level start tag arrives, so the tree the browser built was never the tree the
// server sent; React found the mismatch when it hydrated, discarded the entire `<main>`, and the
// anchor under the pointer was gone between pointerdown and mousedown — so NO LINK ON ANY PAGE
// COULD BE CLICKED, while every href measured correct and every keyboard activation worked. Four
// specification suites passed over it. This is the check that would have said so in one second.
//
// `proof` is a PROXY NAME, flagged for Doug.

// WHAT THE HTML PARSER REWRITES, and only that. This is not a validator and must not grow into one:
// each rule below names markup where the DOM the browser builds DIFFERS from the markup it was
// given, which is the precise condition that makes a page unhydratable.
const closesAParagraph = new Set(['address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl',
    'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header',
    'hgroup', 'hr', 'main', 'menu', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul']);
const neverNested = new Set(['a', 'button', 'form', 'label']);
const empty = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
    'param', 'source', 'track', 'wbr']);

type Tag = { name: string; attrs: string };

const kinds = (attrs: string): string => ((/class="([^"]*)"/.exec(attrs) ?? ['', ''])[1])
    .split(/\s+/).filter(one => one.startsWith('pd-')).join(' ') || 'no kind';

const at = (tag: Tag): string => `<${tag.name}> (${kinds(tag.attrs)})`;

// WHICH BUILT PAGE AN INTERNAL ADDRESS LEADS TO, and where on it. `/dougs-library/#the-books` is
// the page `dougs-library/index.html` and the id `the-books`; `/` is the root page. Written from the
// base the library is served under, because every address on every page is.
const leads = (href: string, base: string): { page: string; fragment: string | undefined } | undefined => {
    if (!href.startsWith(base)) return undefined;
    const [path, fragment] = href.slice(base.length).split('#');
    const folder = path.replace(/^\/+|\/+$/gu, '');

    return { page: `${folder === '' ? '' : `${folder}/`}index.html`, fragment: fragment === '' ? undefined : fragment };
};

// WHAT IS WRONG WITH WHERE A FRAGMENT LEADS, or nothing. Exactly one element may answer to it: none
// and the link is dead; more than one and the browser lands a reader on whichever comes first, which
// is how a link to a synopsis chapter arrived at a section of another chapter and looked right.
const answering = (ids: Map<string, number>, fragment: string, on: string): string | undefined => {
    const count = ids.get(fragment) ?? 0;
    if (count === 1) return undefined;

    return count === 0
        ? `nothing on ${on} answers to ${on === 'this page' ? 'it' : `#${fragment}`}`
        : `${count} elements on ${on} answer to ${on === 'this page' ? 'it' : `#${fragment}`}, so a reader lands on whichever comes first`;
};

export const proof = (face: string, pages: string[], base = '/'): Diagnostic[] => {
    const wrong: Diagnostic[] = [];
    const said = new Set<string>();
    const fault = (page: string, says: string): void => {
        const key = `${page} ${says}`;
        if (said.has(key)) return;
        said.add(key);
        wrong.push({ at: page, file: join(face, page), says });
    };

    // EVERY PAGE'S IDS ARE GATHERED BEFORE ANY PAGE'S LINKS ARE JUDGED, because a link leads to a
    // page that has not been read yet as often as to one that has. AND THEY ARE COUNTED, NOT
    // COLLECTED: a set swallowed the second `my-library-log` on Doug's summit page (2026-09-20), the
    // row's link was passed as answered, and the browser landed it on the first element wearing the
    // id — a section of another chapter that happened to print the same synopsis. Doug: "It
    // concerns me that navigation worked."
    const answers = new Map<string, Map<string, number>>();
    const leaving: { page: string; href: string }[] = [];

    for (const page of pages) {
        const html = readFileSync(join(face, page), 'utf8');
        const open: Tag[] = [];
        const ids = new Map<string, number>();
        const fragments: string[] = [];
        answers.set(page, ids);

        for (const tag of html.matchAll(/<(\/?)([a-zA-Z0-9-]+)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g)) {
            const name = tag[2].toLowerCase();
            const attrs = tag[3];

            if (tag[1] === '/') {
                const held = open.map(one => one.name).lastIndexOf(name);
                if (held >= 0) open.length = held;
                continue;
            }

            const id = /\sid="([^"]*)"/.exec(attrs);
            if (id !== null && id[1] !== '') ids.set(id[1], (ids.get(id[1]) ?? 0) + 1);
            const href = /\shref="#([^"]*)"/.exec(attrs);
            if (href !== null && href[1] !== '') fragments.push(href[1]);

            // A LINK THAT ONLY WORKS FROM THE ROOT. Every page but the root is served from a folder
            // of its own, so an address written without a leading slash is read against that folder.
            const to = /\shref="([^"#][^"]*)"/.exec(attrs);
            if (to !== null && !/^([a-z]+:|\/)/.test(to[1]))
                fault(page, `${at({ name, attrs })} addresses ${to[1]}, which is read from whatever folder the page is served in`);
            // ONLY AN ANCHOR LEADS A READER SOMEWHERE. A `<link>` addresses a stylesheet, and the
            // first run of this asked where its page was.
            if (to !== null && name === 'a' && to[1].startsWith('/')) leaving.push({ page, href: to[1] });

            if (empty.has(name) || attrs.trimEnd().endsWith('/')) continue;

            const paragraph = open.find(one => one.name === 'p');
            if (paragraph !== undefined && closesAParagraph.has(name))
                fault(page, `${at({ name, attrs })} stands inside ${at(paragraph)}, and the parser closes a paragraph where a block opens — the page cannot hydrate, and nothing on it can be clicked`);

            const nested = neverNested.has(name) ? open.find(one => one.name === name) : undefined;
            if (nested !== undefined)
                fault(page, `${at({ name, attrs })} stands inside ${at(nested)}, and the parser will not nest one`);

            open.push({ name, attrs });
        }

        // AND AN ID IS WORN ONCE, addressed or not. Doug, 2026-09-20: "it should refuse mentions
        // that surface the same id" — two elements claiming one name on a page, and the first link
        // written to it lands on whichever comes first.
        for (const [id, count] of ids)
            if (count > 1) fault(page, `#${id} is worn by ${count} elements on this page, and an id is worn once`);

        for (const fragment of new Set(fragments)) {
            const said = answering(ids, fragment, 'this page');
            if (said !== undefined) fault(page, `a link addresses #${fragment}, and ${said}`);
        }
    }

    // AND EVERY ADDRESS INTO THE LIBRARY LEADS TO A PAGE THE BINDER BUILT, at a place on it that
    // exists — read off the pages rather than the catalogue, so it cannot agree with the catalogue
    // by construction.
    for (const { page, href } of leaving) {
        const led = leads(href, base);
        if (led === undefined) continue;
        const ids = answers.get(led.page);
        if (ids === undefined) { fault(page, `a link addresses ${href}, and no page was built at ${led.page}`); continue; }
        if (led.fragment === undefined) continue;
        const said = answering(ids, led.fragment, led.page);
        if (said !== undefined) fault(page, `a link addresses ${href}, and ${said}`);
    }

    return wrong;
};
