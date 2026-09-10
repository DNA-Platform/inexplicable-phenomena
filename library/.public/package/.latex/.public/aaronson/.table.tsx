// The contents, written as the chapters themselves — every heading in the paper, nested as the
// document nests. Each <Chapter> means the section that wears its title, wears that section's own
// classes, and reaches the heading that opens it.
import { $ } from '@dna-platform/chemistry';
import { Chapter, Heading, TableOfContents } from '@dna-platform/public';

export default $(
    <TableOfContents>
        <Heading>Contents</Heading>
        <Chapter title="Introduction">
            <Chapter title="The Importance of P = NP">
            </Chapter>
            <Chapter title="Objections to P = NP">
                <Chapter title="The Asymptotic Objection">
                </Chapter>
                <Chapter title="The Polynomial-Time Objection">
                </Chapter>
                <Chapter title="The Kitchen-Sink Objection">
                </Chapter>
                <Chapter title="The Mathematical Snobbery Objection">
                </Chapter>
                <Chapter title="The Sour Grapes Objection">
                </Chapter>
                <Chapter title="The Obviousness Objection">
                </Chapter>
                <Chapter title="The Constructivity Objection">
                </Chapter>
            </Chapter>
            <Chapter title="Further Reading">
            </Chapter>
        </Chapter>
        <Chapter title="Formalizing P = NP and Central Related Concepts">
            <Chapter title="NP-Completeness">
            </Chapter>
            <Chapter title="Other Core Concepts">
                <Chapter title="Search, Decision, and Optimization">
                </Chapter>
                <Chapter title="The Twilight Zone: Between P and NP-complete">
                </Chapter>
                <Chapter title="coNP and the Polynomial Hierarchy">
                </Chapter>
                <Chapter title="Factoring and Graph Isomorphism">
                </Chapter>
                <Chapter title="Space Complexity">
                </Chapter>
                <Chapter title="Counting Complexity">
                </Chapter>
                <Chapter title="Beyond Polynomial Resources">
                </Chapter>
            </Chapter>
        </Chapter>
        <Chapter title="Beliefs About P = NP">
            <Chapter title="Independent of Set Theory?">
            </Chapter>
        </Chapter>
        <Chapter title="Why Is Proving P ≠ NP Difficult?">
        </Chapter>
        <Chapter title="Strengthenings of the P ≠ NP Conjecture">
            <Chapter title="Different Running Times">
            </Chapter>
            <Chapter title="Nonuniform Algorithms and Circuits">
            </Chapter>
            <Chapter title="Average-Case Complexity">
                <Chapter title="Cryptography and One-Way Functions">
                </Chapter>
            </Chapter>
            <Chapter title="Randomized Algorithms">
                <Chapter title="BPP and Derandomization">
                </Chapter>
            </Chapter>
            <Chapter title="Quantum Algorithms">
            </Chapter>
        </Chapter>
        <Chapter title="Progress">
            <Chapter title="Logical Techniques">
                <Chapter title="Circuit Lower Bounds Based on Counting">
                </Chapter>
                <Chapter title="The Relativization Barrier">
                </Chapter>
            </Chapter>
            <Chapter title="Combinatorial Lower Bounds">
                <Chapter title="Proof Complexity">
                </Chapter>
                <Chapter title="Monotone Circuit Lower Bounds">
                </Chapter>
                <Chapter title="Small-Depth Circuits and the Random Restriction Method">
                </Chapter>
                <Chapter title="Small-Depth Circuits and the Polynomial Method">
                </Chapter>
                <Chapter title="The Natural Proofs Barrier">
                </Chapter>
            </Chapter>
            <Chapter title="Arithmetization">
                <Chapter title="IP = PSPACE">
                </Chapter>
                <Chapter title="Hybrid Circuit Lower Bounds">
                </Chapter>
                <Chapter title="The Algebrization Barrier">
                </Chapter>
            </Chapter>
            <Chapter title="Ironic Complexity Theory">
                <Chapter title="Time-Space Tradeoffs">
                </Chapter>
                <Chapter title="NEXP ⊂ ACC">
                </Chapter>
            </Chapter>
            <Chapter title="Arithmetic Complexity Theory">
                <Chapter title="Permanent Versus Determinant">
                </Chapter>
                <Chapter title="Arithmetic Circuit Lower Bounds">
                </Chapter>
                <Chapter title="Arithmetic Natural Proofs?">
                </Chapter>
            </Chapter>
            <Chapter title="Geometric Complexity Theory">
                <Chapter title="From Complexity to Algebraic Geometry">
                </Chapter>
                <Chapter title="Characterization by Symmetries">
                </Chapter>
                <Chapter title="The Quest for Obstructions">
                </Chapter>
                <Chapter title="GCT and P = NP">
                </Chapter>
                <Chapter title="Reports from the Trenches">
                </Chapter>
                <Chapter title="The Lessons of GCT">
                </Chapter>
                <Chapter title="The Only Way?">
                </Chapter>
            </Chapter>
        </Chapter>
        <Chapter title="Conclusions">
        </Chapter>
        <Chapter title="Acknowledgments">
        </Chapter>
        <Chapter title="Appendix: Glossary of Complexity Classes">
        </Chapter>
        <Chapter title="References">
        </Chapter>
    </TableOfContents>,
    TableOfContents
);
