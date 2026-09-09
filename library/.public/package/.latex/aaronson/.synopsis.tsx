// The paper's abstract, and it is the REAL one now — read off the PDF rather than written to fit.
// THE FRAMEWORK HAS NO $Abstract AND SHOULD NOT: an abstract IS a synopsis — the same class under
// a domain's word — so a paper writes the library's own kind and prints it, because a synopsis is
// parenthetical (present, not shown) unless a book asks for it.
import { $ } from '@dna-platform/chemistry';
import { Heading, Math, Paragraph, Section, Synopsis } from '@dna-platform/public';

export default $(
    <Synopsis print>
        <Section>
            <Heading>Abstract</Heading>
            <Paragraph>
                In 1955, John Nash sent a remarkable letter to the National Security Agency, in which—seeking
                to build theoretical foundations for cryptography—he all but formulated what today we call
                the <Math>{String.raw`\mathsf{P} \stackrel{?}{=} \mathsf{NP}`}</Math> problem, considered one of
                the great open problems of science. Here I survey the status of this problem in 2017, for a
                broad audience of mathematicians, scientists, and engineers. I offer a personal perspective on
                what it&rsquo;s about, why it&rsquo;s important, why it&rsquo;s reasonable to conjecture
                that <Math>{String.raw`\mathsf{P} \ne \mathsf{NP}`}</Math> is both true and provable, why proving
                it is so hard, the landscape of related problems, and crucially, what progress has been made in
                the last half-century toward solving those problems. The discussion of progress includes
                diagonalization and circuit lower bounds; the relativization, algebrization, and natural proofs
                barriers; and the recent works of Ryan Williams and Ketan Mulmuley, which (in different ways)
                hint at a duality between impossibility proofs and algorithms.
            </Paragraph>
        </Section>
    </Synopsis>,
    Synopsis
);
