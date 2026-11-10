import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Publication</Part>
        <Title>[[ The Preface ]]</Title>
        <Paragraph>
            The paper as it stood when its flow was last read back, on 5 November 2026: titled Gödel Through Goldbach
            then, The Subject of Arithmetic now, Gödel first and ending on Goldbach's conjecture. <Means>$[[ Gödel's theorems ]]( Mathematical Library / Gödel 1931 )</Means> leave
            arithmetic a choice, add G, add ¬G, add consistency and its successors, or change nothing.
            Mathematics changed nothing and never said why. The paper says why, shows that the justification
            carries a model of arithmetic, and shows that in that model one sentence of number theory is derived
            that PA cannot prove, so it enters PA as an axiom. Doug's ruling that set this order, on 29 October:
            "You miss the idea that it is the Gödel result, and how we justify not changing PA that is the result
            that follows you around to every single formalism. Granting that argument is granting the model of
            arithmetic involved" (Goldbach through Gödel, The Surviving Sentence, 29 October 2026).
        </Paragraph>
        <Section>
            <Heading>Two notions reimagined</Heading>
            <Paragraph>
                Consistency is not a proposition but the inferential identity, the empty proof ε, which no sentence
                can be; and incompleteness is not meaningful in these semantics. His words of 31 October, which turned
                the preface: "A proposition and its negation are both undecidable in the semantics when they are
                expressed by the same (empty) proof, and are therefore not representable by the subject" (Goldbach
                through Gödel, The Six Movements, 31 October 2026); and the same evening, "Something and its negation
                having the same consequence is an expression not expressed in this subject"; "Consistency itself is
                not an axiom, and it does not compel adding additional ones that are out of the subject. Hence, we
                feel no need to add G even if we imagine it is true" (The Six Movements). Gödel's result read this
                way is a result about representation, not a defect of PA: there are empty representations, and the
                negation of an empty representation is the same empty representation. The subject is complete over
                what it represents. This deprecates the earlier frame in which the paper reinterpreted incompleteness
                as a theorem about PA's gaps; after 31 October there is no gap to reinterpret.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Where it ends</Heading>
            <Paragraph>
                "Let's call it Gödel through Goldbach. Where do we start? I think we end on GC" (The Six Movements, 31
                October 2026). The inferential identity is the Gödel half; Goldbach is the last line and not an
                aside, his correction of the first draft that had it the other way round: "Haha you think
                establishing an inferential identity is the thing, with a justification for the oldest unsolved
                math conjecture as an aside?" (The Two Drafts, 28 October 2026). What the result is and is not: "You
                understand that GC as axiom is revolutionary. De Polignac is great but if you are doing a condensed
                version, that is not a part of the result at all. It is a nice corollary" (The Surviving Sentence).
                The whole has exactly one new act, the adoption of a sentence that survives the loss of its proof,
                said in <Means>$[[ ./The Mechanism ]]</Means>; remove it and the paper proves nothing about Goldbach
                and claims nothing.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The genesis, for the motivation</Heading>
            <Paragraph>
                How the result was found is told once, in a message Doug wrote for Gemini and never sent, on 4
                November: a nightmare about the number every prime divides, the way out through zero, and the
                discovery that the way out had been modular arithmetic all along. "I always felt mathematicians were
                tricky. They play little games with your mind, making you hallucinate things on the edge of
                possibility and try to convince you that they are real" (Subjectivity library catalogue, the unsent
                coda, 4 November 2026). "And the magic is that I didn't prove anything. I simply say look at that
                result that isn't in PA but is true on things arbitrarily large" (the unsent coda). And to Gemini,
                the day before, the stance the paper offers the reader: "This is a subjective alternative for PA
                provided you have no problem with Con(PA) being unprovable because it is unformalizable"
                (Subjectivity library catalogue, the Gemini transcript, 3 November 2026). The coda is the preface's
                motivation if the paper carries one; it is not part of the formal flow.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The title's history</Heading>
            <Paragraph>
                Coined in October 2025 as Goldbach through Gödel and flipped the same sitting: "Shouldn't it be Gödel
                through Goldbach? Because we are using Goldbach to express unprovability? Or are we reflecting on the
                unprovability of Goldbach using Gödel as a lens?" (Gödel through Goldbach: The Paper, Memory
                Exhaustion, 12 October 2025). Carried a year later as Goldbach Through Gödel for the working drafts
                of 26 to 29 October, flipped again on 31 October as above, and fixed as Gödel Through Goldbach at the
                read-back of 5 November. Named The Subject of Arithmetic here on 9 November 2026 when this notebook
                was made, the subject being what the paper is about: a theory read as a subject that expresses its
                consistency by what it cannot say.
            </Paragraph>
        </Section>
    </Chapter>
);
