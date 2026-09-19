import { $Chapter, Document, Heading, Paragraph, Section, Title } from '@dna-platform/public';

export default class $TheWork extends $Chapter {
    print() {
        return (
            <Document>
                <Title>The Work</Title>
                <Section>
                    <Heading>A chapter with no references</Heading>
                    <Paragraph>
                        Some chapters name nothing. This one is here so that the compiler has a chapter to leave
                        alone, and so that a reference from another book has somewhere ordinary to land.
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
