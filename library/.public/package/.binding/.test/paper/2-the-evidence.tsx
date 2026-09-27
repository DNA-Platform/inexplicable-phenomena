import { Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Evidence ]]</Title>
        <Section>
            <Heading>What was found</Heading>
            <Paragraph>
                A chapter that is referred to from elsewhere and refers to nothing itself. Its title's url carries the
                fragment its element wears, so a reference to it has somewhere to land.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
