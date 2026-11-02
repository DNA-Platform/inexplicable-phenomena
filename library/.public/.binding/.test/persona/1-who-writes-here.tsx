import { Chapter, Heading, Line, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ Who Writes Here ]]</Title>
        <Section>
            <Heading>[[[ Delegation ]]]</Heading>
            <Paragraph>
                The persona writes because <Means>$[[ Libby ]]</Means> said it may, by cataloguing it and by writing it:
                it is, in her words, <Means>$[[ a voice she lent out ]]( Libby / A voice I lent out )</Means>. What it has
                written so far is <Means>$[[ A Paper ]]</Means>, <Means>$[[ a paper she did not write ]]( Libby / A paper I did not write )</Means>.
            </Paragraph>
            <Paragraph>
                This book is a biography: written by Libby about a persona of hers and filed under her. It is about
                itself, so it is a subject in turn, and the paper it writes may be authored by it, since a book may
                author when the autobiography is its subject. Its face is Literary, a face of its own in front of the
                library's theme, and its book frames every chapter at its bind, once the book is whole, with the same
                Framed that Some Projects stands on itself. The heading above is a mention, so Libby can send a reader
                here.
            </Paragraph>
            <Paragraph>
                What follows is a poem in Lines. A Line is a Sentence that is Block, so each stands on a line of its
                own with no break written between them.
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
