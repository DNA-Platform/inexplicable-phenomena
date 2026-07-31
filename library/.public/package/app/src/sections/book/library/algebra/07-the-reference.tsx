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
                    {'\n\nA reference is not a new kind of thing. It is a sentence — the kind that stands for something. “See the chapter on coordinates” is grammatical anywhere a sentence is; what it adds is not structure but posture. It points.'}
                    {'\n\nThis settles an old regress. If every reference needed a reference of its own, the tower would never ground. But the reference of a reference is the reference of a sentence — its place in the writing, derived like anyone else’s. The tower grounds because references live on the very spine they point along.'}
                    {'\n\nThis page can prove it. The claim that reading changes coordinates was made in [the chapter on coordinates](#3); the frame itself was built in [its second section](#3.2). Both of those are sentences standing in this paragraph — grammatical here, pointing there. And a reference below the paragraph is a *highlighting*: follow [this very paragraph](#7.1.3) and watch it light and fade, the span between a start and an end.'}
                </Section>
                <Section>
                    <Title>Composition and Selection</Title>
                    {'\n\nAn address is a fold. A book grounded at $\\rho$ gives its fourth chapter the address $\\rho\\#4$, and that chapter gives its second section $\\rho\\#4.2$ — compose going down the writing, select coming back, and the two are inverses: $\\mathrm{select}_k \\circ \\mathrm{compose}_k = \\mathrm{id}$.'}
                    {'\n\nWho grounds $\\rho$ is not the book’s business. Shelving a book is the act of a **subject** viewing its books, and this library has no subjects yet — so $\\rho$ waits, ungrounded, and nothing beneath it minds. A part with no reference of its own borrows its parent’s and composes one step; a book with no address gives its chapters none, gracefully.'}
                    {'\n\nToday the addresses walk by index alone — the links on this page say **#3** and **#3.2**, the model’s own grain. Whether titles may one day serve as names is an open question for the subject that shelves this book^[Where nothing is titled — a paragraph, a sentence — the index must serve regardless, which is why the index law comes before the reference in this book.].'}
                </Section>
                <Section>
                    <Title>The Forms of Reference</Title>
                    {'\n\nThree forms already live in this book. The **link** navigates — the sentences above are links. The **name** marks — an anchor a link can land on. The **bookmark** points in from outside the prose: leave the ribbon anywhere^[The chip in the bar leaves it; the ribbon will hang over every page of this book until you click it home.] and it resolves through the book it hangs in.'}
                    {'\n\n> A bookmark belongs to the book it is rendered inside.'}
                    {'\n\nThat single law is the whole association — no registry, no lookup table; the parent is the belonging. The contents page is cut from the same cloth: every line of it is a reference to a chapter, derived at the opening, never authored.'}
                </Section>
                <Section>
                    <Title>The Ribbon</Title>
                    {'\n\nA bookmark is the reference a reader leaves. It resolves to a part of this book, and it belongs to this book for the plainest of reasons: it is rendered inside it. Leave the ribbon on this page and wander — the bookmark knows the way back.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA reference is a sentence that stands for something; addresses compose down the writing and select back; a bookmark belongs to the book it is rendered inside — and shelving belongs to subjects, which are still to come.'}
                </Section>
            </>
        );
    }
}

export const TheReference = $($TheReference);
