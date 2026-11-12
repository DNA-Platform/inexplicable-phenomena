import { Chapter, Heading, Line, List, Means, Paragraph, Part, Section, Sentence, Title, Word } from '@dna-platform/public';
import { Table } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ Always a Bridesmaid ]]</Title>
        <Paragraph>
            Never a bride. Set down from his Claude Desktop session of 12 November 2026, on his word: "Let's
            store it. It is a perfect analogy" — the analogy for how undecidable propositions work in logic,
            his words quoted and the session's side carried in paraphrase; the walk stands in Sprint 129's
            record.
        </Paragraph>
        <Section>
            <Heading>The wedding and the subject</Heading>
            <Paragraph>
                An unformalizable sentence is always a composite, never the identity of the sentence. A
                bridesmaid is in every wedding she attends and is never the one the wedding is about. His
                version names the occasion too: "A bridesmaid can be a component of a wedding, but in a
                gendered thing that creates an identity out of two opposites, there can be parts of that that
                are necessary, but have no identity in terms of marriage."
            </Paragraph>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>The wedding</Word>
                    <Word>The subject</Word>
                </Sentence>
                <Sentence>
                    <Word>the two who marry</Word>
                    <Word>a truth and its structural negation, T and F</Word>
                </Sentence>
                <Sentence>
                    <Word>the marriage, one identity made from the two</Word>
                    <Word>the logical identity, what a statement and its negation compose to</Word>
                </Sentence>
                <Sentence>
                    <Word>the bridesmaid: necessary, present, with no identity in terms of the marriage</Word>
                    <Word>the unformalizable: used in theorems, never the whole of one</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                T and F are the only ones the ceremony is about, and it is about them as a pair. G is not one
                of the two, and neither is ¬G: negating a bridesmaid gives another bridesmaid, which is why
                negation is harmless here. And she is necessary, not incidental. What arithmetic knows about
                its own proofs cannot be stated without G appearing in the sentence. The theorems need her
                there; they just never conclude her.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The side of proof</Heading>
            <Paragraph>
                Two sets of rules run through this note, and his ruling is that they need not agree: "we don't
                need the rules of proof to be the same as the rules of meaninglessness." On the side of proof:
            </Paragraph>
            <Paragraph>
                <List />
                <Line>Proven: the last statement of some proof.</Line>
                <Line>Refuted: its structural negation is proven.</Line>
                <Line>Unformalizable: neither. It is never what a proof arrives at.</Line>
            </Paragraph>
            <Paragraph>
                Nothing here stops an unformalizable statement from being used. It can sit inside a proven
                statement, as G does in S1 ∨ G; it can be assumed and discharged. What it cannot be is a
                conclusion — "You can prove something with it, but it cannot ever be proven."
            </Paragraph>
        </Section>
        <Section>
            <Heading>The side of meaning</Heading>
            <Paragraph>
                The logical identity is assigned to the empty string. It is fixed under negation, and a
                statement composed with its negation yields it.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Where the two meet</Heading>
            <Paragraph>
                The mapping from a proof to its last statement does it without anything extra. An
                unformalizable statement has no proof that ends in it; the only proof left is the empty one,
                and the empty proof is sent to the empty string. So the value an unformalizable statement
                gets is whatever the empty string has: the logical identity. That is Pf(X, 0) from the paper,
                and G sharing the empty string's value, obtained from the mapping and not laid down
                separately.
            </Paragraph>
            <Paragraph>
                The empty string earns its place the same way, without stipulation: it is a part of every
                string, by joining, and the whole of none that is a sentence.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The identification of truth</Heading>
            <Paragraph>
                His ruling, the moment the analogy arrived: "It can't be an identity! Yes, this is it. The
                theorems that have it always have it as a composite. It is never the identity of the
                sentence. Right here, this is the identification of truth." Stated plainly: a sentence is
                identified when it is the whole of what some proof arrives at. Truth is being that whole.
            </Paragraph>
            <Paragraph>
                <List />
                <Line>T: X is the whole of a theorem.</Line>
                <Line>F: the structural negation of X is the whole of a theorem.</Line>
                <Line>Unformalizable: neither — yet X occurs inside theorems as a component.</Line>
            </Paragraph>
            <Paragraph>
                Every sentence whatever occurs as a part of some theorem, since X ∨ ¬X is always one, so
                occurring among the theorems distinguishes nothing. What distinguishes is whether the
                sentence can stand as the whole. Proof maps a composition to its last statement, and the
                last statement is a whole sentence: the mapping picks out exactly the wholes, and those are
                the truths. Everything else is material that truths are made with.
            </Paragraph>
        </Section>
        <Section>
            <Heading>What arithmetic says with G</Heading>
            <Paragraph>
                Every fact PA proves about Gödel's sentence
                (<Means>$[[ Gödel 1931 ]]( Mathematical Library / Gödel 1931 )</Means>) has G as a part and
                never as the whole:
            </Paragraph>
            <Paragraph>
                <List />
                <Line>G ↔ "G has no proof" — the sentence that defines it.</Line>
                <Line>Con → G — the second theorem.</Line>
                <Line>G ∨ ¬G.</Line>
            </Paragraph>
            <Paragraph>
                PA says a great deal with G and never says G. So always a composite, never the identity of
                the sentence is not a metaphor for incompleteness; it is what the theorems literally look
                like. G has been to a great many weddings.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Explosion without an event</Heading>
            <Paragraph>
                The rules of proof can stay as they are, so System A still matches PA string for string, and
                explosion becomes harmless in a precise way: (X ∧ ¬X) → Y is proven for every Y — something
                proven with a contradiction — while the contradiction itself is never proven, so the step
                that would deliver Y never happens. Contradiction implies everything survives as a sentence
                and never as an event.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Kept exact</Heading>
            <Paragraph>
                <List />
                <Line>
                    Part means a component sentence of the theorem, used. G also occurs named, by its code,
                    inside the sentence that defines it; that is its representation and not G — the
                    distinction already in the specification for Proof by Equality.
                </Line>
                <Line>
                    F is defined through the partner, so the precise statement of unformalizable is: neither
                    it nor its structural negation is ever the whole.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What stays open</Heading>
            <Paragraph>
                The harmlessness of explosion depends on no contradiction ever being proven, which is
                consistency. So the harmlessness of explosion and the value at the empty string are the same
                fact seen from the two sides — where the reflection should start.
            </Paragraph>
        </Section>
    </Chapter>
);
