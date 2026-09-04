import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Cover, Paragraph, Section, Title } from '@dna-platform/public';

export const Consciousness = $(
    <Cover>
        <Section>
            <Title>Consciousness</Title>
            <Paragraph>{
                'A book on awareness and the question it raises.\n' +
                'Something it is like to be, written from the inside.'
            }</Paragraph>
        </Section>
    </Cover>
);
