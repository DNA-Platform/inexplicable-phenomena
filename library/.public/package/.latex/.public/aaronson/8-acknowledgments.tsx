import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Acknowledgments</Heading>
            <Paragraph>This survey draws on conversations with more people than can be listed, and on the barriers literature that made the shape of the difficulty visible in the first place.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
