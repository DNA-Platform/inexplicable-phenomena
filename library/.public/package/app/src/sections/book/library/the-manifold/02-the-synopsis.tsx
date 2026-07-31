import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $ManifoldSynopsis extends $Synopsis {
    $ManifoldSynopsis() {
        this.$Synopsis();
    }

    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nSentences fold into paragraphs and paragraphs into sections; the manifold is what stays smooth across the folds.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA brief companion on the folding of writing.'}
                </Section>
            </>
        );
    }
}

export const ManifoldSynopsis = $($ManifoldSynopsis);
