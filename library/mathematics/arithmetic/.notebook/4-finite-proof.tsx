import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Abstractions</Part>
        <Title>[[ Finite Proof ]]</Title>
        <Paragraph>
            The paper's deepest assumption, and the one the long conversation reflected on until the vocabulary
            reorganized: "That representation of deduction must be finite to be semantically meaningful is a belief.
            And its not trivial" (Goldbach through Gödel, The Permission, 19 October 2026). The belief is chosen,
            not found: "I'm saying that I choose to believe in finiteness. true(n) and not prov(n) doesn't actually
            mean it was true" (True but Unprovable, 19 October 2026). Everything in the paper about what "true but
            unprovable" can mean follows from choosing it.
        </Paragraph>
        <Section>
            <Heading>Representational inconsistency</Heading>
            <Paragraph>
                His name for the standard tolerance of infinite proof: "I would say allowing infinite length proof
                should have a name - let was call it r-inconsistent (or representationally inconsistent" (True but
                Unprovable). The standard name is ω-inconsistency; his is the honest one, since it says where the
                fault lies, in what the representation can and cannot write down. The choice it forces:
                "Representationally incomplete... or objectively inconsistent" (True but Unprovable), and PA is the
                first. We read the pair as the paper's first dichotomy: a theory that believes in infinitely many
                numbers it can never list is either incomplete about them or inconsistent about itself, and finite
                proof is the decision to be the former.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The uniform step</Heading>
            <Paragraph>
                What induction is, once proof is finite: one finite representation that generates each instance's
                proof. Claude's theorem on the first day, built on from then: the uniform step is induction's whole
                content, and under finiteness induction and universal introduction are admissible under the ω-rule,
                removable and never primitive (The Infinite Proof, 19 October 2026). This closed a programme of the
                year before, where induction was to be dropped and Robinson's Q kept for hypotheticals (Gödel through
                Goldbach: Semantics and Induction, Dropping Induction, 12 October 2025): nothing needed dropping,
                because it was never primitive. What stays of that sitting is his reason induction cannot all go:
                "every number does need to have a list of prime factors. To not believe that is to not believe that
                something can be applied a finite number of times. Transduce fundamental theorem of arithmetic"
                (Semantics and Induction, The Surviving Induction, 12 October 2025).
            </Paragraph>
        </Section>
        <Section>
            <Heading>Universal extension</Heading>
            <Paragraph>
                Believing an uncheckable universal and adding the sentence for its checkability: "It is assumption
                wrapped in justifications closing. You can call it something like universal extension? Kind of what
                we do om science" (Certainty, 19 October 2026). And the rule that replaces the hallucinated infinite
                proof: "true(n) and not prov(n) just means I think n should be an axiom, and then it will be true
                because it is provable rtrivially, and there was never an infinite proof. That was a hallucination
                that helped me figure out what to do" (True but Unprovable). The line he draws against the standard
                view: "Science allows extrapolation from finite values. Math doesn't. Godel says you can't kbow
                consistency anyways, but mathematicians need to really bond with the idea these independent =&gt; true
                things really are a place where ypu need to extrapolate from the finite, and every time, you add in
                potential uncertainty and don't know" (Logic axioms and Gödel's incompleteness, 21 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The overshoot and the correctness condition</Heading>
            <Paragraph>
                Two things Claude formalized from his moves on the first day. The overshoot: the belief is that there
                is no finite proof of a contradiction, but Con(PA) quantifies over all numbers, phantoms included,
                so the sentence says more than the belief and the language cannot say less (The Sentence and the
                Belief, 19 October 2026). Hilbert's correctness condition, generalized from his own "Correct: PA
                Incomplete =&gt; PA is not actually what I wanted you to prove was incomplete": an object failing a
                presupposed property loses the reference, not the presupposition (The Sentence and the Belief). The
                correction that produced both: "Try to imagine formalizing the concept of not expressible in
                symbols. And you and you believe you did... I think you make this error a lot and don't mind" (The
                Sentence and the Belief). Every "cannot be said" is said from somewhere richer, and the paper's zero
                is where that somewhere is finally named; see <Means>$[[ ./Zero ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
