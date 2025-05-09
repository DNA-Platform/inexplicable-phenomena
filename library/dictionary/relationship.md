# Header
- title: [Relationship](relationship)
- book: [Dictionary](.dictionary.md)
- previous: [Catalogue](catalogue.md)
- next: [Ternary](ternary.md)

## Definition

1. [SRT]: A **relationship** is a connection between [referents](referent.md) established through the [ternary relation](ternary.md) R(x,y,t). When referents x and y are distinct, t specifies the relationship type that connects them.

2. [Formal]: A **relationship** is defined as `R(x,y,t) & x != y`, creating a directed connection from a subject to an object through a specific type.

3. [Graph Theory]: A **relationship** can be viewed as a labeled, directed edge in a graph, where referents are nodes and the relationship type is the edge label.

4. [Linguistic]: A **relationship** corresponds to the predicate in a subject-predicate-object grammatical structure, determining how subjects relate to objects.

## Explanation

Relationships connect referents within a [catalogue](catalogue.md) to form a semantic network. A relationship involves a [subject](subject.md) x, an [object](object.md) y, and a relationship type t, expressed in the notation `x =t> y`.

In SRT, relationships exist in several forms, each with its own notation and significance:

1. **Direct Relationship** (`x =t> y` or `R(x,y,t)`): The primitive relation in SRT that represents an immediate connection between two referents through a specific relationship type.

2. **Property** (`x.t`): A special case of direct relationship where a referent relates to itself (`R(x,x,t)`), representing a characteristic or attribute of the referent.

3. **Existential Relationship** (`x => y`): Shorthand for "there exists some relationship type t such that R(x,y,t)".

4. **Inheritance** (`x -> y`): A transitive relationship that combines reflexivity, direct relationship, and ancestral relationship, defined as:
   ```
   x -> y := x == y || x => y || E[z]: x -> z & z -> y
   ```

5. **Connection** (`x-y`): The most general form of relationship, expressing that two referents are related either directly or through chains of relationships in either direction.

Various syntactic forms express different relationship patterns:
- `x =t> y`: x relates to y through t
- `x <t= y`: y relates to x through t
- `x <s=t> y`: x relates to y through t, and y relates to x through s
- `x <=t=> y`: x and y relate to each other through the same relationship type t

## Examples

Simple relationship:
```
Doug =owns> book
```

Complementary relationships:
```
student =learns_from> teacher
teacher =teaches> student
```
This can be written as:
```
student <learns_from=teaches> teacher
```

Property as a special type of relationship:
```
rose.red
```
Equivalent to:
```
rose =red> rose
```

Inheritance through chains:
```
dog -> mammal -> animal
```

## Footer
- related: 
  - [Ternary](ternary.md)
  - [Subject](subject.md)
  - [Object](object.md)
  - [Property](property.md)
  - [Inheritance](inheritance.md)
  - [Referent](referent.md)
  - [Catalogue](catalogue.md)
- thoughts
  - How do relationship types themselves participate in relationships?
  - What determines the identity of a relationship type?
  - How do relationships in SRT relate to binary relations in set theory?
  - Can relationships exist between more than two referents?
  - Is the directionality of relationships an intrinsic feature of the world or a feature of our representation?
  - What is the relationship between the different forms of relationship in SRT?