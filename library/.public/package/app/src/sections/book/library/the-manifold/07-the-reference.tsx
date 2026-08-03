import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Footer } from '@/document/Footer';
import { Footnote } from '@/document/Footnote';

export class $TheReference extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Reference: A Sentence That Stands For</Title>
                    {'\n\nA reference is not a new kind of thing. It is a sentence — the kind that stands for something. “See the chapter on the fold” is grammatical anywhere a sentence is; what it adds is not structure but posture. It points across the surface.'}
                    {'\n\nThis settles an old regress. If every reference needed a reference of its own, the tower would never ground. But the reference of a reference is the reference of a sentence — its place in the writing, derived like anyone else’s. The tower grounds because references live on the very surface they point along.'}
                    {'\n\nThis page can prove it. The fold was creased in [its own chapter](#3); the crease itself was pressed in [the second section](#3.1). And a reference below the paragraph is a *highlighting*: follow [this very paragraph](#7.1.3) and watch it light and fade — a geodesic of exactly one step.'}
                </Section>
                <Section>
                    <Title>Transport</Title>
                    {'\n\nA reference is parallel transport made honest. It carries the reader along a stated path to a stated place, and unlike [curvature](#5)’s silent turning, it declares the loop: *go there, then come back changed*. The grain is the address — $\\#3.1$ walks chapter three, then its second section — compose going down the writing, and the walk back is the reader’s.'}
                    {'\n\n> A bookmark belongs to the book it is rendered inside.'}
                    {'\n\nThat single law is the whole association — no registry, no lookup table; the parent is the belonging. The contents page is cut from the same cloth: every line of it is a reference to a chapter, derived at the opening, never authored.'}
                </Section>
                <Section>
                    <Title>The Ribbon</Title>
                    {'\n\nA bookmark is the reference a reader leaves. It resolves to a part of this book, and it belongs to this book for the plainest of reasons: it is rendered inside it. Leave the ribbon on this page and walk any path you like across the surface — the bookmark is the one geodesic that always leads home^[ribbon]. The ribbons multiply now — the reader keeps [a whole atlas of them](#8.2).'}
                </Section>
                <Footer>
                    <Title>Notes</Title>
                    <Footnote for="ribbon">{'The chip in the bar leaves it; the ribbon will hang over every page of this book until you click it home.'}</Footnote>
                </Footer>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA reference is a sentence that stands for something; it transports the reader along a declared path; a bookmark belongs to the book it is rendered inside.'}
                </Section>
            </>
        );
    }
}

export const TheReference = $($TheReference);
