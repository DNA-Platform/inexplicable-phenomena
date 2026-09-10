import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default class $Notes extends $Chapter {
    view() {
        return (
            <Document>
                <Section>
                    <Heading>Notes</Heading>
                </Section>
            </Document>
        );
    }
}
