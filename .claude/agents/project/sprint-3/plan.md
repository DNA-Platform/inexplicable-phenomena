# Sprint 3: Workspaces

Establish npm workspace infrastructure for the monorepo. Define what a workspace is, how to create one, and set up the tooling so that `library/` can host multiple independent packages — including `.public` for GitHub Pages — that can depend on each other and publish to GitHub Packages.

## Status: CLOSED

Last updated: 2026-03-30
Closed: 2026-03-30 — workspace infrastructure established, remaining library workspace stories deferred to future sprints.

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| Arthur | Architect | Workspace boundaries, package.json conventions, root config, library/ structure |
| David | DevOps | Build scripts, .npmrc, CI setup for publishing |

## Spikes

### SP-1: Workspace boundaries in library — NOT STARTED
- **Owner:** Arthur
- **Question:** What are the actual workspaces inside `library/`? The archive had dictionary, encyclopedia, articles, notebook — but those were content categories, not package boundaries. What packages make sense?
- **Method:** Review the archive content, discuss with Doug what the packages represent as consumable units, and propose a workspace map.
- **Decision gate:** If the archive categories map 1:1 to packages, we initialize them directly. If not, we define new boundaries and map archive content into them.
- **Output:** `spikes/workspace-boundaries.md`
- **Finding:** TBD

## Epics

### E1: Workspace infrastructure

Set up the npm workspace scaffolding so any workspace can be created, linked, and (eventually) published.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E1-S1 | Initialize root package.json with workspace declarations | Arthur | — | NOT STARTED |
| E1-S2 | Create .npmrc for GitHub Packages registry | Arthur | E1-S1 | NOT STARTED |
| E1-S3 | Initialize .claude as a workspace | Arthur | E1-S1 | NOT STARTED |
| E1-S4 | Initialize .eirian as a workspace | Arthur | E1-S1 | NOT STARTED |

#### Story details

##### E1-S1: Initialize root package.json
- **What:** Root `package.json` with `"private": true`, workspace globs covering `.claude`, `.eirian`, `library/*`, `library/**/*`
- **Files:** `package.json` (root)
- **Acceptance:** `npm install` succeeds at root with no errors
- **Notes:** Name: `@dna-platform/inexplicable-phenomena`. No dependencies at root level.

##### E1-S2: Create .npmrc
- **What:** `.npmrc` configuring `@dna-platform` scope to GitHub Packages registry
- **Files:** `.npmrc`
- **Acceptance:** Registry line present, no auth tokens committed
- **Notes:** Auth tokens go in user-level `~/.npmrc`, not repo-level

##### E1-S3: Initialize .claude as a workspace
- **What:** `package.json` in `.claude/` making it a proper workspace
- **Files:** `.claude/package.json`
- **Acceptance:** Shows up as a workspace in `npm ls --workspaces`
- **Notes:** `@dna-platform/claude`, private, no deps yet

##### E1-S4: Initialize .eirian as a workspace
- **What:** `package.json` in `.eirian/` making it a proper workspace
- **Files:** `.eirian/package.json`
- **Acceptance:** Shows up as a workspace in `npm ls --workspaces`
- **Notes:** `@dna-platform/eirian`, private, no deps yet. .eirian is gitignored — the package.json pattern should be documented so other identity workspaces follow it.

### E2: Library workspaces

Create the library container and initialize its first workspaces, including `.public`.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E2-S1 | Create library/ container directory | Arthur | E1-S1 | NOT STARTED |
| E2-S2 | Initialize library/.public as a workspace | Arthur | E2-S1, SP-1 | NOT STARTED |
| E2-S3 | Initialize remaining library workspaces per spike findings | Arthur | SP-1 | NOT STARTED |

#### Story details

##### E2-S1: Create library/ container
- **What:** `library/` directory. NOT a workspace itself — just a container matched by root workspace globs.
- **Files:** `library/` (directory only, no package.json)
- **Acceptance:** Directory exists, is NOT a workspace, root globs cover `library/*` and `library/**/*`
- **Notes:** May need a README or .gitkeep initially

##### E2-S2: Initialize library/.public workspace
- **What:** `library/.public/` as a workspace that will become GitHub Pages. Can depend on all sibling workspaces.
- **Files:** `library/.public/package.json`
- **Acceptance:** Workspace resolves, can declare dependencies on sibling workspaces
- **Notes:** Build pipeline TBD. For now just the workspace shell. This is the workspace that will eventually serve `dna-platform.github.io/inexplicable-phenomena/`

##### E2-S3: Initialize remaining library workspaces
- **What:** Whatever SP-1 determines the workspace boundaries should be
- **Files:** TBD by spike
- **Acceptance:** All workspaces resolve, no nesting violations, dependency graph is clean
- **Notes:** Blocked until SP-1 completes

### E3: Team tooling

Skills and capabilities to support ongoing workspace management.

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E3-S1 | Create /workspace skill | — | — | DONE |
| E3-S2 | Create /responsible skill | — | — | DONE |
| E3-S3 | Create Architect role and Arthur agent | — | — | DONE |
| E3-S4 | Create DevOps role and David agent | — | — | DONE |

## Dependency graph

```
E3 (team tooling) ← already done
  ↓
E1-S1 (root package.json)
  ↓           ↓
E1-S2       E1-S3, E1-S4
(.npmrc)    (workspace init)
  ↓
SP-1 (workspace boundaries)
  ↓
E2-S1 (library container)
  ↓
E2-S2 (.public workspace)
E2-S3 (remaining workspaces)
```

## Verification checklist

After all work completes:

- [ ] `npm install` at root succeeds
- [ ] `npm ls --workspaces` shows all expected workspaces
- [ ] No workspace is nested inside another
- [ ] All `package.json` files use `@dna-platform/` scope
- [ ] `.npmrc` points to GitHub Packages, no auth tokens committed
- [ ] `/responsible package.json` returns Arthur
- [ ] `/responsible .claude/src/desktop.ps1` returns David
- [ ] `library/.public` can declare a dependency on a sibling workspace
