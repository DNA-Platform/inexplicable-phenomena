import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $AlgebraSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nOne object, many renderings. A book is read whole in the chair, skimmed in the doorway, and entered sideways through its contents — the same writing every time, met at different speeds.'}
                    {'\n\nThree short chapters make the argument: reading as a change of coordinates; the index that assembly assigns and decimals bend; and the written summary, which hides in the page and becomes a second, faster book.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA study of reading as a change of coordinates.'}
                </Section>
            </>
        );
    }
}

export const AlgebraSynopsis = $($AlgebraSynopsis);
