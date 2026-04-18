# Sprint 17: The Library Sprint

Every agent researches what they need to make durable, professional decisions in their domain. The research goes into their library under `.claude/team/library/{agent}/` as books with frontmatter and cross-links. The library system ([README]) and the `/library` skill exist; this sprint fills them.

## Why this sprint exists

Cathy hit a wall during the post-lifecycle diff work: she could sketch the React reactivity model but couldn't compare it with confidence to MobX, Vue, Solid, or Svelte — the exact prior art needed to make framework-level decisions for $Chemistry. That gap isn't Cathy's alone. Every agent has a similar gap between "what they kind of know" and "what a professional in their role would load before deciding."

This sprint forces the gap to close — and, more importantly, makes the closing **persistent**. Future sessions inherit the library.

## Status

NOT STARTED.

## Scope

Each agent writes the first books in their library. First meaning: the ones that would have helped in work already done, or that would block decisions currently pending.

Libraries are living. This sprint seeds them — subsequent sprints extend them whenever an agent learns something non-obvious.

## Stories

### Cathy (framework & frontend)

Blocking the post-lifecycle diff decision. Needed before sprint-16 work can proceed.

- **C1 — Reactivity models: a comparative study.** Walk through MobX (tracked-access), Vue (Proxy reactivity), Solid (signals), Svelte (compile-time invalidation), React (useState + memoization). For each: how it detects that view output is stale, what the developer contract is, what trade-offs it accepted, what problems it can't solve cleanly. Output: book summarizing each with citations to docs/source where helpful.
- **C2 — The re-render contract of $Chemistry.** Write the framework's *current* contract explicitly: when does it re-render, when doesn't it, what must the developer do. This is the anchor for every future diff-model decision. Cross-link C1.
- **C3 — React reconciliation, commit, and effect ordering.** How React actually runs a component: render phase vs commit phase, useEffect vs useLayoutEffect vs useInsertionEffect, concurrent mode semantics, strict mode double-invocation. Cite React source or docs.
- **C4 — Prototype delegation in framework design.** Self, Io, and other prototype-based systems. How $Chemistry's Object.create pattern fits or diverges.

### Arthur (architect)

- **A1 — ES module semantics and circular imports.** What TypeScript and Node do with circular imports, when it works, when it silently breaks, what patterns force a merge vs what patterns allow separation. Cross-link to C2.
- **A2 — Monorepo patterns in the TypeScript ecosystem.** npm workspaces vs pnpm vs nx vs turborepo. What $Chemistry's current structure aligns with, what it doesn't.

### Queenie (QA)

- **Q1 — Property-based testing for reactive frameworks.** fast-check, hedgehog-style. How to express framework invariants (e.g., "any mutation of bonded state followed by a render produces a view consistent with the new state") as properties. Contrast with example-based tests.
- **Q2 — Behavior vs implementation tests, with framework-level invariants.** Why testing implementation details makes tests brittle and why the line is blurry for framework authors.

### Phillip (frontend & UX)

- **P1 — Showcase-app patterns.** How Storybook, Framer Motion's site, Solid's playground, MobX's docs, etc. structure a "here's how the framework works" app. Extract patterns applicable to sprint-14 (The Showcase).
- **P2 — Visual hierarchy and code-adjacent UIs.** Typography, spacing, and layout conventions for apps where code is a first-class artifact (code + preview side-by-side).

### Adam (automation)

- **Ad1 — Windows UIA reading patterns.** What he knows + a quick tour of the parts the relay hits hardest. Covers polling intervals, tree-walking, stability heuristics.

### David (devops)

- **D1 — GitHub Actions patterns for monorepos.** Caching, conditional runs per package, matrix builds, release automation. Light; .github/ is empty today and David has no code yet — this seeds his library for when he does.

### Libby (librarian)

- **L1 — Knowledge architectures.** Zettelkasten, Obsidian/graph-based systems, wiki patterns. What makes a cross-linked knowledge base actually get used vs rot.
- **L2 — Library evolution: how to keep it honest.** Patterns for preventing stale/redundant books, conventions for slug naming, when to split vs merge books.

## Method

For each story:

1. Do web research (WebFetch, WebSearch) where appropriate. Cite sources.
2. Distill into a book in `.claude/team/library/{agent}/{slug}.md` with proper frontmatter.
3. Add cross-links (`links:` in frontmatter, inline markdown links in prose) where books relate.
4. Run `/library {agent}` afterward to verify the index parses correctly.

Books should be dense but readable — more "engineer's reference" than "textbook chapter." Aim for 500–2000 words per book unless the subject genuinely demands more.

## Done

All listed books exist in their respective libraries. `/library` lists them. Cross-links resolve. Cathy's C1+C2 are readable enough that the diff decision can be made with confidence against them.

## Follow-up

Every subsequent sprint must include: "if you learn something non-obvious about your domain, add it to your library." This sprint seeds the practice. The practice continues.

<!-- citations -->
[README]: ../../team/library/README.md
