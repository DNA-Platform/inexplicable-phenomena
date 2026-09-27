import { Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Work ]]</Title>
        <Section>
            <Heading>A chapter with no references</Heading>
            <Paragraph>
                Some chapters name nothing. This one is here so that the compiler has a chapter to leave alone, and so
                that a reference from another book has somewhere ordinary to land.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
