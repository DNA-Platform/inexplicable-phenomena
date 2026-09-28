// WHAT A FILE NAME MEANS IN A LIBRARY. Every rule for reading one is stated here, once, because two
// passes ask these questions and a rule with two homes is a rule that will eventually disagree with
// itself: the inventory asks them to account for what a book holds, and the resource phase asks them
// to find the file a chapter placed. Neither may answer differently.

// THE THREE DOT CHAPTERS, AND EVERY BOOK HAS ALL THREE. Doug, 2026-09-18: "Every book has to have
// three dot chapters. The compiler cares!" — so this is a requirement and not a convention, and
// `catalogue/specification.ts` fails the bind for a book missing any of them.
//
// `.book.tsx` IS NOT ONE OF THEM, because it is not a chapter — it is the book, the thing the other
// three are chapters OF, and the inventory already refuses a folder that has no `.book.tsx` by not
// calling it a book at all.
export const dotChapters = ['.cover.tsx', '.synopsis.tsx', '.table.tsx'];

// WHAT A BOOK IS MADE OF BESIDES ITS NUMBERED CHAPTERS, in the order it is bound.
export const apparatus = ['.book.tsx', ...dotChapters];

// A CHAPTER IS A NUMBERED .tsx, and a file accompanying a writing carries the writing's extension-free
// name, one separator character of the author's choosing, an identifier and its type —
// `5-the-plate.version1.tsx`, `5-the-plate-figures.tsx` — or the writing's name and its type alone,
// `5-the-plate.ts`, an empty identifier. Doug, 2026-09-28: "Any file that has the extension-free name
// of the chapter as its prefix. The rest of the name is its filename, skipping one character as a
// separator… It is empty, identify it by its extension"; and "just skip a character, let them use what
// they want, and we make the dot a convention and recommendation." So a numbered .tsx is a chapter
// unless it accompanies another — its name being another chapter's name, a character, and more —
// which `accountOfFiles` decides with every candidate in hand; and a .tsx accompanying a chapter
// always carries an identifier, since the name alone would be the chapter's.
export const isChapter = (file: string): boolean =>
    /^\d/u.test(file) && file.endsWith('.tsx');

// WHETHER A FILE'S BASE ACCOMPANIES A WRITING'S NAME: the same name, or the name, one character and
// at least what `least` asks — nothing for an ordinary file, one character for a .tsx that must not
// be the chapter itself.
export const accompanies = (base: string, name: string, least = 0): boolean =>
    base === name || (base.startsWith(name) && base.length >= name.length + 1 + least);

// WHAT ACCOMPANIES A WRITING: the file, the identifier between the writing's name and the type, and
// the type with its dot. Doug: "the identifier (part after chapter name then separator before
// extension) and type (extension like .tsx), that can be passed as props to the annotation."
export type Accompanying = { file: string; identifier: string; type: string };

// TWO FILES UNDER ONE IDENTIFIER AND TYPE, named for the diagnostic that refuses them.
export type Clashing = Accompanying & { writing: string };

export const accompanying = (file: string, writing: string): Accompanying => {
    const base = withoutFinalExtension(file);
    const name = withoutFinalExtension(writing);

    return { file, identifier: base === name ? '' : base.slice(name.length + 1), type: file.slice(file.lastIndexOf('.')) };
};

// A DECLARATION IS NOT AN OFFENCE: `.d.ts` is emitted rather than written, and no author put it there.
export const isDeclaration = (file: string): boolean => file.endsWith('.d.ts');

// AND A RESOURCE CARRIES ONE OF THE EXTENSIONS A LIBRARY KNOWS. Left open, a stray file passes by
// being named after one that belongs: `2-the-source.tsx.bak` loses `.bak`, lands on a real chapter's
// name and is waved through as its resource. What may stand beside a chapter is a closed list.
const knownExtensions = ['ts', 'tsx', 'js', 'mjs', 'json', 'md', 'css', 'sh', 'txt', 'csv', 'svg', 'png', 'jpg', 'jpeg'];

// AND WHICH OF THEM ARE PICTURES: imported as the bundler emits them, an address; read by nobody for
// references, since their bytes are not writing.
export const imageTypes = ['.png', '.jpg', '.jpeg'];

export const isKnown = (file: string): boolean =>
    knownExtensions.includes(file.slice(file.lastIndexOf('.') + 1).toLowerCase());

// WHAT IS LEFT WHEN A FILE'S FINAL EXTENSION COMES OFF, which is how a resource is matched to the
// writing it accompanies: `1-the-plates.tsx.tsx` leaves `1-the-plates.tsx`, which is a chapter's whole
// name, and `2-the-source.ts` leaves `2-the-source`, which is the name it carries without one. Both
// are held by whoever matches, so one rule reads either spelling without knowing which it has.
export const withoutFinalExtension = (file: string): string => file.replace(/\.[^.]+$/u, '');

// THE ORDER CHAPTERS ARE BOUND IN, which is their number and not their spelling. A book may number
// its chapters 1, 2, 3 or 1.1, 1.2, 2 — so the comparison is a walk down two lists of numbers rather
// than a string comparison that would put 10 before 2.
const numbered = (file: string): number[] => file.split('-')[0].split('.').map(Number);

export const before = (one: string, two: string): number => {
    const first = numbered(one);
    const second = numbered(two);
    for (let at = 0; at < Math.max(first.length, second.length); at++) {
        const a = first[at] ?? -1;
        const b = second[at] ?? -1;
        if (a !== b) return a - b;
    }

    return 0;
};
