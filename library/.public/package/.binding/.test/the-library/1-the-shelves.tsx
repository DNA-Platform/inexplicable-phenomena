import { $Chapter, Document, Heading, Paragraph, Ref, Section, Title } from '@dna-platform/public';

export default class $TheShelves extends $Chapter {
    print() {
        return (
            <Document>
                <Title>The Shelves</Title>
                <Section>
                    <Heading>What stands here</Heading>
                    <Paragraph>
                        Three books stand directly under this one. <Ref>$[ The Log ]</Ref> is the book that writes the others,
                        <Ref>$[ Some Projects ]</Ref> is what has been worked on, and <Ref>$[ A Paper ]</Ref> was written by a persona
                        the log vouched for. The persona itself, <Ref>$[ A Persona ]</Ref>, stands under the log rather than
                        here, which is the shape a library takes when one voice writes as two.
                    </Paragraph>
                    <Paragraph>
                        [[[ The First Shelf ]]] is the one the log stands on, and a reference reaches it by name.
                    </Paragraph>
                    <Paragraph>
                        The log says as much of itself: it stands on $[ ./The First Shelf ].
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
