---
kind: caveat
title: Short reactive prop names ($v, $x, $y) were silently inert
status: historical
related:
  - reactive-bonds
---

# Short reactive prop names (`$v`, `$x`, `$y`) were silently inert

**Resolved in sprint-24.** Single-letter `$<x>` reactive props are now reactive like any other `$`-prefixed name. This page is preserved as history.

## What was wrong

`$Reflection.isSpecial` (`src/abstraction/bond.ts`) gated reactivity on `property.length > 2`:

```typescript
return property.length > 2 &&
    property[0] === '$' &&
    property[1] !== "$" &&
    property[1] !== "_" &&
    property[1] === property[1].toLowerCase();
```

A name like `$v` has length 2, so `length > 2` was false and `isSpecial` returned false. `isReactive` then also returned false. The bond was never formed; no accessor was installed; writes to `inst.$v = 'next'` mutated a plain own field with no scope tracking and no re-render.

The framework also never warned about this — `$v` was treated as inert without any signal to the developer.

## The fix

Change `>` to `>=`. Two characters is the minimum for a `$`-prefixed identifier, so the gate should accept length-2 names.

```typescript
return property.length >= 2 &&  // was: > 2
    property[0] === '$' &&
    property[1] !== "$" &&
    property[1] !== "_" &&
    property[1] === property[1].toLowerCase();
```

The other guards still exclude `$$` (framework statics), `$_` (private/internal), and `$A` (uppercase second char — typically a class or type alias).

## Pinned by

`tests/regression/short-prop-name.test.tsx` — four tests covering held `.Component`, `$()` dispatch, single mount, two mounts, plus a control with `$value` as a regression sentinel.

## History

- 2026-04-28 — Queenie surfaced flaky behavior with `$v` during sprint-24 regression-test debugging. Suspicion filed as `evolving`.
- 2026-04-28 — Cathy reproduced cleanly: held `.Component` + single mount + external write also failed (Queenie's earlier note that two-mount worked turned out not to reproduce — every shape was broken). Root cause identified as the `> 2` gate. One-character fix landed; tests pinned. Caveat closed as `historical`.

## Related

- [reactive bonds][reactive-bonds] — the bond machinery this gate lives inside.

<!-- citations -->
[reactive-bonds]: ../features/reactive-bonds.md
