import { $ } from '@dna-platform/chemistry';
import { $Chapter, Citation, Heading, Paragraph, Section } from '@dna-platform/public';
import Document from './.document';

export default class $Strengthenings extends $Chapter {
    view() {
        return (
            <Document>
                <Section>
                    <Heading>Strengthenings of the P ≠ NP Conjecture</Heading>
                    <Paragraph>I’ll now survey various strengthenings of the P ≠ NP conjecture, which are often needed for ap- plications to cryptography, quantum computing, fine-grained complexity, and elsewhere. Some of these strengthenings will play a role when, in Section 6, we discuss the main approaches to proving P ≠ NP that have been tried.</Paragraph>
                    <Section>
                        <Heading>Different Running Times</Heading>
                        <Paragraph>There’s been a great deal of progress on beating brute-force search for many NP-complete problems, even if the resulting algorithms still take exponential time. For example, Sch¨oning proved the following in 1999. Theorem 22 (Sch¨oning <Citation>schoning1999</Citation>) There’s a randomized algorithm that solves 3Sat in O((4/3) ) time.</Paragraph>
                    </Section>
                    <Section>
                        <Heading>Nonuniform Algorithms and Circuits</Heading>
                        <Paragraph>P = NP asks whether there’s a single algorithm that, for every input size n, solves an NP-complete problem like 3Sat in time polynomial in n. But we could also allow a different algorithm for each input size. For example, it often happens in practice that a na¨ıve algorithm works the fastest for inputs up to a certain size (say n = 100), then a slightly clever algorithm starts doing better, then at n ≥ 1000 a very clever algorithm starts to outperform the slightly clever algorithm, and so on. In such a case, we might not even know whether the sequence terminates with a “maximally clever algorithm,” or whether it goes on forever.</Paragraph>
                    </Section>
                    <Section>
                        <Heading>Average-Case Complexity</Heading>
                        <Paragraph>If P ≠ NP, that means that there are NP problems for which no Turing machine succeeds at solving all instances in polynomial time. But often, especially in cryptography, we need more than that. It would be laughable to advertise a cryptosystem on the grounds that there exist messages that are hard to decode! So it’s natural to ask whether there are NP problems that are hard “in the average case” or “on random instances,” rather than merely in the worst case. More pointedly, does the existence of such problems follow from P ≠ NP, or is it a different, stronger assumption?</Paragraph>
                        <Section>
                            <Heading>Cryptography and One-Way Functions</Heading>
                            <Paragraph>One might hope that, even if we can’t base secure cryptography solely on the assumption that P ≠ NP, at least we could base it on Conjecture 28. But there’s one more obstacle. In cryptography, we don’t merely need NP problems for which it’s easy to generate hard instances: rather, we need NP problems for which it’s easy to generate hard instances, along with secret solutions to those instances. This motivates the definition of a one-way function (OWF), perhaps the central concept</Paragraph>
                        </Section>
                    </Section>
                    <Section>
                        <Heading>Randomized Algorithms</Heading>
                        <Paragraph>Even assuming P ≠ NP, we can still ask whether NP-complete problems can be solved in polynomial time with help from random bits. This is a different question than whether NP is hard on average: whereas before we were asking about algorithms that solve most instances (with respect to some distribution), now we’re asking about algorithms that solve all instances, for most choices of some auxiliary random numbers.</Paragraph>
                        <Section>
                            <Heading>BPP and Derandomization</Heading>
                            <Paragraph>What’s the power of randomness more generally? Can every randomized algorithm be derandom- ized, as ultimately happened with Primes? To explore these issues, complexity theorists study several randomized generalizations of the class P. We’ll consider just one of them: Bounded-Error Probabilistic Polynomial-Time, or BPP, is the class of languages L ⊆ &#123;0,1&#125; for which there exists a polynomial-time Turing machine M, as well as a polynomial p, such that for all inputs x ∈ &#123;0,1&#125; ,</Paragraph>
                        </Section>
                    </Section>
                    <Section>
                        <Heading>Quantum Algorithms</Heading>
                        <Paragraph>The class BPP might not exhaust what the physical world lets us efficiently compute, with quantum computing an obvious contender for going further. In 1993, Bernstein and Vazirani <Citation>bernstein1997</Citation> defined the complexity class BQP, or Bounded-Error Quantum Polynomial-Time, as a quantum-mechanical generalization of BPP. (Details of quantum computing and BQP are beyond the scope of this survey, but see <Citation>nielsen2000, aaronson2013</Citation>.) Bernstein and Vazirani, along with Adleman, DeMarrais, and Huang <Citation>adleman1997</Citation>, also showed some basic containments:</Paragraph>
                    </Section>
                </Section>
            </Document>
        );
    }
}
