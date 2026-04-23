# Sprint 21 — Research notes

Synthesized from the 2026-04-22 research on performance testing methodologies for React-based frameworks. Cited sources inline.

## Benchmarking tooling

**Vitest `bench`** uses [tinybench](https://github.com/tinylibs/tinybench) internally. Zero extra dependency, statistical rigor (mean, p99, variance), same reporter as the test suite. Recommended for 90% of our benchmarks.

**mitata** (nanosecond accuracy) is worth it only for hot-path micro-benchmarks (e.g., scope open cost). For everything above ~1μs, tinybench is fine.

**`benchmark.js`** is unmaintained (last meaningful release 2017). Don't use.

## React Profiler API

`<Profiler id="name" onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => ...}>` — [react.dev reference](https://react.dev/reference/react/Profiler).

- `actualDuration`: time rendering this commit.
- `baseDuration`: time without memoization (in theory — less useful).

Wrap every chemical component under test to measure per-component render times.

## Web Vitals

- **INP (Interaction to Next Paint):** time from event to next paint. Directly measures scope-open → handler → re-render → commit path. Threshold: <200ms "good" ([web.dev INP](https://web.dev/articles/inp)).
- **LCP, FCP, CLS:** page-level, mostly network-bound for our static-site use case.
- **TBT:** blocking time; matters if we do sync work >50ms.

## Chrome DevTools Performance panel (programmatic)

Puppeteer/Playwright: `page.tracing.start` / `stop` → JSON loadable in DevTools. CPU throttling via `emulateCPUThrottling(4)` simulates low-end hardware — mandatory for realistic INP numbers.

## User Timing API

`performance.mark('scope-open')`, `performance.measure('scope', 'scope-open', 'scope-close')`. Marks appear in DevTools timeline automatically. Gate behind `__DEV__` for zero production cost.

## js-framework-benchmark

[github.com/krausest/js-framework-benchmark](https://github.com/krausest/js-framework-benchmark). 31 operations against a 1000-row table: create, update every 10th, swap, partial update, clear, append, select. Gold standard for cross-framework comparison. React, Vue, Solid, Svelte all publish numbers against it.

**Decision:** adapt a subset (create, update, swap, append, clear) to $Chemistry as our scaling canary.

## Known cost patterns for our architecture

### Getter/setter accessors (Vue 2 pattern)

- Vue 2 used `Object.defineProperty` per field. Our approach.
- Known: ~3-5x slowdown vs. raw property access on reads.
- Setup cost: O(fields) per instance.
- Cheap at runtime (V8 inlines well), expensive at instantiation.
- Vue 3's 2x mount-time improvement came from replacing this with Proxy.
- **Implication for us:** instantiation will be our first cliff with high component counts.

### Snapshot-on-read via $symbolize

- Serialization on every property read within a scope: O(object-size) per read.
- MobX avoids this with dependency tracking (O(1) per read) via the observer set.
- Immer (closer to our snapshot model) benchmarks at ~2-10x slower than direct mutation.
- **Implication for us:** handlers with many state reads will be our second cliff.

### Deep clone + string compare

- `JSON.stringify` of 100-field object: ~50-200μs on modern hardware.
- Per-read in a busy handler: p99 latency spikes.
- Alternatives: `fast-deep-equal` (~3-5x faster than stringify-then-compare for small), structured comparison.
- **Consider switching** if B1 shows $symbolize dominating handler time.

### Scope open/close

- Cheap if stack push/pop (~ns).
- Expensive if per-scope Map/Set allocation (~μs).
- Our current impl allocates two Maps per scope — worth benchmarking specifically.

## Regression detection patterns

- React: TracerBench + internal dashboards.
- Vue: vitest bench with `--compare` against baseline.
- Solid: js-framework-benchmark in CI on every PR.
- [CodSpeed](https://codspeed.io/) — deterministic via Valgrind instruction counting; no runner noise. Free for OSS.

**Decision for $Chemistry:** start with tinybench + committed baseline.json + simple comparison script. Graduate to CodSpeed if PR volume justifies.

## Thresholds for conclusions

### "Fine for v1 (static GitHub Pages site)"

- FCP <1.8s, LCP <2.5s.
- INP <200ms.
- Bundle <100KB gzipped.
- Cold render of 50-component page <100ms on 4x-throttled CPU.

### "Won't scale"

- Instantiation >1ms each (1000 components = 1s cold start).
- INP >200ms on realistic interaction.
- Memory >10KB per instance.
- $symbolize cost super-linear with prop count.
- js-framework-benchmark create 1000 rows >3x React; update every 10th >5x React.

### "Static analysis required for v2"

- Profiler shows >40% of event-handler time in snapshot/diff overhead.
- Beyond tuning — only compile-time read tracking fixes this.

## Summary

We pay visibly for the high-level framework. The research is specific about WHERE (per-instance instantiation, per-read snapshots) and at WHAT SCALE (1000-component cliffs). Benchmarks measure the specifics. v1 ships if the numbers are tolerable for a small static site; v2 requires static analysis once handler time is dominated by snapshot/diff.
