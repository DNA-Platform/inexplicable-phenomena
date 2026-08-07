import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $Synopsis } from '@/book/Synopsis';
import { $TableOfContents } from '@/book/TableOfContents';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import { shelf } from './book/library/the-shelf/book';
import { team } from './book/library/the-team/book';
import { theAlgebra, theManifold, theTeam } from './book/library/the-team/card';
import { TheManifold } from './the-manifold';
import { TheTeam } from './the-team';
import { Room, Caption, Board, Row, BoardTop, BoardShadow, Spine, SpineTitle } from './book/shelf.styled';
import {
    Field, Stage, Face, Reverse, Leaf, Column, Turnable, Standing, Preamble,
    Entries, Entry, EntryTitle, EntryNote, Byline, Colophon,
} from './book/catalogue.styled';

// The shelf is UI. A spine does not need a book behind it, and a book does not
// need a spine — the shelf's own catalogue has none. To give a new book a
// spine, add it to `catalogued` with its ink and how it opens; the filler below
// stays exactly what it is, furniture.
type SpineData = { key?: string; href?: string; title?: string; ink: string; tall: number; wide: number };

const graphite: SpineData[] = [
    { ink: '#24272c', tall: 48, wide: 42 },
    { ink: '#282c31', tall: 50, wide: 44 },
    { ink: '#2c3036', tall: 49, wide: 40 },
    { ink: '#22252a', tall: 51, wide: 46 },
    { ink: '#2f333a', tall: 50, wide: 44 },
];

const filler = (n: number, offset = 0): SpineData[] => Array.from({ length: n }, (_, i) => graphite[(i + offset) % graphite.length]);

const catalogued = [
    { key: 'algebra', ink: '#5b2f2a', href: '/page', card: theAlgebra },
    { key: 'manifold', ink: '#2c4a3c', card: theManifold },
    { key: 'team', ink: '#8c3b1e', card: theTeam },
];

const spines: SpineData[] = [
    ...filler(14),
    { key: 'algebra', href: '/page', title: algebra.title?.copy ?? '', ink: catalogued[0].ink, tall: 52, wide: 50 },
    { key: 'manifold', title: manifold.title?.copy ?? '', ink: catalogued[1].ink, tall: 52, wide: 50 },
    { key: 'team', title: team.title?.copy ?? '', ink: catalogued[2].ink, tall: 54, wide: 46 },
    ...filler(14, 2),
];

const apparatus = (c: $Chapter) => c instanceof $Cover || c instanceof $Synopsis || c instanceof $TableOfContents;

const prose = (section?: { paragraphs: { copy: string }[] }) => section?.paragraphs.slice(1).map(p => p.copy).join(' ') ?? '';

class $TheBooks extends $Chemical {
    opened = '';
    turned = false;

    entries(): $Chapter[] {
        return shelf.chapters.filter(c => !apparatus(c));
    }

    inSpines(): ReactNode {
        return (
            <Room>
                <Caption>
                    <Turnable onClick={() => { this.turned = true; }}>the shelf</Turnable>
                    <em>pull a book</em>
                </Caption>
                <Board>
                    <Row>
                        {spines.map((b, i) => (
                            b.key === 'algebra'
                                ? <Spine key={i} as="a" href={b.href} style={{ textDecoration: 'none' }} className="shelf-card" data-book={b.key} $ink={b.ink} $tall={b.tall} $wide={b.wide} $held>
                                    <SpineTitle>{b.title}</SpineTitle>
                                </Spine>
                                : b.key
                                    ? <Spine key={i} className="shelf-card" data-book={b.key} $ink={b.ink} $tall={b.tall} $wide={b.wide} $held onClick={() => { this.opened = b.key!; }}>
                                        <SpineTitle>{b.title}</SpineTitle>
                                    </Spine>
                                    : <Spine key={i} $ink={b.ink} $tall={b.tall} $wide={b.wide} />
                        ))}
                    </Row>
                    <BoardTop />
                    <BoardShadow />
                </Board>
            </Room>
        );
    }

    inWriting(): ReactNode {
        return (
            <Leaf>
                <Column>
                    <Standing onClick={() => { this.turned = false; }}>{shelf.title?.copy ?? ''}</Standing>
                    <Preamble>{prose(shelf.cover.canonical)}</Preamble>
                    <Entries>
                        {this.entries().map((entry, i) => (
                            <Entry key={i} $ink={catalogued[i]?.ink ?? '#2c3036'} $i={i} data-entry={catalogued[i]?.key}>
                                <EntryTitle onClick={() => this.open(i)}>{entry.title?.copy ?? ''}</EntryTitle>
                                <EntryNote>{prose(entry.summary)}</EntryNote>
                                <Byline data-author onClick={() => { this.opened = 'team'; }}>
                                    {catalogued[i]?.card?.written('author') ?? ''}
                                </Byline>
                            </Entry>
                        ))}
                    </Entries>
                    <Colophon>{prose(shelf.synopsis.summary)}</Colophon>
                </Column>
            </Leaf>
        );
    }

    open(i: number) {
        const entry = catalogued[i];
        if (!entry) return;
        if (entry.href) window.location.href = entry.href;
        else this.opened = entry.key;
    }

    view(): ReactNode {
        if (this.opened === 'manifold') return <TheManifold />;
        if (this.opened === 'team') return <TheTeam />;
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

const TheBooks = $($TheBooks);

export function TheBooksDemo() {
    return <TheBooks />;
}

export const sectionData = {
    id: 'books',
    cases: 1,
    Component: TheBooksDemo,
    fullPage: true,
};
