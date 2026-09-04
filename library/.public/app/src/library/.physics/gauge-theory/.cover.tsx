import { physics, theTeam } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical, Paragraph } from '@dna-platform/public';

export class $GaugeTheoryCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Gauge Theory: The Shape of a Force</Title>
                <Paragraph>{'A book whose cover names no author, so a compiler must supply one.'}</Paragraph>
                <Paragraph><Author for={theTeam}>The Team</Author></Paragraph>
                <Paragraph><Subject for={physics}>Physics</Subject></Paragraph>
            </Section>
        );
    }
}

export const GaugeTheoryCover = $($GaugeTheoryCover);
