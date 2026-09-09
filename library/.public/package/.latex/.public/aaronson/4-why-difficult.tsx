import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Why Is Proving P ≠ NP Difficult?</Heading>
            <Paragraph>Three barriers stand in the way, and each rules out a whole family of techniques rather than a particular attempt: relativization, natural proofs, and algebrization.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
