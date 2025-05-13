# Header
- title: [Qualification](qualification.md)
- book: [Dictionary](.dictionary.md)
- previous: [Property](property.md)
- next: [Reference](reference.md)

## Definition

1. [Linguistic]: **Qualification** is the act of attributing a quality or characteristic to something, modifying or restricting its meaning.

2. [Semantic]: In SRT, **qualification** is the process by which a perspective assigns qualities to a referent, enabling it to possess those qualities intrinsically. It is the second fundamental operation of a perspective, following [identification](identification.md).

3. [Formal]: `(i) =(q)> (o) |=qualify> (o) =(q)> o`

## Explanation

The formal expression represents how qualification works:
- `(i)` represents the qualifier of the perspective
- `(q)` represents a quality
- `(o)` represents the symbol for an object
- The transduction operator `|=qualify>` shows the transformation

Qualification occurs when the qualifier `(i)` attributes a quality `q` to an object through its symbol `(o)`, which then enables the object to possess that quality intrinsically - expressed as `(o) =(q)> o`.

For qualification to occur, two additional conditions must be met:
- `(q) =(i)> (i)` - The quality must be an intrinsic quality of the qualifier
- `(o) -> (q)` - The object must inherit from the quality

Qualification represents how properties become intrinsic to objects within a perspective. After [identification](identification.md) establishes what something is, qualification establishes how it is.

## Examples

Basic qualification:
```
(i) =(red)> (rose) |=qualify> (rose) =(red)> rose
```
This expresses how a perspective qualifies a rose as red, enabling redness to become an intrinsic quality of the rose.

Qualification of multiple properties:
```
(i) =(fragrant)> (rose)
(i) =(thorny)> (rose)
|=qualify>
(rose) =(fragrant)> rose
(rose) =(thorny)> rose
```

## Footer
- related: 
  - [Perspective](perspective.md)
  - [Identification](identification.md)
  - [Relation](relation.md)
  - [Property](property.md)
  - [Quality](property.md)
- thoughts:
  - What is the relationship between qualities and properties in SRT?
  - How does qualification relate to the perception of sensory qualities?
  - Can qualification occur without prior identification?
  - Does qualification create new relationship types or just instantiate existing ones?
  - How does qualification relate to the concept of universals in philosophy?