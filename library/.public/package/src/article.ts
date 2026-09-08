// The door @dna-platform/public/article — the LaTeX article as a book type.
// Section and Abstract say the same words the base does and mean a paper's: a consumer importing
// from THIS door gets the numbered section and the paper's abstract, which is the whole point of
// naming them the same (Doug: "Complex names suggest that you might need DI").
// Margin was here and is GONE: it was written as "the part holding header, sidebar, footer", and
// every one of those is the APPLICATION's. A marginal note would come back under that name alone.
export * from './article/Article';
export * from './article/Abstract';
export * from './article/Section';
export * from './article/Theorem';
export * from './article/Footnote';
export * from './article/Appendix';
export * from './article/Theme';
