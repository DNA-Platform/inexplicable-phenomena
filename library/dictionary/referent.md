# [Referent](https://dna-platform.github.io/inexplicable-phenomena/dictionary/referent.html)
- Book: [Dictionary](./.dictionary.md)
- Prev: [Object](./object.md)
- Next: [Catalogue](./catalogue.md)
---

## Definition

1. [SRT]: A **referent** is an entity that can participate in the [ternary relation](ternary.md) R(x,y,t) as a subject, object, or relationship type. In the context of [Semantic Reference Theory](semantic-reference-theory.md), a referent is defined as an object which could be assigned to a constant.

2. [Formal]: A **referent** is defined as `Referent(x) := "x can be substituted for a variable in SRT"`.

3. [Philosophical]: A **referent** is the target of reference, the object to which a name, sign, or description refers.

4. [Ontological]: A **referent** is a basic entity in a catalogue that maintains its identity through the relationships it participates in.

## Explanation

Referents form the basic elements of a [catalogue](catalogue.md) and represent the entities that can enter into relationships with each other. In formal terms, referents are the values that variables can take within SRT.

A referent can play different roles depending on its position in the ternary relation:
- As x in R(x,y,t): It serves as a [subject](subject.md) (when x ≠ y)
- As y in R(x,y,t): It serves as an [object](object.md)
- As t in R(x,y,t): It serves as a relationship type

This flexibility allows the same referent to participate in multiple relationships in different roles, creating a rich network of interconnections within a catalogue.

### Referents and Constants

In the formalism of SRT, referents correspond to what would be constants in first-order logic. However, SRT initially has no constants - they are introduced through the process of [transduction](transduction.md) when existential statements require specific referents to satisfy them.

This connection between epistemology (the logical structure of SRT) and ontology (the specific referents in a catalogue) is a key feature that allows SRT to bridge these traditionally separate domains.

### Referents and Identity

A referent maintains its identity through the relationships it participates in. These relationships define what the referent is within the semantic system. Unlike traditional ontologies that define objects through their inherent properties, SRT defines referents through their relationships with other referents.

## Examples

Simple referents in a catalogue:
```
Doug, book, owns
```
These can form a relationship:
```
Doug =owns> book
```

A referent serving in multiple roles:
```
tree =grows> fruit
fruit =comes_from> tree
```
Here, "tree" and "fruit" are referents that serve as both subjects and objects in different relationships.

A referent as a relationship type:
```
x =t> y
```
Here, "t" is itself a referent that specifies the type of relationship between x and y.

## Footer
- related: 
  - [Catalogue](catalogue.md)
  - [Relationship](relationship.md)
  - [Subject](subject.md)
  - [Object](object.md)
  - [Constant](constant.md)
  - [Ternary](ternary.md)
  - [Transduction](transduction.md)
- thoughts
  - What is the ontological status of referents in SRT?
  - Can relationship types themselves be referents?
  - How are referents identified and distinguished from one another?
  - How does the concept of a referent in SRT relate to philosophical traditions regarding reference?
  - What is the relationship between referents and constants in the formal system?
  - Does a referent have an intrinsic nature beyond its relationships?