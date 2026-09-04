import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/public';

export class $PhilosophySynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'One book, and no declared canonical — so a compiler must fall back to the first book in the contents.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'One book, no declaration.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const PhilosophySynopsis = $($PhilosophySynopsis);
