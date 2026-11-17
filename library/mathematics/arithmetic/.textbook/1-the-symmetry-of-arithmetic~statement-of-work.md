# The Symmetry of Arithmetic: Statement of Work

Nov 15, 2026 · @Doug

## Purpose

This document specifies an addition to the formalism of first-order Peano arithmetic. The addition is a single object X, which expresses that arithmetic has a symmetry the formalism does not at present state. A rule of inference seems fitting. Like induction, which can be expressed finitely as a rule of inference, it operates on formulas and corresponds to a new form of proof. It is a new way to make universal conclusions.

**Why X is specified before it is stated.** X is not derivable from existing mathematics. If it were, the three conjectures, whose arguments are elementary, would already be proven. So X can be identified only by what it must satisfy. The specification fixes the definitions X is stated in, the results it must agree with, the requirements on it and their motivation, the tests a candidate must pass, and the form it should take, so that candidates can be judged against them and the most natural form recognized when it is found.

**What X does.** With X adjoined, Goldbach, twin primes and the arithmetic form of the Riemann hypothesis are immediate. Each is a theorem already proven on the circles of factorial size, with the definitions from the bottom and from the top kept distinct, followed by one use of X. They are the foundational examples of three types of theorem: pairing, recurrence and balance.

**What is to be identified.** A mathematical object X that modifies a formalism, first-order Peano arithmetic, by adding a new way of identifying truths. X is not yet known. This document gives a search what it needs to identify X uniquely: the definitions, the record of known results, the three types, the deliverable's kind and form, the requirements and what motivates each, and the acceptance.

**Where the meaning stands.** The meaning that motivates X — what the subject commits to about zero, the totality, the two readings, the circle and the other reading — is identified in The Symmetry of Arithmetic: Identification, entries I1 to I20. The requirements cite those entries by label, and the labels O1 to O11 refer to the open determinations recorded in The Symmetry of Arithmetic: Progress.

The specification is the anchor for the work. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing. Section 7 states where it ends.

## 1. The definitions

### 1.1 The base

PA here means: classical first-order logic with identity; the signature {0, S, +, ·}; the Peano axioms in the form below [1]; and induction as a rule of inference, not as an axiom schema. It has exactly the theorems of first-order Peano arithmetic.

| Name | Axiom or rule |
| --- | --- |
| S1 | ∀x ¬(Sx = 0) |
| S2 | ∀x ∀y (Sx = Sy → x = y) |
| A1 | ∀x (x + 0 = x) |
| A2 | ∀x ∀y (x + Sy = S(x + y)) |
| M1 | ∀x (x · 0 = 0) |
| M2 | ∀x ∀y (x · Sy = x · y + x) |
| Induction | From φ(0) and φ(x) → φ(Sx), with x not free in any open assumption, infer ∀x φ(x) |

Defined in the usual way: x ≤ y, x divides y, x is prime.

### 1.2 The defined signs A and M

Two one-place signs, each defined by succession of the previous value, in the form of the axioms for + and ·.

| Sign | Meaning | At zero | At a successor |
| --- | --- | --- | --- |
| A | 0 + … + n | A(0) = 0 | A(Sx) = A(x) + Sx |
| M | 1 · … · n | M(0) = S0 | M(Sx) = M(x) · Sx |

This is an extension by definition. PA proves that each function exists and is unique, so no new theorem appears in the original signature. Induction ranges over formulas that use the new signs.

### 1.3 The dual signature

{∞, P, ⊕, ⊗, ≫}. σ is the renaming 0 ↦ ∞, S ↦ P, + ↦ ⊕, · ↦ ⊗, ≤ ↦ ≫. σ(PA) is PA written in the dual signature.

### 1.4 The circles

For N ≥ 1, C_N is ℤ/Nℤ with 0, x ↦ x + 1, + and ·, read as a structure for the signature of PA. The mirror is μ_N(a) := N − a, which is −a in C_N. It satisfies μ_N(Sa) = P μ_N(a), with P the inverse of S, and μ_N(a + b) = μ_N(a) + μ_N(b). The circles of factorial size are the C_N with N = M(n).

