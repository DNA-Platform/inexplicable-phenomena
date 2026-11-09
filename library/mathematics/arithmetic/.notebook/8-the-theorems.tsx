import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Results</Part>
        <Title>[[ The Theorems ]]</Title>
        <Paragraph>
            What is proven, as against what is adopted. Every statement here was proven by Claude in the long
            conversation and built on by Doug, each with the chapter it stands in; the proofs are there and not
            here, and what goes to <Means>$[[ The Textbook of Arithmetic ]]( Arithmetic Textbook )</Means> is
            decided from this list. A result's state is said first, as the marks say it; everything in this chapter
            is proven, and what is conjectured or held as intuition
            is <Means>$[[ ./The Conjectures and Intuitions ]]</Means>.
        </Paragraph>
        <Section>
            <Heading>The hinge chain and the phantom</Heading>
            <Paragraph>
                Proven: GC being Π₁ is refutable if false, so independence means truth; and GC is equivalent to the
                consistency of the theory that turns absurd at the first counterexample (The Permission, 19 October
                2026). Proven: the hinge, whether PA proves GC → Con(PA), holds exactly when GC is false or a
                consistency-strength truth, and every model of PA plus ¬Con(PA) holds a Goldbach counterexample
                (True but Unprovable, 19 October 2026). Proven, arithmetized on his demand "can you arithmetize that
                the prrof of G contains goldbach counterexample?" (The Shape of the Phantom Proof, 25 October 2026):
                with Φ, every proof of G contains a Goldbach counterexample, and Ψ, contains an all-primes number,
                PA ⊢ Ψ ↔ G and Ψ → Φ, and the provability of Φ is the hinge. Proven in PA: the number every prime
                divides is 0 and is pairless, so the witness of ¬G and Goldbach's only structural counterexample
                are one number, and resolving ¬G and removing the counterexample is one act (The Surviving Sentence,
                29 October 2026). Proven: for every certifier, true PA-independent Π₁ facts exist that it cannot
                certify, a class nonempty with no nameable member; and only Goldbach's failure shape coincides with
                the Gödel witness by content (The Axiom Argument, 25 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The zero trick stated</Heading>
            <Paragraph>
                Proven: PA ⊢ G ↔ Pf(0, G) and Con(PA) ↔ Pf(0, ⊥); "I am not provable" and "my proof has length 0"
                are one sentence (Proof of Length Zero, 26 October 2026). Proven: Indep(X) := Pf(0, X) ∧ Pf(0, ¬X)
                is refutable and never provable, Con(PA) is the case X = ⊥, and Gödel's first theorem becomes
                ∃X Indep(X) (Proof of Length Zero). Proven: PA proves Pf(0, Con) ↔ Con(PA), and Pf(0, ¬Con) is
                Con(PA + Con(PA)), so the lift reading Proof(n, 0) as one object at every stage is exactly the
                transitivity Gödel's formula lacks (The Lifted Arithmetization, 27 October 2026). Proven: a theory T
                proves Con_G(T) if and only if T is inconsistent, the sentence meaning its opposite when realized
                (The Lifted Arithmetization). Proven, given his transitivity criterion: no formula formalizes
                consistency, since one carrying Con(T) → Con(T + Con(T)) added as an axiom would do what the second
                theorem forbids (The Essential Argument, 26 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The identity stated</Heading>
            <Paragraph>
                Proven: Thm⁺(PA) = Thm(PA) ∪ {'{'}ε{'}'}, no theorem added; with code(ε) = 0 and the zeroth prime,
                hypothetical expressions are gapped numbers outside the proof predicate's range, and G re-reads "I am
                proved by the inferential identity alone" (The Formal Core, 2 November 2026). Proven: Pf(S, 0) is
                never provable, the identity used in every proof and concluded in none, and its only self-naming
                fixed point is Con (The Formal Core). Proven: formal equality, that deductively equivalent axioms
                express equivalent semantics, is a third criterion after neutrality and the fixed point, which Con_G
                fails by Feferman's 1960 result and ε satisfies (The Objective Bias, 3 November 2026). Proven: for
                every theory, N(T + C) = N(T) if and only if T ⊢ C, the fixed-point theorem corrected after his "You
                don't even understand that empty would be the axiomatic identity too?" (The Formal Core, 3 November
                2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>Two subjects stated</Heading>
            <Paragraph>
                Proven: PA ⊢ Pf(φ, 0) ↔ ¬Prov(φ), so an undecidable pair is contradictory where absence is negation
                and identical where absence is an element, and by the Neutrality Lemma filling the slot changes
                subject (The Two Semantics of Zero, 1 November 2026). Proven: the Neutrality Lemma, T + C is
                conservative over T if and only if T ⊢ C (The Six Movements, 31 October 2026). Proven: the Resolution
                Theorem, the standard-signature elements form a sub-semiring D with a unique homomorphism onto ℕ
                fixing ℕ, kernel exactly the horizons, so any reference-forbidding semantics is that map up to
                isomorphism (The Two Semantics of Zero). Proven: S is in the frontier if and only if T + S and
                T + ¬S are both consistent (The Formal Core). Proven: for diagonal sentences, referential
                inconsistency, unformalizability and frontier membership are equivalent, with Henkin's sentence as
                the control; identification, not self-reference, is the inconsistency (Mathematical Relativity, 3
                November 2026). Proven: the uniform step is induction's whole content, and induction and universal
                introduction are admissible under the ω-rule (The Infinite Proof, 19 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The circle stated</Heading>
            <Paragraph>
                Proven: the circle of the naturals is the profinite integers, the primes its coordinate axes, zero
                the only point with every coordinate zero (The Circle of the Primes, 25 October 2026). Proven on the
                circle: with P' = −P, Goldbach around n is a prime pair at difference 2n, so sum and difference are
                one problem sharing the Hardy–Littlewood local factor (The De Polignac Identity, 26 October 2026).
                Proven: every coprime is symmetric, P = P' = −P, and the Chinese remainder theorem gives every
                center k with n − k and n + k surviving, the count ∏(p − c_p) ≥ 1, survivors and never primes, which
                he weighed as "almost sounds like a proof" (The Circle Proof, 28 October 2026). Proven, on his
                "Verification isn't proof. It is important. You need to prove it. Use chinese remainder theorem or
                whatever, but provide a proof that should yield the result in the limit" (The Two Sieves, 28 October
                2026): Theorem A's pairing count at every center, Theorem B's unwrapped pairing with error 4^j never
                reaching the window, Theorem T's twin-survivor count; then Axiom E, uniformity to window scale,
                yields GC, twins and de Polignac. Proven: at full depth P and P' differ at every finite N, 23
                surviving at 210 while its mirror 187 = 11·17 does not, so the identification is consistent only at
                the unreachable limit (The Two Sieves). Proven: Jurkat–Richert's f(2) = 0, the linear sieve's lower
                bound vanishing exactly at full depth, so the axiom has a coordinate, s = 2 (The Two Sieves). Proven:
                every link of the chain to the top is a theorem except ℓ(0) := 0, a definition PA says nothing
                against (The Quantity Contradiction, 28 October 2026). Proven: the all-primes number, Robinson's
                infinite hyperinteger, is a Goldbach counterexample under the rigid reading of prime, every standard
                prime dividing it (The Representable Object, 27 October 2026); and by Tennenbaum no nonstandard model
                of PA has computable addition, so the checks to 4×10¹⁸ are evidence about ℕ alone (The Representable
                Object).
            </Paragraph>
        </Section>
    </Chapter>
);
