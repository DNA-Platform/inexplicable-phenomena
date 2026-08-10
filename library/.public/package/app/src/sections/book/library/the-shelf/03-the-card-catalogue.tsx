import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { ChapterHeading } from '../the-team/figures';
import { type $LibraryCard } from '@/library/LibraryCard';

export class $TheCardCatalogue extends $Chapter {
    $cards: $LibraryCard[] = [];

    view(): ReactNode {
        return (
            <>
                <Section>
                    <ChapterHeading>The Card Catalogue</ChapterHeading>
                    {'\n\nA catalogue is not the books it stands for. It is the drawer of cards — one per book, each carrying enough to answer for its book without the book being opened. Title, author, subject, library: what is printed on a card is what the catalogue knows.'}
                    {'\n\nFour cards are filed in this drawer, and one of them is this book’s own. A drawer that files its own card is how a shelf gets to be a library: the catalogue belongs to the collection it catalogues, and says so on its card like everything else.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nThe drawer of cards, one per book, the shelf’s own among them.'}
                </Section>
            </>
        );
    }
}

export const TheCardCatalogue = $($TheCardCatalogue);
