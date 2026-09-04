import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Paragraph, Ref, Section, Sentence, Title } from '@dna-platform/public';

export const Symmetry = $(
    <Chapter>
        <Section>
            <Title>Symmetry</Title>
            <Paragraph>{
                'A global symmetry acts the same way everywhere at once, like turning every compass needle in the world by one angle.\n' +
                'A gauge symmetry is stricter and stranger, since it permits a different turn at every point.\n' +
                'No experiment can detect the turning, because the theory carries a field whose whole job is to absorb the differences.\n' +
                'That field is called the connection, and its curvature is what an observer measures as force.'
            }</Paragraph>
            <Paragraph>
                <Sentence>{'Physicists write the freedom as a group of transformations, and the choice of group decides the force.'}</Sentence>
                <Sentence>{'The simplest choice yields electromagnetism, whose quantum is the photon.'}</Sentence>
                <Sentence>{'Its slow, patient work at the scale of atoms is the whole subject of '}<Ref>{'[chemistry](/chemistry)'}</Ref>{'.'}</Sentence>
            </Paragraph>
        </Section>
    </Chapter>
);
