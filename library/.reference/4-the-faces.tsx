import { Append, Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Faces ]]</Title>
        <Section>
            <Heading>A cover, a synopsis, a table</Heading>
            <Paragraph>
                A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the
                table of contents that answers for its chapters and, when the book is a subject, for what is filed
                under it. Each is a word of the package dressed here, and every book of this library wears these
                four from the file beside this chapter, borrowed from the test library until a sketch replaces them.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The front</Heading>
            <Paragraph>
                Since 10 November 2026 the cover is drawn as a book: the front, in the file beside this chapter, a
                board of a book's shape standing alone on the page while the cover is the open page, with the title,
                the author, the synopsis and the imprint on it, read from what the cover and the synopsis already say,
                as the byline is; its words are its links, the title opening the table of contents, the author and the
                subject their books, the library's name the library, and the running head, the byline and the
                cover's own title stand unseen behind it until another page opens. The theme draws it and gives a page that opens its one transition, a short fade.
                Sketch 004 of <Means>$[[ Mathematical Design / The Paper's Page ]]</Means>, form a, by Doug's number.
            </Paragraph>
        </Section>
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
