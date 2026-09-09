import { $ } from '@dna-platform/chemistry';
import { Citation, Heading, List, Math, Paragraph, Section } from '@dna-platform/public';
import { Footnote } from '@dna-platform/public/article';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Introduction</Heading>
            <Paragraph>
                The question of whether <Math>{String.raw`\mathsf{P} = \mathsf{NP}`}</Math> has been open since it was posed
                by Cook<Citation>[1](#References)</Citation> and independently by Levin. A proof either way would settle
                whether every problem whose solutions can be checked quickly can also be solved quickly, and it is
                the rare open question whose statement a non-specialist can hold in mind while the difficulty of
                answering it remains entirely out of view.
            </Paragraph>
            <Paragraph>
                It is sometimes suggested that the question is not merely open but formally independent of the axioms
                we reason with. This paper asks what such a claim would have to mean, and what would count as evidence
                for it.<Footnote>The suggestion is older than it looks; Hartmanis and Hopcroft raised it in 1976.</Footnote>
            </Paragraph>

            <Section>
                <Heading>The Importance of P versus NP</Heading>
                <Paragraph>
                    The practical reading is the least interesting one. What makes the question central is that a
                    proof of <Math>{String.raw`\mathsf{P} \ne \mathsf{NP}`}</Math> would be a proof that some
                    finite search cannot be shortened, and we have almost no techniques for proving that anything
                    cannot be shortened.
                </Paragraph>
            </Section>

            <Section>
                <Heading>Objections</Heading>
                <Paragraph>
                    Several objections recur, and it is worth separating them because they fail for different reasons.
                </Paragraph>

                <Section>
                    <Heading>The Asymptotic Objection</Heading>
                    <Paragraph>
                        Polynomial time is an asymptotic notion, and a polynomial of degree one hundred is not fast.
                        The objection is correct and does not bear on the question, which is about a boundary rather
                        than about any particular algorithm on that boundary.
                    </Paragraph>
                </Section>

                <Section>
                    <Heading>The Polynomial-Time Objection</Heading>
                    <Paragraph>
                        A related complaint holds that the class is an artefact of the model. It is not: the class is
                        stable across every reasonable model of computation anyone has proposed, which is the
                        strongest evidence available that it names something real.
                    </Paragraph>
                </Section>

                <Section>
                    <Heading>The Obviousness Objection</Heading>
                    <Paragraph>
                        The answer is obvious, the objection runs, so the problem is uninteresting. The answer is
                        indeed widely believed. What is not obvious is the proof, and the gap between belief and
                        proof is exactly the subject.
                    </Paragraph>
                </Section>

                <Section>
                    <Heading>The Constructivity Objection</Heading>
                    <Paragraph>
                        A non-constructive separation would tell us nothing useful. This is the only objection that
                        touches the independence claim, and it does so obliquely: an independence result is a
                        statement about what proofs exist, not about what algorithms do.
                    </Paragraph>
                </Section>
            </Section>

            <Section>
                <Heading>Further Reading</Heading>
                <Paragraph>
                    Three readings of the independence claim are usually run together, and they are not the same:
                </Paragraph>
                <List>
                    - that the question is undecidable in ZFC
                    - that no proof exists in any system we would accept
                    - that the answer depends on the model, as the continuum hypothesis does
                </List>
                <Paragraph>
                    The barriers literature is the place to start, and Baker, Gill and
                    Solovay<Citation>[3](#References)</Citation> is where it begins.
                </Paragraph>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
