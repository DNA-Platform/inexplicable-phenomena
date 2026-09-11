import { $ } from '@dna-platform/chemistry';
import { $Chapter, chapter as Chapter, section as Section, Heading, Row, TableOfContents } from '@dna-platform/public';

export default class $Table extends $Chapter {
    print() {
        return (
            <TableOfContents>
                <Heading>Contents</Heading>
                <Row><Chapter>Introduction</Chapter>
                    <Row><Section>The Importance of P = NP</Section></Row>
                    <Row><Section>Objections to P = NP</Section>
                        <Row><Section>The Asymptotic Objection</Section></Row>
                        <Row><Section>The Polynomial-Time Objection</Section></Row>
                        <Row><Section>The Kitchen-Sink Objection</Section></Row>
                        <Row><Section>The Mathematical Snobbery Objection</Section></Row>
                        <Row><Section>The Sour Grapes Objection</Section></Row>
                        <Row><Section>The Obviousness Objection</Section></Row>
                        <Row><Section>The Constructivity Objection</Section></Row>
                    </Row>
                    <Row><Section>Further Reading</Section></Row>
                </Row>
                <Row><Chapter>Formalizing P = NP and Central Related Concepts</Chapter>
                    <Row><Section>NP-Completeness</Section></Row>
                    <Row><Section>Other Core Concepts</Section>
                        <Row><Section>Search, Decision, and Optimization</Section></Row>
                        <Row><Section>The Twilight Zone: Between P and NP-complete</Section></Row>
                        <Row><Section>coNP and the Polynomial Hierarchy</Section></Row>
                        <Row><Section>Factoring and Graph Isomorphism</Section></Row>
                        <Row><Section>Space Complexity</Section></Row>
                        <Row><Section>Counting Complexity</Section></Row>
                        <Row><Section>Beyond Polynomial Resources</Section></Row>
                    </Row>
                </Row>
                <Row><Chapter>Beliefs About P = NP</Chapter>
                    <Row><Section>Independent of Set Theory?</Section></Row>
                </Row>
                <Row><Chapter>Why Is Proving P ≠ NP Difficult?</Chapter></Row>
                <Row><Chapter>Strengthenings of the P ≠ NP Conjecture</Chapter>
                    <Row><Section>Different Running Times</Section></Row>
                    <Row><Section>Nonuniform Algorithms and Circuits</Section></Row>
                    <Row><Section>Average-Case Complexity</Section>
                        <Row><Section>Cryptography and One-Way Functions</Section></Row>
                    </Row>
                    <Row><Section>Randomized Algorithms</Section>
                        <Row><Section>BPP and Derandomization</Section></Row>
                    </Row>
                    <Row><Section>Quantum Algorithms</Section></Row>
                </Row>
                <Row><Chapter>Progress</Chapter>
                    <Row><Section>Logical Techniques</Section>
                        <Row><Section>Circuit Lower Bounds Based on Counting</Section></Row>
                        <Row><Section>The Relativization Barrier</Section></Row>
                    </Row>
                    <Row><Section>Combinatorial Lower Bounds</Section>
                        <Row><Section>Proof Complexity</Section></Row>
                        <Row><Section>Monotone Circuit Lower Bounds</Section></Row>
                        <Row><Section>Small-Depth Circuits and the Random Restriction Method</Section></Row>
                        <Row><Section>Small-Depth Circuits and the Polynomial Method</Section></Row>
                        <Row><Section>The Natural Proofs Barrier</Section></Row>
                    </Row>
                    <Row><Section>Arithmetization</Section>
                        <Row><Section>IP = PSPACE</Section></Row>
                        <Row><Section>Hybrid Circuit Lower Bounds</Section></Row>
                        <Row><Section>The Algebrization Barrier</Section></Row>
                    </Row>
                    <Row><Section>Ironic Complexity Theory</Section>
                        <Row><Section>Time-Space Tradeoffs</Section></Row>
                        <Row><Section>NEXP ⊂ ACC</Section></Row>
                    </Row>
                    <Row><Section>Arithmetic Complexity Theory</Section>
                        <Row><Section>Permanent Versus Determinant</Section></Row>
                        <Row><Section>Arithmetic Circuit Lower Bounds</Section></Row>
                        <Row><Section>Arithmetic Natural Proofs?</Section></Row>
                    </Row>
                    <Row><Section>Geometric Complexity Theory</Section>
                        <Row><Section>From Complexity to Algebraic Geometry</Section></Row>
                        <Row><Section>Characterization by Symmetries</Section></Row>
                        <Row><Section>The Quest for Obstructions</Section></Row>
                        <Row><Section>GCT and P = NP</Section></Row>
                        <Row><Section>Reports from the Trenches</Section></Row>
                        <Row><Section>The Lessons of GCT</Section></Row>
                        <Row><Section>The Only Way?</Section></Row>
                    </Row>
                </Row>
                <Row><Chapter>Conclusions</Chapter></Row>
                <Row><Chapter>Acknowledgments</Chapter></Row>
                <Row className="pd-appendix"><Chapter>Appendix: Glossary of Complexity Classes</Chapter></Row>
                <Row className="pd-references"><Chapter>References</Chapter></Row>
                <Row className="pd-notes"><Chapter>Notes</Chapter></Row>
            </TableOfContents>
        );
    }
}
