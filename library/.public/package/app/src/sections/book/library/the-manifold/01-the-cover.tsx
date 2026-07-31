import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $ManifoldCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Manifold of Sentences: A Geometry of Prose</Title>
                {'\n\nWriting is a curved surface that pretends, everywhere you stand, to be flat.'}
                {'\n\nThis book walks the surface: the fold, the chart, the curvature, the straightest path through.'}
            </Section>
        );
    }
}

export const ManifoldCover = $($ManifoldCover);
