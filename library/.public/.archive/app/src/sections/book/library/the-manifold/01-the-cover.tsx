import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';

export class $ManifoldCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Manifold of Sentences: A Geometry of Prose</Title>
                <Paragraph>{'Writing is a curved surface that pretends, everywhere you stand, to be flat.'}</Paragraph>
                <Paragraph>{'This book walks the surface: the fold, the chart, the curvature, the straightest path through.'}</Paragraph>
                {''}<Author>The Team</Author>
                {''}<Subject>Demonstration</Subject>
            </Section>
        );
    }
}

export const ManifoldCover = $($ManifoldCover);
