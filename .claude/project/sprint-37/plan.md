# Sprint 37 — Fix the Fundamental Misunderstanding

## The problem

The team has been writing `new $X()` to create sub-chemicals in app code — class fields like `inner = new $Speaker()`, constructor calls like `this.card = new $Card()`. This bypasses the framework's render-based construction path. These raw instances have no template linkage, no bond constructor execution, no proper reactive bond formation.

**The correct pattern:** render `<Speaker />` in JSX. The Component IS the constructor. Children arrive through the bond constructor. Parents receive typed, framework-processed children and can depend on their state reactively.

**This sprint audits every file that calls `new $X()` and fixes the ones that misuse it.**

## What's wrong vs. what's acceptable

### WRONG — `new $X()` to create a sub-chemical for composition
```tsx
class $Outer extends $Chemical {
    inner = new $Inner();        // ← raw, unprocessed
    view() { return $(this.inner); }  // ← working around the problem
}
```

### RIGHT — bond-constructor composition
```tsx
class $Outer extends $Chemical {
    inner!: $Inner;
    $Outer(inner: $Inner) {
        this.inner = $check(inner, $Inner);
    }
    view() { /* reads this.inner.$level reactively */ }
}
const Outer = $($Outer);
// Usage: <Outer><Inner /></Outer>
```

### ACCEPTABLE — `new $X()` in test code for framework-level verification
```tsx
// In vitest — testing the framework's internals
new $Counter(); // template creation
const c = new $Counter(); // held instance for $lift testing
```
This is testing the framework mechanism itself, not demonstrating app patterns.

## Audit scope

### 1. App demo files (sections/*/case-*.tsx)
Every demo is a teaching example. Any `new $X()` for composition must become bond-constructor composition. These files ARE the documentation developers copy from.

### 2. App infrastructure (apparatus/*.tsx)
Check for raw instantiation patterns.

### 3. Unit tests (tests/react/*.test.tsx)
`new $X()` is acceptable when testing framework mechanisms (template creation, $lift, $() dispatch). NOT acceptable when demonstrating app patterns.

### 4. Test specimens (tests/specimens/*.tsx)
These define reusable chemicals for tests. Check for composition patterns.

### 5. Docs examples (.claude/docs/chemistry/examples/*.tsx)
Canonical examples must show the correct pattern.

### 6. Ability and guide docs
Update `chemistry-basics.md`, `for-component-authors.md`, `coding-conventions.md` to explicitly forbid `new $X()` for composition and explain why.

## Files known to misuse `new $X()` in app code

- `II-1/case-1.tsx` — ~~$Post creates $LikeButton via constructor~~ Fixed with prop passing, but prop passing is ALSO wrong. Should use bond constructor.
- `V-3/case-1.tsx` — $VolumeSlider creates two $Speakers via class fields
- `V-3/case-2.tsx` — $Parent creates two $Siblings via class fields  
- `VI-1/case-2.tsx` — $ThemeSwitcher creates two $PreviewCards via class fields
- `deep-nest/case-1.tsx` — was restructured but may still have issues
- `cond-swap/case-1.tsx` — $Switcher creates $Editor and $Viewer via class fields
- `nested/case-1.tsx` — $Book/$Chapter/$Page may use constructor-created children
- `III-3/case-1.tsx` — $Book creates bond-ctor pattern (may be correct already)

## Ownership

- **Cathy** — audits framework test code (tests/), identifies which `new` calls are legitimate framework tests vs misuse
- **Phillip + Gabby** — rewrite app demos to use bond-constructor composition
- **Libby** — updates docs with the correct pattern and explicit "never do this" warning
- **Queenie** — runs verify-all.mjs after each fix batch to ensure nothing breaks

## Sprint goal

Zero `new $X()` for composition in app code. Every multi-class demo uses bond-constructor composition. The code Doug reads in the source panel is the code he'd want developers to write.
