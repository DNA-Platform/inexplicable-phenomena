// THE PAPER'S OWN TABLE OF CONTENTS, written rather than generated. THE FILE IS NAMED .table
// BECAUSE THE COMPILER SAYS SO — build.mjs binds ['cover', '.cover'], ['synopsis', '.synopsis'],
// ['contents', '.table'], so the seam for a written contents already existed and only wanted the
// name it asks for. $Book prefers a written one —
// `this.table = this.searchForOne($TypeOfTableOfContents) ?? this.contents(...)` — so this replaces
// the five entries the book reads out of the headings that happen to exist.
//
// WHY IT IS WRITTEN: the real paper's contents has 64 entries across three levels, and a generated
// contents can only ever show sections that have been written. Doug's ruling, 2026-09-09: get the
// data in, and "point to the last real link in the paper". Every entry here therefore targets
// #A_proof_sketch, the last heading the paper actually carries — the links are honest about being
// placeholders rather than pointing at nothing.
//
// BUILT FROM KINDS THAT EXIST: a $Paragraph carrying an $indent and a $Ref, which is exactly the
// shape $Book.contents() produces. Nothing new was invented for it.
//
// OWED, and all of it the ARTICLE THEME's rather than this file's:
//   · the section number in its own left column, not run into the link text
//   · a dotted leader between the title and the page number
//   · the page number right-aligned at the measure
//   · level 1 bold, levels 2 and 3 stepped in — pd-indent-1 and pd-indent-2 are on them already
import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Ref, Section, TableOfContents } from '@dna-platform/public';

// The last heading the paper really carries. Every placeholder points here.
const last = '#A_proof_sketch';

const entries: [string, string, number, string][] = [
    ['1', 'Introduction', 0, '3'],
    ['1.1', 'The Importance of P =? NP', 1, '4'],
    ['1.2', 'Objections to P =? NP', 1, '6'],
    ['1.2.1', 'The Asymptotic Objection', 2, '6'],
    ['1.2.2', 'The Polynomial-Time Objection', 2, '7'],
    ['1.2.3', 'The Kitchen-Sink Objection', 2, '7'],
    ['1.2.4', 'The Mathematical Snobbery Objection', 2, '8'],
    ['1.2.5', 'The Sour Grapes Objection', 2, '8'],
    ['1.2.6', 'The Obviousness Objection', 2, '9'],
    ['1.2.7', 'The Constructivity Objection', 2, '9'],
    ['1.3', 'Further Reading', 1, '10'],
    ['2', 'Formalizing P =? NP and Central Related Concepts', 0, '10'],
    ['2.1', 'NP-Completeness', 1, '12'],
    ['2.2', 'Other Core Concepts', 1, '16'],
    ['2.2.1', 'Search, Decision, and Optimization', 2, '16'],
    ['2.2.2', 'The Twilight Zone: Between P and NP-complete', 2, '17'],
    ['2.2.3', 'coNP and the Polynomial Hierarchy', 2, '17'],
    ['2.2.4', 'Factoring and Graph Isomorphism', 2, '19'],
    ['2.2.5', 'Space Complexity', 2, '20'],
    ['2.2.6', 'Counting Complexity', 2, '21'],
    ['2.2.7', 'Beyond Polynomial Resources', 2, '22'],
    ['3', 'Beliefs About P =? NP', 0, '24'],
    ['3.1', 'Independent of Set Theory?', 1, '26'],
    ['4', 'Why Is Proving P ≠ NP Difficult?', 0, '29'],
    ['5', 'Strengthenings of the P ≠ NP Conjecture', 0, '31'],
    ['5.1', 'Different Running Times', 1, '31'],
    ['5.2', 'Nonuniform Algorithms and Circuits', 1, '32'],
    ['5.3', 'Average-Case Complexity', 1, '34'],
    ['5.3.1', 'Cryptography and One-Way Functions', 2, '35'],
    ['5.4', 'Randomized Algorithms', 1, '37'],
    ['5.4.1', 'BPP and Derandomization', 2, '38'],
    ['5.5', 'Quantum Algorithms', 1, '39'],
    ['6', 'Progress', 0, '40'],
    ['6.1', 'Logical Techniques', 1, '43'],
    ['6.1.1', 'Circuit Lower Bounds Based on Counting', 2, '44'],
    ['6.1.2', 'The Relativization Barrier', 2, '46'],
    ['6.2', 'Combinatorial Lower Bounds', 1, '47'],
    ['6.2.1', 'Proof Complexity', 2, '48'],
    ['6.2.2', 'Monotone Circuit Lower Bounds', 2, '49'],
    ['6.2.3', 'Small-Depth Circuits and the Random Restriction Method', 2, '50'],
    ['6.2.4', 'Small-Depth Circuits and the Polynomial Method', 2, '53'],
    ['6.2.5', 'The Natural Proofs Barrier', 2, '54'],
    ['6.3', 'Arithmetization', 1, '58'],
    ['6.3.1', 'IP = PSPACE', 2, '58'],
    ['6.3.2', 'Hybrid Circuit Lower Bounds', 2, '61'],
    ['6.3.3', 'The Algebrization Barrier', 2, '63'],
    ['6.4', 'Ironic Complexity Theory', 1, '64'],
    ['6.4.1', 'Time-Space Tradeoffs', 2, '65'],
    ['6.4.2', 'NEXP ⊄ ACC', 2, '68'],
    ['6.5', 'Arithmetic Complexity Theory', 1, '72'],
    ['6.5.1', 'Permanent Versus Determinant', 2, '74'],
    ['6.5.2', 'Arithmetic Circuit Lower Bounds', 2, '77'],
    ['6.5.3', 'Arithmetic Natural Proofs?', 2, '81'],
    ['6.6', 'Geometric Complexity Theory', 1, '84'],
    ['6.6.1', 'From Complexity to Algebraic Geometry', 2, '86'],
    ['6.6.2', 'Characterization by Symmetries', 2, '87'],
    ['6.6.3', 'The Quest for Obstructions', 2, '88'],
    ['6.6.4', 'GCT and P =? NP', 2, '91'],
    ['6.6.5', 'Reports from the Trenches', 2, '92'],
    ['6.6.6', 'The Lessons of GCT', 2, '95'],
    ['6.6.7', 'The Only Way?', 2, '97'],
    ['7', 'Conclusions', 0, '99'],
    ['8', 'Acknowledgments', 0, '102'],
    ['9', 'Appendix: Glossary of Complexity Classes', 0, '119'],
];

export default $(
    <TableOfContents>
        <Section>
            <Heading>Contents</Heading>
            {entries.map(([number, title, level, page]) => (
                <Paragraph key={number} indent={level}>
                    <Ref>[{number}  {title}]({last})</Ref>{'  '}{page}
                </Paragraph>
            ))}
        </Section>
    </TableOfContents>,
    TableOfContents
);
