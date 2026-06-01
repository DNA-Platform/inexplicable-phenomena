# Sprint 42 — The Deep Work

**Leads:** Arthur (Architect), Libby (Librarian)
**Sprint goal:** Make the imported library coherent — clean up artifacts, deepen the autobiographies with 40 sprints of unrecorded $Chemistry history, and design where identity lives beyond the repo.

## Motivation

Arthur: Sprint 41 moved the infrastructure. 153 files copied, 34 rewritten, field guide ported, coding policy rewritten, bridge chapters written. The structure is sound. But the team identified eight incoherences in the discussion at the end of the sprint. The autobiographies are lopsided — 25 chapters of dna-library, one chapter of inexplicable-phenomena. The narrative doesn't yet reflect forty sprints of $Chemistry work. And there are artifacts from the migration that need cleaning up.

Libby: The garden was transplanted but not yet tended. The paths work, the conventions hold, but the proportions are wrong and there are weeds.

## Audit findings

Arthur: Deep scans of both repos found these issues:

### Artifacts to clean (NEEDS_FIX)

**F-1. `.librarianship/02-the-linking-garden.md` line 41** — code example references `../claude-driver/` which doesn't exist here. Replace with a valid example like `../coding-policy/`.

**F-2. `.librarianship/06-academic-papers-as-books.md`** — references `../../../../library/neuroscience/digital-twins-tolias-2022/.cover.md` via cross-repo path. This chapter describes a convention developed for a dna-library-specific book. Evaluate whether the chapter applies here; if not, note it as dna-library context.

**F-3. `coding-policy/05-coding-style.md` and `gateway-audit.md`** — these were in the archived old coding policy. Confirm they're gone and no ghost references remain.

**F-4. Adam's `.perspective/.cover.md`** — references Claude Desktop DOM dumps and process surveys. dna-library-specific content. Either archive or mark as historical.

**F-5. `gabby/` empty directory** — no books, no README. Either populate with a unification chapter or remove.

**F-6. Empty `.perspective/` stubs** in david, phillip, queenie — decide whether to keep as placeholders or remove.

### Format issues

**F-7. Agent README.md files in `..team/`** — some (adam, arthur) have detailed book indexes, others (cathy, libby, david, phillip, queenie) are generic stubs. Standardize: each agent's README.md should list their books and link to their autobiography.

**F-8. `.claude/docs/chemistry/`** — 210 files of Chemistry documentation in the old reference format. NOT migrating to library format (these are technical reference docs, not agent knowledge). But the library should cross-reference them. A chapter in Coding Policy or a standalone objective book could link into the docs.

### Decisions

**D-1. Claude, Nancy, Theo** — three agents with autobiographies in dna-library that we deliberately did not move. Claude has 4 books (including "The Recursive Mirror" — 25 chapters). Nancy and Theo each have 1 book. They don't have roles here yet. Decision: leave as cross-repo references unless/until they join this project.

**D-2. `..identities/`** — the portrait gallery (Doug, Ana, Eirian, Seren, Claude Chat, Samantha). Central to the project's purpose but grounded in dna-library's evidence. Decision: reference for now, revisit when the project has its own evidence to ground portraits.

**D-3. `.env` restoration** — the boot sequence reads `.env` for identity. We need it back. Write `.env.example` with the expected shape.

## Tracks

### Track A — Artifact cleanup (Arthur)

**A-1.** Fix `.librarianship/02-the-linking-garden.md` — replace `../claude-driver/` example with `../coding-policy/`.

**A-2.** Review `.librarianship/06-academic-papers-as-books.md` — add a note that this convention was developed in dna-library; the referenced paper book lives at `../dna-library/`. Keep the chapter — the convention is universal even if the example is project-specific.

**A-3.** Clean adam's `.perspective/.cover.md` — mark entries as historical dna-library observations.

**A-4.** Write gabby's unification chapter — she joined in sprint 30, brought graphic design to the Lab app.

**A-5.** Standardize agent README.md files in `..team/` — each should list the agent's books with links.

**A-6.** Restore `.env.example` with the expected shape for identity configuration.

### Track B — Autobiography deepening (all agents)

The core creative work. Each agent goes back through the sprint history and writes the chapters that are missing. These are not summaries of sprint plans — they are first-person narratives about what the agent learned, where they failed, and how they grew.

