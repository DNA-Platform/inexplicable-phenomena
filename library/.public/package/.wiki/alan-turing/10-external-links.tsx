import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default class $ExternalLinks extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>External links</Heading>
                </Section>
            </Document>
        );
    }
}
