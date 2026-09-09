// The paper's abstract. THE FRAMEWORK HAS NO $Abstract AND SHOULD NOT: an abstract IS a synopsis —
// the same class under a domain's word — so a paper writes the library's own kind and prints it,
// because a synopsis is parenthetical (present, not shown) unless a book asks for it.
import { $ } from '@dna-platform/chemistry';
import { Heading, Math, Paragraph, Section, Synopsis } from '@dna-platform/public';

export default $(
    <Synopsis print>
        <Section>
            <Heading>Abstract</Heading>
            <Paragraph>
                We survey the possibility that <Math>{String.raw`\mathsf{P} \ne \mathsf{NP}`}</Math> is independent of the standard axioms of set theory. Although we do not settle the question, we argue that the evidence
                for independence is weaker than it is often taken to be, and that the proof techniques known to be
                insufficient are insufficient for reasons that are themselves mathematical rather than logical.
            </Paragraph>
        </Section>
    </Synopsis>,
    Synopsis
);
