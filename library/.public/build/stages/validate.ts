import { join } from 'node:path';
import type { Library } from '../library.ts';

// VALIDATING. A program becomes a verdict.
//
// It invents no rules. The bond constructors already require a cover, exactly
// one of them, an account of the book itself and a single contents; and
// valid() answers the softer questions — including the three about WHERE A LINK
// POINTS, which only this phase can ask, because deciding whether a book
// catalogues means holding every book at once.
//
// IT RUNS IN BARE NODE, because constructing is not drawing. Nothing here paints.
//
// AND IT RUNS IN ITS OWN PROCESS, which is not a detail. Emitting imports every
// book to read its cards, then REWRITES those same files to carry them — and a
// module already imported is served from cache, so a validator living in the
// emitting process would judge the pass-one copy and find nothing wrong with
// it. THE PROGRAM IS VALIDATED AS IT STANDS ON DISK, by something that did not
// write it.
//
// IT FILLS EVERY CARD BEFORE IT ASKS ANYTHING. A card that never pointed stands
// for nothing, so a link through it cannot be followed and every rule about
// where links point is skipped in silence.

const url = (at: string): string => 'file:///' + at.split('\\').join('/');

export type Levels = {
    chapters: number;
    sections: number;
    paragraphs: number;
    sentences: number;
    words: number;
    letters: number;
};

export type Verdict = {
    route: string;
    at: string;
    stands: boolean;
    says: string[];
    levels: Levels;
};

export type Validation = {
    verdicts: Verdict[];
    stood: number;
    levels: Levels;
};

const empty = (): Levels => ({ chapters: 0, sections: 0, paragraphs: 0, sentences: 0, words: 0, letters: 0 });

const valid = (part: unknown): boolean => {
    const held = part as { valid?: () => boolean };
    if (typeof held?.valid !== 'function') return true;
    try {
        return held.valid() !== false;
    } catch {
        return false;
    }
};

// EVERY LEVEL IS ASKED, not only counted. A book whose letters were constructed
// and never questioned is a number with a silent scope.
const walked = (live: any): { levels: Levels; faults: string[] } => {
    const levels = empty();
    const faults: string[] = [];
    const grades: [keyof Levels, string][] = [
        ['chapters', 'chapter'],
        ['sections', 'section'],
        ['paragraphs', 'paragraph'],
        ['sentences', 'sentence'],
        ['words', 'word'],
        ['letters', 'letter'],
    ];
    for (const [key, grade] of grades) {
        const parts: unknown[] = live?.[key] ?? [];
        levels[key] = parts.length;
        parts.forEach((part, at) => {
            if (!valid(part) && faults.length < 6) {
                faults.push(`${grade} ${at} is invalid — ${(part as any)?.constructor?.name ?? 'unknown'}`);
            }
        });
    }
    return { levels, faults };
};

export const validate = async (resolved: Library, into: string): Promise<Validation> => {
    const cards = (await import(/* @vite-ignore */ url(join(into, 'cards.tsx')))) as { at(path: string): { $of?: () => unknown } | undefined};
    // THE SCOPE IS NOT GIVEN ITS CATALOGUE HERE, and it cannot be: $(Book,
    // CardCatalogue)(TheCatalogue) needs a React render context and throws under
    // Node. So the emitted cover carries its card instead — see emit.ts.

    // TWO PASSES, and the order is forced. Every card holds its book before any
    // book is asked, because one book's validity is a question about another —
    // an author that authors itself lives somewhere else.
    const live = new Map<string, any>();
    for (const book of resolved.books) {
        const loaded = (await import(/* @vite-ignore */ url(join(into, book.path, 'book.tsx')))) as { book: unknown };
        live.set(book.path, loaded.book);
        const card = cards.at(book.route);
        if (card) card.$of = () => loaded.book;
    }

    const verdicts: Verdict[] = [];
    const levels = empty();

    for (const book of resolved.books) {
        const held = live.get(book.path);
        const { levels: own, faults } = walked(held);
        for (const key of Object.keys(levels) as (keyof Levels)[]) levels[key] += own[key];

        const says = [...faults];
        // A BOOK THAT CONSTRUCTS NOTHING IS NOT A BOOK THAT PASSED. Zero is the
        // one number a walk reports while having asked nothing.
        if (!own.chapters) says.push('constructed no chapters at all');

        const stands = valid(held) && own.chapters > 0 && !faults.length;
        if (!stands && !says.length) says.push('a cover names something it should not — an author that does not author itself, a subject that catalogues nothing, or a canonical that belongs elsewhere');

        verdicts.push({ route: book.route, at: `${book.path}/${book.cover.name}`, stands, says, levels: own });
    }

    return { verdicts, stood: verdicts.filter(v => v.stands).length, levels };
};
