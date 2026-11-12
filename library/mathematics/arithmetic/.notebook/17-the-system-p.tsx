import { Chapter, Equation, Heading, Math, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The System P ]]</Title>
        <Paragraph>
            "The first thing we need to do is decide on what our PA will be. Gödel used his own version of a formal
            system in his work right? What is the definition of that thing?" (in the room, 12 November 2026). This
            note answers from the held paper, since "we have Gödel's work here and we can look it up" (in the room,
            12 November 2026): the exact description of the formal system P stands in section 2
            of <Means>$[[ Gödel 1931 ]]( Mathematical Library / Gödel 1931 )</Means>, pages 42 to 45 of the English
            held beside its chapter. P is essentially the logic of Principia Mathematica superposed on the Peano
            axioms, the numbers as individuals and the successor relation as the undefined basic concept; his
            footnote 16 adds that the Peano axioms serve only to simplify the proof, so P is PM made definite
            enough to count.
        </Paragraph>
        <Section>
            <Heading>What Gödel uses</Heading>
            <Paragraph>
                Seven constant signs and the variables. The constants are ~ for not, ∨ for or, Π for all, 0 for
                nought, f for the successor of, and the two brackets. The variables come in types, one type for
                every natural number: x₁, y₁, z₁ range over the individuals, the natural numbers with 0 among them;
                x₂, y₂, z₂ over classes of individuals; x₃ over classes of classes, and so on; relations are
                spared as signs because a pair is a class of classes. A numeral is 0 with f struck before it some
                number of times; an elementary formula is a(b), a sign of type n + 1 said of a sign of type n; the
                formulas are the smallest class holding the elementary ones and closed under negation, disjunction
                and generalization. Everything else is abbreviation — the dot for and, ⊃ for implies, (Eu) for
                existence, and identity itself is defined through the second type, Leibniz's way, as in
                Principia's *13:
            </Paragraph>
            <Equation>{'x_1 = y_1 \\;:\\Leftrightarrow\\; x_2\\,\\Pi\\,\\bigl(x_2(x_1) \\supset x_2(y_1)\\bigr)'}</Equation>
            <Paragraph>
                The axioms come in five groups: the three Peano axioms; the four propositional schemata of
                Principia; two quantifier schemata, with substitution carried out inside the schema, von Neumann's
                economy, so no substitution rule is needed; comprehension, which the paper names the axiom of
                reducibility; and extensionality with its type-lifts. The Peano axioms and comprehension, as the
                paper prints them:
            </Paragraph>
            <Equation>{'\\begin{gathered} \\sim\\!(f x_1 = 0) \\qquad\\quad f x_1 = f y_1 \\;\\supset\\; x_1 = y_1 \\\\[4pt] x_2(0) \\;.\\; x_1\\,\\Pi\\,\\bigl(x_2(x_1) \\supset x_2(f x_1)\\bigr) \\;\\supset\\; x_1\\,\\Pi\\,\\bigl(x_2(x_1)\\bigr) \\\\[4pt] (\\mathrm{E}u)\\,\\bigl(v\\,\\Pi\\,(u(v) \\equiv a)\\bigr) \\end{gathered}'}</Equation>
            <Paragraph>
                Two rules of inference, called immediate consequence: modus ponens and generalization. The provable
                formulas are the smallest class containing the axioms and closed under them; the proof as an
                object, the finite series of formulas each an axiom or an immediate consequence of earlier ones,
                enters when the paper arithmetizes, definitions 44 and 45, the proof-figure and x B y. The
                numbering gives the seven constants the odd numbers 1, 3, 5, 7, 9, 11, 13 in the order 0, f, ~, ∨,
                Π, brackets; a variable of type n a number <Math>{'p^n'}</Math> for a prime p above 13; and a
                series of signs numbered <Math>{'n_1, \\ldots, n_k'}</Math> the product of the first k primes
                raised to them, <Math>{'2^{n_1} \\cdot 3^{n_2} \\cdots p_k^{n_k}'}</Math>. Under that map the
                empty series is the empty product, 1, the address for the empty proof
                that <Means>$[[ ./The Rulings ]]</Means> retired when the length, not the code, was ruled to carry
                the semantics.
            </Paragraph>
        </Section>
        <Section>
            <Heading>Not a first-order logic, and why</Heading>
            <Paragraph>
                Is P a proper first-order logic? No. A first-order logic quantifies over individuals only; P's Π
                binds variables of every type, and its mathematics lives in that freedom. Four things make it hard
                to even interpret as one. Induction is a single axiom because x₂ is a variable of the language —
                the system says every class in one sentence, where a first-order system can only say one formula
                at a time. Identity is not a sign but a definition through the classes, so losing the types loses
                =. Addition and multiplication are not signs either — Principia defines them from the class
                apparatus, so losing the types loses + and · with nothing left to define them from. And
                comprehension summons a class for every formula, an axiom with no first-order sentence to
                correspond to it. A first-order reading does exist — Henkin's, 1950, P as a many-sorted theory
                whose classes are only what the axioms force — but it changes what the quantifiers mean, and the
                standard reading of P is higher-order. Marked as the team's reading, for his word: the one axiom
                of induction quantifies over the completed totality of the subject's properties, which is the
                belief this paper's subject refuses; the move to a first-order foundation is the paper's own
                stance taken in syntax, and it pays for the refusal with a schema.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The closest first-order match</Heading>
            <Paragraph>
                The closest first-order formalism that preserves the numbering almost identically is first-order
                Peano arithmetic written over Gödel's own alphabet. Keep the seven constants with their numbers 1
                to 13; keep the individuals' variables exactly as they are, the primes above 13 at the first
                power; let the numbers <Math>{'p^n'}</Math> for higher types simply go unused; and adjoin the
                three signs
                P defined away, =, + and ·, with three further odd numbers free of the variables' form — say 15,
                21 and 25, the team's choice for his word. The series map, the product of primes, is unchanged,
                and with it the proof-figure, so the forty-five numbered definitions re-run with two local edits:
                the terms widen from f-strings to sums and products, and the elementary formula a(b) becomes the
                equation s = t. The axioms, in the same dress:
            </Paragraph>
            <Equation>{'\\begin{gathered} \\sim\\!(f x_1 = 0) \\qquad\\quad f x_1 = f y_1 \\;\\supset\\; x_1 = y_1 \\\\[4pt] x_1 + 0 = x_1 \\qquad x_1 + f y_1 = f(x_1 + y_1) \\qquad x_1 \\cdot 0 = 0 \\qquad x_1 \\cdot f y_1 = x_1 \\cdot y_1 + x_1 \\\\[4pt] \\varphi(0) \\;.\\; x_1\\,\\Pi\\,\\bigl(\\varphi(x_1) \\supset \\varphi(f x_1)\\bigr) \\;\\supset\\; x_1\\,\\Pi\\,\\bigl(\\varphi(x_1)\\bigr) \\end{gathered}'}</Equation>
            <Paragraph>
                The first line is Gödel's, unchanged. The second is what the types paid for: the recursion
                equations must now be axioms, since the classes that defined + and · are gone. The third is the
                demotion made visible — one instance for every formula <Math>{'\\varphi'}</Math>, a schema where P
                had one axiom, and <Math>{'\\varphi'}</Math> is a metavariable, not a sign, so the schema costs
                the alphabet nothing and the numbering does not move. The sequences that P's classes carried are
                recovered by Gödel's own β-function, the Chinese-remainder device of his 1934 Princeton lectures,
                printed in Davis's The Undecidable, 1965. The lineage that makes this the official choice: the
                system Z of Hilbert and Bernays, Grundlagen der Mathematik, volume I, 1934; the first-order
                theories of Tarski, Mostowski and Robinson, Undecidable Theories, 1953; and the modern canon, Kaye,
                Models of Peano Arithmetic, 1991, and Hájek and Pudlák, Metamathematics of First-Order Arithmetic,
                1993 — each named here with where it lives, a chapter of the library on his cut. What stays
                Gödel's in our PA: the alphabet and its numbers, the series coding, the ladder of definitions to
                the proof relation, and the lifted predicate Pf(φ, ℓ) with 0 the unique number of every length,
                as <Means>$[[ ./Zero for Proof ]]</Means> states it — "as true to Gödel's as we can while having a
                solid first-order foundation" (in the room, 12 November 2026), which is the decision this note is
                for.
            </Paragraph>
        </Section>
    </Chapter>
);