### 1.5 Limit objects

Candidates for "the limit of the circles of factorial size":

- The profinite integers, the inverse limit of the circles of factorial size.
- An ultraproduct of the circles of factorial size.
- The Steinitz (supernatural) number Ω = ∏ p^∞ over all primes p, the greatest element of Steinitz's lattice [8, 9].
- The intersection of the modular arithmetics over a three-valued base, RMω in [3].

### 1.6 Definitions from the bottom and from the top

For a set D of numbers below N defined by a formula, D is its definition from the bottom and μ_N[D] its definition from the top. In particular U_N := {a ∈ C_N : gcd(a, N) = 1}, P_N := {p : p prime, p < N}, and P′_N := μ_N[P_N].

### 1.7 The canonical sentences

All are expected to be true. The forms below are canonical, and the shorter customary forms are their corollaries.

| Name | Canonical sentence | Corollary |
| --- | --- | --- |
| GC | ∀n ≥ 2 ∃k < n (n − k and n + k are prime) | Every even number from 4 up is a sum of two primes |
| TP | ∀n ≥ 3 ∃m (n < m < M(n) and m − 1 and m + 1 are prime) | ∀N ∃n > N (n − 1 and n + 1 are prime) |
| RH | For every ε > 0 there is C such that U(x) − L(x) is at most C · x^(1/2+ε) in absolute value for all x ≥ 1, with U and L as in K8 | The Riemann hypothesis; equivalent to a Π1 sentence [6, 7] |
| Euclid | ∀n ∃p (n < p ≤ S(M(n)) and p is prime) | There are infinitely many primes. PA proves this one |

G and Con denote the Gödel sentence and the consistency statement of PA [2]. Σ1, Π1, Π2 are the classes of the arithmetical hierarchy [17].

## 2. The record

Each is a theorem of PA or of ordinary mathematics. The requirements refer to them by label.

### 2.1 Renaming and the circles

| Label | Statement | Status |
| --- | --- | --- |
| K1 Renaming | PA ⊢ φ iff σ(PA) ⊢ σφ | σ is a bijective renaming |
| K2 Zero of the sieve | Every d with 1 ≤ d ≤ n divides M(n) | Provable in PA, by induction |
| K3 Fold | 2 · A(n) = n · Sn. So 2 · A(M(n)) = M(n) · S(M(n)), and in C_N with N = M(n), n ≥ 2: 2 · A(N) is N and A(N) is N/2, the fixed point of the mirror | Provable in PA, by induction |
| K4 Mirror | If p divides N then, for every a, p divides a iff p divides N − a. Hence U_N = μ_N[U_N] | Provable in PA |
| K5 Circle | C_N satisfies S2, A1, A2, M1, M2 and every instance of induction. C_N does not satisfy S1 | Direct check; noted in [3] |

### 2.2 The counting theorems

| Label | Statement | Status |
| --- | --- | --- |
| K6 Pairing on circles | N even. For every even c there are a, b ∈ U_N with a + b ≡ c (mod N). The number of such a is (N / rad N) · ∏ (p − 2) over odd p dividing N and not c, times ∏ (p − 1) over odd p dividing both | Chinese remainder theorem |
| K7 Recurrence on circles | N even. The number of k ∈ C_N with k − 1 and k + 1 in U_N is (N / rad N) · ∏ (p − 2) over odd p dividing N. It grows without bound as primes are added | Chinese remainder theorem |
| K8 Balance identity | For x ≥ 1, ⌊√x⌋ = x · ℓ(x) + U(x) − L(x), where ℓ(x) = Σ λ(d)/d over d ≤ x, U(x) = Σ (x mod d)/d over d ≤ x with Ω(d) odd, L(x) the same with Ω(d) even. RH holds iff ℓ(x) = O(x^(−1/2+ε)) for every ε > 0 | Identity: Σ λ(d) over the divisors d of n is 1 on squares and 0 otherwise. Equivalence: standard, reference to be located |

