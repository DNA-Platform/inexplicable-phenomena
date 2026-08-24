import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/lib';

export class $HardProblemSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'Explaining what a system does never explains why doing it is accompanied by experience. The gap is the subject.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Function explained, experience unexplained.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const HardProblemSynopsis = $($HardProblemSynopsis);
