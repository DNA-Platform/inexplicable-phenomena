import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Paper</Part>
        <Title>[[ The Type of Result ]]</Title>
        <Paragraph>
            The paper does not prove Goldbach's conjecture, and Doug refused every reading that said it did: "I can't
            tell you enough that if you think you are proving GC you are just wrong"; "We were trying to superimpose
            a property that isn't derivable" (Goldbach through Gödel, The Circle Proof, 28 October 2026). What it
            does is argue that a conjecture should be an axiom, and it weighs that as a result of a new genre: "I
            think this is an important result, even if it is a result that challenges what a mathematical result
            looks like" (The Essential Argument, 26 October 2026). The question the paper has to answer for a
            mathematician is his: "How do I get you to reason, from first principles, that a conjecture should
            actually be an axiom?" (The Essential Argument).
        </Paragraph>
        <Section>
            <Heading>An axiom of arithmetic</Heading>
            <Paragraph>
                His definition, reached on the fourth day: "A sentence that I believe is true that no combination os
                the axioms can decide is a good definition for an axiom of arithmetic" (The Shape of the Phantom
                Proof, 25 October 2026). And the mechanism that turns the definition into a method: "to believe
                undecidable is to decide true, which is to add an axiom, which provides the proof. What if that is
                how you prove GC?" (The Finding of an Axiom, 25 October 2026). We read this as the whole paper in
                miniature. Believing a Π₁ sentence undecidable is believing it has no counterexample, which is
                believing it true; the only way to hold that belief inside a theory is as an axiom; and once it is
                an axiom it has a proof of one line. The argument is circular by construction, and he named it so.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Circular reasoning as a thesis</Heading>
            <Paragraph>
                "I prefer Doug's Circular Reasoning Thesis - to point out first of all that if deduction is linear
                reasoning, this method of choosing axioms based on seeing a circle is circular reasoning - not
                usually consider valid, but this is not a valid deduction. And assigning it to my first (last is too
                fleh) name gives you that beautiful sense that circular reasoning should be as subjective as it is
                invalid. Yet... we suspect that it stands up to science!" (The Circular Reasoning Thesis, 27 October
                2026). Its model is Church and Turing: "Any universals that can be proven should literally be machine
                checkable. The Doug's Circular Reasoning Thesis should be like the Church Turing Thesis. And I doubt
                it's even unique. I invite others to imagine Godel in other ways to see what they find. But if this
                one seems to be machine checkable, perhaps consider it real!" (The Circular Reasoning Thesis). So the
                result is confirmed, never proven: its Π₁ consequences are checkable, and a counterexample would
                refute not a theorem but a way of imagining the numbers.
            </Paragraph>
        </Section>
        <Section>
            <Heading>A sentence that survives its proof</Heading>
            <Paragraph>
                The form the result takes was stated by Claude on 29 October and ordered kept: a theorem at every
                finite stage whose proof uses a property the limit lacks; the sentence survives, the proof does not,
                so it is an axiom. Doug: "this is very good. Note this in the memory of this or in a document", it
                being "a good description of how we arrive at an axiom that has the computationally checkable
                property that we expect but isn't generalizable" (The Surviving Sentence, 29 October 2026). Behind
                it is the identification: two sets, the primes sieved from below and the set sieved from above, set
                equal only where the theory cannot name the modulus. In his words the equality of the sieves is
                "something we cannot state in the limiting structure that is N, so that its consequence is reflected
                as a change to a theorem" (The Geometric Precedent, 28 October 2026), and "The beauty of my technique
                is the DIFFERENCE between the sets. We see that they are the same in the model of arithmetic that we
                settle on" (The Two Sieves, 28 October 2026). The circle and the sieves are
                in <Means>$[[ ./The Circle ]]</Means>; the axiom they yield in <Means>$[[ ./The Axiom ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The precedent from geometry</Heading>
            <Paragraph>
                He ruled where the precedent must come from: "It has to be from geometry because that is where
                mathemaiticans reasoned their way to axioms like we are" (The Geometric Precedent). Desargues was
                rejected on a criterion that defines the type: "That's a thing that was true and now needs to be an
                axiom to still be true. We need something that wasn't interesting before the equality, and after the
                equality is an important fact" (The Geometric Precedent). Lambert's parallel postulate fit, with the
                Riemann sphere kept as a second: "your example is good too. It is. We might give both." The simple
                form he accepted, "It could be an axiom" (The Geometric Precedent): what is a theorem on every finite
                member becomes an axiom on the limiting member, because the limit being a member is not a theorem.
            </Paragraph>
        </Section>
    </Chapter>
);
