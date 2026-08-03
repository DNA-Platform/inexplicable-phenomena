import { describe, it, expect } from 'vitest';
import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Document, Document } from '@/document/Document';
import { $Footer, Footer } from '@/document/Footer';
import { $Footnote, Footnote } from '@/document/Footnote';
import { $Denote, Denote } from '@/document/Denote';
import { $Bibliography, Bibliography } from '@/document/Bibliography';
import { $Citation, Citation } from '@/document/Citation';
import { $Cite, Cite } from '@/document/Cite';
import { $Chapter, Chapter } from '@/book/Chapter';
import { $Section, Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

const noted = (): $Document => $(
    <Document>
        <Section>
            <Title>The Crease</Title>
            {'\n\nFold a sheet'}
            <Denote>seam</Denote>
            {' and the crease remembers. It is felt'}
            <Denote>found</Denote>
            {' before it is found.'}
        </Section>
        <Footer>
            <Title>Notes</Title>
            <Footnote>seam: Editors call this a seam.</Footnote>
            <Footnote>found: The crease is felt before it is found.</Footnote>
        </Footer>
        <Section parenthetical>
            <Title>Summary</Title>
            {'\n\nThe footer files the notes.'}
        </Section>
    </Document>
);

const cited = (): $Document => $(
    <Document>
        <Section>
            <Title>The Identity</Title>
            {'\n\nBinding every notation'}
            <Cite>euler</Cite>
            {' is the most beautiful identity in the language.'}
        </Section>
        <Bibliography>
            <Title>References</Title>
            <Citation for="#1.1">euler: Euler, the identity, 1748.</Citation>
            <Citation for="ixp#3.2">srt: The SRT source, in another document.</Citation>
        </Bibliography>
        <Section parenthetical>
            <Title>Summary</Title>
            {'\n\nThe document cites.'}
        </Section>
    </Document>
);

const denotes = (d: $Document): $Denote[] =>
    (d.sections[0].text?.$elements ?? []).filter(e => e instanceof $Denote) as $Denote[];

const rejection = (b: any): string | undefined => {
    const s = Object.getOwnPropertySymbols(b).find(x => x.description === '$Particle.devError');
    return s ? b[s] : undefined;
};

describe('The document — the general unit above sections, and its reference apparatus', () => {
    it('a chapter is a kind of document — the bond, the summary law, and the title come from the base', () => {
        const c: $Chapter = $(
            <Chapter>
                <Section><Title>Coordinates</Title>{'\n\nProse stands here.'}</Section>
                <Section parenthetical><Title>Summary</Title>{'\n\nIn brief.'}</Section>
            </Chapter>
        );
        expect(c).toBeInstanceOf($Document);
        expect(c.title?.copy).toBe('Coordinates');
        expect(c.summary?.copy).toContain('In brief.');
    });

    it('a section answers its document — the parent, retyped', () => {
        const d = noted();
        expect(d.sections[0].document).toBe(d);
    });

    it('the footer files keyed notes — the key stands before the colon, and the bond numbers the entries', () => {
        const footer = noted().footer!;
        expect(footer.entries.length).toBe(2);
        expect(footer.entries[0].key).toBe('seam');
        expect(footer.entries[0].note).toBe('Editors call this a seam.');
        expect(footer.entries[0].index).toBe(1);
        expect(footer.entries[1].index).toBe(2);
    });

    it('the legend is implicit — asked of the footer once, kept after, its keys standing for the entries', () => {
        const footer = noted().footer!;
        const legend = footer.legend;
        expect(footer.legend).toBe(legend);
        expect(legend.keys.length).toBe(2);
        expect(legend.keys[0].name).toBe('seam');
        expect(legend.keys[0].read()).toBe(footer.entries[0]);
    });

    it('a denote is parenthetical — counted by the reading, absent from the flattened prose', () => {
        const d = noted();
        expect(d.sections[0].copy).not.toContain('seam');
        expect(d.sections[0].copy).toContain('Fold a sheet and the crease remembers.');
    });

    it('a denote is written inline as a command — its key is its copy, and it reads its note through the document', () => {
        const d = noted();
        const [seam, found] = denotes(d);
        expect(seam.key).toBe('seam');
        expect(seam.document).toBe(d);
        expect(seam.read()).toBe(d.footer!.entries[0]);
        expect(seam.number).toBe(1);
        expect(found.number).toBe(2);
        expect(seam.valid()).toBe(true);
    });

    it('a cite reaches the bibliography instead — the triad retypes, get-only', () => {
        const d = cited();
        const [euler] = denotes(d) as $Cite[];
        expect(euler).toBeInstanceOf($Cite);
        expect(euler.bibliography).toBe(d.bibliography);
        expect(euler.citation).toBe(d.bibliography!.citations[0]);
        expect(euler.number).toBe(1);
        expect(euler.valid()).toBe(true);
    });

    it('a citation carries the path reference for its spot — resolved at its own document', () => {
        const d = cited();
        const local = d.bibliography!.citations[0];
        expect(local.reference).toBeDefined();
        expect(local.reference!.read().copy).toBe(d.sections[0].parts()[1].copy);
    });

    it('a citation naming another document declines to resolve locally', () => {
        const d = cited();
        const away = d.bibliography!.citations[1];
        expect(away.source).toBe('ixp');
        expect(away.reference).toBeUndefined();
        expect(away.copy).toContain('another document');
    });

    it('the chain guards where the design placed them — no document is false; no filing section throws; no key throws', () => {
        const stray: $Denote = $(<Denote>missing</Denote>);
        expect(stray.valid()).toBe(false);
        const d = noted();
        const wrong: $Denote = $(<Denote>absent</Denote>, d.sections[0]);
        expect(() => wrong.read()).toThrow(/entries carry this key/);
        const uncited: $Cite = $(<Cite>euler</Cite>, d.sections[0]);
        expect(() => uncited.read()).toThrow(/no bibliography/);
    });

    it('the binding validates the apparatus — a mark citing nothing is rejected at the document\'s bond', () => {
        const broken: $Document = $(
            <Document>
                <Section>
                    <Title>Broken</Title>
                    {'\n\nA mark'}
                    <Denote>missing</Denote>
                    {' cites nothing.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nIn brief.'}
                </Section>
            </Document>
        );
        expect(rejection(broken)).toMatch(/no footer/);
    });

    it('a bibliography is a footer whose entries are citations — and says so in valid', () => {
        const d = cited();
        expect(d.bibliography).toBeInstanceOf($Footer);
        expect(d.bibliography!.valid()).toBe(true);
        const mixed: $Bibliography = $(
            <Bibliography>
                <Title>References</Title>
                <Footnote>plain: A note where a citation belongs.</Footnote>
            </Bibliography>
        );
        expect(mixed.valid()).toBe(false);
    });
});
