import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title as PlainTitle } from '@/writing/Title';
import { ChapterHeading as Title, Circuit, Slipped } from './figures';
import { theTeam } from './card';

export class $TheDecision extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Decision</Title>
                    <Paragraph>{'Three books on a shelf, and a question nobody had asked out loud: who wrote them.'}</Paragraph>
                    <Paragraph>{'The library cannot answer that, and the reason is a rule it has kept from the beginning — it holds books, and a person is not a book. The most it can hand you when you ask who wrote this is the account of them. So an author is not a name pointing at someone. It is a reference pointing at a book, and the book it points at has to be the one that tells the story of the thing doing the writing.'}</Paragraph>
                    <Paragraph>{'“The author is always something that represents the identity that makes the library in some way. It is the loop because it cannot be reduced to some other thing.” That was said before any of this existed, and it is why there is one author here rather than ten. An author that could be broken into the people who did the work would point at parts, and the arrow would never come home.'}</Paragraph>
                    <Paragraph>{'Which is when the proposal arrived, and it arrived as a joke before it was a plan: write a fourth book about the three being made, and let all four point their authorship at it. The joke was that it would then have to point at itself.'}</Paragraph>
                    <Paragraph>{'We did not know that could be built. The problem states itself in one line — the book must exist before its own author reference can resolve — and there is no ordering of construction that gets you out of it. You cannot hand a book to a reference inside the book being handed over.'}</Paragraph>
                    <Paragraph>{'The card is what got us out, and it got us out by being smaller. A card is written independently of the thing it stands for. So the fourth book’s author link does not point at the fourth book. It points at the fourth book’s card, and the card was already on the table before a word of the book was written.'}</Paragraph>
                    <Circuit books={['The Algebra of Perspective', 'The Manifold of Sentences', 'The Shelf', 'The Team']} home="The Team">Four books, four author links, one destination — and the fourth is the one that points at itself.</Circuit>
                    {''}
                    <Slipped card={theTeam}>This book’s own card, printing what is on it — and its author line is the card itself.</Slipped>
                    <Paragraph>{'Nothing new had to be invented for that arrow to come home. That is worth saying plainly, because we expected to invent something and the design turned out to be better than we were: the card built for cataloguing is exactly what a self-reference needs, for the same reason in both cases — you can carry a card, and you cannot carry a book.'}</Paragraph>
                    <Paragraph>{'So this is the passage where the book records the decision to be written. It is not a memoir about one. The link that makes it the canonical account of this library is one of the four above, and it is the one pointing at itself. If you follow it, you arrive here.'}</Paragraph>
                </Section>
                <Summary>
                    <PlainTitle>Summary</PlainTitle>
                    <Paragraph>{'The fourth book decided on, and the loop closed by pointing at a card rather than at a book.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheDecision = $($TheDecision);
