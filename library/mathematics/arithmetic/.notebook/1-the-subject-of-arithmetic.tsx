import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Paper</Part>
        <Title>[[ The Subject of Arithmetic ]]</Title>
        <Paragraph>
            The paper is a reinterpretation of Gödel whose consequence is in number theory: Goldbach's conjecture
            read as an axiom of arithmetic rather than a theorem waiting for its proof. Its one sentence, in Doug's
            words: "we believe PA expressed its subjective consistency by not expressing GC - we commit to the idea
            that PA can be expressed to have or lack this imagined symmetry and GC is a consequence that should be
            true in modular PA, in which the numbers are two-sided, and false in regular PA in which the numbers are
            one sided (no zero on the other side)" (Goldbach through Gödel, The Six Movements, 31 October 2026). Our
            reading: a theory cannot say its own consistency, so it shows it by what it does not prove; Goldbach is
            what that silence looks like when the primes are imagined symmetric about a zero at the horizon.
        </Paragraph>
        <Section>
            <Heading>What the paper is</Heading>
            <Paragraph>
                Doug ordered the paper written to justify its own kind of result, "the structure of a math paper that
                we would use to present this result, which includes justifying a new type of result" (Goldbach
                through Gödel, The Two Drafts, 28 October 2026), and two drafts died under his corrections. The first
                headlined the inferential identity with Goldbach as an application: "Haha you think establishing an
                inferential identity is the thing, with a justification for the oldest unsolved math conjecture as an
                aside?" (The Two Drafts). The second led with its mechanism, and he set the order: "I want you to
                rewrite it motivated by Godel. You miss the point. You miss the idea that it is the Godel result, and
                how we justify not changing PA that is the result that follows you around to every single formalism.
                Granting that argument is granting the model of arithmetic involved" (The Surviving Sentence, 29
                October 2026). So the paper is Gödel first: the justification for changing nothing after 1931 is
                itself a choice of a model of arithmetic, and the choice has a consequence. What the result is, and
                what it is not: "You understand that GC as axiom is revolutionary. de POlignac is great but if you
                are doing a condensed version, that is not a part of the result at all. It is a nice corollary" (The
                Surviving Sentence). The kind of claim it makes is in <Means>$[[ ./The Type of Result ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The flow as read back</Heading>
            <Paragraph>
                At the close he asked, "Okay so where were with with the math paper? What is the flow of that
                argument? Can you read back and remember?" (The Paper's Flow, 5 November 2026), and the flow came
                back in six movements: the title, Gödel through Goldbach; zero under its three names, the empty
                proof, the inferential identity and the horizon; the mechanism, a theorem of an imagined model
                adopted as an axiom; GC itself as PA's subjective consistency; and the ending on GC, with the stale
                document of the essential argument the one task left. The movements are to be taken from that
                message when the paper is drafted here, not from this note; the abstractions they use are the five
                chapters of this notebook's second part, and the statements they rest on
                are <Means>$[[ ./The Theorems ]]</Means> and <Means>$[[ ./The Axiom ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The title's history</Heading>
            <Paragraph>
                The name was coined in October 2025 as Goldbach through Gödel and flipped the same sitting: "Shouldn't
                it be Godel through Goldbach? Because we are using Goldbach to express unprovability? Or are we
                reflecting on the unprovability of Goldbach using Godel as a lens?" (Gödel through Goldbach: The
                Paper, Memory Exhaustion, 12 October 2025). A year later the long conversation carried the first
                order as its own title and flipped it again at the same place in the argument: "Let's call it Godel
                though Goldbach. Where do we start? I think we end on GC" (Goldbach through Gödel, The Six Movements,
                31 October 2026). The order of the two names never settled in the conversations, which is why the
                paper has a new name here: The Subject of Arithmetic, given on 9 November 2026 when this notebook was
                made, the subject being what the paper is about, a theory read as a subject that expresses its
                consistency by what it cannot say.
            </Paragraph>
        </Section>
        <Section>
            <Heading>What it is not</Heading>
            <Paragraph>
                It is not the paper planned in October 2025. That plan was "Days not months", a ten-page dichotomy
                paper built on a pairs arithmetization, a proof capacity G(n) and four cases of truth by provability
                with entropy measures after Chaitin and Shannon (Gödel through Goldbach: The Paper, The Scope of the
                Paper, The Four Cases and Proof Capacity, 12 October 2025). The long conversation enters that
                framework as given at its third message and never works it again as mathematics; what survives of
                it is the pairs, as the two sieves of the circle, and the discipline that a representation is not a
                number. The rest stands in <Means>$[[ ./The Archive ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
