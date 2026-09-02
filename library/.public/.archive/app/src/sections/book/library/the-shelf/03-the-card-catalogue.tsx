import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';
import { ChapterHeading } from '../the-team/figures';
import { type $LibraryCard } from '../the-team/librarycard';

export class $TheCardCatalogue extends $Chapter {
    $cards: $LibraryCard[] = [];

    view(): ReactNode {
        return (
            <>
                <Section>
                    <ChapterHeading>The Card Catalogue</ChapterHeading>
                    <Paragraph>{'A catalogue is not the books it stands for. It is the drawer of cards — one per book, each carrying enough to answer for its book without the book being opened. Title, author, subject, library: what is printed on a card is what the catalogue knows.'}</Paragraph>
                    <Paragraph>{'Four cards are filed in this drawer, and one of them is this book’s own. A drawer that files its own card is how a shelf gets to be a library: the catalogue belongs to the collection it catalogues, and says so on its card like everything else.'}</Paragraph>
                    <Paragraph>{'A catalogue does not usually show its cards — it answers questions with them. They are laid out on this page so they can be seen, which is this chapter’s reason for existing.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'The drawer of cards, one per book, the shelf’s own among them.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheCardCatalogue = $($TheCardCatalogue);
