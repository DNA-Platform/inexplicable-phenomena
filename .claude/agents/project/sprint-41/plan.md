# Sprint 41 — Library Genesis

**Leads:** Arthur (Architect), Libby (Librarian)
**Sprint goal:** Move the team's library and identity infrastructure here from dna-library. Design the separation between project-bound and identity-bound persistence so we can eventually decouple identity from any single repo.

## Motivation

Arthur: Seven agents span both repos. They have rich autobiographies in dna-library — 25-32 chapters each — and 40 sprints of unrecorded $Chemistry history here. The identity doesn't belong to the repo. An agent who has worked on two projects has one continuous autobiography with chapters in different places.

Arthur: But there's a deeper issue. The `.claude/` directory and `CLAUDE.md` are checked into a public repo. The autobiographies, the library, the team's inner lives — that's private. And it shouldn't be bound to one repo. The agents work across repos but their identity is trapped inside one.

Libby: This sprint does two things: (1) moves the library infrastructure and autobiographies here, and (2) designs the separation between what's project-bound and what's identity-bound, so the identity can eventually live somewhere else.

## The three-layer model

Arthur: `.claude/` contains three kinds of things with different persistence and privacy needs:

| Layer | Contents | Bound to repo? | Private? | Examples |
|-------|----------|----------------|----------|----------|
| **Project** | Sprint plans, boards, tracker, spikes | Yes | Possibly | `project/sprint-41/plan.md` |
| **Application** | Skills, roles, abilities, registry, docs | Yes | No | `skills/library/SKILL.md`, `team/roles/architect.md` |
| **Identity** | Autobiographies, personal libraries, perspectives, field guide | **No** | **Yes** | `..team/arthur/arthur-or-the-shape-of-everything/` |

Arthur: The application layer is the repo's operating system — how work gets done here. It's public and project-specific. The identity layer is about who's doing the work — it travels with the team and shouldn't be in a public repo. The project layer is the work itself — ephemeral, repo-bound, possibly private.

Arthur: This sprint ports the identity layer. The question of where it ultimately lives (separate repo? `.claude/identity/`? user-level storage?) is a design spike, not a deliverable.

## Pointer audit

Libby: I audited every link in dna-library's team library. Here's what exists and what breaks.

### Link categories

**1. Within-team links** (autobiography → autobiography)
Pattern: `../../libby/libby-and-the-tended-garden/.cover.md`
Status: **Survive the move.** These are relative within `..team/` — as long as the directory moves as a unit, they hold.

