# Header
- title: [Catalogue](catalogue)
- book: [Dictionary](.dictionary.md)
- previous: [Referent](referent.md)
- next: [Relationship](relationship.md)

## Definition

1. [SRT]: A **catalogue** is a collection of [referents](referent.md) that are related to each other through the [ternary relation](ternary.md). It forms the domain of a semantic theory.

2. [Set Theory]: A **catalogue** can be viewed as a connected graph where nodes are referents and edges are direct relationships between them.

3. [Ontological]: A **catalogue** represents a self-contained ontology where all elements have relationships to other elements, directly or indirectly.

4. [Formal]: A **catalogue** is defined by the axiom: `x => y =|> A[p,q]: p-q`, stating that if any direct relationship exists, then all referents must be connected.

## Explanation

The referents in a catalogue must all be connected through relationships. This is expressed by the axiom:

`x => y =|> A[p,q]: p-q`

This states that if any direct relationship exists in the catalogue, then all referents within it must be connected through some chain of relationships (directly or indirectly).

A catalogue may be empty (containing no referents). All axioms in SRT must be consistent with this possibility.

Catalogues grow through the process of [transduction](transduction.md), which transforms existential statements into concrete ones by adding constants to the theory.

If referents are not connected, they belong to separate catalogues representing independent ontologies. This is a fundamental constraint in SRT - disconnected referents cannot be expressed in the same semantic language.

The concept of catalogue is essential to understanding how SRT bridges epistemology and ontology. The catalogue provides the concrete instantiation (ontology) of the abstract rules (epistemology) defined by the theory.

## Examples

An empty catalogue:
```
(No referents)
```

A simple catalogue:
```
x =t> y
```

Disconnected referents (two catalogues):
```
a =t1> b
c =t2> d
(no relationship connecting a/b with c/d)
```

## Footer
- related: 
  - [Referent](referent.md)
  - [Relationship](relationship.md)
  - [Transduction](transduction.md)
  - [Ternary](ternary.md)
  - [Semantic Reference Frame](semantic-reference-frame.md)
- thoughts
  - How does a catalogue relate to a reference frame?
  - What determines the uniqueness of a catalogue?
  - Can a referent belong to multiple catalogues?
  - How does the transduction operator modify catalogues?
  - Is the connectedness requirement of catalogues analogous to the coherence requirement in certain epistemological theories?