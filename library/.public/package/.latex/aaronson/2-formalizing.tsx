import { $ } from '@dna-platform/chemistry';
import { Citation, Document, Equation, Figure, Heading, Paragraph, Section } from '@dna-platform/public';
import { $AaronsonChapter as $Chapter } from './.book';

export default class $Formalizing extends $Chapter {
    print() {
        return (
            <Document>
                <Section>
                    <Heading>Formalizing P = NP and Central Related Concepts</Heading>
                    <Paragraph>The P = NP problem is normally phrased in terms of Turing machines: a theoretical model of computation proposed by Alan Turing in 1936, which involves a one-dimensional tape divided into discrete squares, and a finite control that moves back and forth on the tape, reading and writing symbols. For a formal definition, see, e.g., Sipser <Citation>sipser2005</Citation> or Cook <Citation>cook2000</Citation>.</Paragraph>
                    <Section>
                        <Heading>NP-Completeness</Heading>
                        <Paragraph>A further concept, not part of the statement of P = NP but central to any discussion of it, is NP-completeness. To explain this requires a few more definitions. An oracle Turing machine is a Turing machine that, at any time, can submit an instance x to an “oracle”: a device that, in a single time step, returns a bit indicating whether x belongs to some given language L. Though it sounds fanciful, this notion is what lets us relate different computational problems to each other, and as such is one of the central concepts in computer science. An oracle that answers all queries consistently with L is called an L-oracle, and we write M to denote the (oracle) Turing machine M with L-oracle. We can then define P , or P relative to L, as the class of all languages L for which there exists an oracle machine M such that ML decides L′ in polynomial time. If L′ ∈ PL, then we also write L ≤P L, which means “L is polynomial-time Turing-reducible to L.” Note that polynomial-time Turing-reducibility is indeed a partial order relation (i.e., it’s transitive and reflexive).</Paragraph>
                        <Figure source="/figure-1.png" width="55%">P, NP, NP-hard, and NP-complete</Figure>
                    </Section>
                    <Section>
                        <Heading>Other Core Concepts</Heading>
                        <Paragraph>A few more concepts give a fuller picture of the P = NP question, and will be referred to later in the survey. In this section, I’ll restrict myself to concepts that were explored in the 1970s, around the same time as P = NP itself was formulated, and that are covered alongside P = NP in undergraduate textbooks. Other important concepts, such as nonuniformity, randomness, and one-way functions, will be explained as needed in Section 5.</Paragraph>
                        <Section>
                            <Heading>Search, Decision, and Optimization</Heading>
                            <Paragraph>For technical convenience, P and NP are defined in terms of languages or “decision problems,” which have a single yes-or-no bit as the desired output (i.e., given an input x, is x ∈ L?). To put practical problems into this decision format, typically we ask something like: does there exist a solution that satisfies the following list of constraints? But of course, in real life we don’t merely want to know whether a solution exists; we want to find a solution whenever there is one! And given the many examples in mathematics where explicitly finding an object is harder than proving its existence, one might worry that this would also occur here. Fortunately, though, shifting our focus from decision problems to search problems doesn’t change the P = NP question at all, because of the following classic observation. Proposition 4 If P = NP, then for every language L ∈ NP (defined by a verifier M), there’s a polynomial-time algorithm that, for all x ∈ L, actually finds a witness w ∈ &#123;0,1&#125; such that M (x, w) accepts. Proof. The idea is to learn the bits of an accepting witness w = w1 · · ·wp(n) one by one, by asking a series of NP decision questions. For example:</Paragraph>
                        </Section>
                        <Section>
                            <Heading>The Twilight Zone: Between P and NP-complete</Heading>
                            <Paragraph>We say a language L is NP-intermediate if L ∈ NP, but L is neither in P nor NP-complete. Based on experience, one might hope not only that P ≠ NP, but that there’d be a dichotomy, with all NP problems either in P or else NP-complete. However, a classic result by Ladner <Citation>ladner1975</Citation> rules that possibility out. Theorem 5 (Ladner <Citation>ladner1975</Citation>) If P ≠ NP, then there exist NP-intermediate languages.</Paragraph>
                        </Section>
                        <Section>
                            <Heading>coNP and the Polynomial Hierarchy</Heading>
                            <Paragraph>Let L = &#123;0,1&#125; \L be the complement of L: that is, the set of strings not in L. Then the complexity class</Paragraph>
                            <Figure source="/figure-2.png">The polynomial hierarchy</Figure>
                        </Section>
                        <Section>
                            <Heading>Factoring and Graph Isomorphism</Heading>
                            <Paragraph>As an application of these concepts, let’s consider two NP languages that are believed to be NP- intermediate (if they aren’t simply in P). First, Fac—a language variant of the factoring problem— consists of all ordered pairs of positive integers ⟨N, k⟩ such that N has a nontrivial divisor at most k. Clearly a polynomial-time algorithm for Fac can be converted into a polynomial-time algorithm to output the prime factorization (by repeatedly doing binary search to peel off N’s smallest divisor), and vice versa. Second, GraphIso—that is, graph isomorphism—consists of all encodings of pairs of undirected graphs ⟨G, H⟩, such that G ∼= H. It’s easy to see to see that Fac and GraphIso are both in NP.</Paragraph>
                        </Section>
                        <Section>
                            <Heading>Space Complexity</Heading>
                            <Paragraph>PSPACE is the class of languages L decidable by a Turing machine that uses a polynomial number of bits of space or memory, with no restriction on the number of time steps. Certainly P ⊆ PSPACE, since in t time steps, a serial algorithm can access at most t memory cells. More generally, it’s not hard to see that P ⊆ NP ⊆ PH ⊆ PSPACE, since in an expression like ∀x∃y φ(x, y), a PSPACE machine can loop over all possible values for x and y, using exponential time but reusing the same memory for each x, y pair. However, none of these containments have been proved to be strict.</Paragraph>
                        </Section>
                        <Section>
                            <Heading>Counting Complexity</Heading>
                            <Paragraph>Given an NP search problem, besides asking whether a solution exists, it’s also natural to ask how many solutions there are. To capture this, in 1979 Valiant <Citation>valiant1979b</Citation> defined the class #P (pronounced “sharp-P”, not “hashtag-P”!) of combinatorial counting problems. Formally, a function f : &#123;0,1&#125; → N is in #P if and only if there’s a polynomial-time Turing machine M, and a polynomial p, such that for all x ∈ &#123;0,1&#125; ,</Paragraph>
                            <Equation>{String.raw`\mathrm{P}^{\#P} \supseteq \mathrm{PH}`}</Equation>
                            <Paragraph>Toda: the polynomial hierarchy sits inside P with a counting oracle.</Paragraph>
                        </Section>
                        <Section>
                            <Heading>Beyond Polynomial Resources</Heading>
                            <Paragraph>Of course, we can consider many other time and space bounds besides polynomial. Before entering into this, I should offer a brief digression on the use of asymptotic notation in theoretical computer science, since such notation will also be used later in the survey.</Paragraph>
                        </Section>
                    </Section>
                </Section>
            </Document>
        );
    }
}
