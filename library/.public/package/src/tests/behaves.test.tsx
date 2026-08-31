import { describe, it, expect } from 'vitest';
import { Type } from '@/writing/Writing';
import { $Word } from '@/writing/Word';
import { $Document } from '@/writing/Document';
import { $File, $TypeOfFile } from '@/writing/File';
import { $$ } from '@/utilities/Lib';
import { built, chain, drawn, document, file, letter } from './written';

describe('a piece of writing that carries a type BEHAVES as that type', () => {
    it('carries the type it was written with, resolved from the name', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Document</Type>);
        expect(writing.type instanceof $Document).toBe(false);
        expect(writing.type).toBeDefined();
    });

    it('IS a file, in the sense of the reading, and is not a word', () => {
        const { writing } = drawn(chain.Document('a'), <Type>File</Type>);
        expect(writing.type).toBeInstanceOf($TypeOfFile);
        expect($$(writing)($File)).toBe(true);
        expect($$(writing)($Word)).toBe(false);
    });

    it('and read as one, it composes the documents written inside it', () => {
        const { writing } = drawn(chain.Document('a'), chain.Document('b'), <Type>File</Type>);
        const asFile = $$(writing, $File);
        expect(asFile).toBeInstanceOf($File);
        expect(asFile.parts().length).toBe(2);
    });

    it('a written File and a writing that behaves as one answer alike', () => {
        const direct = built<$File>(file(chain.Document('a'), chain.Document('b')));
        const behaving = $$(drawn(chain.Document('a'), chain.Document('b'), <Type>File</Type>).writing, $File);
        expect(behaving.parts().length).toBe(direct.parts().length);
        expect(behaving.copy).toBe(direct.copy);
    });

    it('the same shape at word grade, with letters', () => {
        const behaving = $$(drawn(letter('h'), letter('i'), <Type>Word</Type>).writing, $Word);
        expect(behaving.parts().map(one => one.copy)).toEqual(['h', 'i']);
    });

    it('and it reaches down a real ladder', () => {
        const { writing } = drawn(chain.Section('a'), <Type>Document</Type>);
        const asDocument = $$(writing, $Document);
        expect(asDocument.parts().length).toBe(1);
        expect(asDocument.parts()[0].parts().length).toBe(1);
    });

    it('a written level and one told what it is BOTH carry the same type', () => {
        const direct = built<$File>(file(chain.Document('a')));
        const { writing } = drawn(chain.Document('a'), <Type>File</Type>);
        expect(direct.type).toBeInstanceOf($TypeOfFile);
        expect(writing.type).toBeInstanceOf($TypeOfFile);
    });
});
