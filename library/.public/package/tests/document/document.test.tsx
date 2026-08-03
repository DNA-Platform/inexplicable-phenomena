import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
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
            <Footnote for="seam">Editors call this a seam.</Footnote>
            <Footnote for="found">The crease is felt before it is found.</Footnote>
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
            <Citation for="euler">Euler, the identity, 1748.</Citation>
            <Citation for="srt">The SRT source.</Citation>
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

    it('the footer holds its footnotes — for exposes the key, and numbers are linear — first citation first', () => {
        const footer = noted().footer!;
        expect(footer.footnotes.length).toBe(2);
        expect(footer.footnotes[0].$for).toBe('seam');
        expect(footer.footnotes[0].copy).toBe('Editors call this a seam.');
        expect(footer.footnotes[0].number).toBe(1);
        expect(footer.footnotes[1].number).toBe(2);
    });

    it('the legend is implicit — asked of the footer once, kept after, its keys standing for the footnotes', () => {
        const footer = noted().footer!;
        const legend = footer.legend;
        expect(footer.legend).toBe(legend);
        expect(legend.keys.length).toBe(2);
        expect(legend.keys[0].name).toBe('seam');
        expect(legend.keys[0].read()).toBe(footer.footnotes[0]);
    });

    it('a denote is parenthetical — counted by the reading, absent from the flattened prose', () => {
        const d = noted();
        expect(d.sections[0].copy).not.toContain('seam');
        expect(d.sections[0].copy).toContain('Fold a sheet and the crease remembers.');
    });

    it('a denote is written inline as a command — its key is its copy, and it reads its note through the document', () => {
        const d = noted();
        const [seam, found] = denotes(d);
        expect(seam.for).toBe('seam');
        expect(seam.document).toBe(d);
        expect(seam.read()).toBe(d.footer!.footnotes[0]);
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
        const echoed: $Cite = $(<Cite for="euler" />, d.sections[0]);
        expect(echoed.for).toBe('euler');
        expect(echoed.number).toBe(1);
    });

    it('a citation is for its key — the copy is the note, and the bibliography numbers alphabetically', () => {
        const d = cited();
        const local = d.bibliography!.citations[0];
        expect(local.$for).toBe('euler');
        expect(local.number).toBe(1);
        expect(local.copy).toContain('Euler, the identity');
        expect(d.bibliography!.citations[1].number).toBe(2);
    });

    it('bibliographies alphabetize, footers go in order — different because they are not in order', () => {
        const d: $Document = $(
            <Document>
                <Section>
                    <Title>Ordered</Title>
                    {'\n\nCiting'}
                    <Cite>zeno</Cite>
                    {' before'}
                    <Cite>euler</Cite>
                    {' changes nothing alphabetical.'}
                </Section>
                <Bibliography>
                    <Title>References</Title>
                    <Citation for="zeno">Zeno, the paradox.</Citation>
                    <Citation for="euler">Euler, the identity, 1748.</Citation>
                </Bibliography>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAlphabetical.'}
                </Section>
            </Document>
        );
        const [zeno, euler] = denotes(d) as [$Cite, $Cite];
        expect(euler.number).toBe(1);
        expect(zeno.number).toBe(2);
    });

    it('the chain guards where the design placed them — a stray mark is invalid; a missing filing section or key throws on read', () => {
        const stray: $Denote = $(<Denote>missing</Denote>);
        expect(stray.valid()).toBe(false);
        const d = noted();
        const wrong: $Denote = $(<Denote>absent</Denote>, d.sections[0]);
        expect(() => wrong.read()).toThrow(/notes carry this key/);
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
        expect(rejection(broken)).toMatch(/rejects "missing"/);
    });

    it('the legend affords a face — parenthetical and undisplayed today, rendering its keys when shown', () => {
        const footer = noted().footer!;
        const legend = footer.legend;
        expect(legend.parenthetical).toBe(true);
        legend.parenthetical = false;
        const L = $(legend as any);
        const { container } = render(<L />);
        expect(container.textContent).toContain('seam');
    });

    it('a footer and a bibliography coexist — each answers its own marks, each counts its own numbers', () => {
        const d: $Document = $(
            <Document>
                <Section>
                    <Title>Both</Title>
                    {'\n\nA note'}
                    <Denote>seam</Denote>
                    {' and a citation'}
                    <Cite>euler</Cite>
                    {' stand in one document.'}
                </Section>
                <Footer>
                    <Title>Notes</Title>
                    <Footnote for="seam">The note at the foot.</Footnote>
                </Footer>
                <Bibliography>
                    <Title>References</Title>
                    <Citation for="euler">Euler, the identity, 1748.</Citation>
                </Bibliography>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nBoth apparatuses.'}
                </Section>
            </Document>
        );
        expect(d.footer).not.toBeInstanceOf($Bibliography);
        expect(d.bibliography).toBeInstanceOf($Bibliography);
        const [seam, euler] = denotes(d) as [$Denote, $Cite];
        expect(seam.read()).toBe(d.footer!.footnotes[0]);
        expect(euler.read()).toBe(d.bibliography!.citations[0]);
        expect(seam.number).toBe(1);
        expect(euler.number).toBe(1);
    });

    it('a bibliography stands alone — the document answers no footer, and footnote marks fail honestly', () => {
        const d: $Document = $(
            <Document>
                <Section>
                    <Title>Cited Only</Title>
                    {'\n\nOne citation'}
                    <Cite>euler</Cite>
                    {' and nothing at the foot.'}
                </Section>
                <Bibliography>
                    <Title>References</Title>
                    <Citation for="euler">Euler, the identity, 1748.</Citation>
                </Bibliography>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nIndependent.'}
                </Section>
            </Document>
        );
        expect(d.footer).toBeUndefined();
        const [euler] = denotes(d) as [$Cite];
        expect(euler.number).toBe(1);
        expect(euler.valid()).toBe(true);
    });

    it('a bibliography is a footer whose entries are citations — and says so in valid', () => {
        const d = cited();
        expect(d.bibliography).toBeInstanceOf($Footer);
        expect(d.bibliography!.valid()).toBe(true);
        const mixed: $Bibliography = $(
            <Bibliography>
                <Title>References</Title>
                <Footnote for="plain">A note where a citation belongs.</Footnote>
            </Bibliography>
        );
        expect(mixed.valid()).toBe(false);
    });
});
