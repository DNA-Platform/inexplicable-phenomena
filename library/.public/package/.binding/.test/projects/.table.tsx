import { Chapter, Content, Heading, Paragraph, Parenthetical, TableOfContents, Title, Word } from '@dna-platform/public';
import { Catchword } from '../manual/.book';
import { Entries } from './.table.tsx.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Entries>
            <Heading>Contents</Heading>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Some Projects ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Synopsis ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Table of Contents ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./The Work ]]</Content>
                </Word>
            </Paragraph>
        </Entries>
        <Catchword />
    </Chapter>
);
