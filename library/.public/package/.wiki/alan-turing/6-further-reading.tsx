import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default class $FurtherReading extends $Chapter {
    view() {
        return (
            <Document>
                <Section>
                    <Heading>Further reading</Heading>
                    <Section>
                        <Heading>Articles</Heading>
                    </Section>
                    <Section>
                        <Heading>Books</Heading>
                    </Section>
                </Section>
            </Document>
        );
    }
}
