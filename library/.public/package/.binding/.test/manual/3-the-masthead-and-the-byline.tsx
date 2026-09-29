import { Append, Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Masthead and the Byline ]]</Title>
        <Section>
            <Heading>Where a reader is</Heading>
            <Paragraph>
                The masthead is a running head: the library's name as a link to the library, then the book it stands
                in and a link to that book's table, read from the book alone, so a chapter that wears it never names
                its book and a book renamed is followed with no edit. On the library's own page the library stands
                alone. The byline says who wrote the book and where it stands, each under a label, read from the
                book's cover alone, so nobody has to guess which link is the author and which the subject.
            </Paragraph>
            <Paragraph>
                The file holds three classes: the running head, a label, and the byline of two labelled rows. Each is
                a paragraph the book draws in its own write, and each reads what the book exposes of itself and
                nothing more. The file is printed whole in the chapter's appendix, <Means>$[[ ./The masthead's file ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The masthead's file ]]]</Heading>
            <Paragraph><Code identifier="code" numbered /></Paragraph>
        </Section>
        <Catchword />
        <Append identifier="code" type=".tsx">![[ code.tsx ]]</Append>
    </Chapter>
);
