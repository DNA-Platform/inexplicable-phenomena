# Sprint 29 board

Last updated: 2026-04-29 (apparatus built; chemistry tests + tsc + vite all clean)

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| D-3 (partial) | `$Case` registry auto-registration | Cathy | story | structure exists; auto-register on mount deferred — not needed for placeholder display |
| H-1 | `apparatus:` frontmatter on each catalogue section | Libby | story | not started |
| H-2 | About page describing the apparatus | Libby + Cathy | story | not started |
| H-3 | `chemistry/the-apparatus.md` reference | Libby | story | not started |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| A-1 | Re-base `library/chemistry/app/`; clear `main.tsx`; new title | Cathy | story | 2026-04-29 |
| A-2 | `prism-react-renderer` confirmed in deps (sprint 30 will use it) | Cathy | story | 2026-04-29 |
| A-3 | `npm run dev` wired (`vite app`) | Cathy | story | 2026-04-29 |
| B-1 | `$Lab` root chemical | Cathy | story | 2026-04-29 — owns `$activeSection`, `$cases`, `$router` |
| B-2 | `$Layout`, `$ThreePaneLayout`, `$ContentArea` | Cathy | story | 2026-04-29 |
| B-3 | `$Header` | Cathy | story | 2026-04-29 — case rollup placeholder |
| B-4 | `$Sidebar`, `$SidebarLink` | Cathy | story | 2026-04-29 — cross-chemical write via `$lab.$router.navigate` |
| B-5 | Section switching via `$lab.$activeSection` | Cathy | story | 2026-04-29 — `$SectionPage` reads `$lab.$activeSection` and finds section by id |
| B-6 | `$CodePanel` chrome | Cathy | story | 2026-04-29 — placeholder text; sprint 30 wires `?raw` |
| C-1 | `$SectionPage` | Cathy | story | 2026-04-29 |
| C-2 | All ~80 sections data-driven | Cathy | story | 2026-04-29 — single `$SectionPage` chemical iterates over catalogue data |
| C-3 | `$PrevNext` | Cathy | story | 2026-04-29 |
| C-4 | `$Breadcrumb` | Cathy | story | 2026-04-29 |
| D-1 | `$Status` family (5 subclasses) | Cathy | story | 2026-04-29 — `$Planned`, `$Pending`, `$Pass`, `$Fail`, `$Broken`; class-field polymorphism per § III.7 |
| D-2 | `$Test → $Case → $PlannedCase` | Cathy | story | 2026-04-29 — pill + name; default `$status = new $Planned()` |
| E-1 | `$Callout` family | Cathy | story | 2026-04-29 — `$Definition`, `$Rules`, `$Pitfall`, `$DeepDive`, `$InTheLab`, `$SeeAlso` |
| F-1 | `$Router` | Cathy | story | 2026-04-29 — hash-based; `attach(lab)` wires URL ↔ `$lab.$activeSection` |
| F-2 | Sidebar click → URL push → activeSection update | Cathy | story | 2026-04-29 |
| F-3 | Default route → § 0.1 | Cathy | story | 2026-04-29 — handled in `$Router.attach` and `parseHash` |
| G-1 | Color tokens | Cathy | story | 2026-04-29 — `tokens.ts` |
| G-2 | Typography pass | Cathy | story | 2026-04-29 — Charter serif body, JetBrains Mono code, system sans sidebar/pills |
| G-3 | Hover/active transitions | Cathy | story | 2026-04-29 — 150ms color only |
| G-4 | Scroll & sticky | Cathy | story | 2026-04-29 — flex layout; sidebar + code panel scroll independently |
| Pre-existing tsc fix | Add definite-assignment to `$Particle` instance fields | Cathy | bug | 2026-04-29 — sprint-27 added the early-return path that broke flow analysis; `!:` on `$cid$`, `$type$`, `$symbol$`, `$phases$` |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
