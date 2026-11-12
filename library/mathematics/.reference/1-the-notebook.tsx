import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Books</Part>
        <Title>[[ The Notebook ]]</Title>
        <Paragraph>
            The notebook takes the notes. Nothing in it is official: it is where rulings, analogies and
            specifications live while the textbook is not ready to state them. The notebook of the first subject
            is <Means>$[[ The Notebook of Arithmetic ]]( Arithmetic Notebook )</Means>.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>A chapter names its part with the Part annotation and opens with one provenance paragraph: where the note came from and on whose word it stands.</Line>
            <Line>Only Doug is quoted. Everyone else — a paper, a session, a teammate — is paraphrased, with the source named.</Line>
            <Line>Titles are short names, and no heading on the page repeats a title or another heading.</Line>
            <Line>Every chapter gets its row on the table of contents and its clause in the synopsis, written in the same act.</Line>
            <Line>A resource stands beside its chapter, named for it with a tilde.</Line>
        </Paragraph>
        <Paragraph>
            One idiom is enforced by code: every quoted span of four or more words must stand in a conversation's
            message or a sprint record, and the checker beside <Means>$[[ The Sources ]]( Arithmetic Notebook / The Sources )</Means> proves
            it, failing the loop until every span is found. The rest are held by hand.
        </Paragraph>
    </Chapter>
);
