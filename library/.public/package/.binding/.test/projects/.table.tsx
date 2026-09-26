import { Chapter, Heading, Parenthetical, TableOfContents, Title } from '@dna-platform/public';
import { Entries } from './.table.tsx.tsx';

// THE ONE TABLE OF THE TEST LIBRARY THAT IS DRAWN rather than written: its entries come from what its
// book's chapters mention, so nothing here names a chapter — Doug: "the table of contents is an
// attribute, the links are dynamic... and if one doesn't want to use the dynamic links they can hand
// write them with compiler syntax." The other four books hand-write theirs.
export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Entries>
            <Heading>Contents</Heading>
        </Entries>
    </Chapter>
);
