import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Paragraph, Section, Title } from '@dna-platform/public';

export const Correlates = $(
    <Chapter>
        <Section>
            <Title>Correlates</Title>
            <Paragraph>{
                'A neural correlate of consciousness is the smallest set of brain events sufficient for a given experience.\n' +
                'Researchers hunt them by contrast, comparing what the brain does when a stimulus is seen with what it does when the same stimulus goes unnoticed.\n' +
                'Candidate correlates have been proposed in the visual cortex, the thalamus, and the long loops between them.\n' +
                'A correlate, once found, is still not an explanation, but it says where the explanation must live.'
            }</Paragraph>
            <Paragraph>{
                'Anesthesia offers the sharpest natural experiment, switching experience off while much of the machinery hums on.\n' +
                'Sleep, dreams, and disorders of consciousness each draw the boundary differently.\n' +
                'The field advances by mapping exactly which differences matter.'
            }</Paragraph>
        </Section>
    </Chapter>
);
