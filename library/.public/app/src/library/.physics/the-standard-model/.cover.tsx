import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $StandardModelCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Standard Model: A Catalogue of Fields</Title>
                {'\n\nWhat everything is made of, and what makes it move.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>Physics</Subject>
            </Section>
        );
    }
}

export const StandardModelCover = $($StandardModelCover);
