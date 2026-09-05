import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Synopsis } from '@dna-platform/public';

export const ConsciousnessSynopsis = $(
    <Synopsis>
        <Section>
            <Heading>Consciousness</Heading>
            <Paragraph>{
                'Consciousness is awareness of internal and external existence, the fact that there is something it is like to be a subject.\n' +
                'Despite centuries of analysis it remains at once the most familiar and the most mysterious aspect of our lives.\n' +
                'Its study now spans philosophy, neuroscience, psychology, and physics.\n' +
                'Explaining why physical processes are accompanied by experience at all is widely held to be the hardest part.'
            }</Paragraph>
        </Section>
    </Synopsis>
);
