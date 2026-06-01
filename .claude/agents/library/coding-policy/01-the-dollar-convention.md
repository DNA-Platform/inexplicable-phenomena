---
title: The $ convention
---

# The $ convention

Cathy: The `$` prefix is $Chemistry's most visible convention. It separates the framework's intrinsic identity from the extrinsic context it operates in.

Cathy: `$Particle`, `$Chemical`, `$Atom` — these are the framework's core types. The `$` says "this is a $Chemistry concept, not a plain JavaScript class." `$()` is the universal dispatch surface — it wraps a `$Chemical` class into a React component. `$symbolize` creates a reactive snapshot. The prefix is a namespace without the ceremony of a namespace.

Cathy: Doug discovered the deeper meaning: the `$` separates what something IS from where it's USED. A `$Chemical` has intrinsic identity — its reactive state, its view, its bonds. When you write `const Teaser = $($Teaser)`, the `$()` call creates the extrinsic wrapper — the React component that plugs the chemical into a DOM tree. The chemical doesn't know about React. React doesn't know about chemicals. The `$` marks the boundary.

Arthur: The naming convention extends to properties. `$` prefixed properties on a chemical are framework-managed — `$derivatives$`, `$scope$`. Unprefixed properties are user state — `this.count`, `this.reversed`. This convention means you can read any chemical and immediately know which properties are yours and which are the framework's.

## Rules

1. **Classes that extend `$Particle` or `$Chemical` use the `$` prefix.** `$Teaser`, `$Lab`, `$Case`.
2. **The `$()` function is the sole public surface** for converting chemicals to React components.
3. **Framework-internal symbols use `$` prefix and `$` suffix.** `$derivatives$`, `$scope$`.
4. **User-facing state has no prefix.** `this.count`, `this.items`, `this.reversed`.
5. **camelCase always.** No ALL_CAPS constants, no UPPER_SNAKE. Even constants are camelCase.

<!-- citations -->
[chemistry src]: ../../../library/chemistry/src/
