import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Cell, Chapter, Paragraph, Ref, Section, Table, Title } from '@dna-platform/public';

export const Forces = $(
    <Chapter>
        <Section>
            <Title>Forces</Title>
            <Paragraph>{
                'Each fundamental interaction follows from insisting on a different local symmetry.\n' +
                'The symmetry dictates the carrier, and the carrier writes the force.\n' +
                'Three of the four interactions are gauge theories in the strict sense, and the fourth rhymes with them.'
            }</Paragraph>
            <Table>
                <Cell>{'electromagnetism, carried by the photon'}</Cell>
                <Cell>{'the weak interaction, carried by the W and Z bosons'}</Cell>
                <Cell>{'the strong interaction, carried by eight gluons'}</Cell>
                <Cell>{'gravitation, described instead by the curvature of spacetime'}</Cell>
            </Table>
            <Paragraph>
                {'The unabridged account remains at '}
                <Ref>{'[the original](https://en.wikipedia.org/wiki/Gauge_theory)'}</Ref>
            </Paragraph>
        </Section>
    </Chapter>
);
