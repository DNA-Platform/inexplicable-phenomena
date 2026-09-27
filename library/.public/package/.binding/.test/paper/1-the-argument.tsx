import { Bold, Break, Chapter, Emphasis, Heading, Means, Paragraph, Section, Space, Title, Underline, Word } from '@dna-platform/public';
import { Catchword, RunningHead } from '../the-library/1-the-shelves.tsx.tsx';

// EVERY WAY A REFERENCE CAN BE WRITTEN, IN ONE CHAPTER: a book by name, a chapter of this book, a
// chapter of another book, a reference that shows its own words — and one written in a STRING,
// which compiles to the same thing prose does. A transform that gets one of these wrong gets it
// wrong here, where a test is reading. AND IT WEARS THE LIBRARY'S RUNNING HEAD, which names this
// book and links to its table while nothing in this file names the book. AND ITS HEADING IS A
// MENTION, so the log can refer to what is claimed from a page away and land on it.
const evidence = '$[ ./The Evidence ]';

export default () => (
    <Chapter>
        <Title>[[ The Argument ]]</Title>
        <RunningHead />
        <Section>
            <Heading>[[[ What is claimed ]]]</Heading>
            <Paragraph>
                A reference <Word><Emphasis />names</Word> a thing and <Word><Bold />never</Word> a <Word><Underline />place</Word>. The library this paper stands in is
                <Means>$[ The Library ]</Means>; what supports the claim is <Means>$[ ./The Evidence ]</Means>; the work
                it grew out of is <Means>$[ Some Projects / The Work ]</Means>; and the book that keeps the record is
                <Means>$[ the log ]( The Log )</Means>.
            </Paragraph>
            <Paragraph>
                And the evidence is in <Means>{evidence}</Means>.<Break />
                Set apart by a break,<Space length={3} />and spaced by three.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
