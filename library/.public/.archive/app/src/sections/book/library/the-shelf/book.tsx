import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $$Book, Book } from '@/book/Book';
import { type $Chapter } from '@/book/Chapter';
import { $Synopsis } from '@/book/Synopsis';
import { type $LibraryCard } from '../the-team/librarycard';
import { ShelfCover } from './01-the-cover';
import { ShelfSynopsis } from './02-the-synopsis';
import { $TheCardCatalogue, TheCardCatalogue } from './03-the-card-catalogue';
import { $ShelfContents, ShelfContents } from './contents';
import { AlgebraSynopsis } from '../algebra/02-the-synopsis';
import { ManifoldSynopsis } from '../the-manifold/02-the-synopsis';
import { TeamSynopsis } from '../the-team/02-the-synopsis';
import { BuildSynopsis } from '../the-build/02-the-synopsis';
import { Leaf, Column, Reading, ReadingReturn, Drawer, DrawerCard, DrawerName, DrawerRow } from '../../catalogue.styled';

// The shelf IS a book, and this is that book viewing itself. Its contents page
// carries the two faces — spines and writing — and following any subject link
// in the library arrives here, at this view, because the view of the book is
// what a reference reads to.
export class $TheShelf extends $Book {
    $travel?: (card: $$Book) => void = undefined;
    $reading?: $Chapter = undefined;

    view(): ReactNode {
        if (this.$reading) {
            const C = $(this.$reading) as any;
            const drawer = this.$reading instanceof $TheCardCatalogue;
            const cards = (this.chapters.filter(c => c instanceof $Synopsis && c.card) as $Synopsis[]).map(c => c.card as $LibraryCard);
            return (
                <Leaf>
                    <Column>
                        <ReadingReturn onClick={() => { this.$reading = undefined; }}>← {this.title?.copy ?? ''}</ReadingReturn>
                        <Reading><C /></Reading>
                        {drawer && (
                            <Drawer>
                                {cards.map((card: $LibraryCard) => (
                                    <DrawerCard key={card.name}>
                                        <DrawerName>{card.name}</DrawerName>
                                        <DrawerRow><em>title</em><span>{card.canonical?.heading ?? ''}</span></DrawerRow>
                                        <DrawerRow><em>subtitle</em><span>{card.subtitle?.copy ?? ''}</span></DrawerRow>
                                        <DrawerRow><em>synopsis</em><span>{card.synopsis}</span></DrawerRow>
                                        <DrawerRow><em>author</em><span>{card.author?.name ?? ''}</span></DrawerRow>
                                        <DrawerRow><em>subject</em><span>{card.subject?.name ?? ''}</span></DrawerRow>
                                    </DrawerCard>
                                ))}
                            </Drawer>
                        )}
                    </Column>
                </Leaf>
            );
        }
        const T = $(this.contents) as any;
        return <T />;
    }
}

const TheShelf = $($TheShelf);

// THE SHELF IS A CATALOGUE, AND THIS IS WHAT THAT MEANS NOW: the books it
// catalogues stand in it as their own synopses — the same component the book
// itself renders, built a second time here, so the account cannot drift from
// the book. Its own synopsis comes FIRST, because until `card.tsx` hands the
// others their cards every synopsis reads home, and the first reflexive one is
// the one the book answers with.
export const shelf: $TheShelf = $(
    <TheShelf>
        <ShelfCover />
        <ShelfContents />
        <ShelfSynopsis />
        <AlgebraSynopsis />
        <ManifoldSynopsis />
        <TeamSynopsis />
        <BuildSynopsis />
        <TheCardCatalogue />
    </TheShelf>
) as $TheShelf;

export const entries: $Synopsis[] = shelf.chapters.filter(
    (c): c is $Synopsis => c instanceof $Synopsis && c !== shelf.synopsis,
);

export const drawer: $TheCardCatalogue = shelf.chapters.find(c => c instanceof $TheCardCatalogue) as $TheCardCatalogue;

export const contents: $ShelfContents = shelf.contents as $ShelfContents;
