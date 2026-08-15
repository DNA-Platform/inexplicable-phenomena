import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Resolving, Listed, type Declared } from './figures';
import figures from './figures.tsx?raw';

const declared: Declared[] = [
    { path: '/', author: 'The Team', subject: '/' },
    { path: '/physics', author: 'The Team', subject: '/', canonical: '/physics/the-standard-model' },
    { path: '/physics/the-standard-model', author: 'The Team', subject: '/physics' },
    { path: '/physics/gauge-theory' },
    { path: '/philosophy', author: 'The Team', subject: '/' },
    { path: '/philosophy/the-hard-problem', author: 'The Team', subject: '/philosophy' },
];

export class $TheLibrary extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Library</Title>
                    {'\n\nReading produces a description, and a description is only an account of what is there. It knows that a folder holds four files and that one of them is a cover. It does not know who wrote the book, what the book is about, or which of a subject’s books speaks for it. Turning the one into the other is a phase of its own, and what it produces is the library.'}
                    {'\n\nThe work is almost entirely the same move, done in three directions: a name becomes a reference. A cover saying it belongs to physics is holding a word, and a word cannot be followed. What the phase does is find the thing that word stands for and put that in its place, so that afterwards nothing in the library has to be looked up by spelling ever again.'}
                    {'\n\nWhere each answer comes from is already settled and worth restating in one place. What a book belongs to is answered by position, because the folder holding it is its subject and nothing needs to be written down. Which of its books a subject speaks with cannot be answered by position — a folder does not say which of its children represents it — so the subject’s cover answers, and in the absence of an answer the first book it catalogues does.'}
                    {'\n\nAnd silence is filled here rather than anywhere else. A cover that names no author is given one; a book whose subject is obvious from where it sits does not have to say so. This is the phase that knows both what was written and where it was written, which is exactly what filling a silence requires, and it is the reason no earlier phase should try.'}
                    <Resolving
                        books={declared}
                        caption="Everything on the right is resolved from the description on the left. What an author declared is kept; what nobody said is supplied from position — and the verdict beneath counts the difference rather than asserting it."
                    />
                    {'\n\nThat figure carries an objection that once looked fatal, and its answer. Supplying a missing author sounds like editing somebody’s writing, and editing somebody’s writing would be a violation this whole arrangement exists to prevent. It is not one, because nothing is written back. The authored file stays exactly as it was left; what gains the author is the resolved library, which is a model rather than a manuscript. A resolution is not an edit, and keeping those two apart is what lets the convention be generous without being intrusive.'}
                    {'\n\nIt also carries a gap, and the figure says so rather than being arranged to look complete. The corpus this library was built from names an author on nearly every cover and contains no book by that name — so the one link the phase is proudest of supplying currently stands for nobody. A rule that is never left unsaid is never tested, and a rule whose default has nothing to point at is not tested either. The corpus needs a book that is its own author before the supplying can be believed.'}
                    {'\n\nWhat resolving hands onward is a library in which every reference is a card rather than a name, and that single fact is what makes the load boundary possible later. A card is a book present without the book. Once the links are cards, a page can follow an author, show a subject, and count what a book catalogues without opening any of them — which is not an optimisation somebody remembered to apply, but the ordinary consequence of having resolved names into references at the one moment when both were in the same room.'}
                    {'\n\nAnd one check survives all of this. Reciprocity used to be a rule with two directions to enforce; here it is a shape that is hard to break, because the book a subject names is held by that subject and being held is what makes the subject canonical for the book. The only way to break it is to name a book the subject does not hold, so that is the only thing left to test.'}
                    <Listed
                        of="the resolution, as the figure above runs it"
                        source={figures.slice(figures.indexOf('export type Declared'), figures.indexOf('export class $Resolving')).trim()}
                        caption="Where each answer comes from."
                    />
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA description becomes a library when every name becomes a reference — position answering one direction, the cover the other, and silence filled from where a book sits without touching what its author wrote.'}
                </Section>
            </>
        );
    }
}

export const TheLibrary = $($TheLibrary);
