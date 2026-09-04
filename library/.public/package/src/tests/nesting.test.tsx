import { describe, expect, it } from 'vitest';
import { $Writing, Writing } from '@/writing/Writing';
import { reflection } from '@/utilities/Reflection';
import { $Letter } from '@/writing/Letter';
import { $Word } from '@/writing/Word';
import { $Sentence, TypeOfSentence } from '@/writing/Sentence';
import { $Paragraph } from '@/writing/Paragraph';
import { $Title, Title } from '@/writing/Title';
import { $Section, TypeOfSection } from '@/writing/Section';
import { $List, List } from '@/writing/List';
import { $Table, Table } from '@/writing/Table';
import { $Phrase, Phrase } from '@/writing/Phrase';
import { built, letter, word, sentence, paragraph, section, Sentence, Word, Paragraph, Section } from './written';

describe('nesting means the nested contributes its parts to the parts', () => {
    it('a sentence in a sentence — the outer reads through, the inner keeps its own', () => {
        const outer = built<$Sentence>(
            <Sentence>
                <Sentence>
                    <Word>a</Word> <Word>b</Word> <Word>c</Word> <Word>d</Word> <Word>e</Word>
                </Sentence>
                {' '}
                <Word>f</Word> <Word>g</Word>
            </Sentence>);
        const inner = (outer.block?.$elements ?? []).find((one): one is $Sentence => one instanceof $Sentence)!;
        expect(outer.parts().map(part => part.copy)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
        expect(inner.parts().map(part => part.copy)).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('a paragraph in a paragraph contributes its sentences', () => {
        const outer = built<$Paragraph>(
            <Paragraph>
                <Paragraph>
                    <Sentence><Word>The</Word> <Word>nested</Word> <Word>contributes</Word></Sentence>
                </Paragraph>
                <Sentence><Word>its</Word> <Word>parts</Word></Sentence>
            </Paragraph>);
        const parts = outer.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => part instanceof $Sentence)).toBe(true);
    });

    it('a word in a word contributes its letters', () => {
        const outer = built<$Word>(<Word><Word>in</Word><Word>side</Word></Word>);
        const parts = outer.parts();
        expect(parts.every(part => part instanceof $Letter)).toBe(true);
        expect(parts.map(part => part.copy)).toEqual(['i', 'n', 's', 'i', 'd', 'e']);
    });

    it('a section in a section contributes its parts, its title among them', () => {
        const outer = built<$Section>(
            <Section>
                <Title>Outer</Title>
                <Section>
                    <Title>Inner</Title>
                    <Paragraph>The nested paragraph.</Paragraph>
                </Section>
                <Paragraph>The outer paragraph.</Paragraph>
            </Section>);
        const parts = outer.parts();
        expect(parts).toHaveLength(4);
        expect(parts.filter(part => part instanceof $Title)).toHaveLength(2);
        expect(parts.every(part => reflection.is(part, 'Paragraph'))).toBe(true);
    });

    it('a list in a list contributes its lines', () => {
        const outer = built<$List>(<List>{'one\ntwo\n'}<List>{'three\nfour'}</List></List>);
        const parts = outer.parts();
        expect(parts).toHaveLength(4);
        expect(parts.every(part => part instanceof $Sentence)).toBe(true);
        expect(parts.map(part => part.copy.trim())).toEqual(['one', 'two', 'three', 'four']);
    });

    it('a table in a table contributes its cells', () => {
        const outer = built<$Table>(<Table>{'outer row'}<Table>{'inner row'}</Table></Table>);
        const parts = outer.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => reflection.is(part, 'Paragraph'))).toBe(true);
    });
});

describe('all writing is polymorphic', () => {
    it('bare writing typed as a sentence nests inside one', () => {
        const outer = built<$Sentence>(
            <Sentence>
                <Word>pre</Word>
                {' '}
                <Writing><TypeOfSentence /><Word>in</Word> <Word>ner</Word></Writing>
                {' '}
                <Word>post</Word>
            </Sentence>);
        expect(outer.parts().map(part => part.copy)).toEqual(['pre', 'in', 'ner', 'post']);
    });

    it('a list typed as a section composes paragraphs, its title among them', () => {
        const typed = built<$List>(
            <List>
                <TypeOfSection />
                <Title>A list at section level</Title>
                {'Alpha beta.'}
            </List>);
        const parts = typed.parts();
        expect(parts).toHaveLength(2);
        expect(parts.every(part => reflection.is(part, 'Paragraph'))).toBe(true);
        expect(parts[0]).toBeInstanceOf($Title);
    });
});

describe('a phrase is a sentence that stands inside one', () => {
    it('a phrase in a sentence contributes its words and is not itself a part', () => {
        const outer = built<$Sentence>(
            <Sentence>
                <Word>see</Word>
                {' '}
                <Phrase><Word>gauge</Word> <Word>theory</Word></Phrase>
                {' '}
                <Word>today</Word>
            </Sentence>);
        const parts = outer.parts();
        expect(parts.map(part => part.copy)).toEqual(['see', 'gauge', 'theory', 'today']);
        expect(parts.some(part => part instanceof $Phrase)).toBe(false);
    });

    it('the phrase keeps its own words and stays non-canonical', () => {
        const one = built<$Phrase>(<Phrase><Word>gauge</Word> <Word>theory</Word></Phrase>);
        expect(one.parts().map(part => part.copy)).toEqual(['gauge', 'theory']);
        expect(one.copy).toBe('gauge theory');
        expect(one.canonical).toBe(false);
    });
});
