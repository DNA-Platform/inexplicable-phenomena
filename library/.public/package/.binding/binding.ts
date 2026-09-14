import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, type Rollup } from 'vite';
import { configuration } from './vite.config';
import { configure } from './configuration/configuration';
import { walk } from './inventory/walk';
import { resolution } from './resolution/addresses';
import { assemble } from './assembly/book';
import { routes } from './assembly/routes';
import { stylesheets } from './assembly/stylesheets';
import { rendering } from './rendering/rendering';
import { manifest } from './manifest/manifest';
import { removal } from './manifest/removal';

const emitted = (built: Awaited<ReturnType<typeof build>>): string[] => {
    const outputs = Array.isArray(built) ? built : 'output' in built ? [built] : [];
    return outputs.flatMap(one => (one as Rollup.RollupOutput).output.map(file => file.fileName)).filter(name => name !== 'index.html').sort();
};

const binding = dirname(fileURLToPath(import.meta.url));
const library = resolve(binding, '..');

const chosen = configure(binding);
const found = walk(library, chosen);
if (found.books.length === 0) throw new Error(`${library} holds no book — a folder carrying a .book.tsx`);

const previous = manifest.read(binding);
const assembled = found.books.map(book => assemble(library, book));
const table = resolution(found, chosen);
const written = [routes(binding, table), stylesheets(binding, chosen)];
const built = await build({ ...configuration({ isPreview: false }), configFile: false, logLevel: 'warn' });
const bundled = emitted(built);
const rendered = rendering(binding);
const current = manifest.write(binding, { assembled, written, rendered, bundled });
removal(library, previous, current);

console.log(`bound ${found.books.length} book${found.books.length === 1 ? '' : 's'} · ${rendered.length} page${rendered.length === 1 ? '' : 's'} · ${library}`);
