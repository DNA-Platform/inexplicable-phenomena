import { $Chapter, Document, Heading, Paragraph, Ref, Section, Title } from '@dna-platform/public';

export default class $Entries extends $Chapter {
    print() {
        return (
            <Document>
                <Title>Entries</Title>
                <Section>
                    <Heading>The first entry</Heading>
                    <Paragraph>
                        The library was started, and its first shelf is $[ The Library / The Shelves ]. The
                        persona was given a voice the same day, and the first thing it wrote is
                        $[ its paper ]( A Paper ).
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
