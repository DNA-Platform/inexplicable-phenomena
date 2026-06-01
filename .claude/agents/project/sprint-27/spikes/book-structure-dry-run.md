# SP-2: Book structure dry-run on `particle/`

**Owner:** Libby
**Date:** 2026-04-28
**Status:** Resolved — recommendation below.

## Question

Does the books-with-chapters structure feel right when populated for one class? Do chapters split naturally, or do they fight the topic? What's the heuristic for chapter boundaries?

## Method

Built the `particle/` book end-to-end at `.claude/docs/chemistry/books/particle/`. Read [`particle.ts`][particle-src] from line 1 to line 290 in one pass. Wrote chapter files in narrative order, not file order. Migrated three multi-paragraph code comments into chapters; replaced each in source with a single-line pointer. Ran the suite (428 / 428 green) before and after the source edits.

## Chapter splits chosen

Six chapters plus an index. Each chapter is a *coherent reading*, not a reflection of file structure.

| Chapter | Why it's its own chapter |
|---------|--------------------------|
| [`identity.md`][ch-identity] | The three identity fields (`$cid`, `$type`, `$symbol`), the marker, and the static symbol-creation machinery hang together. A reader either understands all of it or none of it. |
| [`lifecycle.md`][ch-lifecycle] | Phase order, `next(phase)`, `$resolve`, the queued-resolver mechanism, and the prototype-chain propagation. Tightly coupled — splitting `next` from `$resolve` would force readers to bounce between files. |
| [`particularization.md`][ch-particular] | The constructor's second mode. Self-contained; depends on identity but nothing else. |
| [`lift.md`][ch-lift] | The per-mount-site derivation function. Long chapter — has to cover two parents, the first-mount path, the re-entry path, the render hooks, and the cleanup path. Tried to split into "derivation" and "render hooks" but they collapsed back together: the hooks *are* the derivation flow as React sees it. |
| [`render-filters.md`][ch-filters] | The cross-cutting filter chain. Tied to lift (it's *called* from lift) but conceptually distinct enough to stand alone — a reader can need to understand filters without re-reading lift. |
| [`view.md`][ch-view] | `view()`, `$apply`, augmentation, `$rendering`, `$viewCache`. The "rendering boundary" topic. Adjacent to lift but worth its own chapter because subclass authors override `view()` and the cache mechanism deserves explicit treatment. |

The `index.md` lists chapters in the reading order above. Identity → lifecycle → particularization → lift → filters → view. A first-time reader follows the order; a returning reader jumps directly.

## The chapter-split heuristic that emerged

**A chapter is a coherent reading. Use these tests, in order:**

1. **Does the topic survive being read end-to-end without a forward reference?** If a reader can finish the chapter and feel they understand the topic without needing to peek at another chapter mid-way, it stands alone. (Forward references at the *end* of a chapter — "see X for the next layer" — are fine. Mid-chapter forward references mean the split is wrong.)
2. **Would a reader looking up just this topic want this whole file, no more, no less?** A chapter that contains exactly what a "I need to understand X" reader wants is correctly sized. If they want only half of it, split. If they need it plus something from the next chapter, merge.
3. **Does the source narrative cluster around this topic?** When two topics interleave in source (e.g., `next` and `$resolve`), keep them together — splitting them forces readers to bounce. When two topics are separated by a section banner or an `// ===` divider, they're already telling you where to split.

The third test is the most useful: **the source's own structure suggests chapters.** Where the source has a banner, the wiki should have a chapter break. Where the source has interleaved topics, the wiki should have one chapter covering both.

## Code → library pointer convention

For each migrated comment, replace with a single-line pointer in this form:

```typescript
// see [docs/chemistry/books/particle/lifecycle.md].
```

The path is relative to the *project root* (not the source file's directory) and is human-readable as a wiki path. The square-bracket form looks like a markdown reference link — it isn't (it's a comment) but the visual cue helps readers who skim. The trailing period closes the comment as a sentence.

For pinpoints (a sentence or two pointing at a specific topic), append a clause:

```typescript
// see [docs/chemistry/books/particle/lifecycle.md] — prototype-chain propagation.
```

This form survived three migrations cleanly: it grep-able (`grep "see \[docs"` finds every pointer), unambiguous, and short enough to never wrap in normal-width source.

**Recommendation:** document this form in `coding-style.md` (story C-3). Cathy applies it for C-2.

## Migrated comments

Three migrations, all narrative (not pinpoint), all multi-paragraph in original:

1. **Particularization comment** in `$Particle` constructor (was lines 67-73). Now: chapter [`particularization.md`][ch-particular]. Pointer: `// see [docs/chemistry/books/particle/particularization.md].`
2. **`$resolve` propagation comment** (was lines 114-117). Now: in [`lifecycle.md`][ch-lifecycle]. Pointer with clause: `// see [docs/chemistry/books/particle/lifecycle.md] — prototype-chain propagation.`
3. **`$lift` block comment** (was lines 205-219). Now: chapter [`lift.md`][ch-lift]. Pointer: `// see [docs/chemistry/books/particle/lift.md].`

Suite green at 428 / 428 after the edits (comment changes don't change behavior — verification was paranoia, justified).

**Comments left in code** (intentionally; they pass the "stays" test from the methodology):

- `isParticle` two-line comment — pinpoint, explains *why* the marker check works for both natural and particularized particles. Stays in code.
- `$show`/`$hide` two-line comment — local invariant about default values. Stays in code.
- Constructor "JS uses a returned object in place of `this`" — pinpoint about a non-obvious JS rule. Stays in code.
- Phase-field comment on `$particleMarker$` stamping (lines 163-165 in the original; same content survives) — local invariant about *where* the marker lives and why it's redundant for naturally-constructed particles. Stays.
- Render-filters banner block (lines 169-181) — section divider, structural. Could migrate to `render-filters.md`, but I left it because the `===` banners are how the file communicates structure to a reader. Removing it leaves the file with no visible "here's where the filter section starts." This is a judgment call; flag for review during C-1 sweep.
- The two short comments inside `$lift`'s body — pinpoints (one explains the molecule.reactivate() ordering, one explains the context-parent try/catch). Stay.

## Surprises

**One surprise where the source narrative *aligned* unexpectedly well.** The phase-order constant at the top of the file, the `next` method, and the `$resolve` method are physically separated by other class members, but they are conceptually one topic — and that topic exactly matches one chapter (`lifecycle.md`). The chapter wrote itself; I just had to say "phase order is declared at the top of the file" and link three anchors. Source structure here did the work for me.

**One surprise where it *didn't*.** The `$lift` function is a single 75-line function that covers: derivation, hook setup, prop application, filter consultation, view augmentation, cache reconciliation, and cleanup. It's all in one closure because it has to be — React hooks have to call in stable order — but the *reader's* view splits along entirely different lines. The chapter ends up describing five sub-topics that all live in one continuous span of code. The function shape and the chapter shape disagree.

**Implication for B-2..B-5.** Source-structure-as-chapter-guide works *most of the time* but not always. The source has its own constraints (function boundaries, hook-order rules, JSX render flow) that don't always match the reader's "I need to understand X" boundaries. When they disagree, the chapter follows the *reader's* clusters, not the source's. This is the third heuristic ("does source narrative cluster?") generalized: clusters in source help when they exist, but absence of a source-level cluster does not mean the chapter shouldn't exist.

**A second-order surprise about the `view()` chapter.** When I wrote the view chapter, I realized `$rendering$` and `$viewCache$` are *fields*, but they're operationally part of the `view()` flow — the field declarations are just declarations; the *behavior* is in the lift render body and the deferred-effect hook. The chapter ended up describing fields whose code lives 200 lines away from their declarations. This is normal for OO machinery (fields and methods that work together aren't always co-located) but worth flagging: chapters often describe state that's distributed across the class.

## Recommended adjustments before scaling

For B-2..B-5:

1. **Read the source twice before splitting.** First read for what's there; second read for the natural clusters. The clusters are not always obvious on a single pass — the lift / view interaction in `particle.ts` only became clear on re-reading.
2. **Index in narrative order, list-chapters-as-topics.** Don't list chapters by file size or alphabetical order. The index is a reading guide, not a directory listing.
3. **Cross-link liberally between books.** The lift chapter references `derivatives-and-fan-out` (concept page) and the bond book's `diffuse` chapter (forthcoming). When books co-evolve, write the cross-link the moment you know it's coming, with a TODO if the target doesn't exist yet.
4. **Migrate comments selectively.** The "stays / moves / pointer" classification works, but be willing to leave structural banners in code — they communicate file structure to a reader, and the wiki cannot do that job from a different filesystem location. The methodology's "comments that explain *what* code does" rule is right, but section-divider banners are an exception: their job is *navigation*, not narrative.
5. **Keep the pointer form short and grep-able.** `// see [docs/chemistry/books/{book}/{chapter}.md].` — no more, no less, except for the optional "— pinpoint clause" suffix. Document in `coding-style.md`.
6. **Status frontmatter:** `evolving` while the book is being shaped; `stable` once the chapter set has been reviewed and the cross-links verified. The whole `particle/` book is currently `evolving` (chapters have `stable` frontmatter individually because their *content* is settled, but the *book's structure* is still being trialed; the index reflects this).

## Decision gate

> The chapter-split heuristic becomes the rule for L-2 (other books).

Heuristic codified above. Three tests, in order; rule of thumb: source clusters help, but the chapter follows the reader's clusters when they disagree. B-2..B-5 should apply this rule and report any cases where it failed.

## Output

- Six-chapter `particle/` book at `.claude/docs/chemistry/books/particle/`.
- Three migrated comments in `particle.ts`, suite green.
- `// see [docs/chemistry/books/{book}/{chapter}.md].` pointer convention.
- Catalogue updated with "By book" section.
- Heuristic for B-2..B-5: chapter = coherent reading; source clusters help; reader's needs win when they disagree.

<!-- citations -->
[particle-src]: ../../../../library/chemistry/src/abstraction/particle.ts
[ch-identity]: ../../../docs/chemistry/books/particle/identity.md
[ch-lifecycle]: ../../../docs/chemistry/books/particle/lifecycle.md
[ch-particular]: ../../../docs/chemistry/books/particle/particularization.md
[ch-lift]: ../../../docs/chemistry/books/particle/lift.md
[ch-filters]: ../../../docs/chemistry/books/particle/render-filters.md
[ch-view]: ../../../docs/chemistry/books/particle/view.md
