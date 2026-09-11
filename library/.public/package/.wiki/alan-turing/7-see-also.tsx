import { $ } from '@dna-platform/chemistry';
import { $Chapter, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default class $SeeAlso extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>See also</Heading>
                    <Section>
                        <Heading>Works cited</Heading>
                    </Section>
                </Section>
            </Document>
        );
    }
}
