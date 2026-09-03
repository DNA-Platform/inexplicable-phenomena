import { describe, expect, it } from 'vitest';
import { Trait } from '@/writing/Writing';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Title, Title } from '@/writing/Title';
import { $Table, Table } from '@/writing/Table';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { reflection } from '@/utilities/Reflection';
import { built, drawn, letter, word, Word } from './written';

describe('the type chain is projected into the labels', () => {
    it('a paragraph wears its kind', () => {
        expect(reflection.labels(built<$Paragraph>(<Paragraph>plain prose.</Paragraph>))).toEqual(['pd-paragraph']);
    });

    it('a table wears its whole chain, base first', () => {
        expect(reflection.labels(built<$Table>(<Table>{'a row'}</Table>))).toEqual(['pd-section', 'pd-table']);
    });

    it('a title wears the paragraph it is a kind of', () => {
        expect(reflection.labels(built<$Title>(<Title>The heading</Title>))).toEqual(['pd-paragraph', 'pd-title']);
    });

    it('a pure trait needs no class — the written word is the label', () => {
        const { writing, host } = drawn(<Sentence>{word(letter('h'), letter('i'))}<Trait>Glowing</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(reflection.labels(written)).toContain('pd-glowing');
        expect(host.querySelector('.pd-glowing')).not.toBeNull();
    });

    it('a worn Table trait joins the labels beside the type the same way', () => {
        const { writing } = drawn(<Sentence>{word(letter('h'), letter('i'))}<Trait>Table</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(reflection.labels(written)).toEqual(['pd-sentence', 'pd-table']);
    });

    it('the frame stamps the labels where the writing draws', () => {
        const prose = drawn(<Paragraph>block prose.</Paragraph>);
        expect(prose.host.querySelector('.pd-paragraph')).not.toBeNull();
        const inline = drawn(<Word>hi</Word>);
        expect(inline.host.querySelector('span.pd-word')).not.toBeNull();
        expect(inline.host.querySelector('div.pd-word')).toBeNull();
    });
});
