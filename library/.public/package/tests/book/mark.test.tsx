import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { $Chapter, Chapter } from '@/book/Chapter';
import { Cover } from '@/book/Cover';
import { Synopsis } from '@/book/Synopsis';
import { $Mark, Mark } from '@/book/Mark';
import { $Footer, Footer } from '@/book/Footer';
import { Footnote } from '@/book/Footnote';
import { $Bibliography, Bibliography } from '@/book/Bibliography';
import { $Citation, Citation } from '@/book/Citation';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

const specimen = (): $Chapter => $(
    <Chapter>
        <Section>
            <Title>The Crease</Title>
            {'\n\nFold a sheet'}
            <Mark label="seam" />
            {' and the crease remembers. The fold is felt'}
            <Mark label="found" />
            {' before it is found.'}
        </Section>
        <Footer>
            <Title>Notes</Title>
            <Footnote label="seam">Editors call this a seam.</Footnote>
            <Footnote label="found">The crease is felt before it is found.</Footnote>
        </Footer>
        <Section parenthetical>
            <Title>Summary</Title>
            {'\n\nThe footer files the notes; the summary stays the summary.'}
        </Section>
    </Chapter>
);

const shelfless = (): $Book => $(
    <Book>
        <Cover>
            <Section>
                <Title>The Specimen</Title>
                {'\n\nA book for the marks.'}
            </Section>
        </Cover>
        <Synopsis>
            <Section parenthetical>
                <Title>Summary</Title>
                {'\n\nMarks, notes, and entries.'}
            </Section>
        </Synopsis>
        <Chapter>
            <Section>
                <Title>The Identity</Title>
                {'\n\nBinding every notation is the most beautiful identity.'}
            </Section>
            <Bibliography>
                <Title>References</Title>
                <Citation label="euler" for="#3.1">Euler, the identity, 1748.</Citation>
                <Citation label="srt" for="ixp#3.2">The SRT source, in another document.</Citation>
            </Bibliography>
            <Section parenthetical>
                <Title>Summary</Title>
                {'\n\nThe chapter cites.'}
            </Section>
        </Chapter>
    </Book>
);

describe('The reference marks — footnotes and citations on one abstraction', () => {
    it('a footer files keyed notes and the bond numbers them', () => {
        const footer = specimen().sections.find(s => s instanceof $Footer) as $Footer;
        expect(footer.entries.length).toBe(2);
        expect(footer.entry('seam')?.index).toBe(1);
        expect(footer.entry('found')?.index).toBe(2);
    });

    it('marks are written inline — they stand in the prose as elements of the block', () => {
        const chapter = specimen();
        const inline = (chapter.sections[0].text?.$elements ?? []).filter(e => e instanceof $Mark);
        expect(inline.length).toBe(2);
        expect((inline as $Mark[]).map(m => m.label)).toEqual(['seam', 'found']);
    });

    it('a mark reads its note through the chapter it is rendered inside, and wears its number', () => {
        const chapter = specimen();
        const footer = chapter.sections.find(s => s instanceof $Footer) as $Footer;
        const seam: $Mark = $(<Mark label="seam" />, chapter);
        const found: $Mark = $(<Mark label="found" />, chapter);
        expect(seam.read()).toBe(footer.entry('seam'));
        expect(seam.number).toBe(1);
        expect(found.number).toBe(2);
    });

    it('a duplicated label reads nothing — uniqueness lives in the entry lookup', () => {
        const footer: $Footer = $(
            <Footer>
                <Title>Notes</Title>
                <Footnote label="twice">One.</Footnote>
                <Footnote label="twice">Two.</Footnote>
            </Footer>
        );
        expect(footer.entry('twice')).toBeUndefined();
    });

    it('the footer is not the summary — the chapter keeps them apart', () => {
        const chapter = specimen();
        expect(chapter.summary?.heading).toBe('Summary');
        expect(chapter.summary).not.toBeInstanceOf($Footer);
    });

    it('a citation resolves its address inside the book it is rendered inside', () => {
        const book = shelfless();
        const cite: $Citation = $(<Citation label="here" for="#3.1">The identity section.</Citation>, book);
        expect(cite.read()).toBe(book.chapters[3].sections[0]);
    });

    it('a citation naming another document declines to read locally', () => {
        const book = shelfless();
        const bibliography = book.sections.find(s => s instanceof $Bibliography) as $Bibliography;
        const away = bibliography.entry('srt') as $Citation;
        expect(away.document).toBe('ixp');
        expect(away.read()).toBeUndefined();
        expect(away.copy).toContain('another document');
    });

    it('a mark climbs past a chapter without entries to the bibliography filed in the book', () => {
        const book = shelfless();
        const bibliography = book.sections.find(s => s instanceof $Bibliography) as $Bibliography;
        const euler: $Mark = $(<Mark label="euler" />, book.tableOfContents);
        expect(euler.read()).toBe(bibliography.entry('euler'));
        expect(euler.number).toBe(1);
    });

    it('equality is the arrival — same entry, same mark', () => {
        const chapter = specimen();
        const one: $Mark = $(<Mark label="seam" />, chapter);
        const two: $Mark = $(<Mark label="seam" />, chapter);
        const other: $Mark = $(<Mark label="found" />, chapter);
        expect(one.equals(two)).toBe(true);
        expect(one.equals(other)).toBe(false);
    });

    it('a mark with no entry anywhere is invalid; a resolved one is valid', () => {
        const chapter = specimen();
        const seam: $Mark = $(<Mark label="seam" />, chapter);
        const stray: $Mark = $(<Mark label="missing" />, chapter);
        expect(seam.valid()).toBe(true);
        expect(stray.valid()).toBe(false);
    });
});
