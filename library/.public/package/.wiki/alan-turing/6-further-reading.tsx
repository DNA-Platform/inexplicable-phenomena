import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Further reading</Heading>
        </Section>
        <Section indent={1}>
            <Heading>Articles</Heading>
        </Section>
        <Section indent={1}>
            <Heading>Books</Heading>
        </Section>
    </Chapter>,
    Chapter
);
