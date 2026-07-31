import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheSummaryLaw extends $Chapter {
    $TheSummaryLaw() {
        this.$Chapter();
    }

    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Summary Law</Title>
                    {'\n\nEvery chapter carries a summary, and a summary is written — marked parenthetical, present in the writing, absent from the default reading. Nothing generates it; an author sat with the chapter and said it smaller.'}
                    {'\n\nParenthetical is a property any piece of writing may carry. It decides visibility, not existence: the hidden section is still counted, still indexed, still valid. The reading you see is a courtesy of the writing you don’t.'}
                </Section>
                <Section>
                    <Title>The Second Book</Title>
                    {'\n\nThe skim of a book is nothing but its summaries read in order, which is why an author who writes them well has written two books in one: the long book for the chair by the window, and the short one for the doorway, coat on.'}
                    {'\n\nA tagline is smaller still — the summary’s first sentence, trailing an ellipsis when there is more to say. Contents pages are set from taglines; shelves are sold on them.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nSummaries are written, marked, and hidden — the skim is their book.'}
                </Section>
            </>
        );
    }
}

export const TheSummaryLaw = $($TheSummaryLaw);
