# Header
- title: [Semantic Reference Frame](semantic-reference-frame.md)
- book: [Dictionary](.dictionary.md)
- previous: [Semantic Theory](semantic-theory.md)
- next: [Semantic Reference Theory](semantic-reference-theory.md)

## Definition

1. [Linguistic]: A **semantic reference frame** provides a context or framework within which meaning and reference can be interpreted, similar to how a coordinate system provides a frame for interpreting spatial locations.

2. [Semantic]: In SRT, a **semantic reference frame** is a partitioning of [referents](referent.md) according to a specific relationship type, creating one or more [catalogues](catalogue.md).

3. [Computational]: A **semantic reference frame** functions like a namespace in programming, providing a contained environment where relationships between entities can be interpreted according to specific rules and constraints.

## Explanation

A semantic reference frame is defined by:
- A relationship type t that serves as its base type
- Catalogues of referents connected through this relationship type
- Canonical referents that identify each catalogue

In a semantic reference frame for relationship type t, the relation x => y is interpreted as x =t> y. All other relationship types in the frame inherit from this base type through the [inheritance](inheritance.md) relation.

Semantic reference frames allow SRT to organize referents into coherent domains of reference, where relationships have specific meanings relevant to that domain. This enables the representation of different perspectives and systems of meaning within the same overall framework.

A [perspective](perspective.md) is a specific type of semantic reference frame that contains exactly one catalogue and includes operations for identification, qualification, and relation. Perspectives are particularly important in SRT as they represent the viewpoint from which relationships are established and interpreted.

## Examples

Reference frame defined by "color" relationship:
```
red =color> apple
blue =color> sky
green =color> leaf
```

Reference frame for spatial relationships:
```
book =on> table
chair =next_to> desk
ceiling =above> floor
```

A biological taxonomy reference frame:
```
mammal =subclass_of> animal
dog =subclass_of> mammal
cat =subclass_of> mammal
```

## Footer
- related: 
  - [Perspective](perspective.md)
  - [Catalogue](catalogue.md)
  - [Ternary](ternary.md)
  - [Inheritance](inheritance.md)
  - [Semantic Reference Theory](semantic-reference-theory.md)
- thoughts:
  - Can referents belong to multiple semantic reference frames?
  - How do semantic reference frames relate to namespaces in programming?
  - What constraints exist on valid semantic reference frames?
  - How do different semantic reference frames interact with each other?
  - Is a perspective fully defined by its qualifier, or are additional constraints needed?