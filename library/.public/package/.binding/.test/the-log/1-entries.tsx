import { Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Title>[[ Entries ]]</Title>
        <Section>
            <Heading>The first entry</Heading>
            <Paragraph>
                The library was started, and its first shelf is <Means>$[ The Library / The Shelves ]</Means>. What it is
                for is said in <Means>$[ The Library / Synopsis ]</Means>, a synopsis whose title is parenthetical, so a
                reference lands on an id the page wears and does not show. The persona was given a voice the same day,
                and the first thing it wrote is <Means>$[ its paper ]( A Paper )</Means>, which opens with <Means>$[ A Paper / What is claimed ]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
