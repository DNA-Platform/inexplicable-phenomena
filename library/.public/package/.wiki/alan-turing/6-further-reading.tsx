import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default $(
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
    </Document>,
    Document
);
