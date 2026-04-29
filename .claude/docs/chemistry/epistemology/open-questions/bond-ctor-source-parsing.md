---
kind: stub
title: Open question — bond-ctor source parsing
status: open
---

# Open question: bond-ctor source parsing

## The question

The framework parses the bond constructor's source text with a regex to extract the typed parameter list. The regex breaks on:

- Default values (`title: string = 'Untitled'`)
- Destructured parameters (`{ title }: { title: string }`)
- Arrow-function bond ctors (currently disallowed but not always caught)

Migrated from a sprint-26 AUDIT comment.

## What we suspect

The parser silently produces wrong parameter shapes when these forms are present, leading to mis-matched JSX-child-to-arg routing. The framework may either throw, route to the wrong argument, or drop arguments.

## Path to resolution

- Write specimens for each broken form. Confirm in the [Lab][the-lab] what actually happens.
- Replace the regex with a real TS parser (probably `@babel/parser` or `typescript` itself), or document the supported subset and reject the rest with a clear error.

## Where it shows up in source

`$Synthesis` parses bond ctors. The exact regex location should be cited here once the source is checked.

<!-- citations -->
[the-lab]: ../the-lab.md
