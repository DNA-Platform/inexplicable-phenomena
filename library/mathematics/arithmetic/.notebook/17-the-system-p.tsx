import { Bold, Chapter, Emphasis, Heading, Line, List, Math, Means, Paragraph, Part, Section, Sentence, Title, Word } from '@dna-platform/public';
import { Table } from '../../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The System P ]]</Title>
        <Paragraph>
            Set here verbatim from the final version of his Claude Desktop session, 12 November 2026, on his word
            that these are our notes; the walk that produced it, his questions and the rulings, stands in
            Sprint 128's record.
        </Paragraph>
        <Section>
            <Heading>Formal Logic and Formal Arithmetic: System L and System A</Heading>
            <Paragraph>
                <Word><Bold />System L</Word> is our Formal Logic. <Word><Bold />System A</Word> is our Formal
                Arithmetic, an extension of System L. Both are first-order in language. They differ from standard
                first-order logic in one respect: a system is extended not only by signs and axioms but also by
                rules of inference. System A proves exactly the theorems of Peano Arithmetic.
            </Paragraph>
            <Paragraph>
                Contents: 1. Formal Logic. 2. Formal Arithmetic. 3. Comparison with Gödel's System P.
                4. Comparison with PA. 5. Notes toward publication.
            </Paragraph>
        </Section>
        <Section>
            <Heading>1. Formal Logic: System L</Heading>
        </Section>
        <Section>
            <Heading>1.1 Signature</Heading>
            <Paragraph>
                A <Word><Bold />signature</Word> Σ is three finite sets:
            </Paragraph>
            <Paragraph>
                <List />
                <Line><Word><Bold />constants</Word> c;</Line>
                <Line><Word><Bold />functions</Word> f, each with a number of places n ≥ 1;</Line>
                <Line><Word><Bold />relations</Word> R, each with a number of places n ≥ 1.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>1.2 Language over Σ</Heading>
            <Paragraph>
                <List />
                <Line>
                    <Word><Bold />Logical signs</Word>: ¬  ∨  ∀  =  (  )
                </Line>
                <Line>
                    <Word><Bold />Variables</Word>: v₁, v₂, v₃, … (written x, y, z)
                </Line>
                <Line>
                    <Word><Bold />Terms</Word>: a variable; a constant; f(t₁, …, tₙ)
                </Line>
                <Line>
                    <Word><Bold />Formulas</Word>: s = t; R(t₁, …, tₙ); ¬φ; (φ ∨ ψ); ∀x φ
                </Line>
                <Line>
                    <Word><Bold />Abbreviations</Word>: φ → ψ; φ ∧ ψ; φ ↔ ψ; ∃x φ; s ≠ t
                </Line>
            </Paragraph>
            <Paragraph>
                A <Word><Bold />sentence</Word> is a formula with no free variable. Variables range over the
                individuals of the domain and over nothing else.
            </Paragraph>
        </Section>
        <Section>
            <Heading>1.3 Identifications, proofs, theorems</Heading>
            <Paragraph>
                <List />
                <Line>
                    An <Word><Bold />identification</Word> Γ ⊢ φ is a finite set Γ of formulas (the open
                    assumptions) and a formula φ.
                </Line>
                <Line>
                    A <Word><Bold />rule of inference</Word> is a finite figure: premises (identifications), a
                    side condition, and a conclusion (an identification), written with metavariables for formulas
                    and terms.
                    In a system with signature Σ the metavariables range over the language over Σ.
                </Line>
                <Line>
                    A <Word><Bold />proof</Word> is a finite sequence of identifications, each the conclusion of
                    a rule whose premises occur earlier.
                </Line>
                <Line>
                    φ is a <Word><Bold />theorem</Word> when a proof ends in ∅ ⊢ φ.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>1.4 Systems and extension</Heading>
            <Paragraph>
                A <Word><Bold />system</Word> is a triple (Σ, Ax, R):
            </Paragraph>
            <Paragraph>
                <List />
                <Line>Σ a signature;</Line>
                <Line>
                    Ax a finite set of sentences over Σ, the <Word><Bold />axioms</Word>, each with a name;
                </Line>
                <Line>
                    R a finite set of admissible rules of inference, each with a name, containing the nine rules
                    of §1.5.
                </Line>
            </Paragraph>
            <Paragraph>
                <Word><Bold />System L</Word> is (∅, ∅, the nine rules). It has no signs of its own and no axioms.
            </Paragraph>
            <Paragraph>
                A system <Word><Bold />extends</Word> another when it has all of its constants, functions,
                relations, axioms and rules, and possibly more. So an extension may add five kinds of thing:
            </Paragraph>
            <Paragraph>
                <Line>1. constants</Line>
                <Line>2. functions</Line>
                <Line>3. relations</Line>
                <Line>4. axioms</Line>
                <Line>5. rules of inference</Line>
            </Paragraph>
            <Paragraph>
                Standard first-order logic provides 1 to 4. The fifth is what separates System L from it. There
                are no axiom schemas: what a schema would say is said by a rule.
            </Paragraph>
        </Section>
        <Section>
            <Heading>1.5 The rules of System L</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Family</Word>
                    <Word>Name</Word>
                    <Word>From</Word>
                    <Word>Infer</Word>
                    <Word>Condition</Word>
                </Sentence>
                <Sentence>
                    <Word>Structural</Word>
                    <Word>Assumption</Word>
                    <Word>—</Word>
                    <Word>Γ ⊢ φ</Word>
                    <Word>φ ∈ Γ</Word>
                </Sentence>
                <Sentence>
                    <Word>Structural</Word>
                    <Word>Axiom</Word>
                    <Word>—</Word>
                    <Word>Γ ⊢ α</Word>
                    <Word>α ∈ Ax</Word>
                </Sentence>
                <Sentence>
                    <Word>Structural</Word>
                    <Word>Consequence</Word>
                    <Word>Γ ⊢ γ₁, …, Γ ⊢ γₙ</Word>
                    <Word>Γ ⊢ φ</Word>
                    <Word>(γ₁ ∧ … ∧ γₙ) → φ is a tautology</Word>
                </Sentence>
                <Sentence>
                    <Word>Instantiation</Word>
                    <Word>Instantiation</Word>
                    <Word>Γ ⊢ ∀x φ(x)</Word>
                    <Word>Γ ⊢ φ(t)</Word>
                    <Word>t substitutable for x</Word>
                </Sentence>
                <Sentence>
                    <Word>Equality</Word>
                    <Word>Self-Equality</Word>
                    <Word>—</Word>
                    <Word>Γ ⊢ t = t</Word>
                </Sentence>
                <Sentence>
                    <Word>Equality</Word>
                    <Word>Proof by Equality</Word>
                    <Word>Γ ⊢ s = t; Γ ⊢ φ(s)</Word>
                    <Word>Γ ⊢ φ(t)</Word>
                    <Word>s, t substitutable in φ</Word>
                </Sentence>
                <Sentence>
                    <Word>Hypothetical</Word>
                    <Word>Conditional Proof</Word>
                    <Word>Γ, φ ⊢ ψ</Word>
                    <Word>Γ ⊢ φ → ψ</Word>
                </Sentence>
                <Sentence>
                    <Word>Hypothetical</Word>
                    <Word>Proof by Contradiction</Word>
                    <Word>Γ, ¬φ ⊢ ψ ∧ ¬ψ</Word>
                    <Word>Γ ⊢ φ</Word>
                </Sentence>
                <Sentence>
                    <Word>Universal</Word>
                    <Word>Generalization</Word>
                    <Word>Γ ⊢ φ(x)</Word>
                    <Word>Γ ⊢ ∀x φ(x)</Word>
                    <Word>x not free in Γ</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                A <Word><Bold />tautology</Word> is a formula true under every assignment of truth values to its
                equations, relation formulas and quantified parts.
            </Paragraph>
            <Paragraph>
                <Word><Bold />The families</Word>
            </Paragraph>
            <Paragraph>
                <List />
                <Line>
                    <Word><Bold />Equality Inference</Word> states or uses the equality of individuals. Equality
                    is of individuals, not of representations: s = t says two terms have one individual, not that
                    they are one term. Proof by Equality carries over what φ says of the individual. An occurrence
                    of s inside a code of an expression is not an occurrence of s.
                </Line>
                <Line>
                    <Word><Bold />Hypothetical Inference</Word> has a premise with one more open assumption than
                    its conclusion. The conclusion states the connection between what was assumed and what was
                    reached.
                </Line>
                <Line>
                    <Word><Bold />Universal Inference</Word> concludes Γ ⊢ ∀x φ(x) from premises that speak of φ
                    only at named terms and at a variable x not free in Γ.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>1.6 Admissible rules</Heading>
            <Paragraph>
                A rule is <Word><Bold />admissible</Word> when it is:
            </Paragraph>
            <Paragraph>
                <List />
                <Line>
                    <Word><Bold />finite</Word>: one figure with finitely many premises;
                </Line>
                <Line>
                    <Word><Bold />decidable</Word>: whether given identifications stand in the rule can be
                    checked mechanically.
                </Line>
            </Paragraph>
            <Paragraph>
                Why rules may be added: logic lets a system specify a domain. Signs and axioms say what the domain
                is. A Universal Inference says how something is concluded of all of it. A system that specifies a
                domain must be able to say how generalizations over that domain are made.
            </Paragraph>
            <Paragraph>
                System L specifies nothing about its domain. It has one Universal Inference,
                Generalization: <Word><Emphasis />x was arbitrary</Word>.
            </Paragraph>
            <Paragraph>
                A rule need not be conservative. It may prove sentences the system did not.
            </Paragraph>
        </Section>
        <Section>
            <Heading>1.7 Facts about System L</Heading>
            <Paragraph>
                <List />
                <Line>
                    <Word><Bold />Equality.</Word> Symmetry and transitivity of = are provable from the two
                    Equality rules, and so is s = t → f(…s…) = f(…t…) for every function, and the like for every
                    relation. No extension owes an equality axiom for a new sign.
                </Line>
                <Line>
                    <Word><Bold />Agreement with first-order logic.</Word> A system that extends L by signs and
                    axioms only proves exactly the first-order consequences of its axioms.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. Formal Arithmetic: System A</Heading>
            <Paragraph>
                System A is the extension of System L by four signs, six axioms and one rule.
            </Paragraph>
        </Section>
        <Section>
            <Heading>2.1 Signs</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Sign</Word>
                    <Word>Kind</Word>
                    <Word>Name</Word>
                </Sentence>
                <Sentence>
                    <Word>0</Word>
                    <Word>constant</Word>
                    <Word>zero</Word>
                </Sentence>
                <Sentence>
                    <Word>S</Word>
                    <Word>function, one place</Word>
                    <Word>successor</Word>
                </Sentence>
                <Sentence>
                    <Word>+</Word>
                    <Word>function, two places</Word>
                    <Word>addition</Word>
                </Sentence>
                <Sentence>
                    <Word>·</Word>
                    <Word>function, two places</Word>
                    <Word>multiplication</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                Written Sx, x + y, x · y. Multiplication binds tighter than
                addition. <Word><Bold />Numerals:</Word> 0, S0, SS0, …
            </Paragraph>
        </Section>
        <Section>
            <Heading>2.2 Axioms</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Label</Word>
                    <Word>Name</Word>
                    <Word>Axiom</Word>
                </Sentence>
                <Sentence>
                    <Word>S1</Word>
                    <Word>Zero Is Not a Successor</Word>
                    <Word>∀x Sx ≠ 0</Word>
                </Sentence>
                <Sentence>
                    <Word>S2</Word>
                    <Word>Successor Is One-to-One</Word>
                    <Word>∀x∀y (Sx = Sy → x = y)</Word>
                </Sentence>
                <Sentence>
                    <Word>A1</Word>
                    <Word>Addition of Zero</Word>
                    <Word>∀x x + 0 = x</Word>
                </Sentence>
                <Sentence>
                    <Word>A2</Word>
                    <Word>Addition of a Successor</Word>
                    <Word>∀x∀y x + Sy = S(x + y)</Word>
                </Sentence>
                <Sentence>
                    <Word>M1</Word>
                    <Word>Multiplication by Zero</Word>
                    <Word>∀x x · 0 = 0</Word>
                </Sentence>
                <Sentence>
                    <Word>M2</Word>
                    <Word>Multiplication by a Successor</Word>
                    <Word>∀x∀y x · Sy = x · y + x</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                S1 and S2 specify succession. A1 and A2 specify addition by succession. M1 and M2 specify
                multiplication by addition. The labels are Enderton's.
            </Paragraph>
        </Section>
        <Section>
            <Heading>2.3 Rule</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Family</Word>
                    <Word>Name</Word>
                    <Word>From</Word>
                    <Word>Infer</Word>
                    <Word>Condition</Word>
                </Sentence>
                <Sentence>
                    <Word>Universal</Word>
                    <Word>Proof by Induction</Word>
                    <Word>Γ ⊢ φ(0); Γ ⊢ φ(x) → φ(Sx)</Word>
                    <Word>Γ ⊢ ∀x φ(x)</Word>
                    <Word>x not free in Γ</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                Every individual is 0 or is reached from 0 by S.
            </Paragraph>
            <Paragraph>
                The second premise is ordinarily reached by Conditional Proof: assume φ(x), the induction
                hypothesis; reach φ(Sx); discharge.
            </Paragraph>
        </Section>
        <Section>
            <Heading>2.4 The Universal Inferences so far</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Rule</Word>
                    <Word>Belongs to</Word>
                </Sentence>
                <Sentence>
                    <Word>Generalization</Word>
                    <Word>System L</Word>
                </Sentence>
                <Sentence>
                    <Word>Proof by Induction</Word>
                    <Word>System A</Word>
                </Sentence>
                <Sentence>
                    <Word>Proof by Symmetry</Word>
                    <Word>an extension of System A</Word>
                </Sentence>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. Comparison with Gödel's System P</Heading>
            <Paragraph>
                System P (<Means>$[[ Gödel 1931 ]]( Mathematical Library / Gödel 1931 )</Means>, §2) is the logic
                of Principia Mathematica over the Peano axioms. It has variables of every type: type 1 for
                individuals, type 2 for classes of individuals, type 3 for classes of classes, and so on.
            </Paragraph>
        </Section>
        <Section>
            <Heading>3.1 Translation of symbols</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>Gödel</Word>
                    <Word>Ours</Word>
                </Sentence>
                <Sentence>
                    <Word>~</Word>
                    <Word>¬</Word>
                    <Word>same</Word>
                </Sentence>
                <Sentence>
                    <Word>∨</Word>
                    <Word>∨</Word>
                    <Word>same</Word>
                </Sentence>
                <Sentence>
                    <Word>xΠ(a)</Word>
                    <Word>∀x a</Word>
                    <Word>same</Word>
                </Sentence>
                <Sentence>
                    <Word>0</Word>
                    <Word>0</Word>
                    <Word>same</Word>
                </Sentence>
                <Sentence>
                    <Word>f</Word>
                    <Word>S</Word>
                    <Word>same</Word>
                </Sentence>
                <Sentence>
                    <Word>ff0</Word>
                    <Word>SS0</Word>
                    <Word>same</Word>
                </Sentence>
                <Sentence>
                    <Word>a . b</Word>
                    <Word>a ∧ b</Word>
                    <Word>abbreviation in both</Word>
                </Sentence>
                <Sentence>
                    <Word>a ⊃ b</Word>
                    <Word>a → b</Word>
                    <Word>abbreviation in both</Word>
                </Sentence>
                <Sentence>
                    <Word>a ≡ b</Word>
                    <Word>a ↔ b</Word>
                    <Word>abbreviation in both</Word>
                </Sentence>
                <Sentence>
                    <Word>(Ex) a</Word>
                    <Word>∃x a</Word>
                    <Word>abbreviation in both</Word>
                </Sentence>
                <Sentence>
                    <Word>x₁, y₁, z₁</Word>
                    <Word>x, y, z</Word>
                    <Word>variables for individuals</Word>
                </Sentence>
                <Sentence>
                    <Word>Subst a (v/c)</Word>
                    <Word>φ(t)</Word>
                    <Word>notation for substitution</Word>
                </Sentence>
                <Sentence>
                    <Word>x₁ = y₁, defined</Word>
                    <Word>x = y, a logical sign</Word>
                    <Word>changed</Word>
                </Sentence>
                <Sentence>
                    <Word>x₂, y₂, … and a(b)</Word>
                    <Word>none (X, Y, X(x) below, to translate only)</Word>
                    <Word>absent</Word>
                </Sentence>
                <Sentence>
                    <Word>none</Word>
                    <Word>+ and ·</Word>
                    <Word>added</Word>
                </Sentence>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3.2 Axioms and rules of P against ours</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>P</Word>
                    <Word>Name</Word>
                    <Word>Gödel's form</Word>
                    <Word>In our notation</Word>
                    <Word>In System L / A</Word>
                </Sentence>
                <Sentence>
                    <Word>I.1</Word>
                    <Word>Peano 1</Word>
                    <Word>~(fx₁ = 0)</Word>
                    <Word>Sx ≠ 0</Word>
                    <Word>axiom S1</Word>
                </Sentence>
                <Sentence>
                    <Word>I.2</Word>
                    <Word>Peano 2</Word>
                    <Word>fx₁ = fy₁ ⊃ x₁ = y₁</Word>
                    <Word>Sx = Sy → x = y</Word>
                    <Word>axiom S2</Word>
                </Sentence>
                <Sentence>
                    <Word>I.3</Word>
                    <Word>Peano 3, induction</Word>
                    <Word>x₂(0) . x₁Π(x₂(x₁) ⊃ x₂(fx₁)) ⊃ x₁Π(x₂(x₁))</Word>
                    <Word>(X(0) ∧ ∀x (X(x) → X(Sx))) → ∀x X(x)</Word>
                    <Word>rule Proof by Induction</Word>
                </Sentence>
                <Sentence>
                    <Word>II.1–4</Word>
                    <Word>Propositional schemata</Word>
                    <Word>p ∨ p ⊃ p; p ⊃ p ∨ q; p ∨ q ⊃ q ∨ p; (p ⊃ q) ⊃ (r ∨ p ⊃ r ∨ q)</Word>
                    <Word>the same with →</Word>
                    <Word>rule Consequence</Word>
                </Sentence>
                <Sentence>
                    <Word>III.1</Word>
                    <Word>Instantiation schema</Word>
                    <Word>vΠ(a) ⊃ Subst a (v/c)</Word>
                    <Word>∀x φ(x) → φ(t)</Word>
                    <Word>rule Instantiation</Word>
                </Sentence>
                <Sentence>
                    <Word>III.2</Word>
                    <Word>Quantifier shift</Word>
                    <Word>vΠ(b ∨ a) ⊃ b ∨ vΠ(a)</Word>
                    <Word>∀x (ψ ∨ φ) → ψ ∨ ∀x φ</Word>
                    <Word>provable by Generalization</Word>
                </Sentence>
                <Sentence>
                    <Word>IV</Word>
                    <Word>Reducibility (comprehension)</Word>
                    <Word>(Eu)(vΠ(u(v) ≡ a))</Word>
                    <Word>∃X ∀x (X(x) ↔ φ)</Word>
                    <Word>none</Word>
                </Sentence>
                <Sentence>
                    <Word>V</Word>
                    <Word>Extensionality</Word>
                    <Word>x₁Π(x₂(x₁) ≡ y₂(x₁)) ⊃ x₂ = y₂</Word>
                    <Word>∀x (X(x) ↔ Y(x)) → X = Y</Word>
                    <Word>none</Word>
                </Sentence>
                <Sentence>
                    <Word>Def.</Word>
                    <Word>Identity</Word>
                    <Word>x₂Π(x₂(x₁) ⊃ x₂(y₁))</Word>
                    <Word>∀X (X(x) → X(y))</Word>
                    <Word>rules Self-Equality, Proof by Equality</Word>
                </Sentence>
                <Sentence>
                    <Word>Rule 1</Word>
                    <Word>Modus ponens</Word>
                    <Word>c from (~(b)) ∨ (c) and b</Word>
                    <Word>ψ from ¬φ ∨ ψ and φ</Word>
                    <Word>rule Consequence</Word>
                </Sentence>
                <Sentence>
                    <Word>Rule 2</Word>
                    <Word>Generalization</Word>
                    <Word>vΠ(a) from a</Word>
                    <Word>∀x φ from φ</Word>
                    <Word>rule Generalization</Word>
                </Sentence>
                <Sentence>
                    <Word>—</Word>
                    <Word>—</Word>
                    <Word>addition and multiplication defined through classes</Word>
                    <Word>—</Word>
                    <Word>axioms A1, A2, M1, M2</Word>
                </Sentence>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3.3 The differences in kind</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>—</Word>
                    <Word>System P</Word>
                    <Word>System L / A</Word>
                </Sentence>
                <Sentence>
                    <Word>Variables</Word>
                    <Word>every type</Word>
                    <Word>individuals only</Word>
                </Sentence>
                <Sentence>
                    <Word>Induction</Word>
                    <Word>one axiom over all classes</Word>
                    <Word>one rule over all formulas</Word>
                </Sentence>
                <Sentence>
                    <Word>Identity</Word>
                    <Word>defined over all classes</Word>
                    <Word>two rules over all formulas</Word>
                </Sentence>
                <Sentence>
                    <Word>+ and ·</Word>
                    <Word>defined</Word>
                    <Word>signs with four axioms</Word>
                </Sentence>
                <Sentence>
                    <Word>Schemas</Word>
                    <Word>groups II, III, IV</Word>
                    <Word>none</Word>
                </Sentence>
                <Sentence>
                    <Word>Proofs</Word>
                    <Word>sequences of formulas</Word>
                    <Word>sequences of identifications</Word>
                </Sentence>
                <Sentence>
                    <Word>Hypothetical Inference</Word>
                    <Word>not present; derived</Word>
                    <Word>two rules</Word>
                </Sentence>
                <Sentence>
                    <Word>Extension</Word>
                    <Word>by axioms</Word>
                    <Word>by signs, axioms and rules</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                What P says once of every class, System A says by a rule for one formula at a time. That is the
                whole of the change from P to a system that speaks of individuals only.
            </Paragraph>
        </Section>
        <Section>
            <Heading>3.4 Numbering, and why Gödel's theorems apply</Heading>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>—</Word>
                    <Word>In P</Word>
                    <Word>In System A</Word>
                </Sentence>
                <Sentence>
                    <Word>0, f, ~, ∨, Π, (, )</Word>
                    <Word>1, 3, 5, 7, 9, 11, 13</Word>
                    <Word>the same for 0, S, ¬, ∨, ∀, (, )</Word>
                </Sentence>
                <Sentence>
                    <Word>Variable of type n</Word>
                    <Word>pⁿ, p a prime above 13</Word>
                    <Word>the primes above 13</Word>
                </Sentence>
                <Sentence>
                    <Word>=, +, ·</Word>
                    <Word>not signs</Word>
                    <Word>three further numbers, to be fixed</Word>
                </Sentence>
                <Sentence>
                    <Word>Series n₁, …, n_k</Word>
                    <Math>{'2^{n_1} \\cdot 3^{n_2} \\cdots p_k^{n_k}'}</Math>
                    <Word>the same</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                After Proposition VI Gödel states that the proof used two properties of P only: the axioms and
                rules are recursively definable once signs are numbers, and every recursive relation is definable
                in the system. System A has both. The first is what admissibility (§1.6) secures, for System A and
                for every extension of it by admissible rules. The second holds by Gödel's β-function. In the
                other direction, every theorem of System A translates by §3.1 into a theorem of P.
            </Paragraph>
        </Section>
        <Section>
            <Heading>4. Comparison with Peano Arithmetic</Heading>
            <Paragraph>
                By PA we mean first-order Peano Arithmetic as in Enderton, Kaye, Hájek and Pudlák, or Smith.
            </Paragraph>
            <Paragraph>
                <Table />
                <Sentence>
                    <Word>—</Word>
                    <Word>PA</Word>
                    <Word>System A</Word>
                </Sentence>
                <Sentence>
                    <Word>Signs</Word>
                    <Word>0, S, +, · (some authors add &lt;, 1 or exponentiation)</Word>
                    <Word>0, S, +, ·</Word>
                </Sentence>
                <Sentence>
                    <Word>Successor axioms</Word>
                    <Word>S1, S2</Word>
                    <Word>S1, S2</Word>
                </Sentence>
                <Sentence>
                    <Word>Addition axioms</Word>
                    <Word>A1, A2</Word>
                    <Word>A1, A2</Word>
                </Sentence>
                <Sentence>
                    <Word>Multiplication axioms</Word>
                    <Word>M1, M2</Word>
                    <Word>M1, M2</Word>
                </Sentence>
                <Sentence>
                    <Word>"Every number is 0 or a successor"</Word>
                    <Word>an axiom of Robinson's Q; provable in PA</Word>
                    <Word>not an axiom; provable</Word>
                </Sentence>
                <Sentence>
                    <Word>Induction</Word>
                    <Word>a schema: one axiom for each formula</Word>
                    <Word>one rule</Word>
                </Sentence>
                <Sentence>
                    <Word>Equality</Word>
                    <Word>axioms or schemas of the logic</Word>
                    <Word>two rules</Word>
                </Sentence>
                <Sentence>
                    <Word>Logic</Word>
                    <Word>first-order logic, usually axioms with modus ponens</Word>
                    <Word>System L</Word>
                </Sentence>
                <Sentence>
                    <Word>Number of axioms</Word>
                    <Word>infinitely many</Word>
                    <Word>six</Word>
                </Sentence>
                <Sentence>
                    <Word>Extension</Word>
                    <Word>by axioms</Word>
                    <Word>by axioms and by rules</Word>
                </Sentence>
            </Paragraph>
            <Paragraph>
                <Word><Bold />Theorem.</Word> System A and PA have the same theorems.
            </Paragraph>
            <Paragraph>
                <Word><Emphasis />Sketch.</Word> From the rule to the schema: assume φ(0) ∧ ∀x (φ(x) → φ(Sx)); by
                Consequence and Instantiation obtain φ(0) and φ(x) → φ(Sx); x is not free in the assumption, so
                Proof by Induction gives ∀x φ(x); discharge by Conditional Proof. From the schema to the rule:
                given the two premises, Generalization gives ∀x (φ(x) → φ(Sx)), and the schema instance with
                Consequence gives ∀x φ(x). The remaining rules of L are sound and complete for first-order logic
                with equality.
            </Paragraph>
            <Paragraph>
                So System A is PA, presented finitely. The difference between them appears only when a further
                rule is added.
            </Paragraph>
        </Section>
        <Section>
            <Heading>5. Notes toward a publishable write-up</Heading>
        </Section>
        <Section>
            <Heading>What to state as definitions and theorems</Heading>
            <Paragraph>
                <Line>
                    1. Definitions: signature, language, identification, rule, system, extension, admissible
                    rule, Universal Inference. Number them.
                </Line>
                <Line>
                    2. Theorem: a system extending L by signs and axioms alone proves exactly the first-order
                    consequences of its axioms. Cite the completeness of natural deduction (Gentzen 1934; Prawitz
                    1965) rather than reproving it.
                </Line>
                <Line>
                    3. Theorem: the equality properties of §1.7, with the two short derivations.
                </Line>
                <Line>
                    4. Theorem: System A and PA have the same theorems, with the sketch of §4 written out in full.
                </Line>
                <Line>
                    5. Theorem: every theorem of System A translates into a theorem of P. This needs the
                    definability of + and · in P, which should be cited or shown.
                </Line>
                <Line>
                    6. Theorem: the proof relation of any system with admissible rules is recursive, so Gödel's
                    two properties hold.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What must be made exact</Heading>
            <Paragraph>
                <List />
                <Line>
                    "Finite figure with metavariables" needs a precise form. The cleanest is to define a rule as a
                    primitive recursive relation on codes of identifications and to present each rule by its
                    figure.
                </Line>
                <Line>
                    Substitution and "substitutable" need their standard definitions, and the tautology test needs
                    its definition of truth assignment.
                </Line>
                <Line>
                    The numbers for =, + and · must be fixed.
                </Line>
                <Line>
                    Proof by Contradiction is derivable from Conditional Proof and Consequence. Say so, and say
                    the named proof forms are kept because the families are the point.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What a referee will raise, and should be answered in the text</Heading>
            <Paragraph>
                <List />
                <Line>
                    <Word><Emphasis />Induction as a rule is known.</Word> It is Gentzen's 1936 formulation. Cite
                    it. Note that the rule must carry open assumptions Γ: for full induction the rule and the
                    schema coincide, though in fragments of arithmetic they are known to differ (Parsons).
                </Line>
                <Line>
                    <Word><Emphasis />PA is not finitely axiomatizable</Word> (Ryll-Nardzewski 1952). This is the
                    reason a finite presentation must put induction among the rules. Cite it as motivation.
                </Line>
                <Line>
                    <Word><Emphasis />Adding a recursive rule gives a recursively enumerable theory, and by
                    Craig's theorem every such theory has a recursive first-order axiomatization.</Word> So what
                    System L adds is not a larger class of theorem sets. It is a finite presentation. The paper
                    should say this plainly before a referee does.
                </Line>
                <Line>
                    <Word><Emphasis />Gödel's theorems apply to every consistent extension of System A by
                    admissible rules,</Word> including the extension by Proof by Symmetry. The paper should say
                    how its reading treats the undecidable sentence of that extended system.
                </Line>
                <Line>
                    <Word><Emphasis />Soundness is an assumption along with consistency, if finite proof is the
                    identification of truth.</Word> It is not argued, inside the system or beside it.
                    Admissibility asks only what is formal: finite and decidable.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Sources and conventions</Heading>
            <Paragraph>
                <List />
                <Line>
                    For Gödel 1931, cite the <Word><Emphasis />Collected Works</Word>, volume I (1986), or van
                    Heijenoort's translation in <Word><Emphasis />From Frege to Gödel</Word> (1967), which Gödel
                    approved. Meltzer's translation is convenient but is not the scholarly standard. Check §3
                    against it, in particular the printed form of axiom IV.
                </Line>
                <Line>
                    Give a short table mapping our names to the standard ones: identification = sequent; Conditional
                    Proof = implication introduction; Generalization = universal introduction; Instantiation =
                    universal elimination; Consequence = tautological consequence; Proof by Equality =
                    substitution of equals (Leibniz's law).
                </Line>
                <Line>
                    Typeset rules as inference figures (premises over a line, conclusion under), not as table
                    rows.
                </Line>
                <Line>
                    The Hilbert ω-rule (from φ(0), φ(S0), … infer ∀x φ(x)) is the natural contrast: a Universal
                    Inference that is not finite and not decidable. Place Proof by Symmetry against it.
                </Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>A possible order of sections</Heading>
            <Paragraph>
                <Line>1. Introduction: a formal logic in which rules of generalization can be added.</Line>
                <Line>2. System L.</Line>
                <Line>3. Extension and admissibility.</Line>
                <Line>4. System A, and its equivalence with PA.</Line>
                <Line>5. Relation to Gödel's System P.</Line>
                <Line>6. Arithmetization and the applicability of Gödel's theorems.</Line>
                <Line>7. The place left for a further Universal Inference.</Line>
            </Paragraph>
        </Section>
    </Chapter>
);
