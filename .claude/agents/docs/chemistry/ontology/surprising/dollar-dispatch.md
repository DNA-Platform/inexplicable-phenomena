---
kind: feature
title: $() shape dispatch
status: stable
---

# `$()` shape dispatch

## The surprise

A single callable, `$()`, behaves differently based on the *shape* of its argument:

- `$(SomeChemicalClass)` → mount-by-class (allocate template, return component).
- `$(someChemicalInstance)` → mount-by-instance (use the held instance, lift a derivative).
- `$(<JSX />)` → mount-as-element (a JSX expression — `$()` is the JSX factory).
- `$('div')` → HTML catalogue lookup.
- `$('div', SomeChemicalClass)` → register an HTML override.

One name, five behaviors. The dispatch is by `typeof` plus structural inspection.

## Why it's surprising

Most callables select behavior by the *meaning* of the argument, not its *shape*. `$Chemistry`'s `$()` reads as a polymorphic JSX factory — but it's also a mount surface, also a registry, also a lookup. A reader who learned `$()` as "the JSX factory" can be surprised when `$('div', X)` mutates a registry instead of returning an element.

The trade is concision against discoverability. The convention: stay at the entry-tier ([overview][overview], [`$()` callable feature][feat-dollar]) before reading source.

## Where to confirm it

- The user surface: [`$()` callable (feature)][feat-dollar].
- The HTML catalogue: same page.

<!-- citations -->
[overview]: ../../overview.md
[feat-dollar]: ../../features/dollar-callable.md
