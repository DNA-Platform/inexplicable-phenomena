import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Showing, Listed, type Shown } from './figures';
import figures from './figures.tsx?raw';

const library: Shown[] = [
    { path: '/', holds: ['/physics', '/philosophy'] },
    { path: '/physics', holds: ['/physics/the-standard-model', '/physics/gauge-theory'] },
    { path: '/physics/the-standard-model', holds: [] },
    { path: '/physics/gauge-theory', holds: [] },
    { path: '/philosophy', holds: ['/philosophy/the-hard-problem'] },
    { path: '/philosophy/the-hard-problem', holds: [] },
];

export class $TheShowing extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Showing</Title>
                    {'\n\nSix stages turn folders into books. The seventh turns a book into something somebody is looking at, and it is the only one anybody outside this project will ever meet. It is also the shortest to describe, which is a good sign rather than a suspicious one: if showing a library needs a long explanation, the arrangement underneath it was wrong.'}
                    {'\n\nA path arrives. A card is found for it. One book is fetched. The book draws itself. That is the whole of the stage, and every interesting thing about it is a consequence of the last sentence rather than an addition to it.'}
                    {'\n\nThe path is the subject chain, so finding the card is a lookup in the catalogue and nothing maps addresses to pages by hand. This matters more than it sounds. A routing table is a second description of a hierarchy that the folders already carry, and a second description is a thing that can disagree with the first. Here there is only one, and it was written by the reading stage from the folders themselves.'}
                    {'\n\nWhether a book is something to read or something to consult is not declared anywhere and is not passed in. The book is consulted when it catalogues anything and read when it does not, which is the same count that decides whether a folder is a subject. The rule that makes a subject a subject is the rule that decides how it draws, and a book that gains its first catalogued sibling changes its face with nothing edited.'}
                    <Showing
                        books={library}
                        caption="Every kind on the right is computed by the same rule the application runs, and so is what each page costs to open. A wrong rule would draw a wrong table."
                    />
                    {'\n\nThere is one trap in that rule and it is worth naming, because falling into it undoes the arrangement it was meant to serve. The count must be taken by asking whether a chapter HAS a card, never by following the card to see where it goes. Following means opening, and opening every catalogued book in order to decide how to draw one page is exactly what a catalogue exists to prevent. A card that has not been given its book yet answers that it has none; that is not a failure, it is the ordinary condition of a catalogue entry.'}
                    {'\n\nSo the load boundary is not a policy anybody has to keep. It falls out. A page that consults needs cards and no books; a page that reads needs one book. Nothing had to be told to load less, because nothing was ever given the means to load more.'}
                    {'\n\nA subject is both things at once, and this is where a reader first feels it. Its page carries its own writing — a subject may have chapters like any other book — and beneath that the books it holds, each drawn from a card. Neither half is a special case. They are the same members, met twice.'}
                    {'\n\nA chapter is not a route. The route is the book, because the book is what loads, and giving a chapter its own address would promise a boundary that is not there. A chapter has an address all the same: it is a fragment, and it follows the reader down the page rather than waiting to be clicked. What that buys is a link somebody can send, at no cost to the shape underneath.'}
                    {'\n\nAnd a reader leaves something behind. A library served as files has nowhere to keep anything, so what is kept is kept on the reader’s own machine — a bookmark holding a location in a book, which is the model’s own pair of words for it. One is kept for each top-level subject rather than for each book or for the whole library, because a finger in every folder is not what anybody means by keeping their place. Coming back to a subject opens the book that was open, at the place it was left.'}
                    <Listed
                        of="the rule the figure above runs, and the application with it"
                        source={figures.slice(figures.indexOf('export type Shown'), figures.indexOf('export class $Showing')).trim()}
                        caption="What decides how a book draws, and what that costs."
                    />
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA path finds a card, one book is fetched, and the book draws itself — read or consulted by a count, with the load boundary falling out rather than being kept.'}
                </Section>
            </>
        );
    }
}

export const TheShowing = $($TheShowing);
