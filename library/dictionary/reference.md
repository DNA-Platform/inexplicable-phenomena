# [Reference](https://dna-platform.github.io/inexplicable-phenomena/dictionary/reference.html)
- Book: [Dictionary](./.dictionary.md)
- Prev: [Qualification](./qualification.md)
- Next: [Referent](./referent.md)
---

## Definition

1. [Linguistic]: **Reference** is the relationship between a linguistic expression and the entity in the world that it identifies or denotes.

2. [Semantic]: **Reference** is the act by which a [subject](subject.md) directs attention to an [object](object.md) through a specific [relationship type](relationship.md).

3. [Formal]: `E[x,y,t]: x =t> y & x != y =|> x =ref> y`

## Explanation

Reference occurs when a subject and object are distinct entities connected through a relationship. The formal expression states that whenever `x` is related to `y` through some relationship type `t`, and `x` is not the same as `y`, then `x` references `y`.

Reference is the fundamental process that enables meaning and knowledge to emerge from connections between [referents](referent.md).

### Symbol and Reference

A reference relationship involves a specific representation that serves as a symbol:

`E[x,y]: x =x> y & x != y =|> E[rep]: x =rep> y`
`E[x,y]: x =x> y & x != y & x == (x,y) =|> E[sym]: x =sym> y`

When a subject `x` has a direct relationship with an object `y`, there exists a specific relationship `(x,y)` that functions as a symbol for `y`. This symbol mediates the reference relationship.

### Directionality of Reference

Reference is inherently directional - the subject references the object, not vice versa. This directionality is fundamental to the asymmetry between subject and object in epistemology.

The representation function can be expressed using dereferencing notation:

`*(x,y) == x` (the subject of the relationship)
`(x,y)* == y` (the object of the relationship)

### Reference and Meaning

Reference provides the foundation for meaning within a semantic framework. A [referent](referent.md) has meaning precisely because it participates in a network of reference relationships with other referents.

## Examples

Direct reference:
```
mind =perceives> tree
```

Reference through a symbol:
```
word =symbolizes> concept
```

Chain of reference (not a direct reference):
```
person =reads> book =describes> history
```

In this example, the person references the book directly, and the book references history directly, but the person does not directly reference history.

## Footer
- related: 
  - [Subject](subject.md)
  - [Object](object.md)
  - [Relationship](relationship.md)
  - [Symbol](symbolism.md)
  - [Referent](referent.md)
- thoughts:
  - How does reference in SRT relate to theories of reference in analytic philosophy?
  - What is the distinction between reference and representation?
  - How does the direction of reference contribute to meaning?
  - Can reference exist without symbols?
  - What is the relationship between reference and truth?