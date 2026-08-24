import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';

export class $AlgebraSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'One object, many renderings. A book is read whole in the chair, skimmed in the doorway, and entered sideways through its contents — the same writing every time, met at different speeds.'}</Paragraph>
                    <Paragraph>{'Three short chapters make the argument: reading as a change of coordinates; the index that assembly assigns and decimals bend; and the written summary, which hides in the page and becomes a second, faster book.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'A study of reading as a change of coordinates.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const AlgebraSynopsis = $($AlgebraSynopsis);
