import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title, Figure } from '@dna-platform/lib';

export class $Symmetry extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Symmetry</Title>
                    {'\n\nA symmetry is a change that changes nothing. Rotate a sphere and you have the same sphere; that is the whole idea, and everything after it is bookkeeping about which changes leave which things alone.'}
                    {'\n\nA book may want a figure of its own standing here. Where that figure comes from is not yet decided, because a subject depends on the framework and on nothing else — so a component it did not write has only one place it can arrive from.'}
                    <Figure caption="A figure the framework ships, standing where a book's own would go." />
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA change that changes nothing, and the bookkeeping that follows from it.'}
                </Section>
            </>
        );
    }
}

export const Symmetry = $($Symmetry);
