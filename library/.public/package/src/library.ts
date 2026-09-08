// CREATED 2026-09-08 — Sprint 53 scaffold. THE DOOR `@dna-platform/public/book` (T9: "writing is default index, book exports separately"; T12: book, article, encyclopedia are the second level).
// It stands HERE, beside src/index.ts, and not as src/library/index.ts: Windows folds `index.ts` and the kind `Index.tsx` into one name, and `./Index` resolved to the door (measured 2026-09-08 — the casing fault the team's memory already names).
// OWED (U10): the rollup input `book: 'src/book.ts'`, the package.json exports entry `./book` and its .d.ts; then src/index.ts stops re-exporting book/ once every consumer imports from here — the demos' import lines change in the same act.
export * from './library/Book';
export * from './library/Chapter';
export * from './library/Part';
export * from './library/Cover';
export * from './library/Synopsis';
export * from './library/Abstract';
export * from './library/TableOfContents';
export * from './library/Index';
export * from './library/Footer';
export * from './library/Title';
export * from './library/Author';
export * from './library/Subject';
export * from './library/CatalogueCard';
export * from './library/Bookmark';
export * from './library/Highlight';
export * from './library/PageFold';
