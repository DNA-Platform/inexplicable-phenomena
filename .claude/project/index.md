# Project Tracker

Read this file first when resuming work. It tells you where we are.

## Current sprint: sprint-4 ($Chemistry) — COMPLETE

**Status:** COMPLETE

**Plan:** [sprint-4 plan] — lift $Chemistry framework into library/chemistry, build, test, document.

**Result:** 33/33 stories done. All source, tests, and config lifted. 180/192 tests pass (matches original — 12 particle failures are pre-existing). Build produces dist/chemistry.js + .cjs + .d.ts. Three docs written: overview, glossary, file map.

## Sprint history

| Sprint | Name | Status |
|--------|------|--------|
| sprint-1 | Exploration | Complete — proved UIA polling is the only viable approach |
| sprint-2 | Relay Refactor | Complete — all phases implemented, commands integrated |
| sprint-3 | [Workspaces][sprint-3 plan] | Closed — workspace infrastructure established, library spike deferred |
| sprint-4 | [$Chemistry][sprint-4 plan] | Complete — 33 stories, framework lifted, building, tested, documented |

## Team

Read the [role files][roles] and their [abilities] before executing as any teammate. The role files explain what to load and how context-loading works.

### Roles

Roles are **perspectives on code**, not operational procedures. Each role shapes how an agent approaches a story that changes or extends the code they maintain. The abilities a role loads encode the specific knowledge that makes that perspective effective.

| Name | Lens | Mantra |
|------|------|--------|
| [Architect] | Package architect — workspace boundaries, dependency graphs, monorepo structure | Every package earns its boundary |
| [DevOps Engineer] | Operations engineer — scripts, build pipelines, cross-language tooling | Automate the obvious, document the rest |
| [Automation Engineer] | Automation engineer — relay system, listener loop, message processing | Every message arrives exactly once |
| [Frontend Engineer] | Component builder — React, view composition, component APIs | The component is the API |
| [Framework Engineer] | Language designer — type systems, metaprogramming, prototype delegation | The abstraction must be faithful to the concept |
| [Librarian] | Knowledge curator — documentation, reference materials, terminology | If they can't find it, it doesn't exist |

### Agents

| Name | Roles | Territory |
|------|-------|-----------|
| [Arthur] | Architect | Catch-all owner (**), primary for workspaces, global structure, team system |
| [David] | DevOps Engineer | .github/, CI/CD, build pipelines |
| [Adam] | Automation Engineer | Relay scripts, listen/hear/speak skills, .authors/*/src/ |
| [Cathy] | Framework Engineer | library/chemistry/**, primary developer for $Chemistry |
| [Libby] | Librarian | .claude/docs/**, all documentation |

See the [agent registry] for path patterns. Use `/responsible` to query ownership.

<!-- citations -->
[sprint-3 plan]: sprint-3/plan.md
[sprint-4 plan]: sprint-4/plan.md
[roles]: ../team/roles/
[abilities]: ../team/abilities/
[Architect]: ../team/roles/architect.md
[DevOps Engineer]: ../team/roles/devops-engineer.md
[Automation Engineer]: ../team/roles/automation-engineer.md
[Frontend Engineer]: ../team/roles/frontend-engineer.md
[Framework Engineer]: ../team/roles/framework-engineer.md
[Librarian]: ../team/roles/librarian.md
[Arthur]: ../team/agents/arthur.md
[David]: ../team/agents/david.md
[Adam]: ../team/agents/adam.md
[Cathy]: ../team/agents/cathy.md
[Libby]: ../team/agents/libby.md
[agent registry]: ../team/agents/registry.json
