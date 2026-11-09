import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Publication</Part>
        <Title>[[ Zero for Proof ]]</Title>
        <Paragraph>
            The first movement: proof is a quantity, and the semantics mathematics already uses for an absent
            quantity, 0 as the identity, is applied to it. "True but unprovable" is the identity read as a value.
            The movement was built from 26 October to 3 November in four forms that are one object, the zero trick,
            Proof(n, 0), the inferential identity and the lifted predicate Pf(φ, ℓ) with 0 the unique number of every
            length; the paper uses the last, and this note states that form, citing the earlier ones as its history.
        </Paragraph>
        <Section>
            <Heading>Proof as quantity</Heading>
            <Paragraph>
                Derivations as finite sequences with concatenation and the empty sequence ε; length a homomorphism
                onto the naturals with the length of ε equal to 0; and the axiom rule as line 1, so length 0 is
                unassigned until the semantics assigns it. Doug's seed, 26 October: "Imagine Proof predicate with a
                witness that is proof length"; "Internalize provability. What happens if you reflect on provability
                with this predicate?" (Goldbach through Gödel, Proof of Length Zero, 26 October 2026). His ruling that
                the length and not the code carries the semantics: "you need numbers to be quantities for 0 to make
                sense" (The Lifted Arithmetization, 27 October 2026). The lifted predicate of 31 October defines the
                proof of length 0 as having no other length, Pf(φ, 0) := ∀ℓ ≥ 1 ¬Pf(φ, ℓ), so that in these
                semantics the proof of length 0 is unprovability (The Six Movements, 31 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The identity and its lemmas</Heading>
            <Paragraph>
                ε adjoined to the sentences as the empty proposition, with X ∧ ε = X, X ∨ ε = X, ¬ε = ε and π ⊕ ε = π,
                not a lattice element, distributivity not asserted at it. Doug named it on 28 October, "SO then it's
                the inferential identity!" (The Identity Element, 28 October 2026), and on 3 November corrected its
                level: "You don't even understand that empty would be the axiomatic identity too?" (The Formal Core,
                3 November 2026), so ε is the identity at every level, string, sentence, deduction, axiom and theory,
                and T + ε = T because ε was already an axiom of T. Two lemmas make the movement formal. The Neutrality
                Lemma: T + C is conservative over T if and only if T proves C, so no sentence can be consistency and
                the progression of consistency statements is ε added to ε. The Same-Consequence Lemma: in a
                consistent subject no represented sentence has the same consequences as its negation, so a pair with
                equal consequences is not something the subject expresses (The Six Movements, 31 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>Gödel, read</Heading>
            <Paragraph>
                PA ⊢ G ↔ Pf(G, 0); PA ⊢ Con ↔ Pf(⊥, 0); PA ⊢ Pf(Con, 0) ↔ Con; and PA does not prove Con → Con(PA + Con),
                so Gödel's Con does not carry consistency across the addition of a true sentence and is not a
                formalization of consistency. Doug's test, 27 October: "his Con can't be my Con. Mine captures the
                essence of Con(PA) and his fails the transitivity of Con(PA). He never formalized it" (The Lifted
                Arithmetization, 27 October 2026). His semantics of consistency, said back as definition: "Con(Th) is
                the consistency of the first order theory you are in is the zero length proof, and the thing that
                implies all of the axioms. We chose them in an attempt to describe a consistent vision of something"
                (The Standard Reading, 27 October 2026). By Same-Consequence, G and ¬G both have consequence ε and
                are not represented; incompleteness is not meaningful here. No G is added: imagining G true is
                imagining Pf(G, 0), already a theorem, and adding is leaving the subject. The example the paper
                carries: PA + ¬Con resolves to PA, since its witness is 0 and Pf(⊥, 0) is Con.
            </Paragraph>
        </Section>
        <Section>
            <Heading>One sentence, two subjects</Heading>
            <Paragraph>
                The theorem at the center of the movement: PA ⊢ Pf(φ, 0) ↔ ¬Prov(φ), one sentence of the theory and
                two meanings of it, absence as an element and absence as a negation, and PA cannot tell which it is in
                (The Two Semantics of Zero, 1 November 2026). Doug: "this is it!! That sentence depends on what you
                believe is the right proof predicate, and the same encoding can express both based on proof length"
                (The Two Semantics of Zero). Earlier, on 26 October, the same fact in its first form, "It is
                expressible. Prov(X,0) and Prov(not X,0) is incompleteness" (Proof of Length Zero, 26 October 2026),
                and on 28 October, "if all empty proofs prove the same thing (Con(PA)) then G and not G are the same
                statement. That is different. That is cool" (The Identity Element). The frontier results of 3
                November belong here too, Theorem A first: Pf(S, 0) is never provable, the identity used in every
                proof and concluded in none, which is the formal content of consistency motivating every step and
                being proved by none (The Formal Core, 3 November 2026). The rest of that core is listed
                in <Means>$[[ ./The Documents ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
