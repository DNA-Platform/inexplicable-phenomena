import { Append, Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Objects</Part>
        <Title>[[ The Symmetry of Arithmetic ]]</Title>
        <Paragraph>
            The first object of the textbook, named by Doug on 15 November 2026: X, a single object added to
            first-order Peano arithmetic, expressing that arithmetic has a symmetry the formalism does not at
            present state. This chapter is the attempt to specify it. Its specification is his statement of
            work of the same day, carried here at top level; the identification — X itself — is not yet known,
            and stands as its own placeholder, by 2.7 of the textbook's specification.
        </Paragraph>
        <Paragraph>
            The specification of X, the symmetry of arithmetic, 15 November 2026.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The object</Line>
            <Line>1.1 X is one finitely stated object that modifies first-order Peano arithmetic by adding a new way of identifying truths; a rule of inference seems fitting, since like induction it operates on formulas and corresponds to a new form of proof, a new way to make universal conclusions.</Line>
            <Line>1.2 Peano arithmetic is read as reasoning from the bottom about a totality it does not refer to; the same formalism, with every sign renamed, reasons from the top; the two are identical, and that zero has no predecessor and that the totality has no successor are one statement.</Line>
            <Line>1.3 Peano arithmetic as it stands neither asserts nor denies that the two readings express the same set of numbers; X asserts it, and gives no way to resolve which reading is the case.</Line>
            <Line>1.4 With X adjoined, Goldbach, twin primes and the arithmetic form of the Riemann hypothesis are immediate — each a theorem already proven on the circles of factorial size, with the definitions from the bottom and from the top kept distinct, followed by one use of X — the foundational examples of three types of theorem: pairing, recurrence and balance.</Line>
            <Line>1.5 X is not derivable from existing mathematics, or the three conjectures, whose arguments are elementary, would already be proven; so X is identified only by what it must satisfy, and is specified before it is stated.</Line>
            <Line>1.6 Its author holds X to be a foundational commitment of arithmetic and not a technical device, of the same standing as quantification, universal generalization, proof by contradiction and induction, each once added to reasoning.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The parts of the statement</Line>
            <Line>2.1 The formalism: PA with induction as a rule of inference, the defined signs A and M, the dual signature and the renaming, the circles of factorial size, the limit objects, the definitions from the bottom and from the top, and the canonical sentences.</Line>
            <Line>2.2 The known results: twenty theorems, K1 to K20, each of PA or of ordinary mathematics, which the constraints cite by label.</Line>
            <Line>2.3 The three types of theorem: pairing, recurrence and balance, each with a general form, a basic case PA proves, a theorem on the circles, and its foundational example.</Line>
            <Line>2.4 The object and its solution space: an axiom, a rule of inference, a duality, or something else as fundamental — and what each kind must then supply.</Line>
            <Line>2.5 The constraints: C1 to C14 — what X is, what X does, and how X stands to PA — each followed by what motivates it.</Line>
            <Line>2.6 The meaning that motivates X: the commitments and their formal correlates, the symmetry of zero and the totality, the two halves, the other reading, and which idea is the subject.</Line>
            <Line>2.7 The tests: statements required of the theory and statements excluded, the checks to run on a candidate.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>3. The anchor</Line>
            <Line>3.1 The specification is the anchor for the work, updated when its parts are found inconsistent, since an inconsistent specification has specified nothing.</Line>
            <Line>3.2 The claim is stated so that it can fail: if Peano arithmetic refutes Goldbach, the theory specified is inconsistent and is withdrawn; if Peano arithmetic proves Goldbach, X is not needed for it.</Line>
            <Line>3.3 The open determinations, O1 to O11, are recorded in the statement's companion, The Symmetry of Arithmetic: Progress.</Line>
        </Paragraph>
        <Paragraph>
            Citations run into the subject's notes, where the surrounding work already sits: Gödel's system
            in <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>, and the exchange of zero and
            infinity in <Means>$[[ Zero and Infinity ]]( Arithmetic Notebook / Zero and Infinity )</Means>.
        </Paragraph>
        <Append
            identifier="statement-of-work"
            type=".md"
        >
            ![[ statement-of-work.md ]]
        </Append>
    </Chapter>
);
