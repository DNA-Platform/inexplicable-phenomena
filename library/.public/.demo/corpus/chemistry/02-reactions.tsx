import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Paragraph, Section, Title } from '@dna-platform/lib';

export const Reactions = $(
    <Chapter>
        <Section>
            <Title>Reactions</Title>
            <Paragraph>{
                'A chemical reaction rearranges atoms without creating or destroying them.\n' +
                'Reactants meet, bonds break and reform, and products carry the atoms away in new company.\n' +
                'Energy decides the direction, since systems roll downhill toward stability.\n' +
                'Rate is a different question from direction, which is why a diamond survives and a match does not.'
            }</Paragraph>
            <Paragraph>{
                'Chemists balance a reaction by counting every atom on both sides.\n' +
                'Catalysts speed the crossing without being consumed, by offering a cheaper path over the energy barrier.\n' +
                'Living cells run thousands of catalyzed reactions at once, each enzyme a specialist.'
            }</Paragraph>
        </Section>
    </Chapter>
);
