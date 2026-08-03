import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Footer } from '@/document/Footer';
import { Footnote } from '@/document/Footnote';

export class $TheChart extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Chart: A Page Maps Its Neighbourhood</Title>
                    {'\n\nNo one reads a book; one reads a page. The page is a chart — a map $\\varphi: U \\to \\mathbb{R}^2$ from a patch of the book onto flat paper — and while you stand on it, the book obliges by seeming flat. Every difficulty of reading is the difficulty of a mapmaker: the surface is curved and the paper is not^[map].'}
                    {'\n\nA page charts more than it prints. Margins, running heads, the folio in the corner — apparatus by which a flat rectangle admits it belongs to a curved thing, the way a map carries its compass rose and its scale.'}
                </Section>
                <Section>
                    <Title>The Atlas</Title>
                    {'\n\nCharts overlap, and the overlaps are the whole trick. Where page and page share a margin of meaning, the transition $\\varphi_j \\circ \\varphi_i^{-1}$ must be smooth — the vocabulary carried across the turn, the pronoun still resolving, the tense unbroken. A book is an **atlas**: not one map, but a family of maps agreeing on their seams.'}
                    {'\n\n> An atlas is a book whose pages admit they overlap.'}
                    {'\n\nWhen the transitions fail — a chapter that redefines a word without saying so, a scene that forgets its own weather — the reader falls between charts. The fall is what [the fold](#3) promised never to allow between paragraphs; the atlas extends the promise between pages.'}
                </Section>
                <Footer>
                    <Title>Notes</Title>
                    <Footnote>{'map: Which is why no honest page ever claims to be the whole book, and why a summary — a very small map of a very large country — always lies a little.'}</Footnote>
                </Footer>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA page is a chart of a curved book; a book is an atlas whose overlaps agree.'}
                </Section>
            </>
        );
    }
}

export const TheChart = $($TheChart);
