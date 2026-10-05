import { searchForWorkspaceRoot, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { configure } from './configuration/configuration';
import { template } from './rendering/page';
import { imageTypes } from './inventory/filenames';
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
        // FAST REFRESH IS KEPT OFF THE MODULES WE GENERATE. The plugin self-accepts every file it
        // touches and calls `import.meta.hot.invalidate()` from inside its callback when it cannot
        // keep the module — a book module exports a value, so it never can — which undid the
        // book's own accept. These modules hold no state and are not components; nothing is lost.
        react({ exclude: [/[\\/]application[\\/](books[\\/].*|books|routes|stylesheets|opened)\.?[jt]sx?$/u], babel: { parserOpts: { plugins: ['decorators-legacy'] } } }),
        { name: 'binding:template', transformIndexHtml: html => template(html, chosen) },
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
        // A PICTURE BESIDE A CHAPTER, ANSWERED LIVE AT THE ADDRESS THE BIND COPIES IT TO. A literal
        // naming a picture is written as `/<folder>/<file>`, and only the batch's render puts a file
        // there; the dev server answered that address with the page, so an Image was empty until a
        // bind — measured 2026-10-05 on Doug's design book, fifty photographs. Doug: "Yes, apply and
        // test it." The library is asked at each request, so a picture added while the server is open
        // is answered for.
        {
            name: 'binding:pictures',
            configureServer: server => {
                server.middlewares.use((request, response, next) => {
                    const asked = decodeURIComponent((request.url ?? '').split('?')[0]);
                    for (const book of held.library().books)
                        for (const one of [...book.resources.values()].flat())
                            if (imageTypes.includes(one.type) && asked === `/${book.folder}/${one.file}`) {
                                response.setHeader('Content-Type', one.type === '.png' ? 'image/png' : 'image/jpeg');
                                return void createReadStream(join(book.path, one.file)).pipe(response);
                            }
                    next();
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
