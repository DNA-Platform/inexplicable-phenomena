import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheTeamEntry extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Team</Title>
                    {'\n\nThe account of how the other three came to be, written by the thing that made them. It carries the passage where it decides to be written, and its author link points at itself — which is what makes it the canonical book of this library rather than a book that says it is.'}
                    {'\n\nIts room is the only one with no chrome: warm paper edge to edge, the apparatus in the margin rather than hidden, and the framework\'s own code standing in it as chapters. It proves that a library can hold the account of its own making without leaving the library.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nThe library\'s own account of itself. Full light. Proves that the loop closes in the model and can be read on the page.'}
                </Section>
            </>
        );
    }
}

export const TheTeamEntry = $($TheTeamEntry);
