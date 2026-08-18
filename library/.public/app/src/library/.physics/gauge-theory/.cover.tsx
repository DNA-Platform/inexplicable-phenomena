import { physics, theTeam } from '../../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $GaugeTheoryCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Gauge Theory: The Shape of a Force</Title>
                {'\n\nA book whose cover names no author, so a compiler must supply one.'}
                {'\n\n'}<Author for={theTeam}>The Team</Author>
                {'\n\n'}<Subject for={physics}>Physics</Subject>
            </Section>
        );
    }
}

export const GaugeTheoryCover = $($GaugeTheoryCover);
