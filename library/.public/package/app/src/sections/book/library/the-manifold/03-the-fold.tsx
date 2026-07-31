import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheFold extends $Chapter {
    $TheFold() {
        this.$Chapter();
    }

    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Fold</Title>
                    {'\n\nA paragraph is a fold in the page: the reader crosses it and the writing faces a new direction.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nParagraphs are folds; crossings change direction.'}
                </Section>
            </>
        );
    }
}

export const TheFold = $($TheFold);
