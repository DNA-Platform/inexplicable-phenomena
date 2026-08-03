import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Footer } from '@/document/Footer';
import { Footnote } from '@/document/Footnote';

export class $TheFold extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Fold</Title>
                    {'\n\n> Prose is a surface; punctuation is how it bends.'}
                    {'\n\nA paragraph is a run of sentences developing one thought. It begins where the thought begins, holds while the thought is worked, and ends when the thought is done — the white line after it is not decoration but punctuation at the scale of thinking.'}
                    {'\n\nThe reader trusts this contract without noticing it: start a new paragraph and they ready themselves for a turn; run two thoughts into one block and they feel the seam even when they cannot name it^[seam].'}
                </Section>
                <Section>
                    <Title>The Crease</Title>
                    {'\n\nFold a sheet and the crease remembers. Prose creases the same way: the paragraph break is a fold the writing keeps, and every rereading finds it in the same place. Where the fold falls **is** the thought’s boundary — move it and you have not reworded the passage, you have rethought it.'}
                    {'\n\nWrite the surface as $M$ and a fold as a curve $\\gamma \\subset M$. The text on either side is smooth; the crease is where the derivative of the thought jumps. A book with no folds is not smooth — it is unread, a plane no one has picked up.'}
                </Section>
                <Section>
                    <Title>Smoothness</Title>
                    {'\n\nSmoothness is the promise that between the folds, nothing tears: each sentence differentiable into the next, transitions of class $C^\\infty$ where the prose is at its best. The next chapter takes the local view — how [a single page charts its neighbourhood](#4) — and finds that flatness was always a courtesy of scale.'}
                </Section>
                <Footer>
                    <Title>Notes</Title>
                    <Footnote>{'seam: Editors call this a seam; readers just call it *hard to follow*. The crease is felt before it is found.'}</Footnote>
                </Footer>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA paragraph develops one thought; the break marks the turn. The fold is where writing bends and the crease is what it remembers.'}
                </Section>
            </>
        );
    }
}

export const TheFold = $($TheFold);
