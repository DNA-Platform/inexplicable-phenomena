import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { type $LibraryCard } from './book/library/the-team/librarycard';
import { shelf, contents } from './book/library/the-shelf/book';
import { team } from './book/library/the-team/book';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';

// The route is glue: the shelf book views itself, the team book views itself,
// and travelling between them is following a card — the router does the
// travelling, the model does the pointing. The route registers itself in its
// view, so the travel slots always speak to the instance actually rendered.
let route: $TheBooks | undefined;

class $TheBooks extends $Chemical {
    $opened?: $LibraryCard = undefined;

    pull(card: $LibraryCard) {
        const book = card.read();
        if (book === algebra) { window.location.href = '/page'; return; }
        this.$opened = card;
    }

    home() {
        this.$opened = undefined;
        contents.turned = true;
    }

    view(): ReactNode {
        route = this;
        if (this.$opened) {
            const B = $(this.$opened.read()) as any;
            return <B />;
        }
        const S = $(shelf) as any;
        return <S />;
    }
}

shelf.$travel = card => route?.pull(card);
team.$travel = () => route?.home();
manifold.$travel = () => route?.home();

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
