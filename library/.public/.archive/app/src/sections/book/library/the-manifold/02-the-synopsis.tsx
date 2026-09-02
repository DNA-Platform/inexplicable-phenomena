import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';

export class $ManifoldSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'Sentences fold into paragraphs and paragraphs into sections; the manifold is what stays smooth across the folds. Every page is a local flatness — prose that reads as if it were the whole surface — and the book is the atlas that admits no single page ever was.'}</Paragraph>
                    <Paragraph>{'Four walks: the fold, where the paragraph earns its break; the chart, where a page maps its neighbourhood; the curvature, where meaning will not come back unchanged; and the geodesic, the straightest reading a curved book allows.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Writing is a smooth surface stitched from folds. This book walks it.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const ManifoldSynopsis = $($ManifoldSynopsis);
