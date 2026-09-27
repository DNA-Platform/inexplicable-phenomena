import { Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Title>[[ Who Writes Here ]]</Title>
        <Section>
            <Heading>Delegation</Heading>
            <Paragraph>
                The persona writes because <Means>$[ The Log ]</Means> said it may, by cataloguing it and by writing it.
                What it has written so far is <Means>$[ A Paper ]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
