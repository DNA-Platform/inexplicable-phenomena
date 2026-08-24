import { physics } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical, Paragraph } from '@dna-platform/lib';

export class $StandardModelCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Standard Model: A Catalogue of Fields</Title>
                <Paragraph>{'What everything is made of, and what makes it move.'}</Paragraph>
                <Paragraph><Author>The Team</Author></Paragraph>
                <Paragraph><Subject for={physics}>Physics</Subject></Paragraph>
            </Section>
        );
    }
}

export const StandardModelCover = $($StandardModelCover);
