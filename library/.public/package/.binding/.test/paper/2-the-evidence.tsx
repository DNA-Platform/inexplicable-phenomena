import { $Chapter, Document, Heading, Paragraph, Section, Title } from '@dna-platform/public';

export default class $TheEvidence extends $Chapter {
    print() {
        return (
            <Document>
                <Title>The Evidence</Title>
                <Section>
                    <Heading>What was found</Heading>
                    <Paragraph>
                        A chapter that is referred to from elsewhere and refers to nothing itself. Its title prints,
                        so the page gives it an id, so a reference to it has somewhere to land.
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
