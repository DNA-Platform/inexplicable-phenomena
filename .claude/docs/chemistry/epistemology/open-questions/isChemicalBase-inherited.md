---
kind: stub
title: Open question — $isChemicalBase$ inherited transitively
status: open
---

# Open question: `$isChemicalBase$` inherited transitively

## The question

Queenie's sprint-24 finding: the `$isChemicalBase$` marker is set on `$Chemical` and inherited transitively by all subclasses. The `$Reagent` wrapping for non-`$`-prefixed user methods is gated on a "is this a `$ChemicalBase`?" check that, due to the inheritance, treats *every* subclass as the base — meaning the wrapping path may be unreachable for user-defined methods.

## What we suspect

Most user methods on a custom `$Chemical` subclass are *not* getting the `$Reagent` scope-tracking wrapper. The behavior path the framework was designed to take for these methods is dead code; user methods run un-wrapped, and any reactivity they exercise depends on the field-access path, not the method-wrapping path.

## Path to resolution

- Specimen: a `$Chemical` subclass with a non-`$` method that mutates `$x`. Confirm whether the method is wrapped (via observable behavior — does external-write fan-out fire correctly?).
- Pin the result with a unit test, regardless of which way it goes.
- If the wrapping is genuinely dead, decide: delete the wrapping path, or fix the predicate so it activates correctly.

## Where it lives

Queenie's sprint-24 finding doc captures the original investigation. Cross-link should land when the doc finds a permanent home.

<!-- citations -->
