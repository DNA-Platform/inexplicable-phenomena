import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';

export class $ManifoldCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Manifold of Sentences: A Geometry of Prose</Title>
                {'\n\nWriting is a curved surface that pretends, everywhere you stand, to be flat.'}
                {'\n\nThis book walks the surface: the fold, the chart, the curvature, the straightest path through.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>Demonstration</Subject>
            </Section>
        );
    }
}

export const ManifoldCover = $($ManifoldCover);
