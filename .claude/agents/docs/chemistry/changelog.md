---
kind: reference
title: $Chemistry changelog
status: stable
---

# $Chemistry changelog

## Sprint 31

- **Method binding via $Reagent** — `onClick={this.method}` works without `.bind()` or arrow wrappers; the molecule installs bound-method getters on the class template, cached per instance via WeakMap.
- **`$isChemicalBase$` prototype walk fixed** — replaced bracket access with `Object.hasOwn` to avoid false positives when walking the prototype chain.
- **Code-first test panel** — added a test panel with `prism-react-renderer` syntax highlighting for live source display alongside running demos.
- **Inline styles migrated to styled-components** — all remaining inline `style={{}}` in app code replaced with co-located styled-components reading from theme.

## Sprint 30

- **`.Component` getter removed from public API** — the accessor is now symbol-keyed (`[$resolveComponent$]`); author code uses `$()` exclusively.
- **`Chemical` Component export removed from `index.ts`** — base classes are not standalone Components and should not be exported as such.
- **`bind` function removed from public exports** — the framework handles binding internally; no public surface needed.
- **`$()` inverse overload added** — `$(Component)` returns the chemical instance backing a Component, for debugging and framework-level inspection.
- **react-router-dom replaces hand-rolled $Router** — routing now uses the ecosystem package instead of a custom implementation.
