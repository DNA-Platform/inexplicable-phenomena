# [Semantic Reference Frame](https://dna-platform.github.io/inexplicable-phenomena/encyclopedia/semantic-reference-frame.html)
- Book: [Encyclopedia](./.encyclopedia.md)
---

# Entry

In [Semantic Reference Theory](semantic-reference-theory.md) (SRT), a Semantic Reference Frame provides a formal context for interpreting relationships between referents. It establishes precise semantics for both relationship interpretation and canonical assignment.

## Formal Definition of Reference Frames

A reference frame is formally denoted as `F[t,c]`, where:

- `t` is the relationship type that determines relationship interpretation
- `c` is the relationship type that determines canonical assignment

Within the reference frame `F[t,c]`, the following formal rules apply:

1. `F[t,c]: x => y =|> x =t> y`
   - In reference frame F[t,c], the relationship "x => y" is interpreted as "x =t> y"

2. `F[t,c]: x => y =|> *x[c] == x & *y[c] == y`
   - In reference frame F[t,c], the canonicals of referents x and y are determined by c

The notation `*x[c]` denotes the canonical of referent `x` in the canonical system defined by `c`.

## The Four Fundamental Reference Frames

Using this formal notation, we can precisely define four fundamental reference frames:

1. **F[r,eq]**:
   - Relationship interpretation: `x => y =|> x =r> y`
   - Canonical assignment: `*x[eq] == x & *y[eq] == y`
   - In this frame, relationships are interpreted using the base relationship type `r`, and each referent is its own canonical

2. **F[r,r]**:
   - Relationship interpretation: `x => y =|> x =r> y`
   - Canonical assignment: `*x[r] == r & *y[r] == r`
   - In this frame, relationships are interpreted using the base relationship type `r`, but all referents have `r` as their canonical

3. **F[eq,eq]**:
   - Relationship interpretation: `x => y =|> x =eq> y`
   - Canonical assignment: `*x[eq] == x & *y[eq] == y`
   - In this frame, relationships are interpreted using the equality relationship type `eq`, and each referent is its own canonical

4. **F[eq,r]**:
   - Relationship interpretation: `x => y =|> x =eq> y`
   - Canonical assignment: `*x[r] == r & *y[r] == r`
   - In this frame, relationships are interpreted using the equality relationship type `eq`, and all referents have `r` as their canonical

## The Structure of Relationship Types

The inheritance of relationship types is governed by this axiom:

`x =t> y & t -> s =|> x =s> y`

This means if referents `x` and `y` are related by type `t`, and `t` inherits from `s`, then `x` and `y` are also related by type `s`.

Another essential axiom of SRT establishes that:

`x =t> y =|> t -> r`

This means that any relationship type `t` must inherit from the base relationship type `r`.

## Canonical Assignments

For canonical assignments, SRT includes these fundamental axioms:

1. `*x[r] == r`
   - In the canonical system of relationship type `r`, the canonical of any referent `x` is `r` itself

2. `*x[eq] == x`
   - In the canonical system of relationship type `eq`, the canonical of each referent is itself

## The Default Reference Frame

The axioms of SRT establish `F[r,eq]` as the default reference frame. In this frame:

- All relationships are interpreted through the base relationship type `r`
- Each referent maintains its distinct identity as its own canonical
- When we write expressions in SRT without specifying a reference frame, we're implicitly operating in `F[r,eq]`

This makes `F[r,eq]` the natural frame for general reasoning in SRT, as it preserves both relationship interpretation through the universal base type and distinct referent identity.

## Relationship to Perspectives

A perspective in SRT appears to be a specific type of reference frame with additional constraints. While the exact formulation remains an area of ongoing development, it likely involves a reference frame structured around a subject referent (often denoted as `(i)`) and a specific way of handling objective referents.

The formal structure might be something like `F[(i),o]`, where:
- `(i)` serves as the qualifier/center of the perspective
- `o` defines how objective referents are handled

The perspective would then satisfy specific properties such as:

1. **The Quality of Symbolism**: `o[objective] =|> (o)`
2. **The Quality of Meaning**: `(i) =q> (o) <|=|> (o) =q> o`
3. **Reduction to Qualification**: All operations (identification, relation) reduce to qualification

However, this formulation should be considered provisional, as the exact structure of perspectives in terms of reference frames remains an area of active development in SRT.

## Conclusion

A semantic reference frame, formally defined as `F[t,c]`, provides a precise mechanism for specifying both relationship interpretation and canonical assignment. This binary structure creates a formal context for interpreting relationships between referents.

The default reference frame of SRT, `F[r,eq]`, ensures all relationships are interpreted through the base relationship type while preserving the distinct identity of each referent. This makes it the natural frame for general reasoning within the theory. Other frames like `F[r,r]`, `F[eq,eq]`, and `F[eq,r]` offer alternative interpretations, each with distinct formal properties.

Reference frames form the foundation upon which perspectives are built, providing the underlying formal structure that makes the representation of meaning possible within SRT.