### 2.3 The primes and the top

| Label | Statement | Status |
| --- | --- | --- |
| K9 Distinctness | P_N ≠ P′_N on circles of named size. For N = 210: 23 ∈ P_N and μ(23) = 187 = 11 · 17 | Direct check |
| K10 Division order | The numbers ordered by divisibility form a lattice with least element 1 and greatest element 0. The least common multiple of all M(n) is 0. The embedding into Steinitz's lattice sends 0 to Ω | [8, 9] |
| K11 Uniqueness of zero | PA proves: if every y divides x, then x = 0. PA proves: there are infinitely many primes iff 0 is the only number every prime divides | Provable in PA |
| K12 Euclid | PA proves the canonical sentence Euclid of 1.7. The bound S(M(n)) is one step past a number that every prime up to n divides (K2) | Provable in PA |
| K13 The exception at the top | If p divides N and N − p > p, then N − p is a proper multiple of p and is not prime. So a thing every prime divides, other than 0, is not a sum of two primes | Provable in PA. By K11 there is no such number |

### 2.4 Independence and Gödel

| Label | Statement | Status |
| --- | --- | --- |
| K14 Π1 soundness | If T extends PA and is consistent, every Π1 theorem of T holds of every numeral | Since PA proves every true Σ1 sentence |
| K15 Classes | GC is Π1. RH is equivalent to a Π1 sentence. TP in canonical form is Π1; its corollary is Π2 | [6, 7] |
| K16 Independent Π1 sentences | Let φ be ∀c θ(c) with θ decidable. If PA proves neither φ nor ¬φ, then φ holds of every numeral, PA + ¬φ is consistent, and PA + ¬φ is ω-inconsistent: it proves ∃c ¬θ(c) and proves θ(n) for each numeral n. The exception it asserts is no numeral. This is the situation of ¬G in [2] | A false φ has a numeral exception, which PA verifies |
| K17 Gödel | PA ⊢ G ↔ Con | [2]; formalized second theorem |

### 2.5 The adjacent arithmetics

| Label | Statement | Status |
| --- | --- | --- |
| K18 Local-global failure | (x² − 2)(x² − 17)(x² − 34) = 0 has a solution in every C_N and none among the numbers | Standard, reference to be located |
| K19 Modular arithmetic over a three-valued base | With base RM3, arithmetic modulo i is negation-inconsistent, absolutely consistent, and contains the theorems of PA | [3] |
| K20 Collapse | In LP, identifying elements of a model by a congruence preserves every truth. The collapsed models of the numbers are a tail followed by a cycle | [4, 5, 12] |

## 3. The three types of theorem

GC, TP and RH are the foundational examples of three types of theorem about a property φ of numbers. Each type has a general form, a basic case that PA proves, a theorem on the circles with the definitions from the bottom and from the top kept distinct, and its foundational example.

|  | Type I: pairing | Type II: recurrence | Type III: balance |
| --- | --- | --- | --- |
| What it says | Every number has two φ-numbers at equal distance on either side | Above every number, and below a bound the top supplies, there is a φ-pair | The count of φ-numbers up to x stays near its estimate |
| General form | ∀n ≥ 2 ∃k < n (φ(n − k) and φ(n + k)) | ∀n ≥ 3 ∃m (n < m < M(n) and φ(m − 1) and φ(m + 1)) | The count from the bottom and the count from the top differ by no more than a stated bound |
| Basic case, provable in PA | φ is "coprime to n": n − k is coprime to n iff n + k is (K4) | Euclid (K12): the same form with one φ-number in place of a pair | φ is "multiple of 5": the count up to x is within 1 of x/5 |
| Theorem on the circles | K6 | K7 | K8 |
| Foundational example | GC | TP | RH |

