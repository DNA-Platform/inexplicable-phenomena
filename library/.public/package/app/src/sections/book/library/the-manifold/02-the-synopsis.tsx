import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $ManifoldSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nSentences fold into paragraphs and paragraphs into sections; the manifold is what stays smooth across the folds. Every page is a local flatness — prose that reads as if it were the whole surface — and the book is the atlas that admits no single page ever was.'}
                    {'\n\nFour walks: the fold, where the paragraph earns its break; the chart, where a page maps its neighbourhood; the curvature, where meaning refuses to come back unchanged; and the geodesic, the straightest reading a curved book allows.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nWriting is a smooth surface stitched from folds. This book walks it.'}
                </Section>
            </>
        );
    }
}

export const ManifoldSynopsis = $($ManifoldSynopsis);
