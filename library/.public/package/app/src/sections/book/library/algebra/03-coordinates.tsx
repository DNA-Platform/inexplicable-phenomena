import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $Coordinates extends $Chapter {
    $Coordinates() {
        this.$Chapter();
    }

    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Coordinates</Title>
                    {'\n\nEvery act of reading is a change of coordinates. The same sentence lands differently after the chapter before it, and a book is the slow rotation of the frame in which its last page is read. Nothing about the ink changes; everything about the reader does.'}
                    {'\n\nThis is why a book cannot be summarized by sampling. Pull a sentence from the middle and you hold a coordinate without its frame — grammatically intact, semantically homeless. The sentence was written to be arrived at.'}
                </Section>
                <Section>
                    <Title>The Frame</Title>
                    {'\n\nA frame is built from everything already read: the terms the cover promised, the distinctions the early chapters cut, the examples that taught the eye where to look. Each chapter inherits the frame and hands it on, slightly turned.'}
                    {'\n\nThe craft of ordering chapters is the craft of rotating the reader gently enough that no page feels foreign and firmly enough that the last page could not have come first.'}
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
