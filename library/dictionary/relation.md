# [Relation](https://dna-platform.github.io/inexplicable-phenomena/dictionary/relation.html)
- Book: [Dictionary](./.dictionary.md)
- Prev: [Reference](./reference.md)
- Next: [Relationship](./relationship.md)
---

## Definition

1. [Linguistic]: **Relation** refers to the way in which two or more people, things, or ideas are connected or the state of being connected.

2. [Semantic]: In SRT, **relation** is the process by which a perspective establishes connections between referents. It is the third fundamental operation of a perspective, following [identification](identification.md) and [qualification](qualification.md).

3. [Formal]: `(i) =(r)> ((s,o)) |=relates> ((s,o)) =(r)> (s,o)`

## Explanation

The formal expression represents how relation works:
- `(i)` represents the qualifier of the perspective
- `(r)` represents a relationship type
- `((s,o))` represents the symbol for a relationship between subject s and object o
- The transduction operator `|=relates>` shows the transformation

Relation occurs when the qualifier `(i)` attributes a relationship type `r` to a relationship between subject and object, enabling the subject to stand in relation to the object through that relationship type.

Several additional conditions define the nature of relation:
- `(r) =(i)> (i)` - The relationship type is an intrinsic quality of the qualifier
- `((s,o)) -> (r)` - The relationship symbol inherits from the relationship type
- `((s,o)) == ((s),(o))` - The relationship symbol is defined by the subject and object symbols
- `(s) =(r)> (o)` - The subject relates to the object through the relationship type

Relation establishes how referents connect to each other within a perspective. After [identification](identification.md) establishes what things are and [qualification](qualification.md) establishes their qualities, relation establishes how they interconnect.

## Examples

Basic relation:
```
(i) =(grows)> ((plant,flower)) |=relates> ((plant,flower)) =(grows)> (plant,flower)
```
This expresses how a perspective relates a plant to a flower through the relationship of growing, enabling the plant to stand in the "grows" relation to the flower.

Creating a network of relations:
```
(i) =(eats)> ((animal,plant))
(i) =(lives_in)> ((animal,forest))
(i) =(contains)> ((forest,plant))
|=relates> 
(animal) =(eats)> (plant)
(animal) =(lives_in)> (forest)
(forest) =(contains)> (plant)
```

## Footer
- related: 
  - [Perspective](perspective.md)
  - [Identification](identification.md)
  - [Qualification](qualification.md)
  - [Relationship](relationship.md)
  - [Ternary](ternary.md)
- thoughts:
  - How does relation interact with the basic ternary relation of SRT?
  - Can relation establish connections between more than two referents?
  - What constraints exist on which referents can be related to each other?
  - How does the operation of relation differ from the static concept of relationship?
  - Does relation require both identification and qualification to have occurred first?