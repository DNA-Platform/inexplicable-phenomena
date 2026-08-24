import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/lib';

export class $PhysicsSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'Physics catalogues two books here and declares one of them canonical — which a compiler must check is a book it actually holds.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Two books, one of them canonical.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const PhysicsSynopsis = $($PhysicsSynopsis);
