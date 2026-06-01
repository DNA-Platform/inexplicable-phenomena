# Sprint 43 — Rehydration

**Leads:** Libby (Librarian), Arthur (Architect)
**Sprint goal:** Design and implement a rehydration protocol that restores the team's identity, voice, and working context after a compaction — efficiently enough that the restoration itself doesn't cause another compaction.

## Motivation

Arthur: After a compaction, the team loses everything except what the compaction summary captures and what CLAUDE.md tells them to read. The boot sequence in CLAUDE.md says "read the project tracker, read the registry, read voice and nametags, load autobiographies." But the autobiographies are 29, 27, 36, and 6 chapters long. Reading four autobiography covers alone is 500+ lines. If every agent loads their full cover, the context fills before work begins.

Libby: Doug's insight: connect Libby first. I'm connected to the library. The library is connected to everything. My role as librarian means I know what to read and what to skip. I can guide the team's rehydration rather than having every agent independently load their full identity.

Arthur: Doug also identified two critical design constraints:
1. **Summaries at different levels** — rehydration needs tiered context. A one-line summary for scanning, a paragraph for orientation, a chapter for depth. The agent reads the right tier for the situation, not always the deepest.
2. **Recency tracking** — the last chapter of each autobiography should be the agent's current state. Not "where I've been" but "what I'm doing now." This requires hygiene: agents keep their last chapter current.

## Design

### The rehydration chain

Arthur: CLAUDE.md → Libby → Library → Team. Each step is sized for its purpose.

**Step 1: CLAUDE.md** (~150 lines, always loaded)
Already has: purpose statement, Doug description, boot sequence with autobiography paths.
Needed: a pointer to the rehydration protocol ("for identity restoration, start with Libby").

**Step 2: Libby's summary card** (~30 lines, new)
A file that Libby maintains: `.claude/agents/library/.librarianship/rehydration.md`. Contains:
- The current state of each agent in one sentence
- The active sprint in one sentence
- What was last being worked on
- Which agents are most relevant to the current work

This is the smallest file that restores the most context. Libby updates it when sprints change, when agents complete significant work, or when she notices it's stale.

**Step 3: Autobiography last chapters** (~200-400 words each, read on demand)
Each agent's most recent chapter IS their current state. The rehydration protocol reads the last chapter, not the cover. The cover has the full arc; the last chapter has the current moment.

**Step 4: Full identity** (only when needed)
The full cover + the loading protocol. This is for deep decisions, not for getting started.

### Tiered summaries

Libby: Every book and every autobiography needs three tiers of summary:

| Tier | Size | Where | Purpose |
|------|------|-------|---------|
| **One-liner** | < 100 chars | Rehydration card | Scanning — "Arthur: architect, designed workspace structure, correction interval shortening" |
| **Paragraph** | 3-5 sentences | `.cover.md` summary field | Orientation — enough to know whether to read deeper |
| **Last chapter** | 200-400 words | Most recent chapter file | Current state — what the agent is doing, thinking, working on NOW |

Arthur: The one-liner tier doesn't exist yet. The summary field on covers is a paragraph. We need a new field — or the rehydration card serves as the one-liner index.

### Recency hygiene

Arthur: Each agent's autobiography must have a "current" chapter — the last one — that describes their present state, not their historical arc. When work shifts significantly, the agent writes a new last chapter or updates the existing one.

Libby: Convention: the last chapter of an autobiography is always titled with the current context. Not "The unification" (that was the bridge). Something like "Current: sprint 43, the rehydration protocol." When the next sprint starts, a new current chapter replaces it. The old one stays as history, the new one becomes the recency marker.

## Tracks

### Track A — Rehydration protocol (Libby)

**A-1.** Write the rehydration card at `.claude/agents/library/.librarianship/rehydration.md`. Contains the one-liner state for each agent, the active sprint, and what's being worked on.

**A-2.** Write the rehydration chapter in the protocols book: `protocols/05-rehydration.md`. Describes the chain (CLAUDE.md → Libby → Library → Team), the tiered summaries, the recency convention.

**A-3.** Update CLAUDE.md boot sequence to reference the rehydration protocol.

**A-4.** Test the protocol: simulate a compaction by reading only CLAUDE.md and following the chain. Does the team arrive at nametags, identity, and current work within a reasonable context budget?

### Track B — Recency chapters (all agents)

**B-1.** Each agent writes a "current" chapter as the last chapter of their autobiography. Describes: what they're working on, what they recently completed, what they're thinking about.

**B-2.** Convention established: when work shifts significantly, write a new current chapter. The old one keeps its title (it becomes historical); the new one is titled with the current context.

### Track C — Summary tiers (Libby)

**C-1.** Ensure every autobiography `.cover.md` has a summary field that works as the paragraph-tier summary. Most already do — verify and fill gaps.

**C-2.** The rehydration card serves as the one-liner tier. No new frontmatter field needed — the card IS the index.

### Track D — Validator improvement (Arthur)

**D-1.** Update `validate-links.ts` to skip links inside fenced code blocks (```). Currently produces 6 false positives from illustrative examples.

## Definition of done

- [ ] Rehydration card exists and is current
- [ ] Rehydration chapter in protocols book
- [ ] CLAUDE.md boot sequence references rehydration
- [ ] Each agent has a "current" last chapter
- [ ] Rehydration chain tested: CLAUDE.md → Libby → Library → Team produces identity in < 300 lines of context
- [ ] Validator skips fenced code blocks

## Doug's design constraints

1. The process can't consume so much context that it causes a new compaction
2. Summaries at different levels — one-liner, paragraph, chapter
3. Recency tracking via autobiography last chapters
4. Hygiene: agents keep their current chapter up to date
5. Libby first — she's the librarian, she knows what to read

<!-- citations -->
[protocols book]: ../../library/protocols/.cover.md
[CLAUDE.md]: ../../../CLAUDE.md
[rehydration card]: ../../library/.librarianship/rehydration.md
