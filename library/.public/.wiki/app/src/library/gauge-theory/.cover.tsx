import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Cover, Paragraph, Section, Title } from '@dna-platform/lib';

export const GaugeTheory = $(
    <Cover>
        <Section>
            <Title>Gauge Theory</Title>
            <Paragraph>{
                'A book on the symmetry that writes the forces.\n' +
                'Demand that a freedom hold separately at every point, and a field must appear to pay for it.'
            }</Paragraph>
        </Section>
    </Cover>
);
