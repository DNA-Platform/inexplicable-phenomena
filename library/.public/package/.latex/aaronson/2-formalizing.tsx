import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Formalizing P versus NP and Central Related Concepts</Heading>
            <Paragraph>Before the question can be argued about it has to be stated, and stating it takes a machine model, a notion of input length, and a definition of what it means to check an answer.</Paragraph>
            <Section>
                <Heading>NP-Completeness</Heading>
                <Paragraph>A problem is NP-complete when every problem in NP reduces to it in polynomial time. Cook and Levin showed that satisfiability is one, and Karp's twenty-one problems showed that the phenomenon is everywhere rather than a curiosity.</Paragraph>
            </Section>
            <Section>
                <Heading>Other Core Concepts</Heading>
                <Paragraph>The classes around NP are what give the question its shape, and each of them was introduced to answer something the previous one could not.</Paragraph>
                <Section>
                    <Heading>Search, Decision, and Optimization</Heading>
                    <Paragraph>Deciding whether a solution exists, producing one, and producing the best one are three different problems. For NP-complete problems they are equivalent up to polynomial factors, which is why the decision form is the one studied.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Twilight Zone: Between P and NP-complete</Heading>
                    <Paragraph>If the classes differ then Ladner's theorem guarantees problems in neither, and factoring and graph isomorphism are the candidates everyone reaches for.</Paragraph>
                </Section>
                <Section>
                    <Heading>coNP and the Polynomial Hierarchy</Heading>
                    <Paragraph>Complementing an NP problem gives coNP, and iterating the construction gives an infinite tower whose collapse would itself be a surprise.</Paragraph>
                </Section>
                <Section>
                    <Heading>Factoring and Graph Isomorphism</Heading>
                    <Paragraph>Both sit in NP and coNP, which is strong evidence that neither is NP-complete unless the hierarchy collapses. Babai's quasipolynomial algorithm moved graph isomorphism decisively toward the easy side.</Paragraph>
                </Section>
                <Section>
                    <Heading>Space Complexity</Heading>
                    <Paragraph>Space is a more forgiving resource than time, and PSPACE contains the whole polynomial hierarchy, which is why separating P from PSPACE is also open.</Paragraph>
                </Section>
                <Section>
                    <Heading>Counting Complexity</Heading>
                    <Paragraph>Counting solutions is harder than finding one: the permanent is complete for a counting class that sits above the whole hierarchy by Toda's theorem.</Paragraph>
                </Section>
                <Section>
                    <Heading>Beyond Polynomial Resources</Heading>
                    <Paragraph>Exponential-time classes admit separations by diagonalization, and the fact that those techniques stop exactly where they would settle this question is the first barrier.</Paragraph>
                </Section>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
