import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Publication</Part>
        <Title>[[ The Mechanism ]]</Title>
        <Paragraph>
            The kind of result the paper claims, stated by Claude on 29 October and kept on Doug's order: "A theorem
            at every finite stage whose proof uses a property every stage has and the limit lacks. The proof doesn't
            survive the limit, because it used the property. The sentence survives, because it never mentioned it.
            A sentence that survives the loss of its proof is an axiom" (Goldbach through Gödel, The Surviving
            Sentence, 29 October 2026). His word on it: "this is very good. Note this in the memory of this or in a
            document", being "a good description of how we arrive at an axiom that has the computationally
            checkable property that we expect but isn't generalizable" (The Surviving Sentence). It is the one
            document of the three that the paper rests on, The Type of Result, saved that day.
        </Paragraph>
        <Section>
            <Heading>Choosing an axiom, not proving a theorem</Heading>
            <Paragraph>
                The method is a technique for choosing an axiom, and Doug refused every reading that made it a proof:
                "You understand that we are inventing a technique for choosing an axiom, NOT proving theorems?" (The
                Two Sieves, 28 October 2026); "I can't tell you enough that if you think you are proving GC you are
                just wrong"; "We were trying to superimpose a property that isn't derivable" (The Circle Proof, 28
                October 2026). The definition of an axiom of arithmetic the work reached on 25 October still stands
                under it: "A sentence that I believe is true that no combination of the axioms can decide is a good
                definition for an axiom of arithmetic" (The Shape of the Phantom Proof, 25 October 2026). The
                adoption rule is the paper's one new act, and <Means>$[[ ./The Surviving Sentence ]]</Means> is where
                it is performed.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The identification</Heading>
            <Paragraph>
                Behind the type is an identification: an imagined model identifies two things the theory cannot
                state as equal, and the only trace of the identification in the theory is a theorem changed in form.
                In his words the equality of the two sieves is "something we cannot state in the limiting structure
                that is N, so that its consequence is reflected as a change to a theorem" (The Geometric Precedent,
                28 October 2026). The criterion a precedent must meet: "We need something that wasn't interesting
                before the equality, and after the equality is an important fact" (The Geometric Precedent), on which
                Desargues was rejected. And the simple form he accepted with "It could be an axiom" (The Geometric
                Precedent): what is a theorem on every finite member becomes an axiom on the limiting member, because
                the limit being a member is not a theorem.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The precedents from geometry</Heading>
            <Paragraph>
                "It has to be from geometry because that is where mathematicians reasoned their way to axioms like
                we are" (The Geometric Precedent, 28 October 2026). The precedent the paper carries is Euclid's fifth
                postulate as the limit of Girard: on every sphere the angle sum minus π is the area over the radius
                squared, proved by three lunes and the sphere's total area; the plane sheds the closure, no total
                area, the proof gone, the statement kept, and excess equal to zero is Euclid V. Lambert read the
                acute case off a sphere of imaginary radius; <Means>$[[ Lobachevsky ]]( Mathematical Library / Lobachevsky 1840 )</Means> adopted
                the other postulate outright and built the geometry on it, which is the precedent for reasoning about
                what an axiom is, added on 10 November 2026 on Doug's word; <Means>$[[ Beltrami ]]( Mathematical Library / Beltrami 1868 )</Means> showed
                V unprovable; <Means>$[[ Hilbert ]]( Mathematical Library / Hilbert 1901 )</Means> showed the imaginary
                sphere no object in Euclidean space, having proved the axioms of geometry independent of one another
                in his <Means>$[[ Grundlagen ]]( Mathematical Library / Hilbert 1899 )</Means>. The Riemann sphere
                and <Means>$[[ the fundamental theorem of algebra ]]( Mathematical Library / Gauss 1799 )</Means> are
                kept as the field's version, where the limit is an object and the sentence is also a theorem of
                analysis: "your example is good too. It is. We might give both" (The Geometric
                Precedent). <Means>$[[ Dedekind ]]( Mathematical Library / Dedekind 1872 )</Means> on continuity and Cauchy
                on Poncelet's principle stand as the precedents for how such adoptions are received (The Surviving
                Sentence, 29 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The thesis behind the method</Heading>
            <Paragraph>
                What makes the method legitimate is a thesis and not a deduction, and it is named for its circularity:
                "if deduction is linear reasoning, this method of choosing axioms based on seeing a circle is circular
                reasoning - not usually considered valid, but this is not a valid deduction. And assigning it to my
                first (last is too fleh) name gives you that beautiful sense that circular reasoning should be as
                subjective as it is invalid. Yet... we suspect that it stands up to science!" (The Circular Reasoning
                Thesis, 27 October 2026). Its model: "Any universals that can be proven should literally be machine
                checkable. The Doug's Circular Reasoning Thesis should be like the Church Turing Thesis" (The
                Circular Reasoning Thesis). The paper states it in <Means>$[[ Church and Turing's form ]]( Mathematical Library / Turing 1936 )</Means>,
                with criteria and a refutation clause, as the ninth step of the flow of 31 October and the close of
                movement <Means>$[[ ./Goldbach ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
