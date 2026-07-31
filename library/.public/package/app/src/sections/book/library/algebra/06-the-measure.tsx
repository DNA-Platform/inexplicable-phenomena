import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheMeasure extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Measure of Reading: A Little Mathematics</Title>
                    {'\n\nA book can be counted. If a chapter holds $n$ sentences carrying $w$ words, its mean sentence runs $\\bar{s} = w/n$ words — and the model counts these on every read, fresh, because the readings parse rather than remember.'}
                    {'\n\nCounting is not understanding, but it corroborates: two views of one chapter must count the same words, and when the typeset page and the unadorned model agree on $w$, the reader has a proof that both faces belong to one object.'}
                </Section>
                <Section>
                    <Title>The Rotation, Written Small</Title>
                    {'\n\nThe first chapter said reading changes coordinates; mathematics says it smaller. Let $F_k$ be the frame after $k$ chapters and $c_k$ the turning the $k$-th chapter works on its reader. Then $F_{k+1} = c_k \\circ F_k$ — composition, not addition, because turnings do not commute.'}
                    {'\n\nRead the chapters out of order and you compose the same turnings in a different order; the algebra is honest about what every rereader knows — you do not land in the same place.'}
                    {'\n\nThe subscripts are honest work, too: $k$ is the index the composition assigned — the same number [the index law](#4) defends — so the mathematics of reading leans on the numbering of writing.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nReading counts, and it composes: $F_{k+1} = c_k \\circ F_k$.'}
                </Section>
            </>
        );
    }
}

export const TheMeasure = $($TheMeasure);
