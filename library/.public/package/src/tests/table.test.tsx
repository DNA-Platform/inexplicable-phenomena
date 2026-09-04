import { describe, expect, it } from 'vitest';
import { $Writing, Trait, Type } from '@/writing/Writing';
import { $Table, Table, $TypeOfTable } from '@/writing/Table';
import { $Paragraph, $TypeOfParagraph, TypeOfParagraph, Paragraph } from '@/writing/Paragraph';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { $Chapter, Chapter } from '@/book/Chapter';
import { reflection } from '@/utilities/Reflection';
import { built, drawn, letter, word, sentence, paragraph, section, title, Writing } from './written';

describe('a table is an arrangement, and its type gives it a level', () => {
    it('a table of cells composes each cell one down — a paragraph by default', () => {
        const table = built<$Table>(<Table><Paragraph>first cell</Paragraph><Paragraph>second cell</Paragraph></Table>);
        const parts = table.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Paragraph)).toBe(true);
        expect(parts.map(part => part.copy)).toEqual(['first cell', 'second cell']);
    });

    it('a written type overrides the default — a paragraph table composes sentences', () => {
        const table = built<$Table>(<Table><TypeOfParagraph />{'one two\nthree four'}</Table>);
        const parts = table.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Sentence)).toBe(true);
    });

    it('the class keeps its standing through a retyping', () => {
        const table = built<$Table>(<Table><TypeOfParagraph />{'one two'}</Table>);
        expect(reflection.is(table, 'Table')).toBe(true);
        expect(table.type).toBeInstanceOf($TypeOfParagraph);
    });

    it('a sentence wearing the table trait stands as a table, its words the cells', () => {
        const { writing } = drawn(<Sentence>{word(letter('h'), letter('i'))} {word(letter('y'), letter('o'))}<Trait>Table</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(reflection.is(written, 'Table')).toBe(true);
        expect(written.parts().map(part => part.copy)).toEqual(['hi', 'yo']);
    });

    it('the type resolves by name once painted', () => {
        const { writing } = drawn(<Writing>{paragraph(sentence(word(letter('a'))))}<Type>Table</Type></Writing>);
        const inner = (writing.block?.$elements ?? []).find((one): one is $Writing => one instanceof $Writing && !one.annotation);
        expect(writing.type ?? inner?.type).toBeInstanceOf($TypeOfTable);
    });
});

describe('the columns divide the cells', () => {
    it('an even table specifies clean', () => {
        const table = built<$Table>(
            <Table columns={2}><Paragraph>a</Paragraph><Paragraph>b</Paragraph><Paragraph>c</Paragraph><Paragraph>d</Paragraph></Table>);
        expect(() => table.specify()).not.toThrow();
    });

    it('a ragged table is refused in its own words', () => {
        const table = built<$Table>(
            <Table columns={2}><Paragraph>a</Paragraph><Paragraph>b</Paragraph><Paragraph>c</Paragraph></Table>);
        expect(() => table.specify()).toThrow(/columns divide its cells/);
    });

    it('the view lays the cells by the columns', () => {
        const { host } = drawn(
            <Table columns={2}><Paragraph>a</Paragraph><Paragraph>b</Paragraph><Paragraph>c</Paragraph><Paragraph>d</Paragraph></Table>);
        expect(host.querySelectorAll('tr')).toHaveLength(2);
        expect(host.querySelectorAll('td')).toHaveLength(4);
    });
});

describe('an arrangement is addressed at the level it stands at', () => {
    it('a table addresses as the section it is, and the address follows back', () => {
        const outer = built<$Chapter>(
            <Chapter>
                {section(title(sentence(word(letter('t')))), paragraph(sentence(word(letter('a')))))}
                <Table><Paragraph>first cell</Paragraph></Table>
            </Chapter>);
        const table = outer.parts().find(one => one instanceof $Table)!;
        const address = outer.catalogue().address(table);
        expect(address.startsWith('Sn:')).toBe(true);
        expect(outer.catalogue().follow(address)).toBe(table);
    });
});
