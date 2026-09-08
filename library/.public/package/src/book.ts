// CREATED 2026-09-08 — Sprint 53 scaffold. THE DOOR `@dna-platform/public/book` (T9: "writing is default index, book exports separately"; T12: book, article, encyclopedia are the second level).
// It stands HERE, beside src/index.ts, and not as src/book/index.ts: Windows folds `index.ts` and the kind `Index.tsx` into one name, and `./Index` resolved to the door (measured 2026-09-08 — the casing fault the team's memory already names).
// OWED (U10): the rollup input `book: 'src/book.ts'`, the package.json exports entry `./book` and its .d.ts; then src/index.ts stops re-exporting book/ once every consumer imports from here — the demos' import lines change in the same act.
export * from './book/Book';
export * from './book/Chapter';
export * from './book/Part';
export * from './book/Cover';
export * from './book/Synopsis';
export * from './book/Abstract';
export * from './book/TableOfContents';
export * from './book/Index';
export * from './book/Footer';
export * from './book/Title';
export * from './book/Author';
export * from './book/Subject';
export * from './book/CatalogueCard';
export * from './book/Bookmark';
export * from './book/Highlight';
export * from './book/PageFold';
