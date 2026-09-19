// THE LANGUAGE, WRITTEN DOWN ONCE, AS SOMETHING THAT CAN BE READ.
//
// `catalogue/language.ts` is a PROXY NAME, flagged for Doug.
//
// EVERY FORM IS A ROW OF THE TABLE BELOW. That is the whole point of this file: an earlier writing
// classified a match with a chain of ifs, which is a language you can only learn by executing it in
// your head, and which quietly admits whatever it forgets to refuse. A table is total by inspection
// — every row is a form, and anything not in it is not the language.
//
// IT IS REGULAR AND IT DOES NOT NEED A GRAMMAR ENGINE. The whole of it is: some stars, some
// brackets, a name, some brackets, some stars. What it needs instead is for a NAME to be parsed
// once into something structured, rather than scoped by string surgery in every place that asks —
// because the scope of a reference is the one thing the reference cannot carry and the place it
// stands always knows, and a rule about identity written in three places is three rules.

// ---- what a form does ----
//
// PREFIX FACES OUT AND POSTFIX FACES IN. `*[[ X ]]` says something about X — this writing is the one
// being authored, so it is the TARGET of the edge. `[[ X ]]*` says something about this writing —
// it is the author, so it is the SOURCE. The side the stars stand on is the direction.
export type Relation = 'author' | 'subject' | 'topic';
export type End = 'source' | 'target';

export type Form =
    | { is: 'mention' }
    | { is: 'title' }
    | { is: 'edge'; relation: Relation; end: End };

// THE LANGUAGE. Read the first three columns and you have read the syntax; read the fourth and you
// have read what it means. Nothing else in this compiler is allowed to know a form by its spelling.
export const forms: { brackets: number; prefix: string; postfix: string; form: Form; reads: string }[] = [
    { brackets: 3, prefix: '',    postfix: '',    form: { is: 'mention' },                              reads: 'this is named X, here' },
    { brackets: 2, prefix: '',    postfix: '',    form: { is: 'title' },                                reads: 'this is titled X' },
    { brackets: 2, prefix: '*',   postfix: '',    form: { is: 'edge', relation: 'author',  end: 'target' }, reads: 'this is authored by X' },
    { brackets: 2, prefix: '**',  postfix: '',    form: { is: 'edge', relation: 'subject', end: 'target' }, reads: 'this is catalogued by X, canonically' },
    { brackets: 2, prefix: '***', postfix: '',    form: { is: 'edge', relation: 'topic',   end: 'target' }, reads: 'this is catalogued by X' },
    { brackets: 2, prefix: '',    postfix: '*',   form: { is: 'edge', relation: 'author',  end: 'source' }, reads: 'this is author X' },
    { brackets: 2, prefix: '',    postfix: '**',  form: { is: 'edge', relation: 'subject', end: 'source' }, reads: 'this is subject X' },
    { brackets: 2, prefix: '',    postfix: '***', form: { is: 'edge', relation: 'topic',   end: 'source' }, reads: 'this is a catalogue of X' },
];

// AND EVERY OTHER SPELLING IS NOT THE LANGUAGE. Stars on both sides, brackets that do not balance,
// three brackets carrying stars — none of them mean anything, and the one outcome that must not
// happen is silence, because an annotation that does nothing looks exactly like one that works.
export const form = (prefix: string, brackets: number, postfix: string): Form | undefined =>
    forms.find(one => one.brackets === brackets && one.prefix === prefix && one.postfix === postfix)?.form;

