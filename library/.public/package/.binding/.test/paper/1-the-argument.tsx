import { Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';

// EVERY WAY A REFERENCE CAN BE WRITTEN, IN ONE CHAPTER: a book by name, a chapter of this book, a
// chapter of another book, a reference that shows its own words — and one written in a STRING,
// which compiles to the same thing prose does. A transform that gets one of these wrong gets it
// wrong here, where a test is reading.
const evidence = '$[ ./The Evidence ]';

export default () => (
    <Chapter>
        <Title>[[ The Argument ]]</Title>
        <Section>
            <Heading>What is claimed</Heading>
            <Paragraph>
                A reference names a thing and never a place. The library this paper stands in is
                <Means>$[ The Library ]</Means>; what supports the claim is <Means>$[ ./The Evidence ]</Means>; the work
                it grew out of is <Means>$[ Some Projects / The Work ]</Means>; and the book that keeps the record is
                <Means>$[ the log ]( The Log )</Means>.
            </Paragraph>
            <Paragraph>And the evidence is in <Means>{evidence}</Means>.</Paragraph>
        </Section>
    </Chapter>
);
