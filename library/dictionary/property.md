# Header
- title: [Property](property)
- book: [Dictionary](.dictionary.md)
- previous: [Ternary Relation](ternary.md)
- next: [Inheritance](inheritance.md)

## Definition

1. [SRT]: A **property** is a special case of [relationship](relationship.md) where the [subject](subject.md) and [object](object.md) are the same [referent](referent.md). In the [ternary relation](ternary.md) R(x,x,t), t is the property of x.

2. [Formal]: A **property** is defined as `x.t := R(x,x,t)`, representing a self-referential relationship of a referent.

3. [Ontological]: A **property** represents a characteristic or attribute inherent to a referent rather than a connection to another referent.

4. [Philosophical]: **Properties** in SRT correspond to qualities or attributes in traditional ontology, but are formalized as special cases of relationships rather than as a fundamentally different category.

## Explanation

When a referent relates to itself through the ternary relation, the relationship type becomes a property of that referent. This is expressed using the dot notation `x.t`, which is a shorthand for `x =t> x` or R(x,x,t).

Properties differ from relationships between distinct referents in significant ways:
- They do not establish the referent as a [subject](subject.md) in the technical sense
- They represent characteristics inherent to the referent rather than connections to other referents
- They form the basis for identity within the system

All properties must inherit from the fundamental property P, which represents the basic notion that a referent exists within the [catalogue](catalogue.md). This creates a hierarchy of properties with P at the root.

The formula `A[x]: E[P]: x.P` expresses that every referent x has the property P, which is the most general property in SRT. All other properties inherit from P, creating a structure similar to a type hierarchy in programming languages.

Properties are crucial for qualification operations in SRT. While identification creates identity and relation creates connections between referents, qualification assigns properties to referents, enriching the semantic structure of the catalogue.

## Examples

Simple property:
```
rose.red
```
Which is equivalent to:
```
rose =red> rose
```

Multiple properties:
```
rose.red
rose.fragrant
```

Property hierarchy:
```
rose.flower
flower.plant
plant.living
```

Universal property P:
```
x.P  // true for all referents x
```

## Footer
- related: 
  - [Ternary](ternary.md)
  - [Referent](referent.md)
  - [Relationship](relationship.md)
  - [Subject](subject.md)
  - [Object](object.md)
  - [Qualification](qualification.md)
  - [Inheritance](inheritance.md)
- thoughts
  - What is the relationship between properties in SRT and predicates in first-order logic?
  - How do properties relate to the concept of identity in SRT?
  - Is there a formal distinction between essential and accidental properties in SRT?
  - What is the significance of all properties inheriting from the fundamental property P?
  - How does the treatment of properties as special cases of relationships rather than a distinct category affect the expressiveness of SRT?
  - Can properties themselves have properties?