import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import $Chapter from './.chapter';
import Document from './.document';

export default class $Notes extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>Notes</Heading>
                </Section>
            </Document>
        );
    }
}
