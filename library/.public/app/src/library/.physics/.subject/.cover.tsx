import { library, physicsTheStandardModel, theTeam } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical, Paragraph } from '@dna-platform/public';

export class $PhysicsCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Physics: The Study of What There Is</Title>
                <Paragraph>{'A subject, which is to say a book that holds other books.'}</Paragraph>
                <Paragraph><Author for={theTeam}>The Team</Author></Paragraph>
                <Paragraph><Subject for={library}>A Test Library</Subject></Paragraph>
                <Paragraph><Canonical for={physicsTheStandardModel}>The Standard Model</Canonical></Paragraph>
            </Section>
        );
    }
}

export const PhysicsCover = $($PhysicsCover);
