import { Append, Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';

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
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
