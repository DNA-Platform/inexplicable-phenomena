# Sprint 40 — SSR & Hydration (Exploratory)

## What we know

**Arthur** and **Cathy** independently walked the rendering path and converged on the same conclusion: the machinery is closer to SSR-ready than expected, but there are real gaps.

### What works today

- **`view()` is DOM-free.** The entire call chain — `$Particle.view()`, `$Chemical.view()`, `augment()`, `reconcile()` — never touches `document` or `window`. `renderToString` can call `view()` without crashing.
- **`$apply()` is pure assignment.** The prop membrane maps JSX props to `$`-prefixed properties. No hooks, no effects, no DOM.
- **`$Represent` is environment-agnostic.** `$symbolize`/`$literalize` use `JSON.stringify`/`JSON.parse` with custom replacers. Could serialize chemical state for transfer.
- **Lifecycle is correctly silent.** `useEffect`/`useLayoutEffect` don't fire during SSR, so `$form()`, `mount`, `layout`, `effect` phases are all skipped. This is the right behavior.

### What needs work

1. **Bond formation is wasted work on the server.** `$Molecule.reactivate()` installs `Object.defineProperty` getters/setters for scope tracking, but no scope is ever active during `renderToString`. `currentScope()` returns null, all read/write recording is dead branches. A server-mode flag should skip bond formation entirely.

2. **`$lift` assumes a client environment.** The FC factory uses `useState`, `useEffect`, `useLayoutEffect`. Effects don't fire on the server — that's fine. But `augment()` still walks the React element tree wrapping event handlers in `withScope()`, which is pointless during SSR.

3. **CIDs are sequential per-process.** Server and client produce different CID sequences. This is fine because `$Reaction.find()` is client-local, but it means CIDs cannot be used as hydration identifiers. If we need cross-environment identity, we need a separate hydration key — possibly derived from React's `useId()`.

4. **`$form()` is client-only.** It runs in `useEffect`, so it never fires on the server. Both server and client skip it on first render, so hydration matches. But if we want SSR to *wait* for async data (e.g., fetch in `$form`), we need a Suspense integration.

5. **Adapted children create intermediate chemicals.** `$Html$` and `$Function$` adapters are invisible in the HTML but carry state. They must be reconstituted on the client — and each gets a new CID, so identity can't bridge the wire through CIDs alone.

## Approach

This is an **exploratory sprint** — spikes and proofs of concept, not production code. The goal is to answer the open questions with running code, not speculation.

## Stories

### Track 1 — Server render path

**S40-1: Smoke test — renderToString a chemical** (spike)
Take a simple chemical (counter, post card) and call `renderToString` on `$()` wrapped version. Does it produce valid HTML? Does it crash? Document every error.
- **Owner:** Cathy
- **Output:** A test file that imports `renderToString` from `react-dom/server` and renders 3 chemicals of increasing complexity

**S40-2: Server-mode flag** (spike)
Add a `$Chemistry.server` boolean (or detect `typeof window === 'undefined'`). When true, `$Molecule.reactivate()` skips bond formation and `augment()` skips event handler wrapping.
- **Owner:** Cathy
- **Depends on:** S40-1 (to verify the flag makes the smoke test cleaner/faster)
- **Risk:** chemicals that read reactive properties in `view()` — without bonds, do the property reads still return the right values? (They should — the backing store is a plain object.)

**S40-3: Short-circuit augment on server** (spike)
When server-mode is active, `augment()` returns the view tree unchanged — no `withScope` wrapping, no event handler rewriting. Measure the performance difference.
- **Owner:** Cathy

### Track 2 — Hydration

**S40-4: hydrateRoot round-trip** (spike)
Render a chemical to string on "server" (same process, simulating SSR). Inject the HTML into a container. Call `hydrateRoot`. Does React hydrate without mismatch warnings? Does the chemical become interactive?
- **Owner:** Cathy
- **Output:** A test that does the full render → HTML → hydrate → interact cycle

**S40-5: State transfer protocol** (design)
Design how non-deterministic state crosses the wire. Options:
  - (A) Re-derive from props (default, zero cost, works for pure chemicals)
  - (B) `<script>` tag with `$symbolize`d backing stores, keyed by hydration ID
  - (C) `data-` attributes on the root element
- **Owner:** Arthur
- **Output:** A short design doc with the chosen approach and rationale

**S40-6: Hydration identity** (spike)
Prototype a hydration key separate from CID. Options: `useId()`, tree-position hash, explicit `key` prop. Test that the key is stable across server and client renders.
- **Owner:** Arthur + Cathy
- **Risk:** `useId()` is only available inside a component render — but CIDs are assigned in constructors, before render. Timing mismatch needs resolution.

### Track 3 — Edge cases

**S40-7: Bond constructor children under SSR** (spike)
Render a chemical with a bond constructor (`$Dashboard(card, divider, light)`) via `renderToString`. Do the adapted children (`$Html$`, `$Function$`) get created and produce the right HTML? Do they break hydration?
- **Owner:** Cathy

**S40-8: `$form()` and Suspense** (research)
Can `$form()` be made Suspense-aware? If `$form` returns a promise, could the chemical throw it to trigger Suspense on the server (React 18+ streaming SSR)? What would the API look like?
- **Owner:** Arthur
- **Output:** Design sketch, not implementation

**S40-9: `$new()` clones under SSR** (spike)
Render a chemical that creates clones via `$new()`. Does `renderToString` produce correct HTML? Does hydration break when clone CIDs don't match?
- **Owner:** Cathy

### Track 4 — Integration

**S40-10: Next.js or Remix proof of concept** (spike)
Stand up a minimal Next.js app (App Router) or Remix app that imports `$Chemistry` and renders a page with chemicals. Does the built-in SSR just work? What breaks?
- **Owner:** Phillip
- **Output:** A working (or documented-as-broken) minimal app

## Open questions this sprint should answer

1. Can a chemical render to string without any code changes?
2. What is the performance cost of bond formation during SSR, and how much does the server-mode flag save?
3. Does hydrateRoot work for pure-from-props chemicals without any framework changes?
4. What's the minimum viable state transfer for chemicals with non-deterministic state?
5. Is `useId()` viable for hydration identity despite the constructor timing mismatch?
6. Does `$form()` need a Suspense integration, or is "client-only with a loading state" acceptable?
7. Can we SSR bond-constructor chemicals (adapted children) without hydration mismatches?

## Success criteria

This sprint succeeds if we can answer all 7 open questions with evidence from running code. We don't need production-ready SSR — we need to know exactly what stands between us and it.
