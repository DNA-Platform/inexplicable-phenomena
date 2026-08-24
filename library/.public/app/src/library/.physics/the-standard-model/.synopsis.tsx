import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/lib';

export class $StandardModelSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'Twelve fermions, four forces, and one field that gives the rest their mass. The book is short because the table is short.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Twelve fermions, four forces, one field.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const StandardModelSynopsis = $($StandardModelSynopsis);
