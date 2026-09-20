import { $Chapter, Document, Heading, Paragraph, Ref, Section, Title } from '@dna-platform/public';

export default class $Entries extends $Chapter {
    print() {
        return (
            <Document>
                <Title>Entries</Title>
                <Section>
                    <Heading>The first entry</Heading>
                    <Paragraph>
                        The library was started, and its first shelf is $[ The Library / The Shelves ]. What it
                        is for is said in $[ The Library / Synopsis ], a synopsis whose title does not print,
                        so the reference leads to the page it is part of. The persona was given a voice the same
                        day, and the first thing it wrote is $[ its paper ]( A Paper ).
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
