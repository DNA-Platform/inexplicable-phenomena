import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Further reading</Heading>
            <Section>
                <Heading>Articles</Heading>
            </Section>
            <Section>
                <Heading>Books</Heading>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
