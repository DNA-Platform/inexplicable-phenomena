import { window } from '../rendering/dom';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ViteDevServer } from 'vite';
import { $Book, Specification } from '@dna-platform/public';
import { configure } from '../configuration/configuration';
import { walk } from '../inventory/walk';
import { around } from '../inventory/library';
import { Reading, read } from './reading';

export type Answer = { folder: string; book: Record<string, string | string[]>; walked: number; failures: string[] };

void window;

// WRITINGS SPECIFIED, COUNTED ONCE EACH, at the specification's check — the one place every rule set
// runs, and not a chemical, so nothing reaches around it. The framework specifies a writing at its
// bond and again from each ancestor's descent; the count a person reads is distinct writings, and
// the reading is taken once per book out of a single patch.
const counting = (): { since: () => number } => {
    const seen = new WeakSet<object>();
    let reached = 0;
    let last = 0;
    const check = Specification.prototype.check;
    Specification.prototype.check = function (this: Specification<object>, writing: object) {
        if (!seen.has(writing)) { seen.add(writing); reached += 1; }

        return check.call(this, writing);
    };

    return { since: () => { const answer = reached - last; last = reached; return answer; } };
};

// EVERY BOOK OF THE BATCH IN ONE PROCESS. Opening vite and a DOM costs three seconds before a word
// is read, and the first book pays the package's own load; each book after it costs a fraction —
// measured 2026-09-15 on the wiki at 6.7s, then 1.5s, then 0.5s, against 3.1s of boot apiece when
// each had its own process. Nothing here draws, so no theme is consulted and no book reaches
// another; a pass that DRAWS keeps one process per page, which is what the isolation was ever for.
export const specify = async (server: ViteDevServer, folders: string[]): Promise<Answer[]> => {
    const { binding, library } = around(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
    const found = walk(library, configure(binding));
    // THROUGH THE ONE DOOR the assembly wrote, which is how the prerender and the browser reach a
    // book too — keyed by folder, because a name is what this pass is here to read.
    const { books: open } = (await server.ssrLoadModule(join(binding, 'application', 'books.ts'))) as { books: Record<string, () => Promise<{ book: $Book }>> };
    const held = new Reading();
    const count = counting();
    const answers: Answer[] = [];

    const at = new Map(found.books.map(one => [one.folder, one]));
    for (const folder of folders) {
        const book = at.get(folder);
        if (book === undefined) throw new Error(`${folder} is not a book in ${library}`);
        const { book: live } = await open[folder]();
        const answer: Answer = { folder, book: read(live, held), walked: 0, failures: [] };
        try {
            live.specify();
        } catch (error) {
            const message = String((error as Error)?.message ?? error);
            const first = Number(/^(\d+):/u.exec(message)?.[1]);
            answer.failures.push(`${book.files[first] ?? '.book.tsx'} › ${message}`);
        }
        answer.walked = count.since();
        answers.push(answer);
    }

    return answers;
};
