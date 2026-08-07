import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheFirstSheet extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The First Sheet</Title>
                    {'\n\nThe first book was not a book. It was one sheet of writing that we kept looking at from different angles, and the argument that produced it was about whether looking counts as changing.'}
                    {'\n\nWe had four ways of reading the same page — the whole thing at once, a skim from the doorway, an entry sideways through its contents, and only what it said about itself. Someone proposed keeping four copies. That proposal died in about a minute, and it deserved to. Four copies of a page that agree is a filing problem pretending to be a feature; four copies that disagree is a lie with a schedule.'}
                    {'\n\nSo the sheet stayed one object and the readings became ways of meeting it. This is the point where the whole thing stopped being a document viewer. A view is not a copy — it is an approach, and the thing approached is unchanged by being approached. Everything downstream is that sentence held under pressure.'}
                    {'\n\nWhat the page proved, and it proved it by being boring afterward: the same book, met four ways, is still the same book. Nobody had to enforce that. It was true because there was only ever one of it.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nOne sheet, four readings, and the discovery that a view is an approach rather than a copy.'}
                </Section>
            </>
        );
    }
}

export const TheFirstSheet = $($TheFirstSheet);
