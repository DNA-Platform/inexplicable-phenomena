import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheReference extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Reference: A Sentence That Stands For</Title>
                    {'\n\nA reference is not a new kind of thing. It is a sentence — the kind that stands for something. "See the chapter on coordinates" is grammatical anywhere a sentence is; what it adds is not structure but posture. It points.'}
                    {'\n\nThis settles an old regress. If every reference needed a reference of its own, the tower would never ground. But the reference of a reference is the reference of a sentence — its place in the writing, derived like anyone else\'s. The tower grounds because references live on the very spine they point along.'}
                </Section>
                <Section>
                    <Title>Composition and Selection</Title>
                    {'\n\nAn address is a fold. A book grounded at $\\rho$ gives its fourth chapter the address $\\rho\\#4$, and that chapter gives its second section $\\rho\\#4.2$ — compose going down the writing, select coming back, and the two are inverses: $\\mathrm{select}_k \\circ \\mathrm{compose}_k = \\mathrm{id}$.'}
                    {'\n\nNothing computes until asked. A part with no reference of its own borrows its parent\'s and composes one step — so a book with no address gives its chapters none, gracefully, and a book with one addresses every word it holds.'}
                </Section>
                <Section>
                    <Title>The Ribbon</Title>
                    {'\n\nA bookmark is the reference a reader leaves. It resolves to a part of this book, and it belongs to this book for the plainest of reasons: it is rendered inside it. Leave the ribbon on this page and wander — the bookmark knows the way back.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA reference is a sentence that stands for something; addresses compose down the writing and select back, $\\mathrm{select}_k \\circ \\mathrm{compose}_k = \\mathrm{id}$; a bookmark belongs to the book it is rendered inside.'}
                </Section>
            </>
        );
    }
}

export const TheReference = $($TheReference);
