// The paper's abstract, written as one: a paper has an abstract and the article door carries it.
// The REAL one now — read off the PDF rather than written to fit.
// An abstract is parenthetical, like the synopsis it is one of: present, and shown where asked.
import { $ } from '@dna-platform/chemistry';
import { Heading, Math, Paragraph, Section } from '@dna-platform/public';
import $Chapter from './.chapter';
import { Abstract } from '@dna-platform/public/article';

export default class $Synopsis extends $Chapter {
    print() {
        return (
            <Abstract print>
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
            </Abstract>
        );
    }
}
