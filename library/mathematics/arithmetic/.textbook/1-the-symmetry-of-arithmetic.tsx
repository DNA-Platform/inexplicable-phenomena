import { Append, Chapter, Heading, Line, List, Means, Paragraph, Part, Section, Sentence, Table, Title, Word } from '@dna-platform/public';
import { Cite, Content, Interpolated, Markdown, Progress, Proof, Specification, Theorem } from '../../.reference/7-the-content~code.tsx';

export default () => (
    <Chapter>
        <Part>The Objects</Part>
        <Title>[[ The Symmetry of Arithmetic ]]</Title>
        <Content />
        <Paragraph>
            This chapter attempts to meet the statement of work on its other side: a single object X, added
            to first-order Peano arithmetic, expressing that arithmetic has a symmetry the formalism does not
            at present state. The specification fixes the formalism X modifies, the results it must agree
            with, the three types of theorem it makes immediate, the constraints on it, and the tests a
            candidate must pass; this chapter teaches each part in turn, and where only X itself can complete
            a passage, a brace stands in its place.
        </Paragraph>
        <Section>
            <Heading>The formalism</Heading>
            <Paragraph>
                PA here means classical first-order logic with identity, the signature 0, S, + and ·, the
                Peano axioms in the form below, and induction as a rule of inference, not as an axiom schema;
                it has exactly the theorems of first-order Peano arithmetic (<Cite part="1.1" /> of the statement). The order
                x ≤ y, divisibility and primality are defined in the usual way.
            </Paragraph>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Name</Word>
                    <Word>Axiom or rule</Word>
                </Sentence>
                <Sentence>
                    <Word>S1</Word>
                    <Word>∀x ¬(Sx = 0)</Word>
                </Sentence>
                <Sentence>
                    <Word>S2</Word>
                    <Word>∀x ∀y (Sx = Sy → x = y)</Word>
                </Sentence>
                <Sentence>
                    <Word>A1</Word>
                    <Word>∀x (x + 0 = x)</Word>
                </Sentence>
                <Sentence>
                    <Word>A2</Word>
                    <Word>∀x ∀y (x + Sy = S(x + y))</Word>
                </Sentence>
                <Sentence>
                    <Word>M1</Word>
                    <Word>∀x (x · 0 = 0)</Word>
                </Sentence>
                <Sentence>
                    <Word>M2</Word>
                    <Word>∀x ∀y (x · Sy = x · y + x)</Word>
                </Sentence>
                <Sentence>
                    <Word>Induction</Word>
                    <Word>From φ(0) and φ(x) → φ(Sx), with x not free in any open assumption, infer ∀x φ(x)</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                Two signs are then defined, each by succession of the previous value, in the form of the
                axioms for addition and multiplication (<Cite part="1.2" />): A, the sum of the numbers up to a number, with
                A(0) = 0 and A(Sx) = A(x) + Sx; and M, their product from one, with M(0) = S0 and
                M(Sx) = M(x) · Sx. This is an extension by definition — PA proves each function exists and is
                unique, so no new theorem appears in the original signature — and induction ranges over
                formulas that use the new signs.
            </Paragraph>
            <Paragraph>
                The same formalism reasons from the top under the renaming σ (<Cite part="1.3" />): 0 ↦ ∞, S ↦ P, + ↦ ⊕,
                · ↦ ⊗, ≤ ↦ ≫. σ(PA) names the totality and has no term for zero, as PA names zero and has no
                term for the totality; the two theories are identical under σ, and S1 with σ(S1) — zero has
                no predecessor, the totality has no successor — are one statement. PA as it stands neither
                asserts nor denies that the two readings express the same set of numbers. X asserts it, and
                gives no way to resolve which reading is the case.
            </Paragraph>
            <Paragraph>
                The circles (<Cite part="1.4" />): for N ≥ 1, C_N is the arithmetic modulo N read as a structure for PA's
                signature, and the mirror μ_N sends each element a to N − a, its negation. The mirror carries
                a step up to a step down, μ_N(Sa) = P μ_N(a), and respects addition. The circles of factorial
                size are the C_N with N = M(n), and on any circle a set defined by a formula has a definition
                from the bottom, D, and a definition from the top, μ_N[D] (<Cite part="1.6" />): the coprimes U_N, the primes
                P_N below N, and their mirror image P′_N are the three that matter below.
            </Paragraph>
            <Paragraph>
                The canonical sentences (<Cite part="1.7" />), each expected true, the customary short forms their
                corollaries:
            </Paragraph>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Name</Word>
                    <Word>Canonical sentence</Word>
                    <Word>Corollary</Word>
                </Sentence>
                <Sentence>
                    <Word>GC</Word>
                    <Word>∀n ≥ 2 ∃k {'<'} n (n − k and n + k are prime)</Word>
                    <Word>Every even number from 4 up is a sum of two primes</Word>
                </Sentence>
                <Sentence>
                    <Word>TP</Word>
                    <Word>∀n ≥ 3 ∃m (n {'<'} m {'<'} M(n) and m − 1 and m + 1 are prime)</Word>
                    <Word>There are infinitely many twin primes</Word>
                </Sentence>
                <Sentence>
                    <Word>RH</Word>
                    <Word>The counts from the bottom and from the top in the balance identity differ by at most C · x^(1/2+ε)</Word>
                    <Word>The Riemann hypothesis, in its arithmetic form</Word>
                </Sentence>
                <Sentence>
                    <Word>Euclid</Word>
                    <Word>∀n ∃p (n {'<'} p ≤ S(M(n)) and p is prime)</Word>
                    <Word>There are infinitely many primes; PA proves this one</Word>
                </Sentence>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What is known</Heading>
            <Paragraph>
                Everything in this section is a theorem of PA or of ordinary mathematics; the constraints on
                X cite these results by their labels (<Cite part="section 2" /> of the statement). The spine of the subject
                is five facts about the circles of factorial size.
            </Paragraph>
            <Paragraph>
                <List />
                <Line><Cite part="K2" />, the zero of the sieve: every d with 1 ≤ d ≤ n divides M(n) — provable in PA by induction. The limiting factorial is the number every small number divides, as every number divides zero (<Cite part="K11" />: PA proves that if every y divides x then x = 0).</Line>
                <Line><Cite part="K3" />, the fold: 2 · A(n) = n · Sn, so on the circle of size N = M(n) the sum A(N) is N/2 — the fixed point of the mirror, the one odd point halfway between zero and the top on the scale whose unit is half the top.</Line>
                <Line><Cite part="K4" />, the mirror: if p divides N then p divides a exactly when p divides N − a; the coprimes satisfy U_N = μ_N[U_N] — coprimality is symmetric on a circle.</Line>
                <Line><Cite part="K5" />, the circle: C_N satisfies S2, A1, A2, M1, M2 and every instance of induction, and fails exactly S1 — the one axiom whose keeping or failing separates the numbers from the circles.</Line>
                <Line><Cite part="K9" />, distinctness: the primes are not symmetric on a named circle — on C_210, 23 is prime and its mirror 187 = 11 · 17 is not — so P_N ≠ P′_N where PA can check it.</Line>
            </Paragraph>
            <Paragraph>
                Three counting theorems on the circles carry the three conjectures' forms, each by the
                Chinese remainder theorem or by an identity (<Cite part="K6" />, <Cite part="K7" />, <Cite part="K8" />): every even element of an even
                circle is a sum of two coprimes, in a computable count; the elements whose two neighbours are
                both coprime are counted by the same product and grow without bound as primes are added; and
                the balance identity splits the floor of the square root into a term of the bottom and a term
                of the top. And two results place Gödel (<Cite part="K16" />, <Cite part="K17" />): an undecided Π1 sentence holds of every
                numeral while its negation is consistent and ω-inconsistent, the asserted exception no
                numeral; and PA proves G equivalent to Con.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The three types of theorem</Heading>
            <Paragraph>
                GC, TP and RH are the foundational examples of three types of theorem about a property φ of
                numbers (<Cite part="section 3" /> of the statement). Each type has a general form, a basic case PA proves, a
                theorem on the circles with the definitions from the bottom and from the top kept distinct,
                and its foundational example. The basic cases are where the types can be checked against
                ordinary proof (<Cite part="C9" />); they are the first three theorems below, and PA proves each.
            </Paragraph>
            <Theorem>
                <Line>Pairing, the basic case. For all n and k {'<'} n: n − k is coprime to n exactly when n + k is.</Line>
            </Theorem>
            <Proof>
                A prime dividing n divides n − k exactly when it divides n + k, since their sum and
                difference are multiples of n (<Cite part="K4" />). This is the mirror on the circle of size n, and it is the
                ordinary proof.
            </Proof>
            <Theorem>
                <Line>Recurrence, the basic case. For every n there is a prime p with n {'<'} p ≤ S(M(n)) — Euclid, in canonical form.</Line>
            </Theorem>
            <Proof>
                Every number up to n divides M(n) (<Cite part="K2" />), so no number up to n divides S(M(n)) but 1; its least
                proper divisor is a prime above n, and it is bounded by S(M(n)) itself — the top supplies the
                bound, which is the canonical form's point (<Cite part="K12" />).
            </Proof>
            <Theorem>
                <Line>Balance, the basic case. The count of multiples of 5 up to x is within 1 of x/5.</Line>
            </Theorem>
            <Proof>
                The multiples of 5 recur with period 5 from the bottom and, by the mirror, with period 5 from
                the top; the two counts bracket x/5 within one period.
            </Proof>
            <Paragraph>
                The foundational examples are the same three forms with φ the primes, and each is, on the
                circles, already a theorem (<Cite part="K6" />, <Cite part="K7" />, <Cite part="K8" />). What the three arguments lack is one and the same
                step — concluding the universal form among the numbers from the circle form generalized over
                every pair of definitions that can be made equal in the limit (<Cite part="C6" />, <Cite part="C7" />). That step is X, and
                it is not yet found.
            </Paragraph>
            <Theorem>
                <Line>Pairing — Goldbach. ∀n ≥ 2 ∃k {'<'} n (n − k and n + k are prime).</Line>
            </Theorem>
            <Proof>
                On the circle of size M(n), every even element is a sum of two elements coprime to the size,
                in the count <Cite part="K6" /> gives, the primes from the bottom and their mirror from the top kept
                distinct. <Interpolated>{'{One use of X concludes the universal form — the figure of X is open as O6, and which definitions it generalizes over as O2 and O3}'}</Interpolated>.
                No analysis is used (<Cite part="C6" />).
            </Proof>
            <Theorem>
                <Line>Recurrence — the twin primes. ∀n ≥ 3 ∃m (n {'<'} m {'<'} M(n) and m − 1 and m + 1 are prime).</Line>
            </Theorem>
            <Proof>
                On the circle of size M(n), the count of elements whose two neighbours are both coprime grows
                without bound as primes are added
                (<Cite part="K7" />). <Interpolated>{'{One use of X concludes the canonical form; its derivation through K7 is open as O7}'}</Interpolated>.
                The computed record stands at every n from 3 to 10,000,000 (<Cite part="K21" />, of the progress).
            </Proof>
            <Theorem>
                <Line>Balance — the arithmetic Riemann hypothesis. The count of primes from the bottom and the count from the top differ by no more than the stated bound.</Line>
            </Theorem>
            <Proof>
                The balance identity holds for every x (<Cite part="K8" />): the floor of the square root is the whole,
                split into a term of the bottom and a term of the
                top. <Interpolated>{'{One use of X bounds the difference — the general form of the balance type is open as O11}'}</Interpolated>.
            </Proof>
        </Section>
        <Section>
            <Heading>The object</Heading>
            <Paragraph>
                X is one finitely stated object that modifies the formalism by adding a new way of
                identifying truths; T denotes PA with X adjoined (<Cite part="section 4" />). Its kind is not fixed — an
                axiom, a rule of inference, a duality, or something else as fundamental — but its best form
                is guided (<Cite part="4.1" />): singular, not an infinite schema, agnostic to interpretation, looking like a
                natural modification of universal inference, wearing the same clothing as the other parts of
                the formalism. A rule of inference seems fitting: like induction, expressible finitely,
                operating on formulas, corresponding to a new form of proof — a new way to make universal
                conclusions. <Interpolated>{'{The figure of X goes here: its premises, its one conclusion, its free formula, its side condition decidable on the written proof — O6}'}</Interpolated>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The constraints</Heading>
            <Paragraph>
                What X must satisfy (<Cite part="section 5" />): stated finitely and checkable by a reader as induction is
                (<Cite part="C1" />); internal to PA's formalism, naming no primes, sieves or moduli (<Cite part="C2" />); every clause
                traced to a commitment of meaning (<Cite part="C3" />); unique in the sense that any two objects meeting the
                constraints give the same theorems (<Cite part="C4" />). What it must do: prove the canonical GC, TP and RH
                (<Cite part="C5" />), each immediately — the circle theorem followed by one use of X, no analysis (<Cite part="C6" />) — and
                exactly the theorems of the circle paradigm (<Cite part="C7" />); relate G, Con and the empty derivation,
                what is unprovable in PA being what the derivation with zero steps proves (<Cite part="C8" />, open as <Cite part="O5" />);
                and pass every required test while proving no excluded one (<Cite part="C9" />). How it must stand to PA:
                consistent relative to PA, preferably by an interpretation in the circles or a limit object
                (<Cite part="C10" />); independent, since PA has not made a decision about symmetry (<Cite part="C11" />); stated so that it
                can fail — if PA refutes Goldbach the theory is inconsistent and is withdrawn, and if PA
                proves Goldbach X is not needed for it (<Cite part="C12" />); fixed by σ up to provable equivalence, with S1
                kept and never false (<Cite part="C13" />).
            </Paragraph>
        </Section>
        <Section>
            <Heading>The meaning</Heading>
            <Paragraph>
                Each clause of X must trace to a commitment about what arithmetic means (<Cite part="C3" />, <Cite part="section 6" />).
                Zero is what the subject uses to speak of the existence of non-quantities without
                distinction: every number divides zero, and how many that is, is not none and is not a
                quantity the signature can refer to — it is one to one with "for all", and "for all" is
                "there does not exist" seen from the opposite side. Arithmetic has a reading from the top,
                and the top is not a number: it has no successor, so it is nothing's predecessor; it is no
                steps from itself; in multiples of steps from it, it is none. Induction is the expression
                that properties transcend — what holds at one end and is kept by each step reaches the
                other — and multiplicity is symmetric under interpretation. Two readings, and one circle with
                two directions, are two ways of seeing the same thing; the subject holds no opinion about
                where the journey starts (<Cite part="C13" />).
            </Paragraph>
            <Paragraph>
                The opposite reading holds that the top and the bottom are two different things. In Gödel's
                argument it appears as G and ¬G referring to two different things — G unprovable but true,
                ¬G provable by a proof of infinite length. On the symmetric reading these refer to one thing:
                the proof of infinite length is the proof with zero steps (<Cite part="6.4" />). What is incomplete, on this
                subject's view, is the asymmetric reading — and the exception it would assert is the same
                thing a proof of G looks like there: big, even, divisible by every prime, a top taken as
                distinct from zero, which among the numbers does not exist (<Cite part="K13" />, <Cite part="K11" />). This is one subject's
                opinion of another, and it places no requirement on that subject. The surrounding work sits
                in the subject's notes: Gödel's system in <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>,
                and the exchange of zero and infinity in <Means>$[[ Zero and Infinity ]]( Arithmetic Notebook / Zero and Infinity )</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The tests</Heading>
            <Paragraph>
                A candidate for X is judged on the statement's <Cite part="section 7" /> before anything else: T must prove
                the basic cases as their ordinary proofs — the coprime pairing, Euclid with the top taken as
                M(n), the count of multiples of five — and the canonical GC, TP and RH, each immediate; and
                it must not prove what PA refutes: that every N has two multiples of 5 at equal positive
                distance, that the polynomial of the local-global failure has a root (<Cite part="K18" />), that the primes
                equal their mirror on the numeral 210, that there is ever a larger even prime, or that
                0 = 1. The excluded rows are checks to run on a candidate, not further demands, since
                consistency relative to PA (<Cite part="C10" />) excludes them already.
            </Paragraph>
        </Section>
        <Paragraph>
            The specification is the anchor for the work: it is updated when its parts are found
            inconsistent, since an inconsistent specification has specified nothing, and it is not thrown
            away — a change is made by changing it. The open determinations <Cite part="O1" /> to <Cite part="O11" /> stand in the progress
            on the other side of this page, and the chapter closes when the brace in The object is
            replaced by the figure it stands for.
        </Paragraph>
        <Specification>
            <Heading>Specification</Heading>
            <Markdown identifier="statement-of-work" />
        </Specification>
        <Progress>
            <Heading>Progress</Heading>
            <Markdown identifier="progress" />
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
