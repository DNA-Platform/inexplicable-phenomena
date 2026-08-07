import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { algebra } from '../algebra/book';

export class $TheAlgebraEntry extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>{algebra.title?.copy ?? ''}</Title>
                    {'\n\nA single sheet of writing, met at four speeds. The reader may sit with the whole page, skim it from the doorway, enter it sideways through its contents, or read only what it says about itself — and the writing never changes, only the approach to it.'}
                    {'\n\nIts room is warm cream and quiet: a page you settle into rather than a screen you operate. It proves the claim its own title makes — one object, many renderings — and it proves it by being the same book each time.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nOne sheet, four ways of reading it. Warm cream. Proves that a view is a way of meeting a thing, not a copy of it.'}
                </Section>
            </>
        );
    }
}

export const TheAlgebraEntry = $($TheAlgebraEntry);
