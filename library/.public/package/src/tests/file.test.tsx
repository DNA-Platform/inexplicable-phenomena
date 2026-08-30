import { describe, it, expect } from 'vitest';
import { Type } from '@/notation/Type';
import { $File, $TypeOfFile } from '@/writing/File';
import { $Document } from '@/writing/Document';
import { $$ } from '@/utilities/Lib';
import { built, chain, declares, drawn, file, shown, File } from './written';

const three = () => built<$File>(file(chain.Document('a'), chain.Document('b'), chain.Document('c')));

describe('$File composes $Document', () => {
    it('composes the level below, in the order written', () => {
        expect(three().parts().map(one => one.copy)).toEqual(['a', 'b', 'c']);
        expect(three().parts().every(one => one instanceof $Document)).toBe(true);
    });

    it('answers part zero', () => {
        expect(three().parts()[0].copy).toBe('a');
    });

    it('carries its own type, written into it by its own bond', () => {
        expect(three().type).toBeInstanceOf($TypeOfFile);
    });

    it('arrives inside a block, and holds one', () => {
        const one = three();
        expect(one.inline).toBe(true);
        expect(one.block).toBeDefined();
    });

    it('declares the four itself, and answers all of them', () => {
        for (const member of ['where', 'select', 'selectMany', 'single'])
            expect(!declares($File, member)).toBe(false);
        const one = three();
        expect(one.where(part => part.copy !== 'b').map(part => part.copy)).toEqual(['a', 'c']);
        expect(one.select(part => part.copy)).toEqual(['a', 'b', 'c']);
        expect(one.selectMany(part => [part.copy, part.copy]).length).toBe(6);
        expect(one.single(part => part.copy === 'b').copy).toBe('b');
        expect(() => one.single(part => part.copy !== 'b')).toThrow();
    });

    it('and a piece of writing TOLD it is a File composes the same', () => {
        const { writing } = drawn(chain.Document('h'), chain.Document('i'), <Type>File</Type>);
        expect($$(writing)($File)).toBe(true);
        expect($$(writing, $File).parts().map(one => one.copy)).toEqual(['h', 'i']);
    });
});

describe('a file is written as documents', () => {
    // QUARANTINED 2026-08-30 — this test HANGS the reaction system rather than
    // failing. Rendering an INVALID writing whose block holds CHEMICAL children
    // loops synchronously until the worker is killed; the same test with STRING
    // children (see sentence/paragraph/word/letter) draws its message and passes.
    // It is skipped, not deleted: it asserts real behaviour and returns when the
    // defect is fixed. See Solutions — the hang that ate the machine.
    it('refuses a section written where a document belongs, and says why', () => {
        expect(() => built<$File>(<File>{[chain.Section('a')]}</File>).specify()).toThrow(/a file is written as documents/);
    });

    it('and accepts a file of documents', () => {
        expect(() => three().specify()).not.toThrow();
    });
});
