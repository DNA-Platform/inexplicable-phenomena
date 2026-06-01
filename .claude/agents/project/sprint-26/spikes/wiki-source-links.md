# SP-2: Wiki source-link convention

**Owner:** Libby
**Date:** 2026-04-28
**Status:** Resolved — recommendation below.

## Question

Do `[name](path/to/file.ts#L<line>)`-style source links work in the previewers we care about? Specifically:

- VS Code's built-in Markdown preview
- Claude Code's renderer (CommonMark)
- GitHub's web-rendered Markdown

Three forms were tested:

1. **Inline link, plain path** — `[name](../../../library/chemistry/src/abstraction/bond.ts)`
2. **Inline link, GitHub-style line anchor** — `[name](../../../library/chemistry/src/abstraction/bond.ts#L120)`
3. **Reference link, definition in `<!-- citations -->`** — `[name][bond-form]` with `[bond-form]: ../../../library/chemistry/src/abstraction/bond.ts#L120`

## Method

Wrote each form into three sample feature pages (`particle.md`, `chemical.md`, `reactive-bonds.md`) and observed what the previewers do when the link is clicked or hovered.

## Findings

| Form | VS Code preview | Claude Code (CommonMark) | GitHub web |
|------|-----------------|--------------------------|-----------|
| **1. Plain path** | Click opens the file in a new editor tab. Works. | Renders as a link; Claude can read the path and follow with `Read`. Works. | Click opens the source blob. Works. |
| **2. Path + `#L<line>`** | Click opens the file. **Line anchor is silently ignored** — cursor lands at line 1. | Renders as a link; Claude can parse `#L<line>` and pass `offset` to `Read`. Works *with help*. | Click opens the source blob and **scrolls to / highlights the line**. Works as designed. |
| **3. Reference link** | Identical to inline; resolution is the same. Works. | Identical to inline. Works. | Identical to inline. Works. |

Two surprises:

- **VS Code preview ignores `#L<n>` for relative file links.** I expected it to honor the GitHub convention since the rest of the platform leans on it; it does not. The link still navigates to the *file*, just not the *line*. This is graceful degradation, not failure.
- **Claude Code renders the link but doesn't auto-jump.** That's fine — when a reader is Claude, the line number is information for the *next* `Read` call, not a UI affordance. Claude reads `#L120` as "start near line 120" and uses `offset`. Better than nothing.

## Recommendation

**Use form 3 (reference link with `#L<line>` anchor where the line is meaningful).**

```markdown
The bond is forged at [`$Bond.form()`][bond-form].

<!-- citations -->
[bond-form]: ../../../library/chemistry/src/abstraction/bond.ts#L120
```

Reasons:

1. The reference-link form is already this wiki's convention (set in `readme.md`); using it for source links keeps prose readable and link-maintenance localized.
2. GitHub honors `#L<line>` fully, which is the previewer that matters most for a reader with a browser.
3. VS Code degrades to file-level navigation. No broken links, no dead anchors — readers still land in the right file.
4. Claude Code reads the anchor as a hint and applies it to `Read`. Manual but functional.

## Form 2 (inline) — when to use it

Inline links are still appropriate for **one-shot citations** where the link text and path tell the whole story. Example: footer "Source:" lines.

```markdown
- Source: [bond.ts](../../../library/chemistry/src/abstraction/bond.ts)
```

If the same path appears more than once, promote it to a reference.

## Form 1 (plain path, no anchor) — when to use it

Use plain path when the link is "this whole file is relevant" — typically an index page or a feature whose entire module lives in one file. No fragile line numbers to maintain.

## What's fragile, and why

Line numbers drift. Every refactor that moves `$Bond.form()` from line 120 to line 134 silently invalidates the anchor. Three mitigations:

1. **Link to the function, not the line** — write the link text as `[$Bond.form()][bond-form]`. The reader's intent survives drift even if the anchor is stale.
2. **Prefer file-level links for stable surfaces** — class declarations, top-of-module banners, exports. They drift less.
3. **Audit on rename** — when the team renames a function, Libby's track sweeps the wiki for citations to the old name. Sprint-25 alias index pattern, applied to source links.

## Decision gate (from sprint plan)

> If any previewer fails to honor line anchors, document fallback (link to file without anchor). If all work, codify in `readme.md`.

VS Code fails to honor line anchors. Fallback is documented (file-level link still works; the anchor is *additive*, not load-bearing). Convention codified in `readme.md` under "Source links."

## Output

- Recommendation: **reference-link form with `#L<line>` anchor where meaningful.**
- L-1 unblocked. Convention added to `readme.md`; existing chemistry feature pages updated with anchored source links.

<!-- citations -->
[readme]: ../../../docs/readme.md
