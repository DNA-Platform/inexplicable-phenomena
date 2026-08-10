import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { type $Chapter } from '@/book/Chapter';
import { type $LibraryCard } from '@/library/LibraryCard';
import { ShelfCover } from './01-the-cover';
import { ShelfSynopsis } from './02-the-synopsis';
import { $TheCardCatalogue, TheCardCatalogue } from './03-the-card-catalogue';
import { $ShelfContents, ShelfContents } from './contents';
import { Leaf, Column, Reading, ReadingReturn, Drawer, DrawerCard, DrawerName, DrawerRow } from '../../catalogue.styled';

// The shelf IS a book, and this is that book viewing itself. Its contents page
// carries the two faces — spines and writing — and following any subject link
// in the library arrives here, at this view, because the view of the book is
// what a reference reads to.
export class $TheShelf extends $Book {
    $travel?: (card: $LibraryCard) => void = undefined;
    $reading?: $Chapter = undefined;

    view(): ReactNode {
        if (this.$reading) {
            const C = $(this.$reading) as any;
            const drawer = this.$reading instanceof $TheCardCatalogue;
            const cards = this.tableOfContents.$cards;
            return (
                <Leaf>
                    <Column>
                        <ReadingReturn onClick={() => { this.$reading = undefined; }}>← {this.title?.copy ?? ''}</ReadingReturn>
                        <Reading><C /></Reading>
                        {drawer && (
                            <Drawer>
                                {cards.map(card => (
                                    <DrawerCard key={card.name}>
                                        <DrawerName>{card.name}</DrawerName>
                                        {card.properties().filter(p => p !== 'name' && p !== 'chapters').map(p => (
                                            <DrawerRow key={p}><em>{p}</em><span>{card.written(p)}</span></DrawerRow>
                                        ))}
                                    </DrawerCard>
                                ))}
                            </Drawer>
                        )}
                    </Column>
                </Leaf>
            );
        }
        const T = $(this.tableOfContents) as any;
        return <T />;
    }
}

const TheShelf = $($TheShelf);

export const shelf: $TheShelf = $(
    <TheShelf>
        <ShelfCover />
        <ShelfContents />
        <ShelfSynopsis />
        <TheCardCatalogue />
    </TheShelf>
) as $TheShelf;

export const drawer: $TheCardCatalogue = shelf.chapters.find(c => c instanceof $TheCardCatalogue) as $TheCardCatalogue;

export const contents: $ShelfContents = shelf.tableOfContents as $ShelfContents;
