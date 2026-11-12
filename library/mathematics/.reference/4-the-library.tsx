import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Books</Part>
        <Title>[[ The Library ]]</Title>
        <Paragraph>
            The library of a subject holds the publications its work leans on. The first
            is <Means>$[[ The Library of Mathematics ]]( Mathematical Library )</Means>.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>A publication is a chapter, keyed by author and year in the form of Gödel 1931, and the table lists the rows alphabetically by key.</Line>
            <Line>A free text is held beside its chapter with its file and a plate of the first page; a copyrighted one is cited by address.</Line>
            <Line>The chapter carries the citation and the notes; the citing books refer in by the key, and the chapter's writeup refers back to them.</Line>
        </Paragraph>
        <Paragraph>
            Enforced by code: the prover in the branch library, the tool of the book Inexplicable Phenomena's third
            chapter, opens every row in a real browser, follows the plate to the held file or the address, and fails
            on a landing that does not answer. The keys and the rows are held by hand.
        </Paragraph>
    </Chapter>
);
