import { $ } from '@dna-platform/chemistry';
import { Heading, Math, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Conclusion</Heading>
            <Paragraph>
                Independence is a mathematical claim and needs mathematical evidence. The evidence we have is that
                several proof techniques cannot separate <Math>{String.raw`\mathsf{P}`}</Math> from <Math>{String.raw`\mathsf{NP}`}</Math>,
                and every one of those results is a theorem about the technique rather than about the question.
            </Paragraph>
            <Section>
                <Heading>Open problems</Heading>
                <Paragraph>
                    Whether a natural proof barrier exists for the arithmetic hierarchy above <Math>{String.raw`\Pi_2`}</Math> is
                    open, and would be the first evidence of the kind the independence claim actually needs.
                </Paragraph>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
