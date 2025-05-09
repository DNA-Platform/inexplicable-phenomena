# Header
- title: [Formal Logic](formal-logic.md)
- book: [Dictionary](.dictionary.md)
- previous: [First-Order Logic](first-order-logic.md)
- next: [Identification](identification.md)

## Definition

1. [Linguistic]: **Formal logic** is a system of reasoning using symbolic notation and precise rules to determine the validity of arguments.

2. [Semantic]: **Formal logic** in SRT provides a framework for representing statements and their relationships mathematically, removing ambiguities found in natural language.

3. [Formal]: {TBD}

## Explanation

Formal logic provides a framework for representing statements and their relationships mathematically, removing ambiguities found in natural language.

[Semantic Reference Theory](semantic-reference-theory.md) builds upon formal logic traditions but adopts a more accessible programmatic grammar inspired by programming language syntax. It replaces the austere symbology of first-order logic with notation like `!X` (not X), `X & Y` (X and Y), and `X =|> Y` (X implies Y), while maintaining the same logical power.

SRT uses a programmatic grammar that draws inspiration from programming language syntax:

For propositional variables:
- `!X` : not X  
- `X & Y` : X and Y  
- `X | Y` : X xor Y  
- `X || Y` : X or Y  
- `X =|> Y` : X implies Y  
- `X !=|> Y` : X does not imply Y  
- `X <|=|> Y` : X if and only if Y
- `X === Y` : X is logically equivalent to Y

For non-logical variables:
- `x == y` : x equals y  
- `x != y` : x does not equal y

## Examples

Logical implication in traditional logic and SRT:
```
Traditional: P → Q
SRT: P =|> Q

Logical conjunction:
```
Traditional: P ∧ Q
SRT: P & Q
```

## Footer
- related:
  - [Semantic Reference Theory](semantic-reference-theory.md)
  - [First-Order Logic](first-order-logic.md)
  - [Propositional Logic](propositional-logic.md)
  - [Predicate Logic](predicate-logic.md)
  - [Logic](logic.md)
- thoughts:
  - How does SRT's programmatic grammar enhance expressivity compared to traditional notation?
  - What are the trade-offs between traditional logic notation and SRT's notation?
- external:
  - [Formal logic](https://en.wikipedia.org/wiki/Formal_logic) on Wikipedia
  - [Mathematical logic](https://en.wikipedia.org/wiki/Mathematical_logic) on Wikipedia
  - [First-order logic](https://en.wikipedia.org/wiki/First-order_logic) on Wikipedia
```