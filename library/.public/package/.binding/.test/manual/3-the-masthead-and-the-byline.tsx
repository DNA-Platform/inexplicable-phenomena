import { Chapter, Code, Heading, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Masthead and the Byline ]]</Title>
        <Section>
            <Heading>Where a reader is</Heading>
            <Paragraph>
                The masthead says where a reader is: the library, the book, and a link to the book's table. The byline
                says who wrote the book and where it stands, each under a label, so nobody has to guess which link is
                the author and which the subject. Both read the book they stand in and nothing else, so I never name
                a book in them, and a book renamed is followed with no edit.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The masthead's file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
