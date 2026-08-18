import { philosophy } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $HardProblemCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Hard Problem: Why There Is Something It Is Like</Title>
                {'\n\nThe question that survives every explanation of the machinery.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject for={philosophy}>Philosophy</Subject>
            </Section>
        );
    }
}

export const HardProblemCover = $($HardProblemCover);
