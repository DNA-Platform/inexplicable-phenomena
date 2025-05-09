# Header
- title: [Transitivity](transitivity.md)
- book: [Dictionary](.dictionary.md)
- previous: [Transduction](transduction.md)
- next: [First-Order Logic](first-order-logic.md)

## Definition

1. [Logical]: **Transitivity** is a property of binary relations such that if a relation R holds between a and b, and also between b and c, then it necessarily holds between a and c.

2. [Semantic]: In SRT, **transitivity** is the property that allows relationships to extend through chains of connected referents, forming the basis for [inheritance](inheritance.md) and ancestral relationships.

3. [Graph Theory]: **Transitivity** characterizes a directed graph where, if there are edges from vertex a to vertex b and from vertex b to vertex c, then there is also an edge from vertex a to vertex c.

## Explanation

Transitivity is a fundamental property in [Semantic Reference Theory](semantic-reference-theory.md) that distinguishes direct relationships from inherited ones. While the basic ternary relation R(x,y,t) is not transitive by itself, SRT introduces the inheritance relationship `x -> y` to capture transitivity.

The inheritance relationship is defined as:
```
x -> y := x == y || x => y || E[z]: x -> z & z -> y
```

This definition embodies transitivity, allowing referents to inherit properties and relationships through chains of direct relationships. Unlike direct relationships, inheritance expresses connections that may involve multiple intermediate steps.

Transitivity provides SRT with the ability to represent hierarchical structures, category systems, and logical implications. It transforms the basic relationships between individual referents into a rich network of inherited connections that mirror how human knowledge is structured in taxonomies and class hierarchies.

## Examples

Direct relationship (not transitive):
```
dog =is_pet_of> human
human =is_citizen_of> country
```
These two statements alone do not imply that dog =is_citizen_of> country.

Inheritance (transitive):
```
poodle -> dog -> mammal -> animal
```
This implies that poodle -> animal (a poodle inherits all properties of animals).

Property inheritance:
```
animal.living
dog -> animal
```
Therefore: dog.living (dogs inherit the property of being living from animals).

## Footer
- related: 
  - [Inheritance](inheritance.md)
  - [Relationship](relationship.md)
  - [Connection](relationship.md)
  - [Direct Relationship](relationship.md)
  - [Ancestral Relationship](relationship.md)
- thoughts:
  - How does transitivity in SRT relate to logical implication?
  - What are the computational implications of transitivity for inference engines built on SRT?
  - Can transitivity be applied selectively to certain relationship types but not others?
  - How does the distinction between direct and transitive relationships map onto human cognitive processes?
  - What role does transitivity play in the formalization of common-sense reasoning?