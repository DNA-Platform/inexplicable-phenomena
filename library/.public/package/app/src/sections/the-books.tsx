import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import { TheManifold } from './the-manifold';
import { Room, PageLink, Caption, Board, Row, BoardTop, BoardShadow, Spine, SpineTitle, Tooling } from './book/shelf.styled';

type SpineData = { key?: string; href?: string; title?: string; ink: string; tall: number; wide: number; lean?: number; nudge?: number };

const spines: SpineData[] = [
    { ink: '#31404f', tall: 37, wide: 30 },
    { ink: '#5c4632', tall: 43, wide: 34 },
    { key: 'algebra', href: '/page', title: algebra.title?.copy ?? '', ink: '#5a2320', tall: 52, wide: 52 },
    { ink: '#3f4a36', tall: 35, wide: 26 },
    { ink: '#2e2b33', tall: 46, wide: 38, lean: 4.5, nudge: -9 },
    { key: 'manifold', title: manifold.title?.copy ?? '', ink: '#274a3a', tall: 55, wide: 50 },
    { ink: '#6e4a38', tall: 41, wide: 30 },
    { ink: '#584a63', tall: 33, wide: 24 },
    { ink: '#403a2a', tall: 44, wide: 36 },
];

class $TheBooks extends $Chemical {
    opened = '';

    view(): ReactNode {
        if (this.opened === 'manifold') return <TheManifold />;
        return (
            <Room>
                <PageLink href="/page">the page</PageLink>
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
                                    : <Spine key={i} $ink={b.ink} $tall={b.tall} $wide={b.wide} $lean={b.lean} style={b.nudge ? { marginRight: b.nudge } : undefined}>
                                        <Tooling />
                                    </Spine>
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
