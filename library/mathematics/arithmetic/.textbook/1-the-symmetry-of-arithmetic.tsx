import { Append, Chapter, Heading, Line, Means, Paragraph, Part, Title } from '@dna-platform/public';
import { Content, Interpolated, Introduction, Markdown, Project, Proof, Theorem } from '../../.reference/7-the-content~code.tsx';

export default () => (
    <Chapter>
        <Part>The Objects</Part>
        <Title>[[ The Symmetry of Arithmetic ]]</Title>
        <Content />
        <Introduction>
            The project behind this chapter: the statement of work that specifies X, and the progress of the
            search. Open a part to read it.
        </Introduction>
        <Paragraph>
            The first object of the textbook: X, a single object added to first-order Peano arithmetic,
            expressing that arithmetic has a symmetry the formalism does not at present state. X is not yet
            found. By the statement of work's own guidance it is a rule of inference — singular, stated
            finitely, operating on formulas as induction does, a new way to make universal conclusions — and
            this chapter teaches the formalism with X in its place, every part not yet found standing as an
            interpolated part, a placeholder describing where the thing will go. The project behind this
            chapter — its statement of work and its progress — stands on the other side.
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
            The rule itself: <Interpolated>the figure of X — its premises, its one conclusion, its free formula and its side condition decidable on the written proof — stands to be found; its kind is the sixth open determination of the project's progress</Interpolated>.
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
            and is withdrawn. Citations run into the subject's notes, where the surrounding work already
            sits: Gödel's system in <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>, and the exchange
            of zero and infinity in <Means>$[[ Zero and Infinity ]]( Arithmetic Notebook / Zero and Infinity )</Means>.
        </Paragraph>
        <Project>
            <Heading>Specification</Heading>
            <Markdown identifier="statement-of-work" />
        </Project>
        <Project>
            <Heading>Progress</Heading>
            <Markdown identifier="progress" />
        </Project>
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
