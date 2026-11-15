import { Append, Chapter, Heading, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';
import { Content, Identification, Interpolated, Progress, Proof, Specification, Theorem } from '../../.reference/7-the-content~code.tsx';

export default () => (
    <Chapter>
        <Part>The Objects</Part>
        <Title>[[ The Symmetry of Arithmetic ]]</Title>
        <Paragraph>
            The first object of the textbook, which I named on 15 November 2026: X, a single object added to
            first-order Peano arithmetic, expressing that arithmetic has a symmetry the formalism does not at
            present state. This chapter is the attempt to specify it, and shows its content one side at a
            time: the identification — the front, the best guess of what X is, standing as a sketch — the
            specification on the back, the progress of the project, or the back's two together.
        </Paragraph>
        <Content />
        <Identification>
            <Heading>The Identification</Heading>
            <Paragraph>
                The best guess, by the statement of work's own guidance: X is a rule of inference — singular,
                stated finitely, operating on formulas as induction does, corresponding to a new form of
                proof, a new way to make universal conclusions. It is not yet found. What follows is a
                teaching sketch of the formalism with X in its place, and every part not yet found stands as
                an interpolated part, a placeholder describing where the thing will go.
            </Paragraph>
            <Paragraph>
                The reading first. Peano arithmetic reasons from the bottom about a totality it does not
                refer to: its axioms name zero and have no term for the totality. The same formalism, with
                every sign renamed, reasons from the top: it names the totality and has no term for zero, and
                the two are identical — the axiom that zero has no predecessor and the axiom that the
                totality has no successor are one statement under the renaming. Peano arithmetic as it stands
                neither asserts nor denies that the two readings express the same set of numbers. X asserts
                it, and gives no way to resolve which reading is the case.
            </Paragraph>
            <Paragraph>
                The machinery. Two defined signs: A, the sum from zero up to a number, and M, the product
                from one up to it, each defined by succession of the previous value in the form of the axioms
                for addition and multiplication. The circles of factorial size are the modular arithmetics
                whose size is M of a number; on a circle the mirror sends each element to its negation, and a
                set defined by a formula has a definition from the bottom and, through the mirror, a
                definition from the top, kept distinct until X relates them.
            </Paragraph>
            <Paragraph>
                The rule itself: <Interpolated>the figure of X — its premises, its one conclusion, its free formula and its side condition decidable on the written proof — stands to be found; its kind is the sixth open determination of the progress</Interpolated>.
                What it must do is fixed: take what is proven on the circles of factorial size, generalizing
                over every pair of definitions from the bottom and from the top that can be made equal in the
                limit, and conclude the universal form among the numbers — wearing the same clothing as the
                other parts of the formalism, so that it can be seen as self-evident and fundamental.
            </Paragraph>
            <Theorem>
                <Line>Pairing. For every number at or above two there is a smaller number whose subtraction and addition both land on primes: every even number from four up is a sum of two primes.</Line>
            </Theorem>
            <Proof>
                On a circle of factorial size, every even element is a sum of two elements coprime to the
                size, in a count the Chinese remainder theorem gives — the circle theorem of pairing, proven
                with the definitions from the bottom and from the top kept
                distinct. <Interpolated>One use of X closes the argument; the step is the search's to supply</Interpolated>. No analysis is used.
            </Proof>
            <Theorem>
                <Line>Recurrence. For every number at or above three there is a larger one, below the limiting factorial, whose neighbours on both sides are prime: there are infinitely many twin primes.</Line>
            </Theorem>
            <Proof>
                On a circle of factorial size, the count of elements whose two neighbours are both coprime to
                the size grows without bound as primes are added — the circle theorem of
                recurrence. <Interpolated>One use of X closes the argument; the derivation of the canonical form through the circle count is the seventh open determination</Interpolated>.
                The basic case of this form, with one prime in place of the pair, is Euclid's theorem, which
                Peano arithmetic proves outright.
            </Proof>
            <Theorem>
                <Line>Balance. The count of primes from the bottom and the count from the top differ by no more than the stated bound: the arithmetic form of the Riemann hypothesis.</Line>
            </Theorem>
            <Proof>
                The balance identity holds on the circles: the floor of the square root is the whole sum,
                split into a term of the bottom and a term of the top — the circle theorem of
                balance. <Interpolated>One use of X closes the argument; the general form of the balance type is the eleventh open determination</Interpolated>.
            </Proof>
            <Paragraph>
                Each proof is its circle theorem followed by one use of X — the immediacy the specification
                demands — and that is the sense in which Goldbach, the twin primes and the arithmetic Riemann
                hypothesis are the foundational examples of pairing, recurrence and balance. The claim is
                stated so that it can fail: if Peano arithmetic refutes Goldbach, the theory is inconsistent
                and is withdrawn.
            </Paragraph>
        </Identification>
        <Specification>
            <Heading>The Specification</Heading>
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
                <Line>1.6 I hold X to be a foundational commitment of arithmetic and not a technical device, of the same standing as quantification, universal generalization, proof by contradiction and induction, each once added to reasoning.</Line>
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
                <Line>3.3 The open determinations, O1 to O11, are recorded in the statement's companion, The Symmetry of Arithmetic: Progress, carried on this chapter's progress side.</Line>
            </Paragraph>
            <Paragraph>
                Citations run into the subject's notes, where the surrounding work already sits: Gödel's system
                in <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>, and the exchange of zero and
                infinity in <Means>$[[ Zero and Infinity ]]( Arithmetic Notebook / Zero and Infinity )</Means>.
            </Paragraph>
        </Specification>
        <Progress>
            <Heading>The Progress</Heading>
            <Paragraph>
                The progress of the project, as of 15 November 2026 — a narrative of independent things, each
                its own and referring to the others by the statement's labels. The full record stands beside
                this chapter with the statement of work. Nothing here is part of the specification.
            </Paragraph>
            <Paragraph>
                Eleven determinations stand open, O1 to O11 — the places where the specification is not yet
                specific enough. The deepest is the circle presentation (O1): it must be consistent with
                every theorem of Peano arithmetic, the successor axiom included and holding outright, while
                supplying the symmetry the formalism does not specify — the circles fail the successor axiom,
                and the three-valued arithmetics keep it only by letting it fail as well as hold. Beside it
                stand the limit (O2), what making definitions equal in the limit means, and which pairs of
                definitions can be made equal at all (O3), since not every statement true on every circle is
                true among the numbers. The kind of X itself is open (O6) — which row of the solution space —
                and with it the derivation of the canonical twin-prime form through the circle count (O7).
            </Paragraph>
            <Paragraph>
                The narrower determinations: what X yields about primes, which are not symmetric on a circle
                as the coprimes are (O4); the exact statement relating Gödel's sentence, consistency and the
                empty derivation (O5); whether the step down from the top is the inverse of the step up
                wherever both apply, or is left uninterpreted (O8); the exact statement of the asymmetric
                extension (O9); the formal statement of the referred and unreferred halves (O10); and the
                general form of the balance type, stated so far only for the primes and the multiples of
                five (O11).
            </Paragraph>
            <Paragraph>
                One thing is computed (K21): the canonical twin-prime sentence holds for every number from 3
                to 10,000,000, a pair always found below twice the number; and for every number from 2 to 40
                there is a multiplier, at most the limiting factorial, whose product with it has primes on
                both sides, the least such multiplier at most 1,162. Primality above 64 bits is by a
                probable-prime test.
            </Paragraph>
            <Paragraph>
                Three references are still to be located: the equivalence in the balance identity between the
                Riemann hypothesis and the stated bound (K8), the local-global failure (K18), and the
                principle of duality in lattice theory, for the duality kind of the solution space.
            </Paragraph>
            <Paragraph>
                The specification was drawn from my statements, kept as I gave them in the progress
                record beside this chapter; the earlier statements stand in the first specification.
            </Paragraph>
        </Progress>
        <Append
            identifier="statement-of-work"
            type=".md"
        >
            ![[ statement-of-work.md ]]
        </Append>
        <Append
            identifier="progress"
            type=".md"
        >
            ![[ progress.md ]]
        </Append>
    </Chapter>
);
