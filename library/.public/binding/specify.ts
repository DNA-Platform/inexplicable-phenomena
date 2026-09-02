import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve as absolute, join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { config } from './config.ts';
import { walk } from './walk.ts';
import { read } from './read.ts';
import { resolve } from './resolve.ts';
import type { Library } from './library.ts';

const forward = (p: string): string => p.split(sep).join('/');

const spec = (library: Library, pack: string): string => `import { describe, expect, it } from 'vitest';
import type { $Book } from '${pack}';

const books: [string, () => Promise<{ book: $Book }>][] = [
${library.books.map(book => `    [${JSON.stringify(book.route)}, () => import('./${book.path}/book')],`).join('\n')}
];

describe('every book stands', () => {
    for (const [route, open] of books) {
        it(route + ' stands', async () => {
            const { book } = await open();
            expect(() => book.specify()).not.toThrow();
        });
    }
});
`;

const configuration = (source: string, pack: string): string => `import { defineConfig } from 'vitest/config';

export default defineConfig({
    cacheDir: ${JSON.stringify(forward(join(tmpdir(), 'binding')))},
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['specify.test.tsx'],
        deps: { inline: [/chemistry/] },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            ${JSON.stringify(pack)}: ${JSON.stringify(source + '/index.ts')},
            '@': ${JSON.stringify(source)},
        },
    },
    esbuild: { target: 'node14', jsx: 'automatic' },
});
`;

type Result = {
    numPassedTests?: number;
    testResults?: { assertionResults?: { status: string; title: string; failureMessages?: string[] }[] }[];
};

export type Stood = { stood: number; of: number; said: string[] };

export const specify = (library: Library, to: string, pack: string, source = forward(absolute(import.meta.dirname, '../package/src'))): Stood => {
    mkdirSync(to, { recursive: true });
    writeFileSync(join(to, 'specify.test.tsx'), spec(library, pack));
    writeFileSync(join(to, 'vitest.config.ts'), configuration(source, pack));
    const run = spawnSync('npx vitest run --config vitest.config.ts --reporter=default --reporter=json --outputFile=specify.json', {
        cwd: to,
        shell: true,
        encoding: 'utf-8',
    });
    const report = join(to, 'specify.json');
    const counted: Result = existsSync(report) ? JSON.parse(readFileSync(report, 'utf-8')) : {};
    if (existsSync(report)) rmSync(report);
    const stood = counted.numPassedTests ?? 0;
    const said = counted.testResults
        ? counted.testResults.flatMap(file => (file.assertionResults ?? [])
            .filter(one => one.status === 'failed')
            .map(one => `${one.title} — ${(one.failureMessages?.[0] ?? 'no message').split('\n')[0]}`))
        : (run.stderr ?? '').split('\n').slice(-20).filter(Boolean);
    return { stood, of: library.books.length, said: stood === library.books.length ? [] : said };
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('specify.ts <corpus>');
        process.exit(1);
    }
    const bound = config(at);
    const walked = walk(bound.from);
    const library = resolve(read({ ...walked, entries: walked.entries.filter(entry => !`${walked.root}/${entry.path}/`.startsWith(bound.to + '/')) }));
    const { stood, of, said } = specify(library, bound.to, bound.package);
    console.log(`SPECIFY ${stood}/${of} books stand`);
    for (const line of said) console.error(`  ${line}`);
    process.exit(stood === of ? 0 : 1);
}
