import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { type $$Book } from '@/book/Book';
import { shelf, contents } from './book/library/the-shelf/book';
import { team } from './book/library/the-team/book';
import { follow, theAlgebra } from './book/library/the-team/card';
import { type $LibraryCard } from './book/library/the-team/librarycard';

// WHAT IS EAGER HERE, and what is not.
//
// Three of the four books are behind doors in `the-team/card.tsx` and arrive
// when a card is followed. This was tried once in the other order — the imports
// made dynamic while the cards were still BUILT by reading their living books —
// and every spine vanished with them, because a card could not exist until its
// book did. The literals had to come first; they have.
//
// The shelf stays because the landing page IS the shelf, and The Team stays
// because its card is completed by its book rather than carrying its own line.

// The route is glue: the shelf book views itself, the team book views itself,
// and travelling between them is following a card — the router does the
// travelling, the model does the pointing. The route registers itself in its
// view, so the travel slots always speak to the instance actually rendered.
let route: $TheBooks | undefined;

class $TheBooks extends $Chemical {
    $opened?: $$Book = undefined;

    // FOLLOWING A CARD IS WHAT FETCHES THE BOOK. The card is compared, never the
    // book — comparing books would mean holding one to find out.
    async pull(card: $$Book) {
        if (card === theAlgebra) { window.location.href = '/page'; return; }
        await follow(card as $LibraryCard);
        const opened = card.read();
        (opened as { $travel?: () => void }).$travel = () => route?.home();
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

shelf.$travel = card => { void route?.pull(card); };
team.$travel = () => route?.home();

const TheBooks = $($TheBooks);

export function TheBooksDemo() {
    return <TheBooks />;
}

