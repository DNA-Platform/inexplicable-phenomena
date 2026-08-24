import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/lib';

export class $TestLibrarySynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'This library holds two subjects and four books, arranged so that every rule of the folder convention is exercised at least once.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Two subjects, four books, every rule exercised.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TestLibrarySynopsis = $($TestLibrarySynopsis);
