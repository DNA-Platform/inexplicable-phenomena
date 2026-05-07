# Sprint 32 — Framework Bugs

## What this sprint fixes

The Lab app surfaced four framework bugs during sprints 30-31. These are real defects in `library/chemistry/src/` that affect any consumer of the framework, not just the Lab. Cathy leads; Queenie gates with tests.

## Bugs

### 1. `$symbolize(ReactNode)` produces unstable values → infinite re-render loops
**File:** `src/implementation/representation.ts`
**Symptom:** Any chemical that receives a ReactNode as a `$`-prefixed prop (e.g., `$demo?: ReactNode`) triggers an infinite re-render. The reactive system compares old and new values via `$symbolize`; React elements have new object identity on every render, so the comparison always says "changed."
**Impact:** HIGH — prevents chemicals from accepting ReactNode children/props reactively. Forced `$CaseShell` to become a function component.
**Fix direction:** `$symbolize` needs to handle React elements by comparing type + key + props structurally, not by object identity.
**Test needed:** Chemical with `$content?: ReactNode` prop; verify re-render doesn't loop.

### 2. `effect()` may not fire on class-form chemicals
**File:** `src/abstraction/particle.ts` or `src/abstraction/chemical.ts`
**Symptom:** II.4's timer (`async effect() { await this.next('mount'); this.start(); }`) shows "stopped" instead of auto-starting. The `effect()` method may only run on held-instance derivatives (`$lift` path), not on class-form templates (`$createComponent$` path).
**Impact:** MEDIUM — any chemical that uses `async effect()` for lifecycle work may silently skip it when used via `$($Class)`.
**Fix direction:** Verify the `$createComponent$` render path calls `effect()` on the derivative. Add test for class-form `effect()`.
**Test needed:** Class-form chemical with `async effect()` that writes a reactive prop after mount; verify the prop updates.

### 3. FC children inside a chemical without a bond constructor crash at synthesis
**File:** `src/abstraction/chemical.ts:268`
**Symptom:** `<$CaseShell><CaseDemo /></$CaseShell>` crashes because synthesis wraps the FC child via `$wrap(fn)` and then accesses `.$Component` (now `[$resolveComponent$]`) which doesn't exist on `$Function$` in the expected form.
**Impact:** MEDIUM — prevents chemicals from taking plain function-component children without a bond constructor. Workaround: pass content as a `$demo` prop instead of children.
**Fix direction:** The synthesis path for FC children needs to produce a valid Component via `[$resolveComponent$]()` on the wrapped `$Function$` instance.
**Test needed:** Chemical with no bond constructor, FC child rendered via `{this.children}`, verify it renders.

### 4. Shared demo specimens vs self-contained test files (architecture)
**Not a bug** — an architectural question. Currently each Case file defines its own `$Counter` class inline. This is intentional (the `?raw` source is the spec), but multiple files define identical classes. If the pattern needs to change, it's a design decision, not a fix.
**Deferred** to sprint 33 if the team finds duplication painful after sprint 31 adds more tests.

## Ownership

- **Cathy** — leads all three bug fixes. Owns `library/chemistry/src/`.
- **Queenie** — writes the test for each bug BEFORE Cathy fixes it (test-first). The test starts red, Cathy makes it green.
- **Libby** — documents any API changes that result from the fixes.

## Sprint goal

All three framework bugs have failing tests that Cathy makes green. 430+ tests pass at sprint end. The Lab app can use `$CaseShell` as a chemical again (bug 1), class-form `effect()` works (bug 2), and FC children render inside chemicals (bug 3).
