import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $TestLibrarySynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nThis library holds two subjects and four books, arranged so that every rule of the folder convention is exercised at least once.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nTwo subjects, four books, every rule exercised.'}
                </Section>
            </>
        );
    }
}

export const TestLibrarySynopsis = $($TestLibrarySynopsis);
