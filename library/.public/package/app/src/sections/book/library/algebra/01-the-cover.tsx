import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $AlgebraCover extends $Cover {
    $AlgebraCover() {
        this.$Cover();
    }

    view(): ReactNode {
        return (
            <Section>
                <Title>The Algebra of Perspective: A Study in Reading</Title>
                {'\n\nReading is an act with coordinates. This book changes them slowly, and on purpose.'}
            </Section>
        );
    }
}

export const AlgebraCover = $($AlgebraCover);
