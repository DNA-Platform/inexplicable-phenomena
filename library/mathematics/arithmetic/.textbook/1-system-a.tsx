import { Chapter, Equation, Heading, Math, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ System A ]]</Title>
        <Paragraph>
            System A, A for Arithmetic, is the formal system this work means by Peano Arithmetic: first-order
            Peano arithmetic, defined so that its logic is the standard one and its arithmetization is Gödel's
            own. This chapter defines the system, maps it into the system P
            of <Means>$[[ Gödel 1931 ]]( Mathematical Library / Gödel 1931 )</Means>, and states the sense in
            which both formalize one thing, the Peano axioms, so that PA may name System A without losing
            Gödel's letter.
        </Paragraph>
        <Section>
            <Heading>The logic</Heading>
            <Paragraph>
                The logic of System A is first-order logic as Leary and Kristiansen specify it in A Friendly
                Introduction to Mathematical Logic, second edition: the connectives ¬ and ∨ and the quantifier ∀
                primitive, with ∧, →, ↔ and ∃ their usual abbreviations; the variables v₁, v₂, and so on, one for
                each positive integer, written x, y, z informally; the equality symbol = present in every
                language as a logical symbol; the logical axioms the equality axioms E1 to E3 and the quantifier
                axioms Q1, <Math>{'(\\forall x\\,\\varphi) \\rightarrow \\varphi^x_t'}</Math>, and
                Q2, <Math>{'\\varphi^x_t \\rightarrow (\\exists x\\,\\varphi)'}</Math>, for t substitutable for x;
                the rules of inference propositional consequence and the quantifier rules, from ψ → φ to
                ψ → ∀x φ and from φ → ψ to (∃x φ) → ψ when x is not free in ψ; and a deduction a finite
                sequence of formulas, each a logical axiom, an axiom of the theory, or the conclusion of a rule
                from earlier lines. The system is sound and complete for first-order consequence. Enderton's A
                Mathematical Introduction to Logic specifies the same logic over the same number-theoretic
                language with different engineering, so the notation here is the literature's, not this work's.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The language and the numbering</Heading>
            <Paragraph>
                The language of System A is <Math>{'\\mathcal{L}_A = \\{0, S, +, \\cdot\\}'}</Math>: the constant
                0, the unary function S, the binary functions + and ·. The order is defined,
                <Math>{'x < y \\;:\\Leftrightarrow\\; \\exists z\\,(x + Sz = y)'}</Math>, and exponentiation is
                recovered through Gödel's β-function, so neither is a sign. The numbering is Gödel's with three
                signs adjoined: 0, S, ¬, ∨, ∀ and the two brackets take his odd numbers 1, 3, 5, 7, 9, 11, 13
                under the dictionary of <Means>$[[ The System P ]]( Arithmetic Notebook / The System P )</Means>;
                the variables v₁, v₂, and on are his variables of the first type, the primes above 13 at the
                first power; the numbers <Math>{'p^n'}</Math> for n above 1, his higher types, go unused; and =,
                + and · take the odd numbers 15, 21 and 25, which no sign or variable of P occupies. A series of
                signs numbered <Math>{'n_1, \\ldots, n_k'}</Math> is numbered <Math>{'2^{n_1} \\cdot 3^{n_2} \\cdots p_k^{n_k}'}</Math>,
                unchanged, so formulas, proof-figures and the ladder of definitions up to the proof relation
                re-run as Gödel wrote them, with two local edits: a term is built from 0 and variables by S, +
                and · rather than by S alone, and the elementary formula a(b) becomes the equation s = t.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The axioms</Heading>
            <Paragraph>
                Six axioms and a schema. The six are the successor and recursion axioms — the first six axioms of
                Leary and Kristiansen's theory N, their axioms for E and the order not needed here — and the
                schema is induction, one axiom for each formula <Math>{'\\varphi'}</Math> of <Math>{'\\mathcal{L}_A'}</Math>,
                parameters allowed and universally closed:
            </Paragraph>
            <Equation>{'\\begin{gathered} \\forall x\\, \\neg\\,(Sx = 0) \\qquad\\quad \\forall x\\,\\forall y\\,(Sx = Sy \\rightarrow x = y) \\\\[4pt] \\forall x\\,(x + 0 = x) \\qquad \\forall x\\,\\forall y\\,(x + Sy = S(x + y)) \\\\[4pt] \\forall x\\,(x \\cdot 0 = 0) \\qquad \\forall x\\,\\forall y\\,(x \\cdot Sy = x \\cdot y + x) \\\\[6pt] \\bigl[\\varphi(0) \\land \\forall x\\,(\\varphi(x) \\rightarrow \\varphi(Sx))\\bigr] \\rightarrow \\forall x\\,\\varphi(x) \\end{gathered}'}</Equation>
            <Paragraph>
                The schema proves what the finite list leaves open; in particular every number other than 0 is a
                successor, <Math>{'\\forall x\\,(x = 0 \\lor \\exists y\\,(x = Sy))'}</Math>, by induction on x.
                System A so axiomatized is Peano Arithmetic as the literature defines it: the PA of Kaye's Models
                of Peano Arithmetic, 1991, and of Hájek and Pudlák's Metamathematics of First-Order Arithmetic,
                1993, whose first-order ancestry runs through the system Z of Hilbert and Bernays, Grundlagen der
                Mathematik, 1934, and the theories of Tarski, Mostowski and Robinson, Undecidable Theories, 1953.
            </Paragraph>
        </Section>
        <Section>
            <Heading>System P and System A</Heading>
            <Paragraph>
                The map from A to P sends each sign to Gödel's: 0 to 0, S to f, ¬ to ~, ∨ to ∨, ∀ to Π, the
                variables v₁, v₂ and on to the variables of the first type; the abbreviations ∧, → and ∃ to P's
                dot, ⊃ and (Eu); the equality s = t to P's defined identity; and + and · to addition and
                multiplication as Principia defines them from the class apparatus. Every theorem of System A maps
                to a theorem of System P: the six axioms become theorems of P under those definitions, and each
                instance of the induction schema follows from P's single induction axiom, since
                comprehension, <Math>{'(\\mathrm{E}u)\\,(v\\,\\Pi\\,(u(v) \\equiv \\varphi))'}</Math>, supplies
                the class of the <Math>{'\\varphi'}</Math>s and the axiom applied to that class is the instance.
                The converse does not hold at full strength: P proves sentences of <Math>{'\\mathcal{L}_A'}</Math> that
                System A does not, the price and the purchase of its classes. The difference between the two
                systems is one belief, the completed totality of properties, which System P holds as a variable
                one may quantify and System A refuses, holding induction one formula at a time.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Why PA names System A</Heading>
            <Paragraph>
                Peano Arithmetic is the name of a meaning before it is the name of a system: the axioms of Peano
                1889, drawn from Dedekind 1888, the simply infinite system with no element before its base. The
                system P formalizes that meaning inside the logic of Principia, which Gödel adopted, by his own
                footnote, only to make the proof definite; System A formalizes the same meaning first-order, and
                it is the system the literature has called PA since the types fell away. The two share the
                numbers' signs, the numbering and the arithmetization — what Gödel proved of P he proved of a
                wide class of systems, System A among them, as his lectures of 1934 carried out — so calling
                System A by the name PA keeps both of Gödel's letters: the letter of his signs, preserved by the
                dictionary, and the letter of his theorems, which re-run in A through the same numbered
                definitions. Where the two differ, the difference is not arithmetic but the one belief named
                above, and this work's subject is the system that refuses it.
            </Paragraph>
        </Section>
    </Chapter>
);
