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

export const proof = (face: string, pages: string[]): Diagnostic[] => {
    const wrong: Diagnostic[] = [];
    const said = new Set<string>();
    const fault = (page: string, says: string): void => {
        const key = `${page} ${says}`;
        if (said.has(key)) return;
        said.add(key);
        wrong.push({ at: page, file: join(face, page), says });
    };

    for (const page of pages) {
        const html = readFileSync(join(face, page), 'utf8');
        const open: Tag[] = [];
        const ids = new Set<string>();
        const fragments: string[] = [];

        for (const tag of html.matchAll(/<(\/?)([a-zA-Z0-9-]+)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g)) {
            const name = tag[2].toLowerCase();
            const attrs = tag[3];

            if (tag[1] === '/') {
                const held = open.map(one => one.name).lastIndexOf(name);
                if (held >= 0) open.length = held;
                continue;
            }

            const id = /\sid="([^"]*)"/.exec(attrs);
            if (id !== null && id[1] !== '') ids.add(id[1]);
            const href = /\shref="#([^"]*)"/.exec(attrs);
            if (href !== null && href[1] !== '') fragments.push(href[1]);

            // A LINK THAT ONLY WORKS FROM THE ROOT. Every page but the root is served from a folder
            // of its own, so an address written without a leading slash is read against that folder.
            const to = /\shref="([^"#][^"]*)"/.exec(attrs);
            if (to !== null && !/^([a-z]+:|\/)/.test(to[1]))
                fault(page, `${at({ name, attrs })} addresses ${to[1]}, which is read from whatever folder the page is served in`);

            if (empty.has(name) || attrs.trimEnd().endsWith('/')) continue;

            const paragraph = open.find(one => one.name === 'p');
            if (paragraph !== undefined && closesAParagraph.has(name))
                fault(page, `${at({ name, attrs })} stands inside ${at(paragraph)}, and the parser closes a paragraph where a block opens — the page cannot hydrate, and nothing on it can be clicked`);

            const nested = neverNested.has(name) ? open.find(one => one.name === name) : undefined;
            if (nested !== undefined)
                fault(page, `${at({ name, attrs })} stands inside ${at(nested)}, and the parser will not nest one`);

            open.push({ name, attrs });
        }

        for (const fragment of new Set(fragments))
            if (!ids.has(fragment)) fault(page, `a link addresses #${fragment}, and nothing on this page answers to it`);
    }

    return wrong;
};
