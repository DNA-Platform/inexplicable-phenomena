import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>See also</Heading>
            <Section>
                <Heading>Works cited</Heading>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
