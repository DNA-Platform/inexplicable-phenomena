import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $Coordinates extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Coordinates</Title>
                    {'\n\n> A book is a machine to think with. — I. A. Richards^[Richards wrote it of criticism, but every reader who has been turned by a chapter knows it is not a metaphor.]'}
                    {'\n\nEvery act of reading is a change of coordinates. The same sentence lands differently after the chapter before it, and a book is the slow rotation of the frame in which its last page is read. Nothing about the ink changes; everything about the reader does.'}
                    {'\n\nThis is why a book cannot be summarized by sampling. Pull a sentence from the middle and you hold a coordinate without its frame — grammatically intact, semantically homeless. The sentence was written to be arrived at.'}
                    {'\n\nWrite the frame as $F$ and a chapter as a turning $c$. Then reading is **application**, not addition: the chapter acts on the frame, $F^\\prime = c(F)$, and two readers who arrive at the same page along different shelves are not holding the same book.'}
                </Section>
                <Section>
                    <Title>The Frame</Title>
                    {'\n\nA frame is built from everything already read: the terms the cover promised, the distinctions the early chapters cut, the examples that taught the eye where to look. Each chapter inherits the frame and hands it on, slightly turned.'}
                    {'\n\nThe craft of ordering chapters is the craft of rotating the reader gently enough that no page feels foreign and firmly enough that the last page could not have come first.'}
                    {'\n\nThe frame is also why the parts must know where they stand. A chapter that cannot say *I am third* cannot say what it inherits — which is the whole subject of [the index law](#4), one page on.'}
                </Section>
                <Section>
                    <Title>The Reader Moves</Title>
                    {'\n\nFollow one reader through three chapters and write down what turned: after the first, a vocabulary; after the second, a suspicion; after the third, a habit of looking. The book did not add these — it **composed** them, $F_3 = c_3 \\circ c_2 \\circ c_1\\,(F_0)$, and composition does not commute.'}
                    {'\n\nSkip a chapter and the later turnings act on the wrong frame — familiar words landing at unfamiliar angles^[This is the precise sense in which a spoiler is a coordinate crime: the sentence arrives before its frame does.]. What such turning costs, and what it counts, is worked out in [the measure of reading](#6).'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nReading changes coordinates. The book rotates the frame page by page.'}
                </Section>
            </>
        );
    }
}

export const Coordinates = $($Coordinates);
