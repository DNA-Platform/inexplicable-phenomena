# Sprint 21: Performance Baseline and Targets

Establish the performance characteristics of $Chemistry — where the costs live, how they scale, and what numbers answer "is v1 shippable?" and "when does v2 require static analysis?"

The research (2026-04-22, summarized in [research notes](./research.md)) confirms: we pay for the high-level framework. The question is *how much*, not *whether*.

## Status

B1 COMPLETE. Tools wired. V1 ship decision: **SHIP**.

### Landed so far

- **Added `tsc --noEmit` to the test pipeline.** `npm run test` now does type-check + vitest run. New script `npm run bench` runs vitest benchmark mode.
- **B1 micro-benchmarks** at `library/chemistry/bench/micro.bench.ts`. 14 benchmarks covering accessor cost, scope open/close, $symbolize scaling (primitive/object/array/Map at small & large sizes), and chemical instantiation.
- **Baseline numbers** at `library/chemistry/bench/baseline.json`.
- **Performance contract** at `.claude/docs/chemistry/performance-contract.md`.

### Key findings (micro-level)

| Dimension | Measured | v1 Threshold | Status |
|-----------|----------|--------------|--------|
| Accessor overhead outside scope | ~1x plain JS | <5x | ✅ PASS |
| Scope open/close | ~5μs | <10μs | ✅ PASS |
| $symbolize small state | <500ns | <1μs | ✅ PASS |
| $symbolize large state (100 keys) | 12μs | <50ms | ✅ PASS |
| Chemical instantiation | ~2μs | <1ms | ✅ PASS |

**All v1 ship criteria met.** The GitHub Pages site target is comfortably within budget.

### Remaining (not v1-blocking)

- B2: component-level benchmarks via React Profiler.
- B3: macro-benchmarks (adapted js-framework-benchmark subset).
- B4: real-world profiling of the static site (waits on site).
- B5: performance.mark instrumentation (for diagnosing future issues).
- B6: CI regression detection (not urgent at current PR volume).
- B7, B8: synthesis docs (partially done via performance-contract.md).

## Framing

Three tiers of benchmarks, each answering different questions:

1. **Micro-benchmarks** — "how expensive is each primitive operation?"
2. **Component-level benchmarks** — "how long does one chemical take to render, re-render, instantiate?"
3. **Macro-benchmarks** — "how does this scale under realistic app load?"

Two decisions drive from these measurements:

- **v1 ship gate:** can we build the static GitHub Pages site with acceptable responsiveness?
- **v2 threshold:** at what numbers does static analysis stop being optional?

## Stories

### B1 — Micro-benchmarks (Queenie + Cathy)

Using `vitest bench` (tinybench). Targets in `library/chemistry/bench/micro.bench.ts`.

**Operations to benchmark:**
1. **Accessor cost.** 10,000 reads and 10,000 writes of a reactive field. Compared to plain property access on a non-chemical.
2. **Scope open/close.** 10,000 `withScope(() => {})` invocations. Empty body.
3. **Scope with tracked reads.** 10,000 scopes each reading one field (records one snapshot).
4. **Scope finalize cost by read-set size.** Scope with 1, 10, 100, 1000 tracked reads. How does finalize cost scale?
5. **$symbolize on various shapes.** Primitive, small plain object (3 keys), large plain object (100 keys), small array (10 items), large array (1000 items), Map with 10 entries, Map with 1000 entries. How does serialization scale with input size?
6. **Equivalent() comparison.** Same shapes; same + different. What's the comparison cost?

**Baseline comparison:** every benchmark runs against a "plain JS" equivalent (direct property access, no scope, JSON.stringify directly) so we see the framework's overhead factor.

**Output:** `library/chemistry/bench/baseline.micro.json` committed to repo. Table in the sprint review recording each op's time and the overhead factor.

**Thresholds for concern:**
- Accessor overhead >5x plain property access → investigate.
- Scope open/close >10μs → investigate.
- $symbolize(1000-key object) >10ms → investigate (this is our canary for the "scope finalize will hurt" regime).

### B2 — Component-level benchmarks (Cathy)

Using React Profiler API. Wrap test components in `<Profiler>`.

**Scenarios:**
1. **Initial render:** a chemical with 10 reactive fields → measure `actualDuration`.
2. **Re-render after state change:** mutate one field, observe re-render time.
3. **Re-render with no observable change:** click a no-op handler — does scope tracking correctly skip re-render? (If it re-renders, we have a bug.)
4. **Deep tree render:** parent with 10 children, each child with 3 reactive fields. Initial render; one leaf mutates; measure propagation.
5. **Instance lifecycle:** cost of `new $Foo()` × 1000. Instantiation is where accessor installation happens per field.
6. **React Profiler baseline:** compare against an equivalent React function component using `useState`. Ratio = our overhead.

