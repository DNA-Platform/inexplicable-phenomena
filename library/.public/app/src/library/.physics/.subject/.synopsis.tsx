import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $PhysicsSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nPhysics catalogues two books here and declares one of them canonical — which a compiler must check is a book it actually holds.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nTwo books, one of them canonical.'}
                </Section>
            </>
        );
    }
}

export const PhysicsSynopsis = $($PhysicsSynopsis);
