import { Bold, Break, Chapter, Emphasis, Heading, Means, Paragraph, Section, Space, Title, Underline, Word } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

const evidence = '$[[ ./The Evidence ]]';

export default () => (
    <Chapter>
        <Title>[[ The Argument ]]</Title>
        <Section>
            <Heading>[[[ What is claimed ]]]</Heading>
            <Paragraph>
                A reference <Word><Emphasis />names</Word> a thing and <Word><Bold />never</Word> a <Word><Underline />place</Word>.
                The library this paper stands in is <Means>$[[ The Library ]]</Means>; what supports the claim is
                <Means>$[[ ./The Evidence ]]</Means>; the work it grew out of is <Means>$[[ Some Projects / The Work ]]</Means>;
                and the book that keeps the record is <Means>$[[ Libby ]]</Means>.
            </Paragraph>
            <Paragraph>
                And the evidence is in <Means>{evidence}</Means>.<Break />
                Set apart by a break,<Space length={3} />and spaced by three.
            </Paragraph>
        </Section>
        <Section>
            <Heading>What this chapter tests</Heading>
            <Paragraph>
                Every way a reference can be written stands in one chapter: a book by name, a chapter of this book, a
                chapter of another book, a reference that shows its own words, and one written in a string, which
                compiles to the same thing prose does. A transform that gets one of these wrong gets it wrong here,
                where a test is reading. The heading above is a mention, so the librarian can refer to what is claimed
                from a page away and land on it; and this book is typewritten, as a manuscript is, by a face that is
                the manual's.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
