import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section, Synopsis } from '@dna-platform/public';

export const ChemistrySynopsis = $(
    <Synopsis>
        <Section>
            <Heading>Chemistry</Heading>
            <Paragraph>{
                'Chemistry is the scientific study of matter, its properties, and the transformations it undergoes.\n' +
                'Its central objects are atoms and the molecules they form, and its central event is the reaction.\n' +
                'The discipline stands between physics, which supplies its laws, and biology, which inherits its products.\n' +
                'Beneath every bond lies one force, the electromagnetic interaction.'
            }</Paragraph>
        </Section>
    </Synopsis>
);