The requirement on X is that each foundational example is immediate in T: it is its circle theorem followed by one use of X (C6). This is the sense in which X makes them trivial. A proof of this kind is the type of proof X adds.

## 4. The deliverable

X is one finitely stated object that modifies the formalism of 1.1 by adding a new way of identifying truths. T denotes PA with X adjoined. The kind of X is not fixed, and its form is guided.

### 4.1 The kind

| Kind | What X would be | What must then be supplied |
| --- | --- | --- |
| (a) Axiom or schema | A single sentence in the signature of PA. Not an axiom for each conjecture, and not an infinite schema (4.2) | The sentence |
| (b) Rule of inference | A figure with finitely many premises, one conclusion, a free formula, and a side condition decidable on the written proof, as induction is in 1.1. It gives a type of proof | The figure, and a proof that it is not derivable in PA |
| (c) Duality | A transfer between PA and σ(PA): a rule taking a theorem φ of a stated class to σφ read in the signature of PA, or a theory in both signatures with bridge axioms | The class of φ, or the bridge axioms. The interpretation of ∞, P, ⊕, ⊗, ≫ in the signature of PA, or the reason none is needed |
| (d) Something else as fundamental | An addition to the formalism of a kind not listed | What kind of thing it is, and how proofs use it |

A solution states which kind it is and discharges the third column.

### 4.2 The form

Guidance on its best form.

**4.2.1 Singular.** X is one thing. It is not a set of axioms for the conjectures.

**4.2.2 Finite.** Not an infinite schema.

**4.2.3 A rule of inference seems fitting.** Like induction, which can be expressed finitely as a rule of inference, it is able to operate on formulas and corresponds to a new form of proof. It is a new way to make universal conclusions, and it is to operate across formulas too. It may be trans-semantic: two identical formalisms, united by not being able to refer to the objects of the other except by equivalence under isomorphism. Perhaps. The shape of this formalism is complex to specify, and the specification leaves it open (O6).

**4.2.4 Agnostic to interpretation.** It is the most elegant way to express the existence of a symmetry while providing absolutely no way to resolve which one.

**4.2.5 The reason it can be so.** Arithmetic is structured as a from-the-bottom way of reasoning about a form of transcendence. That transcendence means there is a view from the top that is literally the same formalism, isomorphically, with shared ways of expressing the same set of numbers (I1).

**4.2.6 A natural modification of universal inference.** It should look like a natural modification of universal inference.

**4.2.7 Precedent.** Someone introduced quantification. Someone introduced universal generalization, proof by contradiction, induction. Adding a thought here is of that kind (I20).

**4.2.8 The fit.** It has to fit in extraordinarily well, wearing the same clothing as the other parts of the formalism, so that it can be seen as self-evident and fundamental.

## 5. The requirements

Each is followed by what motivates it. They fall in three groups.

### 5.1 What X is

**C1 Finite and checkable.** X is stated finitely. If X is a rule, its side condition is decidable on the written proof. *Motivation:* X is used as induction is used, by a reader who can check each step.

**C2 Internal and general.** X is integrated in the formalism of PA. It does not mention primes, sieves or a modulus, and is not stated through limits of other formalisms. *Motivation:* otherwise C5 is met by adjoining GC, TP and RH themselves, and nothing has been identified.

**C3 From meaning.** Each clause of X traces to an entry of the identification, I1 to I20. *Motivation:* X represents what the subject commits to about the meaning of arithmetic (I1). It is not a fact added from outside.

**C4 Unique.** Any two objects meeting C1 to C14 give theories with the same theorems. This is the sense in which the specification identifies one object. It is a claim to be proven of a solution.

### 5.2 What X does

**C5 Strength.** T proves the canonical GC, TP and RH of 1.7. *Consequence:* all three are Π1 or equivalent to Π1 (K15), so by K14, if T is consistent, each holds of every numeral. *Motivation:* what is added justifies statements a computer could refute.

