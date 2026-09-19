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
                        $[ The Library ]; what supports the claim is $[ ./The Evidence ]; the work it grew out of
                        is $[ Some Projects / The Work ]; and the book that keeps the record is
                        $[ the log ]( The Log ).
                    </Paragraph>
                    <Paragraph>{supporting}</Paragraph>
                </Section>
            </Document>
        );
    }
}
