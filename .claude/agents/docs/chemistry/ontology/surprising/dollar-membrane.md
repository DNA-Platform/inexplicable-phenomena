---
kind: feature
title: The $ membrane
status: stable
---

# The `$` membrane

## The surprise

`$Chemistry` uses the `$` character as a structural sigil with three meanings:

- `$x` — user-visible reactive prop. Tracked, observed, written to.
- `$$x$$` — framework-internal symbol. Identity-bearing slot, addressable, often parseable.
- `_x` — private. By convention, do not touch from outside the class.

The wrapping is the convention: a single `$` opens reactivity; a double `$$` (and matching close) marks framework-only territory. The naming distinguishes **intrinsic identity** (what makes a particle a particle) from **extrinsic context** (what the rest of the world hands in).

## Why it's surprising

Most JS codebases use `$` as a free character or for jQuery legacy; few attach structural meaning. A reader scanning `$Chemistry` source sees three different `$` registers and may flatten them mentally. Doing so loses the membrane.

The `$$x$$` form in particular is unusual. It signals: this is the framework's, not the user's, but it's still meant to be readable and addressable.

## Where to confirm it

- The naming convention in full: [coding style][coding-style].
- The `$$createSymbol$$` / `$$parseCid$$` round-trip — symbols are parseable; cids can be recovered.

<!-- citations -->
[coding-style]: ../../../coding-style.md
