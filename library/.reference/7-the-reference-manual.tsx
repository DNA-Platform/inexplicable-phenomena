import { Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Reference Manual ]]</Title>
        <Section>
            <Heading>1. What a reference manual is</Heading>
            <Paragraph>
                <List />
                <Line>1.1 Every subject carries a reference manual: the specification of that subject in this library. This book is the library's own. I ruled this on 12 November 2026, at the opening of the textbook's sprint.</Line>
                <Line>1.2 A subject's manual keeps a part for the books of its subject, one chapter per book, and that chapter tracks the book's idioms — the conventions its chapters follow.</Line>
                <Line>1.3 Where an idiom is enforced by code, the code stands with the chapter that states it, the way this book's theme and faces stand beside theirs; an idiom followed by hand is stated in the same place and marked so.</Line>
                <Line>1.4 A manual is written the way a specification is — numbered parts, referenced code — in the form of <Means>$[[ ./The Specification ]]</Means>; I asked for this on 16 November 2026, and this chapter is the first so written.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The three shelves</Heading>
            <Paragraph>
                <List />
                <Line>2.1 What is true of every book in the library lives here, in Our Reference.</Line>
                <Line>2.2 What is true of a subject's books lives in that subject's manual. The first is <Means>$[[ Referential Objectivity ]]( Mathematical Reference )</Means>, whose part The Books tracks the notebook, the textbook, the project, the library and the design.</Line>
                <Line>2.3 What is true of one book alone stays beside that book, never in a manual.</Line>
            </Paragraph>
        </Section>
    </Chapter>
);