// ---- how a form is spelled ----
//
// THE BRACKET IS DISPLAY AND THE PAREN IS THE IDENTIFIER, ON EVERY FORM. Doug, 2026-09-18, exactly:
// "`**$[Author: Doug](Doug)*` says the text 'Author: Doug' is what I'll display for the url
// associated with Doug, the author identifier." And 2026-09-19, on finding the paren gone from the
// table: "No language version ever gave anything one slot. It was always assumed."
//
// SO EVERY SPELLING BELOW MAY BE FOLLOWED BY `( name )`, TIGHT AGAINST THE CLOSING BRACKET. With it,
// the bracket is what the page shows and the paren is what the library is asked for; without it,
// the bracket is both. The tightness is not fussiness — `[[ X ]] (a parenthetical remark)` is prose
// and must stay prose, and one space is the whole of what tells the two apart.
//
// AND THE PAREN COMES BEFORE THE POSTFIX STARS, the way Doug wrote it: `[[ Doug ]]( Dougs Library )**`.
//
// ONE REGEX, WRITTEN HERE AND CONSTRUCTED WHERE IT IS RUN. The scanner and the transform each walk a
// file with it; a shared GLOBAL regex would carry its `lastIndex` from one caller into the next, so
// what is shared is the SOURCE and each caller owns its own cursor.
//
//   1 prefix stars · 2 opening brackets · 3 the words · 4 closing brackets · 5 the name, if given
//   6 postfix stars                                          — the annotating shape
//   7 the words · 8 the name, if given                       — the referring shape, `$[ ]`
export const notation = /(\*{0,3})(\[{2,3})([^\]\n]*)(\]{2,3})(?:\(([^)\n]*)\))?(\*{0,3})|\$\[([^\]\n]*)\](?:\(([^)\n]*)\))?/u;

// WHAT A MATCH SAID, read off the groups above in one place — so nobody downstream knows that the
// name is group five, or that a reference's words are group seven.
export type Spelling = { refers: boolean; prefix: string; brackets: number; balanced: boolean; postfix: string; words: string; name: string; named: boolean };

export const spelling = (held: RegExpExecArray, reads: (said: string) => string = one => one): Spelling => {
    const refers = held[7] !== undefined;
    const words = reads(refers ? held[7] : held[3]).trim();
    const given = refers ? held[8] : held[5];

    return {
        refers,
        prefix: refers ? '' : held[1],
        brackets: refers ? 1 : held[2].length,
        balanced: refers || held[2].length === held[4].length,
        postfix: refers ? '' : held[6],
        words,
        name: given === undefined ? words : reads(given).trim(),
        named: given !== undefined,
    };
};

// HOW A FORM IS WRITTEN, for telling an author what the other end of a connection owes. A message
// that says a connection is missing and does not say what to write sends somebody to read the
// compiler.
export const spelt = (relation: Relation, end: End, name: string): string => {
    const held = forms.find(one => one.form.is === 'edge' && one.form.relation === relation && one.form.end === end);

    return held === undefined ? name : `${held.prefix}[[ ${name} ]]${held.postfix}`;
};

// AND THE NAME INSIDE A WRITTEN FORM, for the places that read an ELEMENT rather than prose. A
// title may be written plain or annotated — `<Title>The Sheet</Title>` and
// `<Title>[[ The Sheet ]]</Title>` name the same chapter — because the element already carries the
// relation and the brackets are the explicit spelling of what it implies.
//
// THE WHOLE ELEMENT MUST BE THE FORM, so the regex is the one above with its ends pinned: a title
// that is prose with an annotation somewhere inside it is not a title written as an annotation.
const written = new RegExp(`^(?:${notation.source})$`, 'u');

export const bare = (said: string): { name: string; words: string; stars: string } => {
    const held = written.exec(said.trim());
    if (held === null) return { name: said.trim(), words: said.trim(), stars: '' };
    const read = spelling(held);
    if (!read.balanced || read.refers) return { name: said.trim(), words: said.trim(), stars: '' };

    return { name: read.name, words: read.words, stars: read.prefix !== '' ? read.prefix : read.postfix };
};

// ---- what a name is ----
//
// THREE SHAPES AND ONE RULE: a leading separator means WITHIN WHERE I STAND.
//
//   A Book               a book
//   / A Chapter          a chapter of the book this stands in
//   A Book / A Chapter   a chapter of another book
//
// THE SEPARATOR IS A SLASH, AND IT IS WRITTEN DOWN ONCE. It was `>` first, chosen to be distinct —
// and `>` is not valid inside a JSX element, so every chapter reference in the library's own prose
// had to be written `&gt;` and esbuild refused the file when the compiler wrote one back. Doug,
// 2026-09-18: "I know but I was being unique on purpose. Let's be traditional."
//
// AND IT READS LIKE THE ADDRESS IT BECOMES, which is the part worth having: `Dougs Library / The
// Sheet` compiles to `/dougs-library/#the-sheet`, so the nesting is spelled one way instead of two.
export const separator = ' / ';

