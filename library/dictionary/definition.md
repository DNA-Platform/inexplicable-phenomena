# [Definition](https://dna-platform.github.io/inexplicable-phenomena/dictionary/definition.html)
- Book: [Dictionary](./.dictionary.md)
- Prev: [Constant](./constant.md)
- Next: [Canonical](./canonical.md)
---

## Definition

1. [SRT]: A **definition** in Semantic Reference Theory is a statement that establishes the meaning of a term or concept by expressing its equivalence to a formal expression using the transduction operator.

2. [Formal Logic]: A **definition** introduces a new symbol or term by asserting its logical equivalence to an expression containing only previously defined terms.

3. [Linguistic]: A **definition** establishes the semantic content of a word or phrase by stating its necessary and sufficient conditions.

4. [Operational]: A **definition** provides criteria for determining whether a concept applies to a given case, often through observable properties or procedures.

## Explanation

In Semantic Reference Theory, definitions play a crucial role in establishing the meaning of terms within the formal system. Unlike traditional definitions that merely state equivalence, SRT definitions often use the transduction operator to express how a term relates to the fundamental structure of the theory.

A definition in SRT typically takes the form:

```
Term := Expression
```

Or using the transduction operator:

```
SRT |=defines> (Expression) <as> (Term)
```

For example, in SRT, the definition of a property is expressed as:

```
x.t := R(x,x,t)
```

This defines the dot notation as equivalent to a special case of the ternary relation where the subject and object are the same.

Definitions in SRT can be categorized into several types:

1. **Primitive Definitions**: Define the fundamental constructs of the theory, like the ternary relation R(x,y,t)
2. **Syntactic Definitions**: Establish notational conventions like `x => y := E[t]: R(x,y,t)`
3. **Semantic Definitions**: Define concepts in terms of their relationship to other concepts
4. **Operational Definitions**: Specify procedures for identifying or working with concepts

All definitions in SRT must ultimately be anchored in the primitive ternary relation, ensuring that the theoretical structure remains coherent and self-contained.

## Examples

Definition of existential relationship:
```
x => y := E[t]: R(x,y,t)
```

Definition of property notation:
```
x.t := R(x,x,t)
```

Definition of inheritance:
```
x -> y := x == y || x => y || E[z]: x -> z & z -> y
```

Definition using the transduction operator:
```
SRT |=defines> (P � Q) <as> (P =|> Q)
```

## Footer
- related: 
  - [Transduction](transduction.md)
  - [Semantic Reference Theory](semantic-reference-theory.md)
  - [Relationship](relationship.md)
  - [Property](property.md)
  - [Inheritance](inheritance.md)
- thoughts
  - How do definitions in SRT relate to the concept of transduction?
  - Can all concepts in SRT be defined in terms of the ternary relation?
  - What is the relationship between definitions and axioms in SRT?
  - Are definitions themselves a form of transduction?
  - How do SRT definitions compare to definitions in traditional logical systems?
  - Can circular definitions exist in SRT, and if so, what are their implications?