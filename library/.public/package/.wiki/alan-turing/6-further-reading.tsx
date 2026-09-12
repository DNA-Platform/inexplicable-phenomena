import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import $Chapter from './.chapter';
import Document from './.document';

export default class $FurtherReading extends $Chapter {
    print() {
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
