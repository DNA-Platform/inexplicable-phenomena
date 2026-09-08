import { $ } from '@dna-platform/chemistry';
import { Heading, Math, Paragraph, Section } from '@dna-platform/public';
import { Appendix } from '@dna-platform/public/article';

export default $(
    <Appendix>
        <Section>
            <Heading>A proof sketch</Heading>
            <Paragraph>
                The argument of section two goes through unchanged if <Math>{String.raw`\mathsf{ZFC}`}</Math> is replaced by any
                theory interpreting Robinson arithmetic, which is what makes it a statement about arithmetic rather
                than about set theory.
            </Paragraph>
        </Section>
    </Appendix>,
    Appendix
);
