import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Options ]]</Title>
        <Paragraph>
            Notes on the formalisms the notes hold, on Doug's request after reading the running notebook: "How about
            some notes on possible formalism related to the notes. You might list some options" (in the room, 9
            November 2026). Each option says where it stands at the close of the long conversation, what it is cited
            from, and how the newest statement bears on it: the algebraic model of the subject of logic he restated
            and sharpened the same evening, in <Means>$[[ ./The Subject of Logic ]]</Means>. The options are not rivals; most are one
            structure seen at a different level, and the question the newest statement puts is which level the
            paper's <Means>$[[ Gödel ]]( Mathematical Library / Gödel 1931 )</Means> half is written at.
        </Paragraph>
        <Section>
            <Heading>The lifted predicate in PA</Heading>
            <Paragraph>
                PA with one definition: the proof predicate lifted to lengths, Pf(φ, ℓ), and the proof of length 0
                defined as having no other length, Pf(φ, 0) := ∀ℓ ≥ 1 ¬Pf(φ, ℓ), with 0 the unique number of every
                length. This is the paper's exposition form by the ruling of 31 October that the exposition carries
                no nonstandard language (Goldbach through Gödel, The Six Movements, 31 October 2026), stated
                in <Means>$[[ ./Zero for Proof ]]</Means>, and the frontier's eight results were proven in it under
                Σ₁-soundness (The Formal Core, 3 November 2026). Its defense in one sentence is his: "I am just adding
                PA's zero semantics to FOL so it can host PA" (The Zero Semantics of FOL, 27 October 2026). As a
                formalism it adds no symbol; the identity is a definable predicate of PA. The newest statement bears
                on it this way: the inferential identity already has its face here, Pf(·, 0), and his sketch of 2
                November says where the rest would go, "Adding 0 as the Gödel code for the inferential identity and its
                conclusion, both represented by zero at each level" (The Formal Core, 2 November 2026); the rational
                identity and the logical identity have no face in PA yet, and giving them one is what the compact
                expression is for.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The host with its zeros</Heading>
            <Paragraph>
                The host logic given the zeros of what it hosts, each a primitive with its identity law. His
                naming of the kind, 28 October: "My empty proof and Con(PA) as represented by the empty string making
                it the null proposition... These are constitutive zeros" (The Medium, 28 October 2026), and his rebuke
                when the zeros were borrowed from a universe just declined, "Shame on you for not having the empty
                proof and empty string in the formalism you imagine to host the truth of these things!" (The Medium).
                The signature written in answer: strings a monoid with ε primitive and x·ε = ε·x = x; proofs a
                monoid over strings with the empty proof primitive, π·ε = π, and Pf(n, 0) as no positive-length proof,
                Con(Th) this identity by name; propositions with 0-ary connectives primitive (Claude, The Medium, 28
                October 2026). It stands as the host's signature, three carriers each with an identity posited. The
                newest statement has the same three carriers, and corrects the third: that signature gave the
                propositions ⊤ and ⊥ as their identities, and the same day he ruled that the one identity of the
                propositions is the empty string, below.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The algebra with an identity adjoined</Heading>
            <Paragraph>
                The identity law first, 27 October: "You can even add it as an expression as long as you concede that X
                or empty == X (like addition)" (The Lifted Arithmetization, 27 October 2026). Then the correction that
                made it one element for both connectives, 28 October: "No, Con(PA) represented by the empty string is
                the logical identity. You don't remember? X and Con(PA) == X, so too for or" (The Identity Element, 28
                October 2026); nothing in a Boolean lattice is the identity for both, so the element is not in the
                lattice, "it isn't in the algebra the connectives operate on" (Claude, The Identity Element). The
                draft of that day wrote the laws: ε the empty sentence whose proof is the empty proof, X ∧ ε = X,
                X ∨ ε = X, ¬ε = ε, π·ε = π, Con(T) := ε; distributivity fails at ε as division fails at 0, "a logic with
                a zero is a Boolean algebra with a non-distributing identity adjoined", and among the open problems "The
                proof theory and model theory of a Boolean algebra with an adjoined non-distributing identity"
                (Claude, The Two Drafts, 28 October 2026). The verdict of 2 November on the whole: "a free monoid with
                its identity, a Boolean algebra with one adjoined element, and a coding with one freed number"
                (Claude, The Formal Core, 2 November 2026). It stands as the algebra of the Gödel half and is the seed
                of the algebraic model. The newest statement moves a name: what 28 October called the logical identity,
                the empty string, is now the rational identity, and the logical identity is its truth value; where
                these notes say logical identity of the empty string, read rational.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Subjective Mathematics as the core</Heading>
            <Paragraph>
                Subjects and their commitments as host axioms in arithmetized predicates, the negative space N and the
                frontier F with ε the origin, the two-subject theorem, formal equality and the port, written on 3
                November and named by him that evening (The Objective Bias, 3 November 2026); it is the document the
                paper's Gödel half draws from, said in <Means>$[[ ./The Documents ]]</Means>. It stands as the formal
                core of the program. The newest statement is one level beneath it: Subjective Mathematics formalizes a
                subject, PA among codes, and the algebraic model asks for the subject of logic itself, the formalization
                whose consistency is believed before any arithmetic is written in it.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The modular arithmetics of the family</Heading>
            <Paragraph>
                The arithmetics modulo the primorials, each a finite circle with 0 at its top, and the method's
                assessments made on the family and never on the limit, his ruling of 1 November (The Resolution, 1
                November 2026), in <Means>$[[ ./The Rulings ]]</Means>. It stands as the Goldbach half's formalism and
                is number theory, not logic. The algebraic model touches it at one point only, the object: the horizon
                0 of <Means>$[[ ./Zero as the Horizon ]]</Means> and the empty proof of the Gödel half are the one
                number of <Means>$[[ ./The Object ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The hypothetical semantics</Heading>
            <Paragraph>
                His program of 2 November for the formalism of the identities, with its name: "I think we need to build
                a really beautiful algebraic description of FOL that can express PA that has the inferential identity as
                the consistency of the theory as described in FOL. I think we would provide a separate algebraic
                formalism to express the theory, because that is not in FOL, and perhaps we might call it first order
                semantics"; "The inferential identity is a type of theorem"; "If a theorem S is provable, not S is the
                inferential identity" (The Formal Core, 2 November 2026). Then its semantics: "Perhaps in the language,
                we can express empty semantics for the language, which are rules for how to comprehend
                expressions involving the inferential identity, which perhaps should be a separate kind of sentence that
                might only make sense as the empty proof"; "we need another algebraic structure that can express
                formalisms"; "this formulation needs to be clean algebraic structures so that it is natural to interpret
                the meaning of the identities"; and its end, "Then we demonstrate that this description is identical to
                PA. It is like PA with the addition of an empty theorem to express the absence of provability, that does
                not add an extra theorem to the language" (The Formal Core, 2 November 2026). It stands as the program;
                Claude's verdict the same evening was that the painting holds and the theorems are short. The newest
                statement is this program with its structure named, three identities at three levels and the semantics
                of logic in algebraic form, and his order of work is the program's: "After we find a compact expression
                of that, hopefully we can show how it might be formalized in PA" (in the room, 9 November 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The algebraic model, newest</Heading>
            <Paragraph>
                The algebraic model of the subject of logic, first said to Gemini on 3 November, named on 5 November
                and restated and sharpened on 9 November: the inferential identity as the empty proof, the rational
                identity as the empty string, the logical identity as its truth value; the excluded middle kept; rules
                of inference under which consistency motivates the axioms on the page; soundness as the subject being
                formalizable; the semantics expressed through the identities and nothing else. Stated in his words and
                gathered with the pieces above
                in <Means>$[[ ./The Subject of Logic ]]</Means>. It is the option the paper's Gödel half is to be
                written in if the compact expression is found; the dynamical formalism D is not among the options,
                being a sketch for Semantic Reference Theory by his tag, in <Means>$[[ ./The Sketches ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
