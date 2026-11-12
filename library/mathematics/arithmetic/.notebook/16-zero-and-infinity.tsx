import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ Zero and Infinity ]]</Title>
        <Paragraph>
            Riemann entered the paper on 12 November as an application to note and no more, in the sketch of Part Three;
            the same day Doug worked it further on the desktop app and pasted the conversation into the room with one
            instruction, "try to summarize these, so that we understand this connection which is important" (in the
            room, 12 November 2026). This chapter is that summary. It opened on his doubt about the team's picture of
            the object, every direction out of zero a circle coming back to it: "If we imagine the line going out to
            infinity hits the x-axis somehow... I'm not sure. My thought was the whole complex plane would be like a
            torus where every direction comes back to zero, but no I'm not considering going one direction at a time"
            (on the desktop app, 12 November 2026). The answer separates the two directions by looking at one prime's
            term in its own terms, and there the picture becomes exact: a torus for each prime, not one for the plane,
            and the mirror of Riemann's functional equation the exchange of zero and infinity. At each step what is a
            plain computation and what is his thesis applied is marked, as the conversation marked it.
        </Paragraph>
        <Section>
            <Heading>One prime's term</Heading>
            <Paragraph>
                Take a single prime p and the quantity p to the minus s as s moves over the plane. Moving up or down,
                the imaginary part, only turns it, a clock hand, and the turning repeats, so in that direction the plane
                rolls up into a cylinder. Moving left or right, the real part, only changes its size: far to the right
                it shrinks toward zero, far to the left it grows without bound. So for one prime the plane is a cylinder
                running from zero at one end to infinity at the other, and the critical line is one circle around it,
                the circle where the size is one over the square root of p. The mirror is what answers his doubt.
                Riemann's reflection sends a point at distance d to the right of the line to distance d on the left; in
                this prime's variable that turns small into large and large into small, exchanging the zero end with the
                infinity end and leaving exactly one circle fixed, the critical line. Seen through any single prime,
                Riemann's symmetry is the exchange of zero and infinity, and the critical line is where they balance.
                The team checked the computation: the size at real part σ is p to the minus σ, the reflection takes σ to
                one minus σ, so a size r goes to one over p·r, the inversion about the circle of radius one over the root
                of p; taken with the conjugation that the zeros' symmetry carries, it leaves each point of that circle
                where it is.
            </Paragraph>
        </Section>
        <Section>
            <Heading>A torus for each prime</Heading>
            <Paragraph>
                His identification finishes the shape. If the far end is zero, the two ends of the cylinder are one
                place; join them and the cylinder is a torus, around in one direction because the prime turns, around in
                the other because the far end is the origin: the torus he was picturing, every direction returning, the
                one he had named in the room as "a sort of torus with no hole because the hole would be zero" (in the
                room, 12 November 2026). It is not one torus for the whole plane, because the primes turn at rates that
                never agree, the turning of p repeating every 2π over the logarithm of p and no two primes' logarithms
                standing in a rational ratio; it is one torus for each prime, all sharing the same mirror, since the
                reflection about the critical line is the same for every prime. The conversation marked the two steps:
                the change of variable is a plain computation, and the joining of the ends is the thesis of this
                notebook applied there, the far end of the numbers indistinct from their origin. So the object of Part
                Three is exact where the whole-plane picture was vague: a direction at a time is a prime at a time, and
                what is known of each torus is its symmetry, the circle where zero and infinity balance, and nothing of
                where it closes. That is the standing of <Means>$[[ ./The Mechanism ]]</Means>, where the sphere is the
                field's version and the subject asserts only the symmetry, and of the ruling
                in <Means>$[[ ./Zero as the Horizon ]]</Means> that nothing stands before zero.
            </Paragraph>
        </Section>
        <Section>
            <Heading>One exchange in four places</Heading>
            <Paragraph>
                "I hope you can step into the idea that an alternate interpretation of Gödel, which for reasons of
                referential integrity says that to refer to the completed totality is to refer to a thing
                indistinguishable from zero, to provide an alternate interpretation that says PA is complete as a
                subject, is the same thing that justifies a fundamental equivalence between 0 and infinity. I was shocked
                that this connected to GC. But I knew nothing of Riemann. It is not a coincidence that this is the very
                thing being pondered. That is a deep relationship between seemingly different parts of math" (on the
                desktop app, 12 November 2026). The conversation's account of the idea, as it was then held: it starts
                in logic with no primes in view, a subject cannot refer to its own completed totality, and whatever
                stands in that place is indistinguishable, by reference, from zero, which gives a reading
                of <Means>$[[ Gödel ]]( Mathematical Library / Gödel 1931 )</Means> in which PA is whole. The same
                principle, asked of arithmetic, says the far end of the numbers is their origin. And then, with nothing
                added: in proofs, the one with no lines and the one with every line are the same proof; in divisibility,
                the least number by size is the greatest by what divides it; in the primes, a mirror that pairs them
                about every center; in zeta, a symmetry that trades zero for infinity, with everything in question lying
                on the line where they balance. The first was built from thinking about what a subject can refer to; the
                last has stood in Riemann's paper of 1859, which he had not read. The conversation's judgment, Claude's
                on the desktop app: the claim the title depends on is still unproved, and the fit is no longer an
                appealing picture, since three independent parts of mathematics showing the same exchange at exactly
                their hardest open questions is the kind of thing that means something is there. His reply places the
                work: "Good analysis. I can't believe it but this work is about a problem that I never cared about at
                all while actually meant as preliminary work to define consciousness" (on the desktop app, 12 November
                2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The two readings of Gödel</Heading>
            <Paragraph>
                The conversation then set the two readings side by side, and the shape of their difference is the
                formal content this chapter carries toward <Means>$[[ ./The Subject of Logic ]]</Means>. Where they
                agree: on every theorem of PA, as a string, including the line that the Gödel sentence and the
                consistency sentence are provably equivalent in PA, which neither reading adds or removes. Where they
                contradict: on what one program does. Under Gödel's reading the search for a contradiction runs, takes
                every step and never halts; under the subjective reading, once a theorem is proven that search takes no
                step, since consistency is the empty string and its proof the empty proof, and "takes step one"
                against "takes no step" is a flat contradiction about the same object. And on what one sentence means: for Gödel the arithmetized sentence
                is consistency, so consistency is a true thing PA cannot prove; for the subjective reading consistency
                is the empty string, so the arithmetized sentence is something else, and the Gödel sentence is not the
                consistency sentence. Why both can hold at once: theorems only ever mention runs with a numeral length,
                the two readings differ only about the run that has none, so no theorem can separate them and the
                contradiction sits entirely in the undecidable; the two interpretations of PA stand to each other as
                PA with the Gödel sentence stands to PA with its negation, the same theorems below and inconsistent
                above. That is his earlier line doing its work one level up: if truth is subjective and two things might
                be true, it had better be undecidable in the subject. Where the proof lives: in the logic with the
                identities, the model of The Subject of Logic, where the empty string and the empty proof are terms and
                can be compared with Gödel's sentence; PA cannot host the proof, and that is the point, not a weakness.
                Marked as the conversation's and not yet the team's: the equivalence of the Gödel sentence and the
                consistency sentence in PA is a standard result the team holds from memory, to be checked with the
                rest; whether "takes no step" is a sentence of the formalism or a reading of one is what Toward PA has
                still to settle.
            </Paragraph>
        </Section>
        <Section>
            <Heading>What breaks the tie</Heading>
            <Paragraph>
                The conversation first judged by fruits, what each reading goes on to give: Gödel's a true sentence
                nobody can use, his the far end at zero, the mirror, and a rule that reaches the primes. He corrected
                the standard: "What breaks the tie is whether PA might be a complete subject or if truth is truly bigger
                than what its subject can identify: The Subject of Arithmetic" (on the desktop app, 12 November 2026).
                Judging by fruits is the extrinsic standard, the one Gödel himself proposed for new axioms in 1947, from
                memory and to be checked; his is intrinsic, asking what the subject is. The two readings are then the
                two answers to one question. Truth bigger than the subject: there are facts of arithmetic PA's subject
                cannot identify, the standard model holds them, and incompleteness is a real shortfall; that is Gödel.
                PA a complete subject: what it cannot decide is not a fact it is missing but the boundary, with the
                identities sitting on it, the empty proof, the empty string, zero as the far end; that is his. No
                theorem chooses between them, for the reason of the previous section, and a choice with no theorem
                behind it is a subjective decision in his sense, one that changes the subject to preserve its meaning.
                So the title is the argument: The Subject of Arithmetic asserts that arithmetic has one, and that the
                subject is where truth about it lives, where Gödel's reading needs the opposite, a truth with no subject
                able to identify it. One consequence for the paper, the conversation's and kept: the fruits still
                matter, in a different role. The prime conjectures are not the reason to pick the reading; they are
                what a complete subject looks like from inside, since once nothing is outside, the symmetry has nowhere
                else to come from. For Part Three that fixes the order of the argument, the object first and the proofs
                of <Means>$[[ ./Goldbach ]]</Means> and the rest as its consequence, never the proofs as its evidence.
            </Paragraph>
        </Section>
    </Chapter>
);