**Thresholds:**
- Initial render of a leaf chemical >1ms → investigate.
- Re-render after single-field mutation >4ms → investigate.
- No-observable-change handler triggers a re-render → bug, fix.
- Instantiation of 1000 chemicals >500ms → concern for large apps (document; not v1-blocking).

### B3 — Macro-benchmarks (Arthur)

Adapt the create/update/swap subset of [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark).

**Standard operations adapted to $Chemistry:**
1. **Create 1000 rows** — render a list of 1000 chemical rows from a single array mutation.
2. **Update every 10th row** — mutate 100 fields across the chemicals.
3. **Swap 2 rows** — re-order two elements in a 1000-row list.
4. **Append 1000 rows** — push 1000 items; observe each re-render.
5. **Clear** — empty the array.

**Baseline comparisons:**
- Raw React (function component + useState).
- $Chemistry with scope tracking.
- (Optional future) $Chemistry with static analysis — not applicable for v1, tracked as a v2 target.

**Thresholds:**
- Create 1000: $Chemistry / React ratio <3x → shippable. >5x → v2-blocking.
- Update every 10th: $Chemistry / React ratio <3x → shippable. >5x → v2-blocking.
- All macro benchmarks complete in <5 seconds on reference hardware.

### B4 — Real-world scenario: the GitHub Pages site (Phillip)

Once the site exists (sprint after this), profile real interactions:
- Page load: LCP, FCP on the deployed site.
- Any interactions present: INP.

**Thresholds for v1 ship:**
- LCP <2.5s on 4x-throttled CPU.
- FCP <1.8s on 4x-throttled CPU.
- INP <200ms on any interaction.

**If any of these fail**: either optimize, or ship anyway with known limitation documented. The site is low-stakes; we're verifying, not gatekeeping v1 on these.

### B5 — Instrumentation infrastructure (Cathy)

Add `performance.mark` / `performance.measure` calls in:
- `withScope` (open, close, finalize timing).
- Accessor getter and setter (per-access timing, sampled).
- `$symbolize` (per-call timing, sampled).

Gate behind a `__DEV__` or `CHEMISTRY_PROFILE` flag. Zero cost in production builds.

This gives us visibility into WHERE time is spent, not just that it's spent. Critical for deciding v2 direction when we hit a cliff.

### B6 — Baseline commit and regression detection (Arthur)

- Commit `bench/baseline.json` with the measured numbers from B1, B2, B3.
- Add a CI step (or local script) that runs benches and compares to baseline.
- Fail (warning only, not blocking) if any benchmark degrades >15% from baseline.
- When intentional change degrades perf, author updates baseline in same PR.

Future: consider [CodSpeed](https://codspeed.io/) for deterministic CI benching. Not for this sprint.

### B7 — v1 ship decision (the whole team)

With B1-B4 data in hand, the team reviews:

- Are the micro-benchmarks in expected range (≤ known Vue 2 / Immer patterns)?
- Are component renders under 4ms typical?
- Do macros complete in <5s on reference hardware?
- Does the GitHub Pages site hit web-vitals thresholds?

**If all yes:** v1 ships. Document known costs for users.
**If not:** identify which tier failed and decide whether to optimize (within scope) or scope down v1.

### B8 — v2 trigger documentation (Cathy)

Document the specific numbers that would trigger "static analysis is required for v2":

- Snapshot/diff time >40% of event-handler time in profiling.
- Instantiation >1ms per chemical at realistic prop counts.
- js-framework-benchmark update >5x React baseline.
- Memory per instance >10KB.

These aren't thresholds to fix before v1 — they're the signals that guide v2 scope.

## Out of scope for this sprint

- Implementing static analysis (that's v2).
- Migration to Proxy-based tracking (rejected).
- Switching from $symbolize to alternative diff strategies (may come out of B1 findings; if so, its own story).
- Optimizing anything until we have numbers.

## Method

Stories run roughly in parallel once B5 (instrumentation) is in place:
- B5 first (thin, unblocking).
- B1, B2, B3 in parallel.
- B4 waits on the GitHub Pages site existing (Phillip's dependency).
- B6 consolidates.
- B7, B8 final synthesis.

## Done

- Three baseline files committed (`bench/micro.bench.ts`, `bench/component.bench.ts`, `bench/macro.bench.ts`).
- Per-benchmark numbers recorded in `bench/baseline.json`.
- `performance.mark` instrumentation in place, dev-gated.
- v1 ship decision documented with the numbers that drove it.
- v2 trigger thresholds documented in `.claude/docs/chemistry/performance-contract.md`.
- No optimizations made unless B1-B3 findings demand them.

## Principle

**Measure first. Optimize second. Refactor never, unless the numbers demand it.**

The research is unambiguous: we know where the costs are architecturally (getter/setter, snapshot-on-read). The benchmarks tell us whether those costs are *acceptable at current scale*. If yes, we ship v1 with honest documentation of known limits. If no, we have precise data to argue for v2's static-analysis direction.
