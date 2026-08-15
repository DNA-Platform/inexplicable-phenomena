import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $StandardModelSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nTwelve fermions, four forces, and one field that gives the rest their mass. The book is short because the table is short.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nTwelve fermions, four forces, one field.'}
                </Section>
            </>
        );
    }
}

export const StandardModelSynopsis = $($StandardModelSynopsis);
