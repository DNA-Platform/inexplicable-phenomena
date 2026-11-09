import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Publication</Part>
        <Title>[[ Zero as the Counterexample ]]</Title>
        <Paragraph>
            The third movement, Gödel through Goldbach proper: resolving ¬G and removing Goldbach's counterexample
            are the same act. A number every prime divides is even and pairless, so the witness of ¬G and the
            structural counterexample to Goldbach are one number, and PA names it 0, out of range. Goldbach gives
            Gödel's unpointable object its only arithmetic face (Goldbach through Gödel, The Paper's Flow, 5 November
            2026).
        </Paragraph>
        <Section>
            <Heading>Two lemmas in PA</Heading>
            <Paragraph>
                L1: PA proves that the number every prime divides is 0, which was already in the theory and is
                Euclid's theorem read in modular dress, since for every nonzero x there is a prime not dividing x.
                L3, pairlessness: PA proves that if every prime divides x then x is not a sum of two primes, since
                x = p + q gives p dividing q, so x = 2p, which some prime fails to divide (The Surviving Sentence, 29
                October 2026). Doug's statement of L3 on 1 November: "For an even, if p divides it, N-p can't be prime,
                so no two standard primes could add to the limiting primorial" (The Resolution, 1 November 2026); and
                of its place in the paper on 29 October: "It is noteworthy that a large value that is divisible by all
                primes is a GC counterexample" (The Surviving Sentence, 29 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The number he feared</Heading>
            <Paragraph>
                The identification was his from the fourth day, held against refutation: "Why can't that number,
                ignoring the fact that we think it causes inconsistency, be an even number where every prime can't
                have a prime pair to sum because it divides it?" (The Shape of the Phantom Proof, 25 October 2026);
                and the reason it recurs, "each time we recurse and arithmetize, we believe in that number again,
                only to see it would cause inconsistency and is not provable. GC becomes another way to assert the
                inconsistency" (The Shape of the Phantom Proof). Claude's arithmetization answered the demand "can
                you arithmetize that the proof of G contains a Goldbach counterexample?" (The Shape of the Phantom
                Proof): PA proves Gödel's sentence equivalent to the sentence that any proof of it contains a
                Goldbach counterexample. In the coda to Gemini the same number is the nightmare: "that scary number
                fails the GC criteria. It is divisible by 2, and all of the standard primes divide so if one were to
                imagine that two might divide it, you can prove that they don't" (Subjectivity library catalogue, the
                unsent coda, 4 November 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>Deprecated by the third movement</Heading>
            <Paragraph>
                His first use of the circle, on 25 October, had the top of the circle break Goldbach where it is in
                fact easiest; the claim survives only under his rigid reading of prime, which prices the axiom as
                Goldbach plus every number being standard (The Finding of an Axiom, 25 October 2026). The hinge, whether
                PA proves GC → Con(PA), raised on 19 October and found to be nobody's theorem on 23 October, is not a
                premise of the paper; what it reached for is L1 and L3, where the witness of ¬G and the counterexample
                meet without an implication between the conjecture and consistency. And the phantom of 25 October,
                the all-primes number as a nonstandard element, is in the paper a name, 0, and no nonstandard element
                at all, by the ruling of 31 October that removed nonstandard-model language from the exposition. How
                that was done is <Means>$[[ ./The Surviving Sentence ]]</Means>; what the two sieves prove before it
                is <Means>$[[ ./Two-Sided Arithmetic ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
