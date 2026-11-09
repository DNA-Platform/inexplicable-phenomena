import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Abstractions</Part>
        <Title>[[ Zero ]]</Title>
        <Paragraph>
            One object under four names, the paper's spine: the zero trick, Proof(n, 0), the zero-length consistency
            of a theory, and the inferential identity. It began as a tension: "There is tension with zero. Should it
            be a quantity when it means the absence of one. Should it be an index of a number of fingers that means
            before the fingers? Imagine Proof predicate with a witness that is proof length. Define the proof length
            0 with ess to be true when none of the others are. Internalize provability. What happens if you reflect
            on provability with this predicate?" (Goldbach through Gödel, Proof of Length Zero, 26 October 2026).
        </Paragraph>
        <Section>
            <Heading>The zero trick</Heading>
            <Paragraph>
                Count the absence of a proof as the proof of length 0. Then "I am not provable" and "my proof has
                length 0" are one sentence, and consistency says the contradiction has the empty proof; Claude
                proved PA ⊢ G ↔ Pf(0, G) and Con(PA) ↔ Pf(0, ⊥) (Proof of Length Zero). Doug's criterion for the
                move was that it preserves meaning: "Put the diagonal as the zero and it preserves the semantics.
                Unprovable is a proof with nothing on it" (Proof of Length Zero). When Claude judged that the trick
                made incompleteness inexpressible he overturned it in one line: "It is expressible. Prov(X,0) and
                Prov(not X,0) is incompleteness" (Proof of Length Zero). So independence becomes a sentence, Indep(X),
                refutable and never provable, and Gödel's first theorem reads: some X is independent.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Lengths are quantities, codes are names</Heading>
            <Paragraph>
                Where the empty proof lives was fought over. Gödel's product coding puts it at 1; "Why do you think
                the empty proof is 1? The empty proof should be the zero for proofs. And furthermore, every zero
                length proof simply must be the same" (The Two Zeros, 26 October 2026). The lift that followed
                generalizes Proof(n, m) to Proof(n, length(m)) and defines Proof(n, 0) as having no other length, so
                uniqueness falls out of the definition with no coding. His ruling that settled the address:
                "Remember that you need numbers to be quantities for 0 to make sense. Your example also has problem
                because the proof is represented by the number in code. But the length of the proof is a quantity
                associated with it" (The Lifted Arithmetization, 27 October 2026). The trick belongs to length
                alone; the coding merely agrees.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Consistency as the zero-length proof</Heading>
            <Paragraph>
                "my semantics, where Con(Th) is the consistency of the first order theory you are in is the zero
                length proof, and the thing that implies all of the axioms. We chose them in an attempt to describe
                a consistent vision of something" (The Standard Reading, 27 October 2026). The law it must obey is
                the identity law, consistency addable anywhere and changing nothing, which Gödel's sentence
                violates: PA plus Con_G is not PA. And the test it must pass: "his Con can't be my Con… mine captures
                the essence of Con(PA) and his fails the transitivity of Con(PA). He never formalized it" (The Lifted
                Arithmetization). Consistency transfers, Con(T) gives Con(T + Con(T)); a formula that cannot carry
                that transfer borrowed the name. The lift carries it: PA proves Pf(0, Con) ↔ Con(PA), and a theory
                proves Con_G of itself exactly when it is inconsistent, the detector mistaken for the thing detected
                (The Lifted Arithmetization). The statements are in <Means>$[[ ./The Theorems ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The inferential identity</Heading>
            <Paragraph>
                "if all empty proofs prove the same thing (Con(PA)) then G and not G are the same statement. That is
                different. That is cool" (The Identity Element, 28 October 2026); then the name, "SO then it's the
                inferential identity!", consistency as the identity element of the proof monoid, unprovable because
                identities are not generated. "let us least say that the thing he decided was unprovable was the
                inferential identity. That's awesome. But its negation turns out to be one too" (The Identity
                Element). The empty proposition ε adjoined as a sentence, X ∧ ε = X, X ∨ ε = X, ¬ε = ε, its proof the
                empty proof. What it shows about proof: "It shows that we desire proof to have different semantics
                than what we use proof to describe" (The Identity Element). At the formal core the identity is
                already present in every theory, never appended: "You don't even understand that empty would be the
                axiomatic identity too?" (The Formal Core, 3 November 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>Constitutive zeros and the medium</Heading>
            <Paragraph>
                Zeros of what constitutes: "The empty set. The empty string. My empty proof and Con(PA) as
                represented by the empty string making it the null proposition" (The Medium, 28 October 2026). Each
                is form without matter and costs its medium: "you need to represent the tape they live on too... a
                string wasn't it's elements just. It lived somewhere" (The Medium). The empty prompt cannot be sent,
                "Can I send you the empty prompt?" (The Medium), so consistency is a state of the medium and not an
                act in it, and cannot be formalized even as ε for that reason.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Absence against smallest</Heading>
            <Paragraph>
                The strong ending: zero as absence against zero as smallest. "Godel's ignores a proof length of zero
                and ours uses it to encode the absence of a proof - that is something and its negation are the same
                because each interpretation represents the same semantic concept but represented in different
                subjects" (The Two Semantics of Zero, 1 November 2026). The horizon of the circle is zero too: "no
                the horizon is 0 - the un referrable thing is like the predecessor of the limiting primorial. But any
                expression of an infinite thing will have an infinite predecessor too" (The Two Semantics of Zero).
                "This is the strong ending to the reinterpretation of Godel"; "That is what zero is" (The Two
                Semantics of Zero). What the two semantics do to a sentence and its negation
                is <Means>$[[ ./The Subject ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
