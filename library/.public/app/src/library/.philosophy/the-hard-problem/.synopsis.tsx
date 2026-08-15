import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $HardProblemSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nExplaining what a system does never explains why doing it is accompanied by experience. The gap is the subject.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nFunction explained, experience unexplained.'}
                </Section>
            </>
        );
    }
}

export const HardProblemSynopsis = $($HardProblemSynopsis);
