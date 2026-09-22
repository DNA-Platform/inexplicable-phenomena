// THE NOTATION — the one reader of the reference language, settled 2026-09-17 as D10 of
// The Catalogue and the Specification. PREFIX SAYS WHAT IS ALLOCATED; POSTFIX SAYS WHAT COMES BACK.
//
//   *[ X ]        allocate here                        -> nothing                  a mention
//   *$[ X ]*      allocate a stand-in, this writing    -> an address               a title
//   **$[ X ]*     allocate a stand-in, the book        -> an address               an author
//   **$[ X ]**    allocate a stand-in, the collection  -> an address to a reference a subject
//   $[ X ]*       no allocation, just stand in         -> an address               a citation
//
// Each may carry a key — `*$[ The Title ](the-key)*` — and where no key is written the copy is
// the key.
//
// IT TAKES ITSELF OUT OF THE PROSE, which is D5's ruling in Doug's words: "We have a parser that
// reads it, saves the key and the quote (possibly same) and then removes itself. The key and start
// and end indexes in the text, and the quote, and then removes itself from the string." So a reader
// never meets the notation; they meet the quote, and where it stood is recorded beside the writing.
// The indexes below are into the CLEAN text for that reason.
//
// AND IT REFUSES. That is the whole point of the design: a bracket group whose prefix and postfix
// are not one of the five pairs is a fault, named and returned, never silently drawn. The old bare
// form `[text](target)` is exactly such a group, and it is refused by construction rather than by
// a rule written against it.
//
// `Notation`, `Mark`, `Read` and `Fault` are PROXY names, flagged for Doug.

export type Shape = 'mention' | 'title' | 'author' | 'subject' | 'citation';

export type Mark = {
    shape: Shape;
    quote: string;
    key: string;
    start: number;
    end: number;
};

export type Fault = {
    says: string;
    written: string;
    at: number;
};

export type Read = {
    text: string;
    marks: Mark[];
    faults: Fault[];
};

// THE FIVE PAIRS, and nothing else is a reference. Read as `prefix|postfix`, an empty postfix
// written as the empty string — the mention is the only form with no return, which is what makes
// it the primitive.
const shapes = new Map<string, Shape>([
    ['*|', 'mention'],
    ['*$|*', 'title'],
    ['**$|*', 'author'],
    ['**$|**', 'subject'],
    ['$|*', 'citation'],
]);

const prefixes = ['**$', '*$', '*', '$'];

// What may stand before a bracket and belong to it. Read longest-first so `**$` is never taken as
// `*` followed by text, which is the one place a shorter prefix could steal a longer one's mark.
function prefixAt(copy: string, open: number): { mark: string; from: number } {
    for (const mark of prefixes)
        if (open >= mark.length && copy.slice(open - mark.length, open) === mark)
            return { mark, from: open - mark.length };

    return { mark: '', from: open };
}

// What may stand after the closing bracket, and after a key if one was written. Longest first, for
// the same reason.
function postfixAt(copy: string, after: number): { mark: string; to: number } {
    for (const mark of ['**', '*'])
        if (copy.slice(after, after + mark.length) === mark)
            return { mark, to: after + mark.length };

    return { mark: '', to: after };
}

// A KEY IS WRITTEN IN PARENTHESES DIRECTLY AFTER THE BRACKET, and it holds whatever a person
// writes — a name, with spaces, not a URL. Doug, 2026-09-15: "it's not markdown, WE should be
// parsing that… a TARGET here is a NAME."
function keyAt(copy: string, after: number): { key: string; to: number } {
    if (copy[after] !== '(') return { key: '', to: after };
    const close = copy.indexOf(')', after + 1);
    if (close === -1) return { key: '', to: after };

    return { key: copy.slice(after + 1, close).trim(), to: close + 1 };
}

export const notation = {
    // Whether a piece of copy carries the notation at all — asked before a reading, so a caller
    // that has nothing to strip pays one scan and allocates nothing.
    carries(copy: string): boolean {
        return copy.includes('[');
    },

    // THE READING. Returns the prose a reader meets, the marks taken out of it with their quote,
    // key and where they stood, and every bracket group that is not one of the five.
    read(copy: string): Read {
        const marks: Mark[] = [];
        const faults: Fault[] = [];
        let text = '';
        let at = 0;

        while (at < copy.length) {
            const open = copy.indexOf('[', at);
            if (open === -1) { text += copy.slice(at); break; }

            const close = copy.indexOf(']', open + 1);
            if (close === -1) { text += copy.slice(at); break; }

            const { mark: prefix, from } = prefixAt(copy, open);
            const keyed = keyAt(copy, close + 1);
            const { mark: postfix, to } = postfixAt(copy, keyed.to);
            const shape = shapes.get(`${prefix}|${postfix}`);
            const quote = copy.slice(open + 1, close).trim();
            const written = copy.slice(from, to);

            text += copy.slice(at, from);

            if (shape === undefined) {
                faults.push({ says: said(prefix, postfix), written, at: text.length });
                text += written;
                at = to;
                continue;
            }

            marks.push({ shape, quote, key: keyed.key === '' ? quote : keyed.key, start: text.length, end: text.length + quote.length });
            text += quote;
            at = to;
        }

        return { text, marks, faults };
    },
};

// THE REFUSAL SAYS WHAT WAS WRITTEN AND WHAT THE FIVE ARE, because a notation nobody memorises has
// to teach itself at the point of failure — which is what D10 means by optimised so that a compiler
// can refuse.
function said(prefix: string, postfix: string): string {
    const written = `${prefix}[ … ]${postfix}`;
    const bare = prefix === '' && postfix === '';

    return bare
        ? `${written} is not a reference — the plain form was replaced by the notation: *[ X ] a mention, *$[ X ]* a title, **$[ X ]* an author, **$[ X ]** a subject, $[ X ]* a citation`
        : `${written} is not one of the five: *[ X ] a mention, *$[ X ]* a title, **$[ X ]* an author, **$[ X ]** a subject, $[ X ]* a citation`;
}
