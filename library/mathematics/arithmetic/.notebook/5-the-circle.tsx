import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Abstractions</Part>
        <Title>[[ The Circle ]]</Title>
        <Paragraph>
            The picture the whole paper runs on: the natural numbers as a circle whose coordinates are the primes,
            with zero at the top as the number every prime divides. It came from a stance against the diagonal: "if
            a number is not computable, then we can't know whether it's larger or smaller, so the creation of the
            list contradicts our believed that we should therefore have a corresponding ordering" (Goldbach through
            Gödel, The Circle of the Primes, 25 October 2026). Claude made it exact as the profinite integers, the
            primes its axes, zero the only point with every coordinate zero; Doug's "zero is divisible by every
            prime" is a theorem there (The Circle of the Primes).
        </Paragraph>
        <Section>
            <Heading>The all-primes number</Heading>
            <Paragraph>
                His first use of the picture was wrong and he kept it: "I think… that is your number that breaks
                goldbach" (The Circle of the Primes), refuted at once, since the top of the circle is where Goldbach
                is easiest. He pressed on: "Why on my reading?!? Why can't that number, ignoring the fact that we
                think it causes inconsistency is an even number where every prime can't have a prime pair to sum
                because it divides it?" (The Shape of the Phantom Proof, 25 October 2026). The insistence paid: Gödel
                codes position i on the i-th prime, so a nonstandard-length proof is a number every standard prime
                divides, and PA proves Gödel's sentence equivalent to the sentence that any proof of it contains a
                Goldbach counterexample (The Shape of the Phantom Proof).
                The feared number and the witness of ¬G are one number, and by Euclid only 0 is divisible by every
                prime. "Does it change anything to imagine that zero is that nunber divisible by all primes, and it
                fails to be a goldback counterexample if small. Does that way of imagining things help make GC seem
                true" (The Circular Arithmetic, 26 October 2026). It does; the rest of the paper is the answer.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Circular arithmetic and the two sieves</Heading>
            <Paragraph>
                Arithmetic on 0 to primorial(N) − 1 so that the primorial is 0: the primes P sieved from the bottom,
                a set P' sieved from the top, both generators, and the claim that every n has an element of each
                equidistant from it. "I'm asking about all the numbers - those two sets have the same shape. You
                can't show that for numbers greater than 4 or whatever and less than primorial(N)-4 or whatever, you
                can find an element of one set and an element of the other set equidistant?" (The De Polignac
                Identity, 26 October 2026). Sum and difference are one problem on the circle: "Imagining that that
                nightmare is too small to solve GC builds the circular intuition that makes de Polignac == GC. Is
                that not beautiufl?" (The De Polignac Identity). His deepest stance about the line the circle
                replaces: "The truth is arithmetic was never coherent. There is no way to make the list and know
                where every number is on it" (The Circular Arithmetic).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The symmetry, not the circle</Heading>
            <Paragraph>
                When Claude built a whole enlightened arithmetic on the circle he struck the furniture: "It's not
                actually the circle. It's that the primes have a symmetry - two sets that shouldn't be the same but
                are. But otherwise it's not the circle. So you pick and choose the facts. I'm worried that you don't
                see the pattern. It's kind of like axiomizing different geometries" (The Enlightened Arithmetic, 27
                October 2026). The primitive is the symmetry postulate, the top sieve's
                set is the bottom sieve's, and the circle is what the postulate looks like drawn. The demand it set:
                "The top sieve is coming down from a number we can't see. You have to capture the meaning of the
                thing that remains true seeing the left end from the top and the right end from the bottom, and them
                being the same thing and touching" (The Center Axiom, 27 October 2026), and "You are axiomizing the
                limit of circular arithmetics based on a primorial horizon" (The One Axiom, 27 October 2026). The
                mirror, as he held it: "it really is just one infinite thing looking at itself in the mirror... but
                the primes have the mirror symmetry" (The Mirror at the Horizon, 27 October 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>P and P' are never equal</Heading>
            <Paragraph>
                The ruling that stands at the close: "P and P' are always assumed to be different sets. We are
                looking for properties that we will use to build our idea of the limiting structure, but P and P'
                the same is not a given. It is a result of a resolution to a particular non-standard model that
                carries semantic consequence" (The Resolution, 1 November 2026). Before that: "The whole point is
                that the upper sieve DOESN'T produce the same set. We assume it does and that should yield the
                theorems, as AXIOMS" and "if ALL numbers divide it just like zero, you make the exact same set in
                either direction" (The Two Sieves, 28 October 2026). At every finite stage the two sieves differ;
                at 210, 23 survives while its mirror 187 does not. Their equality is the one unprovable line, taken
                last, which <Means>$[[ ./The Axiom ]]</Means> states.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The symmetric form and the right limit</Heading>
            <Paragraph>
                Goldbach in his form carries the symmetry rather than the even sum: "Do you see that mine has the
                property of symmetry? And that you aren't capturing that?" (The Circle Proof, 28 October 2026), for
                every n some k with n − k and n + k both prime. Its seed is five months older: "They inherit their
                symmetry from the fact that the coprimes of N are symmetric. If N-k is a prime coprime to N and N+k
                is a prime coprime to N, they will sum to 2N and this be a goldbach pair of N. Ya?" (Gödel through
                Goldbach: Coprime Symmetry, 30 March 2026). The circle proof made every coprime symmetric and
                counted the surviving centers, and he weighed it exactly: "Now that almost sounds like a proof of
                Goldbach, but would you agree that most people wouldn't say the limiting thing you spoke of is N
                right?" (The Circle Proof). The profinite limit was the wrong object: "How did you find an uncountable
                thing as the limit of a bunch of finite algebras" (The Circle Proof). The right one is ℕ with its
                totality named 0 and nothing before it: "there is no predessesor of 0. It says it in the axioms. And
                it turns out if you want to understand the PA we were imagining, negative numbers don't actually make
                sense" (The Flatness Belief, 29 October 2026). What zero is, there, is <Means>$[[ ./Zero ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
