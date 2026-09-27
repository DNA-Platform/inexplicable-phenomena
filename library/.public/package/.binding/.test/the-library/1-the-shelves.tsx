import { Chapter, Heading, Means, Mention, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Shelves ]]</Title>
        <Section>
            <Heading>What stands here</Heading>
            <Paragraph>
                Three books stand directly under this one. <Means>$[ The Log ]</Means> is the book that writes the
                others, <Means>$[ Some Projects ]</Means> is what has been worked on, and <Means>$[ A Paper ]</Means> was
                written by a persona the log vouched for. The persona itself, <Means>$[ A Persona ]</Means>, stands under the log rather
                than here, which is the shape a library takes when one voice writes as two.
            </Paragraph>
            <Paragraph>
                <Mention>[[[ The First Shelf ]]]</Mention> is the one the log stands on, and a reference reaches it by name.
            </Paragraph>
            <Paragraph>
                The log says as much of itself: it stands on <Means>$[ ./The First Shelf ]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
