import { describe, it, expect } from 'vitest';
import { Type } from '@/notation/Type';
import { $Document, $TypeOfDocument } from '@/writing/Document';
import { $Section } from '@/writing/Section';
import { $$ } from '@/utilities/Lib';
import { built, chain, declares, document, drawn, letter, shown, word, Document } from './written';

const three = () => built<$Document>(document(chain.Section('a'), chain.Section('b'), chain.Section('c')));

describe('$Document composes $Section', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['a', 'b', 'c']);
        expect(three().parts().every(one => one instanceof $Section)).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfDocument);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('declares the four itself, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single'])
            expect(!declares($Document, member)).toBe(false);
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a Document composes the same', () => {
        const { writing } = drawn(chain.Section('h'), chain.Section('i'), <Type>Document</Type>);
        expect($$(writing)($Document)).toBe(true);
        expect($$(writing, $Document).parts().map(one => one.copy)).toEqual(['h', 'i']);
    });
});

describe('a document is written as sections, or as a title and paragraphs', () => {
    it('accepts a document of sections', () => {
        expect(() => three().specify()).not.toThrow();
    });

    it('accepts a title and paragraphs, and wraps them in ONE section', () => {
        const one = built<$Document>(<Document>{[chain.Paragraph('a'), chain.Paragraph('b')]}</Document>);
        expect(() => one.specify()).not.toThrow();
        expect(one.parts().length).toBe(1);
        expect(one.parts()[0].parts().length).toBe(2);
    });

    // QUARANTINED 2026-08-30 — this test HANGS the reaction system rather than
    // failing. Rendering an INVALID writing whose block holds CHEMICAL children
    // loops synchronously until the worker is killed; the same test with STRING
    // children (see sentence/paragraph/word/letter) draws its message and passes.
    // It is skipped, not deleted: it asserts real behaviour and returns when the
    // defect is fixed. See Solutions — the hang that ate the machine.
    it('and refuses a word, which is neither', () => {
        expect(() => built<$Document>(<Document>{[word(letter('h'))]}</Document>).specify()).toThrow(/is written as sections/);
    });
});
