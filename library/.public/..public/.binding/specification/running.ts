import { join } from 'node:path';
import { startVitest } from 'vitest/node';
import type { Diagnostic, Library } from '../inventory/library';

// WHICH BOOK A TEST IS ABOUT, said in the test's own metadata and carried back by vitest — declared
// here, where it is read, so a test that says it is typed and nothing is parsed out of a message.
declare module 'vitest' {
    interface TaskMeta {
        book?: string;
    }
}

type Result = { name: string; failed: boolean; says: string; at: string | undefined; file: string | undefined };

// A LIBRARY IS CHECKED BY THE TEST FRAMEWORK, NOT BY A WRITING'S SPECIFICATION. A piece of writing
// specifies ITSELF — that is the framework's own machinery, and each book still runs it. What holds
// ACROSS books is a claim about what the compiler produced, which is what a test framework is for:
// vitest is a dependency of every binding already, and it hands back each test by name with its
// state, its message and where it stands — so nothing here encodes a failure in a string and reads
// it back out. A library adds a rule by adding a test.
const walked = (task: { type: string; name: string; tasks?: unknown[]; result?: { state?: string; errors?: { message?: string }[] }; meta?: { book?: string }; file?: { filepath?: string } }, named: string[] = []): Result[] => {
    if (task.type === 'test')
        return [{
            name: [...named, task.name].join(' › '),
            failed: task.result?.state === 'fail',
            says: task.result?.errors?.[0]?.message ?? 'failed',
            at: task.meta?.book,
            file: task.file?.filepath,
        }];

    return (task.tasks ?? []).flatMap(one => walked(one as never, task.type === 'suite' ? [...named, task.name] : named));
};

// WHERE A FAILURE LANDS: the book a test says it is about, on that book's first file — its cover
// where it has one — and otherwise the test's own file. A test says which book it is about by
// putting it in its own metadata, which vitest carries back here; it is never read out of a message.
const placed = (found: Library, one: Result): Diagnostic => {
    const book = found.books.find(held => held.folder === one.at);
    if (book !== undefined) return { at: one.at as string, file: join(book.path, book.files[0] ?? '.book.tsx'), says: `${one.name} — ${one.says}` };

    return { at: one.at ?? 'the library', file: one.file ?? join(found.root, '.book.tsx'), says: `${one.name} — ${one.says}` };
};

export const running = async (binding: string, found: Library, only: string): Promise<Diagnostic[]> => {
    const vitest = await startVitest('test', [only], { root: binding, watch: false, silent: true, reporters: [{}] });
    try {
        const results = vitest.state.getFiles().flatMap(one => walked(one as never));
        if (results.length === 0) throw new Error(`${only} ran no test — the library is checked by what stands there`);

        return results.filter(one => one.failed).map(one => placed(found, one));
    } finally {
        await vitest.close();
    }
};
