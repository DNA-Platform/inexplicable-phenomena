import { spawn } from 'node:child_process';

// THE BINDER'S CHILDREN, and how many run at once. Two stages open a process per batch — the
// specification reads a batch of books in one, the render draws a batch of pages in one — and each ran
// its children one after another until 2026-10-16, on a machine with fourteen cores. Each stage now
// says in its own configuration how many run at once, one unless a library says more, and this is the
// one loop that honours it: the next child opens when one closes, every answer lands at its order's
// index so a list that came back in another order is no diff on the next bind, and after a child fails
// no further order is started and the failure is raised once the children still open have closed, so
// nothing is left running behind a thrown error.
export const atOnce = async <Order, Answer>(orders: Order[], parallel: number, run: (order: Order) => Promise<Answer>): Promise<Answer[]> => {
    const answers = new Array<Answer>(orders.length);
    const failures: unknown[] = [];
    let next = 0;
    const worker = async (): Promise<void> => {
        while (next < orders.length && failures.length === 0) {
            const index = next;
            next += 1;
            try {
                answers[index] = await run(orders[index]);
            } catch (failure) {
                failures.push(failure);
            }
        }
    };
    await Promise.all(Array.from({ length: Math.min(Math.max(parallel, 1), orders.length) }, worker));
    if (failures.length > 0) throw failures[0];

    return answers;
};

// ONE CHILD, OPENED AND HEARD OUT: Node run on an entry with its arguments, in the binding, its stdout
// collected and its stderr passed through, and what it exited with handed back with everything it
// printed. The caller reads the last line, which is the child's answer as JSON, and a child says its
// peak resident set there, so a stage's report says what a child of its batch or budget holds and a
// library sets `batch`, `budget` and `parallel` on a number rather than a guess.
export type Closed = { status: number | null; out: string };

export const opened = (binding: string, args: string[], env: NodeJS.ProcessEnv): Promise<Closed> => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: binding, stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, ...env } });
    let out = '';
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => { out += chunk; });
    child.on('error', reject);
    child.on('close', status => resolve({ status, out }));
});

export const lastLine = (text: string): string => text.trim().split(/\r?\n/).at(-1) ?? '';
