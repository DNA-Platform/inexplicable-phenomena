import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title, Summary, Paragraph } from '@dna-platform/lib';

export class $TheGaugePrinciple extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Gauge Principle</Title>
                    <Paragraph>{'Insist that a symmetry hold separately at every point in space, and the insistence itself calls a field into being. The force is what it costs to keep the freedom.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Insist on a symmetry everywhere, and a field appears to pay for it.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheGaugePrinciple = $($TheGaugePrinciple);
