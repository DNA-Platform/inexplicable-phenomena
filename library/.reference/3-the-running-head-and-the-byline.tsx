import { Append, Code, Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Running Head and the Byline ]]</Title>
        <Section>
            <Heading>What a cover exposes</Heading>
            <Paragraph>
                The running head is the book's title alone, the minimal heading in the page's top margin, ruled
                16 November 2026: pressed, it opens the table of contents — except on the table itself, where it
                opens the cover. The byline — who wrote the book, what it is about when the book is a subject's
                own, and its subject — is no longer drawn above the chapters; it lives on the front and in the
                table of contents. Both are read from the cover and nowhere else; neither is written in a
                chapter. A subject is a book made one by its About, so the four books whose subject is
                Mathematics resolve to the book that is about it. The file beside this chapter is both faces,
                borrowed from the test library.
            </Paragraph>
        </Section>
        <Code
            identifier="code"
            type=".tsx"
        />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
