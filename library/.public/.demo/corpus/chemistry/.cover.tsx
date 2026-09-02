import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Cover, Paragraph, Section, Title } from '@dna-platform/lib';

export const Chemistry = $(
    <Cover>
        <Section>
            <Title>Chemistry</Title>
            <Paragraph>{
                'A book on matter and its transformations.\n' +
                'Every substance is a sentence written in atoms, and every reaction rewrites it.'
            }</Paragraph>
        </Section>
    </Cover>
);
