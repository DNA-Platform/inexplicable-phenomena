import { Chapter, Heading, Line, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

// A POEM IN LINES: a Line is a Sentence that is Block, so each stands on a line of its own with no break
// written between them — Doug, 2026-09-27: "a Line could be a type of sentence in a div so that lines of
// a poem, or something like that, might look good."
export default () => (
    <Chapter>
        <Title>[[ Who Writes Here ]]</Title>
        <Section>
            <Heading>Delegation</Heading>
            <Paragraph>
                The persona writes because <Means>$[ Libby ]</Means> said it may, by cataloguing it and by writing it.
                What it has written so far is <Means>$[ A Paper ]</Means>.
            </Paragraph>
            <Paragraph>
                <Line>A voice Libby lent out,</Line>
                <Line>and filed beneath itself,</Line>
                <Line>writes papers of its own.</Line>
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
