import { describe, expect, it } from 'vitest';
import { Trait } from '@/writing/Writing';
import { $Word } from '@/writing/Word';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Title, Title } from '@/writing/Title';
import { $Table, Table, TableTrait } from '@/writing/Table';
import { $Sentence } from '@/writing/Sentence';
import { built, drawn, letter, word, sentence, Sentence, Word } from './written';

describe('the genome is projected into the labels', () => {
    it('a paragraph wears its kind', () => {
        expect(built<$Paragraph>(<Paragraph>plain prose.</Paragraph>).labels).toEqual(['pd-paragraph']);
    });

    it('a table wears its whole hierarchy, base first', () => {
        expect(built<$Table>(<Table>{'a row'}</Table>).labels).toEqual(['pd-section', 'pd-table']);
    });

    it('a title wears the paragraph it is a kind of', () => {
        expect(built<$Title>(<Title>The heading</Title>).labels).toEqual(['pd-paragraph', 'pd-title']);
    });

    it('a worn trait joins the labels beside the type', () => {
        const written = built<$Sentence>(<Sentence>{word(letter('h'), letter('i'))}<TableTrait /></Sentence>);
        expect(written.labels).toEqual(['pd-sentence', 'pd-table']);
    });

    it('a pure trait needs no class — the written word is the label', () => {
        const { writing, host } = drawn(<Sentence>{word(letter('h'), letter('i'))}<Trait>Glowing</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(written.labels).toContain('pd-glowing');
        expect(host.querySelector('.pd-glowing')).not.toBeNull();
    });

    it('the type picks the container — a div for a paragraph, a span for a word', () => {
        const paragraph = drawn(<Paragraph>block prose.</Paragraph>);
        expect(paragraph.host.querySelector('div.pd-paragraph')).not.toBeNull();
        const inline = drawn(<Word>hi</Word>);
        expect(inline.host.querySelector('span.pd-word')).not.toBeNull();
        expect(inline.host.querySelector('div.pd-word')).toBeNull();
    });
});
