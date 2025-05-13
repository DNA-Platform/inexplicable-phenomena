# Header

- title: [Description](description.md)
- book: [Notes](../.notes.md)
- subsection: [1-description](../formalism/1-description.md)
- previous: [TBD]
- next: [TBD]
---

# Description

## Note

Formal languages can encode any structured information. This foundational insight connects mathematics and empirical science. By using Gödel numbering to encode grammars, we show that our formal system $I$ can describe any sentence, and by extension, $I$ can describe anything [^Godel1931].

## **Definition (Gödel Numbering):**

Let $\mathcal{L}$ be a formal language with alphabet $\Sigma$. A **Gödel numbering** assigns to each expression $\phi$ of $\mathcal{L}$ a unique natural number $⌜\phi⌝$, defined recursively as follows [^Enderton2001]:

1. Each symbol $s ∈ \Sigma$ is assigned a unique number $c(s) ∈ N^+$
2. For any string $s_1 s_2 ... s_n$, its Gödel number is:
$⌜ s_1 s_2 ... s_n ⌝ = 2^{c(s_1)} · 3^{c(s_2)} · ... · p_n^{c(s_n)}$
where $p_i$ is the $i$-th prime number
3. For structured expressions, the encoding extends hierarchically:
$⌜ (\alpha_1, \alpha_2, ..., \alpha_n) ⌝ = 2^{⌜ \alpha_1 ⌝} · 3^{⌜ \alpha_2 ⌝} · ... · p_n^{⌜ \alpha_n ⌝}$

## **Definition (Formal Grammar):**

A **formal grammar** is a 4-tuple $G = (V, \Sigma, P, S)$ where [^Enderton2001]:

1. $V$ is a finite set of non-terminal symbols
2. $\Sigma$ is a finite set of terminal symbols such that $V \cap \Sigma = \emptyset$
3. $P \subset ((V \cup \Sigma)^* · V · (V \cup \Sigma)^*) \times (V \cup \Sigma)^*$ is a finite set of production rules, written as $\alpha \rightarrow \beta$
4. $S ∈ V$ is the start symbol

## **Definition (Universal Descriptor):**

A formal theory $T$ is a **Universal Descriptor** if and only if for any formal grammar $G = (V, \Sigma, P, S)$, there exist formulas $\Phi_G(x)$ and $\text{String}_G(y)$ in the language of $T$ such that:

1. $T \vdash \Phi_G(⌜ G ⌝)$ where $⌜ G ⌝$ denotes the Gödel number of $G$
2. For all $n ∈ N$, if $n \neq ⌜ G ⌝$, then $T \vdash ¬\Phi_G(n)$
3. For any $w ∈ (V \cup \Sigma)^*$, $w$ is derivable from $G$ if and only if $T \vdash \text{String}_G(⌜ w ⌝)$

## **Theorem (Universal Description Theorem):**

Robinson Arithmetic $(I)$ is a Universal Descriptor [^Godel1931][^Enderton2001]. Specifically:

1. For any formal grammar $G$, there exists a formula $\Phi_G(x)$ in the language of $I$ such that:
$I \vdash \Phi_G(⌜ G ⌝)$ and for all $n \neq ⌜ G ⌝$, $I \vdash ¬\Phi_G(n)$
2. For any string $w$ derivable from grammar $G$, there exists a formula $\text{String}_G(y)$ in $I$ such that:
$I \vdash \text{String}_G(⌜ w ⌝)$

## **Corollary (I Can Describe Language):**

The formal specification of grammars constitutes itself a grammar $G_{\text{spec}}$. As a Universal Descriptor, $I$ can describe $G_{\text{spec}}$.

 

 While language was used as a proxy for description, a description of all grammars suggests that I can describe language too

## References

[^Godel1931]: Gödel, K.: On Formally Undecidable Propositions of Principia Mathematica and Related Systems I [Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I]. *Monatshefte für Mathematik und Physik* **38**, 173--198 (1931)

[^Enderton2001]: Enderton, H.B.: A Mathematical Introduction to Logic. 2nd edn. Academic Press, San Diego (2001)

## Footer

- related:
- [Formalism](../../dictionary/formal-logic.md)
- [Logic](../../dictionary/logic.md)
- [Metalogical Transduction](../../dictionary/metalogical-transduction.md)
- thoughts:
- How does this formalism relate to conscious experience?
- What are the implications for artificial systems?
- Can formal systems capture the essence of perspective?