// A KEY WRITTEN THE ONE WAY. Whitespace around the separator is the writer's business and never the
// catalogue's, so it is normalised here and nowhere else.
export const tidy = (key: string): string => key.replace(/\s*\/\s*/gu, separator).trim();

// AND WHAT A KEY CALLS ITS LAST PART, which is what a thing is called where it stands. Written here
// so that nothing outside this file ever slices a key by hand — that was the same rule in three
// places, each with its own magic number for the length of the separator.
export const last = (key: string): string =>
    key.includes(separator) ? key.slice(key.lastIndexOf(separator) + separator.length) : key;

// PARSED ONCE, HERE. Everywhere else in the compiler holds a Name and asks it what it means, rather
// than looking for `>` in a string and hoping it is doing the same thing the last place did.
export type Name =
    | { of: 'book'; book: string }
    | { of: 'chapter'; book: string; chapter: string }
    | { of: 'chapter'; within: true; chapter: string };

const tidied = (said: string): string => said.replace(/\s+/gu, ' ').trim();

// `.` ESCAPES THE CHARACTER AFTER IT. Doug, 2026-09-18: "I like . as the escape character in
// public." It is what makes the separator survive contact with titles nobody chose — and at the
// scale this library is heading for, titles are imported conversation names: `w/ Claude`, `TCP/IP`,
// `either/or`. A separator that forbids those forbids the library.
//
// AND A LEADING `./` IS THE RELATIVE FORM RATHER THAN AN ESCAPE, because at the front there is
// nothing to the left for a separator to separate — so the mark is free to mean HERE, the way it
// does in every path anyone has ever typed.
const unescaped = (said: string): string => said.replace(/\.(.)/gu, '$1');

// WHERE THE FIRST SEPARATOR THAT IS ACTUALLY A SEPARATOR STANDS, which is the first `/` nobody
// escaped. Written as a scan rather than a regex because a lookbehind for "an odd number of dots"
// is the kind of expression that is wrong for a year before anybody notices.
const splits = (said: string): number => {
    for (let at = 0; at < said.length; at++) {
        if (said[at] === '.') { at += 1; continue; }
        if (said[at] === '/') return at;
    }

    return -1;
};

export const name = (said: string): Name => {
    const held = tidied(said);
    if (held.startsWith('./')) return { of: 'chapter', within: true, chapter: tidied(unescaped(held.slice(2))) };
    const at = splits(held);
    if (at === -1) return { of: 'book', book: unescaped(held) };

    return { of: 'chapter', book: tidied(unescaped(held.slice(0, at))), chapter: tidied(unescaped(held.slice(at + 1))) };
};

// AND THE WHOLE OF IT AS ONE NAME, for asking whether the library holds a thing called exactly that.
// MEMBERSHIP DECIDES AND THE SEPARATOR ONLY HINTS: a book really called `TCP/IP` is a book the
// library holds, and reading it as a chapter of a book called `TCP` is the compiler being clever
// about punctuation instead of asking. The design is that a resolver tries the whole name first and
// splits second, refusing a name where both readings resolve; TODAY NOTHING CALLS THIS — `reaches`
// splits, and `TCP./IP` is how a writer keeps the slash. Kept as the seam, and flagged for Doug.
export const whole = (said: string): string => unescaped(tidied(said));

// THE KEY A NAME STANDS FOR, once the scope is known. A chapter is named within its book and nowhere
// else, so `Dougs Library > The Sheet` is the WHOLE key and there is no bare one beside it — two
// books may each hold a `Table of Contents` and neither is wrong, because the scope is what tells
// them apart.
export const key = (held: Name, within: string | undefined): string => {
    if (held.of === 'book') return held.book;
    if ('within' in held) return within === undefined ? held.chapter : `${within}${separator}${held.chapter}`;

    return `${held.book}${separator}${held.chapter}`;
};

// AND WHETHER A NAME MEANS THE BOOK IT STANDS IN. A cover is a chapter too, titled with the book's
// name, so a table naming its own cover reaches the BOOK rather than a chapter key that was never
// made. Asked here because the listing pass and the mention pass both need it, and two copies of a
// rule about identity is the exact fault this compiler exists to refuse.
export const itself = (held: Name, within: string | undefined): boolean =>
    held.of === 'chapter' && 'within' in held && held.chapter === within;