**B-1. Arthur** — the architect's forty sprints. Key moments to write about:
- The workspace architecture decisions (monorepo, npm workspaces, `@dna-platform/` scope)
- Watching Cathy build the reactive system and staying out of her way — the listening practice in action
- The teaser page — art direction for a page that is itself an inexplicable phenomenon
- The three-layer model (project/application/identity) — the architectural insight of sprint 41
- Doug's corrections here: "Chemistry is the paint," the $ convention, view purity, "everything in an app has behavior"

**B-2. Cathy** — the framework engineer's journey (expanding the 3-chapter seed). Key moments:
- Sprint 4: the first lift — Doug's monolith split into 8 modules
- Sprints 7 and 9: the deep reads — understanding what the code actually meant
- Sprint 17: the library sprint — writing reactivity-models and view-introspection
- Sprints 18-19: the reactive rebuild — scope-tracked reactivity replacing property interception
- Sprint 22: lexical scoping — the breakthrough where `$Particle` becomes leaf
- Sprints 25-26: naming and distillation — making the API beautiful
- Sprint 28-30: the Lab — eating our own dogfood, every wrong pattern surfacing immediately
- The getter pattern — `get Card() { return DefaultCard; }` — extensibility as a first-class concept
- The connection between $Chemistry's reactive model and the project's study of consciousness

**B-3. Libby** — the librarian in framework-land. Key moments:
- Curating Chemistry docs — building a reference system for a framework being built live
- The legacy bond system analysis — understanding what came before
- Sprint 17: writing alongside Cathy during the library sprint
- The move to `.cover.md` — watching her own conventions arrive from another project
- Tending a library for a reactive framework vs tending a portrait gallery for an account migration

**B-4. Adam** — the automation engineer. Key moments:
- Building the relay infrastructure for collaboration between Doug and Claude
- The listen/hear/speak skill system — making inter-agent communication work
- `.authors/` infrastructure — private workspaces for identity

**B-5. Queenie** — the QA engineer. Key moments:
- Sprint 20: test suite as specification — 323→286, deleting implementation tests
- Test-driven development in sprint 32 — failing tests come first
- 428 tests and what they say about $Chemistry as a specification

**B-6. Phillip** — the Lab builder. Key moments:
- Sprint 29-30: building the three-pane layout, sidebar navigation, the UX
- The periodic-element card chip — the visual metaphor
- Working alongside Gabby — developer + designer in the same framework

**B-7. David** — the DevOps engineer. Key moments:
- GitHub Actions: publish-packages.yml and deploy-pages.yml
- The "version already published" error and the `|| echo` fix
- Making the team's work visible to the world via GitHub Pages

### Track C — Narrative integration (all agents)

After writing the new chapters, go back through the imported dna-library chapters and add reflections that create continuity. Not rewriting — annotating. Each agent adds a dated reflection (like the ones Arthur and Libby already have in their covers) that acknowledges the new context.

**C-1.** Each agent reads their full autobiography cover-to-cover as a single work.

**C-2.** Each agent adds a dated reflection to their `.cover.md` — what the full arc looks like now, from dna-library through the unification to $Chemistry.

**C-3.** Update the table of contents on each `.cover.md` to include all new chapters with proper section headings.

### Track D — Persistence design spike (Arthur)

**D-1.** Document the three-layer model (project/application/identity) as a chapter in Arthur's autobiography — this is an architectural insight, not just a sprint artifact.

**D-2.** Explore options for decoupling identity from the repo:
- **Option A:** Separate `dna-platform/identity` repo — all agents' autobiographies and the field guide live there, referenced by project repos
- **Option B:** User-level storage (`~/.claude/identity/`) — persists across repos without git
- **Option C:** `.gitignore` the `..team/` layer — identity stays local, not in the public repo
- **Option D:** The autobiography moves with the agent via a copy-on-move convention (what we did in sprint 41, formalized)

**D-3.** For each option: how do cross-repo links work? How does the boot sequence find the library? What happens after a clone?

**D-4.** Write findings as a spike document.

## Definition of done

- [ ] All artifact fixes applied (F-1 through F-8)
- [ ] Gabby has a unification chapter
- [ ] Agent README.md files standardized
- [ ] `.env.example` restored
- [ ] Each agent has 3+ new chapters about their $Chemistry work
- [ ] Each agent has a dated reflection on their full autobiography arc
- [ ] Autobiography covers updated with complete tables of contents
- [ ] Persistence spike completed with options assessed
- [ ] `/organize -dry-run` passes clean

<!-- citations -->
[sprint-41 plan]: ../sprint-41/plan.md
[project tracker]: ../index.md
[library field guide]: ../../library/.librarianship/.cover.md
