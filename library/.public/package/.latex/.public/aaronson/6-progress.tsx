import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Progress</Heading>
            <Paragraph>The half-century of work has produced real theorems, and the honest way to read them is as a map of which techniques provably cannot finish the job.</Paragraph>
            <Section>
                <Heading>Logical Techniques</Heading>
                <Paragraph>The earliest lower bounds came from diagonalization, and their limits were understood almost immediately.</Paragraph>
                <Section>
                    <Heading>Circuit Lower Bounds Based on Counting</Heading>
                    <Paragraph>Almost every Boolean function needs exponentially many gates, and the counting argument that shows it produces no explicit example.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Relativization Barrier</Heading>
                    <Paragraph>Baker, Gill and Solovay built oracles either way, so any technique that survives an oracle cannot settle the question.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Combinatorial Lower Bounds</Heading>
                <Paragraph>Restricting the circuit model buys real theorems, and the restrictions that have been beaten are informative about the ones that have not.</Paragraph>
                <Section>
                    <Heading>Proof Complexity</Heading>
                    <Paragraph>Proving that short refutations do not exist for particular formulas is a lower bound on proof systems rather than on circuits, and the two programmes have converged.</Paragraph>
                </Section>
                <Section>
                    <Heading>Monotone Circuit Lower Bounds</Heading>
                    <Paragraph>Razborov proved an exponential lower bound for clique on monotone circuits, and then proved that the technique does not extend.</Paragraph>
                </Section>
                <Section>
                    <Heading>Small-Depth Circuits and the Random Restriction Method</Heading>
                    <Paragraph>The switching lemma kills parity for constant-depth circuits, which remains one of the few unconditional separations.</Paragraph>
                </Section>
                <Section>
                    <Heading>Small-Depth Circuits and the Polynomial Method</Heading>
                    <Paragraph>Approximating a circuit by a low-degree polynomial gives the same separations by a different route and extends further.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Natural Proofs Barrier</Heading>
                    <Paragraph>Razborov and Rudich showed that any lower bound argument which is constructive and large would break the cryptography we believe in.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Arithmetization</Heading>
                <Paragraph>Turning Boolean formulas into polynomials was the technique that broke relativization.</Paragraph>
                <Section>
                    <Heading>IP = PSPACE</Heading>
                    <Paragraph>Interactive proofs turned out to be exactly as powerful as polynomial space, and the proof does not relativize.</Paragraph>
                </Section>
                <Section>
                    <Heading>Hybrid Circuit Lower Bounds</Heading>
                    <Paragraph>Combining arithmetization with diagonalization produces separations that neither technique reaches alone.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Algebrization Barrier</Heading>
                    <Paragraph>Aaronson and Wigderson showed that arithmetization has a barrier of its own, one level up from relativization.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Ironic Complexity Theory</Heading>
                <Paragraph>The most surprising recent progress uses fast algorithms to prove that fast algorithms do not exist.</Paragraph>
                <Section>
                    <Heading>Time-Space Tradeoffs</Heading>
                    <Paragraph>Satisfiability cannot be solved in both nearly linear time and small space, which is a real unconditional statement about a natural problem.</Paragraph>
                </Section>
                <Section>
                    <Heading>NEXP versus ACC</Heading>
                    <Paragraph>Williams derived a circuit lower bound from a satisfiability algorithm barely faster than brute force, which is the template everyone is now trying to widen.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Arithmetic Complexity Theory</Heading>
                <Paragraph>Working over a field rather than over bits gives a cleaner model and a sharper conjecture.</Paragraph>
                <Section>
                    <Heading>Permanent Versus Determinant</Heading>
                    <Paragraph>The determinant has small arithmetic circuits and the permanent is conjectured not to, which is the arithmetic shadow of the main question.</Paragraph>
                </Section>
                <Section>
                    <Heading>Arithmetic Circuit Lower Bounds</Heading>
                    <Paragraph>Depth reduction means that strong enough lower bounds for depth-four circuits would suffice, which is why so much effort sits there.</Paragraph>
                </Section>
                <Section>
                    <Heading>Arithmetic Natural Proofs?</Heading>
                    <Paragraph>Whether the natural proofs barrier has an arithmetic analogue is open, and the answer would say how much room the programme has.</Paragraph>
                </Section>
            </Section>
            <Section>
                <Heading>Geometric Complexity Theory</Heading>
                <Paragraph>Mulmuley and Sohoni proposed attacking the permanent-versus-determinant question with representation theory and algebraic geometry.</Paragraph>
                <Section>
                    <Heading>From Complexity to Algebraic Geometry</Heading>
                    <Paragraph>The classes become orbit closures of polynomials, and separating them becomes a question about which closures contain which.</Paragraph>
                </Section>
                <Section>
                    <Heading>Characterization by Symmetries</Heading>
                    <Paragraph>The determinant and the permanent are each determined by their symmetry groups, which is what makes the algebraic-geometry translation possible at all.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Quest for Obstructions</Heading>
                    <Paragraph>The programme needs representations occurring in one orbit closure and not the other, and finding them has proved harder than the original question looked.</Paragraph>
                </Section>
                <Section>
                    <Heading>GCT and P versus NP</Heading>
                    <Paragraph>The programme aims at the arithmetic version first, and even its advocates describe the Boolean version as decades further out.</Paragraph>
                </Section>
                <Section>
                    <Heading>Reports from the Trenches</Heading>
                    <Paragraph>The occurrence obstructions the programme first hoped for were shown not to exist, which redirected rather than ended the effort.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Lessons of GCT</Heading>
                    <Paragraph>The programme has already produced mathematics that outlives it, which is the usual pattern for attacks on this question.</Paragraph>
                </Section>
                <Section>
                    <Heading>The Only Way?</Heading>
                    <Paragraph>Whether any approach avoiding this much machinery could work is itself an open question, and the barriers are the reason to doubt it.</Paragraph>
                </Section>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
