import { describe, expect, it } from 'vitest';
import { Trait } from '@/writing/Writing';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Title, Title } from '@/writing/Title';
import { $Table, Table } from '@/writing/Table';
import { $Sentence, Sentence } from '@/writing/Sentence';
import { reflection } from '@/utilities/Reflection';
import { built, drawn, letter, paragraph, section, title, word, Word } from './written';

describe('the type chain is projected into the labels', () => {
    it('a paragraph wears its kind', () => {
        expect(reflection.classNames(built<$Paragraph>(<Paragraph>plain prose.</Paragraph>))).toEqual(['pd-paragraph']);
    });

    it('a table wears its whole chain, base first', () => {
        expect(reflection.classNames(built<$Table>(<Table>{'a row'}</Table>))).toEqual(['pd-section', 'pd-table']);
    });

    it('a title wears the paragraph it is a kind of', () => {
        expect(reflection.classNames(built<$Title>(<Title>The heading</Title>))).toEqual(['pd-paragraph', 'pd-title']);
    });

    it('a pure trait needs no class — the written word is the label', () => {
        const { writing, host } = drawn(<Sentence>{word(letter('h'), letter('i'))}<Trait>Glowing</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(reflection.classNames(written)).toContain('pd-glowing');
        expect(host.querySelector('.pd-glowing')).not.toBeNull();
    });

    it('a worn Table trait joins the labels beside the type the same way', () => {
        const { writing } = drawn(<Sentence>{word(letter('h'), letter('i'))}<Trait>Table</Trait></Sentence>);
        const written = (writing.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(reflection.classNames(written)).toEqual(['pd-sentence', 'pd-table']);
    });

    it('the frame stamps the labels where the writing draws', () => {
        const prose = drawn(<Paragraph>block prose.</Paragraph>);
        expect(prose.host.querySelector('.pd-paragraph')).not.toBeNull();
        const inline = drawn(<Word>hi</Word>);
        expect(inline.host.querySelector('div.pd-word')).not.toBeNull();
    });

    it('rendering goes down to the authored paragraph, and infers none', () => {
        const authored = drawn(section(title('T'), paragraph('written here.')));
        expect(authored.host.querySelectorAll('.pd-paragraph').length).toBe(1);
        const loose = drawn(section(title('T'), 'loose prose line.'));
        expect(loose.host.textContent).toContain('loose prose line.');
        expect(loose.host.querySelectorAll('.pd-paragraph').length).toBe(0);
    });
});