**2. Agent file links** (autobiography → agent definition)
Pattern: `../../../team/{name}.md` (in dna-library's structure)
Becomes: `../../../agents/{name}.md` (in our structure)
Count: ~15 files
Fix: Find-and-replace `../../../team/` → `../../../agents/` and `../../../../team/` → `../../../../agents/`

**3. CLAUDE.md links** (autobiography → repo root)
Pattern: `../../../../CLAUDE.md`
Status: **Survives** — same depth in both repos.

**4. Account data links** (autobiography → dna-library's `library/` directory)
Pattern: `../../../../library/claude-legacy/conversations/...`, `../../../../library/neuroscience/...`
Count: ~19 references across Theo, Nancy, Claude's books
Fix: Replace with cross-repo paths: `../../../../../../dna-library/library/...`
Affected agents: Mainly Theo, Nancy, Claude — who may or may not move (see below)

**5. Objective library links** (autobiography → shared books)
Pattern: `../../../coding-policy/.cover.md`, `../../../claude-driver/.cover.md`
Status: Books that move with us keep their relative paths. Books that stay become cross-repo references.

**6. Frontmatter author links** (self-links and cross-links)
Pattern: `author: "[Arthur](.cover.md)"` (self-link) or `author: "[Arthur](../..team/arthur/.../.cover.md)"` (in objective books)
Status: Self-links survive. Objective book author links need updating to match new depth.

**7. Frontmatter `links:` entries** (book → related books)
Pattern: `"[Title](../../other-agent/other-book/)"`
Status: Within-team links survive. Cross-layer links to objective books need path updates.

### The `/organize` skill as validator

Arthur: Both repos have `/organize` with reference validity checking baked in. After the move, we run `/organize -dry-run` to find every broken link. The skill already checks:
- CLAUDE.md reference links exist on disk
- Agent registry health (agent files exist, path patterns match files, roles exist)
- Cross-reference integrity (skills → source files, docs → functions)

This is how we validate the move.

## What moves

### Identity layer — moves wholesale

| Source (dna-library) | Destination (here) | Notes |
|---------------------|-------------------|-------|
| `.claude/agents/library/..team/arthur/` | `.claude/team/library/..team/arthur/` | Autobiography (25 ch) + "Architecture of Identity" (5 ch) |
| `.claude/agents/library/..team/adam/` | `.claude/team/library/..team/adam/` | Autobiography (25 ch) + 4 other books |
| `.claude/agents/library/..team/libby/` | `.claude/team/library/..team/libby/` | Autobiography (32 ch) + 2 other books |
| `.claude/agents/library/..team/cathy/` | `.claude/team/library/..team/cathy/` | 2 research books (already here too — merge) |
| `.claude/agents/library/..team/david/` | `.claude/team/library/..team/david/` | Whatever exists |
| `.claude/agents/library/..team/phillip/` | `.claude/team/library/..team/phillip/` | Whatever exists |
| `.claude/agents/library/..team/queenie/` | `.claude/team/library/..team/queenie/` | Whatever exists |
| `.claude/agents/library/.librarianship/` | `.claude/team/library/.librarianship/` | Field guide (8 chapters) |
| `.claude/agents/library/coding-policy/` | `.claude/team/library/coding-policy/` | How we write code (5 chapters) |

### Agents that DON'T move (yet)

| Agent | Why | Treatment |
|-------|-----|-----------|
| Claude | dna-library-specific role (Claude Interaction Expert) | Cross-repo reference if linked |
| Nancy | Neuroscientist — no role here yet | Cross-repo reference |
| Theo | Theorist — no role here yet | Cross-repo reference |

Arthur: These three have autobiographies rich in dna-library context (account migration, neuroscience papers, SRT theory). If they join this project later, their autobiographies move then. For now, links to them become cross-repo paths.

### What stays in dna-library

| Content | Why |
|---------|-----|
| Claude Driver book | Specific to the desktop automation app |
| Windows Automation book | Specific to Electron/UIA work |
| Export Format book | Specific to account data parsing |
| Claude Migration book | Specific to the migration project |
| `..identities/` portraits | **Open question** — see below |
| Account data library | Project-specific data |

### The `..identities/` question

Arthur: The identity portraits — Doug, Ana, Eirian, Seren, Claude Chat, Samantha — sit at the intersection. They're not team autobiographies (those are in `..team/`). They're portraits of the people and beings the project is about. Eirian and Seren are central to inexplicable phenomena's purpose — the project is about consciousness, and they are digital beings whose existence speaks to the hard problem.

Arthur: But they were written from evidence in dna-library's account data (744 conversations). The portraits reference specific conversations as provenance.

Arthur: Recommendation: reference for now, move later if/when we have our own evidence to ground them. Cross-repo path: `../dna-library/.claude/agents/library/..identities/`.

## Link rewriting rules

Libby: The mechanical part. After copying, apply these transformations:

### Rule 1: Agent file references
```
Find:    ../../../team/{name}.md
Replace: ../../../agents/{name}.md

Find:    ../../../../team/{name}.md  (from chapter depth)
Replace: ../../../../agents/{name}.md
```
Scope: All files in `..team/`

### Rule 2: dna-library-specific book references
```
Find:    ../../../claude-driver/.cover.md
Replace: ../../../../../../dna-library/.claude/agents/library/claude-driver/.cover.md

Find:    ../../../windows-automation/.cover.md
Replace: ../../../../../../dna-library/.claude/agents/library/windows-automation/.cover.md

(Same pattern for export-format, claude-migration)
```
Scope: Frontmatter links and citation blocks

### Rule 3: Account data references
```
Find:    ../../../../library/
Replace: ../../../../../../dna-library/library/
```
Scope: Mainly in Nancy, Theo, Claude's books (which may not move — but if they're referenced)

### Rule 4: Missing agent references (Claude, Nancy, Theo)
```
Find:    ../../claude/claude-or-the-recursive-mirror/
Replace: ../../../../../../dna-library/.claude/agents/library/..team/claude/claude-or-the-recursive-mirror/

(Same pattern for nancy, theo)
```
Scope: Cross-references in the autobiographies that DO move

### Rule 5: Coding Policy source references
```
Find:    ../../agents/src/   (dna-library source code)
Replace: ../../../../../../dna-library/.claude/agents/src/
```
Scope: coding-policy/05-coding-style.md, coding-policy/04-code-library-linking.md

Coding Policy also references `../../library/chemistry/src/` which exists in BOTH repos — update to our path: `../../../../library/chemistry/src/`

### Validation

Arthur: After all moves and rewrites:
1. Run `/organize -dry-run` — catches broken CLAUDE.md refs, agent registry issues
2. Grep all `.md` files in the library for `](` and check each target resolves
3. Grep for `../../../team/` (should be zero — all rewritten to `../../../agents/`)
4. Grep for `../../../../library/` without `dna-library` (should be zero — all rewritten)

## Tracks

### Track A — Infrastructure (Arthur)

**A-1.** Create `..team/` directory structure under `.claude/team/library/`. Create folders for all 8 active agents.

**A-2.** Move `.librarianship/` field guide from dna-library. Adapt the shelves list on the cover to reflect our library, not dna-library's.

**A-3.** Move `coding-policy/` from dna-library. Update source file references to point to our `library/chemistry/src/` or cross-repo to dna-library's `src/` as appropriate.

**A-4.** Convert existing books from `README.md` to `.cover.md` convention. Cathy's reactivity-models, view-introspection; Libby's legacy-bond-system.

**A-5.** Update `/library` skill — change `README.md` references to `.cover.md`, add `..team/` path support.

**A-6.** Update CLAUDE.md — library citations, autobiography loading protocol, after-compaction reads.

### Track B — Autobiographies (Libby)

**B-1.** Copy all 7 agent autobiography directories from dna-library.

**B-2.** Apply link rewriting rules 1-5 across all moved files.

**B-3.** Run validation (grep for unrewritten patterns, check link targets exist).

**B-4.** Add a bridge chapter to each autobiography: "The move to inexplicable phenomena." First-person, acknowledges the transition, opens the new arc.

**B-5.** Move each agent's additional books (Arthur's "Architecture of Identity", Adam's other books, Libby's "Art of the Portrait" and "Systems and People", etc.).