**C6 Immediacy.** For each type of section 3, the derivation of its foundational example in T is its circle theorem (K6, K7, K8), which PA proves with the definitions from the bottom and from the top kept distinct, followed by one use of X. No analysis is used. *Motivation:* the three arguments lack one and the same step, and X is that step.

**C7 The circle paradigm.** The theorems of T are exactly what can be proven in the paradigm of the circles of factorial size, generalizing over every pair of definitions, from the bottom and from the top, that can be made equal in the limit with the limiting factorial as the top. *Motivation:* the circle is the one-theory form of what the two readings say (I9). Stating that paradigm exactly is part of the task (O2, O3).

**C8 Gödel.** T relates G, Con and the empty derivation: what is unprovable in PA is what is proven by the derivation with zero steps. *Motivation:* K17, and I17. The exact statement is open (O5).

**C9 Calibration.** T proves every statement marked "required" in section 6 and none marked "excluded". The basic cases of section 3 come out as their ordinary proofs. *Motivation:* the basic cases are where X can be checked against ordinary proof.

### 5.3 How X stands to PA

**C10 Consistency.** T does not prove 0 = 1. It is to be shown relative to the consistency of PA, preferably by an interpretation in the circles or a limit object of 1.5. *Motivation:* the circle is consistent with PA.

**C11 PA has not decided.** PA proves neither X nor its opposite, and decides none of GC, TP and RH. *Motivation:* PA has not made a decision about symmetry. That the conjectures have stood unproved for so long is taken as expressing this.

**C12 Refutation and relevance.** If PA ⊢ ¬GC, then T is inconsistent, by C5, and the theory specified here is withdrawn. If PA ⊢ GC, then X is not needed for GC and the new machinery is irrelevant to it. The same holds for TP and for RH. *Motivation:* the commitment is stated so that it can fail.

**C13 Invariance under σ.** X is fixed by σ up to provable equivalence in T. No theorem of T distinguishes the two-reading presentation, PA with σ(PA), from the circle presentation. S1 is kept and is never false: zero has no predecessor in PA, and by σ the totality has no successor in σ(PA); these are one statement under σ. The circle presentation has to be consistent with every theorem of PA (O1). *Motivation:* no opinion about where the journey starts (I13).

**C14 Negatives (expected, not required).** Over the integers with 0, S, + and ·, the analogue of X is derivable or void, since a ↦ −a is a definable involution that preserves divisibility.

## 6. The acceptance

| Statement | Of the numbers | Of T |
| --- | --- | --- |
| For all n and k < n: n − k is coprime to n iff n + k is | True | Required. Type I basic case, as its ordinary proof |
| N has multiples of m at equal distance on both sides iff m divides N + N | True | Required |
| For every distance that is a multiple of 5 there are infinitely many N with multiples of 5 at that distance on both sides | True | Required |
| The count of multiples of 5 up to x is within 1 of x/5 | True | Required. Type III basic case |
| Euclid, in the canonical form of 1.7 | True | Required. Type II basic case. With the top taken as M(n), X gives Euclid's proof |
| Every N has two multiples of 5 at equal positive distance on both sides | False | Excluded |
| (x² − 2)(x² − 17)(x² − 34) = 0 has a solution | False | Excluded |
| P_N = P′_N for the numeral N = 210 | False | Excluded |
| For every N there is a larger even prime | False | Excluded |
| 0 = 1 | False | Excluded |
| GC, TP, RH in the canonical forms of 1.7 | Open | Required, each immediate (C6) |

Every excluded statement is refuted by PA, so C10 excludes it already. The excluded rows are checks to run on a candidate, not further demands.

## 7. The boundary

Sections 1 to 7 are the specification. Nothing outside them binds the work. The meaning that motivates X stands identified in The Symmetry of Arithmetic: Identification, cited by its labels I1 to I20; the open determinations stand in The Symmetry of Arithmetic: Progress, cited by the labels O1 to O11. What follows this section is the schedules — reference bearing on the work and binding none of it.

## Related work

