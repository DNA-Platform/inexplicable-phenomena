import { Append, Chapter, Heading, Line, List, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Running Head and the Byline ]]</Title>
        <Section>
            <Heading>1. The running head</Heading>
            <Paragraph>
                <List />
                <Line>1.1 The running head is the book's title alone, the minimal heading in the page's top margin, ruled on 16 November 2026: pressed, it opens the table of contents, except on the table itself, where it opens the cover.</Line>
                <Line>1.2 One running head stands on every page, the title written twice with its destination carried by its own attribute and chosen by the theme in one place; the square to the cover stands beside it everywhere, the table's page like any other, since the table-ness is an attribute and not a different head.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The byline</Heading>
            <Paragraph>
                <List />
                <Line>2.1 The byline, who wrote the book, what it is about when the book is a subject's own, and its subject, is no longer drawn above the chapters; it lives on the front and in the table of contents.</Line>
                <Line>2.2 Both the running head and the byline are read from the cover and nowhere else; neither is written in a chapter. A subject is a book made one by its About, so the four books whose subject is Mathematics resolve to the book that is about it.</Line>
                <Line>2.3 The file beside this chapter is both faces, borrowed from the test library and kept as the sketches confirmed them.</Line>
            </Paragraph>
        </Section>
        <Listing />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
