import { searchForWorkspaceRoot, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from './configuration/configuration';
import { template } from './rendering/page';
import { resources } from './assembly/resources';
import { retaking, retakes } from './inventory/retaken';
import { holding } from './catalogue/holds';
import { references } from './reference/transform';
import { serving } from './assembly/serving';

const binding = dirname(fileURLToPath(import.meta.url));
const chosen = configure(binding);

// THE LIBRARY AND ITS CATALOGUE, ASKED FOR RATHER THAN CAPTURED. It costs a directory walk and a
// parse of every book's covers — measured on Doug's library at well under a tenth of a second, with
// no book loaded — so a plugin that needs an address has one rather than a lookup that has to wait.
//
// AND IT IS RETAKEN WHEN THE SHELF MOVES. These two were built HERE, at config load, and handed to
// every plugin as objects; a dev server left open then answered all afternoon for the library as it
// had been at boot. One inventory, invalidated by the watcher, is what every plugin below asks.
const held = retaking(binding, chosen);
const dependencies = (JSON.parse(readFileSync(join(binding, 'package.json'), 'utf8')) as { dependencies?: Record<string, string> }).dependencies ?? {};
const installed = Object.keys(dependencies);
const packagesPointedAtByPath = Object.entries(dependencies).filter(([, where]) => where.startsWith('file:')).map(([name]) => name);

export const configuration = (env: Pick<ConfigEnv, 'isPreview'>): UserConfig => ({
    root: binding,
    base: chosen.resolution.base,
    publicDir: existsSync(resolve(binding, 'public')) ? resolve(binding, 'public') : false,
    appType: env.isPreview ? 'mpa' : 'spa',
    plugins: [
        // FAST REFRESH IS KEPT OFF THE MODULES WE GENERATE, and that is what lets a book take its
        // own hot update.
        //
        // THE PLUGIN SELF-ACCEPTS EVERY FILE IT TOUCHES and then, inside its own callback, decides
        // whether it can keep the module — calling `import.meta.hot.invalidate()` when it cannot.
        // A book module exports `book`, which is a VALUE, so it always cannot: measured 2026-09-19,
        // `invalidate /application/books/reference.tsx: Could not Fast Refresh ("book" export is
        // incompatible)`, which propagated to the entry and reloaded the page. Our own accept was
        // registered and ran; the invalidate beside it undid the whole point of it.
        //
        // NOTHING IS LOST BY EXCLUDING THEM. Fast Refresh exists to keep a React component's state
        // across an edit, and these modules hold no state and are not components — they are a list
        // of imports and a table. What they DO hold is the seam where a book puts itself back on
        // the page, and that seam only works if nobody else is invalidating the module underneath.
        react({ exclude: [/[\\/]application[\\/](books[\\/].*|books|routes|stylesheets|opened)\.?[jt]sx?$/u], babel: { parserOpts: { plugins: ['decorators-legacy'] } } }),
        { name: 'binding:template', transformIndexHtml: html => template(html, chosen) },
        resources(),
        // THE INVENTORY KEPT TRUE, FIRST, so everything after it is asking about the library as it
        // stands rather than as it stood when the server booted.
        retakes(binding, held),
        // THE LIBRARY HELD TO ITS OWN SPECIFICATION, AS A COMPILE ERROR. Every book has its three
        // dot chapters, exactly one book is its own subject and one its own author, every book
        // reaches both, every table names what it holds, and every reference resolves. A library
        // that fails any of it does not compile — here or in the batch.
        holding(held),
        // THE NOTATION RESOLVED BEFORE ANYTHING COMPILES IT. What comes out is the ordinary
        // [copy](url) the runtime has always read, so nothing downstream knows a sigil existed.
        references(held),
        // THE GENERATED MODULES, SERVED RATHER THAN READ FROM DISK. Nothing a previous bind wrote
        // is consulted, so a library with nothing generated still runs and a library whose source
        // has moved on cannot be answered for by yesterday.
        serving(binding, chosen, held),
        // A BOOK'S ADDRESS IS ITS PAGE. GitHub Pages answers /turing with a redirect to /turing/, where
        // the page stands; the preview does the same, so a link that works there works here.
        {
            name: 'binding:addresses',
            configurePreviewServer: server => {
                server.middlewares.use((request, response, next) => {
                    const path = (request.url ?? '').split('?')[0];
                    if (path.endsWith('/') || path.includes('.') || !existsSync(resolve(binding, '..', path.slice(1), 'index.html'))) return next();
                    response.statusCode = 301;
                    response.setHeader('Location', `${path}/`);
                    response.end();
                });
            },
        },
    ],
    build: {
        outDir: resolve(binding, '..'),
        emptyOutDir: false,
        // THE BUNDLE IS ONE CHUNK AND THAT IS THE RIGHT SHAPE FOR A BOOK. Measured 2026-09-15: the
        // entry is 911.5 kB by vite's own metric, 282 kB over the wire, and katex is roughly 269 kB
        // of it. A split IS available — manualChunks on katex and react-dom would do it — and for a
        // page a reader navigates within it would be worth taking. These pages are PRERENDERED and
        // a reader moves between them by loading another page, so a second request buys nothing and
        // the warning is measuring an application it is not looking at. The limit is set above what
        // we ship rather than at it, so it stays quiet until something genuinely grows.
        chunkSizeWarningLimit: 1000,
    },
    server: {
        fs: { allow: [searchForWorkspaceRoot(binding), resolve(binding, '..', '..')] },
    },
    // ONE COPY OF EACH, THE BINDING'S. A book outside .binding resolves a package by walking up its own
    // folders, which in a repository holding the workspace reaches a checkout before the binding's
    // node_modules; dedupe pins these to the binding, so a library runs off what it installed.
    //
    // AND IT IS EVERYTHING THE BINDING INSTALLED, NOT A LIST WRITTEN OUT BY HAND. A book is a source
    // file OUTSIDE node_modules, so it resolves nothing at all unless the binding says where — and a
    // hand-written list only ever names what the master anticipated. Measured 2026-09-15: a book
    // reaching for `chroma-js` to mix a palette failed the bundle with "Rollup failed to resolve
    // import", because the binding had installed it and this list had never heard of it. What a
    // library installs is exactly what its books may reach for, and package.json already says so.
    resolve: {
        dedupe: installed,
        // A CHAPTER IS THE MODULE; A RESOURCE IS NOT. A book folder may hold a chapter and its own
        // code under one name — `4-the-movements.tsx` documenting `4-the-movements.ts` — and the
        // assembly imports a chapter WITHOUT an extension. Vite resolves .ts before .tsx by default,
        // so the code was loaded in the chapter's place and RAN: measured 2026-09-16, the build died
        // on "Unexpected token o, nothing wri... is not valid JSON", which was an importer printing
        // its usage where the binder expected a book. In a library the .tsx wins.
        extensions: ['.tsx', '.jsx', '.mjs', '.js', '.mts', '.ts', '.json'],
    },
    // AND DEDUPE ONLY REACHES WHAT VITE RESOLVES, WHICH ON THE SERVER IS NOT OUR OWN PACKAGES. Vite
    // externalises a dependency for SSR, so Node loads `chemistry.js` out of its own folder and walks
    // UP from there for react — reaching the checkout above rather than the binding, exactly as the
    // dedupe above is written to prevent. Two copies of react means a null hook dispatcher, and
    // measured 2026-09-16 that is the whole of the defect: every page bound under .me was an 854-byte
    // shell carrying React's errored-boundary marker while the build reported success.
    //
    // SO THE PACKAGES THIS LIBRARY POINTS AT BY PATH ARE BUNDLED RATHER THAN EXTERNALISED, and they
    // are read off package.json like the dedupe list, because a `file:` dependency is by definition
    // one whose folder is not under the binding and whose resolution therefore escapes it.
    ssr: { noExternal: packagesPointedAtByPath },
    esbuild: {
        keepNames: true,
        tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } },
    },
});

export default configuration;
