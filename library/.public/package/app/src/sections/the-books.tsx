import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { type $$Book } from '@/book/Book';
import { shelf, contents } from './book/library/the-shelf/book';
import { team } from './book/library/the-team/book';
import { algebra } from './book/library/algebra/book';
import { manifold } from './book/library/the-manifold/book';
import { build } from './book/library/the-build/book';

// A NOTE ON WHAT IS EAGER HERE, because it was tried and reverted.
//
// These four imports are why the shelf — the landing page — waits on 156
// modules before it draws a spine. Making them dynamic drops that to 84 AND
// REMOVES EVERY SPINE, because the demonstration's cards are READ OFF LIVING
// BOOKS at runtime: `the-team/card.tsx` builds each one with `line(algebra)`
// and `titles(manifold)`, so a card cannot exist until its book does.
//
// That is precisely the thing the compiler's generated catalogue refuses in its
// own words — "NOTHING HERE IMPORTS A BOOK. A card is a book present without
// the book" — and the compiler avoids it by reading the cards off living books
// at BUILD time and emitting literals. The demonstration has no build step, so
// it does the same reading at load time and pays for it on every visit.
//
// The fix is a design change and it is named rather than half-done: the demo's
// cards carry their own text and their `of` becomes a loader, which is what
// `The Team`'s card already does in that same file.

// The route is glue: the shelf book views itself, the team book views itself,
// and travelling between them is following a card — the router does the
// travelling, the model does the pointing. The route registers itself in its
// view, so the travel slots always speak to the instance actually rendered.
let route: $TheBooks | undefined;

class $TheBooks extends $Chemical {
    $opened?: $$Book = undefined;

    pull(card: $$Book) {
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
build.$travel = () => route?.home();

const TheBooks = $($TheBooks);

export function TheBooksDemo() {
    return <TheBooks />;
}

