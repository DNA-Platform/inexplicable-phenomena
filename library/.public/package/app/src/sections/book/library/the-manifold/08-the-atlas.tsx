import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheAtlas extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Atlas</Title>
                    {'\n\n> An atlas is a book of maps; a manifold wears one as a definition.'}
                    {'\n\nNo single page can hold a curved surface — that was the lesson of [the chart](#4). The honest answer is not one map but a filed collection, $\\mathcal{A} = \\{(U_i, \\varphi_i)\\}$: every neighbourhood charted, the overlaps agreeing, the whole surface covered by pages that each admit they are local.'}
                    {'\n\nThis book keeps its atlas at the front and calls it the contents. Every line of that page is a reference to a chapter — derived at the opening, never authored — and the page of lines is itself a chapter with a folio of its own. A catalogue is a composition of references, and a composition of references is still writing: the atlas is a chart too.'}
                    {'\n\nThe cover is filed the same way. Ask this book to stand for itself and it hands you its cover — the one reference that answers for the whole surface^[So a shelf is an atlas of covers: each spine a card for a book you are not holding.].'}
                </Section>
                <Section>
                    <Title>Ribbons, Plural: The Reader’s Atlas</Title>
                    {'\n\nThe ribbons are the reader’s own cartography. Each one pressed into the book files a card in a private catalogue — *my places* — and it belongs to this book for the plainest of reasons: it is rendered inside it. Press the chip in the bar and the ribbon keeps the whole chapter; press it again and the ribbon comes home.'}
                    {'\n\nPress closer — twice, on any paragraph — and the reference deepens^[Double-click a paragraph and a narrower ribbon hangs for it; double-click the same fold again and it is taken home.]. A ribbon that keeps a paragraph is cut narrower than one that keeps a chapter, the way a fine bookmark keeps a line.'}
                    {'\n\nAnd below the paragraph? The page answers plainly: the paragraph is the finest fold a page can open to, so a reference that reaches [a word](#3.2.1.2.4) opens the paragraph that holds it. The model, asked the same question, reads the very word. The page rounds; the book does not.'}
                </Section>
                <Section>
                    <Title>The Way Back</Title>
                    {'\n\nEvery following is [transport](#7.2), and transport declared a loop: *go there, then come back changed*. The book now keeps its half of the bargain. Travel by any reference — a line of the contents, a link in the prose, a ribbon — and a small arrow surfaces at the spine’s edge: the way back, kept as a bookmark you did not have to leave.'}
                    {'\n\nThe arrow is not a history^[One arrow, one standing place: wherever you last travelled from. Following it makes the place you left the new way back — the loop, walkable in both directions.]. It is the plainest reference there is — the page you stood on when you left it — and like the ribbon it is a sentence that stands for a place, wearing its own face.'}
                    {'\n\n> The reference goes forward; the ribbon comes back; the arrow is the crease between them.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAn atlas is a catalogue of charts, and the contents page is this book’s own — with the cover as the reference that answers for the whole. Ribbons file the reader’s places at any depth: the page opens to the paragraph, the model reads to the word, and every travel leaves a backwards arrow home.'}
                </Section>
            </>
        );
    }
}

export const TheAtlas = $($TheAtlas);
