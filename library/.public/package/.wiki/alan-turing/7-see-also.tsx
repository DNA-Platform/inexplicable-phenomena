import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default $(
    <Document>
        <Section>
            <Heading>See also</Heading>
            <Section>
                <Heading>Works cited</Heading>
            </Section>
        </Section>
    </Document>,
    Document
);
