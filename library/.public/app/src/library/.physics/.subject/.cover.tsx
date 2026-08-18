import { library, physicsTheStandardModel } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $PhysicsCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Physics: The Study of What There Is</Title>
                {'\n\nA subject, which is to say a book that holds other books.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject for={library}>A Test Library</Subject>
                {'\n\n'}<Canonical for={physicsTheStandardModel}>The Standard Model</Canonical>
            </Section>
        );
    }
}

export const PhysicsCover = $($PhysicsCover);
