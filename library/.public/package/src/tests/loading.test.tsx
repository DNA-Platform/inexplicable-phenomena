import { describe, it, expect } from 'vitest';

// A MODULE THAT ONLY LOADS SECOND IS A MODULE WITH A CYCLE. Each promise imports one
// module into a fresh graph, so a class that would extend a half-built base says so here
// rather than in a consumer's application.
describe('every module stands on its own, whatever loads first', () => {
    it('writing/Writing', async () => {
        await expect(import('@/writing/Writing')).resolves.toBeDefined();
    });

    it('writing/Composition', async () => {
        await expect(import('@/writing/Composition')).resolves.toBeDefined();
    });

    it('writing/Letter', async () => {
        await expect(import('@/writing/Letter')).resolves.toBeDefined();
    });

    it('writing/Word', async () => {
        await expect(import('@/writing/Word')).resolves.toBeDefined();
    });

    it('writing/Sentence', async () => {
        await expect(import('@/writing/Sentence')).resolves.toBeDefined();
    });

    it('writing/Paragraph', async () => {
        await expect(import('@/writing/Paragraph')).resolves.toBeDefined();
    });

    it('writing/Section', async () => {
        await expect(import('@/writing/Section')).resolves.toBeDefined();
    });

    it('writing/Heading', async () => {
        await expect(import('@/writing/Heading')).resolves.toBeDefined();
    });

    it('writing/Phrase', async () => {
        await expect(import('@/writing/Phrase')).resolves.toBeDefined();
    });

    it('writing/List', async () => {
        await expect(import('@/writing/List')).resolves.toBeDefined();
    });

    it('writing/Table', async () => {
        await expect(import('@/writing/Table')).resolves.toBeDefined();
    });

    it('writing/Theme', async () => {
        await expect(import('@/writing/Theme')).resolves.toBeDefined();
    });

    it('writing/Format', async () => {
        await expect(import('@/writing/Format')).resolves.toBeDefined();
    });

    it('writing/Anchor', async () => {
        await expect(import('@/encyclopedia/AnchorFormat')).resolves.toBeDefined();
    });

    it('book/Book', async () => {
        await expect(import('@/book/Book')).resolves.toBeDefined();
    });

    it('book/Chapter', async () => {
        await expect(import('@/book/Chapter')).resolves.toBeDefined();
    });

    it('book/Cover', async () => {
        await expect(import('@/book/Cover')).resolves.toBeDefined();
    });

    it('book/Synopsis', async () => {
        await expect(import('@/book/Synopsis')).resolves.toBeDefined();
    });

    it('book/Index', async () => {
        await expect(import('@/book/Index')).resolves.toBeDefined();
    });

    it('book/TableOfContents', async () => {
        await expect(import('@/book/TableOfContents')).resolves.toBeDefined();
    });

    it('book/Title', async () => {
        await expect(import('@/book/Title')).resolves.toBeDefined();
    });

    it('book/Author', async () => {
        await expect(import('@/book/Author')).resolves.toBeDefined();
    });

    it('book/Subject', async () => {
        await expect(import('@/book/Subject')).resolves.toBeDefined();
    });

    it('book/CatalogueCard', async () => {
        await expect(import('@/book/CatalogueCard')).resolves.toBeDefined();
    });

    it('book/Bookmark', async () => {
        await expect(import('@/book/Bookmark')).resolves.toBeDefined();
    });

    it('book/Highlight', async () => {
        await expect(import('@/book/Highlight')).resolves.toBeDefined();
    });

    it('book/PageFold', async () => {
        await expect(import('@/book/PageFold')).resolves.toBeDefined();
    });

    it('reference/Reference', async () => {
        await expect(import('@/reference/Reference')).resolves.toBeDefined();
    });

    it('reference/Path', async () => {
        await expect(import('@/reference/Path')).resolves.toBeDefined();
    });

    it('reference/IndexCard', async () => {
        await expect(import('@/reference/IndexCard')).resolves.toBeDefined();
    });

    it('reference/ReferenceCard', async () => {
        await expect(import('@/reference/ReferenceCard')).resolves.toBeDefined();
    });

    it('reference/Catalogue', async () => {
        await expect(import('@/reference/Catalogue')).resolves.toBeDefined();
    });

    it('reference/Ref', async () => {
        await expect(import('@/reference/Ref')).resolves.toBeDefined();
    });

    it('utilities/Reflection', async () => {
        await expect(import('@/utilities/Reflection')).resolves.toBeDefined();
    });

    it('utilities/Parser', async () => {
        await expect(import('@/utilities/Parser')).resolves.toBeDefined();
    });

    it('utilities/Specification', async () => {
        await expect(import('@/utilities/Specification')).resolves.toBeDefined();
    });

    it('utilities/Html', async () => {
        await expect(import('@/utilities/Html')).resolves.toBeDefined();
    });
});
