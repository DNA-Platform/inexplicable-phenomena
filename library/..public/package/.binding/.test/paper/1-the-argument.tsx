import { $Chapter, Document, Heading, Paragraph, Ref, Section, Title } from '@dna-platform/public';

// EVERY WAY A REFERENCE CAN BE WRITTEN, IN ONE CHAPTER: a book by name, a chapter of this book, a
// chapter of another book, a reference that shows its own words — and one written in a STRING,
// which compiles to the same thing prose does. A transform that gets one of these wrong gets it
// wrong here, where a test is reading.
const supporting = 'and the evidence is in $[ ./The Evidence ]';

export default class $TheArgument extends $Chapter {
    print() {
        return (
            <Document>
                <Title>The Argument</Title>
                <Section>
                    <Heading>What is claimed</Heading>
                    <Paragraph>
                        A reference names a thing and never a place. The library this paper stands in is
                        <Ref>$[ The Library ]</Ref>; what supports the claim is <Ref>$[ ./The Evidence ]</Ref>; the work it grew out of
                        is <Ref>$[ Some Projects / The Work ]</Ref>; and the book that keeps the record is
                        <Ref>$[ the log ]( The Log )</Ref>.
                    </Paragraph>
                    <Paragraph>{supporting}</Paragraph>
                </Section>
            </Document>
        );
    }
}
