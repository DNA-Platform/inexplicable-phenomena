import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title as PlainTitle } from '@/writing/Title';
import { ChapterHeading as Title } from './figures';

export class $TheShelfChapter extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Shelf Was Already a Catalogue</Title>
                    {'\n\nWe built the shelf to hold the first two books, and for a while it was only furniture — a row of spines, some of them real and most of them filler, because a shelf with two books on it looks like a mistake.'}
                    {'\n\nThen someone turned it over. On the back of the spines was the same row written out: each book named, each name a way in. And the sentence that arrived with it was the one that reorganised everything above it. A shelf is already a catalogue. Ordered references, standing in a row, each spine a name that stands for a book without being one.'}
                    {'\n\nWhich meant the shelf was not furniture holding books. It was a book, whose chapters were references to other books, and the only reason it had not looked like one is that we had been writing its entries by hand. A hand-written catalogue drifts. It drifts the instant a book it lists is edited, and nothing tells you, because prose does not know what it is about.'}
                    {'\n\nSo the entries had to stop being prose. What replaces them is smaller than what it replaces, which is how we now recognise a correct move around here: the shelf holds cards, and a card is the book present without the book. You consult it instead of handling the thing.'}
                    {'\n\n“You think an index card representation of something includes all words in it? No.” The whole text of a book is the first thing a card refuses to carry, and the refusing is what makes it worth consulting. A stand-in that reproduced the thing would be the thing, and you would be holding the book again.'}
                    {'\n\nThat card is not a picture of a card. It is the card, printing what is on it, and the reason its property names match the book they describe is that nobody typed them twice.'}
                </Section>
                <Section parenthetical>
                    <PlainTitle>Summary</PlainTitle>
                    {'\n\nThe shelf turned over and was a catalogue, and its hand-written entries became cards.'}
                </Section>
            </>
        );
    }
}

export const TheShelfChapter = $($TheShelfChapter);
