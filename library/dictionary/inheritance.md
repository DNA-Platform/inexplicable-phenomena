# Header
- title: [Inheritance](inheritance.md)
- book: [Dictionary](.dictionary.md)
- previous: [Identity](identity.md)
- next: [Literature](literature.md)

## Definition

1. [Linguistic]: **Inheritance** is the practice of passing on property, titles, debts, rights, and obligations upon the death of an individual.

2. [Semantic]: In SRT, **inheritance** represents transitive relationships between [referents](referent.md), establishing ancestry-like connections through chains of [direct relationships](direct-relationship.md).

3. [Formal]: `x -> y := x == y || x => y || E[z]: x -> z & z -> y`

## Explanation

In Semantic Reference Theory, inheritance represents transitive relationships between referents. Unlike direct relationships (R(x,y,t)), inheritance allows for connections through intermediate referents. 

This concept establishes ancestry-like connections through chains of direct relationships. In a proof, `x -> y` is replaced with the expanded form `x => ... => y` showing all intermediate connections.

Inheritance is crucial for understanding how [properties](property.md) and relationship types connect and extend within a [catalogue](catalogue.md). It enables the construction of semantic hierarchies and classification systems within the theory.

## Examples

Inheritance notation:
```
x -> y   # x inherits from or is connected to y via a chain of relationships
x <- y   # y inherits from or is connected to x via a chain of relationships
x-y      # x and y are connected through inheritance in either direction or through a common ancestor
```

Expanded inheritance chain:
```
a -> d   # can be expanded to show all intermediate connections
a => b => c => d
```

## Footer
- related:
  - [Relationship](relationship.md)
  - [Transitivity](transitivity.md)
  - [Direct Relationship](direct-relationship.md)
  - [Ancestry](ancestry.md)
  - [Semantic Hierarchies](semantic-hierarchies.md)
- thoughts:
  - How does inheritance in SRT relate to inheritance in object-oriented programming?
  - What are the limitations of transitive relationships in semantic modeling?
  - How might inheritance hierarchies be visualized in complex knowledge structures?
- external:
  - [Inheritance (object-oriented programming)](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)) on Wikipedia
  - [Transitive relation](https://en.wikipedia.org/wiki/Transitive_relation) on Wikipedia