import { $Chapter, Document, Heading, Paragraph, Ref, Section, Title } from '@dna-platform/public';

export default class $TheShelves extends $Chapter {
    print() {
        return (
            <Document>
                <Title>The Shelves</Title>
                <Section>
                    <Heading>What stands here</Heading>
                    <Paragraph>
                        Three books stand directly under this one. $[ The Log ] is the book that writes the others,
                        $[ Some Projects ] is what has been worked on, and $[ A Paper ] was written by a persona
                        the log vouched for. The persona itself, $[ A Persona ], stands under the log rather than
                        here, which is the shape a library takes when one voice writes as two.
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
