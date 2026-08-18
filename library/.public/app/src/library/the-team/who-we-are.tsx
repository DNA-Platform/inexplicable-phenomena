import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title } from '@dna-platform/lib';

export class $WhoWeAre extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Who We Are</Title>
                    {'\n\nA library needs somewhere for authorship to bottom out. Every book names an author, and an author is itself a book — so the chain would run forever if nothing stood at the end of it.'}
                    {'\n\nThis book stands there. It names itself, and the naming is not a trick: a book that accounts for its own making is exactly what an autobiography is, and it is the only kind of book an author link is allowed to reach.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAuthorship bottoms out in a book that wrote itself.'}
                </Section>
            </>
        );
    }
}

export const WhoWeAre = $($WhoWeAre);
