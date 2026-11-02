import { window } from '../rendering/dom';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ReactElement } from 'react';
import type { ViteDevServer } from 'vite';
import { $ } from '@dna-platform/chemistry';
import { Book as publicBook, Specification } from '@dna-platform/public';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { around, type Book } from '../inventory/library';

export type Answer = { folder: string; walked: number; failures: string[] };

void window;

// WRITINGS SPECIFIED, COUNTED ONCE EACH, at the specification's check — the one place every rule set
// runs, and not a chemical, so nothing reaches around it. The count a person reads is distinct
// writings, and the reading is taken once per book out of a single patch.
const counting = (): { since: () => number } => {
    const seen = new WeakSet<object>();
    let reached = 0;
    let last = 0;
    const check = Specification.prototype.check;
    Specification.prototype.check = function (this: Specification<object>, writing: object, code?: string) {
        if (!seen.has(writing)) { seen.add(writing); reached += 1; }

        return check.call(this, writing, code);
    };

    return { since: () => { const answer = reached - last; last = reached; return answer; } };
};

// WHERE A FAILURE LANDS: on the chapter file its code names. A failure is coded from the book down —
// `TheLibrary / Chapter 2 / Section 1: …` — and a chapter's number is its place among the book's
// contents, which are its chapters in the order of its files, because the book module calls them in
// that order. A failure of the book's own lands on its `.book.tsx`.
const placed = (failure: string, book: Book): string => {
    const index = /^[^/:]+ \/ \S+ (\d+)/u.exec(failure)?.[1];
    const file = index === undefined ? undefined : book.files[Number(index)];

    return `${file ?? '.book.tsx'} › ${failure}`;
};

// EVERY BOOK OF THE BATCH IN ONE PROCESS. Opening vite and a DOM costs three seconds before a word
// is read, and the first book pays the package's own load; each book after it costs a fraction —
// measured 2026-09-15 on the wiki at 6.7s, then 1.5s, then 0.5s, against 3.1s of boot apiece when
// each had its own process. Nothing here draws, so no theme is consulted and no book reaches
// another; a pass that DRAWS keeps one process per page, which is what the isolation was ever for.
//
// A BOOK IS BUILT FROM ITS FUNCTION AND ASKED. `book()` returns the book class with its chapters in
// it, `$` makes the writing, and `specify()` hands back every failure beneath it — Doug: "We need
// the .public tests running that can call specify on the test library."
export const specify = async (server: ViteDevServer, folders: string[]): Promise<Answer[]> => {
    const { binding, library } = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
    const found = walk(library, configure(binding));
    // THROUGH THE ONE DOOR the assembly wrote, which is how the prerender and the browser reach a
    // book too — keyed by folder, because a name is the source's and the catalogue has it.
    const { books: open } = (await server.ssrLoadModule(join(binding, 'application', 'books.ts'))) as { books: Record<string, () => Promise<{ book: () => ReactElement }>> };
    const count = counting();
    const answers: Answer[] = [];

    const at = new Map(found.books.map(book => [book.folder, book]));
    for (const folder of folders) {
        const book = at.get(folder);
        if (book === undefined) throw new Error(`${folder} is not a book in ${library}`);
        const { book: written } = await open[folder]();
        const built = $(written(), publicBook);
        const failures = built.specify().map(failure => placed(failure, book));
        answers.push({ folder, walked: count.since(), failures });
    }

    return answers;
};
