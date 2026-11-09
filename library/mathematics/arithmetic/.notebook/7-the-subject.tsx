import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Abstractions</Part>
        <Title>[[ The Subject ]]</Title>
        <Paragraph>
            A theory read as a subject: what it can represent, what it cannot, and how it expresses the second by the
            first. "that which is not legible within the subject expresses consistency by not being provable"
            (Goldbach through Gödel, The Six Movements, 31 October 2026). The paper is named for this reading, and
            the programme it opens Doug named in one breath: "call this Subjective Mathematics cause why not" (The
            Objective Bias, 3 November 2026).
        </Paragraph>
        <Section>
            <Heading>Subjective consistency</Heading>
            <Paragraph>
                "A proposition and its negation are both undecidable in the semantics when they are expressed by
                the same (empty) proof, and are therefore not representable by the subject" (The Six Movements). So
                undecidability is not a hole in the theory but the theory's way of showing its consistency: "we
                believe PA expressed its subjective consistency by not expressing GC" (The Six Movements). Claude's
                Neutrality Lemma gives the formal side, a theory plus a sentence is conservative over the theory
                exactly when the theory proves the sentence, so nothing unprovable is a neutral addition and
                consistency can only be an identity (The Six Movements). We read the lemma as the reason the paper
                never adds G: adding anything unprovable changes the subject.
            </Paragraph>
        </Section>
        <Section>
            <Heading>One sentence, two subjects</Heading>
            <Paragraph>
                The central theorem, PA ⊢ Pf(φ, 0) ↔ ¬Prov(φ): an undecidable pair is contradictory where absence is
                negation and identical where absence is an element (The Two Semantics of Zero, 1 November 2026). His
                reading of it: "To believe in PA is to believe PA expresses exactly what you mean. And undecidable
                pair of propositions must explain why something both cannot be represented by this subject and why
                one would change the subject by assuming one as an axiom. This makes sense if they both represent the
                same idea in different subjects, and I provide a way to see how arithmetization can achieve that"
                (The Two Semantics of Zero). And the weight he gave it: "this is it! Two different subjects based on
                how they handle absence... It has real philosophical consequence!" (The Two Semantics of Zero).
                Undecidability is not incompleteness: "Godel's work might confuse unprovable with unformalizable" (The
                Two Semantics of Zero).
            </Paragraph>
        </Section>
        <Section>
            <Heading>Changing the subject</Heading>
            <Paragraph>
                The resolution that brings the circle back to PA changes the subject without changing a theorem: "We
                did that because we don't want to name any number that can't be expressed with successors of 0. And
                we are back to PA. But we came back to a PA that has a modularity that the last one didn't, even
                though it is identical, which means we must need additional axioms to explain the semantic change we
                just made" (The Resolution, 1 November 2026). Incompleteness reinterpreted: "a formalism is always
                complete but certain sentences would express something that can only be distinguished in another
                subject" (Mathematical Relativity, 3 November 2026). Claude's Resolution Theorem makes the return
                unique, the standard-signature elements a sub-semiring with one homomorphism onto ℕ fixing ℕ, its
                kernel exactly the horizons (The Two Semantics of Zero); and two readings whose conflict signals two
                subjects he named subjective contradiction, the whole mathematical relativity: "this is actually a
                piece of art - painted in the medium of rigorous formalization - whose subject matter is the nature
                of subjectivity, objectivity and relativity in math. That is beautiful" (Mathematical Relativity).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The frontier and the negative space</Heading>
            <Paragraph>
                Claude's names at the formal core: the negative space N, the sentences without proof, and the
                frontier F, the sentences whose assertion and denial are each consistent with the theory, with ε at
                the origin (The Formal Core, 2 November 2026). A sentence is in the frontier exactly when it is
                undecidable, which here means two subjects of one empty representation; and for diagonal sentences
                referential inconsistency, unformalizability and membership in the frontier are one thing, with
                Henkin's "I am provable" as the control, identified by its theory and so referentially consistent
                (Mathematical Relativity). Doug's stance on what matters: "I care more about establishing
                subjectivity than motivating correctness because we are outside of a formal deductive system"
                (Mathematical Relativity).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The lexicon and the subjectron</Heading>
            <Paragraph>
                The vocabulary is generated, not collected: heads, consistency, contradiction, identity, equality,
                integrity, truth, proof, semantics, reflection, change of subject; modifiers, subjective, objective,
                referential, representational, existential, inferential, formal, empty, canonical, hypothetical.
                Claude built it only after being refused the words from outside: "Aberration is a definite no. ... I
                like how you justify my vocabulary entirely with words not in it. At least build the lexicon by
                motivating your choices using thigns already in it" (The Lexicon, 3 November 2026). Consistency as
                the subject's identity he affirmed whole: "Consistency is still the identity of the subject expressed
                through semantics, and it provides a sense of objectivity... That is a beautiful notion of
                consistency" (The Subject of Physics, 3 November 2026). And the subject of subjectivity itself: "The
                absence of objectivity can be expressed as a property of an object, and let's call that subject
                subjectivity"; "Let us even imagine that as a particle called the subjectrom. It does nothing. But
                we see that in the subject of subjectivity, subjectrons are extremely meaningful" (The Two Semantics
                of Zero). Where the physics of that night went is <Means>$[[ ./The Archive ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
