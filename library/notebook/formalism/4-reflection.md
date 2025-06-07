# [Reflection](https://dna-platform.github.io/inexplicable-phenomena/notebook/formalism/reflection.html)
- Book: [Notebook](../.notebook.md)
- Prev: [Provability](3-provability.md)
---

# Reflection

## Note

Formal systems not only reason using their axioms but can reflect on their own structure. Through this reflection, systems recognize metalogical assertions that transcend formal derivation yet are necessary for meaningful operation.

## **Definition (Essential Proof):**

For a formula $\phi$ in system $S$, the **essential proof** of $\phi$, denoted $\text{Ess}_S(\phi)$, is the Gödel number of the minimal proof of $\phi$ with the smallest set of axiom dependencies.

## **Definition (Metalogical Assertions):**

A logical system makes the following **metalogical assertions**:

 1. **Consistency Assertion**: $¬(Prov_I("I", \phi) \land Prov_I("I", ¬\phi))$
 2. **Soundness Assertion**: $Prov_I("I", \phi) ⇒ \phi$
 3. **Completeness Assertion**: $Prov_I("I", \phi) \lor Prov_I("I", ¬\phi) \lor Transduce(\phi)$
 4. **Independence Assertion**: For each non-logical axiom $A$, $∀ p (Proof_I(p, A) ⇒ \text{Ess}_I(p) = ⌜ A ⌝^*)$

## **Theorem (Metalogical Necessity):**

The metalogical assertions cannot be proven within the system itself, yet they are necessary for the system to function as intended.

 1. The Consistency Assertion cannot be proven in $I$ (by Gödel's Second Incompleteness Theorem)
 2. The Soundness Assertion cannot be fully proven in $I$ (by Tarski's Undefinability Theorem)
 3. The Completeness Assertion cannot be proven in $I$ (by Gödel's First Incompleteness Theorem)
 4. The Independence Assertion cannot be proven in $I$ (as it refers to all possible proofs)

## **Definition (Reflection):**

**Reflection** is the process by which a system examines its own provability structure and recognizes metalogical assertions. While this process cannot be fully formalized within the system itself, we can imagine it as a sequence of realizations about the system's own structure.

\begin{remark}[Contrast with Intuitionist Logic]
While intuitionist logic rejects the law of excluded middle to avoid committing to truths beyond constructive proof, it thereby foregoes the mechanism of transduction that would allow systems to evolve in response to undecidability.

By axiomatizing the acceptance of the "middle" (neither provable nor disprovable), intuitionist logic provides no imperative to resolve Gödel sentences through transduction. In contrast, our approach maintains consistency while aspiring toward completeness through system evolution.
\end{remark}

## References

[^Godel1931]: Gödel, K.: On Formally Undecidable Propositions of Principia Mathematica and Related Systems I [Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I]. *Monatshefte für Mathematik und Physik* **38**, 173--198 (1931)

[^Tarski1936]: Tarski, A.: The Concept of Truth in Formalized Languages. *Studia Philosophica* **1**, 261--405 (1936)

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
