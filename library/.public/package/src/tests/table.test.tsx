import { describe, expect, it } from 'vitest';
import { $Writing, Trait, Type } from '@/writing/Writing';
import { $Table, Table, TableTrait, $TableTrait, $TypeOfTable } from '@/writing/Table';
import { Cell } from '@/writing/Cell';
import { $Paragraph, $TypeOfParagraph, TypeOfParagraph } from '@/writing/Paragraph';
import { $Sentence } from '@/writing/Sentence';
import { $Word } from '@/writing/Word';
import { $$ } from '@/utilities/Lib';
import { built, drawn, letter, word, Sentence, Writing } from './written';

describe('a table is an arrangement, and its type gives it a level', () => {
    it('a table of cells composes each cell one down — a paragraph by default', () => {
        const table = built<$Table>(<Table><Cell>first cell</Cell><Cell>second cell</Cell></Table>);
        const parts = table.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Paragraph)).toBe(true);
        expect(parts.map(part => part.copy)).toEqual(['first cell', 'second cell']);
    });

    it('a table of prose still composes its rows as paragraphs', () => {
        const table = built<$Table>(<Table>{'first row\n\nsecond row'}</Table>);
        const parts = table.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Paragraph)).toBe(true);
    });

    it('a written type overrides the default — a paragraph table composes sentences', () => {
        const table = built<$Table>(<Table><TypeOfParagraph />{'one two\nthree four'}</Table>);
        const parts = table.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Sentence)).toBe(true);
    });

    it('the class keeps its standing through a retyping', () => {
        const table = built<$Table>(<Table><TypeOfParagraph />{'one two'}</Table>);
        expect($$(table)($Table)).toBe(true);
        expect(table.type).toBeInstanceOf($TypeOfParagraph);
    });

    it('a sentence wearing the table trait reads as a word table', () => {
        const written = built<$Sentence>(
            <Sentence>{word(letter('h'), letter('i'))} {word(letter('y'), letter('o'))}<TableTrait /></Sentence>);
        expect($$(written)($Table)).toBe(true);
        const table = $$(written, $Table);
        const parts = table.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Word)).toBe(true);
        expect(parts.map(part => part.copy)).toEqual(['hi', 'yo']);
        expect(written.parts().map(part => part.copy)).toEqual(['hi', 'yo']);
    });

    it('the trait resolves by name once painted', () => {
        const { writing } = drawn(<Sentence>{word(letter('h'), letter('i'))}<Trait>Table</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(written.traits.some(one => one instanceof $TableTrait)).toBe(true);
        expect($$(written)($Table)).toBe(true);
    });

    it('the type and the trait share the name without crossing', () => {
        const { writing } = drawn(<Writing>{'first row\n\nsecond row'}<Type>Table</Type></Writing>);
        const inner = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.annotation)!;
        expect(inner.type).toBeInstanceOf($TypeOfTable);
        expect(inner.type).not.toBeInstanceOf($TableTrait);
    });
});
