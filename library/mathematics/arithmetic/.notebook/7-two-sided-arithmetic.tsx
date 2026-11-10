import { Chapter, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Publication</Part>
        <Title>[[ Two-Sided Arithmetic ]]</Title>
        <Paragraph>
            The fourth movement: ℕ is the limit of groups and is not one. On the rings ℤ/N_k, with N_k the primorial,
            the survivors of sieving by the first k primes form a group U_k with U = −U; the Chinese remainder theorem
            counts the pairs summing to any residue, ∏(p − c_p), positive for every even residue; for every center and
            every depth there is a k with n − k in P and n + k in P′, where P is the primes from below and P′ the same
            residues read from above, different numbers, 23 and 187; normalized, the count is
            the <Means>$[[ Hardy–Littlewood singular series ]]( Mathematical Library / Hardy and Littlewood 1923 )</Means> (Goldbach
            through Gödel, The Paper's Flow, 5 November 2026).
        </Paragraph>
        <Section>
            <Heading>The two sieves</Heading>
            <Paragraph>
                Doug's construction, demanded on 31 October: "an upper and lower sieve argument establishing P and P'
                - the primes from below and a different but symmetric set from above, have the Goldbach conjecture
                for finite primorial modular arithmetics - for all n big enough, n-k in P and n+k in P' - uses
                Chinese remainder theorem I believe" (Goldbach through Gödel, The Six Movements, 31 October 2026).
                Its first form on 26 October: "those two sets have the same shape. You can't show that for numbers
                greater than 4 or whatever and less than primorial(N)-4 or whatever, you can find an element of one
                set and an element of the other set equidistant?" (The De Polignac Identity, 26 October 2026). And the
                demand for proof over verification on 28 October: "Verification isn't proof. It is important. You
                need to prove it. Use Chinese remainder theorem or whatever, but provide a proof that should yield
                the result in the limit" (The Two Sieves, 28 October 2026). Theorem A's pairing count at every center,
                Theorem B's unwrapped pairing with error never reaching the window, and Theorem T's twin-survivor
                count were proven that day.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The sets differ at every stage</Heading>
            <Paragraph>
                "The whole point is that the upper sieve DOESN'T produce the same set" (The Two Sieves, 28 October
                2026). At full depth the two differ at every finite N, 23 surviving at 210 while its mirror 187 = 11·17
                does not. The symmetry is the primitive and the circle only its picture, his correction of 27
                October: "It's not actually the circle. It's that the primes have a symmetry - two sets that shouldn't
                be the same but are. But otherwise it's not the circle. So you pick and choose the facts. I'm worried
                that you don't see the pattern. It's kind of like axiomatizing different geometries" (The Enlightened
                Arithmetic, 27 October 2026). The seed of the symmetric form is five months older: "They inherit
                their symmetry from the fact that the coprimes of N are symmetric" (Gödel through Goldbach: Coprime
                Symmetry, 30 March 2026).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The barrier and the aberration</Heading>
            <Paragraph>
                Passing from a congruence to an equation in ℤ introduces boundary terms no sieve depth controls well
                enough to land a pair in the window where a survivor is prime: the sieving limit of dimension two,
                Jurkat and Richert's lower bound vanishing exactly at full depth, the parity phenomenon under
                both, <Means>$[[ Chen's theorem ]]( Mathematical Library / Chen 1973 )</Means> the best unconditional output. The residue theorems do not pass to quantities by
                proof. What every finite stage has and the limit sheds is the group structure, inverses, mirror,
                predecessor of 0, one feature (The Surviving Sentence, 29 October 2026). This is why the identification
                is consistent only at the unreachable limit, and why the paper's axiom is sited at the barrier
                rather than beyond it. Doug's demand that the whole be said in PA's own language, "You are
                axiomatizing the limit of circular arithmetics based on a primorial horizon" (The One Axiom, 27
                October 2026), is what the passage of the next movement answers.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Deprecated by the fourth movement</Heading>
            <Paragraph>
                The eight earlier forms of the axiom hunted on 27 and 28 October, Generation and Centers, Local–Global,
                the residual is zero, the Parity Coin, U, S, E and D, each refused as not PA, "you aren't speaking in
                the language of PA. You are too off in the clouds" (The One Axiom, 27 October 2026); the Mirror Axiom,
                which prescribes two ends and no center; the enlightened arithmetic C with its axiom list, rejected as
                model-shopping; the factorial circle, no easier than the primorial; and the profinite limit of the
                circle proof, "How did you find an uncountable thing as the limit of a bunch of finite algebras" (The
                Circle Proof, 28 October 2026). The one axiom that remained is the identification itself, performed
                in <Means>$[[ ./The Surviving Sentence ]]</Means>.
            </Paragraph>
        </Section>
    </Chapter>
);
