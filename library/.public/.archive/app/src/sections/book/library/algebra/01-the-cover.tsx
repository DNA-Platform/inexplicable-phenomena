import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';

export class $AlgebraCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Algebra of Perspective: A Study in Reading</Title>
                <Paragraph>{'Reading is an act with coordinates. This book changes them slowly, and on purpose.'}</Paragraph>
                {''}<Author>The Team</Author>
                {''}<Subject>Demonstration</Subject>
            </Section>
        );
    }
}

export const AlgebraCover = $($AlgebraCover);