What each bears on. Items marked † were located and checked against a bibliographic record or the paper's abstract for this document. The others are cited from recall and are to be verified.

Level of relevance. *Setting*, the formalism the specification is stated in: 1, 2, 16, 17. *Adjacent*, the same objects with a different claim, as identified in I19: 3, 4, 5, 8, 9, 10, 11, 12, 14, 15. *Background*, facts used by a requirement: 6, 7, 13. None of the adjacent items states or implies X.

1. H. B. Enderton, *A Mathematical Introduction to Logic*, 2nd ed., Academic Press, 2001. The axioms of 1.1 in this form.
2. K. Gödel, "Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I", *Monatshefte für Mathematik und Physik* 38 (1931), 173–198; tr. B. Meltzer, 1962. System P. K16, K17, I17.
3. † R. K. Meyer and C. Mortensen, "Inconsistent models for relevant arithmetics", *Journal of Symbolic Logic* 49 (1984), 917–929. Modular arithmetics over the base RM3 as inconsistent, absolutely consistent extensions of Peano arithmetic; notes that S1 fails in modular arithmetic; the intersection RMω. K5, K19, 1.5.
4. † G. Priest, "Inconsistent models of arithmetic, Part I: finite models", *Journal of Philosophical Logic* 26 (1997), 223–235. LP models containing all sentences of first-order arithmetic. K20.
5. † G. Priest, "Inconsistent models of arithmetic, Part II: the general case", *Journal of Symbolic Logic* 65 (2000), 1519–1529. General structure: linear and cyclical parts. K20.
6. † M. Davis, Yu. Matijasevič and J. Robinson, "Hilbert's tenth problem. Diophantine equations: positive aspects of a negative solution", in *Mathematical Developments Arising from Hilbert Problems*, AMS, 1976, 323–378. RH as a Π1 statement. K15.
7. † J. C. Lagarias, "An elementary problem equivalent to the Riemann hypothesis", arXiv:math/0008177; *American Mathematical Monthly* 109 (2002), 534–543, journal details from recall. K15.
8. † E. Steinitz, "Algebraische Theorie der Körper", *Journal für die reine und angewandte Mathematik* 137 (1910), 167–309. Supernatural numbers. K10.
9. † "Coset topologies on ℤ and arithmetic applications", arXiv:2202.13478, section 4. The embedding of the numbers into the supernatural numbers with 0 ↦ ∏ p^∞. K10.
10. † H. Friedman and R. K. Meyer, "Whither relevant arithmetic?", *Journal of Symbolic Logic* 57 (1992), 824–831. A limit on relevant Peano arithmetic.
11. † R. K. Meyer, "Relevant arithmetic", *Bulletin of the Section of Logic* 5 (1976), 133–137. Finite modular models used for a finitary consistency argument. C10.
12. † G. Priest, "Minimally inconsistent LP", *Studia Logica* 50 (1991), 321–331; and *In Contradiction*, 2nd ed., Oxford, 2006. The logic LP; where the collapsing lemma is stated is to be verified. K20.
13. R. Kaye, *Models of Peano Arithmetic*, Oxford, 1991. Nonstandard models. I19.
14. † A. Tedder, "Axioms for finite collapse models of arithmetic", *Review of Symbolic Logic* 8 (2015), 529–539. A three-valued base with a cyclic axiom.
15. † J. B. Paris and A. Sirokofskich, "On LP-models of arithmetic", *Journal of Symbolic Logic* 73 (2008), 212–226. K20.
16. Project document, "Goldbach Through Gödel: The Essential Argument". The circle theorems K6 and K7 and the statement of K9.
17. † S. C. Kleene, *Introduction to Metamathematics*, Van Nostrand, 1952. Formal number theory and the arithmetical hierarchy.
18. [Proof by Symmetry: Specification](https://claude.ai/artifact/U63dJtCBAa39DU3gXyqDf8). The earlier specification. It fixed the form of X as a rule of inference with a given figure. Candidate figures, ideas and earlier statements are kept there.
