import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $PhilosophySynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nOne book, and no declared canonical — so a compiler must fall back to the first book in the contents.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nOne book, no declaration.'}
                </Section>
            </>
        );
    }
}

export const PhilosophySynopsis = $($PhilosophySynopsis);
