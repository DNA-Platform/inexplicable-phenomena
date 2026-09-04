import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Paragraph, Section, Synopsis, Title } from '@dna-platform/public';

export const GaugeTheorySynopsis = $(
    <Synopsis>
        <Section>
            <Title>Gauge Theory</Title>
            <Paragraph>{
                'In physics, a gauge theory is a field theory whose laws keep their form under transformations that may differ from point to point.\n' +
                'That local freedom is called gauge symmetry, and it is not a decoration on the equations but a constraint that dictates them.\n' +
                'Insisting on the symmetry calls a field into being, and the quanta of such fields are the carriers of force.\n' +
                'The standard model of particle physics is a gauge theory, and so, in its own geometric dialect, is general relativity.'
            }</Paragraph>
        </Section>
    </Synopsis>
);
