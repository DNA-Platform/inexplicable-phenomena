import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $ShelfSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nA spine is a reference seen edge-on: findable, ordered, wordless until you follow it. An entry is the same reference seen face-on: written out, so that it can be spoken of without being carried. Turning between them changes nothing about what is referred to — only the angle it is met from.'}
                    {'\n\nNot every spine names a book. Most of this row is furniture, and furniture has no entry, because a catalogue lists what it catalogues and nothing else. The shelf itself has no spine here for the same reason a table of contents has no line for itself.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nOne catalogue, two angles: references as spines, and the same references as writing.'}
                </Section>
            </>
        );
    }
}

export const ShelfSynopsis = $($ShelfSynopsis);
