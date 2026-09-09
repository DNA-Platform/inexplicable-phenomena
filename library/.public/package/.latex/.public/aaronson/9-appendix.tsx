import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Appendix: Glossary of Complexity Classes</Heading>
            <Paragraph>The classes named in this survey, with the definitions used here: P, NP, coNP, the polynomial hierarchy, PSPACE, EXP, NEXP, BPP, BQP, ACC, and the counting classes that sit above them.</Paragraph>
        </Section>
    </Chapter>,
    Chapter
);
