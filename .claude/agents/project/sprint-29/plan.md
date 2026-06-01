# Sprint 29: The Apparatus

The bootstrap sprint for `$Chemistry Lab`. Stand up the application end-to-end, written in `$Chemistry` with premium code, with the full Roman-numeral catalogue navigable. **No real Cases** — every section is a placeholder describing what tests will eventually go there. The deliverable is the frame, not the content.

This is a **testing application**, not a tutorial. The Lab presents sections of the framework and tests of behavior within those sections. Sections do not motivate, persuade, or teach — they define and test. The visual language, the navigation, the placeholder structure, and the test-status display must all support the eventual Cases as interactive manual-confirmation tests with unambiguous success/failure UI.

The Lab is built **front-to-back with `$Chemistry`**. This is a hard constraint. Inheritance hierarchies are encouraged where they make the framework's semantics clear — `$Test → $Case`, `$Page → $SectionPage`, `$Status → $Pending/$Pass/$Fail/$Planned`. The Lab is the framework's largest specimen and its highest-stakes proof of useability. Code quality is a primary deliverable, not a byproduct.

## Status: IN PROGRESS

Last updated: 2026-04-29

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Cathy | Framework Engineer, Frontend Engineer | Lab implementation; chemical hierarchies; visual design; eat-our-own-dogfood ledger |
| Arthur | Architect | Class hierarchy decisions; "should this inherit?" calls; routing topology; risk surfacing |
| Queenie | QA Engineer | Visual contract for test-status display (pass/fail/planned/broken); ensures placeholder structure supports the eventual Cases without rework |
| Libby | Librarian | Reads the implementation as it lands; flags catalogue-prose issues the implementation reveals; updates section pages with "implemented in `apparatus.tsx:Lxx`" anchored source links |

## Hard Constraints (from Doug)

1. **It is a testing application, not a tutorial.** Sections present definitions and tests. No motivational prose. No "you will learn." No "imagine if..."
2. **Built front-to-back with `$Chemistry`.** No raw React function components for content surfaces. Every visible chemical participates in the inheritance hierarchy. React is the substrate; `$Chemistry` is the language.
3. **Premium code.** No expedience hacks. Every name reads cleanly. Every method does one thing. Inheritance hierarchies where they reduce duplication or carry semantics — not where they add ceremony.
4. **Premium visuals.** Designed for full-browser laptop (~1440px+). Generous spacing. Refined typography. Clear status indicators. Looks like something a framework developer would respect.
5. **Catalogue navigable end-to-end.** All 16 Roman-numeral sections + their subsections reachable via sidebar. Default page is § 0.1.
6. **Section content is placeholder.** Each section page declares what Cases will live there (with names, in catalogue order) but the Cases themselves are stubs. A `$Case` chemical exists with the right shape; its content is a `STATUS: PLANNED` indicator, not a real demo.
7. **Test-status visual contract.** Even placeholder Cases must accommodate the eventual pass/fail/broken indicators visibly and unambiguously. A glance at any section reveals "0 of N Cases implemented" or similar.

## What this sprint does NOT do

