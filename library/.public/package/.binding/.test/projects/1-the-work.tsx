import { Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

// [[ A Ghost Title ]] — a form in a comment names nothing: the compiler reads writing, never the
// machinery around it, so this chapter is The Work and this line is left as it is. Sprint 90.
export default () => (
    <Chapter>
        <Title>[[ The Work ]]</Title>
        <Section>
            <Heading>A chapter with no references</Heading>
            <Paragraph>
                Some chapters name nothing. This one is here so that the compiler has a chapter to leave alone, and so
                that a reference from another book has somewhere ordinary to land.
            </Paragraph>
            <Paragraph>
                Above this chapter's code stands a comment carrying a title form. The compiler reads writing and never
                the machinery around it, so this chapter is The Work, and that comment is the one kept in this library,
                as the fixture of the promise that says so.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
