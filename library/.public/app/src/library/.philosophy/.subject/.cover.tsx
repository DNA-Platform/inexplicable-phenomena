import { library, theTeam } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical, Paragraph } from '@dna-platform/public';

export class $PhilosophyCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Philosophy: The Study of What Follows</Title>
                <Paragraph>{'A second subject, so the library has more than one thing to catalogue.'}</Paragraph>
                <Paragraph><Author for={theTeam}>The Team</Author></Paragraph>
                <Paragraph><Subject for={library}>A Test Library</Subject></Paragraph>
            </Section>
        );
    }
}

export const PhilosophyCover = $($PhilosophyCover);
