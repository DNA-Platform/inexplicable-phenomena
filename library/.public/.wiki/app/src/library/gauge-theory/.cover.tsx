import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Heading, Paragraph, Section, Subject, Title } from '@dna-platform/public';

export const GaugeTheory = $(
    <Cover>
        <Title><Heading>Gauge Theory</Heading></Title>
        <Author><Heading>Wikipedia</Heading></Author>
        <Subject><Heading>Wikimedia</Heading></Subject>
        <Section>
            <Heading>Gauge Theory</Heading>
            <Paragraph>{
                'A book on the symmetry that writes the forces.\n' +
                'Demand that a freedom hold separately at every point, and a field must appear to pay for it.'
            }</Paragraph>
        </Section>
    </Cover>
);
