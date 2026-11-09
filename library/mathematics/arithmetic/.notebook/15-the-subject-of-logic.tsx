import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Subject of Logic ]]</Title>
        <Paragraph>
            "Did you capture the idea of an algebraic model of the subject of logic?" (in the room, 9 November 2026).
            In pieces, and not as such: the notebook had the inferential identity and the empty proof, the empty string
            in the lexicon's identity column, and the lemmas, and nowhere the model with its three identities, its rules
            of inference, its excluded middle and its soundness. This chapter states the model in his words of 9
            November, the newest statement of the formalism, gathers the earlier forms it supersedes or renames, and
            ends with the team's candidate for the compact expression he asked for, marked as the team's and not his,
            and with what is already in PA for the step after it.
        </Paragraph>
        <Section>
            <Heading>Three identities</Heading>
            <Paragraph>
                "An algebraic model of the subject of logic, where we use the inferential identity, which we might
                comprehend as the empty proof; the rational identity (what I was calling the propositional identity),
                which is expressed as the empty string; and its truth value is the logical identity, which represents
                the absence of logic" (in the room, 9 November 2026). Three levels, proof, expression and value, and one
                identity at each: the empty proof concludes the empty string, and the empty string is valued at the
                logical identity, so the three are one object seen from each level. The lexicon of 3 November had a
                column of identities, inferential ε, referential 0, representational the empty string, epistemological
                Pf(y, 0), "and they are one object in Gödel's chart, which is the chart's whole point" (Claude, The
                Lexicon, 3 November 2026); the model keeps the first and the third, renames the proposition's identity
                rational, and adds the level the lexicon did not have, the value. One name has moved. On 28 October the
                empty string was the logical identity, "No, Con(PA) represented by the empty string is the logical
                identity" (Goldbach through Gödel, The Identity Element, 28 October 2026); on 9 November the empty
                string is the rational identity and the logical identity is its truth value. The earlier notes are read
                with the new name.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The excluded middle kept</Heading>
            <Paragraph>
                The logical identity "does not invalidate the law of the excluded middle because it is not another
                value, it is a value that corresponds to an expression that specifies that the expression is illogical"
                (in the room, 9 November 2026). This closes a question open since the first day. On 19 October the law
                was doubted: "Consistency is what logic is about"; "you get to truth through proof, as formalized by
                logic, so there is an undecidable middle" (The Permission, 19 October 2026), and the price of dropping it
                was named that afternoon, Kripke's, some sentences get no value (Claude, Certainty, 19 October 2026). On
                28 October the identity absorbed it: "G and not G have the empty proof, so G and not G are Con(PA) and
                Con(PA) which is just Con(PA) which we already know anyways" (The Identity Element, 28 October 2026),
                "Excluded middle holds; it just evaluates to the identity" (Claude, The Identity Element). On 1 November
                he weighed removal, under the heading of dangerous interpretations: "X and not X being the same expression
                means the law of the excluded middle must be interpreted only for sentences that are formalizable in the
                subject, and should therefore be removed unconditionally" (The Two Semantics of Zero, 1 November 2026),
                and the answer that day was to keep it and note that it has no content at ε. The statement of 9 November
                settles it as kept and says why in the model's own terms: the identity is not a third value, so bivalence
                is untouched; it is the value of an expression the subject does not represent, and what it says of that
                expression is that it is illogical. The removal of 1 November is deprecated; the price of 19 October is
                not paid.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Rules of inference and the axioms on the page</Heading>
            <Paragraph>
                "We want rules of inference that allow consistency as rational identity to motivate writing axioms on the
                page, which is the constructive way of saying they don't need a reason but also that it is our belief in
                the consistency of our formalization of the subject which compels us to use axioms to identify the
                objectives of the subject. Logical objectives identify the conclusions of the subject" (in the room, 9
                November 2026). The identity's rules were found on 28 October and found to be one rule: "The real trick
                is that you did nothing. You can add rules of inference for the empty sentence. And it to anything. Or
                it with anything. If you can imagine it as a line on the proof (that adds no lines to the proof), negate
                it... all of these things leave everything unchanged. You effectively just rewrote the previous line, as
                if repeating a past inference" (The Identity Element, 28 October 2026); every rule for the identity is
                restate, and the proof of consistency is a repetition. What 9 November adds is the first line. An axiom
                is written with no premise, and the rule that writes it is the identity's: from the empty proof, conclude
                A. That the step needs no reason is the constructive reading; that it is compelled is the other, "believing
                in consistency motivates just about every single thing you do in a deduction, and it precedes all
                deductions because to use deduction is to believe you can reason consistently, so using deduction to prove
                the consistency of the formalism you are using is to use circular reasoning so it can't be provable" (The
                Formal Core, 2 November 2026), and earlier, consistency as "the thing that implies all of the axioms" (The
                Standard Reading, 27 October 2026). The team reads the last sentence so: the axioms identify what the
                subject is about, its objectives; the logical objectives, what logic itself aims at, identify what follows,
                its conclusions. That reading is ours and waits on his word.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Soundness as formalizability</Heading>
            <Paragraph>
                "Hopefully we can express the semantics of logic in an algebraic form. Soundness is just the statement
                that the subject is formalizable" (in the room, 9 November 2026). Soundness here is not a sentence of the
                subject about itself, Prov(φ) → φ, which on 19 October was listed among the beliefs a subject cannot
                internalize, beside finite proof length and the law of the excluded middle (Gödel's Corner, 19 October
                2026), and whose point he had asked after that morning, "isn't that the whole point of proof and soundness
                and thus logic?" (Certainty, 19 October 2026). It is the statement that the subject has a formalization
                at all. Formalizable was given its meaning on 2 November: "For it to be formalizable is to have certain
                relationships to extended theories - we will prove consistency unprovable iff unformalizable because it
                would lack the ability to be added as an axiom in a related theory" (The Formal Core, 2 November 2026),
                and to Gemini the next day the stance was offered on that condition, Con(PA) "unprovable because it is
                unformalizable" (Subjectivity library catalogue, the Gemini transcript, 3 November 2026). So soundness
                is the identity law holding at every level, string, sentence, deduction, axiom and theory, T + ε = T
                of <Means>$[[ ./Zero for Proof ]]</Means>; the unformalizable is what cannot be added as an axiom
                anywhere, and the only such thing is the identity.
            </Paragraph>
        </Section>
        <Section>
            <Heading>A candidate compact expression</Heading>
            <Paragraph>
                The team's candidate, written from his words to be corrected, not his statement. The subject of logic
                is three carriers, proofs, expressions and values, each a monoid under its own composition, the
                concatenation of proofs, the connectives on expressions, the operations on values, each with its identity:
                the empty proof ε, the empty string, and the logical identity. Two maps join them, conclusion from proofs
                to expressions and valuation from expressions to values, and each carries the identity to the identity,
                which is the sense in which the three identities are one. The axiom rule is the identity's rule, from ε
                conclude A, and every other rule involving the identity is restate; consistency is the rational identity,
                the expression ε concludes, so the belief in consistency is what licenses the first line and is itself
                never a line. The values are two, with the logical identity adjoined and not a third; φ ∨ ¬φ is valued ⊤
                on every expression the subject represents and at the identity on an expression it does not, which is
                how the identity says that the expression is illogical. A subject is formalizable when the maps carry its
                identities to one another, and that is its soundness. What the candidate leaves for him to decide: whether
                the values are the two-element algebra with the identity outside it, his words of 9 November, or the
                Boolean algebra with one non-distributing element adjoined, the draft of 28 October; and whether the
                objectives of the subject are its axioms, as read above.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Toward PA</Heading>
            <Paragraph>
                His order: "After we find a compact expression of that, hopefully we can show how it might be formalized
                in PA" (in the room, 9 November 2026). What PA already carries, from <Means>$[[ ./Zero for Proof ]]</Means>:
                the inferential identity as Pf(·, 0), with PA ⊢ Pf(φ, 0) ↔ ¬Prov(φ) and PA ⊢ Con ↔ Pf(⊥, 0); the
                Neutrality Lemma and the Same-Consequence Lemma; and the frontier's results A to H, Pf(S, 0) never
                provable first among them. What the compact expression would add, in the team's guess: the rational
                identity at the code 0 of the empty string, since lengths are quantities and codes are names and the
                empty string has length 0, "both represented by zero at each level" (The Formal Core, 2 November 2026);
                the logical identity as what the Same-Consequence Lemma detects, a sentence and its negation with equal
                consequence, which PA states of a pair without valuing either; and the axiom rule as the proof of length
                1 whose premise is the identity. The end his program names is the same as on 2 November, that the
                description is identical to PA, "like PA with the addition of an empty theorem to express the absence of
                provability, that does not add an extra theorem to the language" (The Formal Core). The step waits on the
                compact expression he accepts.
            </Paragraph>
        </Section>
    </Chapter>
);
