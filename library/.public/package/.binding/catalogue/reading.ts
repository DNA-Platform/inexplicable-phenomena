// THE SHARED RULES FOR READING A BOOK'S SOURCE: JSX's own whitespace and the entities prose reaches
// for. Two passes ask these — the scanner and the reference transform — and a rule with two homes
// disagrees with itself.

// ---- JSX's own whitespace rule, which is not optional to replicate ----

// A KEY IS WHAT THE RUNTIME SEES, AND THE RUNTIME SEES WHAT JSX MADE. Found 2026-09-18 in Doug's
// library: `<Book>Semantic Reference\n                        Theory</Book>` — a mention wrapped
// over a line. Nothing in the framework normalises it; `html.text` joins strings and `trim()` only
// strips the ends. Yet the graph records `Semantic Reference Theory` with one space, because the
// JSX compiler had already collapsed the newline and its indentation before any value existed.
//
// So a reader of SOURCE that takes JsxText literally invents a key the runtime never produces, the
// mention refuses, and the prose it refuses is correct — a failure with nothing wrong to look at.
// This is babel's own algorithm rather than an approximation of it.
const said = (text: string): string => {
    const lines = text.split(/\r\n|\n|\r/u);
    let lastSpoken = 0;
    for (let at = 0; at < lines.length; at++) if (/[^ \t]/u.test(lines[at])) lastSpoken = at;

    let answer = '';
    for (let at = 0; at < lines.length; at++) {
        let line = lines[at].replace(/\t/gu, ' ');
        if (at !== 0) line = line.replace(/^ +/u, '');
        if (at !== lines.length - 1) line = line.replace(/ +$/u, '');
        if (line === '') continue;
        answer += at === lastSpoken ? line : `${line} `;
    }

    return answer;
};

// AND THE ENTITIES, because an author writes `Dougs Library` and the catalogue holds
// `Dougs Library`. Only the ones a person writing prose reaches for; an unknown entity is left
// alone rather than guessed at, so a miss is visible in the key instead of silently becoming
// something else.
const entities: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
    mdash: '—', ndash: '–', hellip: '…',
};

const spelled = (text: string): string =>
    text.replace(/&(#x?[0-9a-f]+|[a-z]+);/giu, (whole, held: string) => {
        if (held.startsWith('#')) {
            const at = held[1] === 'x' || held[1] === 'X' ? Number.parseInt(held.slice(2), 16) : Number.parseInt(held.slice(1), 10);
            return Number.isFinite(at) ? String.fromCodePoint(at) : whole;
        }
        return entities[held.toLowerCase()] ?? whole;
    });

// WHAT A RUN OF JsxText SAYS ONCE THE COMPILER HAS HAD IT — the two rules above, in the order they
// happen, exported because TWO passes ask this question and a rule with two homes will eventually
// disagree with itself. It already did: the reference transform read raw text, so its key was
// `Dougs Library` where this file's key was `Dougs Library`, and a title that was written
// correctly did not resolve. One home, both callers.
export const reads = (text: string): string => spelled(said(text));

