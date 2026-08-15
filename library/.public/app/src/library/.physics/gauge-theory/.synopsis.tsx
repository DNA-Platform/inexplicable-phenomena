import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $GaugeTheorySynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nDemand that a symmetry hold at every point independently, and a force appears to make it possible. This book exists to test what a compiler supplies when a cover stays silent.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA local symmetry, and the force it demands.'}
                </Section>
            </>
        );
    }
}

export const GaugeTheorySynopsis = $($GaugeTheorySynopsis);
