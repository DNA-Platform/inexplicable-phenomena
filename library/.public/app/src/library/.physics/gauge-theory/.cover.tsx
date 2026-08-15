import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $GaugeTheoryCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>Gauge Theory: The Shape of a Force</Title>
                {'\n\nA book whose cover names no author, so a compiler must supply one.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>Physics</Subject>
            </Section>
        );
    }
}

export const GaugeTheoryCover = $($GaugeTheoryCover);
