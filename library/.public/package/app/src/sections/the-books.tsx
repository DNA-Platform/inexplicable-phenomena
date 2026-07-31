import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import { TheManifold } from './the-manifold';
import { DayBackdrop, DayBar, DayChip, DayRule, ShelfBoard, Spine } from './book/algebra.styled';

const spines = [
    { key: 'algebra', ink: '#5a2320', tall: 540, title: algebra.title?.copy ?? '' },
    { key: 'manifold', ink: '#274a3a', tall: 560, title: manifold.title?.copy ?? '' },
];

class $TheBooks extends $Chemical {
    opened = '';

    view(): ReactNode {
        if (this.opened === 'manifold') return <TheManifold />;
        return (
            <DayBackdrop>
                <DayBar>
                    <DayChip as="a" href="/page">← the page</DayChip>
                    <DayRule />
                    <span style={{ opacity: 0.55, fontSize: 13, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>the shelf — pull a book</span>
                </DayBar>
                <ShelfBoard className="shelf">
                    {spines.map(b => (
                        b.key === 'algebra'
                            ? <Spine key={b.key} as="a" href="/page" style={{ textDecoration: 'none' }} className="shelf-card" data-book={b.key} $ink={b.ink} $tall={b.tall}>
                                {b.title}
                            </Spine>
                            : <Spine key={b.key} className="shelf-card" data-book={b.key} $ink={b.ink} $tall={b.tall} onClick={() => { this.opened = b.key; }}>
                                {b.title}
                            </Spine>
                    ))}
                </ShelfBoard>
            </DayBackdrop>
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
