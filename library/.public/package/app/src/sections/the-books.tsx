import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import { TheManifold } from './the-manifold';
import { Room, Caption, Board, Row, BoardTop, BoardShadow, Spine, SpineTitle } from './book/shelf.styled';

type SpineData = { key?: string; href?: string; title?: string; ink: string; tall: number; wide: number };

const graphite: SpineData[] = [
    { ink: '#24272c', tall: 48, wide: 42 },
    { ink: '#282c31', tall: 50, wide: 44 },
    { ink: '#2c3036', tall: 49, wide: 40 },
    { ink: '#22252a', tall: 51, wide: 46 },
    { ink: '#2f333a', tall: 50, wide: 44 },
];

const filler = (n: number, offset = 0): SpineData[] => Array.from({ length: n }, (_, i) => graphite[(i + offset) % graphite.length]);

const spines: SpineData[] = [
    ...filler(14),
    { key: 'algebra', href: '/page', title: algebra.title?.copy ?? '', ink: '#5b2f2a', tall: 52, wide: 50 },
    { key: 'manifold', title: manifold.title?.copy ?? '', ink: '#2c4a3c', tall: 52, wide: 50 },
    ...filler(14, 2),
];

class $TheBooks extends $Chemical {
    opened = '';

    view(): ReactNode {
        if (this.opened === 'manifold') return <TheManifold />;
        return (
            <Room>
                <Caption>
                    the shelf
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
