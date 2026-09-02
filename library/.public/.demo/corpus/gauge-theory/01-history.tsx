import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Paragraph, Section, Title } from '@dna-platform/lib';

export const History = $(
    <Chapter>
        <Section>
            <Title>History</Title>
            <Paragraph>{
                'The electromagnetic potentials of Maxwell carry a hidden freedom, since shifting them leaves every measurable field unchanged.\n' +
                'In 1918, Hermann Weyl proposed that a local change of scale might be such a freedom, and coined the term gauge invariance.\n' +
                'His first proposal failed, but the word survived it.\n' +
                'With quantum mechanics the freedom returned as a change of phase, and there it belonged.'
            }</Paragraph>
            <Paragraph>{
                'In 1954, Chen Ning Yang and Robert Mills extended the idea to symmetries whose operations do not commute.\n' +
                'Their theory appeared to demand massless force carriers that nobody had observed.\n' +
                'The Higgs mechanism resolved the embarrassment by letting a gauge symmetry hide while its carriers acquire mass.\n' +
                'By the 1970s, gauge theories accounted for three of the four known forces.'
            }</Paragraph>
        </Section>
    </Chapter>
);
