import { philosophy, theTeam } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical, Paragraph } from '@dna-platform/public';

export class $HardProblemCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Hard Problem: Why There Is Something It Is Like</Title>
                <Paragraph>{'The question that survives every explanation of the machinery.'}</Paragraph>
                <Paragraph><Author for={theTeam}>The Team</Author></Paragraph>
                <Paragraph><Subject for={philosophy}>Philosophy</Subject></Paragraph>
            </Section>
        );
    }
}

export const HardProblemCover = $($HardProblemCover);