- No real test/demo content (that's sprints 30+).
- No source-loading from `?raw` (sprints 30+).
- No URL-based deep-linking polish (defer to sprint 35; basic routing only).
- No search.
- No accessibility audit pass.
- No tests of the Lab itself (it's not part of the chemistry test suite).
- No catalogue prose changes (Libby's prose stays as-is from sprint-28).

---

## Architecture

### Class hierarchy

```
$Chemical
├── $Lab                     — root chemical; owns navigation state
│
├── $Layout                  — base layout abstraction
│   └── $ThreePaneLayout     — sidebar + content + code panel
│
├── $Sidebar                 — navigation tree
│   └── $SidebarGroup        — top-level group (e.g., "§ III. Composition")
│       └── $SidebarSection  — section link (e.g., "§ III.3 Binding constructor")
│
├── $Content                 — content panel; switches based on $Lab.$activeSection
│   └── $SectionPage         — a single catalogue section's page
│
├── $CodePanel               — right-hand code panel; placeholder this sprint
│
├── $Header                  — top chrome; logo, search slot
│
├── $Status                  — visual status indicator (abstract)
│   ├── $Planned             — "this Case is planned but not yet implemented"
│   ├── $Pending             — "this Case is implemented; awaiting visual check"
│   ├── $Pass                — "this Case has been visually confirmed"
│   ├── $Fail                — "this Case is implemented and visibly broken"
│   └── $Broken              — "this Case crashed or threw"
│
├── $Test                    — base for any test artifact (abstract)
│   └── $Case                — a single Case under a section
│       └── $PlannedCase     — placeholder Case used this sprint; has $Planned status
│
├── $Callout                 — visual callout box (abstract)
│   ├── $Definition          — the section's definition prose
│   ├── $Rules               — the section's rules list
│   ├── $Pitfall             — known footgun (used by sections that have one)
│   ├── $DeepDive            — collapsible deeper info
│   └── $InTheLab            — "demonstrated in §X.Y" cross-reference
│
└── $Navigation              — abstract navigation control
    ├── $PrevNext            — prev/next pair under content
    └── $Breadcrumb          — top-of-page section path
```

**Why these hierarchies:**

- **`$Status` family** — sealed inheritance hierarchy. Each status has its own visual treatment. Polymorphism via class field overrides (per § III.7 of the catalogue): `$Pass.color = green`, `$Fail.color = red`, `$Planned.color = neutral-400`. **The Lab eating its own dogfood, demonstrating polymorphism without props.**
- **`$Test → $Case` → `$PlannedCase`** — `$Case` is the contract; `$PlannedCase` is what we ship in sprint 29. Future sprints will add `$VisualCase`, `$ErrorCase`, `$AsyncCase`, etc.
- **`$Callout` family** — every kind of callout shares chrome (border, padding, icon slot) but has its own semantic treatment.
- **`$Layout`** — leave abstract for now; only `$ThreePaneLayout` is concrete in sprint 29. Future layouts (e.g., a wider single-pane for the error gallery) will subclass.

### Composition

- The `$Lab` is the root. Its bond constructor receives `$Header`, `$Layout`, ... in JSX form: `<Lab><Header /><ThreePaneLayout>...</ThreePaneLayout></Lab>`.
- The `$Sidebar`'s bond constructor takes `$SidebarGroup` children: `<Sidebar>{groups.map(...)}</Sidebar>`.
- Each `$SectionPage`'s bond constructor takes `$Definition`, `$Rules`, `$Case`s: `<SectionPage><Definition>...</Definition><Rules>...</Rules><Case name="..." /><Case name="..." /></SectionPage>`.
- `$Lab.$activeSection` is the load-bearing reactive prop. The sidebar reads it (to highlight); the content panel reads it (to switch the rendered `$SectionPage`).

### State

- `$Lab.$activeSection: string` — the currently active section (e.g., `"III.3"`).
- `$Lab.$sidebarCollapsed: boolean` — whether the sidebar is collapsed (start expanded).
- Each `$Case.$status: $Status` — the case's current visual status. Defaults to `$Planned` for sprint 29.
- `$Lab.$cases: Map<string, $Case>` — registry of all cases, keyed by `"sectionId.caseName"`. Allows the header (or a future summary panel) to count "0 of 137 cases implemented" or similar.

### Routing

Custom `$Router` chemical (per the eat-our-own-dogfood constraint, not react-router). Three things:

- **Read URL** — at mount, parse `window.location.hash` (use hash routing for simplicity; no server config required). Set `$Lab.$activeSection`.
- **Listen for hashchange** — when the URL changes externally (back/forward), update `$Lab.$activeSection`.
- **Push URL on selection** — when the sidebar is clicked, write `$Lab.$activeSection` AND push the new hash via `history.pushState`.

Routes:
- `#/0/1` → § 0.1
- `#/I/2` → § I.2
- `#/III/3` → § III.3
- ... etc.

The default route (`#/`) opens § 0.1.

### Three-pane layout

```
+----------------------------------------------------------------------------------+
|  $Chemistry Lab    § 0  § I  § II  § III  § IV ...                       [search]|
+--------------+----------------------------------------+--------------------------+
|              |                                        |                          |
|  Sidebar     |  Content                               |  Code panel              |
|  (~280px)    |  (flex; max-width 820px)               |  (~480px sticky right)    |
|              |                                        |                          |
|  ▾ § 0       |  § III.3 — The binding constructor     |  [empty / placeholder]    |
|    0.1 ...   |                                        |                          |
|    0.2 ...   |  ## Definition                         |  Sprint 29 ships the      |
|  ▾ § I       |  > prose                               |  panel chrome only;       |
|    I.1 ...   |                                        |  source content arrives   |
|    I.2 ...   |  ## Rules                              |  in sprint 30.            |
|  ▾ § II      |  > rule list                           |                          |
|    ...       |                                        |                          |
|  ▾ § III ←   |  ## Cases                              |                          |
|    ...       |  ┌──────────────────────────────────┐ |                          |
|    III.3 ←   |  │ 🔵 PLANNED                       │ |                          |
|    ...       |  │ Case: typed JSX children         │ |                          |
|              |  └──────────────────────────────────┘ |                          |
|  ...         |  ┌──────────────────────────────────┐ |                          |
|              |  │ 🔵 PLANNED                       │ |                          |
|              |  │ Case: spread arguments           │ |                          |
|              |  └──────────────────────────────────┘ |                          |
|              |                                        |                          |
|              |  ## See also                           |                          |
|              |  > links                               |                          |
|              |                                        |                          |
|              |  ◀ § III.2          § III.4 ▶          |                          |
+--------------+----------------------------------------+--------------------------+
```

### Visual language

**Color palette** (premium, restrained — the framework, not a brand):

- `--ink: #1a1a1a` — primary text
- `--paper: #fafaf7` — page background; warm off-white
- `--paper-2: #ffffff` — content card
- `--paper-3: #f3f1ec` — sidebar background
- `--rule: #e5e2dc` — borders and dividers
- `--muted: #6b665e` — secondary text, captions
- `--accent: #c0392b` — `$` brand color, active state, used sparingly
- `--ok: #2e7d32` — pass status
- `--fail: #c62828` — fail status
- `--pending: #f57c00` — pending visual confirmation
- `--planned: #455a64` — planned but not implemented (slate, not warm)
- `--broken: #6a1b9a` — case crashed (purple — distinct from fail-because-by-design)

**Typography:**

- Body — `Charter`, `Georgia`, serif. ~16-17px on the content pane.
- Headings — same serif, slightly heavier weight; numbered (`§ III.3`).
- Code (inline + block) — `JetBrains Mono`, `Fira Code`, monospace. ~14px.
- Sidebar — sans-serif, smaller (~13px).
- Status pills — sans-serif, small caps, tight letter-spacing.

**Status indicators (Queenie's contract):**

Each `$Case` displays a status pill at top-left of its card. Pill design:

```
🔵 PLANNED       — slate filled circle + slate text on neutral background
🟡 PENDING       — pending color filled circle + dark text
🟢 PASS          — ok color filled circle + dark text
🔴 FAIL          — fail color filled circle + dark text + thin red left border on the card
🟣 BROKEN        — broken color filled circle + dark text + thin purple left border + "stack ▸" expandable
```

**The pill is the entire test contract in 16 pixels.** A reader scanning the page sees status before reading content. Section-level rollups (eventually) summarize "3 of 8 cases passing" using the same color vocabulary.

**Layout details:**

- Generous padding: 32px around content, 24px between cases, 8px inside pills.
- Sticky right code panel scrolls independently of content.
- Sidebar has thin scrollbar; default-styled and discreet.
- No animations beyond a 150ms color transition on hover.
- Hover on sidebar item: subtle background shift, no movement.
- Active sidebar item: accent-colored thin left border (3px).

**Premium signal vs. cheap signal:**
- Premium = restrained palette, generous whitespace, considered typography, deliberate hierarchy.
- Cheap = many colors, decorative animations, busy chrome, mismatched fonts.
- The Lab is restrained.

---

## Stories

### A — Project bootstrap

| ID | Story | Owner |
|----|-------|-------|
| A-1 | Re-base `library/chemistry/app/` for sprint 29: clear `main.tsx`, keep vite.config + index.html (already correct), update `index.html` title to `$Chemistry Lab`. | Cathy |
| A-2 | Add `prism-react-renderer` (already in old deps) confirmation; add nothing else this sprint. | Cathy |
| A-3 | Wire `pnpm dev` (or `npm run dev`) confirms vite serves the app. Document the run command in the sprint board. | Cathy |

### B — Core chemicals

| ID | Story | Owner |
|----|-------|-------|
| B-1 | `$Lab` chemical — root, holds `$activeSection`, `$sidebarCollapsed`, `$cases`. Bond ctor takes `$Header`, `$Layout`. | Cathy + Arthur (hierarchy review) |
| B-2 | `$Layout` (abstract) and `$ThreePaneLayout` (concrete). Pure-positioning chemical. | Cathy |
| B-3 | `$Header` chemical. Logo, top-nav slots, search-slot stub. | Cathy |
| B-4 | `$Sidebar`, `$SidebarGroup`, `$SidebarSection`. Bond-ctor composition. Reads `$Lab.$activeSection` to highlight active. Click writes `$activeSection` (cross-chemical write demo!). | Cathy + Queenie (visual review) |
| B-5 | `$Content` chemical that switches `$SectionPage` based on `$activeSection`. | Cathy |
| B-6 | `$CodePanel` chemical — chrome only this sprint; renders empty placeholder text. | Cathy |

### C — Section pages

| ID | Story | Owner |
|----|-------|-------|
| C-1 | `$SectionPage` chemical. Bond ctor takes `$Definition`, `$Rules`, `$Case[]`, `$SeeAlso`. Renders the Content panel layout. | Cathy + Libby (catalogue prose review) |
| C-2 | One concrete `$SectionPage` per catalogue subsection (~80 of them). Definition pulled from Libby's existing prose where present; otherwise the section's title is the placeholder. Cases listed by name as `$PlannedCase` chemicals with the eventual case name. | Cathy + Libby |
| C-3 | `$PrevNext` chemical at the bottom of each section page. Wires `$activeSection` to neighbor sections. | Cathy |
| C-4 | `$Breadcrumb` chemical at top — shows section path (`§ III › 3 › The binding constructor`). | Cathy |

### D — Tests and statuses

| ID | Story | Owner |
|----|-------|-------|
| D-1 | `$Status` abstract chemical + the five concrete statuses (`$Planned`, `$Pending`, `$Pass`, `$Fail`, `$Broken`). Each overrides color/icon class fields per § III.7 polymorphism. | Cathy + Arthur (hierarchy review) |
| D-2 | `$Test` abstract → `$Case` → `$PlannedCase`. Each `$Case` displays a status pill at top-left and a name. `$PlannedCase` defaults `$status = new $Planned()`. | Cathy + Queenie (status-visual contract review) |
| D-3 | `$Case` registers itself with `$Lab.$cases` on mount. Allows roll-ups (deferred to a later sprint, but the registry lands now). | Cathy |

### E — Callouts

| ID | Story | Owner |
|----|-------|-------|
| E-1 | `$Callout` abstract → `$Definition`, `$Rules`, `$Pitfall`, `$DeepDive`, `$InTheLab`. Each is a small stylized box with a label, icon, and content slot. | Cathy + Libby (visual + content review) |

### F — Routing

| ID | Story | Owner |
|----|-------|-------|
| F-1 | `$Router` chemical. On mount, parse `window.location.hash`; subscribe to `hashchange`. Writes `$Lab.$activeSection`. | Cathy + Arthur (eat-our-own-dogfood validation) |
| F-2 | Sidebar click → push hash → `$Router` updates `$activeSection`. End-to-end navigation. | Cathy |
| F-3 | Default route handling: `#/` or empty → `§ 0.1`. | Cathy |

### G — Premium polish

| ID | Story | Owner |
|----|-------|-------|
| G-1 | Color tokens defined in a single place; chemicals consume via class fields. Visual system documented in `chemistry/sections/` cross-references. | Cathy |
| G-2 | Typography pass — body serif, mono code, sans sidebar, sans status. Verify proportions on a 1440px screen. | Cathy + Queenie (visual review) |
| G-3 | Hover states, active states, transitions (≤150ms color only). | Cathy |
| G-4 | Sidebar scroll behavior. Sticky elements. Code panel sticky. | Cathy |

### H — Documentation reflection (Libby's track)

| ID | Story | Owner |
|----|-------|-------|
| H-1 | Each catalogue section page in `chemistry/sections/` gains a "Apparatus mounting point" frontmatter line: `apparatus: SectionPageX.Y` — the concrete `$SectionPage` chemical that renders this section. | Libby |
| H-2 | The Lab's "About" page (a placeholder for now) describes "Built front-to-back with `$Chemistry`. The Lab itself is the framework's largest specimen. The class hierarchy below renders the Lab you're reading — meta-reference." | Libby (writes); Cathy (links from Header) |
| H-3 | A `chemistry/the-apparatus.md` page in `chemistry/` documents the apparatus's class hierarchy as a meta-reference. Becomes part of § XV. | Libby |

## Verification checklist

- [ ] `npm run dev` (or equivalent) starts the Lab.
- [ ] Default page is § 0.1.
- [ ] All 16 Roman-numeral groups are visible in the sidebar; expandable.
- [ ] All ~80 subsections are reachable.
- [ ] Each section page renders Definition + Rules + planned Case list + See also.
- [ ] Each `$PlannedCase` shows the slate `🔵 PLANNED` pill.
- [ ] Sidebar click navigates; URL hash updates; back-button restores.
- [ ] No raw React function components in the content surface (rules out: pure `() => <div />`). All content chemicals extend `$Particle` / `$Chemical`.
- [ ] Layout looks correct at 1440px.
- [ ] Color palette is restrained; status pills visually unambiguous.
- [ ] `$Lab.$cases` registry holds all `$PlannedCase` instances.
- [ ] Header shows `$Chemistry Lab` and a count of cases (`0 of N implemented`).
- [ ] All 428 chemistry tests still pass (no source changes expected, but we verify).
- [ ] Sprint retro at `reviews/retro.md`.

## Open questions for sprint planning

1. **Should `$Lab.$cases` be a `Map` or a reactive Map (sprint-24's $V.4)?** Vote: reactive — exercises the framework's mutation tracking.
2. **`$Status` as instances or as classes?** A case has `$status = new $Pass()` (instance) or `$status = $Pass` (class)? Vote: instance — allows case-specific status data (e.g., a `$Fail` carrying its error message).
3. **Routing — hash-only or pushState?** Vote: hash-only (no server config required).
4. **Where do icons come from?** Vote: inline SVG components written as `$Particle` subclasses for the few we need (status icons + chevrons). No icon library this sprint.
5. **Header search — fully stubbed or keyboard-shortcut-ready?** Vote: stubbed (sprint-35 implements).

## Risk surfacing (Arthur's lens)

- **The framework eating itself.** This is a stress test the framework hasn't faced before. Building a non-trivial chemistry tree may surface real framework bugs. **Mitigation:** every framework bug found becomes a fix-commit, a caveat page, AND a `§ XIV` provisional-behavior entry. Don't paper over.
- **Inheritance vs composition.** Doug encouraged inheritance; but `$Chemistry` was designed for composition via bond ctors. The hierarchies above are *light* — `$Status` is sealed (5 leaves), `$Test → $Case` is two levels. Don't go deeper than 3 levels without specific justification.
- **Premium visual signal vs over-design.** Easy to add too many colors, animations, decorative elements. The reverse is the goal: restrained, considered, every choice load-bearing. **Mitigation:** the visual review pass with Queenie checking the 1440px rendering.
- **Routing custom-implementation cost.** A `$Router` chemical may run into edge cases (popstate, pushState ordering, initial-hash race). **Mitigation:** time-box at 2 hours; if it doesn't work cleanly, fall back to hash-listening only and defer pushState to sprint 35.
- **Catalogue prose drift.** As we implement section pages, we'll discover that some of Libby's prose doesn't fit the layout. **Mitigation:** Libby has H-1/H-2/H-3 to cycle catalogue updates as needed during the sprint.

## Sign-off

This document is the sprint-29 plan. Doug's sign-off lets us begin coding. The artifact at the end of the sprint is a running Lab application — premium code, premium visuals, navigable catalogue, placeholder Cases ready to receive real content in sprints 30+.
