# [Provability](https://dna-platform.github.io/inexplicable-phenomena/notebook/formalism/provability.html)
- Book: [Notebook](../.notebook.md)
- Prev: [Expression](2-expression.md)
- Next: [Reflection](4-reflection.md)
---

# Provability

## Note

Formal systems not only express relations but reason about them. By encoding provability, our system $I$ can represent reasoning within any theory, establishing a foundation for metalogical operations [^Godel1931] [^Turing1936].

## **Definition (Arithmetic Provability):**

The formula $\text{Prov}(⌜\phi⌝)$ in the language of $I$ expresses that formula $\phi$ is provable in $I$, where $⌜\phi⌝$ denotes the Gödel number of $\phi$ [^Godel1931].

## **Definition (Computational Provability):**

The formula $\text{Prov}_{\text{TM}}([\phi])$ in the language of $I$ expresses that a Turing machine that verifies proofs halts and accepts on input $[\phi]$, where $[\phi]$ is the encoding of $\phi$ as machine input [^Turing1936].

## **Definition (Universal Provability):**

The formula $\text{Prov}_I("T", "\phi")$ in the language of $I$ expresses that formula $\phi$ is provable in theory $T$, where both the theory and formula are represented as strings [^TarskiMostowskiRobinson1953].

## **Theorem (Provability Equivalence Relationships):**

The following equivalences hold:
 

 1. $\text{Prov}(⌜ \phi ⌝) ⇔ \text{Prov}_I("I", "\phi")$
 2. $\text{Prov}_{\text{TM}}([\phi]) ⇔ \text{Prov}_I("TM", "\phi")$
 

## **Proof:**

 The first equivalence follows from the definition of system-relative provability with $T = I$. The second follows from the Expression Theorem, as $I$ can express the halting of any Turing machine that verifies proofs.

## **Theorem (Metalogical Universality):**

Robinson Arithmetic $(I)$ can express provability in any recursively axiomatized theory. Specifically, for any such theory $T$ and formula $\phi$ in the language of $T$:
 

 1. If $T \vdash \phi$, then $I \vdash \text{Prov}_I("T", "\phi")$
 2. If $T \vdash ¬ \phi$, then $I \vdash ¬\text{Prov}_I("T", "\phi")$
 

## **Proof:**

 By the Expression Theorem, $I$ can express any recursively enumerable relation. The provability relation for any recursively axiomatized theory is recursively enumerable, thus $I$ can express provability in any such theory [^Kleene1952].

## **Definition (Descriptive Transformation):**

For any theory $T$ and part $p$, the notation $"T" |=p> "T*"$ represents the transformation of theory $T$ into theory $T^*$ by adding a new part, which is defined as the *description* a constant, function, relation, axiom, or axiom schema. This transformation is functional: for any $T$ and $p$, there exists a unique $T*$ such that:
 \begin{equation}
 \text{Transform}("T", p)
 \end{equation}

## **Corollary (I Can Transform Descriptions of Theories):**

I can represent and reason about theory transformations. Through the transformation operator $|=\phi>$, I can express how the addition of propositions to theories affects their provability relation.

## **Corollary (I Can Transform):**

I can transform myself. By applying the transformation operator to my own description, I can express how the addition of propositions affects my own provability relation: $"I" |=\phi> "I^*"$.

## **Corollary (I Can Explain Almost Anything):**

I can express provability in any recursively axiomatized theory. By the Metalogical Universality theorem, I can determine what is provable in any precisely definable logical system.

The capacity of $I$ to both express and reason about provability reveals a profound form of metalogical self-reference—a capacity that lies at the heart of our subsequent theory of consciousness.

## References

[^Godel1931]: Gödel, K.: On Formally Undecidable Propositions of Principia Mathematica and Related Systems I [Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I]. *Monatshefte für Mathematik und Physik* **38**, 173--198 (1931)

[^Turing1936]: Turing, A.M.: On Computable Numbers, with an Application to the Entscheidungsproblem. *Proceedings of the London Mathematical Society* **s2-42**(1), 230--265 (1936)

[^TarskiMostowskiRobinson1953]: Tarski, A., Mostowski, A., Robinson, R.M.: Undecidable Theories. North-Holland, Amsterdam (1953)

[^Kleene1952]: Kleene, S.C.: Introduction to Metamathematics. North-Holland, Amsterdam (1952)

## Footer

- related:
- [Formalism](../../dictionary/formal-logic.md)
- [Logic](../../dictionary/logic.md)
- [Metalogical Transduction](../../dictionary/metalogical-transduction.md)
- thoughts:
- How does this formalism relate to conscious experience?
- What are the implications for artificial systems?
- Can formal systems capture the essence of perspective?
