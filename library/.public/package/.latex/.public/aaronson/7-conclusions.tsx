import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default $(
    <Document>
        <Section>
            <Heading>Conclusions</Heading>
            <Paragraph>Some will say that this survey’s very length, the bewildering zoo of approaches and variations and results and barriers that it covered, is a sign that no one has any real clue about the P = NP problem—or at least, that I don’t. Among those who think that, perhaps someone will write a shorter survey that points unambiguously to the right way forward!</Paragraph>
        </Section>
    </Document>,
    Document
);
