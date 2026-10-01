import { Chapter, Heading, Parenthetical, TableOfContents, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';
import { Entries } from './.table.tsx.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Entries>
            <Heading>Contents</Heading>
        </Entries>
        <Catchword />
    </Chapter>
);
