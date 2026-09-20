import { $Chapter, Document, Heading, Paragraph, Ref, Section, Title } from '@dna-platform/public';

export default class $WhoWritesHere extends $Chapter {
    print() {
        return (
            <Document>
                <Title>Who Writes Here</Title>
                <Section>
                    <Heading>Delegation</Heading>
                    <Paragraph>
                        The persona writes because $[ The Log ] said it may, by cataloguing it and by naming
                        itself as its author. What it has written so far is $[ A Paper ].
                    </Paragraph>
                </Section>
            </Document>
        );
    }
}
