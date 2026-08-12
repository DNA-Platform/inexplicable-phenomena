import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $ShelfSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nA spine is a reference seen edge-on: findable, ordered, wordless until you follow it. An entry is the same reference seen face-on: written out, so that it can be spoken of without being carried. Turning between them changes nothing about what is referred to — only the angle it is met from.'}
                    {'\n\nEvery entry on the written side is a chapter of this book, and every one of them is a synopsis of another. That is the whole mechanism: to catalogue a book is to hold its account of itself. The account is written once, in the book it is of, and stands in both places — so an entry here cannot drift from the book it names, because it is not a copy of it.'}
                    {'\n\nWhat separates this book from the ones it holds is therefore a count and not a kind. A book whose chapters all speak of itself is an ordinary book. A book carrying accounts of others is a subject. Nothing was added to make this one a catalogue; it simply took some in.'}
                    {'\n\nNot every spine names a book. Most of this row is furniture, and furniture has no account to give.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nOne catalogue, two angles: references as spines, and the books’ own accounts of themselves standing here as writing.'}
                </Section>
            </>
        );
    }
}

export const ShelfSynopsis = $($ShelfSynopsis);
