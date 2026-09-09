import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import { Footer, OutwardLink } from '../.document';

export const footer = $(
    <Footer>
        <Section>
            <Heading>Colophon</Heading>
            <Paragraph>Text is available under the Creative Commons Attribution-ShareAlike License; additional terms may apply.</Paragraph>
            <Paragraph><OutwardLink>[Terms of Use](https://foundation.wikimedia.org/wiki/Terms_of_Use)</OutwardLink><OutwardLink>[Privacy Policy](https://foundation.wikimedia.org/wiki/Privacy_policy)</OutwardLink><OutwardLink>[About Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:About)</OutwardLink></Paragraph>
        </Section>
    </Footer>,
    Footer
);
