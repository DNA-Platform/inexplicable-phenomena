import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $ManifoldCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Manifold of Sentences</Title>
                {'\n\nA short book, for the shelf to have a neighbour.'}
            </Section>
        );
    }
}

export const ManifoldCover = $($ManifoldCover);
