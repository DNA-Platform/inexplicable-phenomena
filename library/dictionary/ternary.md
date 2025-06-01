# [Ternary Relation](https://dna-platform.github.io/inexplicable-phenomena/dictionary/ternary.html)
- Book: [Dictionary](./.dictionary.md)
- Prev: [Relationship](./relationship.md)
- Next: [Property](./property.md)
---

## Definition

1. [SRT Primitive]: The **ternary relation** is the fundamental primitive of [Semantic Reference Theory](semantic-reference-theory.md), expressed as R(x,y,t) or in the shorthand notation `x =t> y`. It represents that x is directly related to y through t.

2. [Formal Logic]: A **ternary relation** is a relation with three arguments, represented as R(x,y,t), where x, y, and t are all referents in a catalogue.

3. [Relational Theory]: The **ternary relation** in SRT differs from binary relations in traditional logic by incorporating the relationship type as a first-class element in the relation.

4. [Programmatic]: The **ternary relation** can be viewed as a directed, labeled graph edge where x is the source node, y is the target node, and t is the edge label.

## Explanation

In this relation:
- x is the [subject](subject.md) (when x ≠ y)
- y is the [object](object.md) (when x ≠ y)
- t is the relationship type

The ternary relation serves as the only primitive in SRT, from which all other concepts are derived. When x and y are the same (x == y), t represents a [property](property.md) rather than a relationship type.

Various syntactic forms exist to express different aspects of the relation:
- `x => y` := There exists some relationship between x and y
- `x =t> y` := x relates to y through t
- `x <t= y` := y relates to x through t
- `x <=t=> y` := x and y relate to each other through t
- `x.t` := x has property t (equivalent to x =t> x)

The ternary relation's fundamental role in SRT parallels the role of binary relations in set theory and first-order logic. However, by incorporating the relationship type as a first-class element, SRT provides a more expressive framework for representing semantic relationships.

What makes this relation particularly powerful is that all three components (x, y, and t) can themselves be referents in the catalogue, allowing for rich, self-referential structures.

## Examples

Direct relationship:
```
Doug =owns> book
```

Property (when subject equals object):
```
rose =red> rose
```
Which can be written as:
```
rose.red
```

Multiple relationships forming a semantic network:
```
Alice =knows> Bob
Bob =works_with> Charlie
relationship =connects> referents
```

Relationship describing itself:
```
R(x,y,t) =is_described_by> ternary_relation
```

## Footer
- related: 
  - [Relationship](relationship.md)
  - [Subject](subject.md)
  - [Object](object.md)
  - [Property](property.md)
  - [Semantic Reference Theory](semantic-reference-theory.md)
  - [Referent](referent.md)
- thoughts
  - Is the ternary relation R(x,y,t) truly primitive, or could it be derived from more basic constructs?
  - How does the ternary relation compare to binary relations in traditional logic and set theory?
  - What is gained and lost by making the relationship type a first-class element in the relation?
  - Could SRT be extended to n-ary relations (R(x₁,x₂,...,xₙ)) while preserving its key properties?
  - What is the significance of the fact that relationship types can themselves be referents?