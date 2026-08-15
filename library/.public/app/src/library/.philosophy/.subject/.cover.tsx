import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $PhilosophyCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Philosophy: The Study of What Follows</Title>
                {'\n\nA second subject, so the library has more than one thing to catalogue.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>A Test Library</Subject>
            </Section>
        );
    }
}

export const PhilosophyCover = $($PhilosophyCover);
