import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Parts ]]</Title>
        <Paragraph>
            The parts of the paper's argument, each with a sketch of what it might look like to formalize it and
            the references that inspire the formalization, written as Doug asked at the close of the publications'
            sprint: "a note to represent the different parts of the argument, the parts as a chapter in notes, then
            the exact form of the formalism we will use and references as inspiration for the specific
            formalizations we choose" (in the room, 11 November 2026), and narrowed the next day to this, "for this
            sprint, we are writing down the parts and what it might look like to formalize them" (in the room, 12
            November 2026). The paper is The Subject of Arithmetic, in three parts he named on 12 November: The
            Subject of Logic, The Subject of Specification and The Object of Study. The parts are given in his words
            with their dates, the sketches are the team's and marked so, and each sketch says what of its part is a
            theorem, what is the rule, and what the rule proves, which is what the textbook will work as results.
            The formalization itself is not here; it is the work, and "You can't just make up the formalization and
            then ask me if it's right" (in the room, 11 November 2026).
        </Paragraph>
        <Section>
            <Heading>Part One, The Subject of Logic</Heading>
            <Paragraph>
                Closed on 11 November, in five sections. The semantics expressed algebraically: the formal system as an
                abstract algebra, deduction an operation, identities accrued, first the Boolean algebra with the
                logical identity adjoined, the inferential identity the proof of the formal identity, which is
                consistency, whose truth value is the logical identity, something whose truth is outside logic. The
                arithmetization, agreeing with Gödel on what is provable and what is undecidable and differing in the
                interpretation of the unprovable. Gödel's and Rosser's sentences as unformalizable, each with its
                negation meaning the same, the empty proof, 1 the empty proof's code and 0 the formal identity. The
                resolution: the 0 of the coding, the non-positive proof length and the number every prime power
                divides are one zero, the length of the inferential identity's proof. Objective and subjective
                inconsistency: to formalize a subject is to believe it consistent, undecidability the formal way of
                saying something is not formalizable in the subject, the subject complete as a subject. The close, his:
                "different semantics, which loosely correspond to the difference between PA with and without zero,
                demonstrate that Gödel can be interpreted in two different ways. Its interpretation is subjective, and
                it is special as an interpretation which expresses subjectivity or objectivity in math. Let's call that
                the end of part one" (in the room, 11 November 2026).
            </Paragraph>
            <Paragraph>
                The sketch. What Part One formalizes is the model of <Means>$[[ ./The Subject of Logic ]]</Means>, its
                three identities, its rules of inference, its excluded middle and its soundness, and the step after it
                waits in that chapter's last section, Toward PA, on the compact expression. The formal shape the two
                readings must take is in <Means>$[[ ./Zero and Infinity ]]</Means>: they agree on every theorem of PA
                as a string, the Gödel sentence and the consistency sentence provably equivalent in both; they differ
                on the run with no numeral length, the search for a contradiction taking every step and never halting
                under Gödel's reading and taking no step under the subjective one, consistency being the empty string
                and its proof the empty proof; both hold because theorems only mention runs with a numeral length, so
                the difference sits in the undecidable; and the proof of that lives in the logic with the identities,
                where the empty proof and the empty string are terms, not in PA. Theorems here: the lemmas of Zero for
                Proof, the equivalence of the Gödel sentence and consistency. Not a theorem but a definition: subjective
                inconsistency, a sentence and its negation meaning the same if both are formalizable. References:
                <Means>$[[ Gödel 1931 ]]( Mathematical Library / Gödel 1931 )</Means> for the fixed point and the second
                theorem; <Means>$[[ Rosser 1936 ]]( Mathematical Library / Rosser 1936 )</Means> for the sentence that
                removes ω-consistency; <Means>$[[ Löb 1955 ]]( Mathematical Library / Löb 1955 )</Means> for the
                derivability conditions the equivalence leans on;
                <Means>$[[ Feferman 1960 ]]( Mathematical Library / Feferman 1960 )</Means> for the arithmetization
                and its intensionality, that which sentence says consistency depends on how provability is written;
                <Means>$[[ Kripke 1975 ]]( Mathematical Library / Kripke 1975 )</Means> for a truth predicate with a
                fixed point as the precedent for an identity adjoined;
                <Means>$[[ Turing 1939 ]]( Mathematical Library / Turing 1939 )</Means> for the adding of Gödel
                sentences by ordinals, the road not taken.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Part Two, The Subject of Specification</Heading>
            <Paragraph>
                Opened on 11 November, "Part two has to be about specifying a subject... absent a formalization build
                purposely for specifying the semantics of a subject, we might continue doing so in PA?... It is a bit
                circular, but I think this is the point" (in the room, 11 November 2026), in four movements, ending on
                symmetry. The four follow, each with its sketch and its references.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The historical account</Heading>
            <Paragraph>
                The first movement justifies staying in arithmetic and ends at referential inconsistency. Part One went
                back to before model theory was born, to Gödel's fixed point, arithmetic interpreting arithmetic:
                "technically we went back to the time before model theory was born right? That's why we started with
                Gödel. He decided to use arithmetic to interpret arithmetic as his mathematical fixed point. Model Theory
                is a reflection of incompleteness - that set theory is the object that represents math and therefore it
                can be used to interpret all the others. That is the same perspective that holds an omega-complete
                witness as something one can refer to" (in the room, 11 November 2026). Set theory as the subject that
                holds the totality as an object, "the subject Gödel helped to formalize which expresses the idea of
                studying the completed totality... The subject of math includes the study of a form of truth that proof
                cannot represent. That is the subject of set theory"; Gödel's arithmetic "an object that represents
                language", his own a subject that believes itself expressive enough to specify itself. Sympathy for
                Hilbert, who wanted Cantor's paradise complete and required proof finite. The rational number: every
                base-10 digit ever written, in order, modulo simultaneity, is a rational number, and mathematics
                imagines things far beyond it. Referential inconsistency defined: "the idea that you can reason
                hypothetically about something that you can't refer to. Suppose I could refer to it? Then and only then
                could I prove this. Contradiction! Therefore I can't prove this. That is referential inconsistency. You
                referred to it in that syllogism"; and "The second you referred to a completed totality of things without
                a finite account, you referred to something that cannot be described by language" (in the room, 11
                November 2026). The diagonal argument as the example, his of 12 November: "the diagonal argument is a
                hypothetical about writing a list. What if one of those hypothetical lists is an infinite length proof
                that this technique yields inconsistency? A joke, but not quite. There is an idea that if I can write
                down a finite hypothetical situation to help understand an infinite number of things, then that
                transcends infinity. And that's only true if it's something you were allowed to refer to in the first
                place". The movement ends at the expression of referential inconsistency inside PA, Gödel's own
                hypothetical, suppose G were provable, as the place his argument refers to what it cannot: "You used the
                idea hypothetically consider if G was wrong and it was in fact provable, and your arguments became
                referentially inconsistent right there. That is why G is unformalizable".
            </Paragraph>
            <Paragraph>
                The sketch. A definition of referential inconsistency in the subject's terms, the syllogism form, a
                hypothesis whose only referent the subject refuses; its application to the diagonal, to the Gödel
                sentence, to the ω-complete witness and to PA with the negation of consistency, which "is not actually
                inconsistent. You never referred to it" (in the room, 11 November 2026); and the subject's referential
                integrity stated, open whether as a belief of the foundation or a property proved. Theorems here: none
                yet; the movement is an account, and its one formal object is the definition. References, none held
                but Feferman: Cantor's diagonal paper of 1891 and his Grundlagen of 1883, where the absolute infinite is
                named God; Hilbert's On the Infinite of 1926, the paradise; Frege 1892 on sense without reference;
                Russell 1905 on descriptions that refer to nothing; Tarski on truth; Kronecker and the finitary standpoint;
                Gödel 1947 on the continuum problem, where the completed totality is held as an object; Cohen 1963;
                Poincaré against Hilbert's 1904 programme; <Means>$[[ Feferman 1960 ]]( Mathematical Library / Feferman 1960 )</Means> held.
                Cantor 1891 and Hilbert 1926 are to be chapters of the library; the sprint that writes this note did not
                reach them.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The essential fact</Heading>
            <Paragraph>
                The second movement states the fact and derives it. His: "what can be referred to sensibly is
                subjective, so that we draw our inspiration from the idea that infinity is not something that can be
                referred to sensibly in regard to what can be represented in language, yet the universal quantifier
                expresses generalization over all, but not that it can be removed and replaced with for none instead. To
                refer to the totality is to only express things that can be reflected in zero. This symmetry, we will
                take to be fundamental to the subject of arithmetic" (in the room, 11 November 2026). In arithmetic's
                terms, "every number having a successor, so that it expresses totality in the absence. Yet we refer to
                the existence of the absence of quantity as an undifferentiated identity. So to refer to that object
                directly is to refer to something indistinct from zero". The object that makes the numbers unsymmetric,
                his of 12 November: "Gödel's diagonalization is inspired by Cantor. And Cantor expresses a completed
                totality that can be distinguished from zero. Aleph not is not zero right? To express that is to be
                subjectively inconsistent with the subject we are referring to as arithmetic. That object is the thing
                that makes N unsymmetric"; the ω-complete witness is the same object under another name.
            </Paragraph>
            <Paragraph>
                The sketch. The fact stated as the subject's one belief: to refer to the totality is to express only
                what can be reflected in zero, with the reading of the universal quantifier that it generalizes over all
                and is never replaced by 'for none', left open for his word; its derivation from the successor axiom and
                zero's place, totality expressed in the absence of a last number and the absence of quantity named by
                one undifferentiated identity; and aleph-null named as the one assertion the subject refuses, by Part
                One's definition, since 'the totality is distinct from zero' and 'the totality is indistinct from zero'
                would mean the same if both were formalizable in it. Theorems here: that every number has a successor
                and none has zero as its successor, PA's own axioms read as the subject's commitments. The belief: the
                fact itself. References: Dedekind's Was sind und was sollen die Zahlen of 1888, the simply infinite
                system and the base element with no predecessor, not held, beside
                <Means>$[[ Dedekind 1872 ]]( Mathematical Library / Dedekind 1872 )</Means>, held, for continuity adopted
                as an axiom, the precedent of <Means>$[[ ./The Mechanism ]]</Means>; Cantor 1883 and 1891 again.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The completion</Heading>
            <Paragraph>
                The third movement. "The completeness of adding quantity, and quantifying multiplicity are a part of our
                subject... this can be studied in modular arithmetics where zero literally is both the smallest number
                and the successor of the largest one. Therefore our subject has a completion that's related to
                modularity yet in the context of an unrepeated totality, as expressed by the idea that there is no
                number whose successor is zero... This would all be specified reflectively in PA" (in the room, 11
                November 2026).
            </Paragraph>
            <Paragraph>
                The sketch. Addition and multiplication complete as theorems, every sum and every product a number; the
                modular arithmetics as the completions, each a finite subject in which zero is both the smallest number
                and the successor of the largest and in which the product of enough primes is literally zero; and the
                unrepeated totality as PA's own axiom, no number's successor is zero, read as the subject's commitment
                that its completion is not a repetition. Theorems here: the completeness of the two operations in PA,
                and for each modulus the modular facts, every one a theorem of PA about that modulus. References:
                Gauss's Disquisitiones of 1801, the congruences, not held, beside
                <Means>$[[ Gauss 1799 ]]( Mathematical Library / Gauss 1799 )</Means>, held, the fundamental theorem of
                algebra, for the field's completion that the subject does not take; the notebook's own modular
                arithmetics of the family in <Means>$[[ ./The Options ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The factorial interpretation and the rule</Heading>
            <Paragraph>
                The fourth movement, ending on symmetry. The number divided by everything up to N is the factorial-like
                thing, the product of the primes below N; the one divided by everything is zero, and PA proves it is the
                only one. His Euclid form of 12 November: "Imagine the form of Euclid's proof is: Assume all primes are
                the primes less than N - One interpretation: Oh well the product of all of them is a GC counterexample.
                Have I disproved GC yet? Answer: No, because that number plus one is another prime. Repeat. Second
                Answer: No because that number is 0 which doesn't apply. You can repeat this same argument to twin primes
                to show that that number plus one and minus one would both be primes. Do you see how it's a form of
                induction that would be able to prove something if the assumption that there is a completion wouldn't
                prove another one. Yet zero has that completion as its divisors. Hence the justification as a rule of
                inference". Corrected the same day: "neither of those are valid inferences. It just proves that they are
                very simple theorems related to considering the factorial like thing at the top is finite, and the only
                reason they are invalid is that that same thing imagines us producing another prime". The direction:
                "one says that the thing that is a counterexample is pushed off to totality, and if zero isn't a
                counterexample, neither is that. For twin primes, it means more like we imagine that twin primes extend
                out to the totality". The commitment: "the thing that was missing was a commitment that the rule by
                which we refer to the totality at the top is that it is indistinct from zero insofar as we can refer to
                it in arithmetic. That is definitively not the standard model. It's not cartesian. This is not a rule of
                inference that we would import into that picture of arithmetic. The subjective choice between
                subjectivity and incompleteness is the justification for this symmetry". And of the old version: "it
                was a paper justifying that Goldbach as an axiom expresses something that can't be expressed. I figured
                out how to encode it as a rule of inference. Or at least, figured out the first part".
            </Paragraph>
            <Paragraph>
                The sketch. The rule, proof by symmetry, as a schema beside induction: the hypothesis that the
                factorial-like thing at the top is a number, a condition PA refutes for every nonzero number since the
                number plus one brings another prime; what is proved under it, read at the hypothesis's only referent,
                zero, which has the completion as its divisors; the licence a reading at zero, the conclusions Π₁ and
                refutable, the refutation clause of <Means>$[[ ./Goldbach ]]</Means> standing, "should PA find a counter
                example, we commit to the idea that our specification is inconsistent"; safety through the frontier
                results, each conclusion consistent with PA and true under Σ₁-soundness; the parity problem as the
                precise statement that no premise proves the conclusion in PA, so the rule is a licence across exactly
                that barrier. Important to the work, his, that the rule cannot be adopted in the standard model: there
                the top is an object distinct from zero, the hypothesis has another referent, and the reading at zero is
                false; the rule is sound only where the subject refuses aleph-null. The factorial returns from the
                refused axiom forms of <Means>$[[ ./Two-Sided Arithmetic ]]</Means> in a new role, the interpretation the
                rule is derived from, which is the difference between an axiom and a rule; the two sieves and "P′ = P is
                a description collapsing onto its only referent" of <Means>$[[ ./The Surviving Sentence ]]</Means> are
                the same reading. Theorems here: zero is the only number divided by every prime; Euclid's step; under
                the finite-top hypothesis, the product is a Goldbach counterexample and its neighbours a twin pair, with
                the hypothesis refuted. The rule: proof by symmetry, with its one commitment. By the rule: Goldbach and
                the twin primes. References: Euclid, book IX, proposition 20;
                <Means>$[[ Hardy and Littlewood 1923 ]]( Mathematical Library / Hardy and Littlewood 1923 )</Means>,
                held, whose count normalizes to the singular series on the circle;
                <Means>$[[ Chen 1973 ]]( Mathematical Library / Chen 1973 )</Means> and Selberg's parity problem, the
                barrier; the geometric precedents of <Means>$[[ ./The Mechanism ]]</Means>,
                <Means>$[[ Lobachevsky 1840 ]]( Mathematical Library / Lobachevsky 1840 )</Means>,
                <Means>$[[ Beltrami 1868 ]]( Mathematical Library / Beltrami 1868 )</Means>,
                <Means>$[[ Hilbert 1899 ]]( Mathematical Library / Hilbert 1899 )</Means> and
                <Means>$[[ Hilbert 1901 ]]( Mathematical Library / Hilbert 1901 )</Means>, for a postulate adopted and
                its independence proved.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Part Three, The Object of Study</Heading>
            <Paragraph>
                "if part two ends on symmetry and we focus on a factorial interpretation to derive it, we can focus part
                three on proofs of the prime conjectures? That is a really beautiful way to end The Subject of
                Arithmetic. They will be basic arithmetical proofs of them" (in the room, 12 November 2026). The object
                first, "a potential resolution to the object of study in analytical number theory": on the Riemann
                sphere every direction to infinity loops back to one point and the field adds that point as an object,
                the Cartesian act; the torus whose hole has shrunk to a point, "a sort of torus with no hole because the
                hole would be zero", is the sphere with its two poles glued, so positive and negative infinity meet at
                zero itself; and the subject asserts less than the drawing, "all you know is the symmetry. You don't
                know where it loops because it might not. It's just that the object out there can't be distinguished
                from zero in any direction". Made exact in <Means>$[[ ./Zero and Infinity ]]</Means>, on his doubt
                that a whole-plane torus takes no account of going one direction at a time: one prime at a time, the
                plane a cylinder from zero to infinity in that prime's variable, Riemann's reflection exchanging its ends
                and fixing the critical circle, his identification joining the ends into a torus, one for each prime,
                all sharing one mirror. Then the proofs by the rule, Goldbach the ending as the preface says, twin primes
                with the shift by two as its reflection, and Riemann's beginning: the hypothesis checkable at each
                number and refuted by a counterexample, the computer check Turing's method counting the zeros on the
                line against the total, "this object should be conceived of in a way that doesn't require aleph null,
                but since it is checkable on computer, obviously it is related to something that can".
            </Paragraph>
            <Paragraph>
                The sketch. The object described in the subject's terms with the sphere and the torus as the field's
                pictures, the ruling of <Means>$[[ ./The Rulings ]]</Means> standing that negatives make no sense in the
                PA imagined and that the sphere is the field's version; the application to Riemann noted and no more,
                the critical line one such circle, the reflection with conjugation its symmetry, the zeros in mirrored
                pairs and the hypothesis each pair one point; the two proofs; and the beginning of the third from the
                check's arithmetization, where one step stays open, whether a zero of zeta is a property of the
                completed totality the rule reads at zero or is reached only through that arithmetization. Exact
                relations the field already holds, marked as held from memory and for checking: zeta's reciprocal is the
                product over all primes of one minus p to the minus s, exactly zero at s equal to one by Euler; the sum
                of the Möbius function over n is zero, equivalent to the prime number theorem; the hypothesis is
                equivalent to the rate of that cancellation, Littlewood 1912, and the sharp form was Mertens'
                conjecture, disproved by Odlyzko and te Riele in 1985; the hypothesis has an arithmetic form with one
                universal quantifier, Davis, Matiyasevich and Robinson 1976, and an elementary one, Lagarias 2002. The
                team's reading, marked as ours: the prime number theorem says the totality of primes is zero, the
                hypothesis says it goes to zero symmetrically, the rule gives the zero and the hypothesis is the
                symmetry of the approach, which is why Riemann has a beginning here and not a proof. Theorems here: in
                every modular arithmetic the product of enough primes is zero. By the rule: Goldbach, twin primes, and
                what of Riemann the reading at zero reaches. References:
                <Means>$[[ Hardy and Littlewood 1923 ]]( Mathematical Library / Hardy and Littlewood 1923 )</Means>
                again; Riemann 1859; Turing 1953 on the calculation of the zeros; Hardy 1914 on infinitely many on
                the line; Platt and Trudgian 2021 for the height the check has reached; Vinogradov 1937 and Helfgott
                2013 for three primes; Zhang 2013, Maynard 2013 and Polymath8 for the gap; Bhowmik and Halupczok on the
                Goldbach count and the hypothesis; the topology of a sphere with two points identified, to be found.
            </Paragraph>
        </Section>
        <Section>
            <Heading>What the textbook will work</Heading>
            <Paragraph>
                Gathered from the sketches, for the Textbook of Arithmetic, which stays a cover and an empty table until
                its sprint. As theorems: zero is the only number divided by every prime; Euclid's step, that the product
                of the primes below N plus one has a prime factor not below N; the two simple theorems under the
                finite-top hypothesis, the product a Goldbach counterexample and its neighbours a twin pair, with the
                hypothesis refuted; the reflection and the two sieves of Two-Sided Arithmetic; the completeness of
                addition and multiplication; for each modulus, the product of enough primes is zero; the equivalence of
                the Gödel sentence and consistency; and the rational number, every digit ever written in order. As the
                rule: proof by symmetry, stated beside induction with its one commitment and its refutation clause. By
                the rule: Goldbach, twin primes, and Riemann's beginning. As a definition, not a theorem: subjective
                inconsistency, and referential inconsistency in the syllogism form.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The open points</Heading>
            <Paragraph>
                Four, each his to rule, none decided here. Whether the universal quantifier's reading, generalization
                over all and never 'for none', is a premise of the subject or a consequence of the essential fact.
                Whether referential integrity is a belief of the foundation or a property proved of arithmetic. Whether
                the essential fact is the subject's one subjective identification, the conjectures being its objective
                ones. Whether the logical identity's law is absorbing or neutral, the question
                <Means>$[[ ./The Subject of Logic ]]</Means> leaves. And beside them the step Part Three leaves,
                said above, and the names, every one a proxy until he keeps it.
            </Paragraph>
        </Section>
    </Chapter>
);
