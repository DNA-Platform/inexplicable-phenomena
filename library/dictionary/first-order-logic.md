# Header
- title: [First-Order Logic](first-order-logic.md)
- book: [Dictionary](.dictionary.md)
- previous: [Epistemology](epistemology.md)
- next: [Formal Logic](formal-logic.md)

## Definition

1. [Linguistic]: **First-order logic** (FOL) is a formal logical system used in mathematics, philosophy, linguistics, and computer science that extends propositional logic by allowing quantification over objects in a domain.

2. [Semantic]: **First-order logic** is a formal system that [Semantic Reference Theory](semantic-reference-theory.md) draws inspiration from, while adopting a more accessible programmatic grammar.

3. [Formal]: {TBD}

## Explanation

First-order logic extends propositional logic by allowing quantification over objects in a domain. It includes predicates, variables, quantifiers (∀, ∃), and logical connectives.

[Semantic Reference Theory](semantic-reference-theory.md) draws inspiration from FOL but adopts a more accessible programmatic grammar inspired by programming language syntax. SRT replaces FOL's traditional symbology with notation like `!X` (not X), `X & Y` (X and Y), and `X =|> Y` (X implies Y).

## Examples

First-order logic formula:
```
∀x(P(x) → Q(x))
```

Equivalent in SRT notation:
```
!X: P(X) =|> Q(X)
```

## Footer
- related:
  - [Semantic Reference Theory](semantic-reference-theory.md)
  - [Predicate Logic](predicate-logic.md)
  - [Quantification](quantification.md)
  - [Formal Logic](formal-logic.md)
- thoughts:
  - How does SRT's notation provide advantages over traditional FOL notation?
  - What expressivity differences exist between FOL and SRT?
- external:
  - [First-order logic](https://en.wikipedia.org/wiki/First-order_logic) on Wikipedia