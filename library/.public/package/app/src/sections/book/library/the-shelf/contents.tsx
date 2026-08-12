import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $TableOfContents } from '@/book/TableOfContents';
import { $Synopsis } from '@/book/Synopsis';

import { type $LibraryCard } from '../the-team/librarycard';
import { type $TheShelf } from './book';
import { Room, Caption, Board, Row, BoardTop, BoardShadow, Spine, SpineTitle } from '../../shelf.styled';
import {
    Field, Stage, Face, Reverse, Leaf, Column, Turnable, Standing, Preamble, Imprint,
    Entries, Entry, EntryTitle, EntryNote, Byline, Colophon,
} from '../../catalogue.styled';

// The shelf's two faces are two views of ONE table of contents — the spines are
// the contents met as furniture, the written catalogue is the same contents met
// as writing, and the flip is the change of view. Both faces derive from the
// same membership: the cards whose subject is this book.
type SpineData = { ink: string; tall: number; wide: number };

const graphite: SpineData[] = [
    { ink: '#24272c', tall: 48, wide: 42 },
    { ink: '#282c31', tall: 50, wide: 44 },
    { ink: '#2c3036', tall: 49, wide: 40 },
    { ink: '#22252a', tall: 51, wide: 46 },
    { ink: '#2f333a', tall: 50, wide: 44 },
];

const filler = (n: number, offset = 0): SpineData[] => Array.from({ length: n }, (_, i) => graphite[(i + offset) % graphite.length]);

const inks: Record<string, string> = {
    'The Algebra of Perspective': '#5b2f2a',
    'The Manifold': '#2c4a3c',
    'The Team': '#8c3b1e',
};

export class $ShelfContents extends $TableOfContents {
    turned = false;

    get shelf(): $TheShelf { return this.book as $TheShelf; }

    // THE CATALOGUE IS THE BOOK'S OWN CHAPTERS NOW. Every synopsis standing in
    // The Shelf that is OF another book is an entry; the shelf's own account of
    // itself reads home and is not one. Nothing is held in a second list.
    catalogued(): $Synopsis[] {
        return this.book.chapters.filter(
            (c): c is $Synopsis => c instanceof $Synopsis && c.card !== undefined,
        );
    }

    shelved(): $LibraryCard[] {
        return this.catalogued().map(s => s.card as $LibraryCard).filter(card => card !== this.book.subject?.card);
    }

    inSpines(): ReactNode {
        const shelved = this.shelved();
        return (
            <Room>
                <Caption>
                    <Turnable onClick={() => { this.turned = true; }}>{this.book.title?.copy.toLowerCase() ?? ''}</Turnable>
                    <em>pull a book</em>
                </Caption>
                <Board>
                    <Row>
                        {filler(14).map((b, i) => <Spine key={'a' + i} $ink={b.ink} $tall={b.tall} $wide={b.wide} />)}
                        {shelved.map((card, i) => (
                            <Spine key={card.name} className="shelf-card" data-book={card.name} $ink={inks[card.name] ?? '#2c3036'} $tall={52 + (i % 2) * 2} $wide={50 - (i % 3) * 2} $held onClick={() => this.shelf.$travel?.(card)}>
                                <SpineTitle>{card.title}</SpineTitle>
                            </Spine>
                        ))}
                        {filler(14, 2).map((b, i) => <Spine key={'b' + i} $ink={b.ink} $tall={b.tall} $wide={b.wide} />)}
                    </Row>
                    <BoardTop />
                    <BoardShadow />
                </Board>
            </Room>
        );
    }

    inWriting(): ReactNode {
        const rows = this.parts();
        return (
            <Leaf>
                <Column>
                    <Standing onClick={() => { this.turned = false; }}>{this.book.title?.copy ?? ''}</Standing>
                    <Imprint>{this.book.subject?.name ?? ''}</Imprint>
                    <Preamble>{this.book.cover.canonical.paragraphs.slice(1).map(p => p.copy).join(' ')}</Preamble>
                    <Entries>
                        {rows.map((row, i) => {
                            const chapter = row.read();
                            const card = chapter instanceof $Synopsis ? (chapter.card as $LibraryCard | undefined) : undefined;
                            // AN ENTRY SHOWS THE BOOK, NOT THE CHAPTER. A synopsis
                            // is titled "Synopsis" inside its own book, which is
                            // right there and wrong here — so the title, the note
                            // and the byline are all read through the card.
                            const title = card?.title ?? row.copy;
                            const note = card ? card.synopsis : (chapter?.tagline?.copy ?? '');
                            return (
                                <Entry key={'row-' + i} $ink={card ? (inks[card.name] ?? '#2c3036') : '#8a6238'} $i={i} data-entry={title}>
                                    <EntryTitle onClick={() => card ? this.shelf.$travel?.(card) : (this.shelf.$reading = chapter)}>{title}</EntryTitle>
                                    <EntryNote>{note}</EntryNote>
                                    {card ? (
                                        <Byline data-author onClick={() => { if (card.author) this.shelf.$travel?.(card.author); }}>
                                            {card.written('author')}
                                        </Byline>
                                    ) : null}
                                </Entry>
                            );
                        })}
                    </Entries>
                    <Colophon>{this.book.synopsis?.summary?.paragraphs.slice(1).map(p => p.copy).join(' ') ?? ''}</Colophon>
                </Column>
            </Leaf>
        );
    }

    view(): ReactNode {
        return (
            <Field>
                <Stage $turned={this.turned}>
                    <Face>{this.inSpines()}</Face>
                    <Reverse>{this.inWriting()}</Reverse>
                </Stage>
            </Field>
        );
    }
}

export const ShelfContents = $($ShelfContents);
