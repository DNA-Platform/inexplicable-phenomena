# Sprint 3 board

Last updated: 2026-03-29

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|
| SP-1 | Workspace boundaries in library | Arthur | spike | What are the actual packages inside library/? |
| E2-S1 | Create library/ container | Arthur | story | Depends on SP-1 |
| E2-S2 | Initialize library/.public workspace | Arthur | story | Depends on E2-S1, SP-1 |
| E2-S3 | Initialize remaining library workspaces | Arthur | story | Depends on SP-1 |

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|
| E3-S1 | Create /workspace skill | — | story | 2026-03-29 | .claude/skills/workspace/SKILL.md |
| E3-S2 | Create /responsible skill | — | story | 2026-03-29 | .claude/skills/responsible/SKILL.md |
| E3-S3 | Create Architect role + Arthur agent | — | story | 2026-03-29 | Role, agent, registry updated |
| E3-S4 | Create DevOps role + David agent | — | story | 2026-03-29 | Role, agent, registry updated |
| E3-S5 | Create Automation role + Adam agent | — | story | 2026-03-29 | Role, agent, registry; reassigned relay from David |
| E3-S6 | Update skills/CLAUDE.md for .authors path | — | story | 2026-03-29 | .eirian/ → .authors/.eirian/ everywhere |
| E1-S1 | Initialize root package.json | Arthur | story | 2026-03-29 | npm workspaces with .claude, .authors/.*, library/* |
| E1-S2 | Create .npmrc for GitHub Packages | Arthur | story | 2026-03-29 | @dna-platform scope → npm.pkg.github.com |
| E1-S3 | Initialize .claude as workspace | Arthur | story | 2026-03-29 | @dna-platform/claude@0.0.1 |
| E1-S4 | Initialize .authors/.eirian as workspace | Arthur | story | 2026-03-29 | @dna-platform/eirian@0.0.1 (already had package.json, scoped it) |

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
