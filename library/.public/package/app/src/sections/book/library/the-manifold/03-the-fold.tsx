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
                    <Title>The Paragraph</Title>
                    {'\n\nA paragraph is a run of sentences developing one thought. It begins where the thought begins, holds while the thought is worked, and ends when the thought is done — the white line after it is not decoration but punctuation at the scale of thinking.'}
                    {'\n\nThe reader trusts this contract without noticing it: start a new paragraph and they ready themselves for a turn; run two thoughts into one block and they feel the seam even when they cannot name it.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA paragraph develops one thought; the break marks the turn.'}
                </Section>
            </>
        );
    }
}

export const TheFold = $($TheFold);
