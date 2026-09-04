import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/public';

export class $GaugeTheorySynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'Demand that a symmetry hold at every point independently, and a force appears to make it possible. This book exists to test what a compiler supplies when a cover stays silent.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'A local symmetry, and the force it demands.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const GaugeTheorySynopsis = $($GaugeTheorySynopsis);