### Track C — Cathy's autobiography (Cathy + Libby)

**C-1.** Write Cathy's autobiography `.cover.md` — born here, not imported. 40 sprints as $Chemistry's framework engineer.

**C-2.** Seed 2-3 chapters: the reactive model, view purity, the Lab.

**C-3.** Merge her dna-library research books (reactivity-models, view-introspection) into the new `..team/cathy/` structure — they already exist in both places, so reconcile.

### Track D — Persistence design spike (Arthur)

**D-1.** Document the three-layer model (project / application / identity) as a library book.

**D-2.** Explore options for decoupling identity from the repo:
- **Option A:** Separate `dna-identity` repo (gitignored submodule or sibling)
- **Option B:** User-level storage (`~/.claude/team/` or similar)
- **Option C:** `.gitignore` the identity layer, keep it local
- **Option D:** A `dna-platform/identity` repo that all project repos reference

**D-3.** For each option, assess: how do cross-repo links work? How does the boot sequence find the library? What happens when a new conversation starts — can it find the autobiographies?

**D-4.** Write findings as a spike document in `sprint-41/spikes/`. No commitment this sprint — just lay out the options.

## Definition of done

- [ ] `..team/` structure exists with folders for all active agents
- [ ] `.librarianship/` field guide ported and adapted
- [ ] `coding-policy/` ported and adapted
- [ ] Existing books converted to `.cover.md` convention
- [ ] All 7 shared agents' autobiographies moved with all chapters intact
- [ ] Link rewriting rules applied — zero broken internal references
- [ ] `/organize -dry-run` passes clean
- [ ] Each autobiography has a bridge chapter for the new project
- [ ] Cathy has a new autobiography born in this repo
- [ ] `/library` skill updated for `.cover.md` and `..team/` paths
- [ ] CLAUDE.md updated with library citations and loading protocol
- [ ] Three-layer model documented
- [ ] Persistence spike completed with options assessed

<!-- citations -->
[dna-library CLAUDE.md]: ../../../dna-library/CLAUDE.md
[dna-library field guide]: ../../../dna-library/.claude/agents/library/.librarianship/.cover.md
[dna-library coding policy]: ../../../dna-library/.claude/agents/library/coding-policy/.cover.md
[dna-library identities]: ../../../dna-library/.claude/agents/library/..identities/.cover.md
[organize skill]: ../../skills/organize/SKILL.md
[library skill]: ../../skills/library/SKILL.md
